
import React from 'react';
import { Star, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div 
      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {product.tag && (
          <div className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            {product.tag}
          </div>
        )}
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm text-gray-500 font-medium truncate mb-1">
          {product.name}
        </h3>
        
        <div className="flex items-baseline space-x-2 mt-auto">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
          <span className="text-xs text-green-600 font-bold">{discount}% off</span>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <div className="flex items-center bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.rating} <Star size={10} className="ml-1 fill-current" />
          </div>
          <span className="text-[10px] text-gray-400 font-medium">{product.reviews} Reviews</span>
        </div>

        {product.freeDelivery && (
          <div className="mt-2 flex items-center text-[10px] text-gray-500 bg-gray-50 py-1 px-2 rounded w-fit">
            <Truck size={12} className="mr-1 text-gray-400" />
            <span>Free Delivery</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
