export const SITE = {
  title: '擎烛而走',
  subtitle: '虽千万里，吾往矣',
  description: 'Xun Yuan (Decade) — 东北大学助理教授，研究方向为网络性能评估、因果推断与空天地一体化网络。',
  author: 'Decade',
  authorRealName: 'Xun Yuan',
  url: 'https://decadeheart.github.io',
  lang: 'zh-Hans',
  email: '2456535090@qq.com',
  github: 'https://github.com/decadeheart',
  orcid: 'https://orcid.org/0000-0002-2248-788X',
  scholar:
    'https://scholar.google.com/citations?user=kNX0P0MAAAAJ',
  startYear: 2020,
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/publications/', label: '论文' },
  { href: '/resume/', label: '简历' },
  { href: '/posts/', label: '文章' },
  { href: '/archive/', label: '归档' },
  { href: '/about/', label: '关于' },
] as const;
