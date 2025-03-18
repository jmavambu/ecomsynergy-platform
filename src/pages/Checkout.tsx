
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  useEffect(() => {
    document.title = "Checkout | ESSENCE";
    
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const shippingCost = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8 max-w-5xl">
          <h1 className="text-2xl md:text-3xl font-light mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                        required
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium mb-4">Payment Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expDate" className="block text-sm font-medium mb-1">
                          Expiration Date
                        </label>
                        <input
                          type="text"
                          id="expDate"
                          name="expDate"
                          value={formData.expDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-foreground focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="glass rounded-lg p-6 shadow-sm sticky top-28">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between py-2">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-secondary mr-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <p className="text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (7%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between py-4 border-b border-border font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
