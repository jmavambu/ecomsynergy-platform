
import React from 'react';
import SellerDashboardLayout from '@/components/SellerDashboardLayout';

const SellerAnalytics = () => {
  return (
    <SellerDashboardLayout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
          <div className="flex flex-col items-center justify-center h-64 border rounded">
            <p className="text-muted-foreground">No sales data available yet</p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Top Products</h3>
          <div className="flex flex-col items-center justify-center h-64 border rounded">
            <p className="text-muted-foreground">Start selling to see your top products</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Revenue by Month</h3>
        <div className="flex flex-col items-center justify-center h-64 border rounded">
          <p className="text-muted-foreground">Historical data will appear here once you make sales</p>
        </div>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerAnalytics;
