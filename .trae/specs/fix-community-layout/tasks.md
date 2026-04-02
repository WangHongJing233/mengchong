# Tasks
- [x] Task 1: 修复底部导航栏（TabBar）的破损图片
  - [x] SubTask 1.1: 创建一个 Node 脚本，自动生成 8 张尺寸为 81x81 的带有极简几何图形（表示选中和未选中）的 PNG 图片，并覆盖 `/workspace/src/assets/tabbar/` 下的空文件。
- [x] Task 2: 修复页面布局遮挡与滚动视图（ScrollView）
  - [x] SubTask 2.1: 在 `src/pages/community/index.tsx` 中，将最外层的 `View` 调整为 `flex flex-col h-screen overflow-hidden bg-[#f7f8fa]`。
  - [x] SubTask 2.2: 使 Header 区域固定且不使用 `absolute` 或 `sticky`，而是占据正常的流文档高度（使用 `shrink-0`）。
  - [x] SubTask 2.3: 给 `ScrollView` 添加 `flex-1 h-0` 属性，让其自动填满剩余空间，并在内部增加适当的底部内边距 `pb-32`，以防止底部内容被悬浮按钮和系统 TabBar 遮挡。
- [x] Task 3: 升级卡片 UI 设计（Soft UI & Premium Layout）
  - [x] SubTask 3.1: 将每条动态卡片的外层调整为 `bg-white rounded-[24px] shadow-sm mb-6 border border-gray-100`。
  - [x] SubTask 3.2: 调整头像栏的间距和字体：`p-5 flex flex-row items-center justify-between`，增加头像尺寸（`w-12 h-12`），使名字字体更清晰（`font-extrabold text-base`）。
  - [x] SubTask 3.3: 重构正文文本和图片的排版：将文本移至图片上方，增加 `px-5 pb-3`，将图片包裹在带圆角和阴影的容器中（`mx-5 mb-4 rounded-2xl overflow-hidden shadow-inner`）。
- [x] Task 4: 优化交互栏与评论区
  - [x] SubTask 4.1: 点赞和评论按钮移至卡片底部，添加更精致的间距（`px-5 py-4 border-t border-gray-50 flex flex-row items-center gap-8`）。
  - [x] SubTask 4.2: 评论区改为内嵌的浅色气泡背景（`mx-5 mb-5 p-4 bg-gray-50/80 rounded-2xl`），使文字可读性更好。
  - [x] SubTask 4.3: 发送评论输入框区域也同步加上圆角和阴影，与卡片整体风格融合。
- [x] Task 5: 优化悬浮发布按钮 (FAB)
  - [x] SubTask 5.1: 调整悬浮按钮的尺寸为 `w-14 h-14`，位置固定在 `bottom-24 right-6`，增加炫彩渐变背景 `bg-gradient-to-tr from-primary-400 to-primary-600` 和 `shadow-cute` 阴影，确保不压在帖子核心交互区域上。

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]
