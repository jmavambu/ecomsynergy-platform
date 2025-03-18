
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Package2, ShoppingCart, BarChart3, Settings } from 'lucide-react';

interface SellerDashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const SellerDashboardLayout: React.FC<SellerDashboardLayoutProps> = ({ 
  children, 
  title 
}) => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Products', 
      path: '/seller/products', 
      icon: <Package2 className="w-5 h-5" /> 
    },
    { 
      name: 'Orders', 
      path: '/seller/orders', 
      icon: <ShoppingCart className="w-5 h-5" /> 
    },
    { 
      name: 'Analytics', 
      path: '/seller/analytics', 
      icon: <BarChart3 className="w-5 h-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/account', 
      icon: <Settings className="w-5 h-5" /> 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1">
              <div className="sticky top-24 space-y-1 rounded-lg border p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      location.pathname === item.path 
                        ? 'bg-secondary text-foreground' 
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </aside>
            
            {/* Main content */}
            <div className="md:col-span-3 space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-light">{title}</h1>
              </div>
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboardLayout;
