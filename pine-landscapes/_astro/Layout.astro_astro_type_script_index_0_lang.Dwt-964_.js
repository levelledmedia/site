const v="http://localhost:3000";function S(a,e,n){return Math.min(n,Math.max(e,a))}function z(a,e){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>a(...o),e)}}function m(a,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(location.pathname+location.search,{cache:"no-store"}).then(d=>d.text()).then(d=>{a(d)||Date.now()>o?location.reload():setTimeout(t,n)}).catch(()=>location.reload())}t()}function q(a){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',a.appendChild(e),e}function M(){window.parent.postMessage({source:"webgen-template",type:"saved"},v)}function b(a,e){return fetch(`${v}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:a,value:e})}).then(n=>(n.ok&&M(),n)).catch(()=>{})}function $(){const a=document.createElement("style");a.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function P(){const a=document.createElement("style");a.textContent=`
    html.webgen-locked .dev-variant-cycle,
    html.webgen-locked .dev-height-handle,
    html.webgen-locked .dev-width-control,
    html.webgen-locked .dev-opacity-control,
    html.webgen-locked .dev-gap-control,
    html.webgen-locked .dev-map-control,
    html.webgen-locked .dev-embed-control,
    html.webgen-locked .dev-img-overlay,
    html.webgen-locked .dev-img-scale,
    html.webgen-locked .dev-link-open,
    html.webgen-locked .services-card-remove,
    html.webgen-locked .services-row-add,
    html.webgen-locked .services-row-add-below,
    html.webgen-locked .faq-item-remove,
    html.webgen-locked .faq-item-add,
    html.webgen-locked .faq-item-grip {
      display: none !important;
    }
    html.webgen-locked [data-edit-key] {
      outline: none !important;
      cursor: default !important;
    }
  `,document.head.appendChild(a);function e(n){document.documentElement.classList.toggle("webgen-locked",n),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=n?"false":"true"})}window.addEventListener("message",n=>{n.origin===v&&n.data?.source==="webgen-studio"&&n.data?.type==="lock"&&e(!!n.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},v)}function A(){const a=document.createElement("style");a.textContent=`
    /* position+z-index so every editable field stays individually clickable
       in edit mode even where production markup layers a "stretched link"
       overlay over a whole card (e.g. the Services text-card title's
       ::after, which stretches its click target to the full card) — that
       overlay is a positioned pseudo-element with z-index:1, and without
       this an editor's click there would land on the anchor hosting it
       instead of the field actually underneath the cursor. This also makes
       the anchor its own containing block for that ::after, so in dev mode
       the stretch only reaches that one field, not the whole card — edit
       mode needs individual fields reachable, not a mimic of the click-
       anywhere-to-navigate behavior that's the point of the overlay in
       production (where none of this dev CSS ships). */
    [data-edit-key] { position: relative; z-index: 2; outline: 2px dashed transparent; outline-offset: 3px; cursor: text; pointer-events: auto; min-height: 1.2em; min-width: 24px; }
    [data-edit-key]:hover { outline-color: rgba(37,99,235,.5); }
    [data-edit-key]:focus { outline-color: #2563eb; outline-style: solid; }
    [data-edit-key][data-edit-scope="global"]:hover { outline-color: rgba(217,158,10,.6); }
    [data-edit-key][data-edit-scope="global"]:focus { outline-color: #d99e0a; outline-style: solid; }
  `,document.head.appendChild(a),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let n=e.innerHTML;e.addEventListener("focus",()=>{n=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const t=window.getSelection();if(!t||!t.rangeCount)return;const d=t.getRangeAt(0);d.deleteContents();const s=document.createElement("br");d.insertNode(s),d.insertNode(document.createElement("br")),d.setStartAfter(s),d.collapse(!0),t.removeAllRanges(),t.addRange(d)}),e.addEventListener("blur",()=>{/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML!==n&&(n=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(o=>{o!==e&&(o.innerHTML=e.innerHTML)}),b(e.dataset.editKey,e.innerHTML))})})}const C={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>'};function E(a,e,n){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=C[a],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",t=>{t.preventDefault(),n(t)}),o}function L(a){const[e,n]=(a.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(n)?n:50}}function T(a){if(a.dataset.scale)return parseFloat(a.dataset.scale);const e=a.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function N(){const a=document.createElement("style");a.textContent=`
    .dev-img-overlay {
      position: absolute; top: 6px; right: 6px; display: none; gap: 4px; z-index: 9999;
    }
    [data-image-slot]:hover .dev-img-overlay,
    [data-image-slot].dev-reposition-active .dev-img-overlay { display: flex; }
    .dev-img-btn {
      width: 26px; height: 26px; padding: 0; border-radius: 4px;
      border: none; background: rgba(17,17,17,.85); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .dev-img-btn:hover { background: #111; }
    .dev-loading-spinner {
      position: absolute; inset: 0; z-index: 10000; display: flex;
      align-items: center; justify-content: center;
      background: rgba(255,255,255,.55); color: #111;
    }
    .dev-loading-spinner svg { animation: dev-spin .8s linear infinite; }
    @keyframes dev-spin { to { transform: rotate(360deg); } }
    [data-image-slot] img { -webkit-user-drag: none; user-drag: none; }
    [data-image-slot].dev-reposition-active img { cursor: grab; touch-action: none; }
    [data-image-slot].dev-reposition-active img:active { cursor: grabbing; }
    .dev-img-scale {
      position: absolute; left: 6px; right: 6px; bottom: 6px; z-index: 9999; display: none; width: calc(100% - 12px);
    }
    [data-image-slot].dev-reposition-active .dev-img-scale { display: block; }
    /* The logo slot is too small for a bottom-inset slider to avoid the
       image underneath. Anchor it to the viewport instead, positioned once
       when resize mode turns on, so it holds still for the whole drag. */
    .dev-img-scale-logo {
      position: fixed; left: 0; right: auto; bottom: auto; top: 0; width: 220px;
    }
  `,document.head.appendChild(a),document.querySelectorAll("[data-image-slot]").forEach(e=>{const n=e.dataset.imageSlot,o=n==="logo",t=e.querySelector("img");t&&(t.draggable=!1);const d=document.createElement("div");d.className="dev-img-overlay",e.appendChild(d);const s=document.createElement("input");s.type="file",s.accept="image/*",s.style.display="none",s.addEventListener("change",async()=>{const l=s.files&&s.files[0];if(!l)return;d.innerHTML="",q(e);const r=new FormData;r.append("slotId",n),r.append("file",l);const u=await fetch(`${v}/api/upload`,{method:"POST",body:r});if(!u.ok){h();return}const p=await u.json();m(g=>g.includes(p.image.src))}),e.appendChild(s);function h(){if(d.innerHTML="",!t){d.appendChild(E("replace","Add photo",l=>{l.stopPropagation(),s.click()}));return}if(e.classList.contains("dev-reposition-active")){d.appendChild(E("confirm","Done",l=>{l.stopPropagation(),e.classList.remove("dev-reposition-active"),h()}));return}d.appendChild(E(o?"resize":"reposition",o?"Resize logo":"Reposition image",l=>{if(l.stopPropagation(),e.classList.add("dev-reposition-active"),o&&i){const r=e.getBoundingClientRect();i.style.top=`${r.bottom+10}px`,i.style.left=`${r.left}px`}h()})),d.appendChild(E("remove","Remove image",async l=>{l.stopPropagation();const r=t.getAttribute("src");if(d.innerHTML="",q(e),!(await fetch(`${v}/api/upload?slotId=${encodeURIComponent(n)}`,{method:"DELETE"})).ok){h();return}m(p=>!p.includes(r))}))}let i=null;if(t){i=document.createElement("input"),i.type="range",i.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",i.min=o?"0.5":"1",i.max=o&&t.dataset.maxScale?t.dataset.maxScale:"3",i.step="0.05",i.value=String(T(t)),i.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation()}),i.addEventListener("mousedown",r=>r.stopPropagation()),e.appendChild(i);const l=z((r,u,p)=>{fetch(`${v}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:n,x:r,y:u,scale:p})}).then(g=>{g.ok&&M()}).catch(()=>{})},300);if(i.addEventListener("input",()=>{const r=parseFloat(i.value);if(o)t.dataset.scale=String(r),t.style.height=`${Math.round(44*r)}px`,l(50,50,r);else{const{x:u,y:p}=L(t);t.style.transform=`scale(${r})`,l(u,p,r)}}),!o){let r=!1,u=0,p=0,g={x:50,y:50},c=null;t.addEventListener("pointerdown",f=>{e.classList.contains("dev-reposition-active")&&(r=!0,t.setPointerCapture(f.pointerId),c=e.getBoundingClientRect(),u=f.clientX,p=f.clientY,g=L(t))}),t.addEventListener("pointermove",f=>{if(!r)return;const y=(f.clientX-u)/c.width*100,x=(f.clientY-p)/c.height*100,w=S(g.x-y,0,100),k=S(g.y-x,0,100);t.style.objectPosition=`${w}% ${k}%`}),t.addEventListener("pointerup",()=>{if(!r)return;r=!1;const{x:f,y}=L(t);l(f,y,T(t))})}}h()})}function j(){const a=document.createElement("style");a.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-width-control").forEach(e=>{const n=(e.dataset.widthTarget||"").split(" ").map(d=>document.querySelector(`[data-edit-key="${d}"]`)).filter(Boolean);if(!n.length)return;const o=document.createElement("span");o.textContent="Width";const t=document.createElement("input");t.type="range",t.min="320",t.max="900",t.step="10",t.value=String(parseInt(n[0].style.maxWidth,10)||640),t.addEventListener("input",()=>{n.forEach(d=>{d.style.maxWidth=`${t.value}px`}),b(e.dataset.widthKey,Number(t.value))}),e.append(o,t)})}function D(){const a=document.createElement("style");a.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const n=document.getElementById(e.dataset.opacityTarget||"");if(!n)return;const o=n.dataset.opacityRgb||"0,0,0",t=document.createElement("span");t.textContent="Opacity";const d=document.createElement("input");d.type="range",d.min="0",d.max="1",d.step="0.05",d.value=e.dataset.opacityValue||"0.4",d.addEventListener("input",()=>{n.style.backgroundColor=`rgba(${o},${d.value})`,b(e.dataset.opacityKey,Number(d.value))}),e.append(t,d)})}function B(){const a=document.createElement("style");a.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-gap-control").forEach(e=>{const n=document.getElementById(e.dataset.gapTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Gutter";const t=document.createElement("input");t.type="range",t.min="0",t.max="160",t.step="4",t.value=e.dataset.gapValue||"56",t.addEventListener("input",()=>{n.style.gap=`${t.value}px`,b(e.dataset.gapKey,Number(t.value))}),e.append(o,t)})}function H(){const a=document.createElement("style");a.textContent=`
    .dev-variant-cycle { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-variant-cycle,
    [data-dev-hover-zone]:focus-within .dev-variant-cycle { opacity: 1; pointer-events: auto; }
    .dev-cycle-btn {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 6px 10px;
      border: none; color: #fff; cursor: pointer; font: 11px/1 -apple-system, sans-serif; white-space: nowrap;
    }
    .dev-cycle-btn:hover { background: #111; }
    .dev-cycle-btn svg { flex: none; }
    .dev-cycle-btn:disabled { opacity: .6; cursor: default; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const n=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!n.length)return;let t=e.dataset.cycleCurrent||n[0];const d=e.dataset.cycleIcon||"cycle",s=document.createElement("button");s.type="button",s.className="dev-cycle-btn",e.dataset.cycleTitle&&(s.title=e.dataset.cycleTitle);function h(){const i=Math.max(0,n.indexOf(t)),l=o[i];s.innerHTML=l?`${C[d]}<span>${l}</span>`:C[d]}h(),s.addEventListener("click",i=>{if(i.preventDefault(),i.stopPropagation(),s.disabled)return;const l=n.indexOf(t);t=n[(l+1)%n.length],h(),s.disabled=!0;const r=e.dataset.cycleKey;b(r,t).then(()=>m(u=>u.includes(`data-cycle-key="${r}"`)&&u.includes(`data-cycle-current="${t}"`))).catch(()=>{s.disabled=!1})}),e.appendChild(s)})}function I(){const a=document.createElement("style");a.textContent=`
    .dev-height-handle {
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
      display: flex; flex-direction: column; align-items: center; gap: 4px;
    }
    [data-dev-hover-zone]:hover .dev-height-handle,
    [data-dev-hover-zone]:focus-within .dev-height-handle,
    .dev-height-handle.dragging { opacity: 1; pointer-events: auto; }
    .dev-height-grip {
      width: 28px; height: 22px; border-radius: 4px; border: none;
      background: rgba(17,17,17,.85); color: #fff; cursor: grab;
      display: flex; align-items: center; justify-content: center; touch-action: none; padding: 0;
    }
    .dev-height-grip:hover { background: #111; }
    .dev-height-grip:active { cursor: grabbing; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-height-handle").forEach(e=>{let n;try{n=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!n.length)return;let o;if(e.dataset.handleNumeric!==void 0){const r=Number(e.dataset.handleCurrent);o=n.reduce((u,p,g)=>Math.abs(p.save-r)<Math.abs(n[u].save-r)?g:u,0)}else o=n.findIndex(r=>r.name===e.dataset.handleCurrent);o<0&&(o=0);const t=document.createElement("button");t.type="button",t.className="dev-height-grip",t.innerHTML=C.updown,t.title="Drag to resize",t.addEventListener("click",r=>r.preventDefault());function d(r){n[r].effects.forEach(({target:u,prop:p,value:g})=>{const c=document.getElementById(u);c&&(p.startsWith("--")?c.style.setProperty(p,g):c.style[p]=g)})}d(o);let s=!1,h=0,i=0;const l=70;t.addEventListener("pointerdown",r=>{s=!0,e.classList.add("dragging"),h=r.clientY,i=o;try{t.setPointerCapture(r.pointerId)}catch{}}),t.addEventListener("pointermove",r=>{if(!s)return;const u=Math.round((r.clientY-h)/l),p=Math.min(n.length-1,Math.max(0,i+u));p!==o&&(o=p,d(o))}),t.addEventListener("pointerup",()=>{s&&(s=!1,e.classList.remove("dragging"),b(e.dataset.handleKey,n[o].save))}),e.append(t)})}function R(){const a=document.createElement("style");a.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-map-control").forEach(e=>{const n=document.createElement("input");n.type="text",n.placeholder="Map location…",n.value=e.dataset.mapValue||"",n.title="Google Maps search text for the embedded map",n.addEventListener("keydown",o=>{o.key==="Enter"&&n.blur()}),n.addEventListener("blur",()=>{if(n.value===e.dataset.mapValue)return;const o=n.value;e.dataset.mapValue=o,b(e.dataset.mapKey,o).then(()=>m(t=>t.includes(o)))}),e.appendChild(n)})}function O(){const a=document.createElement("style");a.textContent=`
    .dev-embed-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-embed-control,
    [data-dev-hover-zone]:focus-within .dev-embed-control,
    .dev-embed-control.open { opacity: 1; pointer-events: auto; }
    .dev-embed-control button {
      font: 12px/1 -apple-system, sans-serif; padding: 8px 12px; border-radius: 4px;
      border: none; background: rgba(17,17,17,.85); color: #fff; cursor: pointer;
    }
    .dev-embed-control textarea {
      display: none; position: absolute; bottom: 100%; right: 0; margin-bottom: 8px;
      font: 12px/1.4 ui-monospace, monospace; padding: 10px; border-radius: 4px;
      border: none; width: 360px; height: 140px; background: rgba(17,17,17,.95); color: #fff;
    }
    .dev-embed-control.open textarea { display: block; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-embed-control").forEach(e=>{const n=document.createElement("button");n.type="button",n.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",n.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const t=o.value;e.dataset.embedValue=t,b(e.dataset.embedKey,t).then(()=>m(()=>!0))}),e.append(o,n)})}function V(){const a=document.querySelector("[data-services-grid]");if(!a)return;const e=document.createElement("style");e.textContent=`
    .services-card-remove {
      position: absolute; top: 6px; left: 6px; z-index: 9999;
      width: 22px; height: 22px; border-radius: 50%; border: none;
      background: rgba(17,17,17,.85); color: #fff; font: 14px/1 -apple-system, sans-serif;
      cursor: pointer; display: none; align-items: center; justify-content: center;
    }
    .services-card:hover .services-card-remove { display: flex; }
    /* Floating, off-layout controls only — none of these occupy a grid cell
       or push real content around, so the page keeps representing what a
       visitor will actually see. */
    .services-row-add {
      position: absolute; top: 50%; right: -14px; transform: translateY(-50%); z-index: 9999;
      width: 28px; height: 28px; border-radius: 50%; border: none;
      background: rgba(17,17,17,.85); color: #fff; font: 16px/1 -apple-system, sans-serif;
      cursor: pointer; display: none; align-items: center; justify-content: center;
    }
    .services-row:hover .services-row-add { display: flex; }
    .services-row-add-below {
      position: absolute; bottom: -14px; left: calc(50% - 22px); transform: translateX(-50%); z-index: 9999;
      width: 28px; height: 28px; border-radius: 50%; border: none;
      background: rgba(17,17,17,.85); color: #fff; font: 16px/1 -apple-system, sans-serif;
      cursor: pointer; display: none; align-items: center; justify-content: center;
    }
    .services-row:hover .services-row-add-below { display: flex; }
  `,document.head.appendChild(e),a.querySelectorAll(".services-card").forEach(t=>{const d=t.dataset.serviceId,s=document.createElement("button");s.type="button",s.className="services-card-remove",s.textContent="×",s.title="Remove card",s.addEventListener("click",async h=>{if(h.preventDefault(),h.stopPropagation(),s.disabled=!0,q(t),!(await fetch(`${v}/api/home-services?id=${encodeURIComponent(d)}`,{method:"DELETE"})).ok){s.disabled=!1;return}m(l=>!l.includes(`data-service-id="${d}"`))}),t.appendChild(s)}),a.querySelectorAll(".services-row").forEach(t=>{if(t.children.length>=4)return;const d=t.dataset.rowIndex,s=document.createElement("button");s.type="button",s.className="services-row-add",s.textContent="+",s.title="Add a card to this row",s.addEventListener("click",async h=>{h.preventDefault(),h.stopPropagation(),s.disabled=!0;const i=await fetch(`${v}/api/home-services?row=${encodeURIComponent(d)}`,{method:"POST"});if(!i.ok){s.disabled=!1;return}const l=await i.json();m(r=>r.includes(`data-service-id="${l.id}"`))}),t.appendChild(s)});const n=a.querySelectorAll(".services-row"),o=n[n.length-1];if(o){const t=document.createElement("button");t.type="button",t.className="services-row-add-below",t.textContent="+",t.title="Add a new row of service cards",t.addEventListener("click",async d=>{d.preventDefault(),d.stopPropagation(),t.disabled=!0;const s=await fetch(`${v}/api/home-services`,{method:"POST"});if(!s.ok){t.disabled=!1;return}const h=await s.json();m(i=>i.includes(`data-service-id="${h.id}"`))}),o.appendChild(t)}}function F(){const a=document.querySelector("[data-faq-list]");if(!a)return;const e=document.createElement("style");e.textContent=`
    .faq-item-remove {
      position: absolute; top: 6px; right: 6px; z-index: 20;
      width: 22px; height: 22px; border-radius: 50%; border: none;
      background: rgba(17,17,17,.85); color: #fff; font: 14px/1 -apple-system, sans-serif;
      cursor: pointer; display: none; align-items: center; justify-content: center;
    }
    [data-faq-item]:hover .faq-item-remove { display: flex; }
    .faq-item-add {
      position: relative; height: 0;
    }
    .faq-item-add button {
      position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
      width: 24px; height: 24px; border-radius: 50%; border: none;
      background: rgba(17,17,17,.85); color: #fff; font: 15px/1 -apple-system, sans-serif;
      cursor: pointer; display: none; align-items: center; justify-content: center; z-index: 21;
    }
    [data-faq-item]:hover + .faq-item-add button,
    .faq-item-add:hover button { display: flex; }
    .faq-item-grip {
      position: absolute; top: 6px; left: -34px; z-index: 20;
      width: 24px; height: 24px; border-radius: 4px; border: none;
      background: rgba(17,17,17,.85); color: #fff; cursor: grab;
      display: none; align-items: center; justify-content: center; touch-action: none;
    }
    /* .faq-list style items have no room to the left within the section's
       own padding, so the grip sits inside the item's top-right corner
       instead of poking out past the reading column. */
    .faq-list .faq-item-grip { top: 6px; left: auto; right: 0; }
    [data-faq-item]:hover .faq-item-grip { display: flex; }
    .faq-item-grip:active { cursor: grabbing; }
    [data-faq-item].faq-dragging { opacity: 0.4; }
    /* Drop-position feedback: a solid line where the dragged item would
       land, plus a highlight on whichever item is currently under the
       pointer — the opacity-only dragged-item feedback alone gave no sense
       of where a release would actually place it. */
    [data-faq-item].faq-drop-target { outline: 1.5px dashed rgba(37,99,235,.5); outline-offset: 2px; }
    .faq-drop-line {
      height: 3px; margin: -1.5px 0; border-radius: 2px; background: #2563eb;
      pointer-events: none; position: relative; z-index: 21;
    }
  `,document.head.appendChild(e);async function n(i){(await fetch(`${v}/api/faq?index=${encodeURIComponent(i)}`,{method:"DELETE"})).ok&&m(r=>(r.match(/data-faq-item="\d+"/g)||[]).length<d.length)}async function o(i){(await fetch(`${v}/api/faq?after=${encodeURIComponent(i)}`,{method:"POST"})).ok&&m(r=>(r.match(/data-faq-item="\d+"/g)||[]).length>d.length)}async function t(i,l){(await fetch(`${v}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:i,to:l})})).ok&&m(()=>!0)}const d=Array.from(a.querySelectorAll("[data-faq-item]"));let s=null;function h(){d.forEach(i=>{i.classList.remove("faq-drop-target"),i.querySelector(":scope > .faq-drop-line")?.remove()})}d.forEach((i,l)=>{i.style.position=i.style.position||"relative";const r=document.createElement("button");r.type="button",r.className="faq-item-remove",r.textContent="×",r.title="Remove question",r.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),r.disabled=!0,n(l)}),i.appendChild(r);const u=document.createElement("div");u.className="faq-item-add";const p=document.createElement("button");p.type="button",p.textContent="+",p.title="Insert a question here",p.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation(),p.disabled=!0,o(l)}),u.appendChild(p),i.after(u);const g=document.createElement("button");g.type="button",g.className="faq-item-grip",g.title="Drag to reorder",g.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',g.draggable=!0,g.addEventListener("click",c=>c.preventDefault()),g.addEventListener("dragstart",c=>{s=l,c.dataTransfer.setData("text/plain",String(l)),c.dataTransfer.effectAllowed="move",c.dataTransfer.setDragImage(i,12,12),i.classList.add("faq-dragging")}),g.addEventListener("dragend",()=>{s=null,i.classList.remove("faq-dragging"),h()}),i.appendChild(g),i.addEventListener("dragover",c=>{if(s===null||s===l)return;c.preventDefault(),c.dataTransfer.dropEffect="move";const f=i.getBoundingClientRect(),y=c.clientY<f.top+f.height/2;h(),i.classList.add("faq-drop-target");const x=document.createElement("div");x.className="faq-drop-line",y?i.prepend(x):i.append(x)}),i.addEventListener("dragleave",c=>{i.contains(c.relatedTarget)||(i.classList.remove("faq-drop-target"),i.querySelector(":scope > .faq-drop-line")?.remove())}),i.addEventListener("drop",c=>{c.preventDefault();const f=Number(c.dataTransfer.getData("text/plain"));if(h(),Number.isNaN(f)||f===l)return;const y=i.getBoundingClientRect(),w=c.clientY<y.top+y.height/2?l:l+1,k=w>f?w-1:w;k!==f&&t(f,k)})})}$();A();N();j();D();B();H();I();R();O();V();F();P();
