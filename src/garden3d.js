import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/** One shared 3D world: the three presentation modes change abilities, not scenery. */
export function createGarden(host, { mode = 0, active = new Set(), onActivate = () => {} } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    host.innerHTML = '<div class="webgl-fallback"><h3>请开启浏览器硬件加速</h3><p>本演示需要 WebGL 2。请在支持 WebGL 的 Chrome、Edge 或 Safari 中打开。</p></div>';
    host.dataset.webgl = 'unavailable';
    return { dispose() {}, setMode() {}, reset() {}, rotate() {} };
  }
  host.dataset.webgl = 'ready';
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0xf0f3e5, 0);
  renderer.domElement.setAttribute('aria-label', '真实三维花园，可拖动左右观看；交互模式可点击供水装置');
  renderer.domElement.setAttribute('role', 'img');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, .1, 100);
  camera.position.set(13, 13, 19);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, .3, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.minPolarAngle = .45;
  controls.maxPolarAngle = 1.27;
  controls.rotateSpeed = .65;
  controls.update();
  scene.add(new THREE.HemisphereLight(0xfffbe7, 0x889876, 2.6));
  const sun = new THREE.DirectionalLight(0xffecc7, 3.1);
  sun.position.set(-8, 16, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13 });
  sun.shadow.normalBias = .05;
  scene.add(sun);
  const material = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: .88, ...extra });
  const mats = { grass: material(0xb6ca91), edge: material(0x8ca174), path: material(0xeae0bf), bark: material(0x8f7959), leaf: material(0x7aa876), leafLight: material(0xa0be86), stone: material(0xd8d8ba), soil: material(0x9e946c), pump: material(0xe8b955), pipe: material(0x638573) };
  function mesh(geo, mat, x, y, z, parent = scene) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);m.castShadow = true;m.receiveShadow = true;parent.add(m);return m;
  }
  function box(x, y, z, w, h, d, mat, parent) { return mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent); }
  box(0, -.65, 0, 16, 1.1, 15, mats.edge);
  box(0, -.06, 0, 16.05, .13, 15.05, mats.grass);
  box(0, .04, 3.5, 1.55, .08, 7.2, mats.path);
  box(0, .04, -2.3, 1.4, .08, 4.7, mats.path);
  box(0, .045, 0, 11, .08, 1.4, mats.path);
  box(0, .16, 0, 3.7, .32, 3.7, mats.stone);
  const soil = box(0, .34, 0, 3.25, .1, 3.25, mats.soil);
  for (const [x,z,s] of [[-6,-4,1.1],[-6.5,3.7,.8],[6,-4,1.2],[6.5,3.5,.8],[-3,-5.8,.7],[3,-5.8,.75]]) {
    mesh(new THREE.CylinderGeometry(.12,.18,1.5,8), mats.bark, x, .75*s, z).scale.set(s,s,s);
    mesh(new THREE.SphereGeometry(1,12,10), mats.leaf, x, 2.2*s, z).scale.set(.95*s,1.4*s,.95*s);
    mesh(new THREE.SphereGeometry(.8,12,10), mats.leafLight, x-.25*s, 2.7*s, z+.1).scale.set(s,1.1*s,s);
  }
  for (const [x,z] of [[-6,5],[5,5],[-5,-6],[5,-6]]) mesh(new THREE.SphereGeometry(.7,10,8), mats.leafLight, x,.3,z).scale.y=.6;
  // A visible entrance and two posts establish the same orientation as the plan.
  box(-1.15,1.1,6.5,.18,2.2,.18,mats.bark);box(1.15,1.1,6.5,.18,2.2,.18,mats.bark);
  box(0,2.2,6.5,2.65,.18,.27,mats.pipe);
  const flowers = [];
  for (let i=0;i<9;i++) {
    const x=(i%3-1)*.83,z=(Math.floor(i/3)-1)*.83;
    const g=new THREE.Group();g.position.set(x,.4,z);scene.add(g);
    mesh(new THREE.CylinderGeometry(.035,.035,.55,5), material(0x7f9b5d),0,.27,0,g);
    const petals=mesh(new THREE.SphereGeometry(.19,9,7),material(0xf2c66f),0,.61,0,g);
    petals.scale.y=.65;
    g.scale.setScalar(.4);flowers.push(g);
  }
  const pumps = new Map(), pickables = [], positions = [['A',-5,0],['B',5,0],['C',0,-4.8]];
  const overlay=document.createElement('div');overlay.className='scene-labels';host.append(overlay);
  for (const [id,x,z] of positions) {
    const group=new THREE.Group();group.position.set(x,0,z);group.userData.pump=id;scene.add(group);
    const pumpMat=mats.pump.clone();
    box(0,.42,0,.95,.8,.85,pumpMat,group);
    mesh(new THREE.CylinderGeometry(.085,.085,1,8),mats.pipe,0,1.23,0,group);
    const arm=mesh(new THREE.CylinderGeometry(.085,.085,.55,8),mats.pipe,.23,1.68,0,group);arm.rotation.z=Math.PI/2;
    const wheel=mesh(new THREE.TorusGeometry(.25,.055,7,20),mats.pipe,0,1.6,.07,group);
    const hit=mesh(new THREE.SphereGeometry(.85,8,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),0,.85,0,group);
    pickables.push(hit);hit.userData.pump=id;
    const label=document.createElement('button');label.className='scene-label';label.textContent=`${id} · 供水装置`;
    label.setAttribute('aria-label',`启动供水装置 ${id}`);label.dataset.scenePump=id;
    label.addEventListener('click',()=>activate(id));overlay.appendChild(label);
    pumps.set(id,{group,material:pumpMat,wheel,label});
  }
  const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2();
  let press=null, disposed=false, currentMode=mode;
  function activate(id) {
    if(currentMode!==2 || active.has(id))return;
    active.add(id);sync();onActivate(new Set(active));
  }
  function sync() {
    for(const [id,p] of pumps) {
      const on=active.has(id);
      p.material.color.set(on?0x79a99e:0xe8b955);
      p.material.emissive.set(on?0x274d38:0x000000);
      p.wheel.rotation.z=on?Math.PI/2:0;
      p.label.textContent=`${on?'✓ ':''}${id} · ${on?'已供水':'供水装置'}`;
      p.label.classList.toggle('on',on);p.label.disabled=currentMode!==2||on;
      p.label.hidden=currentMode!==2;
    }
    const awake=active.size===3;
    soil.material.color.set(awake?0x7eac6d:0x9e946c);
    flowers.forEach(f=>f.scale.setScalar(awake?1:.4));
    host.dataset.activated=String(active.size);draw();
  }
  function draw() {
    if(disposed)return;
    camera.updateMatrixWorld();
    for(const [id,p] of pumps) {
      const v=new THREE.Vector3().copy(p.group.position);v.y=2.45;v.project(camera);
      p.label.style.left=`${(v.x+1)*host.clientWidth/2}px`;p.label.style.top=`${(1-v.y)*host.clientHeight/2}px`;
      const hit=new THREE.Vector3().copy(p.group.position);hit.y=.6;hit.project(camera);
      p.label.dataset.pickX=String((hit.x+1)*host.clientWidth/2);p.label.dataset.pickY=String((1-hit.y)*host.clientHeight/2);
    }
    host.dataset.azimuth=controls.getAzimuthalAngle().toFixed(4);
    renderer.render(scene,camera);
  }
  function resize() {
    const w=host.clientWidth,h=host.clientHeight;
    if(!w||!h)return;
    renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();draw();
  }
  function down(e){press={x:e.clientX,y:e.clientY};}
  function up(e){
    if(currentMode!==2||!press||Math.hypot(e.clientX-press.x,e.clientY-press.y)>6)return;
    const rect=renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hit=raycaster.intersectObjects(pickables,false)[0];
    if(hit)activate(hit.object.userData.pump);
    press=null;
  }
  function hover(e) {
    if(currentMode!==2){renderer.domElement.style.cursor=currentMode===1?'grab':'default';return;}
    const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
    raycaster.setFromCamera(pointer,camera);renderer.domElement.style.cursor=raycaster.intersectObjects(pickables).length?'pointer':'grab';
  }
  renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointermove',hover);
  controls.addEventListener('change',draw);
  const observer=new ResizeObserver(resize);observer.observe(host);
  function setMode(next) {
    currentMode=next;controls.enabled=next!==0;
    host.dataset.mode=String(next);sync();
  }
  function rotate(delta) {
    if(currentMode===0)return;
    const relative=camera.position.clone().sub(controls.target);relative.applyAxisAngle(new THREE.Vector3(0,1,0),delta);
    camera.position.copy(relative.add(controls.target));controls.update();draw();
  }
  setMode(mode);resize();
  return { setMode,rotate,reset(){active.clear();sync();onActivate(new Set(active));},
    dispose(){disposed=true;observer.disconnect();controls.dispose();renderer.dispose();renderer.forceContextLoss();
      renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointermove',hover);
      const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());host.replaceChildren();}
  };
}
