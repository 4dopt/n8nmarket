import React from 'react';
import { Check, Zap, Shield, Crown, Clock, HelpCircle, ArrowRight } from 'lucide-react';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FF] font-sans">
      {/* Header Section */}
      <div className="relative bg-[#1d234d] pt-32 pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1d234d] via-[#1a237e] to-[#311b92]"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">Infinite</span> Automation Potential
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
            Stop building from scratch. Get lifetime access to our entire library of premium n8n workflows and start saving hundreds of hours today.
          </p>
        </div>
      </div>

      {/* Pricing Card Section - Overlapping the header */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-24">
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl shadow-indigo-900/20 overflow-hidden border border-slate-200">
          {/* Limited Time Banner */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-3 text-center">
            <p className="text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              <Clock size={16} />
              Limited Time Offer — 60% OFF
            </p>
          </div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-medium text-slate-500 mb-2">Lifetime Access</h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-3xl text-slate-400 font-medium line-through decoration-slate-400 decoration-2">
                  £49.99
                </span>
                <span className="text-6xl font-extrabold text-slate-900 tracking-tight">
                  £19.99
                </span>
              </div>
              <p className="text-slate-500 text-sm">One-time payment. No monthly fees.</p>
            </div>

            <button className="w-full bg-[#1d234d] hover:bg-[#2a3163] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 mb-8 flex items-center justify-center gap-2 group">
              Get Instant Access
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="space-y-4">
              <FeatureRow text="Access to ALL current workflows" />
              <FeatureRow text="Access to ALL future updates" />
              <FeatureRow text="Commercial use license included" />
              <FeatureRow text="Priority email support" />
              <FeatureRow text="Private Discord community access" />
              <FeatureRow text="30-day money-back guarantee" />
            </div>
          </div>
          
          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
              <Shield size={12} className="text-green-500" />
              Secure payment via Stripe. 256-bit SSL Encrypted.
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 font-medium mb-6">Trusted by over 500+ automation experts</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="font-bold text-slate-700 text-xl flex items-center gap-2"><Crown size={20}/> TechFlow</div>
             <div className="font-bold text-slate-700 text-xl flex items-center gap-2"><Zap size={20}/> AutoMate</div>
             <div className="font-bold text-slate-700 text-xl flex items-center gap-2"><Shield size={20}/> SecureOps</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQItem 
              question="Is this really a one-time payment?" 
              answer="Yes! You pay £19.99 once and get lifetime access to our entire library. There are no recurring subscriptions or hidden fees."
            />
            <FAQItem 
              question="Do I get access to future workflows?" 
              answer="Absolutely. We add new workflows every week, and you'll get instant access to them without paying anything extra. The value of your purchase grows over time."
            />
            <FAQItem 
              question="Can I use these workflows for client work?" 
              answer="Yes, the commercial license is included. You can use these workflows in your own business or implement them for your clients without any restrictions."
            />
            <FAQItem 
              question="What if I'm not satisfied?" 
              answer="We offer a 30-day money-back guarantee. If you don't save time with our workflows, just email us and we'll refund your payment in full, no questions asked."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureRow: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
      <Check size={12} className="text-green-600 font-bold" />
    </div>
    <span className="text-slate-700 font-medium">{text}</span>
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
    <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-3">
      <HelpCircle className="text-indigo-500 mt-1 flex-shrink-0" size={20} />
      {question}
    </h4>
    <p className="text-slate-600 ml-8 leading-relaxed">
      {answer}
    </p>
  </div>
);

export default PricingPage;