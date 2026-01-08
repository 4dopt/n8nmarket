import { Category, Complexity, PricingTier, Workflow } from './types';
import rawWorkflows from './src/data/workflows.json';

const cleanTitle = (title: string): string => {
  if (!title) return '';

  // 1. Remove file extension
  let clean = title.replace(/\.json$/i, '');

  // 2. Remove ALL digits (0-9)
  clean = clean.replace(/\d+/g, ' ');

  // 3. Replace dashes/underscores with spaces
  clean = clean.replace(/[-_]/g, ' ');

  // 4. Remove extra spaces
  clean = clean.replace(/\s+/g, ' ').trim();

  // 5. Title Case
  clean = clean.split(' ')
    .filter(Boolean)
    .map(word => {
      // Preserve "n8n" casing if solitary, otherwise capitalize
      if (word.toLowerCase() === 'n8n') return 'n8n';
      // Regular capitalization
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');

  const fixed = fixCommonTerms(clean);
  // Ensure title sounds like a workflow if it's too short
  if (fixed.split(' ').length < 2) {
    return `${fixed} Automation`;
  }
  return fixed;
};

const fixCommonTerms = (title: string): string => {
  return title
    .replace(/\b(Gpt|Api|Seo|Crm|Sql|Aws|Llm|Json|Http|Ftp|Smtp|Html|Css|Rss)\b/g, (m) => m.toUpperCase())
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bTv\b/g, 'TV')
    .replace(/\bWhatsapp\b/g, 'WhatsApp')
    .replace(/\bYoutube\b/g, 'YouTube')
    .replace(/\bWordpress\b/g, 'WordPress')
    .replace(/\bZapier\b/g, 'Zapier')
    .replace(/\bGithub\b/g, 'GitHub')
    .replace(/\bN 8 N\b/g, 'n8n') // Fix n8n if numbers were spaced
    .replace(/\bN8n\b/g, 'n8n');
};

const cleanDescription = (desc: string, title: string, integrations: string[]): string => {
  if (!desc) return `${title} workflow template. Automate your processes with n8n.`;

  // 1. Remove ALL digits
  let clean = desc.replace(/\d+/g, '');

  // 2. Fix broken grammar from number removal
  // "It consists of nodes" -> "It consists of multiple nodes"
  clean = clean.replace(/consists of\s+nodes/gi, 'consists of multiple powerful nodes');
  clean = clean.replace(/consists of\s+node/gi, 'consists of a specialized node');

  // 3. Remove generic "This n8n workflow automates tasks using..." opener if mostly useless
  if (clean.includes('automates tasks using')) {
    // Construct a better SEO opener
    const tools = integrations.length > 0 ? integrations.slice(0, 3).join(', ') : 'essential tools';
    const seoOpener = `Streamline your operations with this n8n automation template for ${tools}.`;

    // Replace the generic start up to the first colon or period if it exists
    // specific pattern in JSON: "This n8n workflow automates tasks using n8n advance. It consists of..."
    clean = clean.replace(/^.*?(It consists of)/i, `${seoOpener} $1`);
  }

  // 4. Final Cleanup
  clean = clean.replace(/\.\./g, '.'); // Fix double periods
  clean = clean.replace(/\s+/g, ' ').trim();

  return clean;
};

const getNodeCount = (html: string): number => {
  if (!html) return 0;
  const matches = html.match(/<li/g);
  return matches ? matches.length : 0;
};

const mapComplexity = (c: string, nodeCount: number): Complexity => {
  // Priority: Node Count
  if (nodeCount > 0) {
    if (nodeCount <= 5) return Complexity.BEGINNER;
    if (nodeCount <= 12) return Complexity.INTERMEDIATE;
    return Complexity.ADVANCED;
  }

  // Fallback to text
  if (!c) return Complexity.INTERMEDIATE;
  const lower = c.toLowerCase();
  if (lower.includes('simple')) return Complexity.BEGINNER;
  if (lower.includes('complex')) return Complexity.ADVANCED;
  return Complexity.INTERMEDIATE;
};

const mapCategory = (title: string, tags: string[] = []): Category => {
  const text = (title + ' ' + tags.join(' ')).toLowerCase();

  if (text.includes('marketing') || text.includes('seo') || text.includes('blog') || text.includes('content') || text.includes('social') || text.includes('tweet') || text.includes('linkedin')) return Category.MARKETING;
  if (text.includes('sales') || text.includes('crm') || text.includes('lead') || text.includes('outreach') || text.includes('hubspot') || text.includes('salesforce') || text.includes('pipedrive')) return Category.SALES;
  if (text.includes('finance') || text.includes('money') || text.includes('invoice') || text.includes('accounting') || text.includes('stripe') || text.includes('xero') || text.includes('quickbooks')) return Category.FINANCE;
  if (text.includes('hr') || text.includes('recruiting') || text.includes('employee') || text.includes('onboarding') || text.includes('interview') || text.includes('candidate')) return Category.HR;
  if (text.includes('devops') || text.includes('aws') || text.includes('docker') || text.includes('kubernetes') || text.includes('deploy') || text.includes('git') || text.includes('monitoring') || text.includes('incident')) return Category.DEVOPS;
  if (text.includes('security') || text.includes('threat') || text.includes('vulnerability')) return Category.SECURITY_IT;
  if (text.includes('data') || text.includes('analytics') || text.includes('report') || text.includes('dashboard') || text.includes('sql') || text.includes('postgres') || text.includes('scrape')) return Category.DATA_ANALYTICS;
  if (text.includes('ai') || text.includes('gpt') || text.includes('openai') || text.includes('llm') || text.includes('bot') || text.includes('chat') || text.includes('claude') || text.includes('model')) return Category.AI_AGENTS;
  if (text.includes('support') || text.includes('ticket') || text.includes('customer') || text.includes('intercom') || text.includes('zendesk')) return Category.SUPPORT;
  if (text.includes('shop') || text.includes('commerce') || text.includes('store') || text.includes('product') || text.includes('woo')) return Category.ECOMMERCE;
  if (text.includes('health') || text.includes('fitness')) return Category.HEALTHCARE;
  if (text.includes('estate') || text.includes('property')) return Category.REAL_ESTATE;
  if (text.includes('research') || text.includes('academic') || text.includes('university') || text.includes('paper')) return Category.RESEARCH;

  return Category.PRODUCTIVITY;
};

export const WORKFLOWS: Workflow[] = (rawWorkflows as any[]).map((w: any) => ({
  id: w.id,
  title: cleanTitle(w.title),
  description: cleanDescription(w.description, cleanTitle(w.title), w.integrations || []),
  price: w.price || 0,
  tier: (w.price && w.price > 0) ? PricingTier.PAID : PricingTier.FREE,
  category: mapCategory(w.title, w.tags),
  complexity: mapComplexity(w.complexity, getNodeCount(w.nodeOverview)),
  integrations: w.integrations || [],
  tags: w.tags || [],
  featured: w.featured || false,
  downloads: w.downloads || Math.floor(Math.random() * 1000), // Randomize downloads if 0
  json: w.json,
  jsonUrl: w.jsonUrl,
  nodeOverview: w.nodeOverview
}));