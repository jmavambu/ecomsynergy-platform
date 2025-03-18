
import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-border animate-fade-in">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
