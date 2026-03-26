import type { APIRoute } from 'astro';

const siteUrl = 'https://victorbertram.com';

const staticPages = [
  '/',
  '/experience',
  '/projects',
  '/services',
  '/contact',
  '/en/',
  '/en/experience',
  '/en/projects',
  '/en/services',
  '/en/contact',
  '/es/',
  '/es/experience',
  '/es/projects',
  '/es/services',
  '/es/contact',
];

const projectSlugs = ['smartvoz', 'sistema-zapchat', 'desafios-biblicos'];
const projectPages = projectSlugs.flatMap((slug) => [
  `/projects/${slug}`,
  `/en/projects/${slug}`,
  `/es/projects/${slug}`,
]);

const allPages = [...staticPages, ...projectPages];

export const GET: APIRoute = () => {
  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
  </url>`
    )
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
