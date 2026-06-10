export type PublicationType = 'journal' | 'conference' | 'preprint';

export interface Publication {
  /** Short identifier used as an HTML id and in the URL hash. */
  id: string;
  title: string;
  /** Co-author list. Mark `me: true` on the author that represents Xun Yuan. */
  authors: { name: string; me?: boolean }[];
  /** Full venue name. */
  venue: string;
  /** Short venue acronym shown as a badge. */
  venueShort?: string;
  year: number;
  /** ISO month for sorting within a year (optional). */
  month?: number;
  type: PublicationType;
  doi?: string;
  arxiv?: string;
  url?: string;
  pdf?: string;
  citations?: number;
  /** Highlights / TL;DR shown in the card. */
  abstract?: string;
}

const me = (name: string) => ({ name, me: true });
const a = (name: string) => ({ name });

export const PUBLICATIONS: Publication[] = [
  {
    id: 'msadm-tmc-2026',
    title:
      'MSADM: Large Language Model (LLM) Assisted End-to-End Network Health Management Based on Multi-Scale Semanticization',
    authors: [
      a('F. Tang'),
      a('X. Wang'),
      me('X. Yuan'),
      a('L. Luo'),
      a('M. Zhao'),
      a('T. Huang'),
      a('N. Kato'),
    ],
    venue: 'IEEE Transactions on Mobile Computing',
    venueShort: 'IEEE TMC',
    year: 2026,
    type: 'journal',
    doi: '10.1109/TMC.2026.3668817',
    arxiv: '2406.08305',
    abstract:
      '提出多尺度语义化框架,通过大语言模型对端到端网络健康状态进行解释与管理。',
  },
  {
    id: 'ciinet-ton-2026',
    title:
      'CiiNet: Self-Iterative Performance Optimization for Dynamic Networks Based on Causal Inference and Interpretable Evaluation',
    authors: [
      me('X. Yuan'),
      a('X. Wang'),
      a('M. Kato'),
      a('F. Tang'),
      a('Y. Li'),
      a('M. Zhao'),
      a('N. Kato'),
    ],
    venue: 'IEEE Transactions on Networking',
    venueShort: 'IEEE TON',
    year: 2026,
    type: 'journal',
    doi: '10.1109/TON.2025.3626551',
    citations: 3,
    abstract:
      '基于因果推断与可解释评估,提出动态网络的自迭代性能优化方法。',
  },
  {
    id: 'breakout-tetc-2026',
    title:
      'Breakout Local Search for Load-Balanced Federated Learning in Multi-BS Networks',
    authors: [
      a('M. Kato'),
      me('X. Yuan'),
      a('T. K. Rodrigues'),
      a('F. Tang'),
      a('M. Zhao'),
      a('N. Kato'),
    ],
    venue: 'IEEE Transactions on Emerging Topics in Computing',
    venueShort: 'IEEE TETC',
    year: 2026,
    month: 1,
    type: 'journal',
    doi: '10.1109/TETC.2026.3667101',
    citations: 1,
    abstract:
      '面向多基站网络下负载均衡联邦学习的 Breakout Local Search 优化方案。',
  },
  {
    id: 'mpite-ton-2025',
    title:
      'MPITE: Multidimensional Performance Evaluator for Interpretable and Traceable Network Performance Evaluation',
    authors: [
      me('X. Yuan'),
      a('X. Wang'),
      a('F. Tang'),
      a('Q. Zhou'),
      a('M. Zhao'),
      a('N. Kato'),
    ],
    venue: 'IEEE Transactions on Networking',
    venueShort: 'IEEE TON',
    year: 2025,
    type: 'journal',
    doi: '10.1109/TON.2025.3562348',
    citations: 6,
    abstract:
      '提出多维度、可解释、可追溯的网络性能评估方法 MPITE。',
  },
  {
    id: 'sagin-fso-thz-rf-icc-2025',
    title:
      'Performance Analysis of Space-Air-Ground Integrated Networks of FSO/THz/RF Multi-Band Communication',
    authors: [
      a('S. Long'),
      a('W. H. Wu'),
      me('X. Yuan'),
      a('M. Zhao'),
      a('F. Tang'),
      a('N. Kato'),
    ],
    venue: 'IEEE International Conference on Communications (ICC)',
    venueShort: 'IEEE ICC',
    year: 2025,
    month: 6,
    type: 'conference',
    doi: '10.1109/ICC52391.2025.11161725',
    citations: 1,
    abstract:
      '针对空天地一体化网络下 FSO/THz/RF 多频段通信进行性能分析。',
  },
  {
    id: 'thz-rf-twc-2024',
    title:
      'Joint Rate and Coverage Optimization for the THz/RF Multi-Band Communications of Space-Air-Ground Integrated Network in 6G',
    authors: [
      me('X. Yuan'),
      a('F. Tang'),
      a('M. Zhao'),
      a('N. Kato'),
    ],
    venue: 'IEEE Transactions on Wireless Communications, 23(6), 6669–6682',
    venueShort: 'IEEE TWC',
    year: 2024,
    month: 6,
    type: 'journal',
    doi: '10.1109/TWC.2023.3336016',
    citations: 70,
    abstract:
      '面向 6G 空天地一体化网络的 THz/RF 多频段通信,联合优化速率与覆盖。',
  },
];

/** Computed metrics shown on /publications and /about. */
export const SCHOLAR_METRICS = {
  citations: 105,
  hIndex: 3,
  i10Index: 2,
  lastUpdated: '2026-06-10',
};
