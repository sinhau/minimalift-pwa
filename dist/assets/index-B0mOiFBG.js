var L=Object.defineProperty;var F=(c,t,e)=>t in c?L(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var a=(c,t,e)=>F(c,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class $ extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100vh;
          height: 100dvh;
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        header {
          background: var(--bg-secondary);
          padding: env(safe-area-inset-top) 16px 0 16px;
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
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

        .settings-btn {
          padding: 6px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .settings-btn:hover {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        main {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 0; /* Remove padding from main, let child components handle it */
          position: relative;
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
          <button class="settings-btn" aria-label="Settings">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM10 3a7 7 0 100 14 7 7 0 000-14z"/>
            </svg>
          </button>
        </div>
      </header>

      <main id="content">
      </main>

      <update-notification></update-notification>

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
    `)}setupEventListeners(){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(e=>{e.addEventListener("click",r=>{const i=r.target.dataset.day;i&&this.selectDay(i)})}),this.shadowRoot.querySelector(".settings-btn")?.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("open-settings"))})}selectDay(t){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(r=>{r.classList.remove("active")}),this.shadowRoot.querySelector(`.day-btn[data-day="${t}"]`)?.classList.add("active"),this.dispatchEvent(new CustomEvent("day-selected",{detail:{day:t}}))}showTimer(t,e){if(!this.shadowRoot)return;const r=this.shadowRoot.querySelector("#timer-bar"),s=this.shadowRoot.querySelector("#timer-display"),i=this.shadowRoot.querySelector("#timer-round");r&&r.classList.add("active"),s&&(s.textContent=t),i&&(i.textContent=e)}hideTimer(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("#timer-bar");t&&t.classList.remove("active")}}customElements.define("app-shell",$);const A="modulepreload",B=function(c){return"/"+c},D={},W=function(t,e,r){let s=Promise.resolve();if(e&&e.length>0){let w=function(u){return Promise.all(u.map(x=>Promise.resolve(x).then(v=>({status:"fulfilled",value:v}),v=>({status:"rejected",reason:v}))))};var n=w;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=o?.nonce||o?.getAttribute("nonce");s=w(e.map(u=>{if(u=B(u),u in D)return;D[u]=!0;const x=u.endsWith(".css"),v=x?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${v}`))return;const p=document.createElement("link");if(p.rel=x?"stylesheet":A,x||(p.as="script"),p.crossOrigin="",p.href=u,d&&p.setAttribute("nonce",d),document.head.appendChild(p),x)return new Promise((R,I)=>{p.addEventListener("load",R),p.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&i(d.reason);return t().catch(i)})};class q{constructor(){a(this,"db",null);a(this,"dbName","minimalift_v1");a(this,"version",1)}async openDb(){return this.db?this.db:new Promise((t,e)=>{const r=indexedDB.open(this.dbName,this.version);r.onerror=()=>e(r.error),r.onsuccess=()=>{this.db=r.result,t(this.db)},r.onupgradeneeded=s=>{const i=s.target.result;if(i.objectStoreNames.contains("programs")||i.createObjectStore("programs",{keyPath:"programId"}),i.objectStoreNames.contains("days")||i.createObjectStore("days",{keyPath:"dayId"}).createIndex("programId","programId",{unique:!1}),!i.objectStoreNames.contains("sessions")){const n=i.createObjectStore("sessions",{keyPath:"sessionId",autoIncrement:!0});n.createIndex("dayId","dayId",{unique:!1}),n.createIndex("date","startedAt",{unique:!1})}}})}async tx(t,e="readonly"){return(await this.openDb()).transaction([t],e).objectStore(t)}async get(t,e){const r=await this.tx(t);return new Promise((s,i)=>{const n=r.get(e);n.onsuccess=()=>s(n.result),n.onerror=()=>i(n.error)})}async getAll(t){const e=await this.tx(t);return new Promise((r,s)=>{const i=e.getAll();i.onsuccess=()=>r(i.result),i.onerror=()=>s(i.error)})}async put(t,e){const r=await this.tx(t,"readwrite");return new Promise((s,i)=>{const n=r.put(e);n.onsuccess=()=>s(n.result),n.onerror=()=>i(n.error)})}async delete(t,e){const r=await this.tx(t,"readwrite");return new Promise((s,i)=>{const n=r.delete(e);n.onsuccess=()=>s(),n.onerror=()=>i(n.error)})}async indexGetAll(t,e,r){const i=(await this.tx(t)).index(e);return new Promise((n,o)=>{const d=r?i.getAll(r):i.getAll();d.onsuccess=()=>n(d.result),d.onerror=()=>o(d.error)})}async clear(t){const e=await this.tx(t,"readwrite");return new Promise((r,s)=>{const i=e.clear();i.onsuccess=()=>r(),i.onerror=()=>s(i.error)})}}const m=new q,f=class f{constructor(){}static getInstance(){return f.instance||(f.instance=new f),f.instance}async initialize(){const{seedData:t}=await W(async()=>{const{seedData:r}=await import("./seed-data-C_uM7Nqm.js");return{seedData:r}},[]);await m.get("programs",t.programId)||await this.loadSeedData(t)}async loadSeedData(t){const e={programId:t.programId,title:t.title};await m.put("programs",e);for(const r of t.days)await m.put("days",r);console.log("Seed data loaded successfully")}async getProgram(t){return await m.get("programs",t)}async getDaysForProgram(t){return await m.indexGetAll("days","programId",t)}async getDay(t){return await m.get("days",t)}async getAllDays(){return(await m.getAll("days")).sort((e,r)=>e.order-r.order)}};a(f,"instance");let E=f;const k=E.getInstance();class z extends HTMLElement{constructor(){super();a(this,"days",[]);this.attachShadow({mode:"open"})}async connectedCallback(){this.days=await k.getAllDays(),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
        ${this.days.map(e=>this.renderDayCard(e)).join("")}
      </div>
    `,this.shadowRoot.querySelectorAll(".day-card").forEach(e=>{e.addEventListener("click",r=>{const s=r.currentTarget.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("navigate-to-day",{detail:{dayId:s},bubbles:!0,composed:!0}))})}))}renderDayCard(e){const r=[...new Set(e.blocks.map(i=>i.type))],s=e.blocks.reduce((i,n)=>i+n.exercises.length,0);return`
      <div class="day-card" data-day-id="${e.dayId}">
        <div class="day-number">${e.order}</div>
        <div class="day-title">${e.title}</div>
        <div class="day-summary">${s} exercises • ${e.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${r.map(i=>`<span class="block-badge">${i}</span>`).join("")}
        </div>
      </div>
    `}}customElements.define("view-home",z);class N extends HTMLElement{constructor(){super();a(this,"day",null);this.attachShadow({mode:"open"})}async loadDay(e){this.day=await k.getDay(e)||null,this.render()}render(){if(this.shadowRoot){if(!this.day){this.shadowRoot.innerHTML="<p>Loading...</p>";return}this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          padding: 16px;
          padding-bottom: 120px; /* Extra space for fixed button */
          min-height: 100vh;
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

        .block-notes {
          background: var(--bg-primary);
          border-radius: 8px;
          padding: 12px;
          margin-top: 12px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
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
      
      ${this.day.blocks.map(e=>this.renderBlock(e)).join("")}
      
      <button class="start-session-btn" data-day-id="${this.day.dayId}">
        Start Session
      </button>
    `,this.shadowRoot.querySelector(".start-session-btn")?.addEventListener("click",e=>{const s=e.target.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("start-session",{detail:{dayId:s},bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".substitute-chip").forEach(e=>{e.addEventListener("click",r=>{const s=r.target,i=s.dataset.exerciseId,n=s.dataset.substitute;i&&n&&console.log("Switch to substitute:",n,"for exercise:",i)})})}}renderBlock(e){const r=this.getTimerLabel(e.timerMode);return`
      <div class="block">
        <div class="block-header">
          <span class="block-title">${this.getBlockTitle(e.type)}</span>
          ${r?`<span class="timer-badge">${r}</span>`:""}
        </div>
        
        ${e.exercises.map(s=>this.renderExercise(s)).join("")}
        
        ${e.notes?`<div class="block-notes">${e.notes}</div>`:""}
      </div>
    `}renderExercise(e){const r=e.sets?`${e.sets} × ${e.reps}`:e.reps;return`
      <div class="exercise">
        <div class="exercise-header">
          <span class="exercise-name">${e.name}</span>
          <span class="exercise-sets-reps">${r}</span>
        </div>
        
        ${e.cues?`<div class="exercise-cues">${e.cues}</div>`:""}
        
        ${e.substitutes&&e.substitutes.length>0?`
          <div class="substitutes">
            ${e.substitutes.map(s=>`
              <span class="substitute-chip" 
                    data-exercise-id="${e.id}" 
                    data-substitute="${s}">
                ${s}
              </span>
            `).join("")}
          </div>
        `:""}
      </div>
    `}getBlockTitle(e){return{warmup:"Warm Up",strength:"Strength & Condition",swole:"Swole & Flexy",accessory:"Accessories"}[e]||e}getTimerLabel(e){return{emom:"EMOM",e2mom:"E2MOM",e4mom:"E4MOM",n90:"N90",fixed_rest:"Rest Timer",timed_circuit:"Circuit"}[e]||""}}customElements.define("view-day",N);class b{constructor(t=100){a(this,"startTime",0);a(this,"pausedTime",0);a(this,"totalPausedDuration",0);a(this,"intervalId",null);a(this,"state","idle");a(this,"callbacks",[]);this.tickInterval=t}start(){this.state!=="running"&&(this.state==="paused"?this.totalPausedDuration+=performance.now()-this.pausedTime:(this.startTime=performance.now(),this.totalPausedDuration=0),this.state="running",this.intervalId=window.setInterval(()=>this.tick(),this.tickInterval),this.notifyStateChange())}pause(){this.state==="running"&&(this.state="paused",this.pausedTime=performance.now(),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.notifyStateChange())}reset(){this.stop(),this.state="idle",this.startTime=0,this.pausedTime=0,this.totalPausedDuration=0,this.notifyStateChange()}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}getState(){return this.state}getElapsedTime(){return this.startTime===0?0:(this.state==="paused"?this.pausedTime:performance.now())-this.startTime-this.totalPausedDuration}addCallback(t){this.callbacks.push(t)}removeCallback(t){const e=this.callbacks.indexOf(t);e>-1&&this.callbacks.splice(e,1)}tick(){const t=this.getElapsedTime(),e=this.getRemainingInCurrentPeriod(),r=this.getCurrentRound(),s=this.getTotalRounds();if(t>=this.getDuration()){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:t,remaining:0,round:r,totalRounds:s,state:this.state});return}const i=this.getPreviousRound(t-this.tickInterval);r>i&&i>0&&this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:e,round:i,totalRounds:s,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:r,totalRounds:s,state:this.state})}notifyCallbacks(t){this.callbacks.forEach(e=>{try{e(t)}catch(r){console.error("Timer callback error:",r)}})}notifyStateChange(){const t=this.getElapsedTime();this.notifyCallbacks({type:"stateChange",elapsed:t,remaining:this.getRemainingInCurrentPeriod(),round:this.getCurrentRound(),totalRounds:this.getTotalRounds(),state:this.state})}static formatTime(t){const e=Math.max(0,Math.ceil(t/1e3)),r=Math.floor(e/60),s=e%60;return`${r.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}static formatTimeWithMs(t){const e=Math.max(0,t),r=Math.floor(e/1e3),s=Math.floor(e%1e3/100),i=Math.floor(r/60),n=r%60;return`${i.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${s}`}}class g extends b{constructor(t,e){super(100),this.periodDurationMs=t,this.totalRounds=e}getDuration(){return this.periodDurationMs*this.totalRounds}getCurrentRound(){const t=this.getElapsedTime();return Math.floor(t/this.periodDurationMs)+1}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%this.periodDurationMs}getRemainingInCurrentPeriod(){return this.periodDurationMs-this.getTimeInCurrentPeriod()}getPreviousRound(t){return Math.floor(t/this.periodDurationMs)+1}getPeriodDuration(){return this.periodDurationMs}getRemainingTotal(){return this.getDuration()-this.getElapsedTime()}getProgress(){const t=this.getElapsedTime();return Math.min(t/this.getDuration(),1)}getPeriodProgress(){const t=this.getTimeInCurrentPeriod();return Math.min(t/this.periodDurationMs,1)}static createEMOM(t){return new g(60*1e3,t)}static createE2MOM(t){return new g(120*1e3,t)}static createE4MOM(t){return new g(240*1e3,t)}static createCustom(t,e){return new g(t*1e3,e)}}class T extends b{constructor(e=5){super(100);a(this,"periodDurationMs",90*1e3);this.totalRounds=e}getDuration(){return this.periodDurationMs*this.totalRounds}getCurrentRound(){const e=this.getElapsedTime();return Math.floor(e/this.periodDurationMs)+1}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%this.periodDurationMs}getRemainingInCurrentPeriod(){return this.periodDurationMs-this.getTimeInCurrentPeriod()}getPreviousRound(e){return Math.floor(e/this.periodDurationMs)+1}getPeriodDuration(){return this.periodDurationMs}getRemainingTotal(){return this.getDuration()-this.getElapsedTime()}getProgress(){const e=this.getElapsedTime();return Math.min(e/this.getDuration(),1)}getPeriodProgress(){const e=this.getTimeInCurrentPeriod();return Math.min(e/this.periodDurationMs,1)}isInWorkPhase(){return this.getTimeInCurrentPeriod()<30*1e3}getWorkPhaseRemaining(){return this.isInWorkPhase()?30*1e3-this.getTimeInCurrentPeriod():0}getRestPhaseRemaining(){return this.isInWorkPhase()?60*1e3:this.getRemainingInCurrentPeriod()}getCurrentPhase(){return this.isInWorkPhase()?"work":"rest"}static create(e=5){return new T(e)}}class C extends b{constructor(t){super(100),this.durationMs=t}getDuration(){return this.durationMs}getCurrentRound(){return 1}getTotalRounds(){return 1}getTimeInCurrentPeriod(){return this.getElapsedTime()}getRemainingInCurrentPeriod(){return this.durationMs-this.getElapsedTime()}getPreviousRound(){return 1}getRemaining(){return Math.max(0,this.durationMs-this.getElapsedTime())}getProgress(){const t=this.getElapsedTime();return Math.min(t/this.durationMs,1)}static create(t){return new C(t*1e3)}static createMinutes(t){return new C(t*60*1e3)}}class y extends b{constructor(t,e,r){super(100),this.workDurationMs=t,this.restDurationMs=e,this.totalRounds=r}getDuration(){return(this.workDurationMs+this.restDurationMs)*this.totalRounds}getCurrentRound(){const t=this.getElapsedTime(),e=this.workDurationMs+this.restDurationMs;return Math.floor(t/e)+1}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),e=this.workDurationMs+this.restDurationMs;return t%e}getRemainingInCurrentPeriod(){const t=this.getTimeInCurrentPeriod();return this.isInWorkPhase()?this.workDurationMs-t:this.workDurationMs+this.restDurationMs-t}getPreviousRound(t){const e=this.workDurationMs+this.restDurationMs;return Math.floor(t/e)+1}isInWorkPhase(){return this.getTimeInCurrentPeriod()<this.workDurationMs}getCurrentPhase(){return this.isInWorkPhase()?"work":"rest"}getWorkDuration(){return this.workDurationMs}getRestDuration(){return this.restDurationMs}getWorkPhaseRemaining(){return this.isInWorkPhase()?this.workDurationMs-this.getTimeInCurrentPeriod():0}getRestPhaseRemaining(){if(this.isInWorkPhase())return this.restDurationMs;const t=this.getTimeInCurrentPeriod();return this.workDurationMs+this.restDurationMs-t}getProgress(){const t=this.getElapsedTime();return Math.min(t/this.getDuration(),1)}getPeriodProgress(){const t=this.getTimeInCurrentPeriod(),e=this.workDurationMs+this.restDurationMs;return Math.min(t/e,1)}static create(t,e,r){return new y(t*1e3,e*1e3,r)}static createTabata(t=8){return new y(20*1e3,10*1e3,t)}static createCustom(t,e,r){return new y(t,e,r)}}class U{constructor(){a(this,"wakeLock",null);a(this,"supported","wakeLock"in navigator)}async acquire(){if(!this.supported)return console.warn("Wake Lock API not supported"),!1;try{return this.wakeLock||(this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock?.addEventListener("release",()=>{console.log("Wake lock released"),this.wakeLock=null}),console.log("Wake lock acquired")),!0}catch(t){return console.error("Failed to acquire wake lock:",t),!1}}async release(){if(this.wakeLock)try{await this.wakeLock.release(),this.wakeLock=null,console.log("Wake lock released manually")}catch(t){console.error("Failed to release wake lock:",t)}}isActive(){return this.wakeLock!==null&&!this.wakeLock.released}isSupportedApi(){return this.supported}async reacquire(){return this.wakeLock&&this.wakeLock.released?(this.wakeLock=null,await this.acquire()):this.isActive()}}const P=new U;class H{constructor(){a(this,"backgroundStartTime",null);a(this,"callbacks",[]);this.setupVisibilityHandlers()}setupVisibilityHandlers(){document.addEventListener("visibilitychange",()=>{document.hidden?this.handleBackground():this.handleForeground()}),window.addEventListener("blur",()=>{document.hidden||this.handleBackground()}),window.addEventListener("focus",()=>{document.hidden||this.handleForeground()})}handleBackground(){console.log("App went to background"),this.backgroundStartTime=performance.now(),this.maybeShowNotification()}handleForeground(){if(this.backgroundStartTime!==null){const t=performance.now()-this.backgroundStartTime;console.log(`App returned to foreground after ${t}ms`),this.backgroundStartTime=null,this.callbacks.forEach(e=>{try{e()}catch(r){console.error("Background timer callback error:",r)}})}}async maybeShowNotification(){if("Notification"in window&&Notification.permission==="granted"&&this.callbacks.length>0)try{const e=new Notification("Minimalift Workout Active",{body:"Your workout timer is still running in the background.",icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",tag:"workout-active",requireInteraction:!1,silent:!0});setTimeout(()=>e.close(),5e3)}catch(e){console.error("Failed to show notification:",e)}}addForegroundCallback(t){this.callbacks.push(t)}removeForegroundCallback(t){const e=this.callbacks.indexOf(t);e>-1&&this.callbacks.splice(e,1)}getTimeInBackground(){return this.backgroundStartTime!==null?performance.now()-this.backgroundStartTime:0}isInBackground(){return document.hidden}async requestNotificationPermission(){if(!("Notification"in window))return console.warn("Notifications not supported"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return!1;try{return await Notification.requestPermission()==="granted"}catch(t){return console.error("Failed to request notification permission:",t),!1}}}const S=new H;class O{constructor(){a(this,"audioContext",null);a(this,"enableHaptic",!0);a(this,"enableAudio",!0);document.addEventListener("touchstart",this.initAudioContext.bind(this),{once:!0}),document.addEventListener("click",this.initAudioContext.bind(this),{once:!0})}initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log("Audio context initialized")}catch(t){console.warn("Audio context not supported:",t)}}setHapticEnabled(t){this.enableHaptic=t}setAudioEnabled(t){this.enableAudio=t}isHapticSupported(){return"vibrate"in navigator}isAudioSupported(){return this.audioContext!==null}vibrate(t){if(!(!this.enableHaptic||!this.isHapticSupported()))try{navigator.vibrate(t)}catch(e){console.warn("Vibration failed:",e)}}beep(t=800,e=200,r=.1){if(!(!this.enableAudio||!this.audioContext))try{const s=this.audioContext.createOscillator(),i=this.audioContext.createGain();s.connect(i),i.connect(this.audioContext.destination),s.frequency.value=t,s.type="sine",i.gain.setValueAtTime(r,this.audioContext.currentTime),i.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e/1e3),s.start(),s.stop(this.audioContext.currentTime+e/1e3)}catch(s){console.warn("Audio playback failed:",s)}}timerStart(){this.vibrate(100),this.beep(600,150)}timerPause(){this.vibrate([50,50,50]),this.beep(400,100)}roundComplete(){this.vibrate([100,50,100]),this.beep(800,200)}exerciseComplete(){this.vibrate([150,100,150,100,150]),this.playSuccess()}sessionComplete(){this.vibrate([200,100,200,100,200,100,300]),this.playSuccessChord()}workPeriodStart(){this.vibrate([50,30,50]),this.beep(1e3,100)}restPeriodStart(){this.vibrate(80),this.beep(500,150)}countdownWarning(){this.vibrate(50),this.beep(700,100)}playSuccess(){if(!this.audioContext)return;[523,659,784].forEach((e,r)=>{setTimeout(()=>{this.beep(e,200,.08)},r*100)})}playSuccessChord(){if(!this.audioContext)return;[523,659,784].forEach(e=>{this.beep(e,500,.05)})}testFeedback(){console.log("Testing feedback..."),setTimeout(()=>this.timerStart(),0),setTimeout(()=>this.workPeriodStart(),1e3),setTimeout(()=>this.countdownWarning(),2e3),setTimeout(()=>this.restPeriodStart(),3e3),setTimeout(()=>this.roundComplete(),4e3),setTimeout(()=>this.exerciseComplete(),5e3)}}const h=new O;class j extends HTMLElement{constructor(){super();a(this,"currentDay",null);a(this,"currentBlockIndex",0);a(this,"currentExerciseIndex",0);a(this,"currentTimer",null);a(this,"sessionStartTime",0);a(this,"foregroundCallback",null);a(this,"lastPhase",null);this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners(),this.setupBackgroundHandling()}disconnectedCallback(){this.cleanup()}setDay(e){this.currentDay=e,this.currentBlockIndex=0,this.currentExerciseIndex=0,this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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

        .session-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .session-progress {
          font-size: 14px;
          color: var(--text-secondary);
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

        .exercise-name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .exercise-details {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 0 16px 0;
        }

        .timer-section {
          background: var(--bg-primary);
          padding: 32px 20px;
          text-align: center;
          flex-shrink: 0;
        }

        .timer-display {
          font-size: 48px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin: 0 0 8px 0;
          color: var(--text-primary);
        }

        .timer-phase {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: var(--accent);
        }

        .timer-progress {
          font-size: 14px;
          color: var(--text-secondary);
          margin: 0 0 24px 0;
        }

        .progress-bar {
          width: 100%;
          height: 4px;
          background: var(--border);
          border-radius: 2px;
          margin: 16px 0;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: var(--accent);
          border-radius: 2px;
          transition: width 0.1s ease;
          width: 0%;
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

        .control-btn.warning {
          background: var(--warning);
          color: white;
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

        .next-up-label {
          font-size: 12px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px 0;
        }

        .next-up-exercise {
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

        .complete-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .complete-stats {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0;
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

      <div class="session-container">
        ${this.renderContent()}
      </div>
    `)}renderContent(){if(!this.currentDay)return`
        <div class="session-empty">
          <div>
            <h2>No Workout Selected</h2>
            <p>Select a day to start your session</p>
          </div>
        </div>
      `;if(!this.getCurrentBlock())return this.renderSessionComplete();const r=this.getCurrentExercise();return r?`
      ${this.renderHeader()}
      <div class="session-main">
        ${this.renderCurrentExercise(r)}
        ${this.renderTimer()}
        ${this.renderControls()}
        ${this.renderNextUp()}
      </div>
    `:this.renderSessionComplete()}renderHeader(){if(!this.currentDay)return"";const e=this.currentDay.blocks.length,r=this.currentDay.blocks.reduce((i,n)=>i+n.exercises.length,0),s=this.currentBlockIndex*(this.currentDay.blocks[0]?.exercises.length||0)+this.currentExerciseIndex;return`
      <div class="session-header">
        <div class="session-title">${this.currentDay.title}</div>
        <div class="session-progress">
          Block ${this.currentBlockIndex+1} of ${e} • 
          Exercise ${s+1} of ${r}
        </div>
      </div>
    `}renderCurrentExercise(e){const r=this.getCurrentBlock();return r?`
      <div class="current-exercise">
        <div class="exercise-name">${e.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(e,r)}</div>
      </div>
    `:""}renderTimer(){if(!this.currentTimer)return`
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;const e=this.currentTimer.getRemainingInCurrentPeriod(),r=this.currentTimer.getCurrentRound(),s=this.currentTimer.getTotalRounds(),i=b.formatTime(e),n=this.getTimerProgress(),o=this.getTimerPhase();return`
      <div class="timer-section">
        <div class="timer-display">${i}</div>
        <div class="timer-phase">${o}</div>
        <div class="timer-progress">Round ${r} of ${s}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${n*100}%"></div>
        </div>
      </div>
    `}renderControls(){const e=this.currentTimer?.getState()||"idle",r=e==="completed";let s="";return!this.currentTimer||e==="idle"?s='<button class="control-btn primary" id="start-btn">Start Timer</button>':e==="running"?s='<button class="control-btn warning" id="pause-btn">Pause</button>':e==="paused"?s='<button class="control-btn primary" id="resume-btn">Resume</button>':r&&(s='<button class="control-btn primary" id="next-btn">Next Exercise</button>'),`
      <div class="session-controls">
        ${s}
        <button class="control-btn secondary" id="reset-btn" ${!this.currentTimer||e==="idle"?"disabled":""}>Reset</button>
        <button class="control-btn secondary" id="skip-btn">Skip</button>
      </div>
    `}renderNextUp(){const e=this.getNextExercise();return e?`
      <div class="next-up">
        <div class="next-up-label">Next Up</div>
        <div class="next-up-exercise">${e.name}</div>
      </div>
    `:`
        <div class="next-up">
          <div class="next-up-label">Next Up</div>
          <div class="next-up-exercise">Session Complete!</div>
        </div>
      `}renderSessionComplete(){const e=this.sessionStartTime?performance.now()-this.sessionStartTime:0;return`
      <div class="session-complete">
        <div class="complete-icon">🎉</div>
        <div class="complete-title">Workout Complete!</div>
        <div class="complete-stats">Duration: ${b.formatTime(e)}</div>
        <div class="session-controls">
          <button class="control-btn primary" id="finish-btn">Finish Session</button>
        </div>
      </div>
    `}getCurrentBlock(){return!this.currentDay||this.currentBlockIndex>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex]}getCurrentExercise(){const e=this.getCurrentBlock();return!e||this.currentExerciseIndex>=e.exercises.length?null:e.exercises[this.currentExerciseIndex]}getNextExercise(){const e=this.getCurrentBlock();return e?this.currentExerciseIndex+1<e.exercises.length?e.exercises[this.currentExerciseIndex+1]:!this.currentDay||this.currentBlockIndex+1>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex+1].exercises[0]||null:null}formatExerciseDetails(e,r){const s=[];return e.sets&&s.push(`${e.sets} sets`),e.reps&&s.push(`${e.reps} reps`),e.restSec&&s.push(`${e.restSec}s rest`),r.timerMode&&r.timerMode!=="none"&&s.push(`${r.timerMode.toUpperCase()} format`),s.join(" • ")}getTimerProgress(){if(!this.currentTimer)return 0;const e=this.currentTimer.getElapsedTime(),r=this.currentTimer.getDuration();return Math.min(e/r,1)}getTimerPhase(){if(!this.currentTimer)return"Ready";const e=this.getCurrentBlock();if(!e?.timerMode||e.timerMode==="none")return"Timer Running";if(this.currentTimer instanceof T||this.currentTimer instanceof y){const r=this.currentTimer.getCurrentPhase?.();if(r==="work")return"Work Period";if(r==="rest")return"Rest Period"}return"Timer Running"}createTimerForCurrentBlock(){const e=this.getCurrentBlock();if(!e?.timerMode||e.timerMode==="none")return null;const r=e.rounds||e.exercises.length;switch(e.timerMode){case"emom":return g.createEMOM(r);case"e2mom":return g.createE2MOM(r);case"e4mom":return g.createE4MOM(r);case"n90":return T.create(r);case"timed_circuit":return y.createTabata(r);case"fixed_rest":const s=e.durationSec||180;return C.create(s);default:return null}}setupEventListeners(){this.shadowRoot&&this.shadowRoot.addEventListener("click",e=>{const r=e.target;r.id==="start-btn"?this.startTimer():r.id==="pause-btn"?this.pauseTimer():r.id==="resume-btn"?this.resumeTimer():r.id==="reset-btn"?this.resetTimer():r.id==="skip-btn"?this.skipExercise():r.id==="next-btn"?this.nextExercise():r.id==="finish-btn"&&this.finishSession()})}async startTimer(){this.sessionStartTime||(this.sessionStartTime=performance.now(),await S.requestNotificationPermission()),await P.acquire(),this.currentTimer=this.createTimerForCurrentBlock(),this.currentTimer&&(this.currentTimer.addCallback(e=>{this.handleTimerEvent(e)}),this.currentTimer.start(),h.timerStart(),this.render())}pauseTimer(){this.currentTimer?.pause(),h.timerPause(),this.render()}resumeTimer(){this.currentTimer?.start(),h.timerStart(),this.render()}resetTimer(){this.currentTimer?.reset(),this.render()}skipExercise(){this.nextExercise()}nextExercise(){const e=this.getCurrentBlock();e&&(h.exerciseComplete(),this.currentTimer?.stop(),this.currentTimer=null,this.currentExerciseIndex+1<e.exercises.length?this.currentExerciseIndex++:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render())}async finishSession(){h.sessionComplete(),await this.cleanup(),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0}}))}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&P.reacquire(),this.updateTimerDisplay()},S.addForegroundCallback(this.foregroundCallback)}async cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),await P.release(),this.foregroundCallback&&(S.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}handleTimerEvent(e){e.type==="tick"?(this.updateTimerDisplay(),this.checkForPhaseChange(),this.checkForCountdownWarning(e.remaining)):e.type==="complete"?(h.exerciseComplete(),this.render()):e.type==="roundComplete"&&h.roundComplete()}checkForPhaseChange(){const e=this.getTimerPhase();this.lastPhase&&this.lastPhase!==e&&(e==="Work Period"?h.workPeriodStart():e==="Rest Period"&&h.restPeriodStart()),this.lastPhase=e}checkForCountdownWarning(e){const r=Math.ceil(e/1e3);if(r<=3&&r>0){const s=this.lastWarnTime||0,i=performance.now();i-s>900&&(h.countdownWarning(),this.lastWarnTime=i)}}updateTimerDisplay(){if(!this.shadowRoot||!this.currentTimer)return;const e=this.shadowRoot.querySelector(".timer-display"),r=this.shadowRoot.querySelector(".progress-fill"),s=this.shadowRoot.querySelector(".timer-progress"),i=this.shadowRoot.querySelector(".timer-phase");if(e){const n=this.currentTimer.getRemainingInCurrentPeriod();e.textContent=b.formatTime(n)}if(r){const n=this.getTimerProgress();r.style.width=`${n*100}%`}if(s){const n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds();s.textContent=`Round ${n} of ${o}`}i&&(i.textContent=this.getTimerPhase())}}customElements.define("view-session",j);class V{constructor(){a(this,"registration",null);a(this,"showUpdateCallback",null);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setupUpdateDetection()):this.setupUpdateDetection()}async setupUpdateDetection(){if(!("serviceWorker"in navigator)){console.log("Service workers not supported");return}try{this.registration=await navigator.serviceWorker.register("/sw.js"),console.log("ServiceWorker registered:",this.registration),await this.checkForUpdates(),this.checkForWaitingWorker(),setTimeout(()=>{this.checkForWaitingWorker()},1e3),this.registration.installing&&this.trackInstallingWorker(this.registration.installing),setInterval(()=>{document.visibilityState==="visible"&&this.checkForUpdates()},6e4),this.registration.addEventListener("updatefound",()=>{console.log("Update found, installing new version...");const t=this.registration?.installing;t&&this.trackInstallingWorker(t)}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("New service worker took control, reloading page"),window.location.reload()})}catch(t){console.error("ServiceWorker registration failed:",t)}}async checkForUpdates(){if(this.registration)try{await this.registration.update()}catch(t){console.error("Failed to check for updates:",t)}}checkForWaitingWorker(){this.registration&&this.registration.waiting&&(console.log("Found waiting service worker on startup"),this.showUpdateAvailable())}trackInstallingWorker(t){t.addEventListener("statechange",()=>{console.log("Service worker state changed:",t.state),t.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New version ready"),this.showUpdateAvailable())})}showUpdateAvailable(){this.showUpdateCallback?this.showUpdateCallback():this.showDefaultUpdateNotification()}showDefaultUpdateNotification(){confirm("A new version of Minimalift is available! Click OK to update now.")&&this.applyUpdate()}onUpdateAvailable(t){this.showUpdateCallback=t}async applyUpdate(){if(!this.registration?.waiting){console.log("No update waiting");return}this.registration.waiting.postMessage({type:"SKIP_WAITING"})}async forceUpdateCheck(){console.log("Forcing update check..."),await this.checkForUpdates()}}const M=new V;class G extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.setupUpdateListener()}connectedCallback(){this.render(),this.setupEventListeners()}setupUpdateListener(){M.onUpdateAvailable(()=>{this.show()})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
      <style>
        :host {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transform: translateY(100%);
          transition: transform 0.3s ease-in-out;
          padding: env(safe-area-inset-bottom) 16px 16px 16px;
        }

        :host(.visible) {
          transform: translateY(0);
        }

        .notification {
          background: var(--accent, #007AFF);
          color: white;
          padding: 16px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .content {
          flex: 1;
        }

        .title {
          font-weight: 600;
          font-size: 16px;
          margin: 0 0 4px 0;
        }

        .message {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        button {
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .update-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .update-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .dismiss-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dismiss-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            --accent: #007AFF;
          }
        }

        @media (prefers-color-scheme: light) {
          :host {
            --accent: #007AFF;
          }
        }
      </style>

      <div class="notification">
        <div class="content">
          <div class="title">🚀 Update Available</div>
          <div class="message">A new version of Minimalift is ready to install.</div>
        </div>
        <div class="actions">
          <button class="dismiss-btn" id="dismiss">Later</button>
          <button class="update-btn" id="update">Update Now</button>
        </div>
      </div>
    `)}setupEventListeners(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("#update"),e=this.shadowRoot.querySelector("#dismiss");t?.addEventListener("click",()=>{this.applyUpdate()}),e?.addEventListener("click",()=>{this.hide()})}show(){this.classList.add("visible")}hide(){this.classList.remove("visible")}async applyUpdate(){const t=this.shadowRoot?.querySelector("#update");t&&(t.textContent="Updating...",t.disabled=!0),await M.applyUpdate()}}customElements.define("update-notification",G);class Y{constructor(){a(this,"routes",[]);a(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("DOMContentLoaded",()=>this.handleRouteChange())}register(t,e){this.routes.push({path:t,handler:e})}navigate(t){window.location.hash=t}handleRouteChange(){const t=window.location.hash.slice(1)||"/";this.currentPath=t;const e=this.routes.find(r=>r.path.includes(":")?new RegExp("^"+r.path.replace(/:[^/]+/g,"([^/]+)")+"$").test(t):r.path===t);if(e)e.handler();else{const r=this.routes.find(s=>s.path==="/");r&&r.handler()}}getParams(){const t=window.location.hash.slice(1)||"/",e={};return this.routes.find(r=>{if(r.path.includes(":")){const s=r.path.split("/"),i=t.split("/");if(s.length===i.length){let n=!0;for(let o=0;o<s.length;o++)if(s[o].startsWith(":"))e[s[o].slice(1)]=i[o];else if(s[o]!==i[o]){n=!1;break}return n}}return!1}),e}getCurrentPath(){return this.currentPath}start(){this.handleRouteChange()}}const l=new Y;document.addEventListener("DOMContentLoaded",async()=>{try{let c=function(){r.innerHTML="<view-home></view-home>",r.querySelector("view-home")?.addEventListener("navigate-to-day",n=>{l.navigate(`/day/${n.detail.dayId}`)})},t=function(){const n=l.getParams().id;if(n){r.innerHTML="<view-day></view-day>";const o=r.querySelector("view-day");o&&o.loadDay&&o.loadDay(n),o?.addEventListener("start-session",d=>{l.navigate(`/session/${d.detail.dayId}`)})}};await k.initialize();const e=document.querySelector("app-shell");if(!e){console.error("App shell not found");return}await new Promise(i=>{const n=()=>{const o=e.shadowRoot;o&&o.querySelector("#content")?i(void 0):setTimeout(n,10)};n()});const r=e.shadowRoot.querySelector("#content");if(!r){console.error("Content container not found");return}l.register("/",()=>c()),l.register("/day/:id",()=>t()),l.register("/session/:id",()=>s());async function s(){const n=l.getParams().id;if(n){const o=await k.getDay(n);if(o){r.innerHTML="<view-session></view-session>";const d=r.querySelector("view-session");d&&d.setDay&&d.setDay(o),d?.addEventListener("session-complete",w=>{console.log("Session completed:",w.detail),l.navigate(`/day/${n}`)})}}}e&&(e.addEventListener("day-selected",i=>{const o=`p1_w1_d${i.detail.day}`;l.navigate(`/day/${o}`)}),e.addEventListener("open-settings",()=>{console.log("Open settings")})),l.start(),(!window.location.hash||window.location.hash==="#/")&&l.navigate("/day/p1_w1_d1")}catch(c){console.error("Failed to initialize app:",c),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `}});
//# sourceMappingURL=index-B0mOiFBG.js.map
