
import React, { useState } from 'react';
import { Calculator, Phone, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoanInfo = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('7');
  const [tenure, setTenure] = useState('12');
  const [emiResult, setEmiResult] = useState<any>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseInt(tenure);

    if (principal && rate && months) {
      const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      const totalAmount = emi * months;
      const totalInterest = totalAmount - principal;

      setEmiResult({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest)
      });
    }
  };

  const loanTypes = [
    {
      name: 'Kisan Credit Card (KCC)',
      interestRate: '4-7%',
      maxAmount: '₹3 Lakh',
      features: ['Flexible repayment', 'Low interest', 'No collateral up to ₹1.6L'],
      banks: ['SBI', 'HDFC', 'ICICI', 'Axis Bank']
    },
    {
      name: 'Crop Loan',
      interestRate: '7-9%',
      maxAmount: '₹10 Lakh',
      features: ['Seasonal loans', 'Input purchase', 'Working capital'],
      banks: ['Punjab National Bank', 'Bank of Baroda', 'Canara Bank']
    },
    {
      name: 'Equipment Loan',
      interestRate: '8-12%',
      maxAmount: '₹25 Lakh',
      features: ['Tractor purchase', 'Farm machinery', 'Long tenure'],
      banks: ['Mahindra Finance', 'John Deere Finance', 'TAFE Finance']
    },
    {
      name: 'Land Purchase Loan',
      interestRate: '9-12%',
      maxAmount: '₹50 Lakh',
      features: ['Agricultural land', 'Long tenure', 'Competitive rates'],
      banks: ['ICICI Bank', 'HDFC Bank', 'State Bank of India']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-indigo-200 bg-indigo-50">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">🏦 Agricultural Loans</h2>
          <p className="text-indigo-600">Low interest loans for farmers</p>
        </CardContent>
      </Card>

      {/* EMI Calculator */}
      <Card className="border-2 border-green-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <Calculator className="w-6 h-6 mr-2" />
            EMI Calculator
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (₹)
              </label>
              <Input
                type="number"
                placeholder="e.g., 100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per year)
              </label>
              <Input
                type="number"
                placeholder="e.g., 7"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (months)
              </label>
              <Input
                type="number"
                placeholder="e.g., 12"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="h-12"
              />
            </div>
          </div>
          
          <Button 
            onClick={calculateEMI}
            className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
          >
            Calculate EMI
          </Button>

          {emiResult && (
            <div className="mt-6 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">EMI Calculation Result:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-green-600">Monthly EMI</p>
                  <p className="text-2xl font-bold text-green-800">₹{emiResult.emi.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-800">₹{emiResult.totalAmount.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-green-600">Total Interest</p>
                  <p className="text-2xl font-bold text-green-800">₹{emiResult.totalInterest.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Loan Types */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">💰 Available Loan Types</h3>
        {loanTypes.map((loan, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{loan.name}</h4>
                  <p className="text-gray-600">Interest Rate: {loan.interestRate}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{loan.maxAmount}</p>
                  <p className="text-sm text-gray-500">Max Amount</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 mb-2">Key Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {loan.features.map((feature, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Available at:</h5>
                <div className="flex flex-wrap gap-2">
                  {loan.banks.map((bank, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {bank}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
            <Phone className="w-6 h-6 mr-2" />
            Loan Assistance Contacts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Government Helplines:</h4>
              <div className="space-y-2 text-blue-600">
                <p>• KCC Helpline: <strong>1800-180-1551</strong></p>
                <p>• NABARD: <strong>022-2653-9895</strong></p>
                <p>• Agriculture Ministry: <strong>1800-180-1551</strong></p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-700 mb-3">Bank Customer Care:</h4>
              <div className="space-y-2 text-blue-600">
                <p>• SBI: <strong>1800-1234</strong></p>
                <p>• HDFC: <strong>1800-267-4332</strong></p>
                <p>• ICICI: <strong>1860-120-7777</strong></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-800 mb-3">💡 Loan Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-yellow-700 mb-2">Before Applying:</h4>
              <ul className="space-y-1 text-yellow-600">
                <li>• Check your credit score</li>
                <li>• Compare interest rates</li>
                <li>• Prepare all documents</li>
                <li>• Calculate repayment capacity</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-700 mb-2">Documents Needed:</h4>
              <ul className="space-y-1 text-yellow-600">
                <li>• Aadhaar & PAN card</li>
                <li>• Land documents</li>
                <li>• Bank statements</li>
                <li>• Income proof</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanInfo;
