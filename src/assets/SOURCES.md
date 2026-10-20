# 课件图像来源

以下图像作为课堂案例引用，保留原作品署名。未将游戏截图、社区背景图或已实现项目的截图标为原作者的概念设计稿。花园 SVG、空间布局图和可交互 3D 花园为本课件制作。

## 用途示意图

`use-explore.svg`（林间探索）、`use-exhibition.svg`（虚拟展厅）、`use-learning.svg`（太阳系学习空间）、`use-emotion.svg`（湖边记忆小屋）均为本课件制作的场景示意图，用于解释四类用途，不作为现有游戏或网站的截图。

## Bruno Simon

- 当前使用文件：`bruno-2025.png`，与用户指定的图1为同一画面，取自官方高清原图。
- 作品：Bruno Simon，Folio 2025。
- 原始图像：<https://bruno-simon.com/social/share-image.png?cb=a>
- 作者项目：<https://github.com/brunosimon/folio-2025>
- 案例介绍页使用官方预览图；观看重点页仅保留文字。入口教学、信息区域、视觉引导与操作反馈需结合原站演示，不据此预览图推断具体操作。
- 历史素材 `bruno-2019.png` 保留在仓库中，本版课件未引用；来源：<https://raw.githubusercontent.com/brunosimon/folio-2019/master/static/social/share-1200x630.png>。

## 用户提供的游戏视觉参考 PPT

- 来源：用户上传的 `游戏视觉部分参考.pptx`，课件采用其中的文字结构与七张图片。
- 《光·遇》（thatgamecompany）：`sky-campfire.jpg`、`sky-islands.jpg`、`sky-materials.jpg`、`sky-lighting.jpg`、`sky-guidance.jpg`，分别对应原 PPT 的 image1、image4、image5、image6、image7。
- 《风之旅人》（thatgamecompany）：`journey-bridge.jpg`，对应 image2。
- A Short Hike（Adam Robinson-Yu）：`short-hike-forest.jpg`，对应 image3。
- 图片直接从用户的 PPT 中提取，作为教学案例引用，保留原游戏画面与已有界面元素。原 PPT 未提供这些截图的独立来源链接，不另作推断。
- 最后一页内容以用户在聊天中明确指定的文字为准，后接原课件的视觉规则页。

## 唤醒花园概念场景图

- 文件：`garden-concept.webp`。
- 根据本课件的空间设计，使用 OpenAI 图像生成工具制作，用于布局图与概念图的对照教学。不是现有游戏截图，也不是三维场景的实时渲染。
- 本版将参考花园改为完整的浮岛式三维世界概念图，能看到完整空间边界、岩石底部与天空。保留南侧入口、中央花坛、左侧 A、右侧 B、后方 C 三个供水装置与相通步道，三个节点位置与布局图对应。
- 原始生成图保留在工作区的 `generated_images` 中；网页使用 WebP 格式以减少离线文件体积。

## 历史素材：光·遇（本版未引用）

- 游戏与画面：thatgamecompany。
- 文件：`sky-day.webp`、`sky-night.webp`。
- 图片取自 Sky Shards 社区项目的背景素材，未声称由该社区开发游戏。
- 原始图像：<https://raw.githubusercontent.com/PlutoyDev/sky-shards/production/public/backgrounds/SkyBackgroundLight.webp>
- 原始图像：<https://raw.githubusercontent.com/PlutoyDev/sky-shards/production/public/backgrounds/SkyBackgroundDark.webp>
- 来源项目：<https://github.com/PlutoyDev/sky-shards>
- 这两张历史素材保留在仓库，本版游戏视觉使用上方列出的用户 PPT 图片，不提供游戏下载链接。

## 历史素材：Veloren（本版未引用）

- 作品及图片：Veloren contributors。
- 文件：`veloren.jpg`、`veloren-extra.jpg`。
- 图片来自官方游戏仓库的背景素材，展示体素视觉语言。
- 原始图像：<https://raw.githubusercontent.com/veloren/veloren/master/assets/voxygen/background/bg_main.jpg>
- 原始图像：<https://raw.githubusercontent.com/veloren/veloren/master/assets/voxygen/background/bg_10.jpg>
- 官方项目及其原始许可信息：<https://github.com/veloren/veloren>

## 历史素材：three.js 案例（本版未引用）

- `littlest-tokyo.jpg`：three.js 示例 `webgl_animation_keyframes` 的预览图。模型作品 **Littlest Tokyo**，作者 **Glen Fox**，官方示例标注 **CC Attribution**。
- 图像：<https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/screenshots/webgl_animation_keyframes.jpg>
- 作者作品：<https://artstation.com/artwork/1AGwX>
- 案例：<https://threejs.org/examples/#webgl_animation_keyframes>
- `three-ocean.jpg`：three.js 示例 `webgl_shaders_ocean` 的预览图。
- 图像：<https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/screenshots/webgl_shaders_ocean.jpg>
- 这些是已实现项目的截图，作为概念设计的观察参考，不是概念设计原稿。

## 代码库

真实 3D 花园使用 Three.js（MIT）与 OrbitControls。安装包中的原始 LICENSE 会一并写入单文件 HTML 的注释。图片本地保存，Vite 构建时内嵌为 data URL，核心演示不从外部网络加载素材。
