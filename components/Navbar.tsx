
import React from 'react';
import { Search, ShoppingCart, User, Bell, Heart, Menu } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  onViewChange: (view: ViewState) => void;
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onViewChange, onSearch, onToggleSidebar }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button onClick={onToggleSidebar} className="md:hidden text-gray-600 hover:text-gray-900">
              <Menu size={24} />
            </button>
            <div 
              className="flex-shrink-0 cursor-pointer" 
              onClick={() => onViewChange(ViewState.HOME)}
            >
              <span className="text-2xl font-bold text-pink-600">meesho</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Try Saree, Kurti or Search by Product Code"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors">
              <User size={20} />
              <span className="text-[10px] mt-1 font-medium">Profile</span>
            </button>
            <button className="hidden sm:flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors">
              <Heart size={20} />
              <span className="text-[10px] mt-1 font-medium">Wishlist</span>
            </button>
            <button 
              className="flex flex-col items-center text-gray-600 hover:text-pink-600 transition-colors relative"
              onClick={() => onViewChange(ViewState.CART)}
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[8px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-[10px] mt-1 font-medium">Cart</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm"
            placeholder="Search products..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
