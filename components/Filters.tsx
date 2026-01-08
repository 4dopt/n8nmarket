import React from 'react';
import { Category } from '../types';

interface FiltersProps {
  currentCategory: Category | 'All';
  setCategory: (category: Category | 'All') => void;
  counts: Record<string, number>;
}

// Emoji mapping for categories
const CATEGORY_EMOJIS: Record<string, string> = {
  'All': '🌐',
  [Category.AI_AGENTS]: '🧠',
  [Category.FINANCE]: '💰',
  [Category.REAL_ESTATE]: '🏘️',
  [Category.SOCIAL_MEDIA]: '📲',
  [Category.HEALTHCARE]: '🏥',
  [Category.SECURITY_IT]: '🔒',
  [Category.RESEARCH]: '📚',
  [Category.SALES]: '🤝',
  [Category.SUPPORT]: '🎧',
  [Category.ECOMMERCE]: '🛍️',
  [Category.PRODUCTIVITY]: '📅',
};

const Filters: React.FC<FiltersProps> = ({ currentCategory, setCategory, counts }) => {
  const categories = Object.values(Category);

  return (
    <div className="w-full mb-8 lg:mb-12">
      {/* Mobile/Tablet: Horizontal Scroll */}
      <div className="overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:pb-0 lg:overflow-visible no-scrollbar">
        <div className="flex lg:flex-wrap lg:justify-center gap-3 min-w-max lg:min-w-0">
          <button
            onClick={() => setCategory('All')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2 whitespace-nowrap ${
              currentCategory === 'All'
                ? 'bg-[#4338ca] border-[#4338ca] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>{CATEGORY_EMOJIS['All']}</span>
            All Category
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2 whitespace-nowrap ${
                currentCategory === cat
                  ? 'bg-[#4338ca] border-[#4338ca] text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{CATEGORY_EMOJIS[cat]}</span>
              {cat}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                 currentCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {counts[cat] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;