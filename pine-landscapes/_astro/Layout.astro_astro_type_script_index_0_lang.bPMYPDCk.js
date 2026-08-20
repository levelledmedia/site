const y="http://localhost:3000";function $(i,e,t){return Math.min(t,Math.max(e,i))}function R(i,e){let t;return(...o)=>{clearTimeout(t),t=setTimeout(()=>i(...o),e)}}function x(i,{timeoutMs:e=5e3,intervalMs:t=200}={}){const o=Date.now()+e;function n(){fetch(location.pathname+location.search,{cache:"no-store"}).then(a=>a.text()).then(a=>{i(a)||Date.now()>o?location.reload():setTimeout(n,t)}).catch(()=>location.reload())}n()}function A(i,{shouldExist:e,expectedSrc:t,timeoutMs:o=5e3,intervalMs:n=200}={}){const a=Date.now()+o;function l(s){const r=s.querySelector(`[data-image-slot="${CSS.escape(i)}"]`),g=r?r.querySelector("img"):null;return e?g?t?g.getAttribute("src").split("?")[0]===t.split("?")[0]:!0:!1:!g}function f(){function s(){fetch(location.pathname+location.search,{cache:"no-store"}).then(r=>r.text()).then(r=>{const g=new DOMParser().parseFromString(r,"text/html");l(g)||Date.now()>a?location.reload():setTimeout(s,n)}).catch(()=>location.reload())}s()}function d(){fetch(`${y}/api/image/${encodeURIComponent(i)}`,{cache:"no-store"}).then(async s=>{if(!e){if(s.status===404){f();return}if(Date.now()>a){location.reload();return}setTimeout(d,n);return}if(!s.ok){if(Date.now()>a){location.reload();return}setTimeout(d,n);return}(await s.arrayBuffer()).byteLength>0?f():Date.now()>a?location.reload():setTimeout(d,n)}).catch(()=>location.reload())}d()}function P(i){const e=document.createElement("div");return e.className="dev-loading-spinner",e.innerHTML='<svg viewBox="0 0 24 24" width="18" height="18"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="42" stroke-dashoffset="14"/></svg>',i.appendChild(e),e}function j(){window.parent.postMessage({source:"webgen-template",type:"saved"},y)}function w(i,e){return fetch(`${y}/api/content`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:i,value:e})}).then(t=>(t.ok&&j(),t)).catch(()=>{})}function I(){const i=document.createElement("style");i.textContent=`
    .dev-link-wrap { position: relative; display: inline-block; }
    .dev-link-open {
      position: absolute; top: -8px; right: -8px; width: 22px; height: 22px;
      display: none; align-items: center; justify-content: center;
      border-radius: 50%; border: 2px solid #fff; background: #111; color: #fff;
      font-size: 11px; line-height: 1; padding: 0; cursor: pointer; z-index: 20;
    }
    .dev-link-wrap:hover .dev-link-open,
    .dev-link-wrap:focus-within .dev-link-open { display: flex; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-link-open").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation();const o=e.dataset.linkHref;o&&window.location.assign(o)})}),document.addEventListener("click",e=>{e.target.closest("a[data-edit-key]")&&(document.documentElement.classList.contains("webgen-locked")||!e.metaKey&&!e.ctrlKey&&e.preventDefault())})}function O(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i);function e(t){document.documentElement.classList.toggle("webgen-locked",t),document.querySelectorAll("[data-edit-key]").forEach(o=>{o.contentEditable=t?"false":"true"})}window.addEventListener("message",t=>{t.origin===y&&t.data?.source==="webgen-studio"&&t.data?.type==="lock"&&e(!!t.data.locked)}),document.documentElement.classList.contains("webgen-locked")&&e(!0),window.parent!==window&&window.parent.postMessage({source:"webgen-template",type:"ready"},y)}function F(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll("[data-edit-key]").forEach(e=>{e.contentEditable="true",e.spellcheck=!1;let t=e.innerHTML;e.addEventListener("focus",()=>{t=e.innerHTML}),e.addEventListener("keydown",o=>{if(o.key!=="Enter")return;if(e.dataset.editMultiline===void 0){o.preventDefault(),e.blur();return}o.preventDefault();const n=window.getSelection();if(!n||!n.rangeCount)return;const a=n.getRangeAt(0);a.deleteContents();const l=document.createElement("br");a.insertNode(l),a.insertNode(document.createElement("br")),a.setStartAfter(l),a.collapse(!0),n.removeAllRanges(),n.addRange(a)}),e.addEventListener("blur",()=>{if(/^(<br\s*\/?>|\s|&nbsp;)*$/i.test(e.innerHTML)&&(e.innerHTML=""),e.innerHTML===t)return;t=e.innerHTML,document.querySelectorAll(`[data-edit-key="${e.dataset.editKey}"]`).forEach(n=>{n!==e&&(n.innerHTML=e.innerHTML)});const o=w(e.dataset.editKey,e.innerHTML);e.dataset.navSlugKey&&o.then(()=>U(e))})})}function K(i){return i.replace(/<[^>]*>/g," ").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"page"}function V(i,{timeoutMs:e=5e3,intervalMs:t=200}={}){const o=Date.now()+e;function n(){fetch(i,{cache:"no-store"}).then(a=>{a.ok||Date.now()>o?location.href=i:setTimeout(n,t)}).catch(()=>{location.href=i})}n()}function U(i){const e=i.dataset.navSlugKey,t=i.dataset.navHrefCurrent,o="/"+K(i.textContent||"");o!==t&&(i.dataset.navHrefCurrent=o,w(e,o).then(n=>{!n||!n.ok||(location.pathname===t?V(o):x(a=>a.includes(`data-nav-href-current="${o}"`)))}))}const S={replace:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',reposition:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>',resize:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',remove:'<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M9 3a1 1 0 0 0-1 1v1H4.5a1 1 0 0 0 0 2H5v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9Zm1 2h4V5h-4v0Zm-2 5a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7Zm5-1a1 1 0 0 0-1 1v7a1 1 0 1 0 2 0v-7a1 1 0 0 0-1-1Z"/></svg>',confirm:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',cycle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M8 16H3v5"/></svg>',updown:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>',widthToggle:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><line x1="2" y1="12" x2="22" y2="12"/></svg>',droplet:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.5-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>',align:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',grid:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',eye:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>',heading:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>'};function D(i,e,t){const o=document.createElement("button");return o.type="button",o.className="dev-img-btn",o.innerHTML=S[i],o.title=e,o.setAttribute("aria-label",e),o.addEventListener("click",n=>{n.preventDefault(),t(n)}),o}function M(i){const[e,t]=(i.style.objectPosition||"50% 50%").split(" ").map(parseFloat);return{x:Number.isFinite(e)?e:50,y:Number.isFinite(t)?t:50}}function N(i){if(i.dataset.scale)return parseFloat(i.dataset.scale);const e=i.style.transform.match(/scale\(([\d.]+)\)/);return e?parseFloat(e[1]):1}function W(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),["dragover","drop"].forEach(e=>{window.addEventListener(e,t=>{t.target.closest("[data-image-slot]")||t.preventDefault()})}),document.querySelectorAll("[data-image-slot]").forEach(e=>{const t=e.dataset.imageSlot,o=t==="logo",n=e.dataset.imageNatural==="1",a=e.querySelector("img");a&&(a.draggable=!1);const l=e.closest("a");l&&(l.draggable=!1);const f=document.createElement("div");f.className="dev-img-overlay",e.appendChild(f);const d=document.createElement("input");d.type="file",d.accept="image/*",d.style.display="none";async function s(c){if(!c||!c.type.startsWith("image/"))return;f.innerHTML="";const p=P(e);try{const v=new FormData;v.append("slotId",t),v.append("file",c);const h=await fetch(`${y}/api/upload`,{method:"POST",body:v});if(!h.ok)throw new Error("upload failed");const m=await h.json();A(t,{shouldExist:!0,expectedSrc:m.image.src})}catch{p.remove(),g()}}d.addEventListener("change",()=>{s(d.files&&d.files[0])}),e.appendChild(d);let r=0;e.addEventListener("dragover",c=>{c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="copy")}),e.addEventListener("dragenter",c=>{c.preventDefault(),r+=1,e.classList.add("dev-img-drag-over")}),e.addEventListener("dragleave",()=>{r=Math.max(0,r-1),r===0&&e.classList.remove("dev-img-drag-over")}),e.addEventListener("drop",c=>{c.preventDefault(),c.stopPropagation(),r=0,e.classList.remove("dev-img-drag-over"),s(c.dataTransfer&&c.dataTransfer.files&&c.dataTransfer.files[0])});function g(){if(f.innerHTML="",!a){f.appendChild(D("replace","Add photo",c=>{c.stopPropagation(),d.click()}));return}if(!n){if(e.classList.contains("dev-reposition-active")){f.appendChild(D("confirm","Done",c=>{c.stopPropagation(),e.classList.remove("dev-reposition-active"),g()}));return}f.appendChild(D(o?"resize":"reposition",o?"Resize logo":"Reposition image",c=>{if(c.stopPropagation(),e.classList.add("dev-reposition-active"),o&&u){const p=e.getBoundingClientRect();u.style.top=`${p.bottom+10}px`,u.style.left=`${p.left}px`}g()}))}f.appendChild(D("remove","Remove image",async c=>{c.stopPropagation(),f.innerHTML="";const p=P(e);try{if(!(await fetch(`${y}/api/upload?slotId=${encodeURIComponent(t)}`,{method:"DELETE"})).ok)throw new Error("remove failed");A(t,{shouldExist:!1})}catch{p.remove(),g()}}))}let u=null;if(a&&!n){u=document.createElement("input"),u.type="range",u.className=o?"dev-img-scale dev-img-scale-logo":"dev-img-scale",u.min=o?"0.5":"1",u.max=o&&a.dataset.maxScale?a.dataset.maxScale:"3",u.step="0.05",u.value=String(N(a)),u.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation()}),u.addEventListener("mousedown",p=>p.stopPropagation()),e.appendChild(u);const c=R((p,v,h)=>{ignoreNextReload=!0,fetch(`${y}/api/image-transform`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({slotId:t,x:p,y:v,scale:h})}).then(m=>{m.ok&&j()}).catch(()=>{ignoreNextReload=!1})},300);if(u.addEventListener("input",()=>{const p=parseFloat(u.value);if(o)a.dataset.scale=String(p),a.style.height=`${Math.round(44*p)}px`,c(50,50,p);else{const{x:v,y:h}=M(a);a.style.transform=`scale(${p})`,c(v,h,p)}}),!o){let p=!1,v=0,h=0,m={x:50,y:50},b=null,E=0,q=0;a.addEventListener("pointerdown",k=>{if(!e.classList.contains("dev-reposition-active"))return;p=!0,a.setPointerCapture(k.pointerId),b=e.getBoundingClientRect(),v=k.clientX,h=k.clientY,m=M(a);const C=N(a),L=a.naturalWidth,T=a.naturalHeight;if(L&&T&&b.width&&b.height){const z=Math.max(b.width/L,b.height/T),B=L*z*C,H=T*z*C;E=Math.max(B-b.width,0),q=Math.max(H-b.height,0)}else E=b.width,q=b.height}),a.addEventListener("click",k=>{e.classList.contains("dev-reposition-active")&&(k.preventDefault(),k.stopPropagation())}),a.addEventListener("pointermove",k=>{if(!p)return;const C=E>0?(k.clientX-v)/E*100:0,L=q>0?(k.clientY-h)/q*100:0,T=$(m.x-C,0,100),z=$(m.y-L,0,100);a.style.objectPosition=`${T}% ${z}%`}),a.addEventListener("pointerup",()=>{if(!p)return;p=!1;const{x:k,y:C}=M(a);c(k,C,N(a))})}}g()})}function Y(){const i=document.createElement("style");i.textContent=`
    .dev-width-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-width-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-width-control,
    [data-dev-hover-zone]:focus-within .dev-width-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-width-control").forEach(e=>{const t=(e.dataset.widthTarget||"").split(" ").map(a=>document.querySelector(`[data-edit-key="${a}"]`)).filter(Boolean);if(!t.length)return;const o=document.createElement("span");o.textContent="Width";const n=document.createElement("input");n.type="range",n.min="320",n.max="900",n.step="10",n.value=String(parseInt(t[0].style.maxWidth,10)||640),n.addEventListener("input",()=>{t.forEach(a=>{a.style.maxWidth=`${n.value}px`}),w(e.dataset.widthKey,Number(n.value))}),e.append(o,n)})}function X(){const i=document.createElement("style");i.textContent=`
    .dev-opacity-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-opacity-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-opacity-control,
    [data-dev-hover-zone]:focus-within .dev-opacity-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-opacity-control").forEach(e=>{const t=document.getElementById(e.dataset.opacityTarget||"");if(!t)return;const o=t.dataset.opacityRgb||"0,0,0",n=document.createElement("span");n.textContent="Opacity";const a=document.createElement("input");a.type="range",a.min="0",a.max="1",a.step="0.05",a.value=e.dataset.opacityValue||"0.4",a.addEventListener("input",()=>{t.style.backgroundColor=`rgba(${o},${a.value})`,w(e.dataset.opacityKey,Number(a.value))}),e.append(n,a)})}function G(){const i=document.createElement("style");i.textContent=`
    .dev-gap-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-gap-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-gap-control,
    [data-dev-hover-zone]:focus-within .dev-gap-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-gap-control").forEach(e=>{const t=document.getElementById(e.dataset.gapTarget||"");if(!t)return;const o=document.createElement("span");o.textContent="Gutter";const n=document.createElement("input");n.type="range",n.min="0",n.max="160",n.step="4",n.value=e.dataset.gapValue||"56",n.addEventListener("input",()=>{t.style.gap=`${n.value}px`,w(e.dataset.gapKey,Number(n.value))}),e.append(o,n)})}function J(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-column-ratio-handle").forEach(e=>{const t=document.getElementById(e.dataset.ratioTarget||"");if(!t)return;const o=t.children[0],n=t.children[1];if(!o||!n)return;let a=Number(e.dataset.ratioCurrent)||59;const l=document.createElement("button");l.type="button",l.className="dev-ratio-grip",l.innerHTML=S.widthToggle,l.title="Drag to resize columns",l.addEventListener("click",s=>s.preventDefault()),e.appendChild(l);function f(){const s=e.getBoundingClientRect(),r=o.getBoundingClientRect(),g=n.getBoundingClientRect(),u=(r.right+g.left)/2,c=(r.top+r.bottom)/2;l.style.left=`${u-s.left}px`,l.style.top=`${c-s.top}px`}f(),window.addEventListener("resize",f);let d=!1;l.addEventListener("pointerdown",s=>{d=!0,l.classList.add("dragging");try{l.setPointerCapture(s.pointerId)}catch{}}),l.addEventListener("pointermove",s=>{if(!d)return;const r=t.getBoundingClientRect(),g=e.getBoundingClientRect(),u=parseFloat(getComputedStyle(t).columnGap||"0")||0,c=r.width-u,p=s.clientX-r.left,v=Math.round((p-u/2)/c*100),h=$(v,25,75);h!==a&&(a=h,t.style.gridTemplateColumns=`minmax(320px, ${a}fr) minmax(300px, ${100-a}fr)`),l.style.left=`${s.clientX-g.left}px`}),l.addEventListener("pointerup",()=>{d&&(d=!1,l.classList.remove("dragging"),f(),w(e.dataset.ratioKey,a))})})}function Z(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-variant-cycle").forEach(e=>{const t=(e.dataset.cycleOptions||"").split(",").filter(Boolean),o=(e.dataset.cycleLabel||"").split(",").filter(Boolean);if(!t.length)return;let n=e.dataset.cycleCurrent||t[0];const a=e.dataset.cycleIcon||"cycle",l=document.createElement("button");l.type="button",l.className="dev-cycle-btn",e.dataset.cycleTitle&&(l.title=e.dataset.cycleTitle);function f(){const d=Math.max(0,t.indexOf(n)),s=o[d];l.innerHTML=s?`${S[a]}<span>${s}</span>`:S[a]}f(),l.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),l.disabled)return;const s=t.indexOf(n);n=t[(s+1)%t.length],f(),l.disabled=!0;const r=e.dataset.cycleKey;w(r,n).then(()=>x(g=>g.includes(`data-cycle-key="${r}"`)&&g.includes(`data-cycle-current="${n}"`))).catch(()=>{l.disabled=!1})}),e.appendChild(l)})}function _(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-height-handle").forEach(e=>{let t;try{t=JSON.parse(e.dataset.handleStops||"[]")}catch{return}if(!t.length)return;let o;if(e.dataset.handleNumeric!==void 0){const r=Number(e.dataset.handleCurrent);o=t.reduce((g,u,c)=>Math.abs(u.save-r)<Math.abs(t[g].save-r)?c:g,0)}else o=t.findIndex(r=>r.name===e.dataset.handleCurrent);o<0&&(o=0);const n=document.createElement("button");n.type="button",n.className="dev-height-grip",n.innerHTML=S.updown,n.title="Drag to resize",n.addEventListener("click",r=>r.preventDefault());function a(r){t[r].effects.forEach(({target:g,prop:u,value:c})=>{const p=document.getElementById(g);p&&(u.startsWith("--")?p.style.setProperty(u,c):p.style[u]=c)})}a(o);let l=!1,f=0,d=0;const s=70;n.addEventListener("pointerdown",r=>{l=!0,e.classList.add("dragging"),f=r.clientY,d=o;try{n.setPointerCapture(r.pointerId)}catch{}}),n.addEventListener("pointermove",r=>{if(!l)return;const g=Math.round((r.clientY-f)/s),u=Math.min(t.length-1,Math.max(0,d+g));u!==o&&(o=u,a(o))}),n.addEventListener("pointerup",()=>{l&&(l=!1,e.classList.remove("dragging"),w(e.dataset.handleKey,t[o].save))}),e.append(n)})}function Q(){const i=document.createElement("style");i.textContent=`
    .dev-map-control { opacity: 0; pointer-events: none; transition: opacity .12s ease; }
    [data-dev-hover-zone]:hover .dev-map-control,
    [data-dev-hover-zone]:focus-within .dev-map-control { opacity: 1; pointer-events: auto; }
    .dev-map-control input {
      font: 12px/1 -apple-system, sans-serif; padding: 6px 8px; border-radius: 4px;
      border: none; width: 200px; background: rgba(17,17,17,.85); color: #fff;
    }
    .dev-map-control input::placeholder { color: rgba(255,255,255,.6); }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-map-control").forEach(e=>{const t=document.createElement("input");t.type="text",t.placeholder="Map location…",t.value=e.dataset.mapValue||"",t.title="Google Maps search text for the embedded map",t.addEventListener("keydown",o=>{o.key==="Enter"&&t.blur()}),t.addEventListener("blur",()=>{if(t.value===e.dataset.mapValue)return;const o=t.value;e.dataset.mapValue=o,w(e.dataset.mapKey,o).then(()=>x(n=>n.includes(o)))}),e.appendChild(t)})}function ee(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-embed-control").forEach(e=>{const t=document.createElement("button");t.type="button",t.textContent="Edit embed code";const o=document.createElement("textarea");o.placeholder="Paste review widget embed code…",o.value=e.dataset.embedValue||"",t.addEventListener("click",()=>{e.classList.toggle("open"),e.classList.contains("open")&&o.focus()}),o.addEventListener("blur",()=>{if(o.value===e.dataset.embedValue)return;const n=o.value;e.dataset.embedValue=n,w(e.dataset.embedKey,n).then(()=>x(()=>!0))}),e.append(o,t)})}function te(){const i=document.querySelector("[data-services-grid]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),i.querySelectorAll(".services-card").forEach(n=>{const a=n.dataset.serviceId,l=document.createElement("button");l.type="button",l.className="services-card-remove",l.textContent="×",l.title="Remove card",l.addEventListener("click",async f=>{if(f.preventDefault(),f.stopPropagation(),l.disabled=!0,P(n),!(await fetch(`${y}/api/home-services?id=${encodeURIComponent(a)}`,{method:"DELETE"})).ok){l.disabled=!1;return}x(s=>!s.includes(`data-service-id="${a}"`))}),n.appendChild(l)}),i.querySelectorAll(".services-row").forEach(n=>{if(n.children.length>=4)return;const a=n.dataset.rowIndex,l=document.createElement("button");l.type="button",l.className="services-row-add",l.textContent="+",l.title="Add a card to this row",l.addEventListener("click",async f=>{f.preventDefault(),f.stopPropagation(),l.disabled=!0;const d=await fetch(`${y}/api/home-services?row=${encodeURIComponent(a)}`,{method:"POST"});if(!d.ok){l.disabled=!1;return}const s=await d.json();x(r=>r.includes(`data-service-id="${s.id}"`))}),n.appendChild(l)});const t=i.querySelectorAll(".services-row"),o=t[t.length-1];if(o){const n=document.createElement("button");n.type="button",n.className="services-row-add-below",n.textContent="+",n.title="Add a new row of service cards",n.addEventListener("click",async a=>{a.preventDefault(),a.stopPropagation(),n.disabled=!0;const l=await fetch(`${y}/api/home-services`,{method:"POST"});if(!l.ok){n.disabled=!1;return}const f=await l.json();x(d=>d.includes(`data-service-id="${f.id}"`))}),o.appendChild(n)}}function ne(){const i=document.querySelector("[data-faq-list]");if(!i)return;const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e);async function t(d){(await fetch(`${y}/api/faq?index=${encodeURIComponent(d)}`,{method:"DELETE"})).ok&&x(r=>(r.match(/data-faq-item="\d+"/g)||[]).length<a.length)}async function o(d){(await fetch(`${y}/api/faq?after=${encodeURIComponent(d)}`,{method:"POST"})).ok&&x(r=>(r.match(/data-faq-item="\d+"/g)||[]).length>a.length)}async function n(d,s){(await fetch(`${y}/api/faq`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({from:d,to:s})})).ok&&x(()=>!0)}const a=Array.from(i.querySelectorAll("[data-faq-item]"));let l=null;function f(){a.forEach(d=>{d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove()})}a.forEach((d,s)=>{d.style.position=d.style.position||"relative";const r=document.createElement("button");r.type="button",r.className="faq-item-remove",r.textContent="×",r.title="Remove question",r.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),r.disabled=!0,t(s)}),d.appendChild(r);const g=document.createElement("div");g.className="faq-item-add";const u=document.createElement("button");u.type="button",u.textContent="+",u.title="Insert a question here",u.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),u.disabled=!0,o(s)}),g.appendChild(u),d.after(g);const c=document.createElement("button");c.type="button",c.className="faq-item-grip",c.title="Drag to reorder",c.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',c.draggable=!0,c.addEventListener("click",p=>p.preventDefault()),c.addEventListener("dragstart",p=>{l=s,p.dataTransfer.setData("text/plain",String(s)),p.dataTransfer.effectAllowed="move",p.dataTransfer.setDragImage(d,12,12),d.classList.add("faq-dragging")}),c.addEventListener("dragend",()=>{l=null,d.classList.remove("faq-dragging"),f()}),d.appendChild(c),d.addEventListener("dragover",p=>{if(l===null||l===s)return;p.preventDefault(),p.dataTransfer.dropEffect="move";const v=d.getBoundingClientRect(),h=p.clientY<v.top+v.height/2;f(),d.classList.add("faq-drop-target");const m=document.createElement("div");m.className="faq-drop-line",h?d.prepend(m):d.append(m)}),d.addEventListener("dragleave",p=>{d.contains(p.relatedTarget)||(d.classList.remove("faq-drop-target"),d.querySelector(":scope > .faq-drop-line")?.remove())}),d.addEventListener("drop",p=>{p.preventDefault();const v=Number(p.dataTransfer.getData("text/plain"));if(f(),Number.isNaN(v)||v===s)return;const h=d.getBoundingClientRect(),b=p.clientY<h.top+h.height/2?s:s+1,E=b>v?b-1:b;E!==v&&n(v,E)})})}function oe(){const i=document.createElement("style");i.textContent=`
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
  `,document.head.appendChild(i),document.querySelectorAll(".dev-logo-picker").forEach(e=>{const t=(e.dataset.logoOptions||"").split(",").filter(Boolean);let o=(e.dataset.logoCurrent||"").split(",").filter(r=>r&&t.includes(r));const n=document.createElement("button");n.type="button",n.className="dev-logo-picker-toggle",n.textContent="Choose logos";const a=document.createElement("div");a.className="dev-logo-picker-panel";function l(){const r=o.join(",");return e.dataset.logoCurrent=r,w(e.dataset.logoKey,r).then(()=>x(g=>g.includes(`data-logo-key="${e.dataset.logoKey}"`)&&g.includes(`data-logo-current="${r}"`)))}function f(){if(a.innerHTML="",!o.length){const g=document.createElement("div");g.className="dev-logo-picker-empty",g.textContent="No logos selected — showing placeholders.",a.appendChild(g)}o.forEach(g=>{const u=document.createElement("label");u.className="dev-logo-picker-row",u.draggable=!0;const c=document.createElement("span");c.className="dev-logo-picker-grip",c.innerHTML="⋮⋮",c.title="Drag to reorder";const p=document.createElement("input");p.type="checkbox",p.checked=!0,p.addEventListener("click",h=>h.stopPropagation()),p.addEventListener("change",()=>{o=o.filter(h=>h!==g),f(),l()});const v=document.createElement("span");v.textContent=g,u.append(c,p,v),a.appendChild(u),u.addEventListener("dragstart",h=>{h.dataTransfer.setData("text/plain",g),h.dataTransfer.effectAllowed="move",u.classList.add("dragging")}),u.addEventListener("dragend",()=>{u.classList.remove("dragging"),a.querySelectorAll(".drop-target").forEach(h=>h.classList.remove("drop-target"))}),u.addEventListener("dragover",h=>{o.includes(g)&&(h.preventDefault(),h.dataTransfer.dropEffect="move",u.classList.add("drop-target"))}),u.addEventListener("dragleave",()=>u.classList.remove("drop-target")),u.addEventListener("drop",h=>{h.preventDefault(),u.classList.remove("drop-target");const m=h.dataTransfer.getData("text/plain");!m||m===g||!o.includes(m)||(o=o.filter(b=>b!==m),o.splice(o.indexOf(g),0,m),f(),l())})});const r=t.filter(g=>!o.includes(g));if(o.length&&r.length){const g=document.createElement("div");g.className="dev-logo-picker-divider",a.appendChild(g)}if(r.forEach(g=>{const u=document.createElement("label");u.className="dev-logo-picker-row";const c=document.createElement("input");c.type="checkbox",c.checked=!1,c.addEventListener("change",()=>{o=[...o,g],f(),l()});const p=document.createElement("span");p.textContent=g,u.append(c,p),a.appendChild(u)}),r.length||o.length){const g=document.createElement("div");g.className="dev-logo-picker-divider",a.appendChild(g)}a.append(s,d)}const d=document.createElement("input");d.type="file",d.accept="image/png,image/jpeg,image/webp,image/svg+xml",d.style.display="none";const s=document.createElement("button");s.type="button",s.className="dev-logo-picker-add",s.textContent="+ Add custom logo…",s.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),d.click()}),d.addEventListener("change",async()=>{const r=d.files&&d.files[0];if(d.value="",!!r){s.disabled=!0,s.textContent="Uploading…";try{const g=new FormData;g.append("file",r);const u=await fetch(`${y}/api/credentials-logo`,{method:"POST",body:g});if(!u.ok)throw new Error("upload failed");const c=await u.json();o=[...o,c.filename],e.dataset.logoCurrent=o.join(","),await w(e.dataset.logoKey,o.join(",")),x(p=>p.includes(c.filename))}catch{s.disabled=!1,s.textContent="+ Add custom logo…"}}}),n.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),e.classList.toggle("open")}),document.addEventListener("click",r=>{e.contains(r.target)||e.classList.remove("open")}),f(),e.append(n,a)})}function ae(){const i=document.createElement("style");i.textContent=`
    .dev-logo-size-control {
      display: flex; align-items: center; gap: 6px;
      background: rgba(17,17,17,.85); border-radius: 4px; padding: 4px 8px;
      opacity: 0; pointer-events: none; transition: opacity .12s ease;
    }
    .dev-logo-size-control span { font: 10px/1 -apple-system, sans-serif; color: #fff; white-space: nowrap; }
    [data-dev-hover-zone]:hover .dev-logo-size-control,
    [data-dev-hover-zone]:focus-within .dev-logo-size-control { opacity: 1; pointer-events: auto; }
  `,document.head.appendChild(i),document.querySelectorAll(".dev-logo-size-control").forEach(e=>{const t=document.getElementById(e.dataset.sizeTarget||"");if(!t)return;const o=document.createElement("span");o.textContent="Logo size";const n=document.createElement("input");n.type="range",n.min="60",n.max="160",n.step="4",n.value=e.dataset.sizeValue||"104",n.addEventListener("input",()=>{t.style.setProperty("--logo-size",`${n.value}px`),w(e.dataset.sizeKey,Number(n.value))}),e.append(o,n)})}function ie(){const i=document.getElementById("photo-grid");if(!i)return;const e=document.createElement("style");e.textContent=`
    .dev-gallery-add {
      display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px;
      width: 100%; min-height: 160px; box-sizing: border-box; break-inside: avoid; margin-bottom: 20px;
      border: 2px dashed oklch(0.7 0.01 255); border-radius: var(--radius, 8px);
      background: oklch(0.96 0.005 255); color: oklch(0.45 0.01 255);
      cursor: pointer; font: 500 13px/1.4 -apple-system, sans-serif; text-align: center; padding: 12px;
    }
    .dev-gallery-add.dev-img-drag-over { background: rgba(37,99,235,.12); border-color: #2563eb; color: #2563eb; }
    .dev-gallery-add[data-uploading="1"] { pointer-events: none; opacity: .6; }
  `,document.head.appendChild(e);const t=document.createElement("div");t.className="dev-gallery-add";const o=document.createElement("span");o.textContent="+ Add photos",t.appendChild(o);const n=document.createElement("input");n.type="file",n.accept="image/*",n.multiple=!0,n.style.display="none",t.appendChild(n);function a(s){o.textContent=s}function l(){const s=document.querySelector(".filter-pill.active"),r=s?s.dataset.id:"all";return r&&r!=="all"?r:""}async function f(s){const r=Array.from(s||[]).filter(c=>c.type.startsWith("image/"));if(r.length===0)return;t.dataset.uploading="1";const g=l();let u=null;try{for(let c=0;c<r.length;c++){a(r.length>1?`Uploading ${c+1} of ${r.length}…`:"Uploading…");const p=new FormData;p.append("file",r[c]),p.append("tag",g);const v=await fetch(`${y}/api/gallery`,{method:"POST",body:p});if(!v.ok)throw new Error("upload failed");u=(await v.json()).id}x(c=>!u||c.includes(`data-gallery-id="${u}"`))}catch{t.dataset.uploading="",a("+ Add photos")}}n.addEventListener("change",()=>{f(n.files),n.value=""}),t.addEventListener("click",()=>n.click());let d=0;t.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer&&(s.dataTransfer.dropEffect="copy")}),t.addEventListener("dragenter",s=>{s.preventDefault(),d+=1,t.classList.add("dev-img-drag-over")}),t.addEventListener("dragleave",()=>{d=Math.max(0,d-1),d===0&&t.classList.remove("dev-img-drag-over")}),t.addEventListener("drop",s=>{s.preventDefault(),s.stopPropagation(),d=0,t.classList.remove("dev-img-drag-over"),f(s.dataTransfer&&s.dataTransfer.files)}),i.appendChild(t)}I();F();W();Y();X();G();J();Z();_();Q();ee();oe();ae();te();ne();ie();O();
