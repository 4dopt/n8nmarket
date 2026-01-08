import React from 'react';
import PlatformIcon, { hasValidIcon } from '../src/components/PlatformIcon';
import { Workflow, Category } from '../types';
import {
  ArrowDownToLine,
  Megaphone,
  Briefcase,
  Code2,
  Settings2,
  Headphones,
  Bot,
  Slack,
  Github,
  Mail,
  Database,
  Table2,
  Globe,
  MessageSquare,
  Brain,
  DollarSign,
  Home,
  Share2,
  HeartPulse,
  ShieldAlert,
  GraduationCap,
  ShoppingCart,
  Calendar
} from 'lucide-react';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {

  // Helper to get main icon based on category
  const getCategoryIcon = (cat: Category) => {
    switch (cat) {
      case Category.AI_AGENTS: return <Brain className="w-5 h-5 text-indigo-600" />;
      case Category.FINANCE: return <DollarSign className="w-5 h-5 text-indigo-600" />;
      case Category.REAL_ESTATE: return <Home className="w-5 h-5 text-indigo-600" />;
      case Category.SOCIAL_MEDIA: return <Share2 className="w-5 h-5 text-indigo-600" />;
      case Category.HEALTHCARE: return <HeartPulse className="w-5 h-5 text-indigo-600" />;
      case Category.SECURITY_IT: return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case Category.RESEARCH: return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case Category.SALES: return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case Category.SUPPORT: return <Headphones className="w-5 h-5 text-indigo-600" />;
      case Category.ECOMMERCE: return <ShoppingCart className="w-5 h-5 text-indigo-600" />;
      case Category.PRODUCTIVITY: return <Calendar className="w-5 h-5 text-indigo-600" />;
      default: return <Bot className="w-5 h-5 text-indigo-600" />;
    }
  };

  // Helper to get integration icons (mocking based on string)
  const getIntegrationIcon = (name: string) => {
    const lower = name.toLowerCase();
    const style = "w-4 h-4 text-slate-500";
    if (lower.includes('slack')) return <Slack className={style} />;
    if (lower.includes('github')) return <Github className={style} />;
    if (lower.includes('email') || lower.includes('gmail')) return <Mail className={style} />;
    if (lower.includes('sheet') || lower.includes('excel')) return <Table2 className={style} />;
    if (lower.includes('shop') || lower.includes('sql') || lower.includes('data') || lower.includes('airtable')) return <Database className={style} />;
    if (lower.includes('chat') || lower.includes('teams') || lower.includes('what') || lower.includes('discord')) return <MessageSquare className={style} />;
    if (lower.includes('openai') || lower.includes('gpt')) return <Brain className={style} />;
    return <Globe className={style} />;
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
          {getCategoryIcon(workflow.category)}
        </div>
        <div className="flex items-center text-slate-500 text-sm font-medium">
          <ArrowDownToLine className="w-4 h-4 mr-1.5" />
          {workflow.downloads}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 line-clamp-2">
        {workflow.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
        {workflow.description}
      </p>

      {/* Integrations & Triggers Row */}
      <div className="flex items-center gap-3 mb-8 overflow-hidden">
        {/* Tool Icons */}
        {/* Tool Icons - Limit to 4 */}
        {workflow.integrations.length > 0 && (
          <>
            {workflow.integrations.filter(tool => hasValidIcon(tool)).slice(0, 4).map((tool, idx) => (
              <div key={idx} className="relative group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-transform hover:scale-105" title={tool}>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <PlatformIcon platform={tool} className="w-full h-full" showTooltip={false} />
                  </div>
                </div>
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  {tool}
                </span>
              </div>
            ))}

            {/* Overflow Badge */}
            {workflow.integrations.length > 4 && (
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500" title={`+${workflow.integrations.length - 4} more`}>
                +{workflow.integrations.length - 4}
              </div>
            )}
          </>
        )}

        {/* text labels for Webhook/Schedule if strictly needed, 
            but user said "only labels like if webhook is used". 
            Let's check tags for these specific keywords. */}
        {workflow.tags.filter(t => ['Webhook', 'Schedule', 'Cron'].includes(t)).map((tag, idx) => (
          <span key={`tag-${idx}`} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-lg border border-indigo-100">
            {tag}
          </span>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="w-full py-3 rounded-full bg-[#FF6D5A] hover:bg-[#ff5742] text-white font-semibold text-sm transition-colors shadow-[0_4px_14px_rgba(255,109,90,0.3)]"
      >
        View workflow
      </button>
    </div>
  );
};

export default WorkflowCard;