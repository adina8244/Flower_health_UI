import React from 'react';
import { Flower } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <Flower size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">FlowerCare AI</h1>
            <p className="text-emerald-100 text-lg">
              Advanced flower health analysis powered by artificial intelligence
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-emerald-100 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold">500+</div>
            <div className="text-emerald-100 text-sm">Flower Species</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-emerald-100 text-sm">Available</div>
          </div>
        </div>
      </div>
    </header>
  );
};