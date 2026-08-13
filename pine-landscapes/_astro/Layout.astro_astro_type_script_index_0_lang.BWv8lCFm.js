const v="http://localhost:3000";function q(i,e,n){return Math.min(n,Math.max(e,i))}function D(i,e){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>i(...o),e)}}function y(i,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(location.pathname+location.search,{cache:"no-store"}).then(l=>l.text()).then(l=>{i(l)||Date.now()>o?location.reload():setTimeout(t,n)}).catch(()=>location.reload())}t()}function T(i,{shouldExist:e,expectedSrc:n,timeoutMs:o=5e3,intervalMs:t=200}={}){const l=Date.now()+o;function a(s){const r=s.querySelector(`[data-image-slot="${CSS.escape(i)}"]`),c=r?r.querySelector("img"):null;return e?c?n?c.getAttribute("src").split("?")[0]===n.split("?")[0]:!0:!1:!c}function p(){function s(){fetch(location.pathname+location.search,{cache:"no-store"}).then(r=>r.text()).then(r=>{const c=new DOMParser().parseFromString(r,"text/html");a(c)||Date.now()>l?location.reload():setTimeout(s,t)}).catch(()=>location.reload())}s()}function d(){fetch(`${v}/api/image/${encodeURIComponent(i)}`,{cache:"no-store"}).then(async s=>{if(!e){if(s.status===404){p();return}if(Date.now()>l){location.reload();return}setTimeout(d,t);return}if(!s.ok){if(Date.now()>l){location.reload();return}setTimeout(d,t);return}(await s.arrayBuffer()).byteLength>0?p():Date.now()>l?location.reload():setTimeout(d,t)}).catch(()=>location.reload())}d()}function S(i){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',i.appendChild(e),e}function $(){window.parent.postMessage({source:"webgen-template",type:"saved"},v)}function b(i,e){return fetch(`${v}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:i,value:e})}).then(n=>(n.ok&&$(),n)).catch(()=>{})}function B(){const i=document.createElement("style");i.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function P(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i);function e(n){document.documentElement.classList.toggle("webgen-locked",n),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=n?"false":"true"})}window.addEventListener("message",n=>{n.origin===v&&n.data?.source==="webgen-studio"&&n.data?.type==="lock"&&e(!!n.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},v)}function R(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let n=e.innerHTML;e.addEventListener("focus",()=>{n=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const t=window.getSelection();if(!t||!t.rangeCount)return;const l=t.getRangeAt(0);l.deleteContents();const a=document.createElement("br");l.insertNode(a),l.insertNode(document.createElement("br")),l.setStartAfter(a),l.collapse(!0),t.removeAllRanges(),t.addRange(l)}),e.addEventListener("blur",()=>{/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML!==n&&(n=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(o=>{o!==e&&(o.innerHTML=e.innerHTML)}),b(e.dataset.editKey,e.innerHTML))})})}const k={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>'};function C(i,e,n){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=k[i],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",t=>{t.preventDefault(),n(t)}),o}function L(i){const[e,n]=(i.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(n)?n:50}}function M(i){if(i.dataset.scale)return parseFloat(i.dataset.scale);const e=i.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function A(){const i=document.createElement("style");i.textContent=`
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
      cursor: grab;
    }
    .dev-img-scale::-webkit-slider-thumb { cursor: grab; }
    .dev-img-scale::-moz-range-thumb { cursor: grab; }
    .dev-img-scale:active,
    .dev-img-scale:active::-webkit-slider-thumb,
    .dev-img-scale:active::-moz-range-thumb { cursor: grabbing; }
    [data-image-slot].dev-reposition-active .dev-img-scale { display: block; }
    /* The logo slot is too small for a bottom-inset slider to avoid the
       image underneath. Anchor it to the viewport instead, positioned once
       when resize mode turns on, so it holds still for the whole drag. */
    .dev-img-scale-logo {
      position: fixed; left: 0; right: auto; bottom: auto; top: 0; width: 220px;
    }
  `,document.head.appendChild(i),document.querySelectorAll("[data-image-slot]").forEach(e=>{const n=e.dataset.imageSlot,o=n==="logo",t=e.querySelector("img");t&&(t.draggable=!1);const l=e.closest("a");l&&(l.draggable=!1);const a=document.createElement("div");a.className="dev-img-overlay",e.appendChild(a);const p=document.createElement("input");p.type="file",p.accept="image/*",p.style.display="none",p.addEventListener("change",async()=>{const r=p.files&&p.files[0];if(!r)return;a.innerHTML="",S(e);const c=new FormData;c.append("slotId",n),c.append("file",r);const g=await fetch(`${v}/api/upload`,{method:"POST",body:c});if(!g.ok){d();return}const h=await g.json();T(n,{shouldExist:!0,expectedSrc:h.image.src})}),e.appendChild(p);function d(){if(a.innerHTML="",!t){a.appendChild(C("replace","Add photo",r=>{r.stopPropagation(),p.click()}));return}if(e.classList.contains("dev-reposition-active")){a.appendChild(C("confirm","Done",r=>{r.stopPropagation(),e.classList.remove("dev-reposition-active"),d()}));return}a.appendChild(C(o?"resize":"reposition",o?"Resize logo":"Reposition image",r=>{if(r.stopPropagation(),e.classList.add("dev-reposition-active"),o&&s){const c=e.getBoundingClientRect();s.style.top=`${c.bottom+10}px`,s.style.left=`${c.left}px`}d()})),a.appendChild(C("remove","Remove image",async r=>{if(r.stopPropagation(),a.innerHTML="",S(e),!(await fetch(`${v}/api/upload?slotId=${encodeURIComponent(n)}`,{method:"DELETE"})).ok){d();return}T(n,{shouldExist:!1})}))}let s=null;if(t){s=document.createElement("input"),s.type="range",s.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",s.min=o?"0.5":"1",s.max=o&&t.dataset.maxScale?t.dataset.maxScale:"3",s.step="0.05",s.value=String(M(t)),s.addEventListener("click",c=>{c.preventDefault(),c.stopPropagation()}),s.addEventListener("mousedown",c=>c.stopPropagation()),e.appendChild(s);const r=D((c,g,h)=>{fetch(`${v}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:n,x:c,y:g,scale:h})}).then(u=>{u.ok&&$()}).catch(()=>{})},300);if(s.addEventListener("input",()=>{const c=parseFloat(s.value);if(o)t.dataset.scale=String(c),t.style.height=`${Math.round(44*c)}px`,r(50,50,c);else{const{x:g,y:h}=L(t);t.style.transform=`scale(${c})`,r(g,h,c)}}),!o){let c=!1,g=0,h=0,u={x:50,y:50},m=null;t.addEventListener("pointerdown",f=>{e.classList.contains("dev-reposition-active")&&(c=!0,t.setPointerCapture(f.pointerId),m=e.getBoundingClientRect(),g=f.clientX,h=f.clientY,u=L(t))}),t.addEventListener("click",f=>{e.classList.contains("dev-reposition-active")&&(f.preventDefault(),f.stopPropagation())}),t.addEventListener("pointermove",f=>{if(!c)return;const x=(f.clientX-g)/m.width*100,w=(f.clientY-h)/m.height*100,E=q(u.x-x,0,100),z=q(u.y-w,0,100);t.style.objectPosition=`${E}% ${z}%`}),t.addEventListener("pointerup",()=>{if(!c)return;c=!1;const{x:f,y:x}=L(t);r(f,x,M(t))})}}d()})}function N(){const i=document.createElement("style");i.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-width-control").forEach(e=>{const n=(e.dataset.widthTarget||"").split(" ").map(l=>document.querySelector(`[data-edit-key="${l}"]`)).filter(Boolean);if(!n.length)return;const o=document.createElement("span");o.textContent="Width";const t=document.createElement("input");t.type="range",t.min="320",t.max="900",t.step="10",t.value=String(parseInt(n[0].style.maxWidth,10)||640),t.addEventListener("input",()=>{n.forEach(l=>{l.style.maxWidth=`${t.value}px`}),b(e.dataset.widthKey,Number(t.value))}),e.append(o,t)})}function j(){const i=document.createElement("style");i.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const n=document.getElementById(e.dataset.opacityTarget||"");if(!n)return;const o=n.dataset.opacityRgb||"0,0,0",t=document.createElement("span");t.textContent="Opacity";const l=document.createElement("input");l.type="range",l.min="0",l.max="1",l.step="0.05",l.value=e.dataset.opacityValue||"0.4",l.addEventListener("input",()=>{n.style.backgroundColor=`rgba(${o},${l.value})`,b(e.dataset.opacityKey,Number(l.value))}),e.append(t,l)})}function I(){const i=document.createElement("style");i.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-gap-control").forEach(e=>{const n=document.getElementById(e.dataset.gapTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Gutter";const t=document.createElement("input");t.type="range",t.min="0",t.max="160",t.step="4",t.value=e.dataset.gapValue||"56",t.addEventListener("input",()=>{n.style.gap=`${t.value}px`,b(e.dataset.gapKey,Number(t.value))}),e.append(o,t)})}function H(){const i=document.createElement("style");i.textContent=`
    .dev-ratio-grip {
      position: absolute; width: 28px; height: 28px; margin-left: -14px; margin-top: -14px;
      border-radius: 50%; border: none; background: rgba(17,17,17,.85); color: #fff; cursor: ew-resize;
      display: flex; align-items: center; justify-content: center; touch-action: none; padding: 0;
      opacity: 0; transition: opacity .12s ease; pointer-events: auto;
    }
    [data-dev-hover-zone]:hover .dev-ratio-grip,
    [data-dev-hover-zone]:focus-within .dev-ratio-grip,
    .dev-ratio-grip.dragging { opacity: 1; }
    .dev-ratio-grip:hover { background: #111; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-column-ratio-handle").forEach(e=>{const n=document.getElementById(e.dataset.ratioTarget||"");if(!n)return;const o=n.children[0],t=n.children[1];if(!o||!t)return;let l=Number(e.dataset.ratioCurrent)||59;const a=document.createElement("button");a.type="button",a.className="dev-ratio-grip",a.innerHTML=k.widthToggle,a.title="Drag to resize columns",a.addEventListener("click",s=>s.preventDefault()),e.appendChild(a);function p(){const s=e.getBoundingClientRect(),r=o.getBoundingClientRect(),c=t.getBoundingClientRect(),g=(r.right+c.left)/2,h=(r.top+r.bottom)/2;a.style.left=`${g-s.left}px`,a.style.top=`${h-s.top}px`}p(),window.addEventListener("resize",p);let d=!1;a.addEventListener("pointerdown",s=>{d=!0,a.classList.add("dragging");try{a.setPointerCapture(s.pointerId)}catch{}}),a.addEventListener("pointermove",s=>{if(!d)return;const r=n.getBoundingClientRect(),c=e.getBoundingClientRect(),g=parseFloat(getComputedStyle(n).columnGap||"0")||0,h=r.width-g,u=s.clientX-r.left,m=Math.round((u-g/2)/h*100),f=q(m,25,75);f!==l&&(l=f,n.style.gridTemplateColumns=`minmax(320px, ${l}fr) minmax(300px, ${100-l}fr)`),a.style.left=`${s.clientX-c.left}px`}),a.addEventListener("pointerup",()=>{d&&(d=!1,a.classList.remove("dragging"),p(),b(e.dataset.ratioKey,l))})})}function O(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const n=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!n.length)return;let t=e.dataset.cycleCurrent||n[0];const l=e.dataset.cycleIcon||"cycle",a=document.createElement("button");a.type="button",a.className="dev-cycle-btn",e.dataset.cycleTitle&&(a.title=e.dataset.cycleTitle);function p(){const d=Math.max(0,n.indexOf(t)),s=o[d];a.innerHTML=s?`${k[l]}<span>${s}</span>`:k[l]}p(),a.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),a.disabled)return;const s=n.indexOf(t);t=n[(s+1)%n.length],p(),a.disabled=!0;const r=e.dataset.cycleKey;b(r,t).then(()=>y(c=>c.includes(`data-cycle-key="${r}"`)&&c.includes(`data-cycle-current="${t}"`))).catch(()=>{a.disabled=!1})}),e.appendChild(a)})}function F(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-height-handle").forEach(e=>{let n;try{n=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!n.length)return;let o;if(e.dataset.handleNumeric!==void 0){const r=Number(e.dataset.handleCurrent);o=n.reduce((c,g,h)=>Math.abs(g.save-r)<Math.abs(n[c].save-r)?h:c,0)}else o=n.findIndex(r=>r.name===e.dataset.handleCurrent);o<0&&(o=0);const t=document.createElement("button");t.type="button",t.className="dev-height-grip",t.innerHTML=k.updown,t.title="Drag to resize",t.addEventListener("click",r=>r.preventDefault());function l(r){n[r].effects.forEach(({target:c,prop:g,value:h})=>{const u=document.getElementById(c);u&&(g.startsWith("--")?u.style.setProperty(g,h):u.style[g]=h)})}l(o);let a=!1,p=0,d=0;const s=70;t.addEventListener("pointerdown",r=>{a=!0,e.classList.add("dragging"),p=r.clientY,d=o;try{t.setPointerCapture(r.pointerId)}catch{}}),t.addEventListener("pointermove",r=>{if(!a)return;const c=Math.round((r.clientY-p)/s),g=Math.min(n.length-1,Math.max(0,d+c));g!==o&&(o=g,l(o))}),t.addEventListener("pointerup",()=>{a&&(a=!1,e.classList.remove("dragging"),b(e.dataset.handleKey,n[o].save))}),e.append(t)})}function V(){const i=document.createElement("style");i.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-map-control").forEach(e=>{const n=document.createElement("input");n.type="text",n.placeholder="Map location…",n.value=e.dataset.mapValue||"",n.title="Google Maps search text for the embedded map",n.addEventListener("keydown",o=>{o.key==="Enter"&&n.blur()}),n.addEventListener("blur",()=>{if(n.value===e.dataset.mapValue)return;const o=n.value;e.dataset.mapValue=o,b(e.dataset.mapKey,o).then(()=>y(t=>t.includes(o)))}),e.appendChild(n)})}function K(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-embed-control").forEach(e=>{const n=document.createElement("button");n.type="button",n.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",n.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const t=o.value;e.dataset.embedValue=t,b(e.dataset.embedKey,t).then(()=>y(()=>!0))}),e.append(o,n)})}function U(){const i=document.querySelector("[data-services-grid]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),i.querySelectorAll(".services-card").forEach(t=>{const l=t.dataset.serviceId,a=document.createElement("button");a.type="button",a.className="services-card-remove",a.textContent="×",a.title="Remove card",a.addEventListener("click",async p=>{if(p.preventDefault(),p.stopPropagation(),a.disabled=!0,S(t),!(await fetch(`${v}/api/home-services?id=${encodeURIComponent(l)}`,{method:"DELETE"})).ok){a.disabled=!1;return}y(s=>!s.includes(`data-service-id="${l}"`))}),t.appendChild(a)}),i.querySelectorAll(".services-row").forEach(t=>{if(t.children.length>=4)return;const l=t.dataset.rowIndex,a=document.createElement("button");a.type="button",a.className="services-row-add",a.textContent="+",a.title="Add a card to this row",a.addEventListener("click",async p=>{p.preventDefault(),p.stopPropagation(),a.disabled=!0;const d=await fetch(`${v}/api/home-services?row=${encodeURIComponent(l)}`,{method:"POST"});if(!d.ok){a.disabled=!1;return}const s=await d.json();y(r=>r.includes(`data-service-id="${s.id}"`))}),t.appendChild(a)});const n=i.querySelectorAll(".services-row"),o=n[n.length-1];if(o){const t=document.createElement("button");t.type="button",t.className="services-row-add-below",t.textContent="+",t.title="Add a new row of service cards",t.addEventListener("click",async l=>{l.preventDefault(),l.stopPropagation(),t.disabled=!0;const a=await fetch(`${v}/api/home-services`,{method:"POST"});if(!a.ok){t.disabled=!1;return}const p=await a.json();y(d=>d.includes(`data-service-id="${p.id}"`))}),o.appendChild(t)}}function Y(){const i=document.querySelector("[data-faq-list]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);async function n(d){(await fetch(`${v}/api/faq?index=${encodeURIComponent(d)}`,{method:"DELETE"})).ok&&y(r=>(r.match(/data-faq-item="\d+"/g)||[]).length<l.length)}async function o(d){(await fetch(`${v}/api/faq?after=${encodeURIComponent(d)}`,{method:"POST"})).ok&&y(r=>(r.match(/data-faq-item="\d+"/g)||[]).length>l.length)}async function t(d,s){(await fetch(`${v}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:d,to:s})})).ok&&y(()=>!0)}const l=Array.from(i.querySelectorAll("[data-faq-item]"));let a=null;function p(){l.forEach(d=>{d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove()})}l.forEach((d,s)=>{d.style.position=d.style.position||"relative";const r=document.createElement("button");r.type="button",r.className="faq-item-remove",r.textContent="×",r.title="Remove question",r.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),r.disabled=!0,n(s)}),d.appendChild(r);const c=document.createElement("div");c.className="faq-item-add";const g=document.createElement("button");g.type="button",g.textContent="+",g.title="Insert a question here",g.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation(),g.disabled=!0,o(s)}),c.appendChild(g),d.after(c);const h=document.createElement("button");h.type="button",h.className="faq-item-grip",h.title="Drag to reorder",h.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',h.draggable=!0,h.addEventListener("click",u=>u.preventDefault()),h.addEventListener("dragstart",u=>{a=s,u.dataTransfer.setData("text/plain",String(s)),u.dataTransfer.effectAllowed="move",u.dataTransfer.setDragImage(d,12,12),d.classList.add("faq-dragging")}),h.addEventListener("dragend",()=>{a=null,d.classList.remove("faq-dragging"),p()}),d.appendChild(h),d.addEventListener("dragover",u=>{if(a===null||a===s)return;u.preventDefault(),u.dataTransfer.dropEffect="move";const m=d.getBoundingClientRect(),f=u.clientY<m.top+m.height/2;p(),d.classList.add("faq-drop-target");const x=document.createElement("div");x.className="faq-drop-line",f?d.prepend(x):d.append(x)}),d.addEventListener("dragleave",u=>{d.contains(u.relatedTarget)||(d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove())}),d.addEventListener("drop",u=>{u.preventDefault();const m=Number(u.dataTransfer.getData("text/plain"));if(p(),Number.isNaN(m)||m===s)return;const f=d.getBoundingClientRect(),w=u.clientY<f.top+f.height/2?s:s+1,E=w>m?w-1:w;E!==m&&t(m,E)})})}B();R();A();N();j();I();H();O();F();V();K();U();Y();P();
