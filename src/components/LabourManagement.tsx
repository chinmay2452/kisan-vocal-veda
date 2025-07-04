
import React, { useState } from 'react';
import { Users, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LabourManagement = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedWork, setSelectedWork] = useState('');

  const availableWorkers = [
    {
      id: 1,
      name: 'Ramesh Kumar',
      skill: 'Harvesting Expert',
      experience: '8 years',
      location: 'Faridabad, Haryana',
      rate: '₹300/day',
      phone: '+91-9876543210',
      rating: 4.5,
      availability: 'Available',
      specialization: ['Wheat harvest', 'Rice cutting', 'Operate harvester']
    },
    {
      id: 2,
      name: 'Suresh Singh',
      skill: 'Tractor Operator',
      experience: '12 years',
      location: 'Rohtak, Haryana',
      rate: '₹800/day',
      phone: '+91-9876543211',
      rating: 4.8,
      availability: 'Available',
      specialization: ['Plowing', 'Seeding', 'Land preparation']
    },
    {
      id: 3,
      name: 'Meera Devi',
      skill: 'Crop Care',
      experience: '6 years',
      location: 'Sonipat, Haryana',
      rate: '₹250/day',
      phone: '+91-9876543212',
      rating: 4.3,
      availability: 'Busy until 15th',
      specialization: ['Weeding', 'Fertilizer application', 'Plant care']
    },
    {
      id: 4,
      name: 'Ajay Sharma',
      skill: 'General Farm Work',
      experience: '4 years',
      location: 'Gurgaon, Haryana',
      rate: '₹280/day',
      phone: '+91-9876543213',
      rating: 4.1,
      availability: 'Available',
      specialization: ['Sowing', 'Irrigation', 'General maintenance']
    }
  ];

  const workTypes = [
    'Harvesting', 'Plowing', 'Seeding', 'Weeding', 'Irrigation', 'Fertilizer Application', 'General Farm Work'
  ];

  const locations = [
    'Faridabad', 'Rohtak', 'Sonipat', 'Gurgaon', 'Panipat', 'Hisar', 'Karnal'
  ];

  const filteredWorkers = availableWorkers.filter(worker => {
    const locationMatch = !selectedLocation || worker.location.includes(selectedLocation);
    const workMatch = !selectedWork || worker.specialization.some(spec => 
      spec.toLowerCase().includes(selectedWork.toLowerCase())
    );
    return locationMatch && workMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-yellow-800 mb-2">👥 Find Farm Workers</h2>
          <p className="text-yellow-600">Connect with skilled agricultural workers</p>
        </CardContent>
      </Card>

      {/* Search Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Work
              </label>
              <select
                value={selectedWork}
                onChange={(e) => setSelectedWork(e.target.value)}
                className="w-full h-12 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All Work Types</option>
                {workTypes.map((work) => (
                  <option key={work} value={work}>{work}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workers List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">
          Available Workers ({filteredWorkers.length})
        </h3>
        
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{worker.name}</h4>
                      <p className="text-gray-600">{worker.skill}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{worker.rate}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600 ml-1">{worker.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{worker.experience} experience</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-700 mb-2">Specialization:</h5>
                    <div className="flex flex-wrap gap-2">
                      {worker.specialization.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        worker.availability === 'Available' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {worker.availability}
                      </span>
                    </div>
                    
                    <Button
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => window.open(`tel:${worker.phone}`)}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Post Job Requirement */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">📝 Post Your Job Requirement</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Type of work needed" className="h-12" />
              <Input placeholder="Number of workers needed" type="number" className="h-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Location" className="h-12" />
              <Input placeholder="Duration (days)" type="number" className="h-12" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Rate per day (₹)" type="number" className="h-12" />
              <Input placeholder="Start date" type="date" className="h-12" />
            </div>
            <Input placeholder="Your contact number" type="tel" className="h-12" />
            
            <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
              Post Job Requirement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-3">💡 Tips for Hiring Workers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Before Hiring:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Check worker's experience</li>
                <li>• Verify contact details</li>
                <li>• Discuss work scope clearly</li>
                <li>• Fix payment terms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">During Work:</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• Provide clear instructions</li>
                <li>• Ensure safety measures</li>
                <li>• Monitor work quality</li>
                <li>• Maintain good relations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabourManagement;
