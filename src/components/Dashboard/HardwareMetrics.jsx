'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';

export default function HardwareMetrics({ startDate, endDate }) {
  const { theme } = useTheme();
  
  // Mock data for hardware metrics
  const hardwareData = [
    {
      name: 'NVIDIA A100',
      metrics: {
        gpu: 78,
        memory: 65,
        utilization: 82
      },
      status: 'active'
    },
    {
      name: 'NVIDIA A6000',
      metrics: {
        gpu: 92,
        memory: 88,
        utilization: 95
      },
      status: 'active'
    },
    {
      name: 'RTX 4090',
      metrics: {
        gpu: 45,
        memory: 30,
        utilization: 40
      },
      status: 'idle'
    }
  ];

  // Theme-based styles
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hardwareData.map((hardware, index) => (
        <div 
          key={index}
          className={`rounded-lg border ${borderColor} p-4 relative overflow-hidden`}
        >
          {/* Status Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`
              h-3 w-3 rounded-full 
              ${hardware.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}
              shadow-lg
            `}/>
          </div>

          {/* Hardware Name */}
          <h3 className="text-lg font-semibold mb-4">{hardware.name}</h3>

          {/* Metrics */}
          <div className="space-y-4">
            {/* GPU Usage */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>GPU Usage</span>
                <span>{hardware.metrics.gpu}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${hardware.metrics.gpu}%` }}
                />
              </div>
            </div>

            {/* Memory Usage */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Memory</span>
                <span>{hardware.metrics.memory}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${hardware.metrics.memory}%` }}
                />
              </div>
            </div>

            {/* Utilization */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Utilization</span>
                <span>{hardware.metrics.utilization}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${hardware.metrics.utilization}%` }}
                />
              </div>
            </div>
          </div>

          {/* Status Text */}
          <div className="mt-4 text-sm">
            <span className={`
              capitalize
              ${hardware.status === 'active' ? 'text-green-500' : 'text-gray-400'}
            `}>
              {hardware.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 