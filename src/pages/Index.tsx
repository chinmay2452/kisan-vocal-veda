
import React, { useState } from 'react';
import { Mic, Camera, TrendingUp, FileText, Bell, ShoppingCart, Users, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CropDiagnosis from '@/components/CropDiagnosis';
import MarketAnalysis from '@/components/MarketAnalysis';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import VoiceAssistant from '@/components/VoiceAssistant';
import LabourManagement from '@/components/LabourManagement';
import FertilizerShopping from '@/components/FertilizerShopping';
import LoanInfo from '@/components/LoanInfo';
import Notifications from '@/components/Notifications';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const features = [
    {
      id: 'voice',
      title: 'Voice Assistant',
      subtitle: 'Ask anything in your language',
      icon: Mic,
      color: 'bg-green-500',
      component: VoiceAssistant
    },
    {
      id: 'diagnosis',
      title: 'Crop Doctor',
      subtitle: 'Diagnose plant diseases',
      icon: Camera,
      color: 'bg-blue-500',
      component: CropDiagnosis
    },
    {
      id: 'market',
      title: 'Market Prices',
      subtitle: 'Real-time crop prices',
      icon: TrendingUp,
      color: 'bg-orange-500',
      component: MarketAnalysis
    },
    {
      id: 'schemes',
      title: 'Government Schemes',
      subtitle: 'Find subsidies & benefits',
      icon: FileText,
      color: 'bg-purple-500',
      component: GovernmentSchemes
    },
    {
      id: 'loan',
      title: 'Loan Information',
      subtitle: 'Agricultural loans & EMI',
      icon: Phone,
      color: 'bg-indigo-500',
      component: LoanInfo
    },
    {
      id: 'labour',
      title: 'Find Workers',
      subtitle: 'Hire farm labour',
      icon: Users,
      color: 'bg-yellow-500',
      component: LabourManagement
    },
    {
      id: 'fertilizer',
      title: 'Buy Fertilizers',
      subtitle: 'Online fertilizer shop',
      icon: ShoppingCart,
      color: 'bg-red-500',
      component: FertilizerShopping
    },
    {
      id: 'notifications',
      title: 'Daily Updates',
      subtitle: 'Weather & farming tips',
      icon: Bell,
      color: 'bg-teal-500',
      component: Notifications
    }
  ];

  const ActiveComponent = activeFeature ? features.find(f => f.id === activeFeature)?.component : null;

  if (ActiveComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={() => setActiveFeature(null)}
              variant="outline"
              className="text-green-700 border-green-300 hover:bg-green-50"
            >
              ← Back to Home
            </Button>
            <h1 className="text-2xl font-bold text-green-800">
              {features.find(f => f.id === activeFeature)?.title}
            </h1>
          </div>
          <ActiveComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-green-600 text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">🌾 Kisan Sahayak</h1>
          <p className="text-green-100 text-lg">Your Smart Farming Assistant</p>
        </div>
      </div>

      {/* Quick Voice Button */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6 border-2 border-green-200 shadow-lg">
          <CardContent className="p-6 text-center">
            <Button
              onClick={() => setIsListening(!isListening)}
              className={`w-full h-20 text-xl font-semibold rounded-xl transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 pulse' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <Mic className="w-8 h-8 mr-3" />
              {isListening ? 'Listening... Tap to Stop' : 'Press & Speak in Your Language'}
            </Button>
            <p className="text-sm text-gray-600 mt-3">
              Ask: "What's the tomato price today?" or "Show me crop diseases"
            </p>
          </CardContent>
        </Card>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300"
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Emergency Helpline</h3>
            <p className="text-orange-700">Kisan Call Centre: <strong>1800-180-1551</strong></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
