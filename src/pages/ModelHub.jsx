import React, { useState } from 'react';
import UpdateUserConfigModal from '../components/UpdateUserConfigModal';

export default function ModelHub() {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleUpdateConfig = () => {
        // Refresh the page or update the UI as needed
        window.location.reload();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Model Hub</h1>
                <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                    Update User Configuration
                </button>
            </div>

            {/* Your existing ModelHub content */}

            <UpdateUserConfigModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onUpdate={handleUpdateConfig}
            />
        </div>
    );
} 