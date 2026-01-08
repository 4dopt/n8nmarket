import React, { useState } from 'react';
import { Book, Code, Settings, AlertCircle, FileJson, ChevronRight, Terminal, Copy, Check, HeartPulse, Code2 } from 'lucide-react';

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF] font-sans">
      {/* Header */}
      <div className="bg-[#1d234d] pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1d234d] via-[#1a237e] to-[#311b92]"></div>
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
            Everything you need to configure, deploy, and customize our premium n8n workflows.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Contents</h3>
              <nav className="space-y-1 border-l border-slate-200 ml-2">
                <NavItem
                  active={activeSection === 'getting-started'}
                  onClick={() => scrollToSection('getting-started')}
                  label="Getting Started"
                />
                <NavItem
                  active={activeSection === 'importing'}
                  onClick={() => scrollToSection('importing')}
                  label="Importing Workflows"
                />
                <NavItem
                  active={activeSection === 'credentials'}
                  onClick={() => scrollToSection('credentials')}
                  label="Setting up Credentials"
                />
                <NavItem
                  active={activeSection === 'webhooks'}
                  onClick={() => scrollToSection('webhooks')}
                  label="Webhooks & Triggers"
                />
                <NavItem
                  active={activeSection === 'troubleshooting'}
                  onClick={() => scrollToSection('troubleshooting')}
                  label="Troubleshooting"
                />
              </nav>

              <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 text-sm mb-2">Need help?</h4>
                <p className="text-xs text-indigo-700 mb-3">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <button className="text-xs font-bold text-white bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors w-full">
                  Contact Support
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-16">
            {/* Getting Started */}
            <section id="getting-started" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                  <Book size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Getting Started</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="mb-4">
                  Welcome to the n8n Market documentation. Our workflows are designed to be "plug-and-play,"
                  but a basic understanding of n8n is helpful.
                </p>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-3">Prerequisites</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-green-500 mt-0.5" />
                      <span>An active n8n instance (Cloud or Self-hosted v1.0+)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-green-500 mt-0.5" />
                      <span>Accounts for the services you wish to integrate (e.g., OpenAI, Slack)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-green-500 mt-0.5" />
                      <span>Basic JSON knowledge is recommended but not required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Importing */}
            <section id="importing" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <FileJson size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Importing Workflows</h2>
              </div>
              <p className="text-slate-600 mb-6">
                All our workflows are delivered as standard JSON files compatible with n8n.
              </p>

              <div className="space-y-6">
                <Step
                  number={1}
                  title="Copy the JSON content"
                  description="Open the downloaded .json file in any text editor and copy the entire content."
                />
                <Step
                  number={2}
                  title="Paste into n8n"
                  description="Go to your n8n canvas. Simply press Ctrl+V (Cmd+V on Mac) to paste the nodes directly onto the canvas."
                />
                <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-mono">
                    <span>Example JSON Structure</span>
                    <Copy size={14} className="cursor-pointer hover:text-white" />
                  </div>
                  <pre className="text-green-400 font-mono text-sm">
                    {`{
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 300]
    }
  ],
  "connections": {}
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Credentials */}
            <section id="credentials" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Settings size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Setting up Credentials</h2>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-yellow-900 text-sm">Security Notice</h4>
                    <p className="text-yellow-800 text-sm mt-1">
                      Never share your credential IDs or API keys. Our templates act as skeletons; you must connect your own accounts.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                After importing a workflow, you will see nodes with red warning icons. This indicates missing credentials.
                Double-click any node (e.g., "Slack"), go to "Credentials", and select "Create New" to enter your API Key.
              </p>
            </section>

            {/* Webhooks */}
            <section id="webhooks" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Terminal size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Webhooks & Triggers</h2>
              </div>
              <p className="text-slate-600 mb-4">
                Many workflows start with a <strong>Webhook</strong> node. This allows external apps to trigger your automation.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Test URL</h4>
                  <p className="text-sm text-slate-500">
                    Use this when building and debugging. It only works when the "Execute Workflow" button is active.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Production URL</h4>
                  <p className="text-sm text-slate-500">
                    Use this for live data. The workflow must be set to "Active" in the top right corner.
                  </p>
                </div>
              </div>
            </section>

            {/* Attribution */}
            <section id="attribution" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                  <HeartPulse size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Credits & Attribution</h2>
              </div>
              <p className="text-slate-600 mb-4">
                We believe in giving credit where credit is due. This marketplace uses open-source assets and data.
              </p>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="flex items-start gap-4">
                  <img src="https://media.flaticon.com/dist/min/img/logo/flaticon-big.png" alt="Flaticon" className="h-8 opacity-80" />
                  <div>
                    <h4 className="font-bold text-slate-900">Icons by Flaticon</h4>
                    <p className="text-sm text-slate-500">
                      Many logos and tool icons used in these workflows are provided by <a href="https://www.flaticon.com/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Flaticon</a>.
                    </p>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4 flex items-start gap-4">
                  <div className="p-1 bg-slate-800 rounded text-white"><Code2 size={24} /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Lucide Icons</h4>
                    <p className="text-sm text-slate-500">
                      UI icons are powered by <a href="https://lucide.dev/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Lucide React</a>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors border-l-2 -ml-[1px] ${active
      ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50'
      : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
      }`}
  >
    {label}
  </button>
);

const Step: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex gap-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center border border-indigo-200">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm mt-1">{description}</p>
    </div>
  </div>
);

export default DocumentationPage;