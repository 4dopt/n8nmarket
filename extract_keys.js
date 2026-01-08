import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/workflows.json', 'utf8'));
const integrations = new Set();
data.forEach(w => {
    (w.integrations || []).forEach(i => {
        const lower = i.toLowerCase();
        if (lower.includes('google') || lower.includes('sheet') || lower.includes('doc') || lower.includes('drive') || lower.includes('gmail') || lower.includes('hubspot') || lower.includes('openai') || lower.includes('gpt')) {
            integrations.add(i);
        }
    });
});

console.log(Array.from(integrations).sort().join('\n'));
