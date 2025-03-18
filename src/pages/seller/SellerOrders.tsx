
import React from 'react';
import SellerDashboardLayout from '@/components/SellerDashboardLayout';

const SellerOrders = () => {
  return (
    <SellerDashboardLayout title="Orders">
      <div className="bg-card rounded-lg shadow-sm p-8 text-center">
        <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
        <p className="text-muted-foreground">
          When customers place orders for your products, they'll appear here.
        </p>
      </div>
    </SellerDashboardLayout>
  );
};

export default SellerOrders;
