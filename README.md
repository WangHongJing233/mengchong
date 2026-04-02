# 萌宠 PK (Cute Pet PK)

这是一款专门为移动端（微信小程序）体验设计的高颜值、Q弹可爱的 Web 应用原型，旨在为宠物爱好者提供一个集宠物展示、互动打榜、健康管理与社区交流于一体的平台。

## ✨ 核心功能

- 🏆 **萌宠PK对决**：基于 AI 颜值评分、日常打卡获取的萌力值和社区活跃度，与其他玩家的宠物进行趣味 PK 对决，赢取萌力值奖励。
- 📊 **排行榜系统**：分为全国榜单与同城榜单，展示当前所有宠物的萌力排名情况。
- 🐾 **互动与打卡**：通过“日常打卡”与“互动玩耍”功能，每天陪伴宠物成长并赚取属性分数。
- 📈 **体重健康追踪**：记录宠物的体重变化情况，并以直观的折线图（Recharts）渲染其健康趋势。
- 💬 **萌宠社区**：图片瀑布流展示其他宠物主人的日常动态，支持点赞与评论模拟交互。
- 👤 **多宠物档案管理**：支持使用微信一键登录（模拟），管理名下的多只宠物，横向滑动无缝切换。

## 🛠️ 技术栈

- **前端框架**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) + TypeScript
- **路由管理**: [React Router v7](https://reactrouter.com/)
- **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
- **样式方案**: [Tailwind CSS v3](https://tailwindcss.com/)
- **动画库**: [Framer Motion](https://www.framer.com/motion/)
- **图表库**: [Recharts](https://recharts.org/)
- **图标库**: [Lucide React](https://lucide.dev/)

## 📂 目录结构

```
src/
├── components/   # 可复用的通用组件（如底部导航 BottomNav, Layout 布局）
├── pages/        # 页面级组件 (首页, 榜单, 社区, 我的, 健康追踪)
├── store.ts      # Zustand 状态管理与 Mock 数据
├── App.tsx       # 全局路由配置
├── index.css     # Tailwind 指令与全局自定义动画样式
└── main.tsx      # 应用入口文件
```

## 🚀 快速开始

本项目使用 Node.js 与 npm 作为包管理工具进行开发。

### 环境要求

- Node.js >= 18.x
- npm 或 pnpm

### 安装与运行

1. 克隆项目或进入项目目录：
   ```bash
   cd workspace
   ```

2. 安装项目依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 打开浏览器访问控制台输出的地址（默认为 `http://localhost:5173/`）。
   > **注意**：如果是在局域网内或预览面板中访问，`vite.config.ts` 已配置了 `host: '0.0.0.0'` 和 `allowedHosts: true` 以允许外部设备访问。

### 构建与部署

构建生产版本文件：
```bash
npm run build
```
构建产物将会生成在 `dist` 目录下。

## 🎨 设计与交互亮点

1. **移动端优先**：默认约束了最大宽度并在容器中居中展示，模拟了微信小程序的沉浸式竖屏浏览体验。
2. **Q弹动画**：集成了 `framer-motion` 和原生 CSS `@keyframes` 实现了呼吸动画、PK 弹窗、卡片加载浮现和交互反馈微动效。
3. **色彩搭配**：以“治愈系”为主题的温暖橙黄色（Orange）与薄荷绿辅助色相搭配，并大面积使用了具有透明度和模糊的拟物卡片（Glassmorphism）质感。

---
*本项目当前为纯前端 Mock 数据驱动的版本，API 层与后台通信预留在 `store.ts` 与各个组件逻辑内，以便于未来接入真实的后端服务与微信登录开放接口。*