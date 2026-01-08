import React from 'react';

interface FooterProps {
    onNavigate: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-500 text-sm">
                    © 2024 NexusAI. All rights reserved.
                </div>
                <div className="flex gap-8">
                    <button onClick={() => onNavigate('home')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Marketplace</button>
                    <button onClick={() => onNavigate('pricing')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Pricing</button>
                    <button onClick={() => onNavigate('documentation')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Documentation</button>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
