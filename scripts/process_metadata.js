
import fs from 'fs';
import path from 'path';

const RAW_PATH = path.join(process.cwd(), 'template-meta.json');
const OUT_PATH = path.join(process.cwd(), 'src/data/workflows.json');

const toTitleCase = (str) => {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

try {
    const rawData = fs.readFileSync(RAW_PATH, 'utf-8');
    const workflows = JSON.parse(rawData);

    const processed = workflows.map(w => {
        return {
            id: w.id.toString(),
            title: toTitleCase(w.name),
            description: w.preview || w.name,
            price: 0,
            tier: 'Free',
            category: w.categoryGroup,
            complexity: w.complexity,
            integrations: w.tags.filter(t => !t.includes('json') && !t.includes('n8n')), // Basic filter
            tags: w.tags,
            featured: false,
            downloads: Math.floor(Math.random() * 500) + 50,
            jsonUrl: `https://n8n-templates.ritiktechs.com/${w.relativePath}`
        };
    });

    fs.writeFileSync(OUT_PATH, JSON.stringify(processed, null, 2));
    console.log(`Successfully processed ${processed.length} workflows to ${OUT_PATH}`);

} catch (err) {
    console.error('Error processing metadata:', err);
    process.exit(1);
}
