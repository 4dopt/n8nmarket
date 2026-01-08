import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to workflows data
const workflowsPath = path.join(__dirname, '../src/data/workflows.json');
const publicPath = path.join(__dirname, '../public');
const sitemapPath = path.join(publicPath, 'sitemap.xml');

// Replicate the cleaning logic from constants.ts to ensure slugs match
const cleanTitle = (title) => {
    if (!title) return '';
    let clean = title.replace(/\.json$/i, '')
        .replace(/\d+/g, ' ')
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ').trim();

    clean = clean.split(' ')
        .filter(Boolean)
        .map(word => {
            if (word.toLowerCase() === 'n8n') return 'n8n';
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');

    const fixCommonTerms = (t) => {
        return t
            .replace(/\b(Gpt|Api|Seo|Crm|Sql|Aws|Llm|Json|Http|Ftp|Smtp|Html|Css|Rss)\b/g, (m) => m.toUpperCase())
            .replace(/\bAi\b/g, 'AI')
            .replace(/\bTv\b/g, 'TV')
            .replace(/\bWhatsapp\b/g, 'WhatsApp')
            .replace(/\bYoutube\b/g, 'YouTube')
            .replace(/\bWordpress\b/g, 'WordPress')
            .replace(/\bZapier\b/g, 'Zapier')
            .replace(/\bGithub\b/g, 'GitHub')
            .replace(/\bN 8 N\b/g, 'n8n')
            .replace(/\bN8n\b/g, 'n8n');
    };

    const fixed = fixCommonTerms(clean);
    if (fixed.split(' ').length < 2) {
        return `${fixed} Automation`;
    }
    return fixed;
};

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

const BASE_URL = 'https://n8nmarket.com';

try {
    const workflowsRaw = fs.readFileSync(workflowsPath, 'utf-8');
    const workflows = JSON.parse(workflowsRaw);

    const entries = workflows.map(w => {
        const title = cleanTitle(w.title);
        const slug = slugify(title);
        return `
  <url>
    <loc>${BASE_URL}/workflow/${slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Add static pages
    const staticPages = [
        '',
        '/pricing',
        '/documentation'
    ].map(p => `
  <url>
    <loc>${BASE_URL}${p}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${entries.join('')}
</urlset>`;

    if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath);
    }

    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap generated with ${workflows.length} workflows at ${sitemapPath}`);

} catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
}
