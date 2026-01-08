import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WorkflowDetailsPage from './WorkflowDetailsPage';
import Navbar from './Navbar';
import { WORKFLOWS } from '../constants';

const Footer = ({ onNavigate }: { onNavigate: (view: any) => void }) => (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-500 text-sm">
                    © 2024 NexusAI. All rights reserved.
                </div>
                <div className="flex gap-8">
                    <button onClick={() => onNavigate('/')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Marketplace</button>
                    <button onClick={() => onNavigate('/pricing')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Pricing</button>
                    <button onClick={() => onNavigate('/documentation')} className="text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">Documentation</button>
                </div>
            </div>
        </div>
    </footer>
);

const WorkflowPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const workflow = useMemo(() => WORKFLOWS.find(w => w.slug === slug), [slug]);

    if (!workflow) {
        return (
            <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#F5F7FF]">
                <Navbar onNavigate={(view) => {
                    if (view === 'pricing') navigate('/pricing');
                    if (view === 'documentation') navigate('/documentation');
                    if (view === 'home') navigate('/');
                }} />
                <Helmet>
                    <title>Workflow Not Found | NexusAI</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="flex-grow flex flex-col items-center justify-center p-4">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-lg mb-8 text-slate-600">Workflow not found.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Back to Marketplace
                    </button>
                </div>
                <Footer onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FF] font-sans">
            <Helmet>
                <title>{`${workflow.title} - n8n Workflow Template`}</title>
                <meta name="description" content={workflow.description.substring(0, 160)} />
                <link rel="canonical" href={`https://n8nmarket.com/workflow/${workflow.slug}`} />

                <meta property="og:title" content={workflow.title} />
                <meta property="og:description" content={workflow.description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://n8nmarket.com/workflow/${workflow.slug}`} />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": workflow.title,
                        "description": workflow.description,
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "n8n",
                        "offers": {
                            "@type": "Offer",
                            "price": workflow.price,
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock"
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.8",
                            "ratingCount": workflow.downloads > 0 ? workflow.downloads : 1
                        }
                    })}
                </script>
            </Helmet>

            <Navbar onNavigate={(view) => {
                if (view === 'pricing') navigate('/pricing');
                if (view === 'documentation') navigate('/documentation');
                if (view === 'home') navigate('/');
            }} theme="light" />

            <WorkflowDetailsPage
                workflow={workflow}
                onBack={() => navigate('/')}
            />

            <Footer onNavigate={(view) => navigate(view === 'home' ? '/' : `/${view}`)} />
        </div>
    );
};

export default WorkflowPage;
