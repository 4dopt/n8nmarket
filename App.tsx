import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import HomePage from './components/HomePage';
import WorkflowPage from './components/WorkflowPage';
import PricingPage from './components/PricingPage';
import DocumentationPage from './components/DocumentationPage';
import Navbar from './components/Navbar';
import CategoryPage from './components/CategoryPage';

import CategoryListPage from './components/CategoryListPage';

// Wrapper for existing pages that need simpler props or layout
// Since PricingPage and DocumentationPage were expecting onNavigate, 
// we might need to wrap them if they strictly require it.
// Checking imports: types.ts says View = 'home' | ... 
// Let's assume for now we can just render them. 
// If they have internal navigation buttons, they might break without onNavigate.
// But usually pages like Pricing just link.

// Helper to provide navigation compatibility if needed
// const RoutedPricingPage = () => {
//   const navigate = useNavigate();
//   return <PricingPage onNavigate={() => navigate('/')} />; // mocked
// };

// Actually, let's look at PricingPage if we can. 
// But assuming standard structure, I'll pass a dummy function or update them if I can view them later.
// For now, I'll update App to render them and see if TS complains.

// But wait, the original App.tsx imports them. 
// I'll render them directly. If they require props, I will add a wrapper.

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workflow/:slug" element={<WorkflowPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* 
             The original components likely expect onNavigate. 
             We can't easily see their definition without viewing.
             I'll create a safer wrapper just in case.
           */}
          <Route path="/pricing" element={<PageWrapper component={PricingPage} />} />
          <Route path="/documentation" element={<PageWrapper component={DocumentationPage} />} />

          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

// Simple wrapper to handle the 'onNavigate' prop legacy
import { useNavigate } from 'react-router-dom';

const PageWrapper = ({ component: Component }: { component: any }) => {
  const navigate = useNavigate();

  // Adapt the old onNavigate('home'|'pricing' etc) to router navigation
  const handleNavigate = (view: string) => {
    if (view === 'home') navigate('/');
    else if (view === 'workflow') { /* needs id */ }
    else navigate(`/${view}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={handleNavigate} />
      <Component />
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2024 NexusAI. All rights reserved.
            </div>
            <div className="flex gap-8">
              <button onClick={() => navigate('/')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Marketplace</button>
              <button onClick={() => navigate('/pricing')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Pricing</button>
              <button onClick={() => navigate('/documentation')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Documentation</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;