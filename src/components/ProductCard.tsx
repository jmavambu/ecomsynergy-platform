
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import Button from './Button';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { items, addItem } = useCart();
  const isInCart = items.some(item => item.id === product.id);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 left-2">
            <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
              Low stock
            </span>
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-medium">
          <Link to={`/product/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
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
            <span className="ml-1 text-xs text-muted-foreground">
              {product.rating}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <Button
            variant={isInCart ? "secondary" : "primary"}
            fullWidth
            disabled={product.stock === 0}
            onClick={() => {
              if (!isInCart) {
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  quantity: 1
                });
              }
            }}
          >
            {isInCart ? (
              <>
                <Check size={16} className="mr-2" />
                Added to Cart
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
