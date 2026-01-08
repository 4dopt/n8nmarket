import React from 'react';
import { Check } from 'lucide-react';
import { Complexity } from '../types';

interface SidebarFiltersProps {
  selectedPlatforms: string[];
  onTogglePlatform: (platform: string) => void;
  selectedComplexity: Complexity[];
  onToggleComplexity: (complexity: Complexity) => void;
  availablePlatforms: string[];
}

const COMPLEXITY_OPTIONS = [
  { label: 'Simple', value: Complexity.BEGINNER },
  { label: 'Medium', value: Complexity.INTERMEDIATE },
  { label: 'Complex', value: Complexity.ADVANCED },
];



const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  selectedPlatforms,
  onTogglePlatform,
  selectedComplexity,
  onToggleComplexity,
  availablePlatforms
}) => {
  return (
    <div className="space-y-6">
      {/* Complexity Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4 text-lg">Complexity</h3>
        <div className="space-y-2">
          {COMPLEXITY_OPTIONS.map((option) => {
            const isSelected = selectedComplexity.includes(option.value);
            return (
              <label
                key={option.label}
                className="flex items-center space-x-3 cursor-pointer group py-1"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-slate-300 group-hover:border-indigo-400'
                    }`}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <span
                  className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                >
                  {option.label}
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => onToggleComplexity(option.value)}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Platforms Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-4 text-lg">Platforms</h3>
        <div className="space-y-2">
          {availablePlatforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform);
            return (
              <label
                key={platform}
                className="flex items-center space-x-3 cursor-pointer group py-1"
              >
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-slate-300 group-hover:border-indigo-400'
                    }`}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
                <span
                  className={`text-sm ${isSelected ? 'text-indigo-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'
                    }`}
                >
                  {platform}
                </span>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={() => onTogglePlatform(platform)}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;