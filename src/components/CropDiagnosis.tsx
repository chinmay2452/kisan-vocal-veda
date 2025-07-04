
import React, { useState } from 'react';
import { Camera, Upload, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CropDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeCrop();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosis({
        disease: "Late Blight",
        confidence: "94%",
        crop: "Tomato",
        severity: "Moderate",
        treatment: [
          "Remove affected leaves immediately",
          "Apply copper-based fungicide",
          "Improve ventilation between plants",
          "Avoid overhead watering"
        ],
        prevention: [
          "Use resistant varieties",
          "Ensure proper spacing",
          "Apply preventive fungicide spray"
        ],
        localRemedies: [
          "Neem oil spray (10ml per liter)",
          "Baking soda solution (5g per liter)",
          "Garlic and ginger paste spray"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const capturePhoto = () => {
    // Camera implementation would go here
    console.log('Opening camera...');
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-2 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
            🔬 Crop Disease Diagnosis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={capturePhoto}
              className="h-20 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Camera className="w-8 h-8 mr-2" />
              Take Photo
            </Button>
            
            <label className="cursor-pointer">
              <Button asChild className="h-20 w-full bg-green-500 hover:bg-green-600 text-white">
                <div>
                  <Upload className="w-8 h-8 mr-2" />
                  Upload Image
                </div>
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <p className="text-center text-gray-600 mt-4">
            Take a clear photo of the affected plant or leaves
          </p>
        </CardContent>
      </Card>

      {/* Image Preview */}
      {selectedImage && (
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Uploaded Image:</h3>
            <img 
              src={selectedImage} 
              alt="Crop for diagnosis" 
              className="w-full max-w-md mx-auto rounded-lg shadow-md"
            />
          </CardContent>
        </Card>
      )}

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">Analyzing...</h3>
            <p className="text-yellow-700">Our AI is examining your crop image</p>
            <div className="mt-4 space-y-1 text-sm text-yellow-600">
              <p>✓ Image quality check</p>
              <p>✓ Crop identification</p>
              <p>🔍 Disease detection in progress...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Diagnosis Results */}
      {diagnosis && (
        <div className="space-y-4">
          {/* Main Diagnosis */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-red-600 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold text-red-800">{diagnosis.disease}</h3>
                  <p className="text-red-600">Confidence: {diagnosis.confidence} | Severity: {diagnosis.severity}</p>
                </div>
              </div>
              <p className="text-lg text-red-700">Detected in: <strong>{diagnosis.crop}</strong></p>
            </CardContent>
          </Card>

          {/* Treatment */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-green-800 mb-3">🩺 Immediate Treatment</h3>
              <ul className="space-y-2">
                {diagnosis.treatment.map((step: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-green-700">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Local Remedies */}
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-orange-800 mb-3">🌿 Local/Organic Remedies</h3>
              <ul className="space-y-2">
                {diagnosis.localRemedies.map((remedy: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-orange-600 mr-2">•</span>
                    <span className="text-orange-700">{remedy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Prevention */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-blue-800 mb-3">🛡️ Future Prevention</h3>
              <ul className="space-y-2">
                {diagnosis.prevention.map((tip: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-blue-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sample Images */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">📸 Tips for Better Diagnosis:</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-green-700">✅ Good Photos:</h4>
              <ul className="mt-1 space-y-1">
                <li>• Clear, focused images</li>
                <li>• Good lighting</li>
                <li>• Close-up of affected area</li>
                <li>• Multiple angles</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">❌ Avoid:</h4>
              <ul className="mt-1 space-y-1">
                <li>• Blurry images</li>
                <li>• Too dark/bright</li>
                <li>• Too far from plant</li>
                <li>• Dirty lens</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropDiagnosis;
