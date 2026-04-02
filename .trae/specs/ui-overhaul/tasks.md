# Tasks
- [x] Task 1: 定义全局美学基础 (Tailwind & Scss)
  - [x] SubTask 1.1: 更新 `tailwind.config.js`，增加宠物主题的柔和阴影 (`shadow-cute-orange`, `shadow-soft-blue`) 和自定义大圆角 (`rounded-4xl` 等)。
  - [x] SubTask 1.2: 在 `src/app.scss` 中加入毛玻璃效果 (`backdrop-blur`) 类名以及一些柔和动画（心跳、轻微浮动等）。
- [x] Task 2: 重构社区页面美学 (`src/pages/community/index.tsx`)
  - [x] SubTask 2.1: 帖子卡片移除深色边框，改为浅色半透明背景搭配彩色柔阴影，圆角加至 `32px`。
  - [x] SubTask 2.2: 优化图片展示，给予图片极小的边距与大圆角，或使用独特的长宽比裁切。
  - [x] SubTask 2.3: 点赞和评论按钮设计成独立的胶囊状（Pill-shaped）小按钮，背景带有极浅的品牌色。
  - [x] SubTask 2.4: 评论列表和输入框融入背景（例如使用毛玻璃或极浅的灰色），消除分割线，改用间距和背景色块区分层级。
- [x] Task 3: 优化首页视觉表现 (`src/pages/index/index.tsx`)
  - [x] SubTask 3.1: 将首页的背景从单色改为柔和的径向渐变或带有光晕（Glow）的背景。
  - [x] SubTask 3.2: 中间的宠物头像区域设计为带有“发光基座”的舞台感。
  - [x] SubTask 3.3: 底部三个交互按钮（打卡、玩耍、PK）升级为微拟物化的凸起按钮或使用高级渐变。
- [x] Task 4: 升级个人中心与档案 (`src/pages/profile/index.tsx`, `src/pages/pet-detail/index.tsx`)
  - [x] SubTask 4.1: 个人中心的头部背景设计为带有柔和过渡的形状（例如大圆弧或渐变色块）。
  - [x] SubTask 4.2: “我的宠物”列表卡片，选中状态增加发光效果和微放大，未选中状态增加透明度过渡。
  - [x] SubTask 4.3: 宠物档案详情页的统计数据块（萌力、颜值等）采用独立的悬浮胶囊卡片展示。
- [x] Task 5: 优化健康追踪页 (`src/pages/health/index.tsx`)
  - [x] SubTask 5.1: 调整头部与主体背景颜色的过渡，使体重记录列表更像悬浮在纸上的便签。
- [x] Task 6: 重新生成高质量 TabBar 图标
  - [x] SubTask 6.1: 使用 Node Canvas 生成更具辨识度（例如简单的圆形、宠物爪印图案）或更好看渐变色的图标覆盖原有色块。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 1]
- [Task 4] depends on [Task 1]
- [Task 5] depends on [Task 1]
- [Task 6] can run independently
