import fs from 'fs';
import path from 'path';
import { posts, getCategorySlugMap } from '../data/posts';

// ドメイン設定（公開時に変更してください）
const DOMAIN = 'https://your-domain.com'; // TODO: 実際のドメインに変更

// 出力先
const OUTPUT_PATH = path.join(__dirname, '../public/sitemap.xml');

// 静的ページのURL
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/contact/', changefreq: 'monthly', priority: '0.5' },
  { url: '/privacy/', changefreq: 'monthly', priority: '0.3' },
  { url: '/terms/', changefreq: 'monthly', priority: '0.3' },
  { url: '/dmca/', changefreq: 'monthly', priority: '0.3' },
];

// 投稿ページのURL
const postPages = posts.map(post => ({
  url: `/posts/${post.slug}/`,
  lastmod: post.date,
  changefreq: 'weekly',
  priority: '0.8',
}));

// カテゴリページのURL
const categoryMap = getCategorySlugMap();
const categoryPages = Object.keys(categoryMap).map(slug => ({
  url: `/category/${slug}/`,
  changefreq: 'daily',
  priority: '0.7',
}));

// すべてのページを結合
const allPages = [...staticPages, ...postPages, ...categoryPages];

// sitemap.xmlを生成
function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${DOMAIN}${page.url}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // publicディレクトリが存在しない場合は作成
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // sitemap.xmlを書き込み
  fs.writeFileSync(OUTPUT_PATH, xml, 'utf-8');

  console.log(`✅ sitemap.xml generated successfully!`);
  console.log(`📍 Location: ${OUTPUT_PATH}`);
  console.log(`📊 Total URLs: ${allPages.length}`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Post pages: ${postPages.length}`);
  console.log(`   - Category pages: ${categoryPages.length}`);
  console.log(`\n⚠️  Remember to update DOMAIN in scripts/generate-sitemap.ts before production!`);
}

// 実行
try {
  generateSitemap();
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}
