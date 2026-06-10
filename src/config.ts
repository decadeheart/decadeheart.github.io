export const SITE = {
  title: '擎烛而走',
  subtitle: '虽千万里，吾往矣',
  description: 'Art · life · technology — Decade 的个人博客',
  author: 'Decade',
  url: 'https://decadeheart.github.io',
  lang: 'zh-Hans',
  email: '2456535090@qq.com',
  github: 'https://github.com/decadeheart',
  startYear: 2020,
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/posts/', label: '文章' },
  { href: '/archive/', label: '归档' },
  { href: '/categories/', label: '分类' },
  { href: '/tags/', label: '标签' },
  { href: '/about/', label: '关于' },
] as const;
