const y="http://localhost:3000";function M(d,e,n){return Math.min(n,Math.max(e,d))}function R(d,e){let n;return(...o)=>{clearTimeout(n),n=setTimeout(()=>d(...o),e)}}function b(d,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(location.pathname+location.search,{cache:"no-store"}).then(r=>r.text()).then(r=>{d(r)||Date.now()>o?location.reload():setTimeout(t,n)}).catch(()=>location.reload())}t()}function B(d,{shouldExist:e,expectedSrc:n,timeoutMs:o=5e3,intervalMs:t=200}={}){const r=Date.now()+o;function c(a){const i=a.querySelector(`[data-image-slot="${CSS.escape(d)}"]`),u=i?i.querySelector("img"):null;return e?u?n?u.getAttribute("src").split("?")[0]===n.split("?")[0]:!0:!1:!u}function h(){function a(){fetch(location.pathname+location.search,{cache:"no-store"}).then(i=>i.text()).then(i=>{const u=new DOMParser().parseFromString(i,"text/html");c(u)||Date.now()>r?location.reload():setTimeout(a,t)}).catch(()=>location.reload())}a()}function s(){fetch(`${y}/api/image/${encodeURIComponent(d)}`,{cache:"no-store"}).then(async a=>{if(!e){if(a.status===404){h();return}if(Date.now()>r){location.reload();return}setTimeout(s,t);return}if(!a.ok){if(Date.now()>r){location.reload();return}setTimeout(s,t);return}(await a.arrayBuffer()).byteLength>0?h():Date.now()>r?location.reload():setTimeout(s,t)}).catch(()=>location.reload())}s()}function P(d){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',d.appendChild(e),e}function j(){window.parent.postMessage({source:"webgen-template",type:"saved"},y)}function x(d,e){return fetch(`${y}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:d,value:e})}).then(n=>(n.ok&&j(),n)).catch(()=>{})}function O(){const d=document.createElement("style");d.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function F(){const d=document.createElement("style");d.textContent=`
    html.webgen-locked .dev-variant-cycle,
    html.webgen-locked .dev-height-handle,
    html.webgen-locked .dev-width-control,
    html.webgen-locked .dev-opacity-control,
    html.webgen-locked .dev-gap-control,
    html.webgen-locked .dev-column-ratio-handle,
    html.webgen-locked .dev-map-control,
    html.webgen-locked .dev-embed-control,
    html.webgen-locked .dev-logo-picker,
    html.webgen-locked .dev-logo-size-control,
    html.webgen-locked .dev-img-overlay,
    html.webgen-locked .dev-img-scale,
    html.webgen-locked .dev-link-open,
    html.webgen-locked .dev-gallery-add,
    html.webgen-locked .dev-gallery-cycle,
    html.webgen-locked .gallery-item-grip,
    html.webgen-locked .filter-pill-empty,
    html.webgen-locked .dev-image-placeholder,
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
  `,document.head.appendChild(d);function e(n){document.documentElement.classList.toggle("webgen-locked",n),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=n?"false":"true"})}window.addEventListener("message",n=>{n.origin===y&&n.data?.source==="webgen-studio"&&n.data?.type==="lock"&&e(!!n.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},y)}function K(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let n=e.innerHTML;e.addEventListener("focus",()=>{n=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const t=window.getSelection();if(!t||!t.rangeCount)return;const r=t.getRangeAt(0);r.deleteContents();const c=document.createElement("br");r.insertNode(c),r.insertNode(document.createElement("br")),r.setStartAfter(c),r.collapse(!0),t.removeAllRanges(),t.addRange(r)}),e.addEventListener("blur",()=>{if(/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML===n)return;n=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(t=>{t!==e&&(t.innerHTML=e.innerHTML)});const o=x(e.dataset.editKey,e.innerHTML);e.dataset.navSlugKey&&o.then(()=>W(e))})})}function V(d){return d.replace(/<[^>]*>/g," ").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"page"}function U(d,{timeoutMs:e=5e3,intervalMs:n=200}={}){const o=Date.now()+e;function t(){fetch(d,{cache:"no-store"}).then(r=>{r.ok||Date.now()>o?location.href=d:setTimeout(t,n)}).catch(()=>{location.href=d})}t()}function W(d){const e=d.dataset.navSlugKey,n=d.dataset.navHrefCurrent,o="/"+V(d.textContent||"");o!==n&&(d.dataset.navHrefCurrent=o,x(e,o).then(t=>{!t||!t.ok||(location.pathname===n?U(o):b(r=>r.includes(`data-nav-href-current="${o}"`)))}))}const L={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>',chevronLeft:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',chevronRight:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'};function N(d,e,n){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=L[d],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",t=>{t.preventDefault(),n(t)}),o}function $(d){const[e,n]=(d.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(n)?n:50}}function A(d){if(d.dataset.scale)return parseFloat(d.dataset.scale);const e=d.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function X(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),["dragover","drop"].forEach(e=>{window.addEventListener(e,n=>{n.target.closest("[data-image-slot]")||n.preventDefault()})}),document.querySelectorAll("[data-image-slot]").forEach(e=>{const n=e.dataset.imageSlot,o=n==="logo",t=e.dataset.imageNatural==="1",r=e.querySelector("img");r&&(r.draggable=!1);const c=e.closest("a");c&&(c.draggable=!1);const h=document.createElement("div");h.className="dev-img-overlay",e.appendChild(h);const s=document.createElement("input");s.type="file",s.accept="image/*",s.style.display="none";async function a(l){if(!l||!l.type.startsWith("image/"))return;h.innerHTML="";const f=P(e);try{const v=new FormData;v.append("slotId",n),v.append("file",l);const m=await fetch(`${y}/api/upload`,{method:"POST",body:v});if(!m.ok)throw new Error("upload failed");const w=await m.json();B(n,{shouldExist:!0,expectedSrc:w.image.src})}catch{f.remove(),p()}}s.addEventListener("change",()=>{a(s.files&&s.files[0])}),e.appendChild(s);function i(l){return!!l.dataTransfer&&Array.from(l.dataTransfer.types||[]).includes("Files")}let u=0;e.addEventListener("dragover",l=>{i(l)&&(l.preventDefault(),l.dataTransfer&&(l.dataTransfer.dropEffect="copy"))}),e.addEventListener("dragenter",l=>{i(l)&&(l.preventDefault(),u+=1,e.classList.add("dev-img-drag-over"))}),e.addEventListener("dragleave",()=>{u=Math.max(0,u-1),u===0&&e.classList.remove("dev-img-drag-over")}),e.addEventListener("drop",l=>{i(l)&&(l.preventDefault(),l.stopPropagation(),u=0,e.classList.remove("dev-img-drag-over"),a(l.dataTransfer&&l.dataTransfer.files&&l.dataTransfer.files[0]))});function p(){if(h.innerHTML="",!r){h.appendChild(N("replace","Add photo",l=>{l.stopPropagation(),s.click()}));return}if(!t){if(e.classList.contains("dev-reposition-active")){h.appendChild(N("confirm","Done",l=>{l.stopPropagation(),e.classList.remove("dev-reposition-active"),p()}));return}h.appendChild(N(o?"resize":"reposition",o?"Resize logo":"Reposition image",l=>{if(l.stopPropagation(),e.classList.add("dev-reposition-active"),o&&g){const f=e.getBoundingClientRect();g.style.top=`${f.bottom+10}px`,g.style.left=`${f.left}px`}p()}))}h.appendChild(N("remove","Remove image",async l=>{l.stopPropagation(),h.innerHTML="";const f=P(e);try{if(!(await fetch(`${y}/api/upload?slotId=${encodeURIComponent(n)}`,{method:"DELETE"})).ok)throw new Error("remove failed");B(n,{shouldExist:!1})}catch{f.remove(),p()}}))}let g=null;if(r&&!t){g=document.createElement("input"),g.type="range",g.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",g.min=o?"0.5":"1",g.max=o&&r.dataset.maxScale?r.dataset.maxScale:"3",g.step="0.05",g.value=String(A(r)),g.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation()}),g.addEventListener("mousedown",f=>f.stopPropagation()),e.appendChild(g);const l=R((f,v,m)=>{ignoreNextReload=!0,fetch(`${y}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:n,x:f,y:v,scale:m})}).then(w=>{w.ok&&j()}).catch(()=>{ignoreNextReload=!1})},300);if(g.addEventListener("input",()=>{const f=parseFloat(g.value);if(o)r.dataset.scale=String(f),r.style.height=`${Math.round(44*f)}px`,l(50,50,f);else{const{x:v,y:m}=$(r);r.style.transform=`scale(${f})`,l(v,m,f)}}),!o){let f=!1,v=0,m=0,w={x:50,y:50},k=null,q=0,D=0;r.addEventListener("pointerdown",E=>{if(!e.classList.contains("dev-reposition-active"))return;f=!0,r.setPointerCapture(E.pointerId),k=e.getBoundingClientRect(),v=E.clientX,m=E.clientY,w=$(r);const C=A(r),T=r.naturalWidth,S=r.naturalHeight;if(T&&S&&k.width&&k.height){const z=Math.max(k.width/T,k.height/S),I=T*z*C,H=S*z*C;q=Math.max(I-k.width,0),D=Math.max(H-k.height,0)}else q=k.width,D=k.height}),r.addEventListener("click",E=>{e.classList.contains("dev-reposition-active")&&(E.preventDefault(),E.stopPropagation())}),r.addEventListener("pointermove",E=>{if(!f)return;const C=q>0?(E.clientX-v)/q*100:0,T=D>0?(E.clientY-m)/D*100:0,S=M(w.x-C,0,100),z=M(w.y-T,0,100);r.style.objectPosition=`${S}% ${z}%`}),r.addEventListener("pointerup",()=>{if(!f)return;f=!1;const{x:E,y:C}=$(r);l(E,C,A(r))})}}p()})}function Y(){const d=document.createElement("style");d.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-width-control").forEach(e=>{const n=(e.dataset.widthTarget||"").split(" ").map(r=>document.querySelector(`[data-edit-key="${r}"]`)).filter(Boolean);if(!n.length)return;const o=document.createElement("span");o.textContent="Width";const t=document.createElement("input");t.type="range",t.min="320",t.max="900",t.step="10",t.value=String(parseInt(n[0].style.maxWidth,10)||640),t.addEventListener("input",()=>{n.forEach(r=>{r.style.maxWidth=`${t.value}px`}),x(e.dataset.widthKey,Number(t.value))}),e.append(o,t)})}function G(){const d=document.createElement("style");d.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const n=document.getElementById(e.dataset.opacityTarget||"");if(!n)return;const o=n.dataset.opacityRgb||"0,0,0",t=document.createElement("span");t.textContent="Opacity";const r=document.createElement("input");r.type="range",r.min="0",r.max="1",r.step="0.05",r.value=e.dataset.opacityValue||"0.4",r.addEventListener("input",()=>{n.style.backgroundColor=`rgba(${o},${r.value})`,x(e.dataset.opacityKey,Number(r.value))}),e.append(t,r)})}function J(){const d=document.createElement("style");d.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-gap-control").forEach(e=>{const n=document.getElementById(e.dataset.gapTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Gutter";const t=document.createElement("input");t.type="range",t.min="0",t.max="160",t.step="4",t.value=e.dataset.gapValue||"56",t.addEventListener("input",()=>{n.style.gap=`${t.value}px`,x(e.dataset.gapKey,Number(t.value))}),e.append(o,t)})}function Z(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll(".dev-column-ratio-handle").forEach(e=>{const n=document.getElementById(e.dataset.ratioTarget||"");if(!n)return;const o=n.children[0],t=n.children[1];if(!o||!t)return;let r=Number(e.dataset.ratioCurrent)||59;const c=document.createElement("button");c.type="button",c.className="dev-ratio-grip",c.innerHTML=L.widthToggle,c.title="Drag to resize columns",c.addEventListener("click",a=>a.preventDefault()),e.appendChild(c);function h(){const a=e.getBoundingClientRect(),i=o.getBoundingClientRect(),u=t.getBoundingClientRect(),p=(i.right+u.left)/2,g=(i.top+i.bottom)/2;c.style.left=`${p-a.left}px`,c.style.top=`${g-a.top}px`}h(),window.addEventListener("resize",h);let s=!1;c.addEventListener("pointerdown",a=>{s=!0,c.classList.add("dragging");try{c.setPointerCapture(a.pointerId)}catch{}}),c.addEventListener("pointermove",a=>{if(!s)return;const i=n.getBoundingClientRect(),u=e.getBoundingClientRect(),p=parseFloat(getComputedStyle(n).columnGap||"0")||0,g=i.width-p,l=a.clientX-i.left,f=Math.round((l-p/2)/g*100),v=M(f,25,75);v!==r&&(r=v,n.style.gridTemplateColumns=`minmax(320px, ${r}fr) minmax(300px, ${100-r}fr)`),c.style.left=`${a.clientX-u.left}px`}),c.addEventListener("pointerup",()=>{s&&(s=!1,c.classList.remove("dragging"),h(),x(e.dataset.ratioKey,r))})})}function _(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const n=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!n.length)return;let t=e.dataset.cycleCurrent||n[0];const r=e.dataset.cycleIcon||"cycle",c=document.createElement("button");c.type="button",c.className="dev-cycle-btn",e.dataset.cycleTitle&&(c.title=e.dataset.cycleTitle);function h(){const s=Math.max(0,n.indexOf(t)),a=o[s];c.innerHTML=a?`${L[r]}<span>${a}</span>`:L[r]}h(),c.addEventListener("click",s=>{if(s.preventDefault(),s.stopPropagation(),c.disabled)return;const a=n.indexOf(t);t=n[(a+1)%n.length],h(),c.disabled=!0;const i=e.dataset.cycleKey;x(i,t).then(()=>b(u=>u.includes(`data-cycle-key="${i}"`)&&u.includes(`data-cycle-current="${t}"`))).catch(()=>{c.disabled=!1})}),e.appendChild(c)})}function Q(){const d=document.createElement("style");d.textContent=`
    .dev-gallery-cycle { opacity: 0; pointer-events: none; transition: opacity .12s ease; display: flex; gap: 4px; }
    [data-dev-hover-zone]:hover .dev-gallery-cycle,
    [data-dev-hover-zone]:focus-within .dev-gallery-cycle { opacity: 1; pointer-events: auto; }
    .dev-gallery-cycle-btn {
      width: 26px; height: 26px; padding: 0; border-radius: 4px; border: none;
      background: rgba(17,17,17,.85); color: #fff; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
    }
    .dev-gallery-cycle-btn:hover { background: #111; }
    .dev-gallery-cycle-btn:disabled { opacity: .5; cursor: default; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-gallery-cycle").forEach(e=>{const n=(e.dataset.cycleIds||"").split(",").filter(Boolean);if(n.length<2)return;let o=Number(e.dataset.cycleCurrentIndex);(!Number.isFinite(o)||o<0)&&(o=0);const t=e.dataset.cycleWorkKey,r=document.createElement("button");r.type="button",r.className="dev-gallery-cycle-btn",r.title="Previous photo",r.setAttribute("aria-label","Previous photo"),r.innerHTML=L.chevronLeft;const c=document.createElement("button");c.type="button",c.className="dev-gallery-cycle-btn",c.title="Next photo",c.setAttribute("aria-label","Next photo"),c.innerHTML=L.chevronRight;function h(s){o=(o+s+n.length)%n.length;const a=n[o];r.disabled=!0,c.disabled=!0,x(t,a).then(()=>b(i=>i.includes(`data-cycle-work-key="${t}"`)&&i.includes(`data-cycle-current-index="${o}"`))).catch(()=>{r.disabled=!1,c.disabled=!1})}r.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),r.disabled||h(-1)}),c.addEventListener("click",s=>{s.preventDefault(),s.stopPropagation(),c.disabled||h(1)}),e.append(r,c)})}function ee(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll(".dev-height-handle").forEach(e=>{let n;try{n=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!n.length)return;let o;if(e.dataset.handleNumeric!==void 0){const i=Number(e.dataset.handleCurrent);o=n.reduce((u,p,g)=>Math.abs(p.save-i)<Math.abs(n[u].save-i)?g:u,0)}else o=n.findIndex(i=>i.name===e.dataset.handleCurrent);o<0&&(o=0);const t=document.createElement("button");t.type="button",t.className="dev-height-grip",t.innerHTML=L.updown,t.title="Drag to resize",t.addEventListener("click",i=>i.preventDefault());function r(i){n[i].effects.forEach(({target:u,prop:p,value:g})=>{const l=document.getElementById(u);l&&(p.startsWith("--")?l.style.setProperty(p,g):l.style[p]=g)})}r(o);let c=!1,h=0,s=0;const a=70;t.addEventListener("pointerdown",i=>{c=!0,e.classList.add("dragging"),h=i.clientY,s=o;try{t.setPointerCapture(i.pointerId)}catch{}}),t.addEventListener("pointermove",i=>{if(!c)return;const u=Math.round((i.clientY-h)/a),p=Math.min(n.length-1,Math.max(0,s+u));p!==o&&(o=p,r(o))}),t.addEventListener("pointerup",()=>{c&&(c=!1,e.classList.remove("dragging"),x(e.dataset.handleKey,n[o].save))}),e.append(t)})}function te(){const d=document.createElement("style");d.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-map-control").forEach(e=>{const n=document.createElement("input");n.type="text",n.placeholder="Map location…",n.value=e.dataset.mapValue||"",n.title="Google Maps search text for the embedded map",n.addEventListener("keydown",o=>{o.key==="Enter"&&n.blur()}),n.addEventListener("blur",()=>{if(n.value===e.dataset.mapValue)return;const o=n.value;e.dataset.mapValue=o,x(e.dataset.mapKey,o).then(()=>b(t=>t.includes(o)))}),e.appendChild(n)})}function ne(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll(".dev-embed-control").forEach(e=>{const n=document.createElement("button");n.type="button",n.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",n.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const t=o.value;e.dataset.embedValue=t,x(e.dataset.embedKey,t).then(()=>b(()=>!0))}),e.append(o,n)})}function oe(){const d=document.querySelector("[data-services-grid]");if(!d)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),d.querySelectorAll(".services-card").forEach(t=>{const r=t.dataset.serviceId,c=document.createElement("button");c.type="button",c.className="services-card-remove",c.textContent="×",c.title="Remove card",c.addEventListener("click",async h=>{if(h.preventDefault(),h.stopPropagation(),c.disabled=!0,P(t),!(await fetch(`${y}/api/home-services?id=${encodeURIComponent(r)}`,{method:"DELETE"})).ok){c.disabled=!1;return}b(a=>!a.includes(`data-service-id="${r}"`))}),t.appendChild(c)}),d.querySelectorAll(".services-row").forEach(t=>{if(t.children.length>=4)return;const r=t.dataset.rowIndex,c=document.createElement("button");c.type="button",c.className="services-row-add",c.textContent="+",c.title="Add a card to this row",c.addEventListener("click",async h=>{h.preventDefault(),h.stopPropagation(),c.disabled=!0;const s=await fetch(`${y}/api/home-services?row=${encodeURIComponent(r)}`,{method:"POST"});if(!s.ok){c.disabled=!1;return}const a=await s.json();b(i=>i.includes(`data-service-id="${a.id}"`))}),t.appendChild(c)});const n=d.querySelectorAll(".services-row"),o=n[n.length-1];if(o){const t=document.createElement("button");t.type="button",t.className="services-row-add-below",t.textContent="+",t.title="Add a new row of service cards",t.addEventListener("click",async r=>{r.preventDefault(),r.stopPropagation(),t.disabled=!0;const c=await fetch(`${y}/api/home-services`,{method:"POST"});if(!c.ok){t.disabled=!1;return}const h=await c.json();b(s=>s.includes(`data-service-id="${h.id}"`))}),o.appendChild(t)}}function ae(){const d=document.querySelector("[data-faq-list]");if(!d)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);async function n(s){(await fetch(`${y}/api/faq?index=${encodeURIComponent(s)}`,{method:"DELETE"})).ok&&b(i=>(i.match(/data-faq-item="\d+"/g)||[]).length<r.length)}async function o(s){(await fetch(`${y}/api/faq?after=${encodeURIComponent(s)}`,{method:"POST"})).ok&&b(i=>(i.match(/data-faq-item="\d+"/g)||[]).length>r.length)}async function t(s,a){(await fetch(`${y}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:s,to:a})})).ok&&b(()=>!0)}const r=Array.from(d.querySelectorAll("[data-faq-item]"));let c=null;function h(){r.forEach(s=>{s.classList.remove("faq-drop-target"),s.querySelector(":scope > .faq-drop-line")?.remove()})}r.forEach((s,a)=>{s.style.position=s.style.position||"relative";const i=document.createElement("button");i.type="button",i.className="faq-item-remove",i.textContent="×",i.title="Remove question",i.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),i.disabled=!0,n(a)}),s.appendChild(i);const u=document.createElement("div");u.className="faq-item-add";const p=document.createElement("button");p.type="button",p.textContent="+",p.title="Insert a question here",p.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation(),p.disabled=!0,o(a)}),u.appendChild(p),s.after(u);const g=document.createElement("button");g.type="button",g.className="faq-item-grip",g.title="Drag to reorder",g.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',g.draggable=!0,g.addEventListener("click",l=>l.preventDefault()),g.addEventListener("dragstart",l=>{c=a,l.dataTransfer.setData("text/plain",String(a)),l.dataTransfer.effectAllowed="move",l.dataTransfer.setDragImage(s,12,12),s.classList.add("faq-dragging")}),g.addEventListener("dragend",()=>{c=null,s.classList.remove("faq-dragging"),h()}),s.appendChild(g),s.addEventListener("dragover",l=>{if(c===null||c===a)return;l.preventDefault(),l.dataTransfer.dropEffect="move";const f=s.getBoundingClientRect(),v=l.clientY<f.top+f.height/2;h(),s.classList.add("faq-drop-target");const m=document.createElement("div");m.className="faq-drop-line",v?s.prepend(m):s.append(m)}),s.addEventListener("dragleave",l=>{s.contains(l.relatedTarget)||(s.classList.remove("faq-drop-target"),s.querySelector(":scope > .faq-drop-line")?.remove())}),s.addEventListener("drop",l=>{l.preventDefault();const f=Number(l.dataTransfer.getData("text/plain"));if(h(),Number.isNaN(f)||f===a)return;const v=s.getBoundingClientRect(),w=l.clientY<v.top+v.height/2?a:a+1,k=w>f?w-1:w;k!==f&&t(f,k)})})}function re(){const d=document.createElement("style");d.textContent=`
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
  `,document.head.appendChild(d),document.querySelectorAll(".dev-logo-picker").forEach(e=>{const n=(e.dataset.logoOptions||"").split(",").filter(Boolean);let o=(e.dataset.logoCurrent||"").split(",").filter(i=>i&&n.includes(i));const t=document.createElement("button");t.type="button",t.className="dev-logo-picker-toggle",t.textContent="Choose logos";const r=document.createElement("div");r.className="dev-logo-picker-panel";function c(){const i=o.join(",");return e.dataset.logoCurrent=i,x(e.dataset.logoKey,i).then(()=>b(u=>u.includes(`data-logo-key="${e.dataset.logoKey}"`)&&u.includes(`data-logo-current="${i}"`)))}function h(){if(r.innerHTML="",!o.length){const u=document.createElement("div");u.className="dev-logo-picker-empty",u.textContent="No logos selected — showing placeholders.",r.appendChild(u)}o.forEach(u=>{const p=document.createElement("label");p.className="dev-logo-picker-row",p.draggable=!0;const g=document.createElement("span");g.className="dev-logo-picker-grip",g.innerHTML="⋮⋮",g.title="Drag to reorder";const l=document.createElement("input");l.type="checkbox",l.checked=!0,l.addEventListener("click",v=>v.stopPropagation()),l.addEventListener("change",()=>{o=o.filter(v=>v!==u),h(),c()});const f=document.createElement("span");f.textContent=u,p.append(g,l,f),r.appendChild(p),p.addEventListener("dragstart",v=>{v.dataTransfer.setData("text/plain",u),v.dataTransfer.effectAllowed="move",p.classList.add("dragging")}),p.addEventListener("dragend",()=>{p.classList.remove("dragging"),r.querySelectorAll(".drop-target").forEach(v=>v.classList.remove("drop-target"))}),p.addEventListener("dragover",v=>{o.includes(u)&&(v.preventDefault(),v.dataTransfer.dropEffect="move",p.classList.add("drop-target"))}),p.addEventListener("dragleave",()=>p.classList.remove("drop-target")),p.addEventListener("drop",v=>{v.preventDefault(),p.classList.remove("drop-target");const m=v.dataTransfer.getData("text/plain");!m||m===u||!o.includes(m)||(o=o.filter(w=>w!==m),o.splice(o.indexOf(u),0,m),h(),c())})});const i=n.filter(u=>!o.includes(u));if(o.length&&i.length){const u=document.createElement("div");u.className="dev-logo-picker-divider",r.appendChild(u)}if(i.forEach(u=>{const p=document.createElement("label");p.className="dev-logo-picker-row";const g=document.createElement("input");g.type="checkbox",g.checked=!1,g.addEventListener("change",()=>{o=[...o,u],h(),c()});const l=document.createElement("span");l.textContent=u,p.append(g,l),r.appendChild(p)}),i.length||o.length){const u=document.createElement("div");u.className="dev-logo-picker-divider",r.appendChild(u)}r.append(a,s)}const s=document.createElement("input");s.type="file",s.accept="image/png,image/jpeg,image/webp,image/svg+xml",s.style.display="none";const a=document.createElement("button");a.type="button",a.className="dev-logo-picker-add",a.textContent="+ Add custom logo…",a.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),s.click()}),s.addEventListener("change",async()=>{const i=s.files&&s.files[0];if(s.value="",!!i){a.disabled=!0,a.textContent="Uploading…";try{const u=new FormData;u.append("file",i);const p=await fetch(`${y}/api/credentials-logo`,{method:"POST",body:u});if(!p.ok)throw new Error("upload failed");const g=await p.json();o=[...o,g.filename],e.dataset.logoCurrent=o.join(","),await x(e.dataset.logoKey,o.join(",")),b(l=>l.includes(g.filename))}catch{a.disabled=!1,a.textContent="+ Add custom logo…"}}}),t.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",i=>{e.contains(i.target)||e.classList.remove("open")}),h(),e.append(t,r)})}function ie(){const d=document.createElement("style");d.textContent=`
    .dev-logo-size-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-logo-size-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-logo-size-control,
    [data-dev-hover-zone]:focus-within .dev-logo-size-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(d),document.querySelectorAll(".dev-logo-size-control").forEach(e=>{const n=document.getElementById(e.dataset.sizeTarget||"");if(!n)return;const o=document.createElement("span");o.textContent="Logo size";const t=document.createElement("input");t.type="range",t.min="60",t.max="160",t.step="4",t.value=e.dataset.sizeValue||"104",t.addEventListener("input",()=>{n.style.setProperty("--logo-size",`${t.value}px`),x(e.dataset.sizeKey,Number(t.value))}),e.append(o,t)})}function de(){const d=document.getElementById("photo-grid");if(!d)return;const e=document.createElement("style");e.textContent=`
    .dev-gallery-add {
      display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px;
      /* Matches the footprint a real photo tile occupies (a typical photo's
         aspect ratio at this column width), so the tile reads as "a photo
         goes here" instead of a thin drop strip. */
      width: 100%; aspect-ratio: 4 / 3; box-sizing: border-box; break-inside: avoid; margin-bottom: 20px;
      border: 2px dashed oklch(0.7 0.01 255); border-radius: var(--radius, 8px);
      background: oklch(0.96 0.005 255); color: oklch(0.45 0.01 255);
      cursor: pointer; font: 500 13px/1.4 -apple-system, sans-serif; text-align: center; padding: 12px;
    }
    .dev-gallery-add.dev-img-drag-over { background: rgba(37,99,235,.12); border-color: #2563eb; color: #2563eb; }
    .dev-gallery-add[data-uploading="1"] { pointer-events: none; opacity: .6; }
  `,document.head.appendChild(e);const n=document.createElement("div");n.className="dev-gallery-add";const o=document.createElement("span");o.textContent="+ Add photos",n.appendChild(o);const t=document.createElement("input");t.type="file",t.accept="image/*",t.multiple=!0,t.style.display="none",n.appendChild(t);function r(a){o.textContent=a}function c(){const a=document.querySelector(".filter-pill.active"),i=a?a.dataset.id:"all";return i&&i!=="all"?i:""}async function h(a){const i=Array.from(a||[]).filter(g=>g.type.startsWith("image/"));if(i.length===0)return;n.dataset.uploading="1";const u=c();let p=null;try{for(let g=0;g<i.length;g++){r(i.length>1?`Uploading ${g+1} of ${i.length}…`:"Uploading…");const l=new FormData;l.append("file",i[g]),l.append("tag",u);const f=await fetch(`${y}/api/gallery`,{method:"POST",body:l});if(!f.ok)throw new Error("upload failed");p=(await f.json()).id}b(g=>!p||g.includes(`data-gallery-id="${p}"`))}catch{n.dataset.uploading="",r("+ Add photos")}}t.addEventListener("change",()=>{h(t.files),t.value=""}),n.addEventListener("click",()=>t.click());let s=0;n.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer&&(a.dataTransfer.dropEffect="copy")}),n.addEventListener("dragenter",a=>{a.preventDefault(),s+=1,n.classList.add("dev-img-drag-over")}),n.addEventListener("dragleave",()=>{s=Math.max(0,s-1),s===0&&n.classList.remove("dev-img-drag-over")}),n.addEventListener("drop",a=>{a.preventDefault(),a.stopPropagation(),s=0,n.classList.remove("dev-img-drag-over"),h(a.dataTransfer&&a.dataTransfer.files)}),d.prepend(n)}function se(){const d=document.getElementById("photo-grid");if(!d)return;const e=document.createElement("style");e.textContent=`
    .gallery-item-grip {
      position: absolute; top: 8px; left: 8px; z-index: 20;
      width: 26px; height: 26px; border-radius: 4px; border: none;
      background: rgba(17,17,17,.85); color: #fff; cursor: grab;
      display: none; align-items: center; justify-content: center; touch-action: none;
    }
    .photo-item:hover .gallery-item-grip { display: flex; }
    .gallery-item-grip:active { cursor: grabbing; }
    .photo-item.gallery-dragging { opacity: 0.4; }
    .photo-item.gallery-drop-target { outline: 1.5px dashed rgba(37,99,235,.5); outline-offset: 2px; }
    /* A left/right edge bar, not a top/bottom one: this grid is a 2-column
       CSS masonry (column-count), which flows top-to-bottom within a
       column rather than left-to-right — so a photo's array neighbor often
       isn't the one visually above/below it, only ever the one beside it
       in reading order. A vertical "insert here" bar on the near edge
       matches that; a horizontal one above/below a tile just pointed at
       the wrong photo half the time. */
    .gallery-drop-line {
      position: absolute; top: 0; bottom: 0; width: 3px; border-radius: 2px;
      background: #2563eb; pointer-events: none; z-index: 21;
    }
    .gallery-drop-line.before { left: -8px; }
    .gallery-drop-line.after { right: -8px; }
    .filter-pill.gallery-drop-target {
      outline: 2px solid #2563eb; outline-offset: 2px;
    }
  `,document.head.appendChild(e);const n=Array.from(d.querySelectorAll(".photo-item")),o=Array.from(document.querySelectorAll(".filter-pill"));let t=null;function r(){n.forEach(a=>{a.classList.remove("gallery-drop-target"),a.querySelector(":scope > .gallery-drop-line")?.remove()})}function c(){o.forEach(a=>a.classList.remove("gallery-drop-target"))}async function h(a,i){(await fetch(`${y}/api/gallery`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"reorder",id:a,beforeId:i})})).ok&&b(p=>{const g=p.indexOf(`data-gallery-id="${a}"`);if(g===-1)return!1;if(i){const f=p.indexOf(`data-gallery-id="${i}"`);return f!==-1&&g<f}const l=[...p.matchAll(/data-gallery-id="[^"]+"/g)].map(f=>f.index);return l.length>0&&l[l.length-1]===g})}async function s(a,i){(await fetch(`${y}/api/gallery`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"retag",id:a,tag:i})})).ok&&b(p=>{const g=p.indexOf(`data-gallery-id="${a}"`);if(g===-1)return!1;const l=p.lastIndexOf("<div",g),f=p.indexOf(">",g);return l===-1||f===-1?!1:p.slice(l,f).includes(`data-project="${i??""}"`)})}n.forEach(a=>{const i=a.dataset.galleryId;a.style.position=a.style.position||"relative";const u=document.createElement("button");u.type="button",u.className="gallery-item-grip",u.title="Drag to reorder, or onto a filter pill to retag",u.setAttribute("aria-label","Drag to reorder this photo"),u.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',u.draggable=!0,u.addEventListener("click",p=>p.preventDefault()),u.addEventListener("dragstart",p=>{t=i,p.dataTransfer.setData("text/plain",i),p.dataTransfer.effectAllowed="move",p.dataTransfer.setDragImage(a,12,12),a.classList.add("gallery-dragging")}),u.addEventListener("dragend",()=>{t=null,a.classList.remove("gallery-dragging"),r(),c()}),a.appendChild(u),a.addEventListener("dragover",p=>{if(t===null||t===i)return;p.preventDefault(),p.dataTransfer.dropEffect="move";const g=a.getBoundingClientRect(),l=p.clientX<g.left+g.width/2;r(),a.classList.add("gallery-drop-target");const f=document.createElement("div");f.className=`gallery-drop-line ${l?"before":"after"}`,a.appendChild(f)}),a.addEventListener("dragleave",p=>{a.contains(p.relatedTarget)||(a.classList.remove("gallery-drop-target"),a.querySelector(":scope > .gallery-drop-line")?.remove())}),a.addEventListener("drop",p=>{if(t===null||t===i)return;p.preventDefault();const g=a.getBoundingClientRect(),l=p.clientX<g.left+g.width/2;r();const f=t,v=l?i:n[n.indexOf(a)+1]?.dataset.galleryId??null;v!==f&&h(f,v??null)})}),o.forEach(a=>{a.addEventListener("dragover",i=>{t!==null&&(i.preventDefault(),i.dataTransfer.dropEffect="move",a.classList.add("gallery-drop-target"))}),a.addEventListener("dragleave",()=>{a.classList.remove("gallery-drop-target")}),a.addEventListener("drop",i=>{if(t===null)return;i.preventDefault(),a.classList.remove("gallery-drop-target");const u=a.dataset.id==="all"?null:a.dataset.id;s(t,u)})})}O();K();X();Y();G();J();Z();_();Q();ee();te();ne();re();ie();oe();ae();de();se();F();
