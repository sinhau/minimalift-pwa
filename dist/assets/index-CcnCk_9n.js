var $=Object.defineProperty;var F=(c,e,t)=>e in c?$(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var a=(c,e,t)=>F(c,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          height: 100vh;
          height: 100dvh;
          background: var(--bg-primary);
          color: var(--text-primary);
          position: relative;
        }

        header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          padding: env(safe-area-inset-top) 16px 0 16px;
          border-bottom: 1px solid var(--border);
          z-index: 10;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .logo {
          display: flex;
          align-items: center;
        }

        .day-selector {
          display: flex;
          gap: 8px;
        }

        .day-btn {
          padding: 6px 12px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .day-btn.active {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        main {
          position: absolute;
          top: calc(env(safe-area-inset-top) + 65px); /* Safe area + header content */
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0;
          background: var(--bg-primary);
        }

        .timer-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom));
          display: none;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .timer-bar.active {
          display: block;
        }

        .timer-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .timer-display {
          font-size: 24px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        .timer-controls {
          display: flex;
          gap: 8px;
        }

        .timer-btn {
          padding: 8px 16px;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
        }

        .timer-btn.pause {
          background: var(--warning);
        }

        .timer-round {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-primary: #000000;
            --bg-secondary: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #999999;
            --border: #333333;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <header>
        <div class="header-content">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="6" fill="#000000"/>
              <text x="16" y="16" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">M</text>
            </svg>
          </div>
          <div class="day-selector">
            <button class="day-btn active" data-day="1">Day 1</button>
            <button class="day-btn" data-day="2">Day 2</button>
            <button class="day-btn" data-day="3">Day 3</button>
          </div>
          <div class="header-actions">
            <update-indicator></update-indicator>
          </div>
        </div>
      </header>

      <main id="content">
      </main>

      <div class="timer-bar" id="timer-bar">
        <div class="timer-content">
          <div>
            <div class="timer-display" id="timer-display">00:00</div>
            <div class="timer-round" id="timer-round">Round 1/6</div>
          </div>
          <div class="timer-controls">
            <button class="timer-btn" id="timer-toggle">Start</button>
            <button class="timer-btn pause" id="timer-reset">Reset</button>
          </div>
        </div>
      </div>
    `)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.querySelectorAll(".day-btn").forEach(e=>{e.addEventListener("click",t=>{const i=t.target.dataset.day;i&&this.selectDay(i)})})}selectDay(e){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(s=>{s.classList.remove("active")}),this.shadowRoot.querySelector(`.day-btn[data-day="${e}"]`)?.classList.add("active"),this.dispatchEvent(new CustomEvent("day-selected",{detail:{day:e}}))}showTimer(e,t){if(!this.shadowRoot)return;const s=this.shadowRoot.querySelector("#timer-bar"),i=this.shadowRoot.querySelector("#timer-display"),r=this.shadowRoot.querySelector("#timer-round");s&&s.classList.add("active"),i&&(i.textContent=e),r&&(r.textContent=t)}hideTimer(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("#timer-bar");e&&e.classList.remove("active")}}customElements.define("app-shell",M);const A="modulepreload",B=function(c){return"/"+c},I={},z=function(e,t,s){let i=Promise.resolve();if(t&&t.length>0){let g=function(d){return Promise.all(d.map(m=>Promise.resolve(m).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};var n=g;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");i=g(t.map(d=>{if(d=B(d),d in I)return;I[d]=!0;const m=d.endsWith(".css"),x=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":A,m||(f.as="script"),f.crossOrigin="",f.href=d,l&&f.setAttribute("nonce",l),document.head.appendChild(f),m)return new Promise((L,P)=>{f.addEventListener("load",L),f.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};class U{constructor(){a(this,"db",null);a(this,"dbName","minimalift_v1");a(this,"version",1)}async openDb(){return this.db?this.db:new Promise((e,t)=>{const s=indexedDB.open(this.dbName,this.version);s.onerror=()=>t(s.error),s.onsuccess=()=>{this.db=s.result,e(this.db)},s.onupgradeneeded=i=>{const r=i.target.result;if(r.objectStoreNames.contains("programs")||r.createObjectStore("programs",{keyPath:"programId"}),r.objectStoreNames.contains("days")||r.createObjectStore("days",{keyPath:"dayId"}).createIndex("programId","programId",{unique:!1}),!r.objectStoreNames.contains("sessions")){const n=r.createObjectStore("sessions",{keyPath:"sessionId",autoIncrement:!0});n.createIndex("dayId","dayId",{unique:!1}),n.createIndex("date","startedAt",{unique:!1})}}})}async tx(e,t="readonly"){return(await this.openDb()).transaction([e],t).objectStore(e)}async get(e,t){const s=await this.tx(e);return new Promise((i,r)=>{const n=s.get(t);n.onsuccess=()=>i(n.result),n.onerror=()=>r(n.error)})}async getAll(e){const t=await this.tx(e);return new Promise((s,i)=>{const r=t.getAll();r.onsuccess=()=>s(r.result),r.onerror=()=>i(r.error)})}async put(e,t){const s=await this.tx(e,"readwrite");return new Promise((i,r)=>{const n=s.put(t);n.onsuccess=()=>i(n.result),n.onerror=()=>r(n.error)})}async delete(e,t){const s=await this.tx(e,"readwrite");return new Promise((i,r)=>{const n=s.delete(t);n.onsuccess=()=>i(),n.onerror=()=>r(n.error)})}async indexGetAll(e,t,s){const r=(await this.tx(e)).index(t);return new Promise((n,o)=>{const l=s?r.getAll(s):r.getAll();l.onsuccess=()=>n(l.result),l.onerror=()=>o(l.error)})}async clear(e){const t=await this.tx(e,"readwrite");return new Promise((s,i)=>{const r=t.clear();r.onsuccess=()=>s(),r.onerror=()=>i(r.error)})}}const b=new U,y=class y{constructor(){}static getInstance(){return y.instance||(y.instance=new y),y.instance}async initialize(){const{seedData:e}=await z(async()=>{const{seedData:s}=await import("./seed-data-G69QiYQA.js");return{seedData:s}},[]);await b.get("programs",e.programId)||await this.loadSeedData(e)}async loadSeedData(e){const t={programId:e.programId,title:e.title};await b.put("programs",t);for(const s of e.days)await b.put("days",s);console.log("Seed data loaded successfully")}async getProgram(e){return await b.get("programs",e)}async getDaysForProgram(e){return await b.indexGetAll("days","programId",e)}async getDay(e){return await b.get("days",e)}async getAllDays(){return(await b.getAll("days")).sort((t,s)=>t.order-s.order)}};a(y,"instance");let T=y;const w=T.getInstance();class W extends HTMLElement{constructor(){super();a(this,"days",[]);this.attachShadow({mode:"open"})}async connectedCallback(){this.days=await w.getAllDays(),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          padding: 16px;
        }

        h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--text-primary);
        }

        .subtitle {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .day-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .day-card {
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .day-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
        }

        .day-number {
          display: inline-block;
          width: 32px;
          height: 32px;
          background: var(--accent);
          color: white;
          border-radius: 8px;
          text-align: center;
          line-height: 32px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .day-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .day-summary {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .day-blocks {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          flex-wrap: wrap;
        }

        .block-badge {
          background: var(--bg-primary);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        :host {
          --bg-primary: #000000;
          --bg-secondary: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: #999999;
          --border: #333333;
          --accent: #007AFF;
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
          }
        }
      </style>

      <h1>Minimalift</h1>
      <div class="subtitle">3-Day Full Body Program</div>
      
      <div class="day-cards">
        ${this.days.map(t=>this.renderDayCard(t)).join("")}
      </div>
    `,this.shadowRoot.querySelectorAll(".day-card").forEach(t=>{t.addEventListener("click",s=>{const i=s.currentTarget.dataset.dayId;i&&this.dispatchEvent(new CustomEvent("navigate-to-day",{detail:{dayId:i},bubbles:!0,composed:!0}))})}))}renderDayCard(t){const s=[...new Set(t.blocks.map(r=>r.type))],i=t.blocks.reduce((r,n)=>r+n.exercises.length,0);return`
      <div class="day-card" data-day-id="${t.dayId}">
        <div class="day-number">${t.order}</div>
        <div class="day-title">${t.title}</div>
        <div class="day-summary">${i} exercises • ${t.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${s.map(r=>`<span class="block-badge">${r}</span>`).join("")}
        </div>
      </div>
    `}}customElements.define("view-home",W);class H extends HTMLElement{constructor(){super();a(this,"day",null);this.attachShadow({mode:"open"})}async loadDay(t){this.day=await w.getDay(t)||null,this.render()}render(){if(this.shadowRoot){if(!this.day){this.shadowRoot.innerHTML="<p>Loading...</p>";return}this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          padding: 16px;
          padding-bottom: 120px; /* Extra space for fixed button */
          box-sizing: border-box;
        }

        h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 24px 0;
          color: var(--text-primary);
        }

        .block {
          margin-bottom: 32px;
          background: var(--bg-secondary);
          border-radius: 12px;
          padding: 16px;
        }

        .block-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .block-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .timer-badge {
          background: var(--accent);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .exercise {
          background: var(--bg-primary);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 8px;
        }

        .exercise:last-child {
          margin-bottom: 0;
        }

        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .exercise-name {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
        }

        .exercise-sets-reps {
          font-size: 14px;
          color: var(--accent);
          font-weight: 500;
        }

        .exercise-cues {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 4px;
        }

        .substitutes {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        .substitute-chip {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          border: 1px solid var(--border);
          cursor: pointer;
        }

        .substitute-chip:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }

        .start-session-btn {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
          z-index: 100;
        }

        :host {
          --bg-primary: #000000;
          --bg-secondary: #1a1a1a;
          --text-primary: #ffffff;
          --text-secondary: #999999;
          --border: #333333;
          --accent: #007AFF;
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
          }
        }
      </style>

      <h2>${this.day.title}</h2>
      
      ${this.day.blocks.map(t=>this.renderBlock(t)).join("")}
      
      <button class="start-session-btn" data-day-id="${this.day.dayId}">
        Start Session
      </button>
    `,this.shadowRoot.querySelector(".start-session-btn")?.addEventListener("click",t=>{const i=t.target.dataset.dayId;i&&this.dispatchEvent(new CustomEvent("start-session",{detail:{dayId:i},bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".substitute-chip").forEach(t=>{t.addEventListener("click",s=>{const i=s.target,r=i.dataset.exerciseId,n=i.dataset.substitute;r&&n&&console.log("Switch to substitute:",n,"for exercise:",r)})})}}renderBlock(t){const s=this.getTimerLabel(t.timerType);return`
      <div class="block">
        <div class="block-header">
          <span class="block-title">${this.getBlockTitle(t.type)}</span>
          ${s?`<span class="timer-badge">${s}</span>`:""}
        </div>
        
        ${t.exercises.map(i=>this.renderExercise(i)).join("")}
      </div>
    `}renderExercise(t){const s=t.sets?`${t.sets} × ${t.reps}`:t.reps;return`
      <div class="exercise">
        <div class="exercise-header">
          <span class="exercise-name">${t.name}</span>
          <span class="exercise-sets-reps">${s}</span>
        </div>
        
        ${t.cues?`<div class="exercise-cues">${t.cues}</div>`:""}
        
        ${t.substitutes&&t.substitutes.length>0?`
          <div class="substitutes">
            ${t.substitutes.map(i=>`
              <span class="substitute-chip" 
                    data-exercise-id="${t.id}" 
                    data-substitute="${i}">
                ${i}
              </span>
            `).join("")}
          </div>
        `:""}
      </div>
    `}getBlockTitle(t){return{warmup:"Warm Up",strength:"Strength & Condition",swole:"Swole & Flexy",accessory:"Accessories"}[t]||t}getTimerLabel(t){return{interval:"Interval",work_rest:"Work/Rest",circuit:"Circuit",tabata:"Tabata",stopwatch:"Stopwatch",none:""}[t]||""}}customElements.define("view-day",H);class D extends HTMLElement{constructor(){super();a(this,"shadow");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}disconnectedCallback(){this.cleanup()}setupEventListeners(){}cleanup(){}setHTML(t){this.shadow&&(this.shadow.innerHTML=t)}emit(t,s){this.dispatchEvent(new CustomEvent(t,{detail:s,bubbles:!0,composed:!0}))}$(t){return this.shadow?.querySelector(t)??null}$$(t){return this.shadow?.querySelectorAll(t)??[]}}class N{constructor(){a(this,"day",null);a(this,"blockIndex",0);a(this,"exerciseIndex",0);a(this,"setIndex",0);a(this,"isRestingBetweenSets",!1);a(this,"sessionStartTime",0)}initialize(e){this.day=e,this.blockIndex=0,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,this.sessionStartTime=Date.now()}getDay(){return this.day}getCurrentBlock(){return!this.day||this.blockIndex>=this.day.blocks.length?null:this.day.blocks[this.blockIndex]}getCurrentExercise(){const e=this.getCurrentBlock();return!e||this.exerciseIndex>=e.exercises.length?null:e.exercises[this.exerciseIndex]}getNextExercise(){const e=this.getCurrentBlock();return e?this.exerciseIndex+1<e.exercises.length?e.exercises[this.exerciseIndex+1]:this.day&&this.blockIndex+1<this.day.blocks.length&&this.day.blocks[this.blockIndex+1].exercises[0]||null:null}getCurrentIntervalExercises(){const e=this.getCurrentBlock();if(!e||e.timerType!=="interval")return[];const t=e.timerConfig?.exercisesPerInterval||1,s=Math.floor(this.exerciseIndex/t)*t;return e.exercises.slice(s,s+t)}nextSet(){const e=this.getCurrentExercise();return!e||!e.sets?!1:this.setIndex+1<e.sets?(this.setIndex++,this.isRestingBetweenSets=!1,!0):!1}nextExercise(){const e=this.getCurrentBlock();return e?(this.setIndex=0,this.isRestingBetweenSets=!1,this.exerciseIndex+1<e.exercises.length?(this.exerciseIndex++,!0):this.nextBlock()):!1}skipIntervalGroup(){const e=this.getCurrentBlock();if(!e||e.timerType!=="interval")return this.nextExercise();const t=e.timerConfig?.exercisesPerInterval||1,i=(Math.floor(this.exerciseIndex/t)+1)*t;return i<e.exercises.length?(this.exerciseIndex=i,this.setIndex=0,this.isRestingBetweenSets=!1,!0):this.nextBlock()}nextBlock(){return!this.day||this.blockIndex+1>=this.day.blocks.length?!1:(this.blockIndex++,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,!0)}isComplete(){return this.day?this.blockIndex>=this.day.blocks.length:!0}getProgress(){if(!this.day)return{current:0,total:0,percentage:0};const e=this.day.blocks.reduce((i,r)=>i+r.exercises.length,0),t=this.day.blocks.slice(0,this.blockIndex).reduce((i,r)=>i+r.exercises.length,0)+this.exerciseIndex,s=e>0?Math.round(t/e*100):0;return{current:t,total:e,percentage:s}}getIndices(){return{blockIndex:this.blockIndex,exerciseIndex:this.exerciseIndex,setIndex:this.setIndex}}setResting(e){this.isRestingBetweenSets=e}isResting(){return this.isRestingBetweenSets}getCurrentSetNumber(){return this.setIndex+1}getSessionDuration(){return Date.now()-this.sessionStartTime}reset(){this.blockIndex=0,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,this.sessionStartTime=Date.now()}}class u{static renderHeader(e,t){return e?`
      <div class="session-header">
        <div class="session-header-top">
          <div class="session-title">${e.title}</div>
          <button class="cancel-session-btn" data-action="cancel-session" aria-label="Cancel session">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="session-progress">
          <div class="progress-bar" style="width: ${t.percentage}%"></div>
        </div>
      </div>
    `:""}static renderCurrentExercises(e,t,s){if(!e.length||!t)return"";if(e.length>1)return`
        <div class="current-exercise">
          ${e.map(n=>`
            <div class="exercise-group">
              <div class="exercise-name">${n.name}</div>
              <div class="exercise-details">${this.formatExerciseDetails(n,t)}</div>
            </div>
          `).join("")}
        </div>
      `;const i=e[0],r=s&&i.sets?`<div class="set-counter">Set ${s} of ${i.sets}</div>`:"";return`
      <div class="current-exercise">
        <div class="exercise-name">${i.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(i,t)}</div>
        ${r}
      </div>
    `}static renderTimerInfo(e){if(!e||!e.timerConfig)return"";const t=e.timerConfig;let s="";if(e.timerType==="interval"&&t.intervalSec){const i=t.intervalSec>=60?Math.floor(t.intervalSec/60):0,r=i>0?`${i} min`:`${t.intervalSec}s`,n=t.exercisesPerInterval||1,o=n>1?`${n} exercises`:"1 exercise";s=`Every ${r} • ${o} per interval`}else e.timerType==="work_rest"?(s=t.workSec?`Work: ${t.workSec}s`:"",t.restSec&&(s+=s?` • Rest: ${t.restSec}s`:`Rest: ${t.restSec}s`)):e.timerType==="circuit"&&t.stations&&(s=`${t.stations.length} stations`);return s?`<div class="timer-info">${s}</div>`:""}static renderControls(e,t,s,i,r,n){const o=[];if(i){if(e)t?o.push(`
          <button class="control-btn primary" data-action="resume">
            Resume
          </button>
        `):o.push(`
          <button class="control-btn secondary" data-action="pause">
            Pause
          </button>
        `);else{const l=r?"Start Round":"Start Exercise";o.push(`
          <button class="control-btn primary" data-action="start">
            ${l}
          </button>
        `)}(e||t)&&o.push(`
          <button class="control-btn secondary" data-action="reset">
            Reset
          </button>
        `)}else s?o.push(`
        <button class="control-btn primary" data-action="skip-rest">
          Skip Rest
        </button>
      `):o.push(`
        <button class="control-btn primary" data-action="complete-set">
          Complete Set
        </button>
      `);return r&&n?o.push(`
        <button class="control-btn secondary" data-action="skip-group">
          Skip Round
        </button>
      `):o.push(`
        <button class="control-btn secondary" data-action="skip">
          Skip Exercise
        </button>
      `),`
      <div class="session-controls">
        ${o.join("")}
      </div>
    `}static renderNextUp(e){return e?`
      <div class="next-up">
        <div class="next-label">Next Up</div>
        <div class="next-exercise">${e.name}</div>
      </div>
    `:""}static renderSessionComplete(){return`
      <div class="session-complete">
        <div class="complete-icon">✓</div>
        <h2>Workout Complete!</h2>
        <p>Great job! Your workout has been completed.</p>
        <button class="control-btn primary" data-action="finish">
          Finish Session
        </button>
      </div>
    `}static renderSaveDialog(){return`
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Save Workout?</h3>
          <p>Would you like to save this workout session?</p>
          <div class="dialog-buttons">
            <button class="control-btn primary" data-action="save">
              Save Session
            </button>
            <button class="control-btn secondary" data-action="discard">
              Discard
            </button>
          </div>
        </div>
      </div>
    `}static renderCancelDialog(){return`
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Cancel Workout?</h3>
          <p>Are you sure you want to cancel this workout session? All progress will be lost.</p>
          <div class="dialog-buttons">
            <button class="control-btn secondary" data-action="cancel-confirm">
              Yes, Cancel
            </button>
            <button class="control-btn primary" data-action="cancel-dismiss">
              Continue Workout
            </button>
          </div>
        </div>
      </div>
    `}static renderRestTimer(e){return`
      <div class="rest-timer">
        <div class="rest-label">REST</div>
        <div class="rest-countdown">${e}</div>
        <button class="control-btn secondary" data-action="skip-rest">
          Skip Rest
        </button>
      </div>
    `}static formatExerciseDetails(e,t){const s=[];return t.timerType==="interval"&&t.timerConfig?.rounds?s.push(`${t.timerConfig.rounds} rounds × ${e.reps||"?"} reps`):e.sets&&e.reps?s.push(`${e.sets} × ${e.reps}`):e.reps&&s.push(e.reps),e.cues&&s.push(`<span class="exercise-cues">${e.cues}</span>`),s.join(" • ")}static renderContainer(e){return`
      <div class="session-container">
        ${e.header||""}
        <div class="session-main">
          ${e.exercises||""}
          ${e.timerInfo||""}
          ${e.timer||'<div id="timer-display"></div>'}
          ${e.controls||""}
          ${e.nextUp||""}
        </div>
      </div>
    `}static renderEmpty(){return`
      <div class="session-empty">
        <p>No workout loaded</p>
      </div>
    `}}class v{constructor(e=100){a(this,"startTime",0);a(this,"pausedTime",0);a(this,"totalPausedDuration",0);a(this,"intervalId",null);a(this,"state","idle");a(this,"callbacks",[]);this.tickInterval=e}start(){this.state!=="running"&&(this.state==="paused"?this.totalPausedDuration+=performance.now()-this.pausedTime:(this.startTime=performance.now(),this.totalPausedDuration=0),this.state="running",this.intervalId=window.setInterval(()=>this.tick(),this.tickInterval),this.notifyStateChange())}pause(){this.state==="running"&&(this.state="paused",this.pausedTime=performance.now(),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.notifyStateChange())}reset(){this.stop(),this.state="idle",this.startTime=0,this.pausedTime=0,this.totalPausedDuration=0,this.notifyStateChange()}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}getState(){return this.state}getElapsedTime(){return this.startTime===0?0:(this.state==="paused"?this.pausedTime:performance.now())-this.startTime-this.totalPausedDuration}addCallback(e){this.callbacks.push(e)}removeCallback(e){const t=this.callbacks.indexOf(e);t>-1&&this.callbacks.splice(t,1)}tick(){const e=this.getElapsedTime(),t=this.getRemainingInCurrentPeriod(),s=this.getCurrentRound(),i=this.getTotalRounds(),r=this.getDuration();if(e>=r-100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:r,remaining:0,round:s,totalRounds:i,state:this.state});return}const n=this.getPreviousRound(e-this.tickInterval);s>n&&n>0&&this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:n,totalRounds:i,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:i,state:this.state})}notifyCallbacks(e){this.callbacks.forEach(t=>{try{t(e)}catch(s){console.error("Timer callback error:",s)}})}notifyStateChange(){const e=this.getElapsedTime();this.notifyCallbacks({type:"stateChange",elapsed:e,remaining:this.getRemainingInCurrentPeriod(),round:this.getCurrentRound(),totalRounds:this.getTotalRounds(),state:this.state})}static formatTime(e){const t=e<=100?0:Math.max(0,Math.ceil(e/1e3)),s=Math.floor(t/60),i=t%60;return`${s.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`}static formatTimeWithMs(e){const t=Math.max(0,e),s=Math.floor(t/1e3),i=Math.floor(t%1e3/100),r=Math.floor(s/60),n=s%60;return`${r.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${i}`}}class q extends v{constructor(t,s,i=1){super();a(this,"currentRound",1);this.intervalSec=t,this.totalRounds=s,this.exercisesPerInterval=i}getDuration(){return this.intervalSec*this.totalRounds*1e3}getCurrentRound(){const t=this.getElapsedTime();return Math.min(Math.floor(t/(this.intervalSec*1e3))+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%(this.intervalSec*1e3)}getRemainingInCurrentPeriod(){return this.intervalSec*1e3-this.getTimeInCurrentPeriod()}getExercisesPerInterval(){return this.exercisesPerInterval}getPreviousRound(t){return Math.min(Math.floor(t/(this.intervalSec*1e3))+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),s=this.getDuration()-t,i=this.getCurrentRound();if(s<=0){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:t,remaining:s,round:i,totalRounds:this.totalRounds,state:this.state});return}i>this.currentRound&&(this.currentRound=i,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:s,round:i-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:t,remaining:s,round:i,totalRounds:this.totalRounds,state:this.state})}}class k extends v{constructor(t,s,i){super();a(this,"currentSet",1);a(this,"isWorkPhase",!0);this.workSec=t,this.restSec=s,this.totalSets=i}getDuration(){return(this.workSec+this.restSec)*this.totalSets*1e3}getCurrentRound(){return this.currentSet}getTotalRounds(){return this.totalSets}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),s=(this.workSec+this.restSec)*1e3,i=t%s;return i<this.workSec*1e3?i:i-this.workSec*1e3}getRemainingInCurrentPeriod(){const t=this.getElapsedTime(),s=(this.workSec+this.restSec)*1e3,i=t%s;return i<this.workSec*1e3?this.workSec*1e3-i:this.restSec*1e3-(i-this.workSec*1e3)}isInWorkPhase(){const t=this.getElapsedTime(),s=(this.workSec+this.restSec)*1e3;return t%s<this.workSec*1e3}getPreviousRound(t){return Math.min(Math.floor(t/((this.workSec+this.restSec)*1e3))+1,this.totalSets)}tick(){const t=this.getElapsedTime(),s=this.getDuration()-t,i=Math.min(Math.floor(t/((this.workSec+this.restSec)*1e3))+1,this.totalSets),r=this.isWorkPhase;if(this.isWorkPhase=this.isInWorkPhase(),s<=100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:this.getDuration(),remaining:0,round:this.totalSets,totalRounds:this.totalSets,state:this.state});return}i>this.currentSet?(this.currentSet=i,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:s,round:i-1,totalRounds:this.totalSets,state:this.state})):r&&!this.isWorkPhase&&this.notifyCallbacks({type:"tick",elapsed:t,remaining:s,round:i,totalRounds:this.totalSets,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:t,remaining:s,round:i,totalRounds:this.totalSets,state:this.state})}}class j extends v{constructor(t,s,i=0){super();a(this,"currentRound",1);a(this,"currentStationIndex",0);this.stations=t,this.totalRounds=s,this.transitionSec=i}getDuration(){const t=this.stations.reduce((i,r)=>i+r.durationSec,0),s=this.transitionSec*Math.max(0,this.stations.length-1);return(t+s)*this.totalRounds*1e3}getCurrentRound(){return this.currentRound}getTotalRounds(){return this.totalRounds}getCurrentStation(){return this.currentStationIndex<this.stations.length?this.stations[this.currentStationIndex]:null}getCurrentStationIndex(){return this.currentStationIndex}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),s=this.getRoundDuration(),i=t%s;let r=0;for(let n=0;n<this.stations.length;n++){const o=this.stations[n].durationSec*1e3;if(i<r+o)return i-r;if(r+=o,n<this.stations.length-1){const l=this.transitionSec*1e3;if(i<r+l)return i-r;r+=l}}return 0}getRemainingInCurrentPeriod(){const t=this.getCurrentStation();return t?(this.isInTransition()?this.transitionSec*1e3:t.durationSec*1e3)-this.getTimeInCurrentPeriod():0}isInTransition(){const t=this.getElapsedTime(),s=this.getRoundDuration(),i=t%s;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,i<r)return!1;if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,i<r))return!0}return!1}getRoundDuration(){const t=this.stations.reduce((i,r)=>i+r.durationSec*1e3,0),s=this.transitionSec*Math.max(0,this.stations.length-1)*1e3;return t+s}updateCurrentPosition(){const t=this.getElapsedTime(),s=this.getRoundDuration();this.currentRound=Math.min(Math.floor(t/s)+1,this.totalRounds);const i=t%s;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,i<r){this.currentStationIndex=n;return}if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,i<r)){this.currentStationIndex=n;return}}this.currentStationIndex=this.stations.length-1}getPreviousRound(t){const s=this.getRoundDuration();return Math.min(Math.floor(t/s)+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),s=this.getDuration()-t;if(s<=0){this.state="completed",this.stop();return}const i=this.currentRound;this.updateCurrentPosition(),this.currentRound>i&&this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:s,round:i,totalRounds:this.totalRounds,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:t,remaining:s,round:this.currentRound,totalRounds:this.totalRounds,state:this.state})}}class O extends v{constructor(t,s,i){super();a(this,"currentRound",1);this.highIntensitySec=t,this.lowIntensitySec=s,this.totalRounds=i}getDuration(){return(this.highIntensitySec+this.lowIntensitySec)*this.totalRounds*1e3}getCurrentRound(){const t=this.getElapsedTime(),s=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(t/s)+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),s=(this.highIntensitySec+this.lowIntensitySec)*1e3,i=t%s;return i<this.highIntensitySec*1e3?i:i-this.highIntensitySec*1e3}getRemainingInCurrentPeriod(){const t=this.getElapsedTime(),s=(this.highIntensitySec+this.lowIntensitySec)*1e3,i=t%s;return i<this.highIntensitySec*1e3?this.highIntensitySec*1e3-i:this.lowIntensitySec*1e3-(i-this.highIntensitySec*1e3)}isHighIntensity(){const t=this.getElapsedTime(),s=(this.highIntensitySec+this.lowIntensitySec)*1e3;return t%s<this.highIntensitySec*1e3}getPreviousRound(t){const s=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(t/s)+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),s=this.getDuration()-t,i=this.getCurrentRound();if(s<=0){this.state="completed",this.stop();return}i>this.currentRound&&(this.currentRound=i,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:s,round:i-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:t,remaining:s,round:i,totalRounds:this.totalRounds,state:this.state})}}class _ extends v{constructor(){super();a(this,"laps",[])}getDuration(){return Number.MAX_SAFE_INTEGER}getCurrentRound(){return this.laps.length+1}getTotalRounds(){return 0}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),s=this.laps.length>0?this.laps[this.laps.length-1]:0;return t-s}getRemainingInCurrentPeriod(){return 0}addLap(){const t=this.getElapsedTime();this.laps.push(t),this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:0,round:this.laps.length,totalRounds:0,state:this.state})}getLaps(){return[...this.laps]}getLapTime(t){if(t<0||t>=this.laps.length)return 0;const s=this.laps[t],i=t>0?this.laps[t-1]:0;return s-i}reset(){super.reset(),this.laps=[]}getPreviousRound(t){return this.laps.length}tick(){const t=this.getElapsedTime();this.notifyCallbacks({type:"tick",elapsed:t,remaining:0,round:this.laps.length+1,totalRounds:0,state:this.state})}}class S{static createTimer(e,t){if(!t&&e!=="stopwatch")return null;switch(e){case"interval":if(t?.intervalSec&&t?.rounds)return new q(t.intervalSec,t.rounds,t.exercisesPerInterval||1);break;case"work_rest":if(t?.workSec&&t?.restSec&&t?.rounds)return new k(t.workSec,t.restSec,t.rounds);if(t?.restSec&&t?.rounds)return new k(0,t.restSec,t.rounds);break;case"circuit":if(t?.stations&&t.stations.length>0&&t?.rounds)return new j(t.stations,t.rounds,t.transitionSec||0);break;case"tabata":if(t?.highIntensitySec&&t?.lowIntensitySec&&t?.rounds)return new O(t.highIntensitySec,t.lowIntensitySec,t.rounds);break;case"stopwatch":return new _;case"none":default:return null}return null}static createRestTimer(e,t=1){return new k(0,e,t)}}class G{constructor(){a(this,"wakeLock",null);a(this,"supported","wakeLock"in navigator)}async acquire(){if(!this.supported)return console.warn("Wake Lock API not supported"),!1;try{return this.wakeLock||(this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock?.addEventListener("release",()=>{console.log("Wake lock released"),this.wakeLock=null}),console.log("Wake lock acquired")),!0}catch(e){return console.error("Failed to acquire wake lock:",e),!1}}async release(){if(this.wakeLock)try{await this.wakeLock.release(),this.wakeLock=null,console.log("Wake lock released manually")}catch(e){console.error("Failed to release wake lock:",e)}}isActive(){return this.wakeLock!==null&&!this.wakeLock.released}isSupportedApi(){return this.supported}async reacquire(){return this.wakeLock&&this.wakeLock.released?(this.wakeLock=null,await this.acquire()):this.isActive()}}const C=new G;class V{constructor(){a(this,"backgroundStartTime",null);a(this,"callbacks",[]);this.setupVisibilityHandlers()}setupVisibilityHandlers(){document.addEventListener("visibilitychange",()=>{document.hidden?this.handleBackground():this.handleForeground()}),window.addEventListener("blur",()=>{document.hidden||this.handleBackground()}),window.addEventListener("focus",()=>{document.hidden||this.handleForeground()})}handleBackground(){console.log("App went to background"),this.backgroundStartTime=performance.now(),this.maybeShowNotification()}handleForeground(){if(this.backgroundStartTime!==null){const e=performance.now()-this.backgroundStartTime;console.log(`App returned to foreground after ${e}ms`),this.backgroundStartTime=null,this.callbacks.forEach(t=>{try{t()}catch(s){console.error("Background timer callback error:",s)}})}}async maybeShowNotification(){if("Notification"in window&&Notification.permission==="granted"&&this.callbacks.length>0)try{const t=new Notification("Minimalift Workout Active",{body:"Your workout timer is still running in the background.",icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",tag:"workout-active",requireInteraction:!1,silent:!0});setTimeout(()=>t.close(),5e3)}catch(t){console.error("Failed to show notification:",t)}}addForegroundCallback(e){this.callbacks.push(e)}removeForegroundCallback(e){const t=this.callbacks.indexOf(e);t>-1&&this.callbacks.splice(t,1)}getTimeInBackground(){return this.backgroundStartTime!==null?performance.now()-this.backgroundStartTime:0}isInBackground(){return document.hidden}async requestNotificationPermission(){if(!("Notification"in window))return console.warn("Notifications not supported"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return!1;try{return await Notification.requestPermission()==="granted"}catch(e){return console.error("Failed to request notification permission:",e),!1}}}const R=new V;class Y{constructor(){a(this,"audioContext",null);a(this,"enableHaptic",!0);a(this,"enableAudio",!0);document.addEventListener("touchstart",this.initAudioContext.bind(this),{once:!0}),document.addEventListener("click",this.initAudioContext.bind(this),{once:!0})}initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log("Audio context initialized")}catch(e){console.warn("Audio context not supported:",e)}}setHapticEnabled(e){this.enableHaptic=e}setAudioEnabled(e){this.enableAudio=e}isHapticSupported(){return"vibrate"in navigator}isAudioSupported(){return this.audioContext!==null}vibrate(e){if(!(!this.enableHaptic||!this.isHapticSupported()))try{navigator.vibrate(e)}catch(t){console.warn("Vibration failed:",t)}}beep(e=800,t=200,s=.1){if(!(!this.enableAudio||!this.audioContext))try{const i=this.audioContext.createOscillator(),r=this.audioContext.createGain();i.connect(r),r.connect(this.audioContext.destination),i.frequency.value=e,i.type="sine",r.gain.setValueAtTime(s,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t/1e3),i.start(),i.stop(this.audioContext.currentTime+t/1e3)}catch(i){console.warn("Audio playback failed:",i)}}timerStart(){this.vibrate(100),this.beep(600,150)}timerPause(){this.vibrate([50,50,50]),this.beep(400,100)}roundComplete(){this.vibrate([100,50,100]),this.beep(800,200)}exerciseComplete(){this.vibrate([150,100,150,100,150]),this.playSuccess()}sessionComplete(){this.vibrate([200,100,200,100,200,100,300]),this.playSuccessChord()}setComplete(){this.vibrate([100,50,100]),this.beep(700,150)}restStart(){this.vibrate(80),this.beep(500,150)}restComplete(){this.vibrate([50,30,50]),this.beep(800,100)}workPeriodStart(){this.vibrate([50,30,50]),this.beep(1e3,100)}restPeriodStart(){this.vibrate(80),this.beep(500,150)}countdownWarning(){this.vibrate(50),this.beep(700,100)}playSuccess(){if(!this.audioContext)return;[523,659,784].forEach((t,s)=>{setTimeout(()=>{this.beep(t,200,.08)},s*100)})}playSuccessChord(){if(!this.audioContext)return;[523,659,784].forEach(t=>{this.beep(t,500,.05)})}testFeedback(){console.log("Testing feedback..."),setTimeout(()=>this.timerStart(),0),setTimeout(()=>this.workPeriodStart(),1e3),setTimeout(()=>this.countdownWarning(),2e3),setTimeout(()=>this.restPeriodStart(),3e3),setTimeout(()=>this.roundComplete(),4e3),setTimeout(()=>this.exerciseComplete(),5e3)}}const p=new Y;class X extends D{constructor(){super(...arguments);a(this,"state",new N);a(this,"currentTimer",null);a(this,"foregroundCallback",null);a(this,"timerDisplay",null)}render(){this.setHTML(`
      <style>
        :host {
          display: block;
          height: 100%;
          padding: 0;
        }

        .session-container {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-primary);
        }

        .session-header {
          background: var(--bg-secondary);
          padding: 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }

        .session-header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .session-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .cancel-session-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .cancel-session-btn:hover {
          color: var(--warning);
        }

        .session-progress {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin: 8px 0;
          overflow: hidden;
        }

        .progress-bar::after {
          content: '';
          display: block;
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .session-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .current-exercise {
          background: var(--bg-secondary);
          padding: 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .exercise-group {
          margin-bottom: 16px;
        }

        .exercise-group:last-child {
          margin-bottom: 0;
        }

        .exercise-name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .exercise-details {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
        }

        .exercise-cues {
          font-style: italic;
          opacity: 0.8;
        }

        .timer-info {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 8px 0;
          text-align: center;
        }

        .set-counter {
          font-size: 18px;
          font-weight: 600;
          margin-top: 12px;
          color: var(--text-primary);
        }

        .rest-timer {
          padding: 32px 20px;
          text-align: center;
        }

        .rest-label {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .rest-countdown {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 10px 0;
        }

        .session-controls {
          padding: 20px;
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-shrink: 0;
        }

        .control-btn {
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 100px;
        }

        .control-btn.primary {
          background: var(--accent);
          color: white;
        }

        .control-btn.secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .next-up {
          padding: 16px 20px;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          flex-shrink: 0;
        }

        .next-label {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
        }

        .next-exercise {
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .session-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--text-secondary);
          padding: 40px 20px;
        }

        .session-complete {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 20px;
        }

        .complete-icon {
          font-size: 64px;
          margin: 0 0 16px 0;
        }

        .session-save-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .session-save-dialog {
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          margin: 16px;
          text-align: center;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .dialog-buttons {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-primary: #000000;
            --bg-secondary: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #999999;
            --border: #333333;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-primary: #ffffff;
            --bg-secondary: #f5f5f5;
            --text-primary: #000000;
            --text-secondary: #666666;
            --border: #e0e0e0;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <div class="session-container" id="container">
        <!-- Content will be rendered here -->
      </div>
    `),this.updateContent()}setDay(t){this.state.initialize(t),this.updateContent()}updateContent(){const t=this.$("#container");if(!t)return;const s=this.state.getDay();if(!s){t.innerHTML=u.renderEmpty();return}if(this.state.isComplete()){t.innerHTML=u.renderSessionComplete();return}const i=this.state.getCurrentBlock(),n=i?.timerType==="interval"&&i.timerConfig?.exercisesPerInterval&&i.timerConfig.exercisesPerInterval>1?this.state.getCurrentIntervalExercises():this.state.getCurrentExercise()?[this.state.getCurrentExercise()]:[],o=this.state.getNextExercise(),l=this.state.getProgress();if(this.state.isResting()&&this.currentTimer){const d=this.currentTimer.lastEvent;if(d){const m=Math.ceil(d.remaining/1e3);t.innerHTML=u.renderContainer({header:u.renderHeader(s,l),exercises:u.renderCurrentExercises(n,i,this.state.getCurrentSetNumber()),timer:u.renderRestTimer(m),nextUp:u.renderNextUp(o)});return}}const g={header:u.renderHeader(s,l),exercises:u.renderCurrentExercises(n,i,this.state.getCurrentSetNumber()),timerInfo:u.renderTimerInfo(i),timer:'<timer-display id="timer-display"></timer-display>',controls:this.renderControlsForState(),nextUp:u.renderNextUp(o)};if(t.innerHTML=u.renderContainer(g),this.timerDisplay=this.$("#timer-display"),this.timerDisplay&&this.currentTimer){const d=this.currentTimer.lastEvent;d&&this.timerDisplay.updateFromEvent(d)}}renderControlsForState(){const t=this.state.getCurrentBlock(),s=t?.timerType&&t.timerType!=="none",i=t?.timerType==="interval",r=t?.timerConfig?.exercisesPerInterval&&t.timerConfig.exercisesPerInterval>1,n=this.currentTimer?.getState()||"idle",o=n==="running",l=n==="paused",g=this.state.isResting();return u.renderControls(o,l,g,!!s,!!i,!!r)}setupEventListeners(){this.shadow.addEventListener("click",t=>{const s=t.target;switch(s.closest("[data-action]")?.dataset.action||s.dataset.action){case"start":this.startTimer();break;case"pause":this.pauseTimer();break;case"resume":this.resumeTimer();break;case"reset":this.resetTimer();break;case"skip":case"skip-group":this.skipExercise();break;case"complete-set":this.completeSet();break;case"skip-rest":this.skipRest();break;case"finish":this.finishSession();break;case"save":this.saveSession();break;case"discard":this.discardSession();break;case"cancel-session":this.showCancelDialog();break;case"cancel-confirm":this.cancelSession();break;case"cancel-dismiss":this.dismissCancelDialog();break}}),this.setupBackgroundHandling()}async startTimer(){if(await C.acquire(),!!this.state.getCurrentBlock()&&(this.currentTimer=this.createTimerForCurrentBlock(),!!this.currentTimer)){if(this.currentTimer.addCallback(s=>{this.handleTimerEvent(s)}),this.currentTimer.start(),p.timerStart(),this.currentTimer){const s=this.currentTimer.getDuration?this.currentTimer.getDuration():0,i=this.currentTimer.getTotalRounds?this.currentTimer.getTotalRounds():1,r={type:"tick",elapsed:0,remaining:s,round:1,totalRounds:i,state:"running"};this.currentTimer.lastEvent=r}this.updateContent()}}pauseTimer(){this.currentTimer?.pause(),p.timerPause(),this.updateContent()}resumeTimer(){this.currentTimer?.start(),p.timerStart(),this.updateContent()}resetTimer(){this.currentTimer?.reset(),this.updateContent()}skipExercise(){const t=this.state.getCurrentBlock();t?.timerType==="interval"&&t.timerConfig?.exercisesPerInterval&&t.timerConfig.exercisesPerInterval>1?this.state.skipIntervalGroup():this.state.nextExercise(),this.currentTimer?.stop(),this.currentTimer=null,this.updateContent()}async completeSet(){const t=this.state.getCurrentExercise();if(!t)return;p.setComplete(),this.state.nextSet()?t.restSec&&t.restSec>0?(this.state.setResting(!0),this.currentTimer=S.createRestTimer(t.restSec,1),this.currentTimer.addCallback(i=>{i.type==="complete"?this.handleRestComplete():i.type==="tick"&&(this.currentTimer.lastEvent=i,this.updateContent())}),this.currentTimer.start(),p.restStart(),this.updateContent()):this.updateContent():(this.state.nextExercise(),this.updateContent())}skipRest(){this.currentTimer?.stop(),this.currentTimer=null,this.handleRestComplete()}handleRestComplete(){this.state.setResting(!1),this.currentTimer=null,p.restComplete(),this.updateContent()}createTimerForCurrentBlock(){const t=this.state.getCurrentBlock();if(!t?.timerType||t.timerType==="none")return null;if(t.timerType==="interval"&&t.timerConfig?.exercisesPerInterval&&t.timerConfig.exercisesPerInterval>1){const s=this.state.getIndices(),i=t.timerConfig.exercisesPerInterval,r=Math.floor(s.exerciseIndex/i),o=Math.ceil(t.exercises.length/i)-r;return S.createTimer(t.timerType,{...t.timerConfig,rounds:o})}return S.createTimer(t.timerType,t.timerConfig)}handleTimerEvent(t){this.timerDisplay&&this.timerDisplay.updateFromEvent(t),this.currentTimer.lastEvent=t,t.type==="tick"?this.checkForCountdownWarning(t.remaining):t.type==="complete"?(p.exerciseComplete(),this.updateContent()):t.type==="roundComplete"&&p.roundComplete()}checkForCountdownWarning(t){const s=Math.ceil(t/1e3);if(s<=3&&s>0){const i=this.lastWarnTime||0,r=performance.now();r-i>900&&(p.countdownWarning(),this.lastWarnTime=r)}}async finishSession(){p.sessionComplete(),await this.cleanup(),this.showSaveDialog()}showSaveDialog(){const t=this.$("#container");if(t){const s=u.renderSaveDialog(),i=document.createElement("div");i.innerHTML=s,t.appendChild(i.firstElementChild)}}saveSession(){console.log("Session saved"),this.emit("session-complete",{day:this.state.getDay(),duration:this.state.getSessionDuration(),saved:!0})}discardSession(){console.log("Session discarded"),this.emit("session-complete",{day:this.state.getDay(),duration:this.state.getSessionDuration(),saved:!1})}showCancelDialog(){const t=this.$("#container");if(t){const s=u.renderCancelDialog(),i=document.createElement("div");i.innerHTML=s,t.appendChild(i.firstElementChild)}}dismissCancelDialog(){const t=this.$(".session-save-overlay");t&&t.remove()}async cancelSession(){await this.cleanup(),this.emit("session-complete",{day:this.state.getDay(),duration:this.state.getSessionDuration(),saved:!1,cancelled:!0})}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&C.reacquire(),this.updateContent()},R.addForegroundCallback(this.foregroundCallback)}cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),C.release(),this.foregroundCallback&&(R.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}}customElements.define("view-session",X);class K{constructor(){a(this,"registration",null);a(this,"showUpdateCallback",null);a(this,"updateNotificationShown",!1);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setupUpdateDetection()):this.setupUpdateDetection()}async setupUpdateDetection(){if(!("serviceWorker"in navigator)){console.log("Service workers not supported");return}try{this.registration=await navigator.serviceWorker.register("/sw.js"),console.log("ServiceWorker registered:",this.registration),console.log("Checking for updates on startup..."),await this.checkForUpdates(),console.log("Checking for waiting service worker..."),this.checkForWaitingWorker(),setTimeout(()=>{console.log("Double-checking for waiting service worker after delay..."),this.checkForWaitingWorker()},1e3),this.registration.installing&&this.trackInstallingWorker(this.registration.installing),setInterval(()=>{document.visibilityState==="visible"&&(console.log("Periodic update check (30s interval)"),this.checkForUpdates())},3e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(console.log("App came to foreground, checking for updates"),this.checkForUpdates())}),this.registration.addEventListener("updatefound",()=>{console.log("Update found, installing new version...");const e=this.registration?.installing;e&&this.trackInstallingWorker(e)}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("New service worker took control, reloading page"),window.location.reload()})}catch(e){console.error("ServiceWorker registration failed:",e)}}async checkForUpdates(){if(!this.registration){console.log("No registration available for update check");return}try{console.log("Calling registration.update()..."),await this.registration.update(),console.log("Update check completed"),this.registration.waiting&&(console.log("Found waiting worker after update check"),this.showUpdateAvailable())}catch(e){console.error("Failed to check for updates:",e)}}checkForWaitingWorker(){this.registration&&this.registration.waiting&&(console.log("Found waiting service worker on startup"),this.showUpdateAvailable())}trackInstallingWorker(e){e.addEventListener("statechange",()=>{console.log("Service worker state changed:",e.state),e.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New version ready"),this.showUpdateAvailable())})}showUpdateAvailable(){if(this.updateNotificationShown){console.log("Update notification already shown, skipping");return}this.updateNotificationShown=!0,this.showUpdateCallback?this.showUpdateCallback():this.showDefaultUpdateNotification()}showDefaultUpdateNotification(){confirm("A new version of Minimalift is available! Click OK to update now.")&&this.applyUpdate()}onUpdateAvailable(e){this.showUpdateCallback=e}async applyUpdate(){if(!this.registration?.waiting){console.log("No update waiting");return}this.updateNotificationShown=!1,this.registration.waiting.postMessage({type:"SKIP_WAITING"})}async forceUpdateCheck(){console.log("Manual update check triggered..."),await this.checkForUpdates(),setTimeout(()=>{this.checkForWaitingWorker()},2e3)}}const E=new K;class J extends HTMLElement{constructor(){super();a(this,"isUpdateAvailable",!1);this.attachShadow({mode:"open"}),this.setupUpdateListener()}connectedCallback(){this.render(),this.setupEventListeners()}setupUpdateListener(){E.onUpdateAvailable(()=>{this.isUpdateAvailable=!0,this.show()})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: none;
          position: relative;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        :host(.visible) {
          display: flex;
        }

        .indicator {
          position: relative;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--accent, #007AFF);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: var(--accent, #007AFF);
          animation: bounce 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .tooltip {
          position: absolute;
          bottom: -36px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 1000;
        }

        .tooltip::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid rgba(0, 0, 0, 0.9);
        }

        :host(:hover) .tooltip {
          opacity: 1;
        }

        /* Loading state */
        :host(.updating) .icon {
          animation: rotate 1s linear infinite;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      </style>

      <div class="indicator" aria-label="Update available">
        <!-- Using download arrow icon -->
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
        <div class="tooltip">Update available - click to install</div>
      </div>
    `)}setupEventListeners(){this.shadowRoot&&this.addEventListener("click",()=>{this.isUpdateAvailable&&this.applyUpdate()})}show(){this.classList.add("visible")}async applyUpdate(){this.classList.add("updating");const t=this.shadowRoot?.querySelector(".indicator");t&&(t.innerHTML=`
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
        </svg>
        <div class="tooltip">Updating...</div>
      `),await E.applyUpdate()}}customElements.define("update-indicator",J);class Q extends D{constructor(){super(...arguments);a(this,"latestEvent",null)}render(){this.setHTML(`
      <style>
        :host {
          display: block;
        }

        .timer-container {
          padding: 20px;
          text-align: center;
        }

        .timer-display {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 10px 0;
        }

        .timer-display.warning {
          color: var(--warning, #FF9500);
        }

        .timer-phase {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }

        .timer-progress {
          width: 100%;
          height: 4px;
          background: var(--bg-secondary);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 16px;
        }

        .timer-progress-bar {
          height: 100%;
          background: var(--accent, #007AFF);
          transition: width 0.1s linear;
        }

        .timer-info {
          margin-top: 12px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .timer-round {
          font-weight: 600;
        }

        /* Hide when no timer */
        :host(:empty) .timer-container {
          display: none;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --bg-secondary: #1a1a1a;
            --text-secondary: #999999;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --bg-secondary: #f5f5f5;
            --text-secondary: #666666;
            --accent: #007AFF;
            --warning: #FF9500;
          }
        }
      </style>

      <div class="timer-container">
        <div class="timer-phase"></div>
        <div class="timer-display">--:--</div>
        <div class="timer-progress">
          <div class="timer-progress-bar" style="width: 0%"></div>
        </div>
        <div class="timer-info"></div>
      </div>
    `)}clear(){this.latestEvent=null,this.updateDisplay()}updateFromEvent(t){this.latestEvent=t,this.updateDisplay()}updateDisplay(){const t=this.$(".timer-display"),s=this.$(".timer-progress-bar"),i=this.$(".timer-info");if(!t||!this.latestEvent){t&&(t.textContent="--:--");return}const r=this.latestEvent;t.textContent=this.formatTime(r.remaining),t.classList.toggle("warning",r.remaining<=3e3);const n=this.calculateProgress();s&&(s.style.width=`${n}%`);const o=this.getRoundInfo();i&&o&&(i.innerHTML=o)}formatTime(t){const s=Math.ceil(t/1e3),i=Math.floor(s/60),r=s%60;return i>0?`${i}:${r.toString().padStart(2,"0")}`:`0:${r.toString().padStart(2,"0")}`}calculateProgress(){if(!this.latestEvent)return 0;const t=this.latestEvent.elapsed+this.latestEvent.remaining;return t<=0?0:this.latestEvent.elapsed/t*100}getRoundInfo(){return this.latestEvent&&this.latestEvent.round!==void 0&&this.latestEvent.totalRounds?`<span class="timer-round">Round ${this.latestEvent.round+1} of ${this.latestEvent.totalRounds}</span>`:""}}customElements.define("timer-display",Q);class Z{constructor(){a(this,"routes",[]);a(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("DOMContentLoaded",()=>this.handleRouteChange())}register(e,t){this.routes.push({path:e,handler:t})}navigate(e){window.location.hash=e}handleRouteChange(){const e=window.location.hash.slice(1)||"/";this.currentPath=e;const t=this.routes.find(s=>s.path.includes(":")?new RegExp("^"+s.path.replace(/:[^/]+/g,"([^/]+)")+"$").test(e):s.path===e);if(t)t.handler();else{const s=this.routes.find(i=>i.path==="/");s&&s.handler()}}getParams(){const e=window.location.hash.slice(1)||"/",t={};return this.routes.find(s=>{if(s.path.includes(":")){const i=s.path.split("/"),r=e.split("/");if(i.length===r.length){let n=!0;for(let o=0;o<i.length;o++)if(i[o].startsWith(":"))t[i[o].slice(1)]=r[o];else if(i[o]!==r[o]){n=!1;break}return n}}return!1}),t}getCurrentPath(){return this.currentPath}start(){this.handleRouteChange()}}const h=new Z;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app...");try{let c=function(){s.innerHTML="<view-home></view-home>",s.querySelector("view-home")?.addEventListener("navigate-to-day",n=>{h.navigate(`/day/${n.detail.dayId}`)})},e=function(){const n=h.getParams().id;if(n){s.innerHTML="<view-day></view-day>";const o=s.querySelector("view-day");o&&o.loadDay&&o.loadDay(n),o?.addEventListener("start-session",l=>{h.navigate(`/session/${l.detail.dayId}`)})}};console.log("Initializing program manager..."),await w.initialize(),console.log("Program manager initialized");const t=document.querySelector("app-shell");if(!t){console.error("App shell not found");return}console.log("Found app shell, waiting for shadow DOM..."),await new Promise(r=>{const n=()=>{const o=t.shadowRoot;o&&o.querySelector("#content")?(console.log("Shadow DOM ready"),r(void 0)):setTimeout(n,10)};n()});const s=t.shadowRoot.querySelector("#content");if(!s){console.error("Content container not found");return}h.register("/",()=>c()),h.register("/day/:id",()=>e()),h.register("/session/:id",()=>i());async function i(){const n=h.getParams().id;if(n){const o=await w.getDay(n);if(o){s.innerHTML="<view-session></view-session>";const l=s.querySelector("view-session");l&&l.setDay&&l.setDay(o),l?.addEventListener("session-complete",g=>{console.log("Session completed:",g.detail),h.navigate(`/day/${n}`)})}}}t&&t.addEventListener("day-selected",r=>{const o=`p1_w1_d${r.detail.day}`;h.navigate(`/day/${o}`)}),console.log("Starting router..."),h.start(),!window.location.hash||window.location.hash==="#/"?(console.log("No hash found, navigating to Day 1"),h.navigate("/day/p1_w1_d1")):console.log("Found hash:",window.location.hash),console.log("App initialization complete")}catch(c){console.error("Failed to initialize app:",c),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `}});
//# sourceMappingURL=index-CcnCk_9n.js.map
