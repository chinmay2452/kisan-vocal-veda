
import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const FertilizerShopping = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState<any[]>([]);

  const products = [
    {
      id: 1,
      name: 'NPK 19:19:19',
      category: 'NPK Fertilizer',
      brand: 'IFFCO',
      price: 850,
      unit: '50kg bag',
      rating: 4.5,
      reviews: 245,
      inStock: true,
      description: 'Complete balanced fertilizer for all crops',
      nutrients: ['Nitrogen 19%', 'Phosphorus 19%', 'Potassium 19%'],
      suitableFor: ['Wheat', 'Rice', 'Sugarcane', 'Cotton']
    },
    {
      id: 2,
      name: 'Urea (46% N)',
      category: 'Nitrogen Fertilizer',
      brand: 'NFL',
      price: 650,
      unit: '45kg bag',
      rating: 4.3,
      reviews: 189,
      inStock: true,
      description: 'High nitrogen content for vegetative growth',
      nutrients: ['Nitrogen 46%'],
      suitableFor: ['Wheat', 'Rice', 'Maize', 'Vegetables']
    },
    {
      id: 3,
      name: 'DAP (18:46:0)',
      category: 'Phosphate Fertilizer',
      brand: 'IFFCO',
      price: 1250,
      unit: '50kg bag',
      rating: 4.6,
      reviews: 312,
      inStock: true,
      description: 'High phosphorus for root development',
      nutrients: ['Nitrogen 18%', 'Phosphorus 46%'],
      suitableFor: ['All crops', 'Fruit trees', 'Vegetables']
    },
    {
      id: 4,
      name: 'Potash (MOP)',
      category: 'Potassium Fertilizer',
      brand: 'RCF',
      price: 950,
      unit: '50kg bag',
      rating: 4.4,
      reviews: 156,
      inStock: false,
      description: 'Essential for fruit quality and disease resistance',
      nutrients: ['Potassium 60%'],
      suitableFor: ['Fruits', 'Vegetables', 'Sugarcane']
    },
    {
      id: 5,
      name: 'Organic Vermicompost',
      category: 'Organic Fertilizer',
      brand: 'Nature Care',
      price: 320,
      unit: '40kg bag',
      rating: 4.7,
      reviews: 98,
      inStock: true,
      description: '100% organic, improves soil health',
      nutrients: ['Organic matter 35%', 'NPK 1.5:1:1'],
      suitableFor: ['All crops', 'Organic farming', 'Kitchen garden']
    },
    {
      id: 6,
      name: 'Zinc Sulphate',
      category: 'Micronutrient',
      brand: 'Coromandel',
      price: 180,
      unit: '5kg bag',
      rating: 4.2,
      reviews: 67,
      inStock: true,
      description: 'Corrects zinc deficiency in crops',
      nutrients: ['Zinc 33%', 'Sulphur 17%'],
      suitableFor: ['Rice', 'Wheat', 'Citrus', 'Vegetables']
    }
  ];

  const categories = ['All', 'NPK Fertilizer', 'Nitrogen Fertilizer', 'Phosphate Fertilizer', 'Potassium Fertilizer', 'Organic Fertilizer', 'Micronutrient'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-red-200 bg-red-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">🛒 Fertilizer Shop</h2>
              <p className="text-red-600">Quality fertilizers at best prices</p>
            </div>
            <div className="text-right">
              <Button className="bg-red-600 hover:bg-red-700 relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({getTotalItems()})
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search fertilizers, brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  <p className="text-gray-600 text-sm">{product.brand}</p>
                  <p className="text-gray-500 text-xs">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                  <p className="text-sm text-gray-500">{product.unit}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm text-gray-600 ml-1">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-3">{product.description}</p>
              
              <div className="mb-3">
                <h5 className="font-medium text-gray-700 text-sm mb-1">Nutrients:</h5>
                <div className="flex flex-wrap gap-1">
                  {product.nutrients.map((nutrient, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {nutrient}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h5 className="font-medium text-gray-700 text-sm mb-1">Suitable for:</h5>
                <div className="flex flex-wrap gap-1">
                  {product.suitableFor.map((crop, idx) => (
                    <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                
                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-green-800 mb-4">🛒 Cart Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.brand} - {item.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Qty: {item.quantity}</p>
                    <p className="text-green-600 font-bold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold">Total: ₹{getTotalPrice()}</span>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setCart([])}>
                    Clear Cart
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Info */}
      <Card className="border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-3">🚚 Delivery Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Free Delivery:</h4>
              <p className="text-blue-600">Orders above ₹2,000</p>
              <p className="text-blue-600">Within 50km radius</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Delivery Time:</h4>
              <p className="text-blue-600">2-3 working days</p>
              <p className="text-blue-600">Express: Next day</p>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Payment Options:</h4>
              <p className="text-blue-600">Cash on Delivery</p>
              <p className="text-blue-600">UPI, Card, Net Banking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FertilizerShopping;
