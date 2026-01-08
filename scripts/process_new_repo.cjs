const fs = require('fs');
const path = require('path');

// Search the entire cloned repo for JSON files
const REPO_ROOT = path.join(__dirname, '../temp_repo');
const OUTPUT_FILE = path.join(__dirname, '../src/data/workflows.json');

// Nodes to ignore when extracting "tools" (utility nodes)
const IGNORED_NODES = new Set([
    'n8n-nodes-base.set',
    'n8n-nodes-base.start',
    'n8n-nodes-base.merge',
    'n8n-nodes-base.if',
    'n8n-nodes-base.switch',
    'n8n-nodes-base.noOp',
    'n8n-nodes-base.splitInBatches',
    'n8n-nodes-base.itemLists',
    'n8n-nodes-base.aggregate',
    'n8n-nodes-base.function',
    'n8n-nodes-base.functionItem',
    'n8n-nodes-base.wait',
    'n8n-nodes-base.webhook', // We might want to label this "Webhook" but not treat as a "Platform" icon usually, unless specifically requested.
    'n8n-nodes-base.scheduleTrigger', // Same as above
    'n8n-nodes-base.cron',
    'n8n-nodes-base.manualTrigger',
    'n8n-nodes-base.httpRequest', // Too generic usually, unless it's the ONLY thing.
]);

// Map specific node types to nice names or icon keys
const NODE_NAME_MAP = {
    'n8n-nodes-base.openai': 'OpenAI',
    'n8n-nodes-base.slack': 'Slack',
    'n8n-nodes-base.googleSheets': 'Google Sheets',
    'n8n-nodes-base.gmail': 'Gmail',
    'n8n-nodes-base.telegram': 'Telegram',
    'n8n-nodes-base.notion': 'Notion',
    'n8n-nodes-base.airtable': 'Airtable',
    // Add more as needed, but fallback to "clean name" works well too
};

// Helper to clean filename into a Title
function parseFilename(filename) {
    // Remove extension
    let name = filename.replace('.json', '');
    // Remove category prefix/ID (e.g., "ai_agents_599_")
    name = name.replace(/^[a-z_]+_\d+_/, '');
    // Replace underscores/hyphens with spaces
    name = name.replace(/[_-]/g, ' ');
    // Title Case
    return name.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Check if a name is "generic"
function isGenericName(name) {
    if (!name) return true;
    if (/^Template \d+$/i.test(name)) return true;
    if (/^My workflow/i.test(name)) return true;
    return false;
}

// Recursive function to find all JSON files
function getAllJsonFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== '.git') { // Ignore .git
                getAllJsonFiles(filePath, fileList);
            }
        } else {
            if (file.endsWith('.json') && file !== 'package.json' && file !== 'package-lock.json' && file !== 'metadata.json' && file !== 'tsconfig.json') {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function processRepo() {
    const workflows = [];
    let idCounter = 1;

    if (!fs.existsSync(REPO_ROOT)) {
        console.error(`Repo directory not found: ${REPO_ROOT}`);
        return;
    }

    console.log('Scanning for workflow files...');
    const allFiles = getAllJsonFiles(REPO_ROOT);
    console.log(`Found ${allFiles.length} potential workflow files.`);

    // Filter out non-workflow JSONs by checking structure roughly or just try-catch
    allFiles.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const json = JSON.parse(content);

            // Basic validation: must have "nodes" array
            if (!json.nodes || !Array.isArray(json.nodes)) return;

            // Use parent folder as "Category" if possible, else "General"
            const parentDir = path.basename(path.dirname(filePath));
            const category = parentDir === 'temp_repo' ? 'General' : parentDir;

            // --- 1. Naming Strategy ---
            let title = json.name;
            if (isGenericName(title)) {
                title = parseFilename(path.basename(filePath));
            }

            // --- 2. Tool/Icon Extraction ---
            const nodes = json.nodes || [];
            const usedTools = new Set();
            const tags = new Set();

            // Add platform/category tag
            tags.add(category);

            // --- 3. Node Overview Generation (SEO Friendly) ---
            // Format: "Node Name – node.type"
            let nodeOverviewHtml = '<ul class="space-y-2">';
            let nodeSequence = [];

            nodes.forEach(node => {
                if (!node.type) return;

                const nodeLabel = node.name || 'Node';
                const nodeType = node.type;

                // Skip utility nodes for "Icons" list
                if (IGNORED_NODES.has(node.type)) {
                    if (node.type.includes('webhook')) tags.add('Webhook');
                    if (node.type.includes('schedule')) tags.add('Schedule');
                } else {
                    // Clean Node Type -> Tool Name
                    let toolName;
                    if (NODE_NAME_MAP[node.type]) {
                        toolName = NODE_NAME_MAP[node.type];
                    } else {
                        const parts = node.type.split('.');
                        const rawName = parts[parts.length - 1];
                        toolName = rawName.replace(/([A-Z])/g, ' $1').trim();
                        toolName = toolName.charAt(0).toUpperCase() + toolName.slice(1);
                    }
                    usedTools.add(toolName);
                    tags.add(toolName);
                }

                nodeOverviewHtml += `<li class="flex items-center gap-2">
                    <span class="font-semibold text-slate-800">${nodeLabel}</span>
                    <span class="text-slate-400">–</span>
                    <span class="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">${nodeType}</span>
                </li>`;

                nodeSequence.push(nodeLabel);
            });
            nodeOverviewHtml += '</ul>';

            // --- 4. Enhanced Description ---
            let richDescription = `This n8n workflow automates tasks using ${category}. It consists of ${nodes.length} nodes: ${nodeSequence.slice(0, 5).join(', ')}${nodeSequence.length > 5 ? ', and more' : '.'}.`;
            let finalDescription = richDescription;

            // Add to list
            workflows.push({
                id: idCounter++,
                title: title,
                description: finalDescription,
                category: category,
                integrations: Array.from(usedTools),
                tags: Array.from(tags),
                complexity: nodes.length > 10 ? 'Complex' : (nodes.length > 5 ? 'Medium' : 'Simple'),
                // Generate a local raw URL or github link. Since paths are complex now, let's use a generic approach or try to map back to github if structure matches.
                // For now, let's point to the raw github user content matching the path structure relative to root.
                // Repo root: temp_repo/
                // File path: c:/Users/.../temp_repo/subdir/file.json
                // Relative: subdir/file.json
                jsonUrl: `https://raw.githubusercontent.com/ritik-prog/n8n-automation-templates-5000/main/${path.relative(REPO_ROOT, filePath).replace(/\\/g, '/')}`,
                image: "https://generated-image-url.com",
                nodeOverview: nodeOverviewHtml
            });

        } catch (err) {
            // console.warn(`Failed to process ${filePath}: ${err.message}`);
        }
    });

    console.log(`Processed ${workflows.length} workflows.`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(workflows, null, 2));
    console.log(`Saved to ${OUTPUT_FILE}`);
}

processRepo();
