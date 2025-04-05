
import React from 'react';
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth = false,
  className,
  disabled = false,
}) => {
  const baseStyles = "font-medium rounded-md flex items-center justify-center transition-colors";
  
  const variantStyles = {
    primary: "bg-eco-primary hover:bg-eco-dark text-white border border-transparent",
    secondary: "bg-eco-accent hover:bg-amber-500 text-eco-dark border border-transparent",
    outlined: "bg-transparent hover:bg-eco-light text-eco-primary border border-eco-primary",
    text: "bg-transparent hover:bg-eco-light text-eco-primary border border-transparent",
  };
  
  const sizeStyles = {
    sm: "text-sm px-3 py-1.5 space-x-1.5",
    md: "text-base px-4 py-2 space-x-2",
    lg: "text-lg px-6 py-3 space-x-3",
  };
  
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "cursor-pointer";
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        disabledStyles,
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {icon && children && <span />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default ActionButton;
