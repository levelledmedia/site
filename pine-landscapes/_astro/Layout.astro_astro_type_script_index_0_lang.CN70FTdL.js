const y="http://localhost:3000";function N(a,e,n){return Math.min(n,Math.max(e,a))}function H(a,e){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>a(...o),e)}}function x(a,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(location.pathname+location.search,{cache:"no-store"}).then(d=>d.text()).then(d=>{a(d)||Date.now()>o?location.reload():setTimeout(t,n)}).catch(()=>location.reload())}t()}function P(a,{shouldExist:e,expectedSrc:n,timeoutMs:o=5e3,intervalMs:t=200}={}){const d=Date.now()+o;function i(p){const r=p.querySelector(`[data-image-slot="${CSS.escape(a)}"]`),l=r?r.querySelector("img"):null;return e?l?n?l.getAttribute("src").split("?")[0]===n.split("?")[0]:!0:!1:!l}function f(){function p(){fetch(location.pathname+location.search,{cache:"no-store"}).then(r=>r.text()).then(r=>{const l=new DOMParser().parseFromString(r,"text/html");i(l)||Date.now()>d?location.reload():setTimeout(p,t)}).catch(()=>location.reload())}p()}function c(){fetch(`${y}/api/image/${encodeURIComponent(a)}`,{cache:"no-store"}).then(async p=>{if(!e){if(p.status===404){f();return}if(Date.now()>d){location.reload();return}setTimeout(c,t);return}if(!p.ok){if(Date.now()>d){location.reload();return}setTimeout(c,t);return}(await p.arrayBuffer()).byteLength>0?f():Date.now()>d?location.reload():setTimeout(c,t)}).catch(()=>location.reload())}c()}function $(a){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',a.appendChild(e),e}function A(){window.parent.postMessage({source:"webgen-template",type:"saved"},y)}function b(a,e){return fetch(`${y}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:a,value:e})}).then(n=>(n.ok&&A(),n)).catch(()=>{})}function R(){const a=document.createElement("style");a.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function I(){const a=document.createElement("style");a.textContent=`
    html.webgen-locked .dev-variant-cycle,
    html.webgen-locked .dev-height-handle,
    html.webgen-locked .dev-width-control,
    html.webgen-locked .dev-opacity-control,
    html.webgen-locked .dev-gap-control,
    html.webgen-locked .dev-map-control,
    html.webgen-locked .dev-embed-control,
    html.webgen-locked .dev-logo-picker,
    html.webgen-locked .dev-logo-size-control,
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
    /* Locked is meant to preview the site as it'll actually behave once
       published — real hover/cursor states on buttons and links, not the
       editing affordances. Only the outline (the dashed edit-hover box) is
       forced off here; cursor is handled by scoping initTextEditing's own
       "cursor: text" rule to unlocked mode instead of overriding it back
       here, so a locked [data-edit-key] falls through to whatever cursor
       its own element/class would normally have (pointer for a button or
       link, text-select for plain body copy) — exactly like production,
       where none of this CSS ships at all. */
    html.webgen-locked [data-edit-key] {
      outline: none !important;
    }
  `,document.head.appendChild(a);function e(n){document.documentElement.classList.toggle("webgen-locked",n),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=n?"false":"true"})}window.addEventListener("message",n=>{n.origin===y&&n.data?.source==="webgen-studio"&&n.data?.type==="lock"&&e(!!n.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},y)}function O(){const a=document.createElement("style");a.textContent=`
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
    [data-edit-key] { position: relative; z-index: 2; outline: 2px dashed transparent; outline-offset: 3px; pointer-events: auto; min-height: 1.2em; min-width: 24px; }
    /* Only invite "click to edit" when actually editable — locked mode
       wants real production cursor behavior (pointer on buttons/links,
       nothing special on plain text), so this is scoped out rather than
       being unconditional. */
    html:not(.webgen-locked) [data-edit-key] { cursor: text; }
    [data-edit-key]:hover { outline-color: rgba(37,99,235,.5); }
    [data-edit-key]:focus { outline-color: #2563eb; outline-style: solid; }
    [data-edit-key][data-edit-scope="global"]:hover { outline-color: rgba(217,158,10,.6); }
    [data-edit-key][data-edit-scope="global"]:focus { outline-color: #d99e0a; outline-style: solid; }
  `,document.head.appendChild(a),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let n=e.innerHTML;e.addEventListener("focus",()=>{n=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const t=window.getSelection();if(!t||!t.rangeCount)return;const d=t.getRangeAt(0);d.deleteContents();const i=document.createElement("br");d.insertNode(i),d.insertNode(document.createElement("br")),d.setStartAfter(i),d.collapse(!0),t.removeAllRanges(),t.addRange(d)}),e.addEventListener("blur",()=>{if(/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML===n)return;n=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(t=>{t!==e&&(t.innerHTML=e.innerHTML)});const o=b(e.dataset.editKey,e.innerHTML);e.dataset.navSlugKey&&o.then(()=>V(e))})})}function K(a){return a.replace(/<[^>]*>/g," ").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"page"}function F(a,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(a,{cache:"no-store"}).then(d=>{d.ok||Date.now()>o?location.href=a:setTimeout(t,n)}).catch(()=>{location.href=a})}t()}function V(a){const e=a.dataset.navSlugKey,n=a.dataset.navHrefCurrent,o="/"+K(a.textContent||"");o!==n&&(a.dataset.navHrefCurrent=o,b(e,o).then(t=>{!t||!t.ok||(location.pathname===n?F(o):x(d=>d.includes(`data-nav-href-current="${o}"`)))}))}const q={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>'};function z(a,e,n){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=q[a],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",t=>{t.preventDefault(),n(t)}),o}function D(a){const[e,n]=(a.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(n)?n:50}}function M(a){if(a.dataset.scale)return parseFloat(a.dataset.scale);const e=a.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function U(){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),["dragover","drop"].forEach(e=>{window.addEventListener(e,n=>{n.target.closest("[data-image-slot]")||n.preventDefault()})}),document.querySelectorAll("[data-image-slot]").forEach(e=>{const n=e.dataset.imageSlot,o=n==="logo",t=e.querySelector("img");t&&(t.draggable=!1);const d=e.closest("a");d&&(d.draggable=!1);const i=document.createElement("div");i.className="dev-img-overlay",e.appendChild(i);const f=document.createElement("input");f.type="file",f.accept="image/*",f.style.display="none";async function c(s){if(!s||!s.type.startsWith("image/"))return;i.innerHTML="",$(e);const u=new FormData;u.append("slotId",n),u.append("file",s);const g=await fetch(`${y}/api/upload`,{method:"POST",body:u});if(!g.ok){r();return}const v=await g.json();P(n,{shouldExist:!0,expectedSrc:v.image.src})}f.addEventListener("change",()=>{c(f.files&&f.files[0])}),e.appendChild(f);let p=0;e.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="copy")}),e.addEventListener("dragenter",s=>{s.preventDefault(),p+=1,e.classList.add("dev-img-drag-over")}),e.addEventListener("dragleave",()=>{p=Math.max(0,p-1),p===0&&e.classList.remove("dev-img-drag-over")}),e.addEventListener("drop",s=>{s.preventDefault(),s.stopPropagation(),p=0,e.classList.remove("dev-img-drag-over"),c(s.dataTransfer&&s.dataTransfer.files&&s.dataTransfer.files[0])});function r(){if(i.innerHTML="",!t){i.appendChild(z("replace","Add photo",s=>{s.stopPropagation(),f.click()}));return}if(e.classList.contains("dev-reposition-active")){i.appendChild(z("confirm","Done",s=>{s.stopPropagation(),e.classList.remove("dev-reposition-active"),r()}));return}i.appendChild(z(o?"resize":"reposition",o?"Resize logo":"Reposition image",s=>{if(s.stopPropagation(),e.classList.add("dev-reposition-active"),o&&l){const u=e.getBoundingClientRect();l.style.top=`${u.bottom+10}px`,l.style.left=`${u.left}px`}r()})),i.appendChild(z("remove","Remove image",async s=>{if(s.stopPropagation(),i.innerHTML="",$(e),!(await fetch(`${y}/api/upload?slotId=${encodeURIComponent(n)}`,{method:"DELETE"})).ok){r();return}P(n,{shouldExist:!1})}))}let l=null;if(t){l=document.createElement("input"),l.type="range",l.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",l.min=o?"0.5":"1",l.max=o&&t.dataset.maxScale?t.dataset.maxScale:"3",l.step="0.05",l.value=String(M(t)),l.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation()}),l.addEventListener("mousedown",u=>u.stopPropagation()),e.appendChild(l);const s=H((u,g,v)=>{ignoreNextReload=!0,fetch(`${y}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:n,x:u,y:g,scale:v})}).then(h=>{h.ok&&A()}).catch(()=>{ignoreNextReload=!1})},300);if(l.addEventListener("input",()=>{const u=parseFloat(l.value);if(o)t.dataset.scale=String(u),t.style.height=`${Math.round(44*u)}px`,s(50,50,u);else{const{x:g,y:v}=D(t);t.style.transform=`scale(${u})`,s(g,v,u)}}),!o){let u=!1,g=0,v=0,h={x:50,y:50},m=null,k=0,E=0;t.addEventListener("pointerdown",w=>{if(!e.classList.contains("dev-reposition-active"))return;u=!0,t.setPointerCapture(w.pointerId),m=e.getBoundingClientRect(),g=w.clientX,v=w.clientY,h=D(t);const C=M(t),L=t.naturalWidth,T=t.naturalHeight;if(L&&T&&m.width&&m.height){const S=Math.max(m.width/L,m.height/T),B=L*S*C,j=T*S*C;k=Math.max(B-m.width,0),E=Math.max(j-m.height,0)}else k=m.width,E=m.height}),t.addEventListener("click",w=>{e.classList.contains("dev-reposition-active")&&(w.preventDefault(),w.stopPropagation())}),t.addEventListener("pointermove",w=>{if(!u)return;const C=k>0?(w.clientX-g)/k*100:0,L=E>0?(w.clientY-v)/E*100:0,T=N(h.x-C,0,100),S=N(h.y-L,0,100);t.style.objectPosition=`${T}% ${S}%`}),t.addEventListener("pointerup",()=>{if(!u)return;u=!1;const{x:w,y:C}=D(t);s(w,C,M(t))})}}r()})}function Y(){const a=document.createElement("style");a.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-width-control").forEach(e=>{const n=(e.dataset.widthTarget||"").split(" ").map(d=>document.querySelector(`[data-edit-key="${d}"]`)).filter(Boolean);if(!n.length)return;const o=document.createElement("span");o.textContent="Width";const t=document.createElement("input");t.type="range",t.min="320",t.max="900",t.step="10",t.value=String(parseInt(n[0].style.maxWidth,10)||640),t.addEventListener("input",()=>{n.forEach(d=>{d.style.maxWidth=`${t.value}px`}),b(e.dataset.widthKey,Number(t.value))}),e.append(o,t)})}function W(){const a=document.createElement("style");a.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const n=document.getElementById(e.dataset.opacityTarget||"");if(!n)return;const o=n.dataset.opacityRgb||"0,0,0",t=document.createElement("span");t.textContent="Opacity";const d=document.createElement("input");d.type="range",d.min="0",d.max="1",d.step="0.05",d.value=e.dataset.opacityValue||"0.4",d.addEventListener("input",()=>{n.style.backgroundColor=`rgba(${o},${d.value})`,b(e.dataset.opacityKey,Number(d.value))}),e.append(t,d)})}function X(){const a=document.createElement("style");a.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-gap-control").forEach(e=>{const n=document.getElementById(e.dataset.gapTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Gutter";const t=document.createElement("input");t.type="range",t.min="0",t.max="160",t.step="4",t.value=e.dataset.gapValue||"56",t.addEventListener("input",()=>{n.style.gap=`${t.value}px`,b(e.dataset.gapKey,Number(t.value))}),e.append(o,t)})}function G(){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),document.querySelectorAll(".dev-column-ratio-handle").forEach(e=>{const n=document.getElementById(e.dataset.ratioTarget||"");if(!n)return;const o=n.children[0],t=n.children[1];if(!o||!t)return;let d=Number(e.dataset.ratioCurrent)||59;const i=document.createElement("button");i.type="button",i.className="dev-ratio-grip",i.innerHTML=q.widthToggle,i.title="Drag to resize columns",i.addEventListener("click",p=>p.preventDefault()),e.appendChild(i);function f(){const p=e.getBoundingClientRect(),r=o.getBoundingClientRect(),l=t.getBoundingClientRect(),s=(r.right+l.left)/2,u=(r.top+r.bottom)/2;i.style.left=`${s-p.left}px`,i.style.top=`${u-p.top}px`}f(),window.addEventListener("resize",f);let c=!1;i.addEventListener("pointerdown",p=>{c=!0,i.classList.add("dragging");try{i.setPointerCapture(p.pointerId)}catch{}}),i.addEventListener("pointermove",p=>{if(!c)return;const r=n.getBoundingClientRect(),l=e.getBoundingClientRect(),s=parseFloat(getComputedStyle(n).columnGap||"0")||0,u=r.width-s,g=p.clientX-r.left,v=Math.round((g-s/2)/u*100),h=N(v,25,75);h!==d&&(d=h,n.style.gridTemplateColumns=`minmax(320px, ${d}fr) minmax(300px, ${100-d}fr)`),i.style.left=`${p.clientX-l.left}px`}),i.addEventListener("pointerup",()=>{c&&(c=!1,i.classList.remove("dragging"),f(),b(e.dataset.ratioKey,d))})})}function J(){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const n=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!n.length)return;let t=e.dataset.cycleCurrent||n[0];const d=e.dataset.cycleIcon||"cycle",i=document.createElement("button");i.type="button",i.className="dev-cycle-btn",e.dataset.cycleTitle&&(i.title=e.dataset.cycleTitle);function f(){const c=Math.max(0,n.indexOf(t)),p=o[c];i.innerHTML=p?`${q[d]}<span>${p}</span>`:q[d]}f(),i.addEventListener("click",c=>{if(c.preventDefault(),c.stopPropagation(),i.disabled)return;const p=n.indexOf(t);t=n[(p+1)%n.length],f(),i.disabled=!0;const r=e.dataset.cycleKey;b(r,t).then(()=>x(l=>l.includes(`data-cycle-key="${r}"`)&&l.includes(`data-cycle-current="${t}"`))).catch(()=>{i.disabled=!1})}),e.appendChild(i)})}function Z(){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),document.querySelectorAll(".dev-height-handle").forEach(e=>{let n;try{n=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!n.length)return;let o;if(e.dataset.handleNumeric!==void 0){const r=Number(e.dataset.handleCurrent);o=n.reduce((l,s,u)=>Math.abs(s.save-r)<Math.abs(n[l].save-r)?u:l,0)}else o=n.findIndex(r=>r.name===e.dataset.handleCurrent);o<0&&(o=0);const t=document.createElement("button");t.type="button",t.className="dev-height-grip",t.innerHTML=q.updown,t.title="Drag to resize",t.addEventListener("click",r=>r.preventDefault());function d(r){n[r].effects.forEach(({target:l,prop:s,value:u})=>{const g=document.getElementById(l);g&&(s.startsWith("--")?g.style.setProperty(s,u):g.style[s]=u)})}d(o);let i=!1,f=0,c=0;const p=70;t.addEventListener("pointerdown",r=>{i=!0,e.classList.add("dragging"),f=r.clientY,c=o;try{t.setPointerCapture(r.pointerId)}catch{}}),t.addEventListener("pointermove",r=>{if(!i)return;const l=Math.round((r.clientY-f)/p),s=Math.min(n.length-1,Math.max(0,c+l));s!==o&&(o=s,d(o))}),t.addEventListener("pointerup",()=>{i&&(i=!1,e.classList.remove("dragging"),b(e.dataset.handleKey,n[o].save))}),e.append(t)})}function _(){const a=document.createElement("style");a.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-map-control").forEach(e=>{const n=document.createElement("input");n.type="text",n.placeholder="Map location…",n.value=e.dataset.mapValue||"",n.title="Google Maps search text for the embedded map",n.addEventListener("keydown",o=>{o.key==="Enter"&&n.blur()}),n.addEventListener("blur",()=>{if(n.value===e.dataset.mapValue)return;const o=n.value;e.dataset.mapValue=o,b(e.dataset.mapKey,o).then(()=>x(t=>t.includes(o)))}),e.appendChild(n)})}function Q(){const a=document.createElement("style");a.textContent=`
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
  `,document.head.appendChild(a),document.querySelectorAll(".dev-embed-control").forEach(e=>{const n=document.createElement("button");n.type="button",n.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",n.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const t=o.value;e.dataset.embedValue=t,b(e.dataset.embedKey,t).then(()=>x(()=>!0))}),e.append(o,n)})}function ee(){const a=document.querySelector("[data-services-grid]");if(!a)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),a.querySelectorAll(".services-card").forEach(t=>{const d=t.dataset.serviceId,i=document.createElement("button");i.type="button",i.className="services-card-remove",i.textContent="×",i.title="Remove card",i.addEventListener("click",async f=>{if(f.preventDefault(),f.stopPropagation(),i.disabled=!0,$(t),!(await fetch(`${y}/api/home-services?id=${encodeURIComponent(d)}`,{method:"DELETE"})).ok){i.disabled=!1;return}x(p=>!p.includes(`data-service-id="${d}"`))}),t.appendChild(i)}),a.querySelectorAll(".services-row").forEach(t=>{if(t.children.length>=4)return;const d=t.dataset.rowIndex,i=document.createElement("button");i.type="button",i.className="services-row-add",i.textContent="+",i.title="Add a card to this row",i.addEventListener("click",async f=>{f.preventDefault(),f.stopPropagation(),i.disabled=!0;const c=await fetch(`${y}/api/home-services?row=${encodeURIComponent(d)}`,{method:"POST"});if(!c.ok){i.disabled=!1;return}const p=await c.json();x(r=>r.includes(`data-service-id="${p.id}"`))}),t.appendChild(i)});const n=a.querySelectorAll(".services-row"),o=n[n.length-1];if(o){const t=document.createElement("button");t.type="button",t.className="services-row-add-below",t.textContent="+",t.title="Add a new row of service cards",t.addEventListener("click",async d=>{d.preventDefault(),d.stopPropagation(),t.disabled=!0;const i=await fetch(`${y}/api/home-services`,{method:"POST"});if(!i.ok){t.disabled=!1;return}const f=await i.json();x(c=>c.includes(`data-service-id="${f.id}"`))}),o.appendChild(t)}}function te(){const a=document.querySelector("[data-faq-list]");if(!a)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);async function n(c){(await fetch(`${y}/api/faq?index=${encodeURIComponent(c)}`,{method:"DELETE"})).ok&&x(r=>(r.match(/data-faq-item="\d+"/g)||[]).length<d.length)}async function o(c){(await fetch(`${y}/api/faq?after=${encodeURIComponent(c)}`,{method:"POST"})).ok&&x(r=>(r.match(/data-faq-item="\d+"/g)||[]).length>d.length)}async function t(c,p){(await fetch(`${y}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:c,to:p})})).ok&&x(()=>!0)}const d=Array.from(a.querySelectorAll("[data-faq-item]"));let i=null;function f(){d.forEach(c=>{c.classList.remove("faq-drop-target"),c.querySelector(":scope > .faq-drop-line")?.remove()})}d.forEach((c,p)=>{c.style.position=c.style.position||"relative";const r=document.createElement("button");r.type="button",r.className="faq-item-remove",r.textContent="×",r.title="Remove question",r.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),r.disabled=!0,n(p)}),c.appendChild(r);const l=document.createElement("div");l.className="faq-item-add";const s=document.createElement("button");s.type="button",s.textContent="+",s.title="Insert a question here",s.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),s.disabled=!0,o(p)}),l.appendChild(s),c.after(l);const u=document.createElement("button");u.type="button",u.className="faq-item-grip",u.title="Drag to reorder",u.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',u.draggable=!0,u.addEventListener("click",g=>g.preventDefault()),u.addEventListener("dragstart",g=>{i=p,g.dataTransfer.setData("text/plain",String(p)),g.dataTransfer.effectAllowed="move",g.dataTransfer.setDragImage(c,12,12),c.classList.add("faq-dragging")}),u.addEventListener("dragend",()=>{i=null,c.classList.remove("faq-dragging"),f()}),c.appendChild(u),c.addEventListener("dragover",g=>{if(i===null||i===p)return;g.preventDefault(),g.dataTransfer.dropEffect="move";const v=c.getBoundingClientRect(),h=g.clientY<v.top+v.height/2;f(),c.classList.add("faq-drop-target");const m=document.createElement("div");m.className="faq-drop-line",h?c.prepend(m):c.append(m)}),c.addEventListener("dragleave",g=>{c.contains(g.relatedTarget)||(c.classList.remove("faq-drop-target"),c.querySelector(":scope > .faq-drop-line")?.remove())}),c.addEventListener("drop",g=>{g.preventDefault();const v=Number(g.dataTransfer.getData("text/plain"));if(f(),Number.isNaN(v)||v===p)return;const h=c.getBoundingClientRect(),k=g.clientY<h.top+h.height/2?p:p+1,E=k>v?k-1:k;E!==v&&t(v,E)})})}function ne(){const a=document.createElement("style");a.textContent=`
    .dev-logo-picker { position: relative; opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-logo-picker,
    [data-dev-hover-zone]:focus-within .dev-logo-picker,
    .dev-logo-picker.open { opacity: 1; pointer-events: auto; }
    .dev-logo-picker-toggle {
      font: 12px/1 -apple-system, sans-serif; padding: 8px 12px; border-radius: 4px;
      border: none; background: rgba(17,17,17,.85); color: #fff; cursor: pointer;
    }
    .dev-logo-picker-toggle:hover { background: #111; }
    .dev-logo-picker-panel {
      display: none; position: absolute; top: 100%; left: 0; margin-top: 8px;
      background: rgba(17,17,17,.95); border-radius: 6px; padding: 6px;
      width: 200px; max-height: 260px; overflow-y: auto;
    }
    .dev-logo-picker.open .dev-logo-picker-panel { display: block; }
    /* No thumbnails — this list is meant to stay compact/scannable as the
       library of logos grows, not read as a visual gallery. */
    .dev-logo-picker-row {
      display: flex; align-items: center; gap: 6px; padding: 6px 6px;
      font: 12px/1.2 -apple-system, sans-serif; color: #fff; cursor: pointer;
      border-radius: 4px;
    }
    .dev-logo-picker-row:hover { background: rgba(255,255,255,.08); }
    .dev-logo-picker-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
    .dev-logo-picker-divider { height: 1px; background: rgba(255,255,255,.15); margin: 4px 2px; }
    .dev-logo-picker-empty { padding: 6px; font: 11px/1.3 -apple-system, sans-serif; color: rgba(255,255,255,.55); }
    .dev-logo-picker-add {
      display: flex; align-items: center; gap: 6px; width: 100%; padding: 6px;
      font: 12px/1.2 -apple-system, sans-serif; color: #fff; background: none;
      border: 1px dashed rgba(255,255,255,.35); border-radius: 4px; cursor: pointer;
      box-sizing: border-box;
    }
    .dev-logo-picker-add:hover { background: rgba(255,255,255,.08); }
    .dev-logo-picker-add:disabled { opacity: .6; cursor: default; }
    /* Only checked (selected) rows get a grip — order is only meaningful
       among logos that are actually showing. */
    .dev-logo-picker-grip {
      flex: none; width: 16px; height: 16px; display: flex; align-items: center;
      justify-content: center; color: rgba(255,255,255,.5); cursor: grab; touch-action: none;
    }
    .dev-logo-picker-grip:active { cursor: grabbing; }
    .dev-logo-picker-row.dragging { opacity: 0.4; }
    .dev-logo-picker-row.drop-target { outline: 1.5px dashed rgba(255,255,255,.5); outline-offset: -2px; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-logo-picker").forEach(e=>{const n=(e.dataset.logoOptions||"").split(",").filter(Boolean);let o=(e.dataset.logoCurrent||"").split(",").filter(r=>r&&n.includes(r));const t=document.createElement("button");t.type="button",t.className="dev-logo-picker-toggle",t.textContent="Choose logos";const d=document.createElement("div");d.className="dev-logo-picker-panel";function i(){const r=o.join(",");return e.dataset.logoCurrent=r,b(e.dataset.logoKey,r).then(()=>x(l=>l.includes(`data-logo-key="${e.dataset.logoKey}"`)&&l.includes(`data-logo-current="${r}"`)))}function f(){if(d.innerHTML="",!o.length){const l=document.createElement("div");l.className="dev-logo-picker-empty",l.textContent="No logos selected — showing placeholders.",d.appendChild(l)}o.forEach(l=>{const s=document.createElement("label");s.className="dev-logo-picker-row",s.draggable=!0;const u=document.createElement("span");u.className="dev-logo-picker-grip",u.innerHTML="⋮⋮",u.title="Drag to reorder";const g=document.createElement("input");g.type="checkbox",g.checked=!0,g.addEventListener("click",h=>h.stopPropagation()),g.addEventListener("change",()=>{o=o.filter(h=>h!==l),f(),i()});const v=document.createElement("span");v.textContent=l,s.append(u,g,v),d.appendChild(s),s.addEventListener("dragstart",h=>{h.dataTransfer.setData("text/plain",l),h.dataTransfer.effectAllowed="move",s.classList.add("dragging")}),s.addEventListener("dragend",()=>{s.classList.remove("dragging"),d.querySelectorAll(".drop-target").forEach(h=>h.classList.remove("drop-target"))}),s.addEventListener("dragover",h=>{o.includes(l)&&(h.preventDefault(),h.dataTransfer.dropEffect="move",s.classList.add("drop-target"))}),s.addEventListener("dragleave",()=>s.classList.remove("drop-target")),s.addEventListener("drop",h=>{h.preventDefault(),s.classList.remove("drop-target");const m=h.dataTransfer.getData("text/plain");!m||m===l||!o.includes(m)||(o=o.filter(k=>k!==m),o.splice(o.indexOf(l),0,m),f(),i())})});const r=n.filter(l=>!o.includes(l));if(o.length&&r.length){const l=document.createElement("div");l.className="dev-logo-picker-divider",d.appendChild(l)}if(r.forEach(l=>{const s=document.createElement("label");s.className="dev-logo-picker-row";const u=document.createElement("input");u.type="checkbox",u.checked=!1,u.addEventListener("change",()=>{o=[...o,l],f(),i()});const g=document.createElement("span");g.textContent=l,s.append(u,g),d.appendChild(s)}),r.length||o.length){const l=document.createElement("div");l.className="dev-logo-picker-divider",d.appendChild(l)}d.append(p,c)}const c=document.createElement("input");c.type="file",c.accept="image/png,image/jpeg,image/webp,image/svg+xml",c.style.display="none";const p=document.createElement("button");p.type="button",p.className="dev-logo-picker-add",p.textContent="+ Add custom logo…",p.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),c.click()}),c.addEventListener("change",async()=>{const r=c.files&&c.files[0];if(c.value="",!!r){p.disabled=!0,p.textContent="Uploading…";try{const l=new FormData;l.append("file",r);const s=await fetch(`${y}/api/credentials-logo`,{method:"POST",body:l});if(!s.ok)throw new Error("upload failed");const u=await s.json();o=[...o,u.filename],e.dataset.logoCurrent=o.join(","),await b(e.dataset.logoKey,o.join(",")),x(g=>g.includes(u.filename))}catch{p.disabled=!1,p.textContent="+ Add custom logo…"}}}),t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",r=>{e.contains(r.target)||e.classList.remove("open")}),f(),e.append(t,d)})}function oe(){const a=document.createElement("style");a.textContent=`
    .dev-logo-size-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-logo-size-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-logo-size-control,
    [data-dev-hover-zone]:focus-within .dev-logo-size-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(a),document.querySelectorAll(".dev-logo-size-control").forEach(e=>{const n=document.getElementById(e.dataset.sizeTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Logo size";const t=document.createElement("input");t.type="range",t.min="60",t.max="160",t.step="4",t.value=e.dataset.sizeValue||"104",t.addEventListener("input",()=>{n.style.setProperty("--logo-size",`${t.value}px`),b(e.dataset.sizeKey,Number(t.value))}),e.append(o,t)})}R();O();U();Y();W();X();G();J();Z();_();Q();ne();oe();ee();te();I();
