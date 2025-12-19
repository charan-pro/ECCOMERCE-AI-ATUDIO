import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import AIShopper from './components/AIShopper';
import { Product, CartItem, ViewState } from './types';
import { products } from './data/mockData';
// Added Search icon to the lucide-react import
import { ChevronLeft, ShoppingCart, Trash2, ArrowRight, Search } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView(ViewState.PRODUCT_DETAILS);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 sm:pb-0">
      <Navbar 
        cartCount={cart.length} 
        onViewChange={setView} 
        onSearch={setSearchQuery}
        onToggleSidebar={() => {}}
      />

      {view === ViewState.HOME && (
        <>
          <CategoryBar 
            selectedCategory={selectedCategory} 
            onCategorySelect={setSelectedCategory} 
          />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Banner Section */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-white flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
              <div className="z-10 text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Lowest Prices,<br/>Best Quality Shopping</h1>
                <p className="text-lg opacity-90 mb-6">Join 10 Crore+ people using Meesho for smart shopping</p>
                <button className="bg-white text-pink-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                  Shop Now
                </button>
              </div>
              <div className="hidden md:block relative w-64 h-64">
                <img 
                  src="https://picsum.photos/seed/shop/400/400" 
                  alt="Promo" 
                  className="rounded-full border-4 border-white shadow-2xl"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Products For You</h2>
              <span className="text-sm text-pink-600 font-medium cursor-pointer hover:underline">View All</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={handleProductClick} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                {/* Fixed: Search icon is now correctly imported */}
                <Search className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-lg text-gray-500 font-medium">No products found matching your search.</h3>
              </div>
            )}
          </main>
        </>
      )}

      {view === ViewState.PRODUCT_DETAILS && selectedProduct && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="flex items-center text-gray-600 hover:text-pink-600 mb-6 font-medium transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" /> Back to Home
          </button>
          
          <div className="grid md:grid-cols-2 gap-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="max-h-[600px] w-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h1>
              <div className="flex items-center space-x-2 mb-6 text-sm text-gray-500">
                <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-bold">{selectedProduct.category}</span>
                <span>|</span>
                <span className="flex items-center text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                  {selectedProduct.rating} ★
                </span>
                <span>{selectedProduct.reviews} Ratings</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-extrabold text-gray-900">₹{selectedProduct.price}</span>
                  <span className="text-lg text-gray-400 line-through">₹{selectedProduct.originalPrice}</span>
                  <span className="text-lg text-green-600 font-bold">
                    {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% Off
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>In stock and ready to ship</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-sm mb-2 text-gray-700">Delivery Options</h4>
                  <p className="text-xs text-gray-500">Enter Pincode to check delivery date</p>
                  <div className="mt-2 flex">
                    <input type="text" placeholder="Enter Pincode" className="flex-1 bg-white border border-gray-200 rounded-l-lg px-3 py-2 text-sm focus:outline-none" />
                    <button className="bg-pink-600 text-white px-4 py-2 rounded-r-lg text-sm font-bold">Check</button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 mt-auto">
                <button 
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 border-2 border-pink-600 text-pink-600 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-pink-50 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button 
                  className="flex-1 bg-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-pink-700 shadow-lg shadow-pink-200"
                >
                  <span>Buy Now</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {view === ViewState.CART && (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart ({cart.length})</h1>
            <button 
              onClick={() => setView(ViewState.HOME)}
              className="text-pink-600 font-bold text-sm hover:underline"
            >
              Continue Shopping
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 text-gray-500 hover:text-pink-600"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 text-gray-500 hover:text-pink-600"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                    <p className="text-xs text-gray-400">₹{item.price} each</p>
                  </div>
                </div>
              ))}
              
              {cart.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                  <ShoppingCart size={64} className="mx-auto text-gray-200 mb-4" />
                  <h2 className="text-xl font-bold text-gray-400">Your cart is empty</h2>
                  <button 
                    onClick={() => setView(ViewState.HOME)}
                    className="mt-4 bg-pink-600 text-white px-8 py-2 rounded-full font-bold"
                  >
                    Go Shop Now
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Price Details</h2>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Total Product Price</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Total Discount</span>
                  <span>-₹0</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-lg font-bold text-gray-900">
                  <span>Order Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl hover:bg-pink-700 shadow-lg shadow-pink-100 transition-all disabled:opacity-50 disabled:shadow-none"
              >
                Checkout Now
              </button>
              <div className="mt-4 flex items-center justify-center space-x-2 grayscale opacity-50">
                <img src="https://img.icons8.com/color/48/visa.png" className="h-6" alt="visa" />
                <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6" alt="mastercard" />
                <img src="https://img.icons8.com/color/48/google-pay.png" className="h-6" alt="gpay" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* AI Assistant */}
      <AIShopper />

      {/* Mobile Sticky CTA */}
      {view === ViewState.HOME && cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200 md:hidden z-40 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">Total Amount</p>
            <p className="text-lg font-bold">₹{cartTotal}</p>
          </div>
          <button 
            onClick={() => setView(ViewState.CART)}
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold flex items-center space-x-2"
          >
            <span>View Cart</span>
            <ShoppingCart size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;