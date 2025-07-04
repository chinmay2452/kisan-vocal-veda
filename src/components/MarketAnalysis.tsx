
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MarketAnalysis = () => {
  const [searchCrop, setSearchCrop] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  const marketData = [
    {
      name: 'Tomato',
      price: 40,
      unit: 'kg',
      change: '+5%',
      trend: 'up',
      market: 'Delhi',
      quality: 'Grade A',
      demand: 'High'
    },
    {
      name: 'Onion',
      price: 25,
      unit: 'kg',
      change: '-2%',
      trend: 'down',
      market: 'Mumbai',
      quality: 'Grade A',
      demand: 'Medium'
    },
    {
      name: 'Potato',
      price: 18,
      unit: 'kg',
      change: '+3%',
      trend: 'up',
      market: 'Kolkata',
      quality: 'Grade B',
      demand: 'High'
    },
    {
      name: 'Wheat',
      price: 2100,
      unit: 'quintal',
      change: '+1%',
      trend: 'up',
      market: 'Punjab',
      quality: 'Grade A',
      demand: 'Stable'
    },
    {
      name: 'Rice',
      price: 3500,
      unit: 'quintal',
      change: '0%',
      trend: 'stable',
      market: 'Haryana',
      quality: 'Grade A',
      demand: 'Stable'
    }
  ];

  const filteredCrops = marketData.filter(crop =>
    crop.name.toLowerCase().includes(searchCrop.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-2">📈 Market Prices</h2>
          <p className="text-green-600">Real-time agricultural commodity prices</p>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for crops (tomato, wheat, rice...)"
              value={searchCrop}
              onChange={(e) => setSearchCrop(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Market Prices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCrops.map((crop, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedCrop?.name === crop.name ? 'border-2 border-blue-500 bg-blue-50' : 'border border-gray-200'
            }`}
            onClick={() => setSelectedCrop(crop)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{crop.name}</h3>
                  <p className="text-gray-600 text-sm">{crop.market} Market</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">₹{crop.price}</p>
                  <p className="text-sm text-gray-500">per {crop.unit}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  crop.trend === 'up' ? 'bg-green-100 text-green-700' :
                  crop.trend === 'down' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {crop.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> :
                   crop.trend === 'down' ? <TrendingDown className="w-4 h-4 mr-1" /> : null}
                  {crop.change}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Quality: {crop.quality}</p>
                  <p className="text-sm text-gray-600">Demand: {crop.demand}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedCrop && (
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              {selectedCrop.name} - Detailed Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700">Current Price</h4>
                <p className="text-2xl font-bold text-green-600">₹{selectedCrop.price}/{selectedCrop.unit}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700">24h Change</h4>
                <p className={`text-2xl font-bold ${
                  selectedCrop.trend === 'up' ? 'text-green-600' : 
                  selectedCrop.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {selectedCrop.change}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700">Market Demand</h4>
                <p className="text-2xl font-bold text-blue-600">{selectedCrop.demand}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-3">💡 Market Insights</h4>
              <div className="space-y-2 text-gray-600">
                <p>• Best selling time: {selectedCrop.trend === 'up' ? 'Now is good time to sell' : 'Wait for better prices'}</p>
                <p>• Quality grade: {selectedCrop.quality} - Premium pricing available</p>
                <p>• Transportation: Consider {selectedCrop.market} market for best rates</p>
                <p>• Storage: {selectedCrop.demand === 'High' ? 'Sell quickly due to high demand' : 'Can store for better prices'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-800 mb-3">💰 Selling Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-yellow-700 mb-2">Best Time to Sell:</h4>
              <ul className="space-y-1 text-yellow-600">
                <li>• Early morning (6-8 AM)</li>
                <li>• Peak season demand</li>
                <li>• Before festivals</li>
                <li>• When trend is upward</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-700 mb-2">Price Negotiation:</h4>
              <ul className="space-y-1 text-yellow-600">
                <li>• Know quality grades</li>
                <li>• Compare multiple markets</li>
                <li>• Sell in bulk for better rates</li>
                <li>• Build trader relationships</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;
