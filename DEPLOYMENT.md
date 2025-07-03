# 部署指南

本项目是一个完全静态的网站，可以部署到任何支持静态文件托管的平台。

## 🚀 快速部署

### 1. 构建项目

```bash
npm run build
```

这将在 `out` 目录中生成静态文件。

### 2. 部署选项

#### Vercel (推荐)
1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 并配置构建设置
4. 点击部署即可

#### Netlify
1. 将 `out` 目录拖拽到 [Netlify Drop](https://app.netlify.com/drop)
2. 或者连接 Git 仓库，设置构建命令为 `npm run build`，发布目录为 `out`

#### GitHub Pages
1. 将 `out` 目录的内容推送到 `gh-pages` 分支
2. 在仓库设置中启用 GitHub Pages

#### Cloudflare Pages
1. 连接 Git 仓库
2. 设置构建命令：`npm run build`
3. 设置输出目录：`out`

#### 自托管
将 `out` 目录的内容复制到任何 Web 服务器的根目录。

## 📁 构建输出

构建后的文件结构：
```
out/
├── index.html          # 主页
├── 404.html           # 404 页面
├── _next/             # Next.js 资源
│   ├── static/
│   │   ├── css/       # 样式文件
│   │   ├── chunks/    # JavaScript 文件
│   │   └── media/     # 字体等资源
└── 404/               # 404 页面目录
```

## 🔧 环境配置

### 自定义域名
如果使用自定义域名，请更新 `src/app/layout.tsx` 中的 OpenGraph URL：

```typescript
openGraph: {
  url: 'https://your-domain.com',  // 替换为您的域名
  // ...
},
```

### HTTPS
强烈建议使用 HTTPS，因为项目使用了 Web Crypto API，在某些浏览器中需要安全上下文。

## 📊 性能优化

项目已包含以下优化：
- 自动代码分割
- 图片优化（在静态导出中禁用）
- CSS 压缩
- JavaScript 压缩
- 预加载关键资源

## 🔍 SEO 优化

已配置的 SEO 元素：
- 页面标题和描述
- Open Graph 标签
- Twitter Cards
- Robots.txt 友好的元标签
- 结构化数据

## 🛡️ 安全考虑

- 所有密码生成在客户端完成
- 使用 Content Security Policy 友好的代码
- 不包含任何服务器端代码或 API

## 📱 浏览器兼容性

支持所有现代浏览器：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

需要 Web Crypto API 支持。 