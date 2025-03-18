
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const categories = Array.from(
  new Set(products.map((product) => product.category))
);

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  
  useEffect(() => {
    document.title = "Shop | ESSENCE";
  }, []);
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = newValue;
    setPriceRange(newRange);
  };
  
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-light">Products</h1>
              <button 
                className="flex items-center gap-1 text-sm md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={16} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters - Desktop */}
              <div className="hidden md:block w-60 flex-shrink-0 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Search</h3>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={16} className="text-muted-foreground" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="pl-10 block w-full rounded-md border border-input bg-background py-2 text-sm text-foreground shadow-sm ring-0 focus:border-foreground focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    <div 
                      className={`flex items-center cursor-pointer py-1 text-sm ${
                        selectedCategory === null ? 'font-medium' : 'text-muted-foreground'
                      }`}
                      onClick={() => setSelectedCategory(null)}
                    >
                      All Categories
                    </div>
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`flex items-center cursor-pointer py-1 text-sm ${
                          selectedCategory === category ? 'font-medium' : 'text-muted-foreground'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">${priceRange[0]}</span>
                      <span className="text-sm">${priceRange[1]}</span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Filters - Mobile */}
              {showFilters && (
                <div className="md:hidden glass fixed inset-0 top-16 z-40 p-5 animate-scale-in shadow-lg">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-lg font-medium">Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Search</h3>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search size={16} className="text-muted-foreground" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="pl-10 block w-full rounded-md border border-input bg-background py-2 text-sm text-foreground shadow-sm ring-0 focus:border-foreground focus:outline-none"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-4">Categories</h3>
                      <div className="space-y-2">
                        <div 
                          className={`flex items-center cursor-pointer py-1 text-sm ${
                            selectedCategory === null ? 'font-medium' : 'text-muted-foreground'
                          }`}
                          onClick={() => {
                            setSelectedCategory(null);
                            setShowFilters(false);
                          }}
                        >
                          All Categories
                        </div>
                        {categories.map((category) => (
                          <div
                            key={category}
                            className={`flex items-center cursor-pointer py-1 text-sm ${
                              selectedCategory === category ? 'font-medium' : 'text-muted-foreground'
                            }`}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowFilters(false);
                            }}
                          >
                            {category}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-4">Price Range</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm">${priceRange[0]}</span>
                          <span className="text-sm">${priceRange[1]}</span>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="w-full"
                          />
                          <input
                            type="range"
                            min="0"
                            max="200"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Products */}
              <div className="flex-1">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <h3 className="text-lg mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
