export function planSvg(step=5) {
  return `<svg class="plan-svg" viewBox="0 0 560 370" role="img" aria-label="花园俯视布局：南侧入口通往中央花坛，装置 A、B、C 分别位于左、右、后方"><defs><pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#cbd8c6"/></pattern></defs><rect width="560" height="370" rx="12" fill="#f2f5e9"/><rect width="560" height="370" fill="url(#map-grid)"/>
    <rect x="54" y="32" width="452" height="289" rx="38" fill="#e6edd8" stroke="#96ad87" stroke-width="2" stroke-dasharray="7 5"/>
    ${step>=4?'<path d="M280 318V194M280 194H135M280 194H425M280 194V92" fill="none" stroke="#f9f6e9" stroke-width="30"/><path d="M280 300V218M250 194H162M310 194H398M280 164V118" fill="none" stroke="#b4a77b" stroke-width="2" stroke-dasharray="5 5"/><path d="m276 238 4-7 4 7m-90-48-7 4 7 4m171-8 7 4-7 4m-89-59 4-7 4 7" fill="none" stroke="#a39972" stroke-width="2"/>':''}
    ${step>=2?'<circle cx="280" cy="194" r="42" fill="#afc694" stroke="#7c9d6b" stroke-width="2"/><circle cx="280" cy="194" r="31" fill="none" stroke="#dce6bd" stroke-width="2"/><text x="280" y="191" class="map-label">中央花坛</text><text x="280" y="209" class="map-small">视觉焦点 / 终点</text><path d="M259 310v20m42-20v20" stroke="#587e62" stroke-width="4"/><path d="M259 315h42" stroke="#e6edd8" stroke-width="9"/><text x="280" y="351" class="map-label">入口</text>':''}
    ${step>=3?[[135,194,'A'],[425,194,'B'],[280,87,'C']].map(([x,y,n])=>`<g><rect x="${x-22}" y="${y-22}" width="44" height="44" rx="10" fill="#f3d68a" stroke="#c8aa60" stroke-width="2"/><text x="${x}" y="${y+5}" class="map-label">${n}</text><text x="${x}" y="${y+40}" class="map-small">供水装置</text></g>`).join(''):''}
    ${step>=5?'<g fill="#9bb284"><circle cx="87" cy="68" r="15"/><circle cx="111" cy="72" r="19"/><circle cx="456" cy="275" r="17"/><circle cx="474" cy="264" r="13"/></g><path d="M468 88v-27m-5 8 5-8 5 8" stroke="#5c775c" fill="none" stroke-width="1.5"/><text x="468" y="53" class="map-small">N</text><text x="90" y="293" class="map-small">花园边界</text>':''}</svg>`;
}

/** A reading diagram for the lesson; node positions match the plan and 3D garden. */
export function annotatedPlanSvg({problems=false}={}) {
  const id=problems?'problem':'reading';
  const plant=problems?'#bdcfaa':'#e1e9d6';
  return `<svg class="annotated-plan ${problems?'problem-plan':''}" viewBox="0 0 760 520" role="img" aria-label="${problems?'布局问题示意：入口步道被阻挡，装饰与核心节点同样醒目':'唤醒花园空间布局：南侧入口先看见中央花坛，沿步道自由探索左侧 A、右侧 B、后方 C 供水装置，完成后回到花坛观察'}">
    <defs><marker id="${id}-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto-start-reverse"><path d="m0 0 7 3.5L0 7" fill="#73915b"/></marker></defs>
    <rect x="20" y="20" width="720" height="480" rx="26" fill="#f3f6ec" stroke="#a6bb93" stroke-width="2" stroke-dasharray="8 6"/>
    ${[[50,52],[555,52],[50,367],[555,367]].map(([x,y])=>`<g><rect x="${x}" y="${y}" width="155" height="110" rx="18" fill="${plant}" ${problems?'stroke="#73915b" stroke-width="2"':''}/><text x="${x+77.5}" y="${y+62}" class="annotated-region">植物区${problems?' / 装饰':''}</text></g>`).join('')}
    <g fill="none" stroke="#e8dfc5" stroke-width="32" stroke-linejoin="round"><path d="M370 453V331M206 265H300M440 265H534M370 148V200"/><path d="M300 200H440V331H300Z"/></g>
    <g fill="none" stroke="#8ca377" stroke-width="2" stroke-dasharray="6 6"><path d="M370 443V345" marker-end="url(#${id}-arrow)"/><path d="M213 265H287M453 265H527M370 159V188" marker-start="url(#${id}-arrow)" marker-end="url(#${id}-arrow)"/></g>
    <rect x="310" y="218" width="120" height="94" rx="17" fill="#b8ce9b" stroke="#78995f" stroke-width="2"/>
    <text x="370" y="250" class="annotated-main">中央花坛</text><text x="370" y="276" class="annotated-small">主题焦点</text><text x="370" y="299" class="annotated-small">完成后观察</text>
    ${[[148,265,'A'],[592,265,'B'],[370,106,'C']].map(([x,y,n])=>`<g><rect x="${x-58}" y="${y-38}" width="116" height="76" rx="12" fill="#edf3df" stroke="#7c9b64" stroke-width="2"/><text x="${x}" y="${y-5}" class="annotated-node">${n}</text><text x="${x}" y="${y+22}" class="annotated-label">供水装置</text></g>`).join('')}
    <rect x="305" y="448" width="130" height="42" rx="9" fill="#365f47"/><text x="370" y="476" class="annotated-entry">入口 / 起点</text>
    ${problems?'<rect x="310" y="377" width="120" height="44" rx="5" fill="#355340" stroke="#f3f6ec" stroke-width="3"/><text x="370" y="406" class="annotated-entry">阻挡物</text>':'<text x="487" y="371" class="annotated-label">自由探索，顺序不限</text><text x="487" y="400" class="annotated-small">完成后回到花坛观察</text><path d="m443 349-25-19" stroke="#8ca377" fill="none" marker-end="url(#reading-arrow)"/>'}
    <path d="M688 300v-35m-6 9 6-9 6 9" stroke="#7a9565" stroke-width="2" fill="none"/><text x="688" y="252" class="annotated-small">北</text>
  </svg>`;
}
