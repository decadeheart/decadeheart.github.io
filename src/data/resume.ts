/**
 * Resume data — single source of truth.
 * Fill in the TODO blocks; the /resume page renders directly from this file
 * and is print-ready (Ctrl/Cmd+P → Save as PDF).
 */

export interface ResumeContact {
  name: string;
  nameZh?: string;
  title: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
}

export interface ResumeEducation {
  period: string;
  degree: string;
  org: string;
  orgZh?: string;
  dept?: string;
  location: string;
  bullets?: string[];
}

export interface ResumeExperience {
  period: string;
  role: string;
  org: string;
  location?: string;
  bullets: string[];
  tech?: string[];
}

export interface ResumeProject {
  name: string;
  period?: string;
  description: string;
  bullets?: string[];
  tech?: string[];
  link?: string;
}

export interface ResumeAward {
  year: string;
  title: string;
  detail?: string;
}

export interface ResumeSkillGroup {
  group: string;
  items: string[];
}

export const CONTACT: ResumeContact = {
  name: 'Xun Yuan',
  nameZh: '袁迅',
  title: 'Incoming Assistant Professor, Tohoku University · Network Performance Evaluation & 6G',
  location: 'Sendai, Japan / Changsha, China',
  email: '2456535090@qq.com',
  links: [
    { label: 'ORCID', href: 'https://orcid.org/0000-0002-2248-788X' },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=kNX0P0MAAAAJ',
    },
    { label: 'GitHub', href: 'https://github.com/decadeheart' },
    { label: 'Website', href: 'https://decadeheart.github.io' },
  ],
};

export const SUMMARY = `即将于 2026 年 6 月入职日本东北大学（Tohoku University）信息科学研究科 Kato Lab 担任助理教授（Assistant Professor）。
博士毕业于中南大学计算机学院（2022–2026,校长创新奖）,博士期间起在东北大学 Kato Lab 联合培养。
研究方向覆盖网络性能评估、因果推断、空天地一体化网络与 LLM 辅助的网络管理,
已在 IEEE TMC / TON / TWC / TETC / ICC 等会议期刊发表论文 7 篇,其中一作 3 篇,
合计引用 105+,h-index 3。`;

export const EDUCATION: ResumeEducation[] = [
  {
    period: '2022.09 – 2026.06',
    degree: 'Ph.D. in Computer Science',
    org: 'Central South University',
    orgZh: '中南大学',
    dept: 'School of Computer Science and Engineering',
    location: 'Changsha, China',
    bullets: ['Principal’s Innovation Award (校长创新奖)'],
  },
  {
    period: '2024.03 – 2026.03',
    degree: 'Visiting Research Student',
    org: 'Tohoku University',
    orgZh: '日本东北大学',
    dept: 'Kato Laboratory, Graduate School of Information Sciences',
    location: 'Sendai, Japan',
  },
  {
    period: '2020.09 – 2022.06',
    degree: 'M.Eng. in Computer Science',
    org: 'Huazhong University of Science and Technology',
    orgZh: '华中科技大学',
    dept: 'School of Computer Science and Technology',
    location: 'Wuhan, China',
    bullets: ['Outstanding Graduate (优秀毕业生)'],
  },
  {
    period: '2015.09 – 2019.06',
    degree: 'B.Eng. in Software Engineering',
    org: 'Huazhong University of Science and Technology',
    orgZh: '华中科技大学',
    dept: 'School of Software Engineering',
    location: 'Wuhan, China',
    bullets: ['Outstanding Graduate (优秀毕业生)'],
  },
];

// TODO: 填写实习/科研经历
export const EXPERIENCE: ResumeExperience[] = [
  {
    period: '2026.06 – Present',
    role: 'Assistant Professor (Incoming)',
    org: 'Tohoku University, Kato Lab',
    location: 'Sendai, Japan',
    bullets: [
      '即将担任日本东北大学信息科学研究科 Kato Lab 助理教授。',
      '研究方向：网络性能评估、空天地一体化网络、LLM 辅助的网络管理。',
    ],
    tech: ['Python', 'PyTorch', 'NS-3', 'LLM', 'Causal Inference'],
  },
  {
    period: '2024.03 – 2026.03',
    role: 'Visiting Research Student',
    org: 'Tohoku University, Kato Lab',
    location: 'Sendai, Japan',
    bullets: [
      '参与空天地一体化网络（SAGIN）多频段通信建模与性能分析。',
      '推进基于大语言模型的端到端网络健康管理 (MSADM) 系列工作。',
    ],
    tech: ['Python', 'PyTorch', 'NS-3', 'LLM'],
  },
  // {
  //   period: 'YYYY.MM – YYYY.MM',
  //   role: '实习岗位',
  //   org: '公司名',
  //   location: '地点',
  //   bullets: ['做了什么 → 取得什么结果（用数字）'],
  //   tech: ['Go', 'Kubernetes'],
  // },
];

// TODO: 补充个人项目
export const PROJECTS: ResumeProject[] = [
  {
    name: 'decadeheart.github.io',
    period: '2026',
    description: '个人博客与学术主页,使用 Astro 5 重构。',
    bullets: [
      '从旧 Hexo + NexT 5 站点迁移,迁出 7 篇文章为 Markdown',
      'TypeScript + Content Collections,自动 sitemap 与 RSS',
      'GitHub Actions 一键部署到 GitHub Pages',
    ],
    tech: ['Astro', 'TypeScript', 'GitHub Actions'],
    link: 'https://github.com/decadeheart/decadeheart.github.io',
  },
];

// TODO: 补充技能等级
export const SKILLS: ResumeSkillGroup[] = [
  {
    group: 'Languages',
    items: ['Python', 'C/C++', 'JavaScript/TypeScript', 'Go', 'MATLAB'],
  },
  {
    group: 'Research',
    items: [
      'PyTorch',
      'NS-3 / Network Simulators',
      'Causal Inference',
      'LLM Fine-tuning',
      'Optimization',
    ],
  },
  {
    group: 'Engineering',
    items: ['Linux', 'Docker', 'Git', 'CI/CD', 'Vue / React'],
  },
  {
    group: 'Languages (Human)',
    items: ['Chinese (Native)', 'English (Fluent)', 'Japanese (Intermediate)'],
  },
];

// TODO: 补充奖项 / 荣誉
export const AWARDS: ResumeAward[] = [
  {
    year: '2024',
    title: 'Principal’s Innovation Award · 中南大学校长创新奖',
  },
  {
    year: '2022',
    title: 'Outstanding Graduate · 华中科技大学优秀毕业生（硕士）',
  },
  {
    year: '2019',
    title: 'Outstanding Graduate · 华中科技大学优秀毕业生（本科）',
  },
];

// 文件版本,便于 PDF 命名 / 浏览器标题
export const RESUME_VERSION = '2026.06';
