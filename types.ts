export enum PricingTier {
  FREE = 'Free',
  PAID = 'Paid'
}

export enum Complexity {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum Category {
  AI_AGENTS = 'AI-Powered Agents',
  FINANCE = 'Finance & Money',
  REAL_ESTATE = 'Real Estate',
  SOCIAL_MEDIA = 'Social Media',
  HEALTHCARE = 'Healthcare & Fitness',
  SECURITY_IT = 'Security & IT Ops',
  RESEARCH = 'Research & Academia',
  SALES = 'Sales & Outreach',
  SUPPORT = 'Customer Support',
  MARKETING = 'Marketing',
  HR = 'HR & Recruiting',
  DEVOPS = 'DevOps',
  DATA_ANALYTICS = 'Data & Analytics',
  ECOMMERCE = 'Ecommerce',
  PRODUCTIVITY = 'Productivity & Calendars'
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  price: number; // 0 for free
  tier: PricingTier;
  category: Category;
  complexity: Complexity;
  integrations: string[];
  tags: string[]; // Added tags for the UI
  featured: boolean;
  downloads: number;
  json?: string; // n8n workflow JSON
  jsonUrl?: string; // URL to fetch JSON content
  nodeOverview?: string; // Pre-generated HTML for SEO node review
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: Category | 'All'; // Simplified for the new UI
  selectedPlatforms: string[];
  selectedComplexity: Complexity[];
}

export interface AiWorkflowResponse {
  title: string;
  summary: string;
  steps: string[];
  recommendedNodes: string[];
}