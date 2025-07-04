
import React, { useState, useEffect } from 'react';
import { Bell, Cloud, Thermometer, Droplet, Wind } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const todayNotifications = [
    {
      id: 1,
      type: 'weather',
      title: 'Weather Alert',
      message: 'Light rain expected today. Good for recently sowed crops.',
      time: '6:00 AM',
      priority: 'medium',
      icon: Cloud
    },
    {
      id: 2,
      type: 'market',
      title: 'Price Update',
      message: 'Tomato prices increased by 8% in Delhi market.',
      time: '8:30 AM',
      priority: 'high',
      icon: Bell
    },
    {
      id: 3,
      type: 'farming',
      title: 'Farming Tip',
      message: 'Apply nitrogen fertilizer to wheat crop this week.',
      time: '9:15 AM',
      priority: 'medium',
      icon: Bell
    },
    {
      id: 4,
      type: 'scheme',
      title: 'Government Scheme',
      message: 'PM-KISAN 15th installment released. Check your account.',
      time: '2:00 PM',
      priority: 'high',
      icon: Bell
    }
  ];

  const weatherData = {
    temperature: '28°C',
    humidity: '65%',
    windSpeed: '12 km/h',
    rainfall: '2mm',
    forecast: 'Partly cloudy with chance of light rain'
  };

  const farmingTips = [
    'Monitor your crops for early signs of pest infestation',
    'Ensure proper drainage in fields during monsoon',
    'Apply organic mulch to retain soil moisture',
    'Check irrigation systems before peak season',
    'Store harvested grains in dry, ventilated areas'
  ];

  const marketUpdates = [
    { crop: 'Wheat', price: '₹2,100/quintal', change: '+2%' },
    { crop: 'Rice', price: '₹3,500/quintal', change: '0%' },
    { crop: 'Tomato', price: '₹45/kg', change: '+8%' },
    { crop: 'Onion', price: '₹28/kg', change: '-3%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-teal-200 bg-teal-50">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-teal-800 mb-2">🔔 Daily Updates</h2>
          <p className="text-teal-600">Weather, prices, and farming tips</p>
          <p className="text-sm text-teal-700 mt-2">
            Last updated: {currentTime.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Today's Notifications */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Today's Notifications</h3>
          <div className="space-y-3">
            {todayNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    notification.priority === 'high' 
                      ? 'border-l-red-500 bg-red-50' 
                      : 'border-l-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <IconComponent className={`w-5 h-5 mr-3 mt-1 ${
                        notification.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                        <p className="text-gray-700 mt-1">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{notification.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weather Information */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <Cloud className="w-6 h-6 mr-2" />
            Today's Weather
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center bg-white p-3 rounded-lg">
              <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <p className="text-lg font-bold text-gray-800">{weatherData.temperature}</p>
              <p className="text-sm text-gray-600">Temperature</p>
            </div>
            <div className="text-center bg-white p-3 rounded-lg">
              <Droplet className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <p className="text-lg font-bold text-gray-800">{weatherData.humidity}</p>
              <p className="text-sm text-gray-600">Humidity</p>
            </div>
            <div className="text-center bg-white p-3 rounded-lg">
              <Wind className="w-8 h-8 mx-auto mb-2 text-gray-500" />
              <p className="text-lg font-bold text-gray-800">{weatherData.windSpeed}</p>
              <p className="text-sm text-gray-600">Wind Speed</p>
            </div>
            <div className="text-center bg-white p-3 rounded-lg">
              <Cloud className="w-8 h-8 mx-auto mb-2 text-gray-700" />
              <p className="text-lg font-bold text-gray-800">{weatherData.rainfall}</p>
              <p className="text-sm text-gray-600">Rainfall</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Forecast:</h4>
            <p className="text-blue-700">{weatherData.forecast}</p>
          </div>
        </CardContent>
      </Card>

      {/* Market Updates */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">💰 Market Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketUpdates.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{item.crop}</h4>
                    <p className="text-lg font-bold text-green-600">{item.price}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.change.startsWith('+') 
                      ? 'bg-green-100 text-green-700'
                      : item.change.startsWith('-')
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farming Tips */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 Daily Farming Tips</h3>
          <div className="space-y-3">
            {farmingTips.map((tip, index) => (
              <div key={index} className="bg-white p-3 rounded-lg flex items-start">
                <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ Notification Settings</h3>
          
          <div className="space-y-4">
            {[
              { name: 'Weather Alerts', enabled: true },
              { name: 'Market Price Updates', enabled: true },
              { name: 'Government Scheme News', enabled: true },
              { name: 'Farming Tips', enabled: true },
              { name: 'Crop Disease Alerts', enabled: false },
              { name: 'Seasonal Reminders', enabled: true }
            ].map((setting, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{setting.name}</span>
                <Button
                  variant={setting.enabled ? "default" : "outline"}
                  size="sm"
                  className={setting.enabled ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {setting.enabled ? 'ON' : 'OFF'}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📱 Delivery Options</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• SMS notifications to your mobile</p>
              <p>• WhatsApp updates (if available)</p>
              <p>• Voice messages in local language</p>
              <p>• App notifications</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
