import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Skeleton */}
      <div className="bg-blue-600 h-10 animate-pulse"></div>
      
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="bg-gray-900 w-64 min-h-screen p-4">
          <div className="mb-8">
            <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <main className="flex-1 p-6">
          {/* Metrics Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="h-4 bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>

          {/* Charts Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="h-64 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Series Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg p-6">
                <div className="h-6 bg-gray-700 rounded mb-4 animate-pulse"></div>
                <div className="h-48 bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
