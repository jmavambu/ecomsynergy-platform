
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { getProductById, getRelatedProducts } from '@/data/products';
import { Minus, Plus, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const product = id ? getProductById(id) : undefined;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  const isInCart = items.some(item => item.id === id);
  const cartItem = items.find(item => item.id === id);
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | ESSENCE`;
    } else {
      document.title = 'Product Not Found | ESSENCE';
    }
    
    window.scrollTo(0, 0);
  }, [product, id]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/products')}>
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!isInCart) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-sm mb-6 hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-secondary">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, idx) => (
                    <button
                      key={idx}
                      className={`relative w-16 h-16 rounded overflow-hidden border ${
                        activeImage === idx ? 'border-primary' : 'border-border'
                      }`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - view ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-light mb-2">{product.name}</h1>
                <p className="text-xl font-medium">${product.price.toFixed(2)}</p>
                
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-primary' : 'text-muted'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({Math.floor(product.rating * 10)} reviews)
                  </span>
                </div>
              </div>
              
              <div className="py-4 border-y border-border">
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>
              
              {product.stock > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="text-sm mr-4">Quantity</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-input transition-colors hover:bg-secondary"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-input transition-colors hover:bg-secondary"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      fullWidth 
                      size="lg" 
                      onClick={handleAddToCart}
                      disabled={isInCart}
                    >
                      {isInCart ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    
                    {isInCart && (
                      <div className="text-sm text-center text-muted-foreground">
                        This item is already in your cart ({cartItem?.quantity} {cartItem?.quantity === 1 ? 'unit' : 'units'})
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-3 border border-muted rounded text-center">
                  <span className="text-sm font-medium">Out of Stock</span>
                </div>
              )}
              
              <div className="pt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                  </svg>
                  <span className="text-sm">Free shipping on orders over $50</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                  <span className="text-sm">Handcrafted with premium materials</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <span className="text-sm">1-year warranty</span>
                </div>
              </div>
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="mt-16 md:mt-24">
              <h2 className="text-2xl font-light mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
