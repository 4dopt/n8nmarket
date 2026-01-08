import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Filters from './Filters';
import WorkflowCard from './WorkflowCard';
import SidebarFilters from './SidebarFilters';
import { WORKFLOWS } from '../constants';
import { FilterState, Complexity } from '../types';
import { Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

// Known platforms whitelist - better than blocklist to avoid garbage
const KNOWN_PLATFORMS = [
    'Google', 'Slack', 'Notion', 'OpenAI', 'PagerDuty', 'AWS', 'Fitbit', 'Misc',
    'Stripe', 'Zoom', 'Telegram', 'GitHub', 'LinkedIn', 'CRM', 'Home Assistant',
    'Philips Hue', 'Transcription', 'Jira', 'ESPN', 'Medium', 'Twilio',
    'Eventbrite', 'Instagram', 'Salesforce', 'Clearbit', 'Postgres',
    'Todoist', 'Zendesk', 'Freshdesk', 'Moodle'
];

const normalizePlatform = (str: string): string | null => {
    if (!str) return null;
    const lower = str.toLowerCase();
    // Check against known platforms
    for (const p of KNOWN_PLATFORMS) {
        if (lower.includes(p.toLowerCase())) return p;
    }
    return null;
};

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(50);
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        selectedCategory: 'All',
        selectedPlatforms: [],
        selectedComplexity: [],
    });

    // Calculate counts for filters
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        WORKFLOWS.forEach(w => {
            counts[w.category] = (counts[w.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Calculate top platforms
    const availablePlatforms = useMemo(() => {
        const activePlatforms = new Set<string>();
        WORKFLOWS.forEach(w => {
            const candidates = [...(w.integrations || []), ...(w.tags || [])];
            candidates.forEach(i => {
                if (!i) return;
                const normalized = normalizePlatform(i);
                if (normalized) {
                    activePlatforms.add(normalized);
                }
            });
        });
        return KNOWN_PLATFORMS.filter(p => activePlatforms.has(p));
    }, []);

    // Lock body scroll when mobile filters are open
    useEffect(() => {
        if (showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileFilters]);

    const handleTogglePlatform = (platform: string) => {
        setFilters(prev => {
            const exists = prev.selectedPlatforms.includes(platform);
            if (exists) {
                return { ...prev, selectedPlatforms: prev.selectedPlatforms.filter(p => p !== platform) };
            } else {
                return { ...prev, selectedPlatforms: [...prev.selectedPlatforms, platform] };
            }
        });
    };

    const handleToggleComplexity = (complexity: Complexity) => {
        setFilters(prev => {
            const exists = prev.selectedComplexity.includes(complexity);
            if (exists) {
                return { ...prev, selectedComplexity: prev.selectedComplexity.filter(c => c !== complexity) };
            } else {
                return { ...prev, selectedComplexity: [...prev.selectedComplexity, complexity] };
            }
        });
    };

    const activeFiltersCount = filters.selectedPlatforms.length + filters.selectedComplexity.length;

    const filteredWorkflows = useMemo(() => {
        return WORKFLOWS.filter((workflow) => {
            // Search Filter
            const matchesSearch = workflow.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                workflow.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                workflow.integrations.some(i => i.toLowerCase().includes(filters.searchQuery.toLowerCase()));

            // Category Filter
            const matchesCategory = filters.selectedCategory === 'All' || workflow.category === filters.selectedCategory;

            // Platform Filter (Sidebar)
            const matchesPlatform = filters.selectedPlatforms.length === 0 || filters.selectedPlatforms.some(platform => {
                const candidates = [...(workflow.integrations || []), ...(workflow.tags || [])];
                return candidates.some(c => {
                    if (!c) return false;
                    if (normalizePlatform(c) === platform) return true;
                    if (c.toLowerCase().includes(platform.toLowerCase())) return true;
                    return false;
                });
            });

            // Complexity Filter (Sidebar)
            const matchesComplexity = filters.selectedComplexity.length === 0 || filters.selectedComplexity.includes(workflow.complexity);

            return matchesSearch && matchesCategory && matchesPlatform && matchesComplexity;
        });
    }, [filters]);

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#F5F7FF] w-full overflow-x-hidden">
            {/* Navbar is in Layout now, or we can include it here if we want specific props. 
            For now assuming App.tsx handles Layout or we include Navbar here. 
            Let's keep Navbar here to match original structure for now, but usually Layout is better.
        */}
            <Navbar onNavigate={(view) => {
                if (view === 'pricing') navigate('/pricing');
                else if (view === 'documentation') navigate('/documentation');
                else if (view === 'categories') navigate('/categories');
                else navigate('/');
            }} />

            <Hero
                searchQuery={filters.searchQuery}
                setSearchQuery={(q) => setFilters(prev => ({ ...prev, searchQuery: q }))}
            />

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">

                {/* Section Header */}
                <div className="text-center mb-8 lg:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 lg:mb-6">
                        Explore n8n Workflow Templates <br className="hidden md:block" /> for Every Need
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Our n8n templates cover a wide range of categories to help you automate any aspect of your work, from marketing to project management.
                    </p>
                </div>

                {/* Categories Filter (Top) */}
                <Filters
                    currentCategory={filters.selectedCategory}
                    setCategory={(c) => setFilters(prev => ({ ...prev, selectedCategory: c }))}
                    counts={categoryCounts}
                />

                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-6 sticky top-20 z-30">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="w-full bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
                    >
                        <Filter size={18} className="text-indigo-600" />
                        Filters & Complexity
                        {activeFiltersCount > 0 && (
                            <span className="bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>
                </div>

                {/* Content Area: Sidebar + Grid */}
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Desktop Sidebar - Hidden on mobile */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <SidebarFilters
                            selectedPlatforms={filters.selectedPlatforms}
                            onTogglePlatform={handleTogglePlatform}
                            selectedComplexity={filters.selectedComplexity}
                            onToggleComplexity={handleToggleComplexity}
                            availablePlatforms={availablePlatforms}
                        />
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        {filteredWorkflows.length > 0 ? (
                            <>
                                {/* Workflows Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredWorkflows.slice(0, visibleCount).map((workflow) => (
                                        <WorkflowCard
                                            key={workflow.id}
                                            workflow={workflow}
                                        // onClick is handled by Link in the card now
                                        />
                                    ))}
                                </div>

                                {/* Load More Button */}
                                {visibleCount < filteredWorkflows.length && (
                                    <div className="flex justify-center mt-12 mb-8">
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + 50)}
                                            className="px-8 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                                        >
                                            Load More ({filteredWorkflows.length - visibleCount} remaining)
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm h-full flex flex-col items-center justify-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No workflows found</h3>
                                <p className="text-slate-500 mb-8 max-w-md mx-auto px-4">
                                    We couldn't find any workflows matching your criteria. Try adjusting your filters.
                                </p>
                                <button
                                    onClick={() => setFilters({
                                        searchQuery: '',
                                        selectedCategory: 'All',
                                        selectedPlatforms: [],
                                        selectedComplexity: []
                                    })}
                                    className="text-indigo-600 hover:text-indigo-800 font-semibold"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Mobile Filter Drawer Overlay */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setShowMobileFilters(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute inset-y-0 right-0 w-full max-w-[320px] bg-[#F5F7FF] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 bg-white border-b border-slate-200 shrink-0">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Filter size={20} className="text-indigo-600" />
                                Filters
                            </h3>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5">
                            <SidebarFilters
                                selectedPlatforms={filters.selectedPlatforms}
                                onTogglePlatform={handleTogglePlatform}
                                selectedComplexity={filters.selectedComplexity}
                                onToggleComplexity={handleToggleComplexity}
                                availablePlatforms={availablePlatforms}
                            />
                        </div>

                        {/* Mobile Drawer Footer */}
                        <div className="p-5 bg-white border-t border-slate-200 shrink-0">
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                            >
                                Show {filteredWorkflows.length} Workflows
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer onNavigate={(view) => {
                if (view === 'pricing') navigate('/pricing');
                if (view === 'documentation') navigate('/documentation');
                if (view === 'home') navigate('/');
            }} />
        </div>
    );
};

export default HomePage;
