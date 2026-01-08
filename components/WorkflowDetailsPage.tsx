import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PlatformIcon, { hasValidIcon } from '../src/components/PlatformIcon';
import WorkflowCard from './WorkflowCard';
import { Workflow, PricingTier } from '../types';
import { WORKFLOWS, slugify } from '../constants';
import { ArrowLeft, Copy, Download, Check, Layers, Cpu, Code, Activity, MousePointerClick, ChevronRight, Eye } from 'lucide-react';
import JsonViewModal from './JsonViewModal';

interface WorkflowDetailsPageProps {
    workflow: Workflow;
    onBack: () => void;
}

const WorkflowDetailsPage: React.FC<WorkflowDetailsPageProps> = ({ workflow, onBack }) => {
    const [copied, setCopied] = useState(false);
    const [jsonContent, setJsonContent] = useState<string>(workflow.json || '');
    const [isLoadingJson, setIsLoadingJson] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const relatedWorkflows = useMemo(() => {
        return WORKFLOWS
            .filter(w => w.category === workflow.category && w.id !== workflow.id)
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 3);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-16 overflow-x-hidden">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-2 text-slate-400 flex-shrink-0" />
                <Link to={`/category/${slugify(workflow.category)}`} className="hover:text-indigo-600 transition-colors">
                    {workflow.category}
                </Link>
                <ChevronRight size={16} className="mx-2 text-slate-400 flex-shrink-0" />
                <span className="text-slate-900 truncate max-w-[200px]">{workflow.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Header Section */}
                    <div className="text-left mb-10">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm ${workflow.tier === PricingTier.FREE
                                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 border border-indigo-200'
                                }`}>
                                {workflow.tier === PricingTier.FREE ? 'Free Template' : 'Premium Template'}
                            </span>
                            <Link
                                to={`/category/${slugify(workflow.category)}`}
                                className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-indigo-600 transition-colors"
                            >
                                {workflow.category}
                            </Link>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                            {workflow.title}
                        </h1>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            {workflow.description}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Cpu size={24} />
                                </div>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Complexity</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 pl-1">{workflow.complexity}</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 bg-pink-50 text-pink-600 rounded-lg">
                                    <MousePointerClick size={24} />
                                </div>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Downloads</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 pl-1">{workflow.downloads.toLocaleString()}</div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                                    <Activity size={24} />
                                </div>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Status</span>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 pl-1">Verified</div>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-12">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Layers className="text-indigo-600" />
                            Platforms Included
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {workflow.integrations.filter(t => hasValidIcon(t)).map((tool, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                                    <PlatformIcon platform={tool} className="w-8 h-8" />
                                    <span className="font-semibold text-slate-700 text-sm">{tool}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Node Overview */}
                    {workflow.nodeOverview && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Activity className="text-indigo-600" />
                                Node Overview
                            </h2>
                            <div
                                className="prose prose-slate bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: workflow.nodeOverview }}
                            />
                        </div>
                    )}
                </div>

                {/* Sidebar / Sticky Actions */}
                <div className="lg:w-96 flex-shrink-0 space-y-8">
                    {/* Action Card */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm lg:sticky lg:top-24">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Code size={24} className="text-indigo-600" />
                            Get Workflow
                        </h3>

                        <div className="space-y-4">
                            <button
                                onClick={handleCopy}
                                className="w-full justify-center flex items-center gap-2 px-6 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'Copied to Clipboard' : 'Copy JSON Code'}
                            </button>

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full justify-center flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 rounded-xl font-bold text-slate-700 transition-all"
                            >
                                <Eye size={20} />
                                View JSON Code
                            </button>

                            <button
                                onClick={handleDownload}
                                className="w-full justify-center flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 rounded-xl font-bold text-slate-700 transition-all"
                            >
                                <Download size={20} />
                                Download .json File
                            </button>

                            <JsonViewModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                content={jsonContent}
                                title={workflow.title}
                            />
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <div className="flex items-start gap-3 text-sm text-slate-600 bg-indigo-50 p-4 rounded-xl">
                                <span className="text-indigo-600 font-bold text-lg mt-[-2px]">i</span>
                                <p>
                                    Paste this code directly into your n8n canvas. You'll need to configure credentials for the connected services.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Workflows */}
            {relatedWorkflows.length > 0 && (
                <div className="mt-24 border-t border-slate-200 pt-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Workflows</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedWorkflows.map(w => (
                            <WorkflowCard key={w.id} workflow={w} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkflowDetailsPage;
