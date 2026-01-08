import React, { useState } from 'react';
import { X, Sparkles, Loader2, Server } from 'lucide-react';
import { generateWorkflowIdea } from '../services/geminiService';
import { AiWorkflowResponse } from '../types';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiWorkflowResponse | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);

    // Call the service
    const aiResponse = await generateWorkflowIdea(prompt);
    
    setResult(aiResponse);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="text-yellow-300" />
              AI Workflow Architect
            </h2>
            <p className="text-indigo-100 mt-1 text-sm">
              Describe your automation problem, and Gemini will design a solution.
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {!result && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  What do you want to automate?
                </label>
                <textarea
                  className="w-full h-32 p-4 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g., When a new row is added to Google Sheets, create a Trello card, wait for approval via Slack, then email the customer."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading || !prompt}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Designing...
                  </>
                ) : (
                  'Generate Blueprint'
                )}
              </button>
            </form>
          )}

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <h3 className="text-lg font-bold text-green-900 mb-1">{result.title}</h3>
                <p className="text-green-700 text-sm">{result.summary}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Logic Flow</h4>
                <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-[15px] before:w-0.5 before:bg-slate-200">
                  {result.steps.map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-1 w-8 h-8 bg-white border-2 border-indigo-500 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 z-10">
                            {idx + 1}
                        </div>
                        <div className="bg-slate-50 p-3 rounded border border-slate-100 text-slate-700 text-sm">
                            {step}
                        </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Recommended Nodes</h4>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedNodes.map((node, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
                        <Server size={12} />
                        {node}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setResult(null)} 
                className="w-full py-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;