import React from 'react';
import { Brain, Shield, Zap, Users } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain className="text-emerald-600" size={32} />,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms trained on thousands of flower images'
    },
    {
      icon: <Zap className="text-amber-600" size={32} />,
      title: 'Instant Results',
      description: 'Get comprehensive health analysis and care recommendations in seconds'
    },
    {
      icon: <Shield className="text-blue-600" size={32} />,
      title: 'Expert Accuracy',
      description: 'Validated by botanical experts with 98% accuracy rate'
    },
    {
      icon: <Users className="text-purple-600" size={32} />,
      title: 'Community Driven',
      description: 'Continuously improved with feedback from gardening enthusiasts worldwide'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose FlowerCare AI?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge technology helps you keep your flowers healthy and blooming
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gray-50 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};