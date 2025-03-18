
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "Crafted from premium aluminum with an adjustable arm and dimmable LED light. The perfect addition to any modern workspace.",
    price: 129.99,
    category: "Lighting",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: "2",
    name: "Wireless Charging Pad",
    description: "Elegant wireless charging pad compatible with all Qi-enabled devices. Features a non-slip surface and fast charging technology.",
    price: 59.99,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1633310911482-6db8e83bba8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1313&q=80",
      "https://images.unsplash.com/photo-1697081544719-7095f0040cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80"
    ],
    rating: 4.6,
    stock: 28,
    featured: true
  },
  {
    id: "3",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Hand-crafted ceramic pour-over coffee maker with matching cup. Designed for perfect extraction and temperature retention.",
    price: 84.99,
    category: "Kitchen",
    images: [
      "https://images.unsplash.com/photo-1497935586047-9395971fc3a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1147&q=80"
    ],
    rating: 4.9,
    stock: 10,
    featured: true
  },
  {
    id: "4",
    name: "Leather Notebook Cover",
    description: "Premium full-grain leather notebook cover that ages beautifully. Fits standard A5 notebooks and includes a pen holder.",
    price: 69.99,
    category: "Stationery",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1696257203553-20ada15fce65?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80"
    ],
    rating: 4.7,
    stock: 22,
    featured: true
  },
  {
    id: "5",
    name: "Wool & Cashmere Throw Blanket",
    description: "Ultra-soft throw blanket made from a blend of wool and cashmere. Perfect for cooler evenings and adding texture to your space.",
    price: 149.99,
    category: "Home",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1511881830150-850572962174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80"
    ],
    rating: 4.9,
    stock: 8,
    featured: false
  },
  {
    id: "6",
    name: "Matte Black Water Bottle",
    description: "Double-walled stainless steel water bottle with vacuum insulation. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 39.99,
    category: "Kitchen",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80"
    ],
    rating: 4.5,
    stock: 35,
    featured: false
  },
  {
    id: "7",
    name: "Minimalist Wall Clock",
    description: "Silent movement wall clock with a clean, numberless design. Made from natural wood with contrasting hands.",
    price: 79.99,
    category: "Home",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1535942491-6901e07b2e96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
    ],
    rating: 4.7,
    stock: 12,
    featured: false
  },
  {
    id: "8",
    name: "Handcrafted Ceramic Vase",
    description: "Each vase is uniquely shaped by artisan hands. Perfect for displaying minimal floral arrangements or standing alone as a sculptural piece.",
    price: 89.99,
    category: "Home",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80",
      "https://images.unsplash.com/photo-1516737347189-ed6ee46d4b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1888&q=80"
    ],
    rating: 4.8,
    stock: 7,
    featured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (id: string, count: number = 4): Product[] => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];
  
  return products
    .filter(product => product.id !== id && product.category === currentProduct.category)
    .slice(0, count);
};
