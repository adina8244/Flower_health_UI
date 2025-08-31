import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { Features } from './components/Features';
import { LoadingSpinner } from './components/LoadingSpinner';
import { analyzeFlower } from './services/flowerAnalysis';
import { FlowerAnalysis, UploadedImage } from './types/flower';

function App() {
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FlowerAnalysis | null>(null);

  const handleImageSelect = async (image: UploadedImage) => {
    setSelectedImage(image);
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await analyzeFlower(image.file);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        {!selectedImage && !analysis && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Upload Your Flower Photo
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our AI will instantly analyze your flower's health, identify the species, 
                and provide personalized care recommendations to keep your garden thriving.
              </p>
            </div>
            
            <div className="mb-16">
              <ImageUpload 
                onImageSelect={handleImageSelect} 
                isAnalyzing={isAnalyzing}
              />
            </div>
            
            <Features />
          </>
        )}

        {selectedImage && isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <LoadingSpinner />
          </div>
        )}

        {analysis && (
          <AnalysisResults 
            analysis={analysis} 
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 FlowerCare AI. Helping gardeners worldwide keep their flowers healthy.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;