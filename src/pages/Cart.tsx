
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Cart | ESSENCE";
  }, []);
  
  const shippingCost = subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl md:text-3xl font-light mb-8">Shopping Cart</h1>
          
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-1">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="glass rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  
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
                      fullWidth
                      size="lg"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                    
                    <Button
                      fullWidth
                      variant="outline"
                      onClick={() => navigate('/products')}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
                <ShoppingCart size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button onClick={() => navigate('/products')}>Browse Products</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
