# 擎烛而走

> 虽千万里，吾往矣 · [decadeheart.github.io](https://decadeheart.github.io)

Decade 的个人博客，2026 年使用 Astro 重构。

## 技术栈

- **框架**: [Astro 5](https://astro.build)
- **内容**: Markdown / MDX（Content Collections）
- **样式**: 原生 CSS + CSS 变量（深色模式 + 响应式）
- **部署**: GitHub Pages（GitHub Actions）

## 本地开发

```bash
npm install     # 安装依赖
npm run dev     # 启动开发服务器 http://localhost:4321
npm run build   # 构建到 dist/
npm run preview # 预览构建产物
```

## 目录

```
src/
├── components/         # 可复用组件 (Header / Footer / PostCard / ThemeToggle ...)
├── content/posts/      # 文章 Markdown 源
├── layouts/            # 页面布局 (BaseLayout / PostLayout)
├── pages/              # 路由页面
│   ├── index.astro
│   ├── about/
│   ├── archive/
│   ├── categories/
│   ├── posts/
│   └── tags/
├── styles/global.css   # 全局样式与主题变量
├── config.ts           # 站点配置
└── content.config.ts   # Content Collections schema

public/                 # 静态资源 (favicon / robots.txt / 图片)
scripts/                # 一次性维护脚本 (旧站抽取)
legacy/                 # 旧 Hexo 产物归档（不参与构建）
```

## 写一篇新文章

在 `src/content/posts/` 下新建一个 `.md` 文件：

```markdown
---
title: "文章标题"
date: 2026-06-10
category: "分类名"
tags: ["标签1", "标签2"]
slug: "url-slug"
description: "可选的摘要"
---

正文……
```

## 部署

推送到 `master` 即触发 GitHub Actions 自动构建并部署到 Pages。
需在仓库 Settings → Pages 中将 Source 设为 **GitHub Actions**。

## 旧站

旧的 Hexo + NexT v5 产物保留在 `legacy/` 目录中，仅作历史归档，不会被构建。
