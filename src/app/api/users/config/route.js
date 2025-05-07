import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const body = await request.json();
        const authorization = request.headers.get('authorization');

        // Forward the request to LiteLLM API
        const response = await fetch('http://0.0.0.0:4000/key/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sabari'
            },
            body: JSON.stringify({
                key: body.key,
                user_id: body.user_id,
                max_budget: body.max_budget,
                budget_duration: body.budget_duration,
                models: body.models || [],
                tpm_limit: body.tpm_limit,
                rpm_limit: body.rpm_limit,
                model_tpm_limit: body.model_tpm_limit || {},
                model_rpm_limit: body.model_rpm_limit || {},
                max_parallel_requests: body.max_parallel_requests || 0,
                allowed_routes: body.allowed_routes || []
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || 'Failed to update configuration' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating configuration:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
} 