
import React from 'react';
import { categories } from '../data/mockData';

interface CategoryBarProps {
  onCategorySelect: (categoryName: string | null) => void;
  selectedCategory: string | null;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ onCategorySelect, selectedCategory }) => {
  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex space-x-8 py-3 whitespace-nowrap">
        <button 
          onClick={() => onCategorySelect(null)}
          className={`text-sm font-medium transition-colors ${!selectedCategory ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:text-pink-600'}`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.name)}
            className={`text-sm font-medium transition-colors ${selectedCategory === cat.name ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:text-pink-600'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
