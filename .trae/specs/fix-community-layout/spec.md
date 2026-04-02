# 修复社区页面布局及视觉优化 Spec

## Why
用户反馈当前萌宠社区页面的布局参差不齐且样式粗糙。根据排查和截图显示，主要存在以下问题：
1. **顶部导航栏遮挡**：Header 采用了 `sticky` 定位，但 `ScrollView` 未正确设置边距或高度，导致内容（如头像和发布时间）被遮挡。
2. **图标破损**：底部的 TabBar 图标目前为空文件，导致在真机或开发者工具中显示为破损图片（Broken Image Icon）。
3. **卡片排版杂乱**：卡片内部的内边距（Padding）不一致，图片全屏铺满（Full Bleed）但上下衔接不自然，评论区和点赞栏的布局缺乏精致感。
4. **悬浮按钮（FAB）重叠**：悬浮的发布按钮遮挡了卡片底部的交互区域。

## What Changes
- **Tab Bar 图标修复**：使用真实的、极简的 Base64 占位图替换 `src/assets/tabbar/` 下的空文件，确保导航栏不显示破损图片。
- **页面结构重构**：将页面的整体布局调整为 `flex flex-col h-screen`，使 Header 占据固定高度，`ScrollView` 占据剩余空间 (`flex-1`)，彻底解决遮挡问题。
- **卡片 UI 升级（Soft & Premium Aesthetic）**：
  - 取消图片的 Full Bleed 设计，改为内嵌式（Inset）并赋予圆角 `rounded-2xl`，使卡片看起来更像精美的相框。
  - 统一卡片内部的水平 Padding。
  - 优化头像、昵称、时间的字体大小、颜色对比度和对齐方式。
  - 评论区采用更柔和的底色和圆角，提升阅读体验。
- **FAB 与底部安全区适配**：调整悬浮按钮的阴影、大小和层级，并在 `ScrollView` 底部增加足够的 `padding-bottom`，确保最后一条动态不会被 Tab Bar 或 FAB 遮挡。

## Impact
- Affected specs: Community Page Layout, Global Tabbar UI.
- Affected code: `src/pages/community/index.tsx`, `src/assets/tabbar/*` (替换图片文件)。

## MODIFIED Requirements
### Requirement: 社区动态信息流展示
系统需要以一种视觉精致、排版统一的卡片形式展示用户的宠物动态。
#### Scenario: 浏览社区动态
- **WHEN** 用户进入社区页面并上下滑动
- **THEN** 顶部标题栏应固定且不遮挡任何动态内容，每条动态的图片和文本应当有舒适的呼吸感（合理的内边距和统一的圆角），底部 TabBar 图标应正常显示。
