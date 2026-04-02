# 萌宠 PK (Cute Pet PK) 微信小程序发布指南

由于当前项目采用的是 `React + Vite` 构建的 Web (H5) 应用架构，若需将其发布为原生微信小程序，需要进行跨端框架的迁移或采用 Web-View 嵌套的方案。

以下是两种将本项目发布到微信小程序的常见技术路径与实施步骤：

---

## 方案一：通过跨端框架（Taro 或 uniapp）进行重构迁移（推荐）

该方案能提供最贴近原生小程序的体验，支持直接调用微信原生 API（如微信登录、扫码、分享等）。本项目在前期的技术架构设计（参见 `.trae/documents/Technical_Architecture.md`）中，原本也推荐使用 Taro 进行开发。

### 迁移步骤

1. **初始化 Taro 项目**
   ```bash
   # 安装 Taro CLI
   npm install -g @tarojs/cli
   
   # 初始化基于 React 的 Taro 项目
   taro init cute-pet-pk-miniapp
   ```

2. **样式适配迁移**
   - 将 Tailwind CSS 替换为针对小程序的工具（如 `weapp-tailwindcss`）。
   - 将原有的 `100dvh` 等单位调整为小程序的 `100vh` 或通过 flex 布局撑满。
   - `index.css` 中的 Web 端模拟样式（如 `max-width: 480px` 居中）可移除，直接适应全屏。

3. **组件与路由替换**
   - 将 `react-router-dom` 替换为 Taro 的原生路由体系（在 `app.config.ts` 中配置 `pages` 和 `tabBar`）。
   - 将原先在 `App.tsx` 中自建的 `BottomNav` 替换为小程序的原生 `tabBar` 配置，这会使底部导航体验更加流畅。
   - 将 `div`, `span`, `img` 等 HTML 标签替换为 Taro 提供的 `<View>`, `<Text>`, `<Image>`。
   - 原先的 `framer-motion` 动效可能无法直接在小程序中运行，需要使用小程序的原生动画 API (`wx.createAnimation`) 或轻量级的 CSS3 动画代替。

4. **接入微信开放能力**
   - 在 `Profile.tsx` 中，将模拟的登录替换为 Taro 提供的 `Taro.login()` 与 `Taro.getUserProfile()` 获取真实的用户信息。
   - 使用微信小程序原生的分享功能（`onShareAppMessage`）让用户可以分享他们的萌宠 PK 战绩。

5. **编译与发布**
   ```bash
   # 编译为微信小程序代码
   npm run build:weapp
   ```
   随后使用“微信开发者工具”导入编译后的 `dist` 目录，进行真机预览并上传代码。

---

## 方案二：使用 Web-View 嵌套 (H5 混合开发)

如果您希望尽量保持现有的代码不动，可以选择将构建好的 Web 应用直接嵌入到小程序中。

### 限制与前提
- **前提要求**：需要有一个已备案的域名，并且必须使用 HTTPS 协议。小程序后台需要配置业务域名。
- **限制**：个人主体的小程序不支持 `web-view` 组件；且无法直接拉起微信原生授权登录弹窗。

### 实施步骤

1. **构建与部署现有的前端产物**
   ```bash
   npm run build
   ```
   将 `dist` 目录中的产物部署到您的服务器上（例如：`https://cutepet.yourdomain.com`）。

2. **新建一个空白的微信小程序**
   使用微信开发者工具新建一个原生小程序项目。

3. **编写 Web-View 页面**
   在小程序的首页（如 `pages/index/index.wxml`）中加入以下代码：
   ```html
   <!-- pages/index/index.wxml -->
   <web-view src="https://cutepet.yourdomain.com"></web-view>
   ```

4. **处理登录等交互（可选）**
   由于 H5 无法直接调用 `wx.login`，如果需要真实的微信登录，通常的做法是：
   - 小程序启动时先通过原生页面获取 `code` 或 `token`。
   - 将该参数通过 URL 参数的形式拼接在 `web-view` 的 `src` 上（例如：`?token=xxx`）。
   - 您的 Web 应用（React 端）解析 URL 中的 Token 来建立登录态。

5. **上传代码并在微信公众平台提交审核**。

---

### 总结

- **追求最佳性能与原生体验**：请选择 **方案一（Taro 重构）**，虽然需要花费一些时间将 HTML 标签和动画库进行适配，但长远来看是小程序开发的正规途径。
- **快速验证产品模型**：如果您有企业资质和备案域名，可选择 **方案二（Web-View）** 进行极速上线。