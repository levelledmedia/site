const v="http://localhost:3000";function $(i,e,n){return Math.min(n,Math.max(e,i))}function j(i,e){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>i(...o),e)}}function x(i,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(location.pathname+location.search,{cache:"no-store"}).then(r=>r.text()).then(r=>{i(r)||Date.now()>o?location.reload():setTimeout(t,n)}).catch(()=>location.reload())}t()}function R(i,{shouldExist:e,expectedSrc:n,timeoutMs:o=5e3,intervalMs:t=200}={}){const r=Date.now()+o;function a(l){const s=l.querySelector(`[data-image-slot="${CSS.escape(i)}"]`),u=s?s.querySelector("img"):null;return e?u?n?u.getAttribute("src").split("?")[0]===n.split("?")[0]:!0:!1:!u}function h(){function l(){fetch(location.pathname+location.search,{cache:"no-store"}).then(s=>s.text()).then(s=>{const u=new DOMParser().parseFromString(s,"text/html");a(u)||Date.now()>r?location.reload():setTimeout(l,t)}).catch(()=>location.reload())}l()}function d(){fetch(`${v}/api/image/${encodeURIComponent(i)}`,{cache:"no-store"}).then(async l=>{if(!e){if(l.status===404){h();return}if(Date.now()>r){location.reload();return}setTimeout(d,t);return}if(!l.ok){if(Date.now()>r){location.reload();return}setTimeout(d,t);return}(await l.arrayBuffer()).byteLength>0?h():Date.now()>r?location.reload():setTimeout(d,t)}).catch(()=>location.reload())}d()}function P(i){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',i.appendChild(e),e}function B(){window.parent.postMessage({source:"webgen-template",type:"saved"},v)}function w(i,e){return fetch(`${v}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:i,value:e})}).then(n=>(n.ok&&B(),n)).catch(()=>{})}function H(){const i=document.createElement("style");i.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function I(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i);function e(n){document.documentElement.classList.toggle("webgen-locked",n),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=n?"false":"true"})}window.addEventListener("message",n=>{n.origin===v&&n.data?.source==="webgen-studio"&&n.data?.type==="lock"&&e(!!n.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},v)}function O(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let n=e.innerHTML;e.addEventListener("focus",()=>{n=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const t=window.getSelection();if(!t||!t.rangeCount)return;const r=t.getRangeAt(0);r.deleteContents();const a=document.createElement("br");r.insertNode(a),r.insertNode(document.createElement("br")),r.setStartAfter(a),r.collapse(!0),t.removeAllRanges(),t.addRange(r)}),e.addEventListener("blur",()=>{/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML!==n&&(n=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(o=>{o!==e&&(o.innerHTML=e.innerHTML)}),w(e.dataset.editKey,e.innerHTML))})})}const T={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>'};function M(i,e,n){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=T[i],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",t=>{t.preventDefault(),n(t)}),o}function D(i){const[e,n]=(i.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(n)?n:50}}function z(i){if(i.dataset.scale)return parseFloat(i.dataset.scale);const e=i.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function F(){const i=document.createElement("style");i.textContent=`
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
    [data-image-slot].dev-img-drag-over::after {
      content: 'Drop to replace image';
      position: absolute; inset: 0; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
      text-align: center; padding: 8px;
      background: rgba(37, 99, 235, .45);
      outline: 2px dashed #fff; outline-offset: -6px;
      color: #fff; font: 600 13px/1.3 -apple-system, sans-serif;
      pointer-events: none;
    }
  `,document.head.appendChild(i),["dragover","drop"].forEach(e=>{window.addEventListener(e,n=>{n.target.closest("[data-image-slot]")||n.preventDefault()})}),document.querySelectorAll("[data-image-slot]").forEach(e=>{const n=e.dataset.imageSlot,o=n==="logo",t=e.querySelector("img");t&&(t.draggable=!1);const r=e.closest("a");r&&(r.draggable=!1);const a=document.createElement("div");a.className="dev-img-overlay",e.appendChild(a);const h=document.createElement("input");h.type="file",h.accept="image/*",h.style.display="none";async function d(c){if(!c||!c.type.startsWith("image/"))return;a.innerHTML="",P(e);const p=new FormData;p.append("slotId",n),p.append("file",c);const g=await fetch(`${v}/api/upload`,{method:"POST",body:p});if(!g.ok){s();return}const f=await g.json();R(n,{shouldExist:!0,expectedSrc:f.image.src})}h.addEventListener("change",()=>{d(h.files&&h.files[0])}),e.appendChild(h);let l=0;e.addEventListener("dragover",c=>{c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="copy")}),e.addEventListener("dragenter",c=>{c.preventDefault(),l+=1,e.classList.add("dev-img-drag-over")}),e.addEventListener("dragleave",()=>{l=Math.max(0,l-1),l===0&&e.classList.remove("dev-img-drag-over")}),e.addEventListener("drop",c=>{c.preventDefault(),c.stopPropagation(),l=0,e.classList.remove("dev-img-drag-over"),d(c.dataTransfer&&c.dataTransfer.files&&c.dataTransfer.files[0])});function s(){if(a.innerHTML="",!t){a.appendChild(M("replace","Add photo",c=>{c.stopPropagation(),h.click()}));return}if(e.classList.contains("dev-reposition-active")){a.appendChild(M("confirm","Done",c=>{c.stopPropagation(),e.classList.remove("dev-reposition-active"),s()}));return}a.appendChild(M(o?"resize":"reposition",o?"Resize logo":"Reposition image",c=>{if(c.stopPropagation(),e.classList.add("dev-reposition-active"),o&&u){const p=e.getBoundingClientRect();u.style.top=`${p.bottom+10}px`,u.style.left=`${p.left}px`}s()})),a.appendChild(M("remove","Remove image",async c=>{if(c.stopPropagation(),a.innerHTML="",P(e),!(await fetch(`${v}/api/upload?slotId=${encodeURIComponent(n)}`,{method:"DELETE"})).ok){s();return}R(n,{shouldExist:!1})}))}let u=null;if(t){u=document.createElement("input"),u.type="range",u.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",u.min=o?"0.5":"1",u.max=o&&t.dataset.maxScale?t.dataset.maxScale:"3",u.step="0.05",u.value=String(z(t)),u.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation()}),u.addEventListener("mousedown",p=>p.stopPropagation()),e.appendChild(u);const c=j((p,g,f)=>{ignoreNextReload=!0,fetch(`${v}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:n,x:p,y:g,scale:f})}).then(y=>{y.ok&&B()}).catch(()=>{ignoreNextReload=!1})},300);if(u.addEventListener("input",()=>{const p=parseFloat(u.value);if(o)t.dataset.scale=String(p),t.style.height=`${Math.round(44*p)}px`,c(50,50,p);else{const{x:g,y:f}=D(t);t.style.transform=`scale(${p})`,c(g,f,p)}}),!o){let p=!1,g=0,f=0,y={x:50,y:50},m=null,k=0,E=0;t.addEventListener("pointerdown",b=>{if(!e.classList.contains("dev-reposition-active"))return;p=!0,t.setPointerCapture(b.pointerId),m=e.getBoundingClientRect(),g=b.clientX,f=b.clientY,y=D(t);const C=z(t),L=t.naturalWidth,q=t.naturalHeight;if(L&&q&&m.width&&m.height){const S=Math.max(m.width/L,m.height/q),N=L*S*C,A=q*S*C;k=Math.max(N-m.width,0),E=Math.max(A-m.height,0)}else k=m.width,E=m.height}),t.addEventListener("click",b=>{e.classList.contains("dev-reposition-active")&&(b.preventDefault(),b.stopPropagation())}),t.addEventListener("pointermove",b=>{if(!p)return;const C=k>0?(b.clientX-g)/k*100:0,L=E>0?(b.clientY-f)/E*100:0,q=$(y.x-C,0,100),S=$(y.y-L,0,100);t.style.objectPosition=`${q}% ${S}%`}),t.addEventListener("pointerup",()=>{if(!p)return;p=!1;const{x:b,y:C}=D(t);c(b,C,z(t))})}}s()})}function V(){const i=document.createElement("style");i.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-width-control").forEach(e=>{const n=(e.dataset.widthTarget||"").split(" ").map(r=>document.querySelector(`[data-edit-key="${r}"]`)).filter(Boolean);if(!n.length)return;const o=document.createElement("span");o.textContent="Width";const t=document.createElement("input");t.type="range",t.min="320",t.max="900",t.step="10",t.value=String(parseInt(n[0].style.maxWidth,10)||640),t.addEventListener("input",()=>{n.forEach(r=>{r.style.maxWidth=`${t.value}px`}),w(e.dataset.widthKey,Number(t.value))}),e.append(o,t)})}function K(){const i=document.createElement("style");i.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const n=document.getElementById(e.dataset.opacityTarget||"");if(!n)return;const o=n.dataset.opacityRgb||"0,0,0",t=document.createElement("span");t.textContent="Opacity";const r=document.createElement("input");r.type="range",r.min="0",r.max="1",r.step="0.05",r.value=e.dataset.opacityValue||"0.4",r.addEventListener("input",()=>{n.style.backgroundColor=`rgba(${o},${r.value})`,w(e.dataset.opacityKey,Number(r.value))}),e.append(t,r)})}function Y(){const i=document.createElement("style");i.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-gap-control").forEach(e=>{const n=document.getElementById(e.dataset.gapTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Gutter";const t=document.createElement("input");t.type="range",t.min="0",t.max="160",t.step="4",t.value=e.dataset.gapValue||"56",t.addEventListener("input",()=>{n.style.gap=`${t.value}px`,w(e.dataset.gapKey,Number(t.value))}),e.append(o,t)})}function U(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-column-ratio-handle").forEach(e=>{const n=document.getElementById(e.dataset.ratioTarget||"");if(!n)return;const o=n.children[0],t=n.children[1];if(!o||!t)return;let r=Number(e.dataset.ratioCurrent)||59;const a=document.createElement("button");a.type="button",a.className="dev-ratio-grip",a.innerHTML=T.widthToggle,a.title="Drag to resize columns",a.addEventListener("click",l=>l.preventDefault()),e.appendChild(a);function h(){const l=e.getBoundingClientRect(),s=o.getBoundingClientRect(),u=t.getBoundingClientRect(),c=(s.right+u.left)/2,p=(s.top+s.bottom)/2;a.style.left=`${c-l.left}px`,a.style.top=`${p-l.top}px`}h(),window.addEventListener("resize",h);let d=!1;a.addEventListener("pointerdown",l=>{d=!0,a.classList.add("dragging");try{a.setPointerCapture(l.pointerId)}catch{}}),a.addEventListener("pointermove",l=>{if(!d)return;const s=n.getBoundingClientRect(),u=e.getBoundingClientRect(),c=parseFloat(getComputedStyle(n).columnGap||"0")||0,p=s.width-c,g=l.clientX-s.left,f=Math.round((g-c/2)/p*100),y=$(f,25,75);y!==r&&(r=y,n.style.gridTemplateColumns=`minmax(320px, ${r}fr) minmax(300px, ${100-r}fr)`),a.style.left=`${l.clientX-u.left}px`}),a.addEventListener("pointerup",()=>{d&&(d=!1,a.classList.remove("dragging"),h(),w(e.dataset.ratioKey,r))})})}function W(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const n=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!n.length)return;let t=e.dataset.cycleCurrent||n[0];const r=e.dataset.cycleIcon||"cycle",a=document.createElement("button");a.type="button",a.className="dev-cycle-btn",e.dataset.cycleTitle&&(a.title=e.dataset.cycleTitle);function h(){const d=Math.max(0,n.indexOf(t)),l=o[d];a.innerHTML=l?`${T[r]}<span>${l}</span>`:T[r]}h(),a.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),a.disabled)return;const l=n.indexOf(t);t=n[(l+1)%n.length],h(),a.disabled=!0;const s=e.dataset.cycleKey;w(s,t).then(()=>x(u=>u.includes(`data-cycle-key="${s}"`)&&u.includes(`data-cycle-current="${t}"`))).catch(()=>{a.disabled=!1})}),e.appendChild(a)})}function X(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-height-handle").forEach(e=>{let n;try{n=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!n.length)return;let o;if(e.dataset.handleNumeric!==void 0){const s=Number(e.dataset.handleCurrent);o=n.reduce((u,c,p)=>Math.abs(c.save-s)<Math.abs(n[u].save-s)?p:u,0)}else o=n.findIndex(s=>s.name===e.dataset.handleCurrent);o<0&&(o=0);const t=document.createElement("button");t.type="button",t.className="dev-height-grip",t.innerHTML=T.updown,t.title="Drag to resize",t.addEventListener("click",s=>s.preventDefault());function r(s){n[s].effects.forEach(({target:u,prop:c,value:p})=>{const g=document.getElementById(u);g&&(c.startsWith("--")?g.style.setProperty(c,p):g.style[c]=p)})}r(o);let a=!1,h=0,d=0;const l=70;t.addEventListener("pointerdown",s=>{a=!0,e.classList.add("dragging"),h=s.clientY,d=o;try{t.setPointerCapture(s.pointerId)}catch{}}),t.addEventListener("pointermove",s=>{if(!a)return;const u=Math.round((s.clientY-h)/l),c=Math.min(n.length-1,Math.max(0,d+u));c!==o&&(o=c,r(o))}),t.addEventListener("pointerup",()=>{a&&(a=!1,e.classList.remove("dragging"),w(e.dataset.handleKey,n[o].save))}),e.append(t)})}function G(){const i=document.createElement("style");i.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-map-control").forEach(e=>{const n=document.createElement("input");n.type="text",n.placeholder="Map location…",n.value=e.dataset.mapValue||"",n.title="Google Maps search text for the embedded map",n.addEventListener("keydown",o=>{o.key==="Enter"&&n.blur()}),n.addEventListener("blur",()=>{if(n.value===e.dataset.mapValue)return;const o=n.value;e.dataset.mapValue=o,w(e.dataset.mapKey,o).then(()=>x(t=>t.includes(o)))}),e.appendChild(n)})}function J(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-embed-control").forEach(e=>{const n=document.createElement("button");n.type="button",n.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",n.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const t=o.value;e.dataset.embedValue=t,w(e.dataset.embedKey,t).then(()=>x(()=>!0))}),e.append(o,n)})}function Z(){const i=document.querySelector("[data-services-grid]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),i.querySelectorAll(".services-card").forEach(t=>{const r=t.dataset.serviceId,a=document.createElement("button");a.type="button",a.className="services-card-remove",a.textContent="×",a.title="Remove card",a.addEventListener("click",async h=>{if(h.preventDefault(),h.stopPropagation(),a.disabled=!0,P(t),!(await fetch(`${v}/api/home-services?id=${encodeURIComponent(r)}`,{method:"DELETE"})).ok){a.disabled=!1;return}x(l=>!l.includes(`data-service-id="${r}"`))}),t.appendChild(a)}),i.querySelectorAll(".services-row").forEach(t=>{if(t.children.length>=4)return;const r=t.dataset.rowIndex,a=document.createElement("button");a.type="button",a.className="services-row-add",a.textContent="+",a.title="Add a card to this row",a.addEventListener("click",async h=>{h.preventDefault(),h.stopPropagation(),a.disabled=!0;const d=await fetch(`${v}/api/home-services?row=${encodeURIComponent(r)}`,{method:"POST"});if(!d.ok){a.disabled=!1;return}const l=await d.json();x(s=>s.includes(`data-service-id="${l.id}"`))}),t.appendChild(a)});const n=i.querySelectorAll(".services-row"),o=n[n.length-1];if(o){const t=document.createElement("button");t.type="button",t.className="services-row-add-below",t.textContent="+",t.title="Add a new row of service cards",t.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),t.disabled=!0;const a=await fetch(`${v}/api/home-services`,{method:"POST"});if(!a.ok){t.disabled=!1;return}const h=await a.json();x(d=>d.includes(`data-service-id="${h.id}"`))}),o.appendChild(t)}}function _(){const i=document.querySelector("[data-faq-list]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);async function n(d){(await fetch(`${v}/api/faq?index=${encodeURIComponent(d)}`,{method:"DELETE"})).ok&&x(s=>(s.match(/data-faq-item="\d+"/g)||[]).length<r.length)}async function o(d){(await fetch(`${v}/api/faq?after=${encodeURIComponent(d)}`,{method:"POST"})).ok&&x(s=>(s.match(/data-faq-item="\d+"/g)||[]).length>r.length)}async function t(d,l){(await fetch(`${v}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:d,to:l})})).ok&&x(()=>!0)}const r=Array.from(i.querySelectorAll("[data-faq-item]"));let a=null;function h(){r.forEach(d=>{d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove()})}r.forEach((d,l)=>{d.style.position=d.style.position||"relative";const s=document.createElement("button");s.type="button",s.className="faq-item-remove",s.textContent="×",s.title="Remove question",s.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),s.disabled=!0,n(l)}),d.appendChild(s);const u=document.createElement("div");u.className="faq-item-add";const c=document.createElement("button");c.type="button",c.textContent="+",c.title="Insert a question here",c.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),c.disabled=!0,o(l)}),u.appendChild(c),d.after(u);const p=document.createElement("button");p.type="button",p.className="faq-item-grip",p.title="Drag to reorder",p.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',p.draggable=!0,p.addEventListener("click",g=>g.preventDefault()),p.addEventListener("dragstart",g=>{a=l,g.dataTransfer.setData("text/plain",String(l)),g.dataTransfer.effectAllowed="move",g.dataTransfer.setDragImage(d,12,12),d.classList.add("faq-dragging")}),p.addEventListener("dragend",()=>{a=null,d.classList.remove("faq-dragging"),h()}),d.appendChild(p),d.addEventListener("dragover",g=>{if(a===null||a===l)return;g.preventDefault(),g.dataTransfer.dropEffect="move";const f=d.getBoundingClientRect(),y=g.clientY<f.top+f.height/2;h(),d.classList.add("faq-drop-target");const m=document.createElement("div");m.className="faq-drop-line",y?d.prepend(m):d.append(m)}),d.addEventListener("dragleave",g=>{d.contains(g.relatedTarget)||(d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove())}),d.addEventListener("drop",g=>{g.preventDefault();const f=Number(g.dataTransfer.getData("text/plain"));if(h(),Number.isNaN(f)||f===l)return;const y=d.getBoundingClientRect(),k=g.clientY<y.top+y.height/2?l:l+1,E=k>f?k-1:k;E!==f&&t(f,E)})})}H();O();F();V();K();Y();U();W();X();G();J();Z();_();I();
