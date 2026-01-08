import React from 'react';
import { Menu, Zap } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'pricing' | 'documentation') => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-white hover:opacity-90 transition-opacity"
        >
          <div className="bg-pink-500 p-1 rounded-md">
            <Zap size={20} fill="white" className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">n8n<span className="font-light opacity-80">market</span></span>
        </button>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-200">
          <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">Workflows</button>
          <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing</button>
          <button onClick={() => onNavigate('documentation')} className="hover:text-white transition-colors">Documentation</button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm font-medium text-white hover:text-slate-200">Log in</button>
          <button 
            onClick={() => onNavigate('pricing')}
            className="text-sm font-medium bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500 shadow-lg shadow-pink-900/20 transition-all"
          >
            Get started
          </button>
        </div>

        <div className="md:hidden text-white">
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;