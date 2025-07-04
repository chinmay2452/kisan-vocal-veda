
import React, { useState } from 'react';
import { FileText, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const GovernmentSchemes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<any>(null);

  const schemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      title: 'Pradhan Mantri Kisan Samman Nidhi',
      amount: '₹6,000/year',
      description: 'Direct income support to farmers',
      eligibility: [
        'Small and marginal farmers',
        'Land holding up to 2 hectares',
        'Valid Aadhaar card',
        'Bank account linked with Aadhaar'
      ],
      documents: [
        'Aadhaar card',
        'Bank passbook',
        'Land records',
        'Mobile number'
      ],
      benefits: 'Get ₹2,000 every 4 months directly in bank account',
      applicationLink: 'https://pmkisan.gov.in',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Crop Insurance',
      title: 'Pradhan Mantri Fasal Bima Yojana',
      amount: 'Up to ₹2 Lakh',
      description: 'Crop loss protection scheme',
      eligibility: [
        'All farmers (owner/tenant)',
        'Enrolled for seasonal crop',
        'Premium payment within time',
        'Valid land documents'
      ],
      documents: [
        'Aadhaar card',
        'Bank details',
        'Land ownership/tenancy proof',
        'Sowing certificate'
      ],
      benefits: 'Compensation for crop loss due to natural calamities',
      applicationLink: 'https://pmfby.gov.in',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Drip Irrigation',
      title: 'Micro Irrigation Subsidy',
      amount: '50-90% subsidy',
      description: 'Water-efficient irrigation support',
      eligibility: [
        'All category farmers',
        'Minimum 0.5 acre land',
        'Water source available',
        'No previous subsidy'
      ],
      documents: [
        'Land documents',
        'Water source proof',
        'Bank details',
        'Quotation from vendor'
      ],
      benefits: 'Save water and increase crop yield',
      applicationLink: 'https://pmksy.gov.in',
      status: 'Active'
    },
    {
      id: 4,
      name: 'KCC',
      title: 'Kisan Credit Card',
      amount: 'Up to ₹3 Lakh',
      description: 'Easy agricultural credit',
      eligibility: [
        'Individual/joint farmers',
        'Valid land documents',
        'Good credit history',
        'Age 18-75 years'
      ],
      documents: [
        'Application form',
        'Land documents',
        'Identity proof',
        'Income proof'
      ],
      benefits: 'Low interest agricultural loans',
      applicationLink: 'https://kcc.gov.in',
      status: 'Active'
    }
  ];

  const filteredSchemes = schemes.filter(scheme =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-2">🏛️ Government Schemes</h2>
          <p className="text-blue-600">Find subsidies, loans, and benefits for farmers</p>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <Input
            type="text"
            placeholder="Search schemes (PM-KISAN, crop insurance, loans...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 text-lg"
          />
        </CardContent>
      </Card>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => (
          <Card 
            key={scheme.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedScheme?.id === scheme.id ? 'border-2 border-green-500 bg-green-50' : 'border border-gray-200'
            }`}
            onClick={() => setSelectedScheme(scheme)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{scheme.name}</h3>
                  <p className="text-gray-600 text-sm">{scheme.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{scheme.amount}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    scheme.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {scheme.status}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3">{scheme.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 font-medium">Click for details →</span>
                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(scheme.applicationLink, '_blank');
                  }}
                >
                  Apply Online
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed View */}
      {selectedScheme && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-green-800">{selectedScheme.name}</h3>
                <p className="text-green-600 text-lg">{selectedScheme.title}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-700">{selectedScheme.amount}</p>
                <Button
                  className="mt-2 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(selectedScheme.applicationLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Eligibility */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {selectedScheme.eligibility.map((criteria: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Required Documents
                </h4>
                <ul className="space-y-2">
                  {selectedScheme.documents.map((doc: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">💰 Benefits</h4>
              <p className="text-gray-700">{selectedScheme.benefits}</p>
            </div>

            {/* Application Steps */}
            <div className="bg-white p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-gray-800 mb-3">📝 How to Apply</h4>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  <span className="text-gray-700">Visit official website or nearest CSC center</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  <span className="text-gray-700">Fill application form with correct details</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  <span className="text-gray-700">Upload required documents</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
                  <span className="text-gray-700">Submit and note down application number</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-purple-800 mb-3">🆘 Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Toll-Free Numbers:</h4>
              <p className="text-purple-600">PM-KISAN: 155261</p>
              <p className="text-purple-600">Crop Insurance: 14447</p>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Visit Centers:</h4>
              <p className="text-purple-600">Common Service Centers</p>
              <p className="text-purple-600">Block Agriculture Office</p>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Online Support:</h4>
              <p className="text-purple-600">Ministry websites</p>
              <p className="text-purple-600">State portals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentSchemes;
