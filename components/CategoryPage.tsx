import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronDown, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { Category } from '../types';
import { WORKFLOWS, slugify } from '../constants';
import WorkflowCard from './WorkflowCard';
import Navbar from './Navbar';
import Footer from './Footer';

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Find the category enum value that matches the slug
    const currentCategory = useMemo(() => {
        return Object.values(Category).find(c => slugify(c) === category);
    }, [category]);

    // Use the nice name from Enum, or fallback to beautified slug
    const categoryName = currentCategory || (category ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '');

    const filteredWorkflows = useMemo(() => {
        return WORKFLOWS.filter(w => {
            // Match using slugify on workflow category
            const matchesCategory = slugify(w.category) === category;
            const matchesSearch = w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                w.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [category, searchQuery]);

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FF]">
            <Helmet>
                <title>{`${categoryName} Workflows - n8nmarket.com`}</title>
                <meta name="description" content={`Explore the best ${categoryName} automation workflows and templates for n8n. optimized for performance and ease of use.`} />
                <link rel="canonical" href={`https://n8nmarket.com/category/${category}`} />
            </Helmet>

            <Navbar
                theme="light"
                onNavigate={(view) => {
                    if (view === 'pricing') navigate('/pricing');
                    else if (view === 'documentation') navigate('/documentation');
                    else if (view === 'categories') navigate('/categories');
                    else navigate('/');
                }} />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
                        <ArrowLeft size={16} />
                        Back to All Workflows
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{categoryName} Workflows</h1>
                    <p className="text-lg text-slate-600">
                        Browse our curated collection of automation templates for {categoryName}.
                    </p>
                </div>

                {/* Filters (Simplified for Category Page) */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={`Search in ${categoryName}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredWorkflows.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWorkflows.map(workflow => (
                            <WorkflowCard
                                key={workflow.id}
                                workflow={workflow}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No workflows found</h3>
                        <p className="text-slate-500">
                            We couldn't find any workflows in the {categoryName} category matching your search.
                        </p>
                        <Link to="/" className="inline-block mt-4 text-indigo-600 font-semibold hover:underline">
                            View all workflows
                        </Link>
                    </div>
                )}
            </main>

            <Footer onNavigate={() => { }} />
        </div>
    );
};

export default CategoryPage;
