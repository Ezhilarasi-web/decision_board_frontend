import React from 'react';

/**
 * Loading skeleton for the dashboard when data is loading
 */
const DashboardSkeleton: React.FC = () => {
  return (
    <div className="flex h-screen mx-auto w-full">
      <div className="w-full h-full relative max-w-[calc(100%-4rem)] mx-auto">
        <div className="w-full h-full overflow-y-auto px-6">
          <div className="space-y-6">
            <div>
              <div className="h-8 w-54 animate-pulse mb-4 sticky top-0 bg-white z-10 py-3"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="h-[610px] bg-slate-700/30 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;