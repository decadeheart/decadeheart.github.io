import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '~/config';

export async function GET(context) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description ?? '',
      link: `/posts/${p.data.slug ?? p.id}/`,
      categories: [
        ...(p.data.category ? [p.data.category] : []),
        ...(p.data.tags ?? []),
      ],
    })),
  });
}
