import React, { useState, useEffect } from 'react';
import PlatformIcon, { hasValidIcon } from '../src/components/PlatformIcon';
import { Workflow, PricingTier } from '../types';
import { ArrowLeft, Copy, Download, Check, Layers, Cpu, Code, Activity, MousePointerClick } from 'lucide-react';

interface WorkflowDetailsPageProps {
    workflow: Workflow;
    onBack: () => void;
}

const WorkflowDetailsPage: React.FC<WorkflowDetailsPageProps> = ({ workflow, onBack }) => {
    const [copied, setCopied] = useState(false);
    const [jsonContent, setJsonContent] = useState<string>(workflow.json || '');
    const [isLoadingJson, setIsLoadingJson] = useState(false);

    useEffect(() => {
        if (!workflow.json && workflow.jsonUrl) {
            setIsLoadingJson(true);
            fetch(workflow.jsonUrl)
                .then(res => res.text())
                .then(text => {
                    setJsonContent(text);
                })
                .catch(err => console.error("Failed to fetch JSON", err))
                .finally(() => setIsLoadingJson(false));
        } else {
            setJsonContent(workflow.json || '');
        }
    }, [workflow]);

    const handleCopy = () => {
        if (jsonContent) {
            navigator.clipboard.writeText(jsonContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (jsonContent) {
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${workflow.title.toLowerCase().replace(/\s+/g, '-')}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium mb-10 transition-colors"
            >
                <div className="p-2 bg-white rounded-full border border-slate-200 group-hover:border-indigo-200 shadow-sm transition-colors">
                    <ArrowLeft size={18} />
                </div>
                Back to Workflows
            </button>

            {/* Main Container */}
            <div className="space-y-12">

                {/* 1. Header Section */}
                <div className="text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm ${workflow.tier === PricingTier.FREE
                            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200'
                            : 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200'
                            }`}>
                            {workflow.tier === PricingTier.FREE ? 'Free Template' : 'Premium Template'}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                            {workflow.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                        {workflow.title}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto md:mx-0">
                        {workflow.description}
                    </p>

                    {/* Node Overview (SEO Friendly) */}
                    {workflow.nodeOverview && (
                        <div className="mt-8 max-w-3xl mx-auto md:mx-0 text-left">
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Activity size={20} className="text-indigo-600" />
                                Node Overview
                            </h2>
                            <div
                                className="prose prose-slate bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                                dangerouslySetInnerHTML={{ __html: workflow.nodeOverview }}
                            />
                        </div>
                    )}
                </div>

                {/* 2. Stats & Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Cpu size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Complexity</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 pl-1">{workflow.complexity}</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-lg">
                                <MousePointerClick size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Downloads</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 pl-1">{workflow.downloads.toLocaleString()}</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                                <Activity size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Status</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 pl-1">Verified</div>
                    </div>
                </div>

                {/* 3. Tools / Integrations */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <Layers className="text-indigo-600" />
                        Platforms Included
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {workflow.integrations.filter(t => hasValidIcon(t)).map((tool, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors group">
                                <PlatformIcon platform={tool} className="w-12 h-12" />
                                <span className="font-semibold text-slate-700 text-sm">{tool}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. JSON Code Section (Full Width, Below Data) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <div className="p-2 bg-slate-900 rounded-lg">
                                <Code size={24} className="text-white" />
                            </div>
                            Workflow Code
                        </h3>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCopy}
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:border-indigo-600 hover:text-indigo-600 rounded-lg font-medium text-slate-700 transition-all"
                            >
                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                {copied ? 'Copied' : 'Copy JSON'}
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all shadow-md shadow-indigo-200"
                            >
                                <Download size={18} />
                                Download .json
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/10">
                        {/* Code Window Header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a] border-b border-slate-700">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <span className="text-xs font-mono text-slate-400">workflow.json</span>
                            <div className="w-10" /> {/* Spacer for centering */}
                        </div>

                        {/* Code Content */}
                        <div className="relative group">
                            <pre className="p-6 overflow-x-auto text-sm font-mono text-slate-300 leading-relaxed custom-scrollbar max-h-[600px]">
                                {isLoadingJson ? 'Loading workflow code...' : (jsonContent || '// No JSON code available for this workflow.')}
                            </pre>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-900">
                        <div className="min-w-6 mt-0.5">
                            <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">i</div>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold">How to use this workflow:</p>
                            <p className="text-sm text-indigo-800/80 leading-relaxed">
                                Copy the JSON code above (or download the file). Open your self-hosted n8n instance or desktop app. Click on the canvas, paste (Ctrl+V / Cmd+V), and the nodes will appear instantly. You will need to configure your own credentials for the connected services.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default WorkflowDetailsPage;
