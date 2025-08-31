import React, { useCallback, useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (image: { file: File; preview: string }) => void;
  isAnalyzing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const preview = URL.createObjectURL(file);
      setSelectedImage(preview);
      onImageSelect({ file, preview });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
  };

  if (selectedImage) {
    return (
      <div className="relative">
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected flower"
            className="w-full h-80 object-cover"
          />
          {!isAnalyzing && (
            <button
              onClick={clearImage}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200 shadow-lg"
            >
              <X size={20} />
            </button>
          )}
        </div>
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">Analyzing your flower...</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
        dragActive
          ? 'border-emerald-500 bg-emerald-50 scale-105'
          : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-25'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={isAnalyzing}
      />
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-emerald-100 rounded-full">
            <Upload size={48} className="text-emerald-600" />
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Upload a flower image
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your flower photo here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, WebP up to 10MB
          </p>
        </div>
        
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
            <Camera size={20} />
            Choose Photo
          </button>
        </div>
      </div>
    </div>
  );
};