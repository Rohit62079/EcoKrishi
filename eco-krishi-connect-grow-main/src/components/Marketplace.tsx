
import React from 'react';
import ActionButton from './ui/ActionButton';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: {
    name: string;
    farmer: string;
    location: string;
    price: string;
    unit: string;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card-eco h-full flex flex-col">
      <div className="h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-eco-dark">{product.name}</h3>
        <div className="text-sm text-gray-600 mb-2">
          {product.farmer} • {product.location}
        </div>
        <div className="flex items-baseline mb-3">
          <span className="text-lg font-bold text-eco-primary">{product.price}</span>
          <span className="text-sm text-gray-500 ml-1">per {product.unit}</span>
        </div>
        <ActionButton 
          variant="primary" 
          size="sm" 
          fullWidth
          icon={<ShoppingCart size={16} />}
        >
          Buy Now
        </ActionButton>
      </div>
    </div>
  );
};

const Marketplace: React.FC = () => {
  const products = [
    {
      name: 'Organic Basmati Rice',
      farmer: 'Harpreet Singh',
      location: 'Punjab',
      price: '₹120',
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Fresh Turmeric',
      farmer: 'Anita Desai',
      location: 'Kerala',
      price: '₹80',
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    },
    {
      name: 'Organic Honey',
      farmer: 'Manoj Tiwari',
      location: 'Uttarakhand',
      price: '₹350',
      unit: 'bottle',
      image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2080&q=80',
    },
  ];

  return (
    <section className="py-16 bg-eco-light">
      <div className="eco-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="section-title mb-2">Marketplace</h2>
            <p className="text-gray-600 max-w-2xl">
              Buy and sell organic produce directly, eliminating middlemen and ensuring fair prices for both farmers and consumers.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <ActionButton variant="outlined">
              Visit Full Marketplace
            </ActionButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
