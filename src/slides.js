import { garden } from './garden.js';
import { planSvg, annotatedPlanSvg } from './diagrams.js';
import bruno from './assets/bruno-2025.png';
import skyCampfire from './assets/sky-campfire.jpg';
import journeyBridge from './assets/journey-bridge.jpg';
import shortHike from './assets/short-hike-forest.jpg';
import skyIslands from './assets/sky-islands.jpg';
import skyMaterials from './assets/sky-materials.jpg';
import skyLighting from './assets/sky-lighting.jpg';
import skyGuidance from './assets/sky-guidance.jpg';
import gardenConcept from './assets/garden-concept.webp';
import useExplore from './assets/use-explore.svg';
import useExhibition from './assets/use-exhibition.svg';
import useLearning from './assets/use-learning.svg';
import useEmotion from './assets/use-emotion.svg';

export const courseTitle = 'hello world-我的第一个虚拟交互世界';
export const images = { bruno, skyIslands, gardenConcept };
export const groups = ['课程总览','认识交互空间','观看空间案例','确定作品主题','画清空间布局','认识游戏视觉','建立视觉规则','理解概念场景图','生成与修改概念图','成果检查与交接'];
const cards = (items, cls='') => `<div class="cards ${cls}">${items.map(([n,t,p])=>`<article class="card"><span class="card-index">${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>`;
const callout = (title, text) => `<aside class="callout"><b>${title}</b><p>${text}</p></aside>`;
const task = (title,text) => `<aside class="class-task"><span>✎ 课堂任务</span><div><h3>${title}</h3><p>${text}</p></div></aside>`;
const rows = (items) => `<div class="info-rows">${items.map(([a,b])=>`<div><b>${a}</b><p>${b}</p></div>`).join('')}</div>`;
const photo = (src,alt,caption,cls='') => `<figure class="photo ${cls}"><img src="${src}" alt="${alt}"><figcaption>${caption}</figcaption></figure>`;
const s = (group,title,subtitle,kind,body,notes) => ({group,title,subtitle,kind,body,notes});
const processSketch = (i) => `<svg viewBox="0 0 150 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${[
  '<circle cx="30" cy="32" r="16"/><path d="M25 32h10m-5-5v10M49 32h22m-5-5 5 5-5 5"/><rect x="82" y="14" width="50" height="36" rx="7"/><path d="m91 39 10-13 10 10 12-8"/>',
  '<rect x="10" y="10" width="53" height="43" rx="6"/><path d="M23 19v24h27M23 33h14V21h15"/><path d="M74 32h12m-4-4 4 4-4 4"/><rect x="97" y="10" width="43" height="43" rx="6"/><path d="m102 42 10-16 10 9 9-14 5 21z"/>',
  '<path d="M24 16h23v32H16V24zM16 24h8v-8M22 40l6-9 6 5 6-8"/><path d="M58 32h22m-5-5 5 5-5 5"/><path d="m108 12 22 12v24l-22 12-22-12V24zM86 24l22 12 22-12m-22 12v24"/>',
  '<path d="m22 15 19 11v21L22 58 3 47V26zM3 26l19 11 19-11m-19 11v21M54 31h19m-5-5 5 5-5 5"/><rect x="87" y="10" width="53" height="44" rx="5"/><path d="M99 22h29M99 32h20M99 42h25m-25-22 3 2-3 2"/>',
  '<rect x="8" y="9" width="67" height="46" rx="6"/><path d="M18 45h47M23 43V30l12-7 12 7v13m-12-20v19M55 25h8v17"/><path d="M88 32h16m-5-5 5 5-5 5"/><circle cx="128" cy="32" r="15"/><path d="m120 32 5 5 10-11"/>',
  '<rect x="7" y="9" width="70" height="43" rx="5"/><path d="m34 21 17 10-17 10zM29 59h25"/><path d="M91 18h45m-45 14h45m-45 14h30M84 16l2 2 4-5m-6 17 2 2 4-5m-6 17 2 2 4-5"/>',
][i]}</svg>`;

export const slides = [
  s(0,courseTitle,'AI 首作 · 我的第一个虚拟交互世界','home','', '本页仅作为课程封面。下一页介绍 AI 首作项目的完整制作流程。'),
  s(0,'AI首作项目的制作流程','','overview-flow',`
    <div class="project-flow">${[
      ['01','主题与体验','确定空间情境和核心行动'],
      ['02','空间与视觉','布局图和概念场景图'],
      ['03','资产准备','即梦参考图、混元3D模型'],
      ['04','模型整理','利用模型处理器'],
      ['05','搭建与交互','平台中的空间与操作反馈'],
      ['06','测试与展示','修改作品并整理展示材料'],
    ].map(([n,t,p],i)=>`<article class="project-step"><div class="step-top"><span>${n}</span>${processSketch(i)}</div><h2>${t}</h2><p>${p}</p><span class="step-output">${['一句话作品概述','空间布局图 + 概念场景图','参考素材 + 3D 模型','可用于搭建的模型','可进入、可操作的世界','完成作品 + 展示材料'][i]}</span></article>`).join('')}</div>
  `,'介绍项目从主题与体验，到空间与视觉、资产准备、模型整理、搭建与交互，最后测试与展示的六步流程。'),
  s(1,'什么是虚拟交互空间？','从观看一个地方，到进入它，再让它回应你。','definition',`
    <blockquote>通过数字技术构建的，让人能够<strong>进入、探索</strong>，<br>并通过操作<strong>获得反馈</strong>的空间环境。</blockquote>
    ${cards([['01','虚拟','可以再现现实，也可以创造想象中的地方。'],['02','空间','有位置、方向、距离与区域，人能够在其中移动。'],['03','交互','操作引发回应：开启装置、获得信息、改变环境。']],'three')}
    ${callout('想一想','一张花园图片、一座可以漫游的花园、一个可以修复的花园，体验有什么不同？')}
  `,'先从学生熟悉的游戏、线上展厅等体验引入，再拆解三个关键词。不要把“能进入”直接等同于“有交互”。'),
  s(1,'同一座花园，三种体验','改变的是体验者能够做什么。','garden-demo','', '依次切换三个模式。漫游模式中拖动视角，看前后遮挡如何变化；交互模式直接点击场景内的装置。三种模式是同一个 Three.js 三维场景。'),
  s(1,'一个微型世界，可以承载什么？','不必一开始就做一个大世界，先完成一段小而完整的体验。','uses',`
    <div class="use-gallery">${[
      [useExplore,'探索游戏','寻找、收集、修复、解谜。','沿林间小路寻找发光物件，探索远处的入口与宝箱'],
      [useExhibition,'展示空间','个人作品展、校园介绍、主题展厅。','虚拟展厅内的绘画、雕塑和正在参观的体验者'],
      [useLearning,'学习体验','在场景中观察、尝试和发现。','虚拟学习空间内的太阳系模型、图表和观察者'],
      [useEmotion,'情绪表达','安静、奇妙，或承载个人记忆的世界。','暮色中的湖边小屋、木栈道和安静停留的体验者'],
    ].map(([img,t,p,alt],i)=>`<article class="use-card"><figure><img src="${img}" alt="${alt}"><figcaption>用途示意</figcaption></figure><div><span>0${i+1}</span><h3>${t}</h3><p>${p}</p></div></article>`).join('')}</div>
    <div class="question-band"><span>我想邀请别人进入什么地方？</span><span>希望他在里面做什么？</span><span>希望他获得什么感受？</span></div>
    ${callout('本次制作','以电脑浏览器中的体验为主。虚拟交互空间也可以通过手机或 VR 设备体验。')}
  `,'用四种用途拓宽选题，不要求每个世界同时包含所有用途。让学生先选一个明确的体验目标。'),
  s(2,'把个人网站，变成可以探索的世界','Bruno Simon · 3D 交互作品集','bruno-intro',`
    <div class="split wide-media">${photo(bruno,'Bruno Simon 作品集：桥边的红色越野车、发光灯柱与风格化场景','作品与图片：Bruno Simon · Folio 2025 官方预览图')}
    <div class="stack"><span class="tag">空间化的信息表达</span><h2>开着小车，<br>认识一个创作者。</h2><p class="body-copy">访问者操控一辆小车，在三维场地中探索个人介绍与作品。浏览信息，成为一次有方向、有发现的空间体验。</p>${rows([['进入方式','从“点击网页菜单”，变成“驾驶小车探索”。'],['内容组织','把不同的信息，放到不同的空间区域。'],['操作反馈','移动、碰撞与物理反应，让行动被看见。']])}<a class="button dark" href="https://bruno-simon.com/" target="_blank" rel="noopener noreferrer">打开 Bruno Simon 作品 ↗</a><p class="source">图示为作者官方作品预览，点击按钮进入网站体验。</p></div></div>
  `,'先介绍这个网站做了什么，再打开现行作品进行观看。使用用户指定画面的官方高清原图，图示为 Folio 2025 的作品预览。'),
  s(2,'看 Bruno Simon 时，重点看什么？','先观察体验，再讨论技术。','bruno-focus',`
    <div class="bruno-points">${[
      ['入口怎样教会你操作','最开始看见什么，怎样知道可以驾驶和交互。'],
      ['空间怎样组织信息','原来的个人介绍、作品和联系信息放在哪里。'],
      ['视觉怎样提示去向','道路、标识、地标和物件怎样吸引你靠近。'],
      ['操作怎样带来反馈','碰到物件、进入区域或触发操作时，有什么变化。'],
    ].map(([t,p],i)=>`<article><span>0${i+1}</span><div><h2>${t}</h2><p>${p}</p></div></article>`).join('')}</div><div class="bruno-takeaway">把内容安排成地点，让行动带来可感知的回应。</div>
  `,'结合上一页的作品演示，依次观察入口教学、信息组织、视觉去向和操作反馈。此页只保留四项文字观看重点。'),
  s(3,'先给世界一个清楚的主题','','theme',`
    <div class="theme-statement"><span class="eyebrow">一句话作品概述</span><div class="sentence">体验者作为<span class="sentence-blank"><em>________</em><small>身份</small></span>，进入<span class="sentence-blank"><em>________</em><small>空间</small></span>，<br>通过<span class="sentence-blank"><em>________</em><small>核心行动</small></span>，最终<span class="sentence-blank"><em>________</em><small>结果反馈</small></span>。</div><p class="sentence-purpose">用一句话说清作品的核心体验，让布局、视觉与交互围绕同一个目标展开。</p></div>
    ${cards([['01','清楚的主题','别人能说出，这个世界在讲什么。'],['02','可以探索的空间','区域之间有连接，有值得去的地方。'],['03','至少一条完整交互','能完成一次“行动 → 变化 → 结果”的体验。']],'three')}
    ${task('写出一句话作品概述','先填清身份、空间、行动和结果，再给作品取名。')}
  `,'帮助学生缩小范围。“创造一个奇幻王国”太大，可以改成“修复一座失去光亮的小灯塔”。'),
  s(3,'贯穿课堂的示例：唤醒花园','从主题出发，让身份、行动与反馈相互支持。','garden-theme',`
    <div class="split"><div class="illustration">${garden({awake:true})}</div><div class="stack"><p class="feature-quote">体验者作为温室修复者，进入缺水的花园，通过寻找并启动三个供水装置，使中央花坛恢复生机。</p>${rows([['空间情境','缺水的花园'],['体验者身份','温室修复者'],['核心行动','寻找并启动三个供水装置'],['结果反馈','中央花坛恢复生机'],['预期感受','探索的好奇、完成修复的成就感']])}</div></div>
  `,'追问：花园为什么需要被修复？玩家凭什么知道完成了？把抽象感受落实为可见的场景变化。'),
  s(4,'空间布局图是什么，为什么要画？','先从上方，把世界中的空间关系组织清楚。','plan-intro',`
    <blockquote class="plan-definition">空间布局图，是从上方组织空间的设计图，<br>用来说明<strong>各区域放在哪里、怎样连接</strong>，<br>以及<strong>体验者怎样探索</strong>。</blockquote>
    <div class="plan-purpose-label"><span class="eyebrow">WHY PLAN · 为什么先画布局</span></div>
    ${cards([['01','把想法变成空间','把主题中的入口、主要区域与交互对象，安排到具体的位置。'],['02','提前检查体验','在制作模型前，发现路线断裂、目标不清楚或节点被遮挡的问题。'],['03','为后续搭建提供依据','让区域、路线和节点有共同参照，后续资产与场景搭建围绕同一设计展开。']],'three')}
  `,'先解释它是一张组织空间关系的俯视设计图，再说明为什么在做模型和搭建场景前画。下一页用唤醒花园具体读图。'),
  s(4,'布局图里，需要标清什么？','以“唤醒花园”为例：让入口、节点、路线与完成位置相互对应。','plan-reading',`
    <div class="plan-reading-layout"><figure class="annotated-plan-wrap">${annotatedPlanSvg()}<figcaption><span><i class="legend-boundary"></i>空间边界</span><span><i class="legend-path"></i>可通行步道</span><span><i class="legend-node"></i>供水装置</span><span><i class="legend-focus"></i>主题焦点</span></figcaption></figure><div class="plan-reading-points">${[
      ['01','入口与第一眼','从南侧入口进入，先看见中央花坛，认识“唤醒花园”的主题。'],
      ['02','步道与交互节点','沿 A / B / C 步道自由探索，寻找并启动三个供水装置，顺序不限。'],
      ['03','完成位置与结果','全部启动后，回到中央花坛，观察花园恢复生机的变化。'],
      ['04','区域与空间限制','标清边界、植物区、阻挡、高差和图例。本例步道平坦、保持通畅。'],
    ].map(([n,t,p])=>`<article><span>${n}</span><div><h3>${t}</h3><p>${p}</p></div></article>`).join('')}</div></div>
  `,'先指入口和中央花坛，再沿步道分别走向左 A、右 B、后方 C，说明三个装置可以自由探索，不是必须按字母顺序完成。最后回到花坛检查结果。图中 A/B/C 的位置与后续布局步骤、概念图和三维花园一致。'),
  s(4,'一层一层，画出探索的路线','用“唤醒花园”示范布局的五个步骤。','layout-demo','', '从边界开始，依次加入入口与花坛、交互节点、主要路线，最后补充标注。可用步骤按钮来回对照。'),
  s(4,'让别人不听解释，也能走一遍','用手指模拟角色，从入口沿路线走一遍，检查体验是否成立。','plan-check',`
    ${cards([['01','目标值得注意','从入口能发现主题焦点。'],['02','节点能够到达','主要路线连接关键节点。'],['03','探索有线索','重要对象清楚、不被遮挡。'],['04','结果能够看见','完成后能观察到变化。']],'plan-check-points')}
    <div class="layout-problems"><figure class="problem-diagram">${annotatedPlanSvg({problems:true})}<figcaption>问题示意：入口受阻，装饰与核心节点争抢注意。</figcaption></figure><div class="problem-notes"><span class="eyebrow">常见问题 · 怎样修改</span><article><span>01</span><div><h3>入口道路被阻挡</h3><p>把装饰物移到道路两侧，<br>保留连续通行空间。</p></div></article><article><span>02</span><div><h3>所有物件都同样醒目</h3><p>突出核心节点，<br>减少沿路干扰。</p></div></article></div></div>
  `,'此页不安排单独的课堂任务。用有问题的花园图示说明两类常见问题：入口道路被阻挡，以及所有物件都同样醒目。请学生先用手指沿路线走，再说明如何修改。'),
  s(4,'实践：自己的空间布局图','带着自己的主题，画一张能走通的布局图。','plan-practice',`
    <div class="practice-brief"><span class="eyebrow">YOUR SPACE PLAN · 现在开始</span><h2>从入口出发，<br>让体验走得通。</h2><div class="practice-keywords">${[
      ['01','从哪里进入？','入口 · 第一眼'],
      ['02','怎样探索？','路线 · 交互节点'],
      ['03','如何完成？','反馈 · 观察位置'],
    ].map(([n,t,p])=>`<article><span>${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div><p class="practice-short-note">别忘了：边界、节点名称与图例。</p></div>
  `,'实践时只给关键提示，不再重复前面六项详细步骤。让学生围绕自己的主题画图，教师按需要个别提醒。'),
  s(5,'游戏视觉是什么','玩家在世界中看到的内容，共同构成这个世界的视觉表达。','visual-intro',`
    <blockquote class="visual-definition">玩家看到的<strong>场景、角色、物件</strong>，<br>以及<strong>色彩、光照与提示</strong>，<br>共同构成这个世界的视觉表达。</blockquote>
    ${cards([['01','场景与角色','建筑、环境、角色形象及相互之间的尺度。'],['02','道具与装置','体现主题的物件，以及能够操作的对象。'],['03','色彩、光照与提示','整体氛围，以及目标、路线和操作信息。']],'three')}
  `,'依据用户提供的游戏视觉 PPT 第一页，建立游戏视觉的三个主要组成部分。'),
  s(5,'优秀作品中的不同视觉选择','每个作品选择不同规则，但作品内部维持自己的视觉关系。','game-references',`
    <div class="game-triptych">${[
      [skyCampfire,'光·遇','柔和轮廓与光照氛围','光遇中围绕篝火的角色、发光植物和柔和蓝色环境'],
      [journeyBridge,'风之旅人','概括形体与有限色彩','风之旅人中暖色沙漠、概括的建筑和长桥'],
      [shortHike,'A Short Hike','简化几何与鲜明色块','A Short Hike 的林间小屋、角色和鲜明的秋日色块'],
    ].map(([img,t,p,alt])=>`<article>${photo(img,alt,'课件参考图 · 用户提供 PPT')}<h2>${t}</h2><p>${p}</p></article>`).join('')}</div>
    ${callout('观察作品内部的关系','角色、环境与物件，怎样遵守同一套视觉规则？')}
  `,'依据 PPT 第二页，用原 PPT 的三张游戏图片对照光遇、风之旅人与 A Short Hike。图片直接呈现，不提供游戏下载链接。'),
  s(5,'视觉解析：光·遇','观察：你先看见什么？角色有多大？哪些区域让你想继续前进？','sky-analysis','', '依据 PPT 第三页的飞行与浮岛截图，依次查看造型、光照、空间层次。三个按钮用于教师切换解析角度；只根据实际画面指出证据。'),
  s(5,'造型与材质怎样统一','','visual-materials',`
    <div class="visual-case-layout">${photo(skyMaterials,'光遇：简化角色与大片岩石形体，表面细节服从整体轮廓','《光·遇》· 用户提供 PPT 参考图')}<div class="visual-case-notes"><article><span>01 / 造型</span><h2>轮廓的概括程度</h2><p>角色、建筑、植被的细节<br>都服务于整体阅读。</p></article><article><span>02 / 材质</span><h2>表面的表达方式</h2><p>材质可以不同，<br>粗细与细节密度需要协调。</p></article></div></div>
  `,'依据 PPT 第四页，结合图中角色、岩壁和水面，说明轮廓概括与表面细节需要共同服务整体画面的阅读。'),
  s(5,'色彩与光照怎样组织氛围','','visual-lighting',`
    <div class="visual-case-layout">${photo(skyLighting,'光遇：蓝色环境中，暖色光亮突出角色和灯杖','《光·遇》· 用户提供 PPT 参考图')}<div class="visual-case-notes"><article><span>01 / 色彩</span><h2>有限的主要色彩</h2><p>环境保持共同基调，<br>局部暖色形成重点。</p></article><article><span>02 / 光照</span><h2>清楚的明暗关系</h2><p>亮部吸引注意，<br>背景帮助主体被看见。</p></article></div></div>
  `,'依据 PPT 第五页，观察蓝色环境、角色发光轮廓与灯杖的暖色光亮，说明共同基调和局部重点的关系。'),
  s(5,'视觉如何引导玩家行动','','visual-guidance',`
    <div class="visual-case-layout">${photo(skyGuidance,'光遇：光束连接中央装置与上方目标，角色靠近发光装置','《光·遇》· 用户提供 PPT 参考图')}<div class="visual-case-notes"><article><span>01</span><h2>先注意哪里</h2><p>亮度和位置形成视觉焦点。</p></article><article><span>02</span><h2>为什么靠近</h2><p>目标与空间路线建立联系，<br>吸引继续探索。</p></article></div></div>
    ${callout('课堂观察','光束是怎样吸引视线的？如果道路与目标方向相反，会发生什么？')}
  `,'依据 PPT 第六页，观察中央装置与光束怎样形成焦点，再讨论目标方向与道路方向的关系。不要仅凭单张截图推断具体操作规则。'),
  s(5,'视觉也在告诉玩家怎样行动','','visual-action',`
    ${cards([['01','发现目标','亮度、轮廓或位置使目标更容易被注意。'],['02','读懂反馈','操作前后出现可察觉的变化。'],['03','识别交互','同类装置使用相似形态与提示。'],['04','区分主次','背景安静一些，关键节点更突出。']],'four')}
    ${callout('想一想','去掉说明文字，玩家还能发现可以操作的对象吗？')}
  `,'按用户最新文字替换 PPT 最后一页。用目标、反馈、交互和主次收束游戏视觉部分，下一页接让自己的世界看起来像同一个世界。'),
  s(6,'让自己的世界，看起来像同一个世界','先制定规则，再选择和生成资产。','visual-rules',`
    ${cards([['01','造型语言','圆润还是棱角？简化还是细节丰富？'],['02','材质表达','不同物件的表面处理是否协调？'],['03','色彩与光照','有没有共同的主要色彩和光照氛围？'],['04','角色与场景','比例、细节程度与风格是否匹配？']],'four')}
    ${callout('视觉引导','同类交互装置采用相似的形态与提示；背景与重要对象形成主次；操作前后有可察觉的变化。')}
    ${task('确定你的视觉规则','三个风格关键词 + 主要颜色 + 光照氛围 + 最醒目的对象。')}
  `,'强调统一不是所有物件长得一样，而是它们遵守同一套造型、材质和色彩规则。'),
  s(6,'同一座花园，两种视觉方向','空间结构保持一致，让造型与色彩共同改变氛围。','style-demo','', '对比圆润和棱角的树木、环境主色与装置强调色。请学生说明改变了什么，哪些空间关系没有变。'),
  s(7,'概念场景图：确定世界的整体样貌','用造型、色彩、光照和空间层次，表达“它看起来是什么样子”。','concept-intro',`
    <div class="split"><div class="stack"><div class="feature-quote">它是空间样貌与氛围的设计依据，<br>也是后续资产制作与搭建的共同参照。</div>${rows([['视觉风格','整体造型、材质和细节程度。'],['色彩与光照','主要颜色、氛围和视觉重点。'],['核心区域','标志性物件与主要交互节点。'],['空间关系','前后层次、大小比例与可通行路径。']])}</div><div class="illustration">${garden({awake:true,labels:true})}<span class="source">唤醒花园 · 课堂概念示意</span></div></div>
  `,'概念图应帮助团队做设计决定，并不是生成一张与布局无关的漂亮图片。课堂 SVG 是示意，不冒充 AI 生图或游戏截图。'),
  s(7,'布局图与概念图，讲的是同一个世界','画法不同，入口、主要区域和节点应该一一对应。','concept-compare','', '依次指认南侧入口、中央花坛、左侧 A、右侧 B 和后方 C。可以使用对应项按钮，同时突出两张图上的同一对象。'),
  s(7,'案例如何作为参考','把看到的设计方法，转化为自己作品的设计选择。','case-reference',`
    <div class="case-reference-link"><div><span class="eyebrow">REFERENCE · 打开视野</span><h2>看优秀案例，也带着自己的问题。</h2></div><a class="button dark large" href="https://threejs.org/" target="_blank" rel="noopener noreferrer">浏览 Three.js 优秀案例 ↗</a></div>
    ${cards([['01','参考空间组织','观察场景范围、入口、焦点与路线，想一想自己的微型世界怎样安排。'],['02','参考视觉规则','观察造型、材质、色彩与光照，提炼适合自己主题的风格关键词。'],['03','参考行动与反馈','观察怎样发现目标、辨认操作对象，以及操作后出现了什么变化。'],['04','转化成自己的选择','挑选一种方法，说清它解决了什么问题，再结合自己的主题与布局调整。']],'four')}
    ${callout('记录参考','保留作品名称、作者或链接，并说明自己参考了哪种设计方法。')}
  `,'只保留 Three.js 网站入口，不再展开 Littlest Tokyo 或 Ocean 的具体案例。浏览时带着空间组织、视觉规则与交互反馈三个问题，最后转化成自己的设计选择，并记录参考来源。'),
  s(8,'生图前需要说明的内容','把已有的布局与视觉决定，说清楚。','prompt-preparation',`
    ${cards([['01','空间与视角','是什么地方，从哪里、以什么高度看。'],['02','区域与位置关系','入口、视觉焦点和交互对象分别在哪里。'],['03','视觉规则','造型、材质、主要色彩与光照。'],['04','范围与限制','道路可读、关键节点可辨认，避免增加无关大物件。']],'four')}
  `,'按用户提供的生图前说明图片组织四项内容：空间与视角、区域与位置关系、视觉规则、范围与限制。图片仅作为文字内容参考，沿用本课件绿色风格。'),
  s(8,'根据布局，组织清楚的生图需求','先说明空间关系，再加入视觉规则。','prompt-demo','', '逐个打开提示词信息层。强调左右、前后、入口视角等来自布局设计，不能完全交给生成工具随机决定。复制后可在你选定的外部生图工具演示。'),
  s(8,'生成以后，回到设计检查','概念图需要符合设计，而不是让布局追着随机图像改变。','concept-check',`
    ${cards([['01','节点完整','入口、中央花坛与三个装置有没有缺失？'],['02','关系正确','左右、前后与主要区域是否符合布局？'],['03','视觉统一','形体、材质、颜色与光照是否遵守规则？'],['04','行动清楚','道路是否可通行？对象有没有被遮挡？']],'four')}
    ${callout('指出具体问题，再修改','“保留整体风格，移开左侧植物，让供水装置和步道清楚可见。”同时检查是否多出大型建筑或不必要的物件。')}
  `,'要求每次修改有具体目标。注意排除多余大型物件，以及生成模型常见的道路断裂、装置数量不对等问题。'),
  s(9,'三项成果，描述同一个世界','把作品概述、布局图与概念场景图放在一起检查。','handoff',`
    ${cards([['01','一句话作品概述','说明体验者是谁、进入哪里、做什么、最后发生什么。'],['02','空间布局图','标清范围、入口、区域、路线、交互节点与结束位置。'],['03','概念场景图','表现统一的造型、色彩、光照和氛围，附简短说明与来源。']],'three deliverables')}
    <div class="question-band"><span>是否围绕同一个主题？</span><span>区域与节点是否对应？</span><span>是否已经能据此开始搭建？</span></div>
    ${callout('交接给庄老师','下一步进入资产生成、模型处理与平台搭建。保留原图，以及主要区域与交互说明。')}
  `,'让学生用图纸说明入口、行动和反馈。交接时不要只交漂亮图片，还要保留主题与空间设计依据。'),

];

export const layoutSteps = [['画出空间范围','确定花园边界，控制好微型世界的规模。'],['放置入口与视觉焦点','从入口能够看见中央花坛。'],['安排交互节点','把供水装置 A、B、C 放在左、右及后方。'],['连接主要路线','入口、花坛和各装置之间都可以通行。'],['补充标注与图例','节点名称、结束位置、边界、方向、阻挡与高差。']];
export const promptParts = [
  ['空间与视角','小型虚拟交互花园的场景概念图。从入口略高的位置看向中央花坛。'],
  ['位置关系','前景是入口和步道，供水装置分别位于花坛左侧、右侧和后方。'],
  ['视觉规则','圆润简化的风格化三维造型，以浅绿色为主，暖黄色强调供水装置，温暖日光。'],
  ['保留的内容','保留清楚的可通行路径，各装置能够辨认，主要区域关系不变，无文字标注。'],
];
