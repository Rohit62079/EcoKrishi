
import React from 'react';
import { Users, FileText, ShoppingCart, WifiOff } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="card-eco p-6">
      <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center text-eco-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-eco-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Users size={24} />,
      title: 'Farmer Community',
      description: 'Connect with fellow farmers, share experiences, and learn from each other\'s practices for better results.',
    },
    {
      icon: <FileText size={24} />,
      title: 'Knowledge Hub',
      description: 'Access information about organic farming techniques, government schemes, and disease identification.',
    },
    {
      icon: <ShoppingCart size={24} />,
      title: 'Direct Marketplace',
      description: 'Sell your produce directly to consumers and businesses, eliminating middlemen and increasing profits.',
    },
    {
      icon: <WifiOff size={24} />,
      title: 'Offline Access',
      description: 'Access critical information even without internet connectivity, ensuring you\'re never left without help.',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="eco-container">
        <div className="text-center mb-12">
          <h2 className="section-title">How EcoKrishi Helps Farmers</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our platform is designed to address the unique challenges faced by rural organic farmers
            and provide solutions that improve livelihoods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
