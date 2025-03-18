
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const text = textRef.current;
    const cta = ctaRef.current;

    if (heading) heading.classList.add('appear');
    
    setTimeout(() => {
      if (text) text.classList.add('appear');
    }, 300);
    
    setTimeout(() => {
      if (cta) cta.classList.add('appear');
    }, 600);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"
        style={{ filter: 'brightness(0.9)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/40" />
      </div>
      
      <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
        <h1 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 animate-on-scroll"
        >
          <span className="font-normal">Minimal Design.</span>
          <br />
          <span>Maximum Impact.</span>
        </h1>
        
        <p 
          ref={textRef}
          className="max-w-2xl text-base md:text-lg text-muted-foreground mb-10 animate-on-scroll"
        >
          Curated collection of premium essentials designed with uncompromising attention to detail.
          Every product reflects our commitment to quality, sustainability, and timeless design.
        </p>
        
        <div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 animate-on-scroll"
        >
          <Button 
            size="lg" 
            onClick={() => navigate('/products')}
          >
            Explore Collection
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => {
              const featuredSection = document.getElementById('featured');
              if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            View Featured
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div 
          className="animate-bounce cursor-pointer"
          onClick={() => {
            const featuredSection = document.getElementById('featured');
            if (featuredSection) {
              featuredSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="opacity-60"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
