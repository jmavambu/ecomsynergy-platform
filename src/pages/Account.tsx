
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { User, Mail, Lock, Home, Package, Heart, CreditCard, LogOut, Loader2 } from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [profileForm, setProfileForm] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '(123) 456-7890',
    address: '123 Main St',
    city: 'San Francisco',
    zip: '94103',
    country: 'United States'
  });
  
  useEffect(() => {
    document.title = "Account | ESSENCE";
  }, []);
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      toast.success('Logged in successfully!');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      toast.success('Account created successfully!');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setIsLoading(false);
    }, 1000);
  };
  
  const renderAuthForms = () => (
    <div className="max-w-md mx-auto py-8">
      <div className="mb-8 flex space-x-2 border-b border-border">
        <button
          className={`pb-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'login'
              ? 'border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`pb-2 px-4 text-sm font-medium transition-colors ${
            activeTab === 'signup'
              ? 'border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>
      
      {activeTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="login-email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="login-password" className="block text-sm font-medium">
                Password
              </label>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="login-password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="signup-name"
              value={signupForm.name}
              onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="signup-email"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="signup-password"
              value={signupForm.password}
              onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-confirm-password" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="signup-confirm-password"
              value={signupForm.confirmPassword}
              onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
              required
            />
          </div>
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      )}
    </div>
  );
  
  const renderAccountDashboard = () => (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="glass rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <User size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium">{profileForm.name}</h3>
              <p className="text-sm text-muted-foreground">{profileForm.email}</p>
            </div>
            
            <nav className="space-y-1">
              <button
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-secondary font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} />
                <span>Profile</span>
              </button>
              <button
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-secondary font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={16} />
                <span>Orders</span>
              </button>
              <button
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'wishlist'
                    ? 'bg-secondary font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setActiveTab('wishlist')}
              >
                <Heart size={16} />
                <span>Wishlist</span>
              </button>
              <button
                className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'payment'
                    ? 'bg-secondary font-medium'
                    : 'text-muted-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard size={16} />
                <span>Payment Methods</span>
              </button>
              <button
                className="w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="glass rounded-lg shadow-sm p-6">
            {activeTab === 'profile' && (
              <>
                <h2 className="text-lg font-medium mb-6">Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="profile-name" className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="profile-name"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="profile-email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="profile-phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="profile-phone"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                    />
                  </div>
                  
                  <h3 className="text-md font-medium mt-6 mb-4">Shipping Address</h3>
                  
                  <div>
                    <label htmlFor="profile-address" className="block text-sm font-medium mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="profile-address"
                      value={profileForm.address}
                      onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="profile-city" className="block text-sm font-medium mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="profile-city"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-zip" className="block text-sm font-medium mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="profile-zip"
                        value={profileForm.zip}
                        onChange={(e) => setProfileForm({ ...profileForm, zip: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="profile-country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="profile-country"
                        value={profileForm.country}
                        onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </form>
              </>
            )}
            
            {activeTab === 'orders' && (
              <>
                <h2 className="text-lg font-medium mb-6">Order History</h2>
                <div className="text-center py-8">
                  <Package size={40} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-md font-medium mb-2">No orders yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    When you place orders, they'll appear here.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                  >
                    Start Shopping
                  </Button>
                </div>
              </>
            )}
            
            {activeTab === 'wishlist' && (
              <>
                <h2 className="text-lg font-medium mb-6">Wishlist</h2>
                <div className="text-center py-8">
                  <Heart size={40} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-md font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Save items you like to your wishlist.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/products')}
                  >
                    Browse Products
                  </Button>
                </div>
              </>
            )}
            
            {activeTab === 'payment' && (
              <>
                <h2 className="text-lg font-medium mb-6">Payment Methods</h2>
                <div className="text-center py-8">
                  <CreditCard size={40} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-md font-medium mb-2">No payment methods</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't added any payment methods yet.
                  </p>
                  <Button
                    variant="outline"
                  >
                    Add Payment Method
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-light mb-8">My Account</h1>
          
          {isAuthenticated ? renderAccountDashboard() : renderAuthForms()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
