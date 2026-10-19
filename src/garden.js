export function garden({ awake = false, labels = false, night = false } = {}) {
  const angularTree = (x,y,s=1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v-65" stroke="#6c798a" stroke-width="5"/><path d="m0-95-27 57h13l-22 26h69L13-38h14z" fill="#476477"/><path d="m0-95 0 83h33L13-38h14z" fill="#354e67"/></g>`;
  const roundTree = (x,y,s=1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v-43" stroke="#827354" stroke-width="6"/><ellipse cy="-48" rx="23" ry="30" fill="#6c9976"/><ellipse cx="-8" cy="-55" rx="17" ry="23" fill="#89b18a"/><ellipse cx="7" cy="-62" rx="14" ry="20" fill="#a8c79b"/></g>`;
  const tree = night ? angularTree : roundTree;
  const pump = (x,y,n) => `<g transform="translate(${x} ${y})"><ellipse cy="5" rx="20" ry="9" fill="#73866a" opacity=".25"/><path d="M-14-7 0-14 15-7 0 0z" fill="#f5d384"/><path d="M-14-7v17L0 18V0z" fill="#c79a4f"/><path d="M0 0 15-7v17L0 18z" fill="#e9b85f"/><path d="M0-4v-22h12v8" fill="none" stroke="#6c8273" stroke-width="5" stroke-linejoin="round"/><circle cx="0" cy="-25" r="7" fill="#efdfb2" stroke="#5e786b" stroke-width="3"/>${labels?`<text x="0" y="40" text-anchor="middle" font-size="13" fill="#365746" font-family="sans-serif">装置 ${n}</text>`:''}</g>`;
  const svg = `<svg class="garden-art" viewBox="0 0 650 430" role="img" aria-label="唤醒花园：中央花坛与三个供水装置组成的微型世界">
    <defs><linearGradient id="ground" x2="0" y2="1"><stop stop-color="#dce6bf"/><stop offset="1" stop-color="#bdcfa3"/></linearGradient><linearGradient id="side" x2="0" y2="1"><stop stop-color="#829e77"/><stop offset="1" stop-color="#b0b38a"/></linearGradient><filter id="shadow"><feGaussianBlur stdDeviation="14"/></filter></defs>
    <ellipse cx="329" cy="354" rx="239" ry="37" fill="#426247" opacity=".15" filter="url(#shadow)"/>
    <path d="m55 230 278-157 271 157v39L328 426 55 269z" fill="url(#side)"/>
    <path d="m55 230 278-157 271 157-276 157z" fill="url(#ground)"/>
    <path d="m58 230 273-153 270 153-273 154z" fill="none" stroke="#eff1cc" stroke-width="3"/>
    <path d="m305 370-13-58-119-69 29-17 120 70 121-70 29 17-120 69-13 58z" fill="#eee4c6"/>
    <path d="m322 296-8-118 25-1 11 119z" fill="#eee4c6"/>
    <path d="m234 275 87-50 88 50-87 51z" fill="#92a97b"/>
    <path d="m240 266 81-46 81 46v13l-81 47-81-47z" fill="#b2b8a0"/>
    <path d="m240 266 81-46 81 46-81 47z" fill="#e9e5cf"/>
    <path d="m255 266 66-37 66 37-66 38z" fill="${awake?'#6f9b70':'#adae88'}"/>
    ${tree(134,229,.85)}${tree(178,177,1.2)}${tree(234,157,.7)}${tree(426,177,1.08)}${tree(500,229,1.2)}${tree(472,272,.7)}
    <g fill="#a5bc82"><ellipse cx="147" cy="275" rx="24" ry="14"/><ellipse cx="176" cy="290" rx="18" ry="10"/><ellipse cx="426" cy="328" rx="28" ry="15"/><ellipse cx="454" cy="313" rx="18" ry="11"/></g>
    <g stroke="${awake?'#6f9760':'#939274'}" stroke-width="3">${[[-25,0],[-7,-10],[12,5],[30,-7],[-4,17]].map(([x,y])=>`<path d="M${321+x} ${269+y}v-20"/>`).join('')}</g>
    <g fill="${awake?'#edc975':'#c1b59a'}">${[[-25,0],[-7,-10],[12,5],[30,-7],[-4,17]].map(([x,y])=>`<circle cx="${321+x}" cy="${249+y}" r="7"/>`).join('')}</g>
    ${pump(203,231,'A')}${pump(440,231,'B')}${pump(325,164,'C')}
    <path d="m286 348 33-19 34 19v-42l-34-19-33 19z" fill="none" stroke="#e7e2c8" stroke-width="7" stroke-linejoin="round"/>
    <path d="m276 307 43-25 44 25" fill="none" stroke="#597c66" stroke-width="8"/>
    <g fill="#d7ddbc"><ellipse cx="99" cy="243" rx="12" ry="6"/><ellipse cx="551" cy="244" rx="15" ry="8"/><ellipse cx="383" cy="356" rx="9" ry="5"/></g>
    ${awake?'<g fill="#faf3bb"><circle cx="273" cy="222" r="3"/><circle cx="371" cy="213" r="4"/><circle cx="347" cy="188" r="3"/></g>':''}
  </svg>`;
  if (!night) return svg;
  const colors = {'#dce6bf':'#728592','#bdcfa3':'#526879','#829e77':'#344955','#b0b38a':'#435462','#eff1cc':'#9eacb6','#eee4c6':'#7e8a98','#92a97b':'#495b70','#b2b8a0':'#66748b','#e9e5cf':'#a7abb8','#6f9b70':'#667696','#a5bc82':'#526b7e','#d7ddbc':'#718493','#f5d384':'#c9c6ed','#c79a4f':'#7876a2','#e9b85f':'#9997cc','#edc975':'#c8c3ee','#e7e2c8':'#939fb4','#597c66':'#52647b','#faf3bb':'#d7d5ff','#365746':'#9ba9bc'};
  return svg.replace(/#[0-9a-f]{6}/g,c=>colors[c]||c);
}
