import React from 'react';
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
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow }) => {
  
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
    <div className="flex flex-col bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 h-full">
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
      <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3">
        {workflow.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
        {workflow.description}
      </p>

      {/* Integrations Row */}
      <div className="flex items-center gap-3 mb-4">
        {workflow.integrations.map((tool, idx) => (
          <div key={idx} className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center" title={tool}>
            {getIntegrationIcon(tool)}
          </div>
        ))}
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap gap-2 mb-8">
        {workflow.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Button */}
      <button className="w-full py-3 rounded-full bg-[#FF6D5A] hover:bg-[#ff5742] text-white font-semibold text-sm transition-colors shadow-[0_4px_14px_rgba(255,109,90,0.3)]">
        View workflow
      </button>
    </div>
  );
};

export default WorkflowCard;