import './style.css';
import { slides, groups, images, layoutSteps, promptParts, courseTitle } from './slides.js';
import { garden } from './garden.js';
import { planSvg } from './diagrams.js';
import { createGarden } from './garden3d.js';

const app = document.querySelector('#app');
const iconPaths={cube:'<path d="m12 3 9 5v8l-9 5-9-5V8zM3 8l9 5 9-5M12 13v8"/>',screen:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',note:'<path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/>',arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>'};
const icon = name => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.cube}</svg>`;
let page=readHash(),presentation=false,world=null,fitObserver=null;
let demoMode=0,activePumps=new Set(),layoutStep=1,nightStyle=false,skyFocus=0,pairFocus='focus';
let promptLayers=new Set([0]);

function readHash(){
  const m=location.hash.match(/^#slide-(\d+)$/);
  if(m)return Math.max(0,Math.min(slides.length-1,Number(m[1])-1));
  const old=location.hash.match(/^#chapter-(\d+)$/);
  return old?Math.max(0,slides.findIndex(s=>s.group===Math.min(10,Number(old[1])))):0;
}
function render(){
  world?.dispose();world=null;fitObserver?.disconnect();
  const slide=slides[page];
  document.title=slide.kind==='home'?courseTitle:`${slide.title} · ${courseTitle}`;
  app.innerHTML=`<div class="app-shell ${presentation?'presenting':''}">
    <div class="mobile-shade" data-action="menu"></div>
    <aside class="sidebar" aria-label="课程目录"><a href="#slide-1" class="brand"><span>${icon('cube')}</span><div class="course-brand">hello world<small>WORLDMAKING LAB</small></div></a><div class="course-label">AI 首作 · 空间设计课堂</div><nav>${groups.map((g,i)=>{
      const first=slides.findIndex(s=>s.group===i),count=slides.filter(s=>s.group===i).length;
      return `<button class="nav-item ${slide.group===i?'active':''}" data-page="${first}" ${slide.group===i?'aria-current="page"':''}><span class="nav-num">${i===0?'⌂':String(i).padStart(2,'0')}</span><span>${g}</span>${slide.group===i?`<small>${count} 屏</small>`:''}</button>`;
    }).join('')}</nav><div class="sidebar-bottom"><p>让一个想法，生长成世界。</p><button class="text-button" data-action="help">演示工具与快捷键 <kbd>?</kbd></button><small>BLINK · TEACHING STUDIO</small></div></aside>
    <div class="main-shell"><header class="topbar"><div class="breadcrumb"><button class="icon-button menu-button" data-action="menu" aria-label="开关课程目录">${icon('menu')}</button><span>创作课堂</span><span>/</span><b>${groups[slide.group]}</b></div><div class="top-actions"><span class="teacher-tag"><i></i>教师演示</span><button class="icon-button" data-action="notes" title="讲课提示 (N)" aria-label="显示讲课提示">${icon('note')}</button><button class="button outline compact" data-action="present">${icon('screen')}<span>${presentation?'退出投屏':'投屏模式'}</span></button><button class="icon-button" data-action="fullscreen" aria-label="切换浏览器全屏" title="全屏 (F)">${icon('expand')}</button></div></header>
    <main id="main-content" class="stage-viewport" tabindex="-1"><article class="stage ${slide.kind==='home'?'home-stage':''}" data-slide="${page+1}">${slide.kind==='home'?home():`<header class="slide-heading"><div class="slide-kicker"><span>${String(slide.group).padStart(2,'0')} / ${groups[slide.group]}</span><span>WORLDMAKING · ${String(page+1).padStart(2,'0')}</span></div><h1>${slide.title}</h1><p>${slide.subtitle}</p></header><div class="slide-body ${slide.kind}">${slide.body}</div>`}</article></main>
    <footer class="page-footer"><span class="screen-number">${String(page+1).padStart(2,'0')}<span> / ${slides.length} 屏</span></span><div class="section-dots" aria-label="当前章节各屏">${slides.map((s,i)=>s.group===slide.group?`<button class="${i===page?'active':''}" data-page="${i}" aria-label="${s.title}" title="${s.title}" ${i===page?'aria-current="step"':''}></button>`:'').join('')}</div><div class="page-controls"><button class="button outline" data-page="${page-1}" ${page===0?'disabled':''}>← 上一屏</button><button class="button dark" data-page="${page===slides.length-1?0:page+1}">${page===0?'开始演示':page===slides.length-1?'返回总览':'下一屏'} ${icon('arrow')}</button></div></footer></div></div>
    <div id="toast" role="status" aria-live="polite"></div>
    <dialog id="notes-dialog"><button class="dialog-close" data-action="close-dialog" aria-label="关闭提示">×</button><span class="eyebrow">PRESENTER NOTES · 讲课提示</span><h2>${slide.title}</h2><p>${slide.notes}</p></dialog>
    <dialog id="help-dialog"><button class="dialog-close" data-action="close-dialog" aria-label="关闭说明">×</button><span class="eyebrow">PRESENTER TOOLS</span><h2>把注意力留给课堂</h2><div class="shortcut"><span>上 / 下一屏</span><span><kbd>←</kbd> <kbd>→</kbd></span></div><div class="shortcut"><span>投屏 / 全屏</span><span><kbd>P</kbd> <kbd>F</kbd></span></div><div class="shortcut"><span>讲课提示 / 目录</span><span><kbd>N</kbd> <kbd>M</kbd></span></div><div class="shortcut"><span>课程总览</span><kbd>Home</kbd></div><p>全部内容逐屏呈现，无需下滑。3D 演示使用鼠标拖动或场景下方按钮改变视角；按方向键继续翻页。</p><button class="button dark" data-action="print">打印整份讲义</button><p class="source">图像来源与许可说明见项目中的 src/assets/SOURCES.md。课件中的“图片”是本地素材，只有案例访问按钮需要联网。</p></dialog>`;
  if(slide.kind==='garden-demo'||slide.kind==='final-demo')renderGarden(slide.kind==='final-demo');
  if(slide.kind==='layout-demo')renderLayout();
  if(slide.kind==='style-demo')renderStyle();
  if(slide.kind==='sky-analysis')renderSky();
  if(slide.kind==='concept-compare')renderCompare();
  if(slide.kind==='prompt-demo')renderPrompt();
  fitObserver=new ResizeObserver(fitStage);fitObserver.observe(document.querySelector('.stage-viewport'));fitStage();
}
function home(){
  return `<div class="home-kicker"><span class="eyebrow">A SMALL WORLD, A BIG IDEA</span><span>虚拟交互空间设计</span></div><div class="home-hero"><div><span class="tag">hello world · 我的第一个虚拟交互世界</span><h1>从一个想法，<br>到一个<span>可以探索的世界。</span></h1><p>先理解空间，再为它确定主题。<br>用布局与视觉，把想象变成清楚的设计。</p><button class="button dark large" data-page="1">开启创作之旅 ${icon('arrow')}</button></div><div class="home-world">${garden({awake:true})}<span class="home-scene-label">FIG. 01　示例世界 · 唤醒花园</span></div></div>`;
}

function fitStage(){
  const viewport=document.querySelector('.stage-viewport'),stage=document.querySelector('.stage');
  if(!viewport||!stage)return;
  const scale=Math.min((viewport.clientWidth-16)/1440,(viewport.clientHeight-10)/810);
  stage.style.transform=`translate(-50%, -50%) scale(${Math.max(.1,scale)})`;
  stage.dataset.scale=scale.toFixed(4);
}
function renderGarden(final=false){
  const body=document.querySelector('.slide-body');
  if(final)demoMode=2;
  const lessonDemo=slides[page].kind==='garden-demo';
  body.innerHTML=`<div class="garden-presentation"><div class="garden-view"><div class="segmented" role="group" aria-label="花园体验模式">${['01 花园图片','02 三维漫游','03 虚拟交互'].map((t,i)=>`<button data-demo="${i}" class="${demoMode===i?'active':''}" aria-pressed="${demoMode===i}">${t}</button>`).join('')}</div><div id="garden-world" class="garden-world"></div><div class="world-toolbar"><span id="world-hint">${['只能观看固定画面','按住鼠标左右拖动，观察立体空间','拖动观察；点击场景中的供水装置'][demoMode]}</span><div><button class="button outline compact" data-rotate="-1" ${demoMode===0?'disabled':''} aria-label="向左观看花园">↶ 向左看</button><button class="button outline compact" data-rotate="1" ${demoMode===0?'disabled':''} aria-label="向右观看花园">向右看 ↷</button></div></div></div><aside class="garden-explanation"><span class="eyebrow">${['LOOK · 观看','EXPLORE · 探索','INTERACT · 改变'][demoMode]}</span><h2>${['看见一个地方','换个角度，<br>看清一个空间。',(lessonDemo?'改变观察位置，<br>改变对象与花坛。':'你的行动，<br>带来世界的回应。')][demoMode]}</h2><p>${['固定视角里，你能看见花园的样子；还不能改变位置或操作物件。','在真正的三维场景中左右转动视角。近处与远处的物件，会产生不同的遮挡关系。',(lessonDemo?'改变观察位置，并通过操作让对象和花坛发生变化。例如：启动供水装置，改变装置状态，让中央花坛恢复生机。':'寻找并点击 A、B、C 三个供水装置。全部启动后，中央花坛会恢复生机。')][demoMode]}</p><div class="experience-ladder"><span class="on">✓ 观看</span><span class="${demoMode>=1?'on':''}">${demoMode>=1?'✓':'—'} ${lessonDemo&&demoMode===2?'改变观察位置':'改变视角'}</span><span class="${demoMode===2?'on':''}">${demoMode===2?'✓':'—'} 操作与反馈</span></div><div class="garden-result" ${demoMode!==2?'hidden':''}><div class="pump-state" role="status"></div><button class="button outline" data-action="reset-garden">↺ 重新演示</button></div><p class="source">课堂示例 · 从观看到探索，再到交互。</p></aside></div>`;
  world?.dispose();
  world=createGarden(document.querySelector('#garden-world'),{mode:demoMode,active:activePumps,onActivate:set=>{activePumps=set;updateGardenStatus();}});
  updateGardenStatus();
}
function updateGardenStatus(){
  const el=document.querySelector('.pump-state');if(!el)return;
  el.innerHTML=`<span>${['A','B','C'].map(n=>`<i class="${activePumps.has(n)?'on':''}">${activePumps.has(n)?'✓':n}</i>`).join('')}</span><b>${activePumps.size===3?'花园苏醒了！':'等待供水 · '+activePumps.size+' / 3'}</b><p>${activePumps.size===3?'中央花坛长出明亮的花朵。':'点击装置，观察操作状态的变化。'}</p>`;
}
function renderLayout(){
  document.querySelector('.slide-body').innerHTML=`<div class="split layout-presentation"><div class="illustration plan">${planSvg(layoutStep)}</div><div class="stack"><span class="eyebrow">BUILD A PLAN · STEP ${layoutStep} / 5</span><div class="step-dots">${layoutSteps.map((_,i)=>`<button data-step="${i+1}" class="${layoutStep===i+1?'active':''}" aria-label="布局步骤 ${i+1}" aria-pressed="${layoutStep===i+1}">${i+1}</button>`).join('')}</div><h2>${layoutSteps[layoutStep-1][0]}</h2><p class="body-copy">${layoutSteps[layoutStep-1][1]}</p><div class="local-controls"><button class="button outline" data-step="${layoutStep-1}" ${layoutStep===1?'disabled':''}>← 上一步</button><button class="button dark" data-step="${layoutStep+1}" ${layoutStep===5?'disabled':''}>下一步 →</button></div><div class="mini-note">从关系到路线，再到标注。<br>所有关键位置，都为体验服务。</div></div></div>`;
}
function renderStyle(){
  document.querySelector('.slide-body').innerHTML=`<section class="style-presentation"><div class="segmented"><button class="${!nightStyle?'active':''}" data-style="light" aria-pressed="${!nightStyle}">☀ 明亮 · 圆润 · 轻松</button><button class="${nightStyle?'active':''}" data-style="night" aria-pressed="${nightStyle}">☾ 深邃 · 棱角 · 神秘</button></div><div class="style-scene ${nightStyle?'night':''}"><div class="illustration">${garden({awake:true,night:nightStyle})}</div><div><span class="eyebrow">SAME WORLD, DIFFERENT MOOD</span><h2>${nightStyle?'同一空间，<br>另一种情绪。':'让视觉，<br>成为共同的语言。'}</h2><p>${nightStyle?'棱角分明的树木、冷色环境、浅紫色装置。':'圆润简化的形体、浅绿色环境、暖黄色装置。'}</p><div class="swatches">${(nightStyle?['#394a60','#827698','#c6c4e7']:['#b8cba4','#f1d584','#f5ebcf']).map(c=>`<i style="background:${c}"></i>`).join('')}</div><p class="style-question">哪些变化改变了感受？<br>哪些线索帮助你识别同一个世界？</p></div></div></section>`;
}
const skyAnalyses=[
  ['造型','概括轮廓，让角色与世界相互呼应。','角色披风、山体与植被都使用简化的形体。看角色与岛屿的大小关系，也能感受这个世界的尺度。'],
  ['光照','柔和明暗，让空间轻盈、开阔。','受光的山体与云层较明亮，背光处保留层次。明暗关系既建立氛围，也帮助我们看清地形。'],
  ['空间层次','前景、中景与远景，形成探索的深度。','近处是正在飞行的角色，中间是可以靠近的主岛，远处是被云层围绕的浮岛。前后层次让人想继续前进。'],
];
function renderSky(){
  const [name,title,text]=skyAnalyses[skyFocus];
  document.querySelector('.slide-body').innerHTML=`<div class="sky-presentation"><div class="sky-picture"><div class="sky-image-wrap"><img src="${images.skyIslands}" alt="光遇：前景飞行角色、中景山体与远处浮岛，来自参考 PPT">${skyFocus===0?'<span class="focus-ring" style="left:48%;top:62%"><b>角色与环境的形体</b></span>':skyFocus===1?'<span class="focus-ring" style="left:71%;top:30%"><b>山体受光面</b></span>':'<span class="depth-label near">前景 · 角色</span><span class="depth-label middle">中景 · 主岛</span><span class="depth-label far">远景 · 浮岛</span>'}</div><p class="source">《光·遇》· 用户提供 PPT 参考图</p></div><aside><div class="analysis-tabs" role="group" aria-label="光遇视觉解析角度">${skyAnalyses.map(([n],i)=>`<button data-sky-focus="${i}" class="${skyFocus===i?'active':''}" aria-pressed="${skyFocus===i}">0${i+1}　${n}</button>`).join('')}</div><span class="eyebrow">${name} · VISUAL ANALYSIS</span><h2>${title}</h2><p>${text}</p></aside></div>`;
}
const pairPositions={entrance:[[50,87],[50,79]],focus:[[50,52],[50,45]],A:[[24,52],[23,39]],B:[[76,52],[78,39]],C:[[50,23],[50,21]]};
function conceptArtwork(focus=null){
  const names={entrance:'入口',focus:'中央花坛',A:'装置 A',B:'装置 B',C:'装置 C'};
  const position=focus?pairPositions[focus][1]:null;
  const x=position?.[0]*1536/100,y=position?.[1]*1024/100;
  return `<svg class="concept-artwork" viewBox="0 0 1536 1024" role="img" aria-label="唤醒花园概念场景图：入口、中央花坛、左右和后方的三个供水装置，以及清楚的步道、植物和日光"><image href="${images.gardenConcept}" width="1536" height="1024"/>${focus?`<g data-pair-marker="${focus}"><circle cx="${x}" cy="${y}" r="${focus==='focus'?90:65}" fill="#efd881" fill-opacity=".08" stroke="#ffffed" stroke-width="7"/><circle cx="${x}" cy="${y}" r="${focus==='focus'?90:65}" fill="none" stroke="#9b7d35" stroke-width="3"/><rect x="${x-78}" y="${y+76}" width="156" height="42" rx="12" fill="#f5f8ef" fill-opacity=".95"/><text x="${x}" y="${y+105}" text-anchor="middle" fill="#365941" font-size="27" font-family="sans-serif">${names[focus]}</text></g>`:''}</svg>`;
}
function renderCompare(){
  const names={entrance:'入口',focus:'中央花坛',A:'装置 A',B:'装置 B',C:'装置 C'},positions=pairPositions[pairFocus];
  const marked=(svg,xy,w,h)=>svg.replace('</svg>',`<circle data-pair-marker="${pairFocus}" cx="${xy[0]*w/100}" cy="${xy[1]*h/100}" r="25" fill="#efd881" fill-opacity=".16" stroke="#b99138" stroke-width="3"/></svg>`);
  document.querySelector('.slide-body').innerHTML=`<div class="correspondence-buttons" role="group" aria-label="对应布局图与概念图">${Object.entries(names).map(([id,t])=>`<button class="${id===pairFocus?'active':''}" data-pair="${id}" aria-pressed="${id===pairFocus}">${t}</button>`).join('')}</div><div class="comparison"><div><span class="eyebrow">PLAN · 位置、连接、路线与节点</span><div class="paired-art">${marked(planSvg(5),positions[0],560,370)}</div><p>空间布局图：放在哪里，怎样过去？</p></div><div class="concept-panel"><span class="eyebrow">CONCEPT · 造型、色彩、光照与氛围</span><div class="paired-art">${conceptArtwork(pairFocus)}</div><p>概念场景图：长什么样，是什么感受？</p></div></div><p class="source">当前对应：${names[pairFocus]}。入口、中央花坛与三个装置相互对应，两张图描述同一个世界。</p>`;
}
function renderPrompt(){
  document.querySelector('.slide-body').innerHTML=`<div class="prompt-layout"><div class="prompt-instructions"><span class="eyebrow">DESIGN → PROMPT</span><h2>不是只说“画一个花园”，<br>而是把设计说清楚。</h2><div class="prompt-layers" role="group" aria-label="提示词信息层">${promptParts.map(([t],i)=>`<button class="${promptLayers.has(i)?'active':''}" data-layer="${i}" aria-pressed="${promptLayers.has(i)}"><span>0${i+1}</span>${t}<b>${promptLayers.has(i)?'✓':'+'}</b></button>`).join('')}</div><p class="source">点击信息层，逐步完善提示词。<br>本课件不直接调用 AI 生图服务。</p></div><div class="prompt-panel"><span class="eyebrow">PROMPT PREVIEW</span><div class="prompt-preview" role="status">${promptParts.map(([,t],i)=>promptLayers.has(i)?`<p class="layer-${i}">${t}</p>`:'').join('')||'<p class="empty-prompt">请打开左侧的信息层。</p>'}</div><button class="button dark" data-action="copy-prompt" ${promptLayers.size?'':'disabled'}>复制当前提示词 ↗</button></div></div>`;
}
function navigate(id){
  const next=Math.max(0,Math.min(slides.length-1,id));page=next;
  location.hash=`slide-${page+1}`;render();document.querySelector('#main-content').focus({preventScroll:true});
}
function togglePresent(){
  presentation=!presentation;document.querySelector('.app-shell').classList.toggle('presenting',presentation);
  document.querySelector('[data-action="present"] span').textContent=presentation?'退出投屏':'投屏模式';fitStage();
}
function toggleMenu(){if(innerWidth>760)togglePresent();else document.querySelector('.app-shell').classList.toggle('menu-open');}
async function toggleFullscreen(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen();}catch{toast('请使用浏览器菜单中的全屏功能。');}}
let toastTimer;
function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3000);}
function printHandout(){
  document.querySelectorAll('dialog[open]').forEach(d=>d.close());
  let print=document.querySelector('#print-handout');if(!print){print=document.createElement('div');print.id='print-handout';document.body.append(print);}
  print.innerHTML=slides.map((s,i)=>`<section class="print-slide"><small>${courseTitle} · ${String(i+1).padStart(2,'0')} / ${slides.length}</small><h1>${s.title}</h1><p>${s.subtitle}</p>${s.body||printDemo(s.kind)}<aside class="print-notes">讲课提示：${s.notes}</aside></section>`).join('');window.print();
}
function printDemo(kind){
  if(kind==='home')return garden({awake:true});
  if(kind==='layout-demo')return planSvg(5)+layoutSteps.map(([t,p],i)=>`<p>${i+1}. ${t}：${p}</p>`).join('');
  if(kind==='sky-analysis')return `<img src="${images.skyIslands}" alt="光遇：角色与浮岛">`+skyAnalyses.map(([t,h,p])=>`<p><b>${t}：${h}</b>${p}</p>`).join('');
  if(kind==='prompt-demo')return promptParts.map(([t,p])=>`<p><b>${t}</b>：${p}</p>`).join('');
  if(kind==='concept-compare')return planSvg(5)+conceptArtwork();
  if(kind==='style-demo')return garden({awake:true})+garden({awake:true,night:true});
  return garden({awake:true,labels:true})+'<p>网页版可拖动真实 3D 花园，并点击供水装置观察反馈。</p>';
}
app.addEventListener('click',async e=>{
  const pageButton=e.target.closest('[data-page]');if(pageButton&&!pageButton.disabled){navigate(Number(pageButton.dataset.page));return;}
  const mode=e.target.closest('[data-demo]');if(mode){demoMode=Number(mode.dataset.demo);renderGarden();return;}
  const rotate=e.target.closest('[data-rotate]');if(rotate&&!rotate.disabled){world?.rotate(Number(rotate.dataset.rotate)*.28);return;}
  const step=e.target.closest('[data-step]');if(step&&!step.disabled){layoutStep=Math.max(1,Math.min(5,Number(step.dataset.step)));renderLayout();return;}
  const style=e.target.closest('[data-style]');if(style){nightStyle=style.dataset.style==='night';renderStyle();return;}
  const focus=e.target.closest('[data-sky-focus]');if(focus){skyFocus=Number(focus.dataset.skyFocus);renderSky();return;}
  const pair=e.target.closest('[data-pair]');if(pair){pairFocus=pair.dataset.pair;renderCompare();return;}
  const layer=e.target.closest('[data-layer]');if(layer){const id=Number(layer.dataset.layer);promptLayers.has(id)?promptLayers.delete(id):promptLayers.add(id);renderPrompt();return;}
  const button=e.target.closest('[data-action]'),action=button?.dataset.action;
  if(action==='present')togglePresent();
  if(action==='fullscreen')await toggleFullscreen();
  if(action==='notes')document.querySelector('#notes-dialog').showModal();
  if(action==='help')document.querySelector('#help-dialog').showModal();
  if(action==='close-dialog')button.closest('dialog').close();
  if(action==='menu')toggleMenu();
  if(action==='reset-garden')world?.reset();
  if(action==='copy-prompt'){
    const text=promptParts.filter((_,i)=>promptLayers.has(i)).map(([,t])=>t).join('');
    try{await navigator.clipboard.writeText(text);button.textContent='✓ 已复制';toast('提示词已复制，可粘贴到你的生图工具。');}
    catch{toast('浏览器不允许复制，请选中右侧文字后手动复制。');}
  }
  if(action==='print')printHandout();
});
window.addEventListener('hashchange',()=>{const next=readHash();if(next!==page){page=next;render();}});
document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey||e.target.matches('input,textarea,select,[contenteditable="true"]'))return;
  if(document.querySelector('dialog[open]'))return;
  if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();navigate(page+1);}
  if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();navigate(page-1);}
  if(e.key==='Home'){e.preventDefault();navigate(0);}
  if(e.key.toLowerCase()==='p')togglePresent();
  if(e.key.toLowerCase()==='f'){e.preventDefault();toggleFullscreen();}
  if(e.key.toLowerCase()==='n')document.querySelector('#notes-dialog').showModal();
  if(e.key.toLowerCase()==='m')toggleMenu();
  if(e.key==='?')document.querySelector('#help-dialog').showModal();
  if(e.key==='Escape'){const shell=document.querySelector('.app-shell');if(shell.classList.contains('menu-open'))shell.classList.remove('menu-open');else if(presentation)togglePresent();}
});
render();
