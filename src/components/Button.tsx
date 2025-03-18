
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          // Variants
          "bg-primary text-primary-foreground hover:opacity-90": variant === 'primary',
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === 'secondary',
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === 'outline',
          "hover:bg-accent hover:text-accent-foreground": variant === 'ghost',
          "text-primary underline-offset-4 hover:underline": variant === 'link',
          // Sizes
          "h-9 rounded-md px-4 text-sm": size === 'sm',
          "h-10 px-5 py-2 text-base": size === 'md',
          "h-12 rounded-md px-8 text-lg": size === 'lg',
          // Width
          "w-full": fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
