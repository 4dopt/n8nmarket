import React from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background Gradient matching OneSignal style */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1d234d] via-[#1a237e] to-[#311b92]"></div>

      {/* Subtle overlay elements for texture */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Supercharge your n8n workflows
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Discover battle-tested automation templates. Connect your favorite apps and streamline your operations in minutes, not days.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-indigo-400 group-focus-within:text-pink-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 rounded-lg bg-white border-0 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-pink-500 shadow-xl"
            placeholder="Search integrations (e.g., Slack, HubSpot)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;