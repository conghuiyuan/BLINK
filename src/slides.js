import { garden } from './garden.js';
import { planSvg } from './diagrams.js';
import bruno from './assets/bruno-2025.png';
import skyDay from './assets/sky-day.webp';
import skyNight from './assets/sky-night.webp';
import veloren from './assets/veloren.jpg';
import velorenForest from './assets/veloren-extra.jpg';
import tokyo from './assets/littlest-tokyo.jpg';
import ocean from './assets/three-ocean.jpg';
import useExplore from './assets/use-explore.svg';
import useExhibition from './assets/use-exhibition.svg';
import useLearning from './assets/use-learning.svg';
import useEmotion from './assets/use-emotion.svg';

export const courseTitle = 'hello world-我的第一个虚拟交互世界';
export const images = { bruno, skyDay, skyNight, veloren, velorenForest, tokyo, ocean };
export const groups = ['课程总览','认识交互空间','观看空间案例','确定作品主题','画清空间布局','认识游戏视觉','建立视觉规则','理解概念场景图','生成与修改概念图','成果检查与交接','走向实现'];
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
  s(0,'项目最终形成什么','','overview-outcomes',`
    <div class="project-outcomes">${[
      ['01','可以体验的虚拟交互作品','能够进入和探索，包含明确的核心操作与结果反馈。'],
      ['02','能解释设计的策划材料','说明主题、空间、视觉、交互与AI协作过程。'],
      ['03','让别人理解作品的展示材料','用画面、演示或创作说明介绍体验。'],
    ].map(([n,t,p],i)=>`<article class="project-outcome"><div class="outcome-top"><span>${n}</span><span>${['体验作品','策划材料','展示材料'][i]}</span></div><div class="outcome-preview">${i===0?garden({awake:true}):i===1?planSvg(5):`<div class="showcase-preview"><div class="showcase-screen">${garden({awake:true})}<span>作品演示</span></div><div class="showcase-lines"><i></i><i></i><i></i></div><span>画面 · 演示 · 创作说明</span></div>`}</div><h2>${t}</h2><p>${p}</p><div class="outcome-tags">${['进入 · 探索 · 操作 · 反馈','主题 · 空间 · 视觉 · AI 协作','看见作品 · 理解体验'][i]}</div></article>`).join('')}</div>
  `,'区分整个项目最终形成的可体验作品、策划材料和展示材料。这是整个项目的成果，不只是本次设计阶段的图纸。'),
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
    <div class="bruno-reading"><div class="bruno-evidence"><figure class="bruno-overview"><img src="${bruno}" alt="Bruno Simon 官方场景预览"><figcaption>先看整体：道路、地标与可接近的物件</figcaption></figure><div class="bruno-details"><figure><div class="bruno-crop bridge"><img src="${bruno}" alt="同一预览图局部：木桥与道路"></div><figcaption>道路把视线引向另一处空间</figcaption></figure><figure><div class="bruno-crop lamp"><img src="${bruno}" alt="同一预览图局部：发光灯柱"></div><figcaption>明亮物件形成视觉提示</figcaption></figure></div><p class="source">整体与局部均来自同一官方预览图。<br>入口教学、信息区域和操作反馈，结合原站演示观察。</p></div><div class="bruno-points">${[
      ['入口怎样教会你操作','最开始看见什么，怎样知道可以驾驶和交互。'],
      ['空间怎样组织信息','原来的个人介绍、作品和联系信息放在哪里。'],
      ['视觉怎样提示去向','道路、标识、地标和物件怎样吸引你靠近。'],
      ['操作怎样带来反馈','碰到物件、进入区域或触发操作时，有什么变化。'],
    ].map(([t,p],i)=>`<article><span>0${i+1}</span><div><h2>${t}</h2><p>${p}</p></div></article>`).join('')}<div class="bruno-takeaway">把内容安排成地点，让行动带来可感知的回应。</div></div></div>
  `,'先用图片分析道路与灯光，再打开作品，依次观察入口教学、信息组织、视觉去向和操作反馈。局部图片为同一预览图的裁切，不是不同区域的截图。'),
  s(3,'先给世界一个清楚的主题','','theme',`
    <div class="theme-statement"><span class="eyebrow">一句话作品概述</span><div class="sentence">体验者作为<span class="sentence-blank"><em>________</em><small>身份</small></span>，进入<span class="sentence-blank"><em>________</em><small>空间</small></span>，<br>通过<span class="sentence-blank"><em>________</em><small>核心行动</small></span>，最终<span class="sentence-blank"><em>________</em><small>结果反馈</small></span>。</div><p class="sentence-purpose">用一句话说清作品的核心体验，让布局、视觉与交互围绕同一个目标展开。</p></div>
    ${cards([['01','清楚的主题','别人能说出，这个世界在讲什么。'],['02','可以探索的空间','区域之间有连接，有值得去的地方。'],['03','至少一条完整交互','能完成一次“行动 → 变化 → 结果”的体验。']],'three')}
    ${task('写出一句话作品概述','先填清身份、空间、行动和结果，再给作品取名。')}
  `,'帮助学生缩小范围。“创造一个奇幻王国”太大，可以改成“修复一座失去光亮的小灯塔”。'),
  s(3,'贯穿课堂的示例：唤醒花园','从主题出发，让身份、行动与反馈相互支持。','garden-theme',`
    <div class="split"><div class="illustration">${garden({awake:true})}</div><div class="stack"><p class="feature-quote">体验者作为温室修复者，进入缺水的花园，通过寻找并启动三个供水装置，使中央花坛恢复生机。</p>${rows([['空间情境','缺水的花园'],['体验者身份','温室修复者'],['核心行动','寻找并启动三个供水装置'],['结果反馈','中央花坛恢复生机'],['预期感受','探索的好奇、完成修复的成就感']])}</div></div>
  `,'追问：花园为什么需要被修复？玩家凭什么知道完成了？把抽象感受落实为可见的场景变化。'),
  s(4,'空间布局图：先把关系画清楚','从上方组织空间，说明区域在哪里、怎样连接、怎样探索。','plan-intro',`
    <div class="split"><div class="stack">${rows([['入口','从哪里进入？'],['视觉焦点','进入后先看见什么？'],['主要路线','往哪里走？'],['交互节点','在哪里停留和操作？'],['结束位置','最后在哪里观察结果？']])}${callout('画清楚，比画漂亮更重要','可以手绘，也可以用 PPT 形状或绘图软件。')}</div><div class="illustration plan">${planSvg(5)}<span class="source">唤醒花园 · 俯视布局示意</span></div></div>
  `,'让学生先指出入口，再用手指走到各装置，最后回到花坛。这里不要求精细透视与材质。'),
  s(4,'一层一层，画出探索的路线','用“唤醒花园”示范布局的五个步骤。','layout-demo','', '从边界开始，依次加入入口与花坛、交互节点、主要路线，最后补充标注。可用步骤按钮来回对照。'),
  s(4,'让别人不听解释，也能走一遍','检查的不是图有多漂亮，而是体验能不能成立。','plan-check',`
    ${cards([['01','目标值得注意','进入空间时，能发现一个视觉目标。'],['02','节点能够到达','主要路线连接关键节点，操作位置留有空间。'],['03','探索有线索','重要对象不被遮挡，自由探索也有引导。'],['04','结果能够看见','完成操作以后，体验者能观察到变化。']],'four')}
    ${task('完成布局图，请同桌模拟角色走一遍','不听作者解释，能不能看懂从哪里进入、去哪里、做什么？')}
  `,'实践时重点巡视路线断裂、入口不清楚、交互对象被遮挡三类问题。根据同桌反馈调整布局。'),
  s(5,'游戏视觉：既表达世界，也帮助行动','场景、角色、物件、色彩、光照与提示，共同构成视觉表达。','visual-intro',`
    <div class="visual-elements">${[['场景','建筑、地形、植物与空间'],['角色','形象、比例与环境关系'],['道具与装置','体现主题，也说明可操作性'],['色彩与光照','氛围、明暗与视觉重点'],['提示与标识','路线、目标与操作提示']].map(([a,b],i)=>`<article><span>0${i+1}</span><h3>${a}</h3><p>${b}</p></article>`).join('')}</div>
    <div class="two-image-strip">${photo(skyDay,'光遇：云海、山峰与明亮天空','《光·遇》· 柔和空间与光照')}${photo(veloren,'Veloren：体素森林、湖面与夕阳','Veloren · 体素造型与环境色彩')}</div>
  `,'先让学生在实际作品中指认视觉元素。下面选光遇做具体分析，而不是在这一页进入游戏下载流程。'),
  s(5,'优秀游戏参考：不同造型，同样统一','观察整体规则，而不是只看某个漂亮物件。','game-references',`
    <div class="reference-pair"><article>${photo(skyDay,'光遇中的明亮云海和山峰','《光·遇》· thatgamecompany；截图来源 Sky Shards 社区')}<h2>光·遇</h2><p>柔和轮廓、大片留白与明亮焦点。<br>感受：轻盈、开阔、向往。</p></article><article>${photo(velorenForest,'Veloren 的体素树木和森林空间','Veloren · 官方仓库游戏背景图片')}<h2>Veloren</h2><p>角色与环境共享体素造型语言。<br>感受：可探索、层次丰富、自然生长。</p></article></div>
    ${callout('接下来，具体解析《光·遇》','从色彩、光照、尺度和视觉引导四个角度，读懂一个场景。')}
  `,'两个案例用于对照视觉语言。Veloren 图片来自官方项目仓库的背景图，不把它称为概念设计稿。'),
  s(5,'解析《光·遇》：让视觉带着人去探索','看见一个场景，也看懂它怎样影响你的感受与行动。','sky-analysis','', '点击四个解析角度，在日景与夜景之间切换。引导学生指出实际画面证据，不只说“好看”。图片在课件中直接展示，不需要下载游戏。'),
  s(5,'同一个视觉目标，可以有不同的氛围','亮点、轮廓与明暗关系，让远处的目标依然可见。','sky-comparison',`
    <div class="reference-pair short-captions">${photo(skyDay,'光遇日景：蓝色天空、白色云海和山顶光亮','日景：大面积蓝白，空间开阔，山顶亮点吸引视线。')}${photo(skyNight,'光遇夜景：深蓝天空、星光和明亮山顶','夜景：深蓝紫色，明暗反差加强，目标依然醒目。')}</div>
    ${cards([['色彩','建立整体情绪','变化的是氛围，共同的是视觉秩序。'],['光照','突出重要对象','通过明暗反差，让目标容易被发现。'],['尺度','建立空间感受','云层与山体形成前后层次和远近关系。']],'three compact')}
    <p class="source">游戏：thatgamecompany《光·遇》；图片来源：Sky Shards 社区背景图。</p>
  `,'这两张图不包含可辨认的近景角色，不据此分析角色细节。用云层、山体、明暗关系说明空间氛围与目标。'),
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
  s(7,'从 three.js 案例，观察场景设计','先读懂已经实现的画面，再反推自己的概念图需要说明什么。','three-references',`
    <div class="reference-pair three-ref"><article>${photo(tokyo,'Littlest Tokyo：微缩街区、屋顶招财猫、街道与电车','three.js · webgl_animation_keyframes；模型 Glen Fox')}<h2>Littlest Tokyo</h2><p>微缩街区，用明确边界控制规模；建筑、招牌和交通物件形成统一细节语言。</p><span class="tag">观察：范围 · 标志物 · 尺度</span></article><article>${photo(ocean,'three.js 海面示例：水面、天空与远处地平线','three.js · webgl_shaders_ocean')}<h2>Ocean / Sky</h2><p>通过水面、天空与光照，建立一个连贯的环境氛围。视觉并不只靠复杂模型。</p><span class="tag">观察：色彩 · 光照 · 氛围</span></article></div>
    ${callout('注意图像的用途','这里展示的是已实现的 three.js 案例截图，作为概念设计的观察参考，不是原作者的概念设计稿。')}
  `,'说明 three.js 是网页三维技术与案例平台。选择案例里的设计规律，避免让学生误认为要复制同等复杂的成品。'),
  s(7,'把优秀案例，转化成自己的设计问题','拿走设计方法，不把完整案例当成自己的设计。','three-reading',`
    <div class="split"><div class="reference-large">${photo(tokyo,'Littlest Tokyo 的建筑、屋顶标志物、街道和电车','案例：Littlest Tokyo · three.js；模型：Glen Fox')}</div><div class="stack">${rows([['看边界','微型场景到哪里结束？如何控制资产数量？'],['看焦点','第一眼注意到什么？为什么它比背景更醒目？'],['看层次','前景、中景、后景怎样形成空间感？'],['看统一','不同物件怎样共享比例、材质与色彩规则？']])}<a class="button outline" href="https://threejs.org/examples/#webgl_animation_keyframes" target="_blank" rel="noopener noreferrer">查看 three.js 原始案例 ↗</a></div></div>
  `,'这一页可以在课件中直接讲，也可以视网络情况打开原始 three.js 案例。Littlest Tokyo 模型作者为 Glen Fox。'),
  s(8,'根据布局，组织清楚的生图需求','先说明空间关系，再加入视觉规则。','prompt-demo','', '逐个打开提示词信息层。强调左右、前后、入口视角等来自布局设计，不能完全交给生成工具随机决定。复制后可在你选定的外部生图工具演示。'),
  s(8,'生成以后，回到设计检查','概念图需要符合设计，而不是让布局追着随机图像改变。','concept-check',`
    ${cards([['01','节点完整','入口、中央花坛与三个装置有没有缺失？'],['02','关系正确','左右、前后与主要区域是否符合布局？'],['03','视觉统一','形体、材质、颜色与光照是否遵守规则？'],['04','行动清楚','道路是否可通行？对象有没有被遮挡？']],'four')}
    ${callout('指出具体问题，再修改','“保留整体风格，移开左侧植物，让供水装置和步道清楚可见。”同时检查是否多出大型建筑或不必要的物件。')}
    ${task('生成、选择并修改一张概念图','补上主要区域和节点标注，记录工具或参考来源。')}
  `,'要求每次修改有具体目标。注意排除多余大型物件，以及生成模型常见的道路断裂、装置数量不对等问题。'),
  s(9,'三项成果，描述同一个世界','把作品概述、布局图与概念场景图放在一起检查。','handoff',`
    ${cards([['01','一句话作品概述','说明体验者是谁、进入哪里、做什么、最后发生什么。'],['02','空间布局图','标清范围、入口、区域、路线、交互节点与结束位置。'],['03','概念场景图','表现统一的造型、色彩、光照和氛围，附简短说明与来源。']],'three deliverables')}
    <div class="question-band"><span>是否围绕同一个主题？</span><span>区域与节点是否对应？</span><span>是否已经能据此开始搭建？</span></div>
    ${callout('交接给庄老师','下一步进入资产生成、模型处理与平台搭建。保留原图，以及主要区域与交互说明。')}
  `,'让学生用图纸说明入口、行动和反馈。交接时不要只交漂亮图片，还要保留主题与空间设计依据。'),
  s(10,'设计之后，走向实现','这部分由庄老师继续带领：把蓝图变成可以运行的空间。','implementation',`
    <div class="implementation-flow">${[['01','资产制作','根据布局与概念图，拆出建筑、植物、道具、角色。'],['02','模型处理','检查比例、材质、命名与模型复杂度。'],['03','场景搭建','还原空间关系，放置资产、相机与光照。'],['04','交互实现','连接触发条件、操作行为与结果反馈。'],['05','体验测试','检查通行、遮挡、操作与完成状态。']].map(([n,t,p])=>`<article><span>${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div>
    ${callout('我们今天的设计，为实现提供依据','布局图决定“放在哪里”，概念图决定“长什么样”，作品概述决定“做什么、发生什么”。')}
    <p class="source">具体制作工具与搭建方案，按庄老师后续课程安排推进。</p>
  `,'只交代完整创作链路，不在本部分展开模型处理或编程细节。强调今天的三项成果怎样服务后续实现。'),
  s(10,'最后，让世界真正回应一次行动','从一个想法，到一个可以观看、探索、改变的小世界。','final-demo','', '用同一个花园的可运行三维演示收束课堂。点击装置，指出触发、状态与反馈，再回到三项设计成果的价值。'),
];

export const layoutSteps = [['画出空间范围','确定花园边界，控制好微型世界的规模。'],['放置入口与视觉焦点','从入口能够看见中央花坛。'],['安排交互节点','把供水装置 A、B、C 放在左、右及后方。'],['连接主要路线','入口、花坛和各装置之间都可以通行。'],['补充标注与图例','节点名称、结束位置、边界、方向、阻挡与高差。']];
export const promptParts = [
  ['空间与视角','小型虚拟交互花园的场景概念图。从入口略高的位置看向中央花坛。'],
  ['位置关系','前景是入口和步道，供水装置分别位于花坛左侧、右侧和后方。'],
  ['视觉规则','圆润简化的风格化三维造型，以浅绿色为主，暖黄色强调供水装置，温暖日光。'],
  ['保留的内容','保留清楚的可通行路径，各装置能够辨认，主要区域关系不变，无文字标注。'],
];
