import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Tag } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Category } from '../types';
import { slugify } from '../constants';

const CategoryListPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-[#F5F7FF]">
            <Helmet>
                <title>All Categories - n8nmarket.com</title>
                <meta name="description" content="Browse all n8n workflow categories to find the automation templates you need." />
            </Helmet>

            <Navbar
                theme="light"
                onNavigate={(view) => {
                    if (view === 'pricing') navigate('/pricing');
                    else if (view === 'documentation') navigate('/documentation');
                    else navigate('/');
                }} />

            <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="mb-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Browse Categories</h1>
                    <p className="text-lg text-slate-600">
                        Find the perfect automation workflow by category.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(Category).map((category) => (
                        <Link
                            key={category}
                            to={`/category/${slugify(category)}`}
                            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all group flex items-start gap-4"
                        >
                            <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-100 transition-colors">
                                <Tag className="text-indigo-600" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {category}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Explore {category} workflows
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer onNavigate={(view) => {
                if (view === 'pricing') navigate('/pricing');
                else if (view === 'documentation') navigate('/documentation');
                else navigate('/');
            }} />
        </div>
    );
};

export default CategoryListPage;
