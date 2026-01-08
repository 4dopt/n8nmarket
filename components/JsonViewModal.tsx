import React, { useState } from 'react';
import { X, Copy, Download, Check, Code } from 'lucide-react';

interface JsonViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
    title: string;
}

const JsonViewModal: React.FC<JsonViewModalProps> = ({ isOpen, onClose, content, title }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Window */}
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Code size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Workflow Code</h3>
                            <p className="text-sm text-slate-500 font-medium truncate max-w-[200px] sm:max-w-md">
                                {title}.json
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Toolbar (Floating Top Right inside content area or Header actions) */}
                {/* User requested: "place buttons on right top corner of the floating window" - putting them in a toolbar below header or separate is good, 
                    but inside the header would be cleaner. 
                    However, "floating window... place buttons on right top corner" could specificially mean overlaying the code or just in the header efficiently.
                    Let's put them in a dedicated toolbar strip above the code for clarity and accessibility.
                */}
                <div className="flex items-center justify-between px-6 py-3 bg-slate-50 border-b border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        JSON Preview
                    </span>
                    <div className="flex gap-3">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${copied
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200'
                                }`}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied' : 'Copy Code'}
                        </button>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-all"
                        >
                            <Download size={16} />
                            Download
                        </button>
                    </div>
                </div>

                {/* Code Content */}
                <div className="flex-1 overflow-auto bg-slate-900 p-6">
                    <pre className="font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap break-all">
                        <code>{content}</code>
                    </pre>
                </div>

                {/* Footer Tip */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
                    Copy and paste this JSON content directly into your n8n editor canvas.
                </div>
            </div>
        </div>
    );
};

export default JsonViewModal;
