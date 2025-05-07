'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useConfig } from '@/components/config-provider';

export default function HardwareMetrics() {
  const { theme } = useTheme();
  const { backgroundColor } = useConfig();
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 68,
    storage: 35,
    network: 25,
    gpu: 84
  });

  // Theme-based styles
  const cardBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  const renderMetric = (label, value, color) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-gray-500">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="p-6" style={{ backgroundColor }}>
      <h2 className="text-xl font-semibold mb-6">Hardware Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${cardBg} rounded-lg border ${borderColor} p-6`}>
          <h3 className="text-lg font-medium mb-4">System Resources</h3>
          
          {renderMetric("CPU Usage", metrics.cpu, "bg-blue-500")}
          {renderMetric("Memory", metrics.memory, "bg-green-500")}
          {renderMetric("Storage", metrics.storage, "bg-yellow-500")}
          {renderMetric("Network", metrics.network, "bg-purple-500")}
        </div>
        
        <div className={`${cardBg} rounded-lg border ${borderColor} p-6`}>
          <h3 className="text-lg font-medium mb-4">GPU Resources</h3>
          
          {renderMetric("GPU Usage", metrics.gpu, "bg-red-500")}
          {renderMetric("VRAM", metrics.memory, "bg-indigo-500")}
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Active GPUs</h4>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-500">NVIDIA A6000 x 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 