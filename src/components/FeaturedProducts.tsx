
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from './ProductCard';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
    };
  }, []);

  return (
    <section id="featured" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div 
          ref={headerRef}
          className="mb-12 text-center animate-on-scroll"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium products designed with exceptional attention to detail and uncompromising quality.
          </p>
        </div>
        
        <div 
          ref={productsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-on-scroll"
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center text-sm font-medium hover:underline"
          >
            View All Products
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
