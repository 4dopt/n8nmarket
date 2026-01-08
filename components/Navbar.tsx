import React from 'react';
import { Menu, Zap } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'home' | 'pricing' | 'documentation') => void;
  theme?: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, theme = 'dark' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isDark = theme === 'dark';

  // Text colors based on background
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-200' : 'text-slate-600';
  const hoverColor = isDark ? 'hover:text-slate-200' : 'hover:text-indigo-600';
  const logoSubTextOpacity = isDark ? 'opacity-80' : 'opacity-60 text-slate-500';

  const handleMobileNavigate = (view: 'home' | 'pricing' | 'documentation') => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className={`relative z-50 flex items-center space-x-2 ${isOpen ? 'text-slate-900' : textColor} hover:opacity-90 transition-opacity`}
        >
          <div className="bg-pink-500 p-1 rounded-md">
            <Zap size={20} fill="white" className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">n8n<span className={`font-light ${isOpen ? 'opacity-60 text-slate-500' : logoSubTextOpacity}`}>market</span></span>
        </button>

        <div className={`hidden md:flex items-center space-x-8 text-sm font-medium ${subTextColor}`}>
          <button onClick={() => onNavigate('home')} className={`${hoverColor} transition-colors`}>Workflows</button>
          <button onClick={() => onNavigate('pricing')} className={`${hoverColor} transition-colors`}>Pricing</button>
          <button onClick={() => onNavigate('documentation')} className={`${hoverColor} transition-colors`}>Documentation</button>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <button className={`text-sm font-medium ${textColor} ${hoverColor}`}>Log in</button>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-sm font-medium bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500 shadow-lg shadow-pink-900/20 transition-all"
          >
            Get started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden relative z-50 p-2 -mr-2 ${isOpen ? 'text-slate-900' : textColor}`}
        >
          {isOpen ? <Zap size={24} className="rotate-45" /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-white md:hidden animate-in slide-in-from-top-10 fade-in duration-200">
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              <button onClick={() => handleMobileNavigate('home')} className="text-2xl font-bold text-slate-900">Workflows</button>
              <button onClick={() => handleMobileNavigate('pricing')} className="text-2xl font-bold text-slate-900">Pricing</button>
              <button onClick={() => handleMobileNavigate('documentation')} className="text-2xl font-bold text-slate-900">Documentation</button>
              <hr className="w-full max-w-xs border-slate-100" />
              <button className="text-lg font-medium text-slate-500">Log in</button>
              <button
                onClick={() => handleMobileNavigate('pricing')}
                className="w-full max-w-xs bg-pink-600 text-white font-bold py-4 rounded-xl shadow-xl shadow-pink-200"
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;