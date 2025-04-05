
import React from 'react';
import { User } from 'lucide-react';

interface FarmerProps {
  farmer: {
    name: string;
    location: string;
    avatar: string;
    expertise: string;
  };
}

const FarmerCard: React.FC<FarmerProps> = ({ farmer }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-50 rounded-md transition-colors">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
        <img 
          src={farmer.avatar} 
          alt={farmer.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.parentElement!.innerHTML = `<div class="w-full h-full bg-eco-light flex items-center justify-center text-eco-primary"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>`;
          }}
        />
      </div>
      <div>
        <h4 className="font-medium text-eco-dark text-sm">{farmer.name}</h4>
        <div className="flex flex-col text-xs">
          <span className="text-gray-500">{farmer.location}</span>
          <span className="text-eco-primary">{farmer.expertise}</span>
        </div>
      </div>
      <button className="ml-auto px-2 py-1 text-xs rounded-md border border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white transition-colors">
        Connect
      </button>
    </div>
  );
};

export default FarmerCard;
