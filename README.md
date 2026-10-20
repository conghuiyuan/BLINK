# hello world-我的第一个虚拟交互世界

基于虚拟交互空间课程框架制作的教师演示网页。33 屏，前两屏为封面、AI首作项目的制作流程。后续覆盖认识、案例、主题、布局、游戏视觉、概念图、成果交接与实现。空间布局图分为概念与用途、标注实例、逐层绘制、检查与常见问题、个人实践五屏；游戏视觉按用户提供的参考 PPT 组织为八屏，随后进入视觉规则。布局图对照页使用丰富的花园概念场景图，并保留节点对应高亮。每屏按电脑视口自动等比适配，无需上下滚动；不包含学生填表、上传或提交功能。

## 开发与构建

需要 Node.js 20.19+ 或 22.12+（已验证环境：Node.js 24）。

```sh
npm ci --cache /tmp/blink-npm-cache --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

`npm run build` 生成静态站点 `dist/index.html` 和便携单文件 `dist/zaojing-classroom.html`。单文件包含脚本、样式、图片与三维程序，可以下载后用支持 WebGL 2 的浏览器直接打开；案例访问按钮需要联网。也可以把 `dist/` 部署到静态站点托管服务。开发服务器或环境快照不等于公开网站部署。

## 演示操作

- 目录跳转章节；底部圆点切换同章节内的页面。
- ← / → 或 PageUp / PageDown 翻屏，Home 返回首页。
- P 切换投屏布局；F 浏览器全屏；N 打开讲课提示；? 打开帮助。
- 花园三种体验使用同一个真实 Three.js 场景：固定画面、可拖动观察、可拖动且可点击装置。鼠标拖动改变相机视角；场景下方按钮可向左右观看。
- 交互模式直接点击三维装置或装置上方标签。启动三个装置后花坛恢复，支持重新演示。相机操作不会启动装置。
- 布局演示逐步显示五层信息；视觉演示对比两种风格；概念图对照可以逐项指认入口、花坛与 A/B/C。
- 光遇图片直接在课件内展示，支持日/夜切换和色彩、光照、空间层次、视觉引导解析，不要求下载游戏。
- 作品参考包含 Bruno Simon（图示 2019 版，链接打开现行作品）、光遇、Veloren，以及 three.js 的 Littlest Tokyo 与 Ocean 示例。成品截图明确标注为设计参考，不冒充概念设计稿。
- 提示词支持分层组合和复制；剪贴板受浏览器限制时，可选中文字手动复制。
- 帮助中可打印整份讲义。打印时以图示代替实时 3D。

## 环境与素材

- 无数据库、API 密钥或后台服务。安装需要 registry.npmjs.org。
- 真实 3D 需要浏览器 WebGL 2 支持；不支持时显示开启硬件加速的提示。
- 静态图片已下载并内嵌，不需要课堂联网获取图片。来源与署名见 [src/assets/SOURCES.md](src/assets/SOURCES.md)。
- 云端托管浏览器禁止 file:// 导航。单文件可通过返回其原始 HTML 字节并阻断全部外部资源请求来验证；普通桌面浏览器可直接打开文件。
- 课件适合电脑横屏演示；小尺寸设备按整屏缩放，建议使用横屏或电脑获得清晰阅读效果。

## 下载与 GitHub Pages

[下载离线课件 ZIP](https://github.com/conghuiyuan/BLINK/raw/refs/heads/main/docs/zaojing-classroom.zip)。解压后，用支持 WebGL 2 的浏览器打开 `zaojing-classroom.html`。

`docs/index.html` 是可以直接发布的完整网页；`docs/zaojing-classroom.zip` 是配套离线包。

首次启用 GitHub Pages 时，打开仓库 **Settings → Pages**，Source 选择 **Deploy from a branch**，Branch 选择 **main**，目录选择 **/docs**，点击 **Save**。GitHub 会开始构建和发布。这里的说明不代表站点已上线，请以 Pages 设置页报告的发布结果为准。

仓库也提供手动工作流 `.github/workflows/publish-classroom.yml`，用于已启用 GitHub Actions 作为 Pages 发布来源的环境。默认 `GITHUB_TOKEN` 不能首次启用 Pages；不要把令牌值写入工作流或源码。
