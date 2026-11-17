(async function ne(){const P=Symbol.for("winter-atelier.palette.v1");for(let R=0;R<150;R++){const l=window.Engine;const h=window.$?.fn?.tip?window.$:window.jQuery;if(!l?.hero?.createStrTip||!l?.others?.createStrTip||!l?.npcs?.getTip||!l?.showEqManager?.newWindow||!l?.worldWindow?.open||typeof h?.fn?.tip!=="function"){await new Promise(e=>setTimeout(e,200));continue}if(l[P])return;const b=document.createElement("template");const L=(e,t)=>{if(typeof e!=="string")return e;b.innerHTML=e;t(b.content);return b.innerHTML};const D=e=>e&1?"administrator":e&16?"super-game-master":e&2?"game-master":e&4?"super-chat-moderator":e?"chat-moderator":"player";const k=new Map,_=new WeakSet;const A=()=>String(l.worldConfig?.getWorldName?.()||"").toLowerCase();const x=(e,t)=>String(e||A()).toLowerCase()+":"+String(t);const j=(e,t,i)=>L(e,a=>{const n=D(Number(t)||0);for(const r of a.querySelectorAll(".info-wrapper .nick"))r.dataset.waPlayerRole=n;for(const r of a.querySelectorAll(".rank")){r.dataset.waPlayerRole=i?"player":n;if(i&&n!=="player"&&r.childNodes.length===1&&r.firstChild.nodeType===3){const d=r.textContent,o=d.lastIndexOf(" [");if(o>=0&&d.endsWith("]")){r.textContent=d.slice(0,o)+" ";const s=document.createElement("span");s.dataset.waPlayerRole=n;s.textContent=d.slice(o+1);r.append(s)}}}});const B={elita:"elite1",elita1:"elite1","elita i":"elite1","elita ii":"elite2",elita2:"elite2","elita iii":"elite3",elita3:"elite3",heros:"heros",kolos:"colossus",colossus:"colossus",tytan:"tytan"};const M=e=>{const t=String(e||"").trim().toLowerCase().replace(/\s+eventow[ya]$/,"");return Object.hasOwn(B,t)?B[t]:null};const H=new WeakMap;const v=e=>{if(!e||![0,2,3].includes(Number(e.type))||Number(e.wt)<0)return null;const t=M(e.dad_kind);if(t)return t;if(e.dad_kind)return null;if(!(Number(e.id)>=5e7)||typeof e.override_tip!=="string")return null;const i=H.get(e);if(i?.text===e.override_tip)return i.kind;const a=e.override_tip.match(/<i>([^<]{1,48})<\/i>/i),n=a?M(a[1]):null;H.set(e,{text:e.override_tip,kind:n});return n};const Z=e=>e&&([2,3].includes(Number(e.type))||e.type==null&&Number(e.wt)>9||v(e));const I=e=>{const t=e?.d;if(!Z(t))return null;const i=Number(t.wt)||0,a=v(t)||(i>99?"tytan":i>89?"colossus":i>79?"heros":i>29?"elite3":i>19?"elite2":i>9?"elite1":null);const n=l.npcs.check?.()?.[t.id],r=Object.hasOwn(e,"elasticLevel")&&n?e.elasticLevel:t.lvl,d=l.hero.getLevel?.()??l.hero.d?.lvl;const o=Number(l.worldConfig?.getDropDestroyLvl?.()),s=Number(r)-Number(d);const c=Number.isFinite(s)&&Number.isFinite(o)?s<-o?"weak":s>10?"danger":s>5?"higher":"normal":null;return{kind:a,state:c,level:r}};const S=Symbol.for("winter-atelier.npc-map-label.v1"),T=new Map;let g=null;const z=e=>{const t=(e.kind||"")+"|"+(e.state||"normal");if(T.has(t))return T.get(t);const i=document.createElement("span");i.hidden=true;i.dataset.waNpc="";if(e.kind)i.dataset.waKind=e.kind;if(e.state)i.dataset.waLevel=e.state;document.documentElement.append(i);let a;try{a=getComputedStyle(i).color}finally{i.remove()}T.set(t,a);return a};const F=()=>{const e=l.miniMapController?.handHeldMiniMapController;if(typeof e?.getColorByKind!=="function")return null;if(!e.getColorByKind[S]){const t=e.getColorByKind;const i=function(...a){const n=t.apply(this,a);return g&&g.kind===a[0]?g.colour:n};Object.defineProperty(i,S,{value:true});e.getColorByKind=i}return e};const ee=e=>{if(!([2,3].includes(Number(e?.d?.type))||v(e?.d))||typeof e.getDataDrawer!=="function"||typeof e.getKind!=="function")return;const t=e.getDataDrawer(),i=F();q(i?.getMiniMapNpcController?.());if(!t||t[S]||typeof t.draw!=="function"||!i)return;const a=t.draw;let n=null,r;t.draw=function(...d){const o=I(e),s=e.getKind?.();if(!o||!([2,3].includes(Number(e.d.type))||v(e.d))){if(n!==null){t.clearDataToDraw?.();n=null;r=void 0}return a.apply(this,d)}let c;try{c=z(o)}catch{return a.apply(this,d)}if(c!==n||s!==r){t.clearDataToDraw?.();n=c;r=s}const p=g;g={kind:s,colour:c};try{return a.apply(this,d)}finally{g=p}};Object.defineProperty(t,S,{value:true})};const K=(e,t,i=false)=>{const a=t?.d,n=I(t);if(!n)return e;ee(t);const{kind:r,state:d,level:o}=n;return L(e,s=>{const c=s.querySelector("div > strong"),p=c?.parentElement;if(!c){if(!i&&!v(a))return;const u=s.querySelector("b+i"),m=u?.previousElementSibling;if(m?.tagName!=="B"||M(u.textContent)!==r)return;m.dataset.waNpc="";m.dataset.waKind=r;if(d)m.dataset.waLevel=d;u.dataset.waNpc="";u.dataset.waKind=r;u.dataset.waNpcRank="";return}p.dataset.waNpc="";if(d)p.dataset.waLevel=d;else delete p.dataset.waLevel;if(r)p.dataset.waKind=r;else delete p.dataset.waKind;for(const u of s.querySelectorAll(".npc-class")){u.dataset.waNpc="";if(r){u.dataset.waKind=r;u.dataset.waNpcRank=""}else{delete u.dataset.waKind;delete u.dataset.waNpcRank}}const f="("+String(o||"")+String(a.prof||"")+")",w=c.lastChild;if(w?.nodeType===3&&w.textContent.endsWith(f)){const u=w.textContent;w.textContent=u.slice(0,-f.length);const m=document.createElement("span");m.className="wa-npc-level";m.textContent=f;c.append(m)}})};const y=(e,t,i)=>{const a=e?.[t];if(typeof a!=="function")return;e[t]=function(...n){const r=a.apply(this,n);try{return i(r,n,this)}catch{return r}}};const $=new WeakSet,G=new WeakMap;const V=e=>{const t=e?.getRef?.(),i=v(t?.d);if(!i||typeof e.setColor!=="function")return;const a=F();if(!a)return;const n=z({kind:i,state:"normal"});if(G.get(e)===n)return;const r=g;g={kind:e.getKind?.(),colour:n};try{e.setColor();e.clearImageObject?.();G.set(e,n)}finally{g=r}};const q=e=>{if(!e||$.has(e)||typeof e.updateData!=="function"||typeof e.getObject!=="function")return e;y(e,"updateData",(t,i)=>{for(const a of i[0]||[])V(e.getObject(a.id));return t});$.add(e);for(const t of Object.values(l.npcs.check?.()||{}))if(v(t?.d))V(e.getObject(t.d.id));return e};y(l.miniMapController?.handHeldMiniMapController,"getMiniMapNpcController",e=>q(e));q(l.miniMapController?.handHeldMiniMapController?.getMiniMapNpcController?.());const Q=Symbol.for("winter-atelier.world-timer.v1"),W=new WeakMap;let N;const te=e=>{if(!N){const a=getComputedStyle(document.documentElement),n=(r,d)=>a.getPropertyValue("--wa-world-timer-"+r).trim()||d;N=new Map([["#ffffff",n("normal","#ffffff")],["#ffa500",n("warning","#ffa500")],["#ff0000",n("finished","#ff0000")],["rgb(86, 86, 86)",n("background","rgb(86, 86, 86)")],["rgb(255, 255, 255)",n("border","rgb(255, 255, 255)")]])}if(W.has(e))return W.get(e);const t=new Map,i=new Proxy(e,{get(a,n){const r=Reflect.get(a,n,a);if(typeof r!=="function")return r;const d=t.get(n);if(d?.original===r)return d.bound;const o=r.bind(a);t.set(n,{original:r,bound:o});return o},set(a,n,r){return Reflect.set(a,n,(n==="fillStyle"||n==="strokeStyle")&&N.has(r)?N.get(r):r,a)}});W.set(e,i);return i};y(l.interfaceTimerManager,"getCharacterTimer",e=>{if(e&&typeof e.draw==="function"&&!e[Q]){const t=e.draw;e.draw=function(i,...a){return t.call(this,te(i),...a)};Object.defineProperty(e,Q,{value:true})}return e});y(l.hero,"createStrTip",e=>j(e,l.hero.d?.uprawnienia,true));y(l.others,"createStrTip",(e,t)=>j(e,t[0]?.rights,false));y(l.npcs,"getTip",(e,t)=>K(e,t[0]));const E=(e,t)=>{const i=e.windows?.[t?.id],a=i?.contentEl?.querySelector(".player-info .character-name");if(!a)return;const n=i.playerData||t,r=!n.world||String(n.world).toLowerCase()===A(),d=r?String(n.id)===String(l.hero.d?.id)?l.hero.d:l.others.getById?.(n.id)?.d:null,o=n.uprawnienia??n.rights??d?.uprawnienia??d?.rights;a.dataset.waPlayerRole=k.get(x(n.world,n.id))??D(Number(o)||0)};y(l.showEqManager,"newWindow",(e,t,i)=>{E(i,t[0]);return e});const U=()=>{const e=l.worldWindow.playersOnline;if(!e||typeof e.createContextMenu!=="function"||_.has(e))return;const t=e.createContextMenu;e.createContextMenu=function(i,a){try{if(a?.c!=null&&Number.isFinite(Number(a.r))){const n=x(this.worldName,a.c),r=[1,2,4,16,32].find(o=>(Number(a.r)&o)===o)||0;k.delete(n);k.set(n,D(r));if(k.size>512)k.delete(k.keys().next().value);const d=l.showEqManager.windows?.[a.c];if(d&&x(d.playerData.world,a.c)===n)E(l.showEqManager,d.playerData)}}catch{}return t.apply(this,arguments)};_.add(e)};y(l.worldWindow,"open",e=>{U();return e});U();for(const e of Object.values(l.showEqManager.windows||{}))E(l.showEqManager,e.playerData);y(l.hero,"showGainedExp",(e,t)=>{for(const i of document.querySelectorAll(".gained-exp-indicator,.gained-exp-indicator-light-mode"))i.dataset.waDelta=t[0]>0?"gain":"loss";return e});y(l.hero,"showDifference",(e,t)=>{if(t[2]&&t[1]!==t[2]){const i=(t[0]?.[0]||t[0])?.querySelector?.(".diff-msg");if(i)i.dataset.waDelta=t[1]>t[2]?"gain":"loss"}return e});const J=Symbol.for("winter-atelier.timer-tip.v1");if(!h.fn.tip[J]){const e=h.fn.tip,t=new WeakMap,i=new WeakMap;const a=o=>{if(!o.startsWith("Potencjalne miejsce odrodzenia:"))return null;b.innerHTML=o;const s=b.content.querySelector("b+i"),c=M(s?.textContent),p=s?.nextSibling;const f=p?.nodeType===3?p.textContent.match(/^\s*(\d+)\s+lvl\b/):null;return c&&f?{d:{type:2,wt:{elite1:10,elite2:20,elite3:30,heros:80,colossus:90,tytan:100}[c],lvl:Number(f[1])},kind:c}:null};const n={1:"elite1",2:"elite2",3:"heros",4:"tytan",5:"elite3"};const r=(o,s)=>{if(!o)return;if(s){if(o.dataset.waNpc!=="")o.dataset.waNpc="";if(o.dataset.waKind!==s)o.dataset.waKind=s}else{delete o.dataset.waNpc;delete o.dataset.waKind}if(o.dataset.waLevel!==void 0)delete o.dataset.waLevel};const d=function(...o){try{const s=this[0];if(typeof o[0]==="string"&&o[0].startsWith("Potencjalne miejsce odrodzenia:")&&s?.closest?.(".dad-popup")){const c=o[0],p=[l.hero.getLevel?.()??l.hero.d?.lvl,l.worldConfig?.getDropDestroyLvl?.()].join("|"),f=i.get(s);if(f?.key===p&&(f.text===c||f.html===c))o[0]=f.html;else{const w=a(c);if(w){const u=K(c,w,true);i.set(s,{key:p,text:c,html:u});o[0]=u}}}if(typeof o[0]==="string"&&s?.classList&&(s.classList.contains("time-val")||s.classList.contains("name")&&s.classList.contains("cell"))){const c=s.closest(".elite-timer .row"),p=c&&h(c).data("obj");if(p){const f=p.user?null:n[p.type]||null;r(c.querySelector(".name-val"),f);if(f){const w=t.get(c),u=o[0];if(w?.kind===f&&(w.text===u||w.html===u))o[0]=w.html;else{const m=L(u,C=>{const Y=C.querySelector(".elite_timer_tip_name");r(Y,f);const O=Y?.nextElementSibling;if(O?.tagName==="I"){r(O,f);O.dataset.waNpcRank=""}});t.set(c,{kind:f,text:u,html:m});o[0]=m}}}}}catch{}return e.apply(this,o)};Object.defineProperty(d,J,{value:true});h.fn.tip=d;for(const o of document.querySelectorAll(".elite-timer .name.cell,.elite-timer .time-val")){const s=h(o),c=s.getTipData?.();if(typeof c==="string")s.tip(c)}}const X=Symbol.for("winter-atelier.minimap-tip.v1");if(typeof h.fn.tipShow==="function"&&!h.fn.tipShow[X]){const e=h.fn.tipShow,t=new WeakMap;const i=function(...a){try{const n=this[0],r=a[1];if(n?.classList?.contains("handheld-mini-map-canvas")||n?.id==="GAME_CANVAS"){const d=r?.getTip?.()||r?.tip,o=this.getTipData?.(),s=r?.getRef?.()||r,c=s?.spot;const p=c&&typeof c.hero==="string"&&Number(c.wtype)>79;const f=p?{d:{type:2,wt:Number(c.wtype),lvl:Number(c.lvl),prof:c.prof}}:s?.d?.wt!=null?s:s?.getData?.();if(d?.[1]==="t_npc"&&typeof o==="string"&&f?.d){const w=f.d,u=[w.type,w.wt,w.dad_kind,w.override_tip,w.lvl,w.prof,f.elasticLevel,l.hero.getLevel?.()??l.hero.d?.lvl,l.worldConfig?.getDropDestroyLvl?.()].join("|"),m=t.get(r);const C=m?.key===u&&(m.text===o||m.html===o)?m.html:K(o,f,p);t.set(r,{key:u,text:o,html:C});if(C!==o)this.tip(C,d[1],null,d[2])}}}catch{}return e.apply(this,a)};Object.defineProperty(i,X,{value:true});h.fn.tipShow=i}l[P]=true;try{l.hero.updateTip?.();l.others.otherTipRefresh?.();for(const e of Object.values(l.npcs.check?.()||{}))e.createTipFromNpcData?.()}catch{}return}console.warn("Winter Atelier: nie podłączono palety tooltipów — klient nie udostępnił metod UI.")})();

// =========================================================================
// VOID ATELIER v1.6.0 - CORE PATCH & DOM PURIFIER (AUTO-INJECTED AT BODY END)
// =========================================================================
(function () {
    'use strict';

    const PATCH_ID = 'motywy-ni-void-atelier-live-patch';
    const STORAGE_KEY = 'void_atelier_enabled';
    const BASE_URL = 'https://cdn.jsdelivr.net/gh/ebitek/Void-Atelier@main/';

    const patchEl = document.getElementById(PATCH_ID) || document.createElement('style');
    patchEl.id = PATCH_ID;
    patchEl.textContent = `
:root {
    --void-side-bg: url("${BASE_URL}assets/side-column-bg.png");
    --wa-control-top: #240a47 !important;
    --wa-control-bottom: #0d031c !important;
    --wa-panel-bg: #0b0318 !important;
    --wa-panel-alt: #14052b !important;
    --wa-border: rgba(139, 92, 246, 0.42) !important;
    --wa-border-soft: rgba(109, 40, 217, 0.28) !important;
}

/* 1. PRAWA I LEWA KOLUMNA Z NOWĄ GRAFIKĄ PNG */
html body .layer.interface-layer .main-column.right-column,
html body .layer.interface-layer .main-column.left-column {
    background-color: #080312 !important;
    background-image:
        linear-gradient(180deg, rgba(8, 3, 18, 0.35) 0%, rgba(8, 3, 18, 0.15) 50%, rgba(8, 3, 18, 0.45) 100%),
        var(--void-side-bg),
        var(--wa42) !important;
    background-size: 100% 100%, 100% 100%, cover !important;
    background-position: center top, center center, center !important;
    background-repeat: no-repeat !important;
    box-shadow:
        inset 1px 0 0 rgba(168, 85, 247, 0.55),
        inset -1px 0 0 rgba(168, 85, 247, 0.55),
        inset 0 0 22px rgba(0, 0, 0, 0.75) !important;
}

html body .layer.interface-layer .main-column.right-column .border,
html body .layer.interface-layer .main-column.left-column .border {
    background-image: linear-gradient(90deg, #05020a 0%, #d8b4fe 18%, #7e22ce 45%, #a855f7 60%, #3b0764 82%, #05020a 100%) !important;
    width: 6px !important;
    background-size: 6px 100% !important;
}

/* 2. PRZYWRÓCONE IKONY WIDŻETÓW (GÓRNY/DOLNY PASEK) ORAZ PRZYCISKI OGÓLNE */
html body .widget-button,
html body .widget-button.green,
html body .widget-button.blue,
html body .widget-button.purple,
html body .widget-button.orange,
html body .widget-button.black,
html body .widget-button.blink-violet,
html body .widget-button.transparent,
html body .button:not(.yes):not(.no):not(.want):not(.not-want):not(.need),
html body .button.green:not(.yes):not(.no),
html body .button.blue:not(.yes):not(.no),
html body .button.purple,
html body .button.transparent {
    --wa-control-top: #320b63ed !important;
    --wa-control-bottom: #100322f5 !important;
    --wa-control-bevel: inset 0 1px 0 rgba(233, 213, 255, 0.45), inset 0 -1px 0 #05010a, inset 1px 0 0 rgba(147, 51, 234, 0.55), inset -1px 0 0 #2e1065 !important;
    background-color: #16062e !important;
    background-image:
        linear-gradient(135deg, rgba(243, 232, 255, 0.1), transparent 30%, transparent 70%, rgba(5, 1, 12, 0.55)),
        linear-gradient(180deg, #380d70 0%, #1f0642 52%, #0e0220 100%),
        var(--wa-panel-image) !important;
    border-color: #070210 !important;
    box-shadow:
        inset 0 1px 0 rgba(233, 213, 255, 0.45),
        inset 0 -1px 0 #05010a,
        inset 1px 0 0 rgba(147, 51, 234, 0.5),
        inset -1px 0 0 #2e1065,
        0 2px 5px rgba(0, 0, 0, 0.7) !important;
    color: #ede9fe !important;
}

html body .widget-button.window-is-open,
html body .widget-button.red,
html body .widget-button:hover,
html body .button:not(.yes):not(.no).window-is-open,
html body .button:not(.yes):not(.no).active,
html body .button:not(.yes):not(.no):hover {
    background-image:
        linear-gradient(180deg, #5b189a 0%, #3b0d75 52%, #190536 100%),
        var(--wa-panel-image) !important;
    box-shadow:
        inset 0 1px 0 rgba(245, 208, 254, 0.7),
        inset 0 0 6px rgba(168, 85, 247, 0.4),
        0 0 6px rgba(147, 51, 234, 0.3) !important;
    color: #ffffff !important;
}

/* 3. LEWA KOLUMNA (CZAT) I PRAWA KOLUMNA (PLECAK / EQ) - STONOWANE RAMKI */
html body .new-chat-window {
    background-color: rgba(8, 3, 18, 0.55) !important;
    background-image: linear-gradient(180deg, rgba(20, 8, 42, 0.45) 0%, rgba(6, 2, 14, 0.65) 100%) !important;
    box-shadow: inset 0 0 0 1px rgba(139, 92, 246, 0.28) !important;
}

html body .chat-channel-card-wrapper {
    background: linear-gradient(180deg, rgba(38, 12, 82, 0.85) 0%, rgba(13, 4, 28, 0.95) 100%) !important;
    border-top: 1px solid rgba(147, 51, 234, 0.5) !important;
    border-bottom: 1px solid rgba(147, 51, 234, 0.5) !important;
}

html body .chat-channel-card-wrapper .chat-channel-card.active,
html body .chat-channel-card-wrapper .chat-channel-card:hover {
    background: radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(46, 16, 101, 0.75) 100%) !important;
    box-shadow: inset 0 0 0 1px rgba(196, 181, 253, 0.55) !important;
}

html body .chat-input-wrapper {
    background: linear-gradient(180deg, rgba(22, 8, 46, 0.9) 0%, rgba(8, 3, 18, 0.96) 100%) !important;
    border-top: 1px solid rgba(139, 92, 246, 0.45) !important;
}

html body .interface-element-bag-eq-icon-background {
    background: none !important;
    background-image: none !important;
    display: none !important;
}

html body .interface-element-equipment .eq-slot,
html body .interface-element-equipment-with-additional-bag .eq-slot {
    background-color: rgba(11, 4, 24, 0.78) !important;
    background-image: radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.18), rgba(7, 2, 15, 0.9)) !important;
    border: 1px solid rgba(124, 58, 237, 0.55) !important;
    box-shadow: inset 0 1px 0 rgba(233, 213, 255, 0.18), inset 0 0 8px #000 !important;
    border-radius: 3px !important;
}

html body .game-window-positioner .inventory_wrapper .inventory-grid-bg {
    background-color: rgba(8, 3, 18, 0.72) !important;
    border: 1px solid rgba(139, 92, 246, 0.5) !important;
    box-shadow: inset 0 0 0 1px #2e1065, inset 0 0 16px rgba(0, 0, 0, 0.85) !important;
    border-radius: 4px 0 4px 4px !important;
}

/* 4. ZAKŁADKI OKIEN, WYSZUKIWARKI I FILTR ŁUPÓW (STONOWANY CIEMNY FIOLET) */
html body .border-window .header-card,
html body .border-window .cards-header .card,
html body .border-window .cards-header > div,
html body .cards-header-wrapper .cards-header > div,
html body .cards-header > div,
html body .section-switcher > div,
html body .tabs-nav > div,
html body .menu-column .menu-item,
html body .left-column-list .item,
html body .clan-window .left-column .button,
html body .clan-window .menu .item,
html body .crafting-window .left-column .item,
html body .crafting-window .menu-item,
html body [class*="cards-header"] > div,
html body [class*="tab-header"] > div {
    background-color: #110422 !important;
    background-image: linear-gradient(180deg, #21083d 0%, #120424 55%, #090213 100%) !important;
    border-color: rgba(124, 58, 237, 0.45) !important;
    box-shadow: inset 0 1px 0 rgba(233, 213, 255, 0.12) !important;
    color: #c4b5fd !important;
}

html body .border-window .header-card.active,
html body .border-window .header-card:hover,
html body .border-window .cards-header .card.active,
html body .border-window .cards-header .card:hover,
html body .border-window .cards-header > div.active,
html body .border-window .cards-header > div:hover,
html body .cards-header-wrapper .cards-header > div.active,
html body .cards-header-wrapper .cards-header > div:hover,
html body .cards-header > div.active,
html body .cards-header > div:hover,
html body .clan-window .left-column .button.active,
html body .clan-window .left-column .button:hover,
html body [class*="cards-header"] > div.active,
html body [class*="cards-header"] > div:hover {
    background-color: #3b0764 !important;
    background-image: linear-gradient(180deg, #5b189a 0%, #3b0d75 55%, #1d063d 100%) !important;
    border-color: rgba(196, 181, 253, 0.65) !important;
    box-shadow: inset 0 1px 0 rgba(243, 232, 255, 0.5), inset 0 0 8px rgba(168, 85, 247, 0.25) !important;
    color: #ffffff !important;
}

html body .loot-filter-window,
html body .settings-window,
html body .addons-panel,
html body .border-window .scroll-pane .one-option,
html body .border-window .option-row,
html body .border-window .filter-item,
html body .border-window .addon-row,
html body .border-window .section-header,
html body .border-window .group-header {
    background-color: rgba(16, 5, 34, 0.65) !important;
    border-color: rgba(124, 58, 237, 0.3) !important;
    color: #e9d5ff !important;
}

html body .border-window .search-wrapper,
html body .border-window .search-panel,
html body .border-window .search-box,
html body .border-window input[type="text"],
html body .border-window input[type="number"],
html body .border-window .default-input,
html body .border-window .menu-wrapper,
html body .border-window select {
    background-color: #090214 !important;
    background-image: linear-gradient(180deg, #140529 0%, #080212 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.38) !important;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.85) !important;
    color: #ede9fe !important;
}

html body .progress-bar,
html body .bar-wrapper,
html body [class*="progress-bar"] {
    background-color: #090214 !important;
    background-image: linear-gradient(180deg, #15052b 0%, #080212 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.4) !important;
}

/* 5. LISTA GRACZY, MINUTNIK, GRUPA */
html body .who-is-here,
html body .min-timer,
html body .respawn-timer,
html body .timers-window,
html body .party,
html body .party-window {
    border: 1px solid rgba(139, 92, 246, 0.38) !important;
    border-radius: 6px !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.75) !important;
}

html body .who-is-here .background,
html body .min-timer .background,
html body .party .background {
    background-color: rgba(10, 3, 22, 0.65) !important;
    background-image: linear-gradient(180deg, rgba(32, 10, 68, 0.35) 0%, rgba(8, 2, 18, 0.65) 100%) !important;
}

html body .who-is-here .scroll-wrapper,
html body .who-is-here .scroll-pane,
html body .min-timer .scroll-wrapper,
html body .min-timer .scroll-pane {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
}

html body .who-is-here .one-other,
html body .who-is-here .other-row {
    background-color: rgba(20, 6, 42, 0.5) !important;
    background-image: linear-gradient(90deg, rgba(59, 18, 117, 0.28) 0%, rgba(14, 4, 30, 0.5) 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.26) !important;
    box-shadow: none !important;
    border-radius: 3px !important;
    margin-bottom: 2px !important;
}
html body .who-is-here .one-other *,
html body .who-is-here .other-row * {
    border-color: transparent !important;
    box-shadow: none !important;
}
html body .who-is-here .one-other:hover {
    background-color: rgba(68, 20, 130, 0.55) !important;
    border-color: rgba(196, 181, 253, 0.5) !important;
}

html body .who-is-here .bottom-part,
html body .who-is-here .search-wrapper,
html body .who-is-here .filter-wrapper {
    background-color: #0b0318 !important;
    border-top: 1px solid rgba(139, 92, 246, 0.22) !important;
    box-shadow: none !important;
}

html body .who-is-here input,
html body .who-is-here .default-input {
    background-color: rgba(6, 2, 14, 0.85) !important;
    border: 1px solid rgba(139, 92, 246, 0.3) !important;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.8) !important;
    border-radius: 3px !important;
    color: #e9d5ff !important;
}
html body .who-is-here input:focus {
    border-color: rgba(196, 181, 253, 0.6) !important;
}

html body .min-timer .one-timer,
html body .min-timer .timer-row,
html body .min-timer .add-timer,
html body .min-timer .scroll-pane > div {
    background-color: rgba(20, 6, 42, 0.55) !important;
    background-image: linear-gradient(180deg, rgba(48, 14, 96, 0.38) 0%, rgba(12, 4, 26, 0.68) 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.28) !important;
    box-shadow: none !important;
    border-radius: 4px !important;
    color: #e9d5ff !important;
}

html body .min-timer .add-timer *,
html body .min-timer .one-timer *,
html body [class*="timer"] [class*="add"] * {
    border: none !important;
    box-shadow: none !important;
    background: transparent !important;
}

html body .min-timer .add-timer:hover,
html body .min-timer .one-timer:hover {
    background-color: rgba(68, 20, 130, 0.55) !important;
    border-color: rgba(196, 181, 253, 0.5) !important;
}

html body .min-timer .one-timer .name,
html body .min-timer .one-timer span:first-child {
    color: #d8b4fe !important;
}

/* 6. OKNO ŁUPÓW (LOOT WINDOW) - TAK (ZIELONY) / NIE (CZERWONY) */
html body .loot-window .one-item-on-loot {
    background: linear-gradient(180deg, rgba(26, 8, 52, 0.75) 0%, rgba(9, 3, 20, 0.92) 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.45) !important;
    border-radius: 5px !important;
}

html body .loot-window .one-item-on-loot .button,
html body .loot-window .buttons-wrapper > div {
    background: rgba(14, 5, 28, 0.75) !important;
    border: 1px solid rgba(124, 58, 237, 0.3) !important;
    opacity: 0.4 !important;
    filter: grayscale(50%) brightness(0.7) !important;
    transform: scale(0.92) !important;
    transition: all 0.14s ease !important;
}

html body .loot-window .one-item-on-loot .button:first-of-type.active,
html body .loot-window .buttons-wrapper > div:first-child.active,
html body .loot-window .button.yes.active,
html body .loot-window .button.want.active {
    opacity: 1 !important;
    filter: none !important;
    transform: scale(1.05) !important;
    background: radial-gradient(circle at 50% 35%, #10b981 0%, #059669 55%, #064e3b 100%) !important;
    border: 1px solid #6ee7b7 !important;
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.75), inset 0 1px 0 #ffffff !important;
}

html body .loot-window .one-item-on-loot .button:last-of-type.active,
html body .loot-window .buttons-wrapper > div:last-child.active,
html body .loot-window .button.no.active,
html body .loot-window .button.not-want.active {
    opacity: 1 !important;
    filter: none !important;
    transform: scale(1.05) !important;
    background: radial-gradient(circle at 50% 35%, #f43f5e 0%, #be123c 55%, #4c0519 100%) !important;
    border: 1px solid #fda4af !important;
    box-shadow: 0 0 10px rgba(244, 63, 94, 0.75), inset 0 1px 0 #ffffff !important;
}

/* 7. TOOLTIPY PRZEDMIOTÓW ORAZ PANEL WALKI */
html body .tip-wrapper,
html body .tip-wrapper .content {
    background-color: #090214 !important;
    background-image:
        radial-gradient(circle at 50% 0%, rgba(109, 40, 217, 0.22) 0%, transparent 70%),
        linear-gradient(180deg, #15052b 0%, #090214 60%, #05010a 100%) !important;
    border: 1px solid rgba(168, 85, 247, 0.65) !important;
    border-radius: 6px !important;
    box-shadow: inset 0 0 0 1px #2e1065, 0 8px 24px rgba(0, 0, 0, 0.95) !important;
    color: #f3e8ff !important;
}

html body .tip-wrapper .border-image,
html body .tip-wrapper::before,
html body .tip-wrapper::after {
    display: none !important;
}

html body .battle-controller,
html body .battle-window {
    background-color: rgba(8, 2, 18, 0.92) !important;
    border: 1px solid rgba(147, 51, 234, 0.65) !important;
    box-shadow: inset 0 0 0 1px #2e1065, 0 0 25px rgba(0, 0, 0, 0.9) !important;
}

html body .popup-menu,
html body .battle-skill-menu {
    background-color: rgba(11, 3, 24, 0.96) !important;
    background-image: linear-gradient(180deg, rgba(48, 12, 86, 0.9) 0%, rgba(11, 3, 24, 0.98) 100%) !important;
    border: 1px solid rgba(168, 85, 247, 0.65) !important;
    border-radius: 6px !important;
}
`;

    const isTealColor = (col) => {
        if (!col) return false;
        const m = col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
        if (!m) return false;
        const r = +m[1], g = +m[2], b = +m[3];
        return (g > r + 6 && b > r + 6 && r < 95);
    };

    const purifyTealElements = (root = document.body) => {
        if (localStorage.getItem(STORAGE_KEY) === '0' || !root) return;
        const nodes = root.querySelectorAll(
            '.border-window *, .min-timer *, .who-is-here *, .party *, .popup-menu *, .battle-controller *, .settings-window *, [class*="loot-filter"] *'
        );
        for (let i = 0; i < nodes.length; i++) {
            const el = nodes[i];
            if (el.dataset.voidPurified) continue;
            if (el.closest('.widget-button') || el.closest('.one-item-on-loot')) continue;

            const cs = getComputedStyle(el);
            const bgImg = cs.backgroundImage || '';
            const bgCol = cs.backgroundColor || '';
            const borderCol = cs.borderTopColor || '';

            if (
                isTealColor(bgCol) ||
                /rgb\((1[0-9]|2[0-9]|3[0-9]|4[0-9]),\s*(3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]),\s*(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9])\)/.test(bgImg)
            ) {
                el.style.setProperty('background-color', 'rgba(18, 5, 38, 0.78)', 'important');
                el.style.setProperty(
                    'background-image',
                    'linear-gradient(180deg, rgba(36, 10, 72, 0.75) 0%, rgba(12, 3, 26, 0.88) 100%)',
                    'important'
                );
                if (cs.borderTopWidth !== '0px') {
                    el.style.setProperty('border-color', 'rgba(139, 92, 246, 0.32)', 'important');
                }
                el.dataset.voidPurified = '1';
            } else if (isTealColor(borderCol) && cs.borderTopWidth !== '0px') {
                el.style.setProperty('border-color', 'rgba(139, 92, 246, 0.32)', 'important');
                el.dataset.voidPurified = '1';
            }

            if (isTealColor(cs.color)) {
                el.style.setProperty('color', '#d8b4fe', 'important');
                el.dataset.voidPurified = '1';
            }
        }
    };

    const ensurePatchActive = () => {
        if (localStorage.getItem(STORAGE_KEY) !== '0') {
            if (document.body && document.body.lastElementChild !== patchEl) {
                document.body.appendChild(patchEl);
            }
            purifyTealElements();
        } else {
            patchEl.remove();
        }
    };

    ensurePatchActive();

    const observer = new MutationObserver((mutations) => {
        if (localStorage.getItem(STORAGE_KEY) === '0') return;
        if (document.body && document.body.lastElementChild !== patchEl) {
            document.body.appendChild(patchEl);
        }
        for (const m of mutations) {
            if (m.addedNodes.length) {
                purifyTealElements();
                break;
            }
        }
    });

    observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('void-atelier-toggle', ensurePatchActive);
})();

// =========================================================================
// INTEGRACJA: LABKOWY ZESTAW DODATKÓW (HUB / GRIINLAB) -> STYL VOID ATELIER
// =========================================================================
(function () {
    'use strict';

    const LAB_PATCH_ID = 'void-atelier-lab-hub-patch';
    const STORAGE_KEY = 'void_atelier_enabled';

    const labStyle = document.getElementById(LAB_PATCH_ID) || document.createElement('style');
    labStyle.id = LAB_PATCH_ID;
    labStyle.textContent = `
/* Główne okna, modale i panele Labkowego HUB-a */
html body [id*="lab" i]:not(script):not(style),
html body [class*="lab-" i],
html body [class*="lab_" i],
html body [class*="griin" i],
html body [id*="griin" i],
html body [class*="hub-" i] {
    border-color: rgba(139, 92, 246, 0.38) !important;
}

/* Kontenery okienek i paneli HUB-a */
html body div[class*="lab-" i][class*="window" i],
html body div[class*="lab-" i][class*="panel" i],
html body div[class*="lab-" i][class*="modal" i],
html body div[class*="lab-" i][class*="box" i],
html body div[class*="lab-" i][class*="container" i],
html body div[id*="lab" i][class*="window" i],
html body div[id*="lab" i][class*="panel" i],
html body div[class*="hub-window" i],
html body div[class*="hub-panel" i] {
    background-color: rgba(11, 3, 24, 0.94) !important;
    background-image: linear-gradient(180deg, rgba(42, 12, 84, 0.5) 0%, rgba(9, 2, 20, 0.96) 100%) !important;
    border: 1px solid rgba(147, 51, 234, 0.55) !important;
    border-radius: 6px !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(88, 28, 135, 0.35) !important;
    color: #f3e8ff !important;
}

/* Nagłówki okienek HUB-a */
html body [class*="lab-" i][class*="header" i],
html body [class*="lab-" i][class*="title" i],
html body [class*="lab-" i][class*="top" i],
html body [class*="hub-" i][class*="header" i] {
    background: linear-gradient(180deg, #4c1d95 0%, #24074d 60%, #120426 100%) !important;
    border-bottom: 1px solid rgba(168, 85, 247, 0.5) !important;
    color: #f3e8ff !important;
    text-shadow: 0 1px 2px #000 !important;
}

/* Wiersze dodatków, karty i sekcje wewnątrz HUB-a */
html body [class*="lab-" i][class*="item" i],
html body [class*="lab-" i][class*="row" i],
html body [class*="lab-" i][class*="card" i],
html body [class*="lab-" i][class*="addon" i],
html body [class*="hub-" i][class*="item" i],
html body [class*="hub-" i][class*="card" i] {
    background-color: rgba(20, 6, 42, 0.65) !important;
    background-image: linear-gradient(90deg, rgba(59, 18, 117, 0.25) 0%, rgba(14, 4, 30, 0.65) 100%) !important;
    border: 1px solid rgba(139, 92, 246, 0.28) !important;
    border-radius: 4px !important;
    color: #e9d5ff !important;
}

html body [class*="lab-" i][class*="item" i]:hover,
html body [class*="lab-" i][class*="row" i]:hover,
html body [class*="lab-" i][class*="card" i]:hover,
html body [class*="hub-" i][class*="item" i]:hover {
    background-color: rgba(68, 20, 130, 0.55) !important;
    border-color: rgba(196, 181, 253, 0.55) !important;
}

/* Przyciski i zakładki wewnątrz Labkowego HUB-a */
html body [class*="lab-" i] button,
html body [class*="lab-" i][class*="btn" i],
html body [class*="lab-" i][class*="button" i],
html body [class*="lab-" i][class*="tab" i],
html body [class*="hub-" i] button,
html body [class*="hub-" i][class*="btn" i] {
    background: linear-gradient(180deg, #3b0d75 0%, #1a0638 100%) !important;
    border: 1px solid rgba(147, 51, 234, 0.6) !important;
    border-radius: 4px !important;
    color: #f3e8ff !important;
    box-shadow: inset 0 1px 0 rgba(233, 213, 255, 0.25), 0 2px 4px rgba(0, 0, 0, 0.6) !important;
    text-shadow: 0 1px 2px #000 !important;
    transition: all 0.15s ease !important;
}

html body [class*="lab-" i] button:hover,
html body [class*="lab-" i][class*="btn" i]:hover,
html body [class*="lab-" i][class*="button" i]:hover,
html body [class*="lab-" i][class*="tab" i].active,
html body [class*="hub-" i] button:hover {
    background: linear-gradient(180deg, #6d28d9 0%, #3b0764 100%) !important;
    border-color: #d8b4fe !important;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.5), inset 0 1px 0 #ffffff !important;
    color: #ffffff !important;
}

/* Inputy, selecty i pola tekstowe w HUB-ie */
html body [class*="lab-" i] input:not([type="checkbox"]):not([type="radio"]),
html body [class*="lab-" i] select,
html body [class*="lab-" i] textarea,
html body [class*="hub-" i] input:not([type="checkbox"]):not([type="radio"]),
html body [class*="hub-" i] select {
    background-color: #080212 !important;
    border: 1px solid rgba(139, 92, 246, 0.45) !important;
    border-radius: 4px !important;
    color: #f3e8ff !important;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.85) !important;
}

/* Checkboxy i przełączniki (toggle/switch) w dodatkach */
html body [class*="lab-" i] input[type="checkbox"],
html body [class*="hub-" i] input[type="checkbox"] {
    accent-color: #9333ea !important;
}
`;

    // Skaner inline'owych stylów wstrzykiwanych przez zewnętrzne dodatki (np. core.js)
    const skinCustomAddonNodes = (root = document.body) => {
        if (localStorage.getItem(STORAGE_KEY) === '0' || !root) return;
        const nodes = root.querySelectorAll(
            '[id*="lab" i], [class*="lab" i], [id*="griin" i], [class*="griin" i], [class*="hub" i]'
        );
        for (let i = 0; i < nodes.length; i++) {
            const el = nodes[i];
            if (el.dataset.voidLabSkinned || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
            const cs = getComputedStyle(el);
            const bg = cs.backgroundColor || '';
            const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
            if (m) {
                const r = +m[1], g = +m[2], b = +m[3];
                // Jeśli dodatek ma własne szare, czarne, zielonkawe lub niebieskawe tło (gdzie R <= G lub R == G == B)
                if ((r + g + b > 15) && (r <= g + 10) && (b < 140)) {
                    el.style.setProperty('background-color', 'rgba(14, 4, 30, 0.9)', 'important');
                    el.style.setProperty(
                        'background-image',
                        'linear-gradient(180deg, rgba(38, 10, 76, 0.55) 0%, rgba(10, 3, 22, 0.92) 100%)',
                        'important'
                    );
                    if (cs.borderTopWidth !== '0px') {
                        el.style.setProperty('border-color', 'rgba(139, 92, 246, 0.38)', 'important');
                    }
                    el.dataset.voidLabSkinned = '1';
                }
            }
        }
    };

    const syncLabPatch = () => {
        if (localStorage.getItem(STORAGE_KEY) !== '0') {
            if (document.body && labStyle.parentNode !== document.body) {
                document.body.appendChild(labStyle);
            }
            skinCustomAddonNodes();
        } else {
            labStyle.remove();
        }
    };

    syncLabPatch();

    const obs = new MutationObserver((mutations) => {
        if (localStorage.getItem(STORAGE_KEY) === '0') return;
        if (document.body && document.body.lastElementChild !== labStyle) {
            document.body.appendChild(labStyle);
        }
        for (const m of mutations) {
            if (m.addedNodes.length) {
                skinCustomAddonNodes();
                break;
            }
        }
    });

    obs.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
    });

    window.addEventListener('void-atelier-toggle', syncLabPatch);
})();
