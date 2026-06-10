import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const legacyRoot = join(projectRoot, 'legacy/2020');
const outDir = join(projectRoot, 'src/content/posts');

mkdirSync(outDir, { recursive: true });

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '*',
});
turndown.addRule('removeAnchorOnly', {
  filter: (node) => node.nodeName === 'A' && !node.textContent.trim() && !node.querySelector('img'),
  replacement: () => '',
});

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (entry === 'index.html') yield p;
  }
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[\s　]+/g, '-')
    .replace(/[^\w一-龥-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

const posts = [];

for (const file of walk(legacyRoot)) {
  const html = readFileSync(file, 'utf8');
  const root = parse(html);
  const titleEl = root.querySelector('h1.post-title');
  if (!titleEl) continue;
  const title = titleEl.textContent.trim();
  const timeEl = root.querySelector('time[itemprop*="dateCreated"]');
  const datetime = timeEl?.getAttribute('datetime') || '2020-01-01T00:00:00+08:00';
  const date = datetime.slice(0, 10);

  const category = root.querySelector('[itemprop="about"] [itemprop="name"]')?.textContent.trim() || null;
  const tags = root.querySelectorAll('a[rel="tag"]').map((a) =>
    a.textContent.replace(/^#\s*/, '').trim(),
  );

  // node-html-parser sometimes drops nested content — extract body with regex instead
  const bodyMatch = html.match(/<div class="post-body" itemprop="articleBody">([\s\S]*?)<\/div>\s*<\/article>/);
  let bodyHtml = bodyMatch ? bodyMatch[1] : null;
  if (!bodyHtml) {
    // fallback: until next sibling </div>\n    </div>\n    \n    \n\n    <footer
    const alt = html.match(/<div class="post-body" itemprop="articleBody">([\s\S]*?)<footer class="post-footer">/);
    bodyHtml = alt ? alt[1].replace(/<\/div>\s*$/, '') : null;
  }
  if (!bodyHtml) {
    console.warn(`⚠ no body in ${file}`);
    continue;
  }

  // strip NexT-injected anchors and reward / footer artifacts
  bodyHtml = bodyHtml
    .replace(/<a [^>]*class="headerlink"[^>]*>[\s\S]*?<\/a>/g, '')
    .replace(/<a id="more"><\/a>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<div[^>]*>\s*打赏一瓶[\s\S]*$/, '');

  const md = turndown.turndown(bodyHtml).trim();

  // build the path-derived URL slug from the original directory name
  const dirSlug = file.split('/').slice(-2, -1)[0];

  const fm = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `date: ${date}`,
    category ? `category: ${JSON.stringify(category)}` : null,
    tags.length ? `tags: ${JSON.stringify(tags)}` : null,
    `slug: ${JSON.stringify(dirSlug)}`,
    '---',
  ]
    .filter((l) => l !== null)
    .join('\n');

  const outFile = join(outDir, `${date}-${slugify(title)}.md`);
  writeFileSync(outFile, fm + '\n\n' + md + '\n');
  posts.push({ title, date, category, tags, file: outFile });
  console.log(`✔ ${title}  → ${outFile.replace(projectRoot + '/', '')}`);
}

console.log(`\nExtracted ${posts.length} posts.`);
