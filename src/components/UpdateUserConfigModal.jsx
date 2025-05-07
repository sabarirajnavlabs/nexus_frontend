'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Cookies from 'js-cookie';
import { useSession } from '@clerk/nextjs';

export default function UpdateUserConfigModal({ isOpen, onClose, onUpdate }) {
    const { isLoaded, session } = useSession();
    const [max_budget, setMaxBudget] = useState('');
    const [budget_duration, setBudgetDuration] = useState('30d');
    const [models, setModels] = useState([]);
    const [tpm_limit, setTpmLimit] = useState('');
    const [rpm_limit, setRpmLimit] = useState('');
    const [model_tpm_limit, setModelTpmLimit] = useState({});
    const [model_rpm_limit, setModelRpmLimit] = useState({});
    const [max_parallel_requests, setMaxParallelRequests] = useState('');
    const [allowed_routes, setAllowedRoutes] = useState([]);
    const [availableModels, setAvailableModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [selectAll, setSelectAll] = useState(false);

    // Fetch user details first
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!isLoaded || !session) {
                console.log('Session not loaded or not available');
                return;
            }

            try {
                const token = await session.getToken();
                console.log('Token:', token);
                
                if (!token) {
                    throw new Error('No token available from session');
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                setUserDetails(data);

                // Set initial values from user details
                if (data) {
                    setMaxBudget(data.max_budget || '');
                    setBudgetDuration(data.budget_duration || '30d');
                    setModels(data.models || []);
                    setTpmLimit(data.tpm_limit || '');
                    setRpmLimit(data.rpm_limit || '');
                    setModelTpmLimit(data.model_tpm_limit || {});
                    setModelRpmLimit(data.model_rpm_limit || {});
                    setMaxParallelRequests(data.max_parallel_requests || '');
                    setAllowedRoutes(data.allowed_routes || []);
                }
            } catch (error) {
                console.error('Failed to fetch user details:', error);
                setError('Failed to load user details');
            }
        };

        if (isOpen) {
            fetchUserDetails();
        }
    }, [isOpen, isLoaded, session]);

    // Fetch models after getting user details
    useEffect(() => {
        const fetchModels = async () => {
            if (!userDetails?.lite_llm_key) {
                return;
            }

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_LITELLM_API_URL}/v1/models`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer sabari`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                if (data && data.data) {
                    setAvailableModels(data.data);
                    // If user has no models selected, select all by default
                    if (!models || models.length === 0) {
                        setModels(data.data.map(model => model.id));
                        setSelectAll(true);
                    }
                } else {
                    console.error('Unexpected models data format:', data);
                    setAvailableModels([]);
                }
            } catch (error) {
                console.error('Error fetching models:', error);
                setError('Failed to load models');
                setAvailableModels([]);
            }
        };

        if (userDetails?.lite_llm_key) {
            fetchModels();
        }
    }, [userDetails]);

    // Handle select all toggle
    const handleSelectAll = (e) => {
        const checked = e.target.checked;
        setSelectAll(checked);
        if (checked) {
            setModels(availableModels.map(model => model.id));
        } else {
            setModels([]);
        }
    };

    // Handle individual model selection
    const handleModelChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setModels(selectedOptions);
        setSelectAll(selectedOptions.length === availableModels.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!userDetails) {
                throw new Error('User details not loaded');
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/settings`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer sabari',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    key: userDetails.lite_llm_key,
                    user_id: userDetails.id,
                    max_budget: parseFloat(max_budget),
                    budget_duration: budget_duration,
                    models: models,
                    tpm_limit: parseInt(tpm_limit),
                    rpm_limit: parseInt(rpm_limit),
                    model_tpm_limit: model_tpm_limit,
                    model_rpm_limit: model_rpm_limit,
                    max_parallel_requests: parseInt(max_parallel_requests),
                    allowed_routes: allowed_routes
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update configuration');
            }

            const data = await response.json();
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating configuration:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Update User Configuration
                                </Dialog.Title>

                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Max Budget
                                        </label>
                                        <input
                                            type="number"
                                            value={max_budget}
                                            onChange={(e) => setMaxBudget(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Budget Reset Period
                                        </label>
                                        <select
                                            value={budget_duration}
                                            onChange={(e) => setBudgetDuration(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="30d">Monthly</option>
                                            <option value="7d">Weekly</option>
                                            <option value="24h">Daily</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Models
                                        </label>
                                        <div className="mt-1 space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="select-all"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="select-all" className="ml-2 block text-sm text-gray-900">
                                                    Select All Models
                                                </label>
                                            </div>
                                            <select
                                                multiple
                                                value={models}
                                                onChange={handleModelChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 h-64"
                                                required
                                            >
                                                {availableModels && availableModels.length > 0 ? (
                                                    availableModels.map((model) => (
                                                        <option 
                                                            key={model.id} 
                                                            value={model.id}
                                                            className="py-1"
                                                        >
                                                            {model.id}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option disabled>Loading models...</option>
                                                )}
                                            </select>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {models.length} of {availableModels.length} models selected
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            TPM (Tokens Per Minute)
                                        </label>
                                        <input
                                            type="number"
                                            value={tpm_limit}
                                            onChange={(e) => setTpmLimit(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            RPM (Requests Per Minute)
                                        </label>
                                        <input
                                            type="number"
                                            value={rpm_limit}
                                            onChange={(e) => setRpmLimit(e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Updating...' : 'Update'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
} 