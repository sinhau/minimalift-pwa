var $=Object.defineProperty;var F=(c,i,t)=>i in c?$(c,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[i]=t;var a=(c,i,t)=>F(c,typeof i!="symbol"?i+"":i,t);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();class A extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}setupEventListeners(){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(t=>{t.addEventListener("click",e=>{const r=e.target.dataset.day;r&&this.selectDay(r)})}),this.shadowRoot.querySelector(".settings-btn")?.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("open-settings"))})}selectDay(i){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(e=>{e.classList.remove("active")}),this.shadowRoot.querySelector(`.day-btn[data-day="${i}"]`)?.classList.add("active"),this.dispatchEvent(new CustomEvent("day-selected",{detail:{day:i}}))}showTimer(i,t){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("#timer-bar"),s=this.shadowRoot.querySelector("#timer-display"),r=this.shadowRoot.querySelector("#timer-round");e&&e.classList.add("active"),s&&(s.textContent=i),r&&(r.textContent=t)}hideTimer(){if(!this.shadowRoot)return;const i=this.shadowRoot.querySelector("#timer-bar");i&&i.classList.remove("active")}}customElements.define("app-shell",A);const M="modulepreload",B=function(c){return"/"+c},I={},z=function(i,t,e){let s=Promise.resolve();if(t&&t.length>0){let u=function(h){return Promise.all(h.map(l=>Promise.resolve(l).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};var n=u;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),d=o?.nonce||o?.getAttribute("nonce");s=u(t.map(h=>{if(h=B(h),h in I)return;I[h]=!0;const l=h.endsWith(".css"),f=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const g=document.createElement("link");if(g.rel=l?"stylesheet":M,l||(g.as="script"),g.crossOrigin="",g.href=h,d&&g.setAttribute("nonce",d),document.head.appendChild(g),l)return new Promise((w,k)=>{g.addEventListener("load",w),g.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&r(d.reason);return i().catch(r)})};class q{constructor(){a(this,"db",null);a(this,"dbName","minimalift_v1");a(this,"version",1)}async openDb(){return this.db?this.db:new Promise((i,t)=>{const e=indexedDB.open(this.dbName,this.version);e.onerror=()=>t(e.error),e.onsuccess=()=>{this.db=e.result,i(this.db)},e.onupgradeneeded=s=>{const r=s.target.result;if(r.objectStoreNames.contains("programs")||r.createObjectStore("programs",{keyPath:"programId"}),r.objectStoreNames.contains("days")||r.createObjectStore("days",{keyPath:"dayId"}).createIndex("programId","programId",{unique:!1}),!r.objectStoreNames.contains("sessions")){const n=r.createObjectStore("sessions",{keyPath:"sessionId",autoIncrement:!0});n.createIndex("dayId","dayId",{unique:!1}),n.createIndex("date","startedAt",{unique:!1})}}})}async tx(i,t="readonly"){return(await this.openDb()).transaction([i],t).objectStore(i)}async get(i,t){const e=await this.tx(i);return new Promise((s,r)=>{const n=e.get(t);n.onsuccess=()=>s(n.result),n.onerror=()=>r(n.error)})}async getAll(i){const t=await this.tx(i);return new Promise((e,s)=>{const r=t.getAll();r.onsuccess=()=>e(r.result),r.onerror=()=>s(r.error)})}async put(i,t){const e=await this.tx(i,"readwrite");return new Promise((s,r)=>{const n=e.put(t);n.onsuccess=()=>s(n.result),n.onerror=()=>r(n.error)})}async delete(i,t){const e=await this.tx(i,"readwrite");return new Promise((s,r)=>{const n=e.delete(t);n.onsuccess=()=>s(),n.onerror=()=>r(n.error)})}async indexGetAll(i,t,e){const r=(await this.tx(i)).index(t);return new Promise((n,o)=>{const d=e?r.getAll(e):r.getAll();d.onsuccess=()=>n(d.result),d.onerror=()=>o(d.error)})}async clear(i){const t=await this.tx(i,"readwrite");return new Promise((e,s)=>{const r=t.clear();r.onsuccess=()=>e(),r.onerror=()=>s(r.error)})}}const y=new q,v=class v{constructor(){}static getInstance(){return v.instance||(v.instance=new v),v.instance}async initialize(){const{seedData:i}=await z(async()=>{const{seedData:e}=await import("./seed-data-G69QiYQA.js");return{seedData:e}},[]);await y.get("programs",i.programId)||await this.loadSeedData(i)}async loadSeedData(i){const t={programId:i.programId,title:i.title};await y.put("programs",t);for(const e of i.days)await y.put("days",e);console.log("Seed data loaded successfully")}async getProgram(i){return await y.get("programs",i)}async getDaysForProgram(i){return await y.indexGetAll("days","programId",i)}async getDay(i){return await y.get("days",i)}async getAllDays(){return(await y.getAll("days")).sort((t,e)=>t.order-e.order)}};a(v,"instance");let C=v;const x=C.getInstance();class N extends HTMLElement{constructor(){super();a(this,"days",[]);this.attachShadow({mode:"open"})}async connectedCallback(){this.days=await x.getAllDays(),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelectorAll(".day-card").forEach(t=>{t.addEventListener("click",e=>{const s=e.currentTarget.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("navigate-to-day",{detail:{dayId:s},bubbles:!0,composed:!0}))})}))}renderDayCard(t){const e=[...new Set(t.blocks.map(r=>r.type))],s=t.blocks.reduce((r,n)=>r+n.exercises.length,0);return`
      <div class="day-card" data-day-id="${t.dayId}">
        <div class="day-number">${t.order}</div>
        <div class="day-title">${t.title}</div>
        <div class="day-summary">${s} exercises • ${t.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${e.map(r=>`<span class="block-badge">${r}</span>`).join("")}
        </div>
      </div>
    `}}customElements.define("view-home",N);class W extends HTMLElement{constructor(){super();a(this,"day",null);this.attachShadow({mode:"open"})}async loadDay(t){this.day=await x.getDay(t)||null,this.render()}render(){if(this.shadowRoot){if(!this.day){this.shadowRoot.innerHTML="<p>Loading...</p>";return}this.shadowRoot.innerHTML=`
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
      
      ${this.day.blocks.map(t=>this.renderBlock(t)).join("")}
      
      <button class="start-session-btn" data-day-id="${this.day.dayId}">
        Start Session
      </button>
    `,this.shadowRoot.querySelector(".start-session-btn")?.addEventListener("click",t=>{const s=t.target.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("start-session",{detail:{dayId:s},bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".substitute-chip").forEach(t=>{t.addEventListener("click",e=>{const s=e.target,r=s.dataset.exerciseId,n=s.dataset.substitute;r&&n&&console.log("Switch to substitute:",n,"for exercise:",r)})})}}renderBlock(t){const e=this.getTimerLabel(t.timerType);return`
      <div class="block">
        <div class="block-header">
          <span class="block-title">${this.getBlockTitle(t.type)}</span>
          ${e?`<span class="timer-badge">${e}</span>`:""}
        </div>
        
        ${t.exercises.map(s=>this.renderExercise(s)).join("")}
        
        ${t.notes?`<div class="block-notes">${t.notes}</div>`:""}
      </div>
    `}renderExercise(t){const e=t.sets?`${t.sets} × ${t.reps}`:t.reps;return`
      <div class="exercise">
        <div class="exercise-header">
          <span class="exercise-name">${t.name}</span>
          <span class="exercise-sets-reps">${e}</span>
        </div>
        
        ${t.cues?`<div class="exercise-cues">${t.cues}</div>`:""}
        
        ${t.substitutes&&t.substitutes.length>0?`
          <div class="substitutes">
            ${t.substitutes.map(s=>`
              <span class="substitute-chip" 
                    data-exercise-id="${t.id}" 
                    data-substitute="${s}">
                ${s}
              </span>
            `).join("")}
          </div>
        `:""}
      </div>
    `}getBlockTitle(t){return{warmup:"Warm Up",strength:"Strength & Condition",swole:"Swole & Flexy",accessory:"Accessories"}[t]||t}getTimerLabel(t){return{interval:"Interval",work_rest:"Work/Rest",circuit:"Circuit",tabata:"Tabata",stopwatch:"Stopwatch",none:""}[t]||""}}customElements.define("view-day",W);class b{constructor(i=100){a(this,"startTime",0);a(this,"pausedTime",0);a(this,"totalPausedDuration",0);a(this,"intervalId",null);a(this,"state","idle");a(this,"callbacks",[]);this.tickInterval=i}start(){this.state!=="running"&&(this.state==="paused"?this.totalPausedDuration+=performance.now()-this.pausedTime:(this.startTime=performance.now(),this.totalPausedDuration=0),this.state="running",this.intervalId=window.setInterval(()=>this.tick(),this.tickInterval),this.notifyStateChange())}pause(){this.state==="running"&&(this.state="paused",this.pausedTime=performance.now(),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.notifyStateChange())}reset(){this.stop(),this.state="idle",this.startTime=0,this.pausedTime=0,this.totalPausedDuration=0,this.notifyStateChange()}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}getState(){return this.state}getElapsedTime(){return this.startTime===0?0:(this.state==="paused"?this.pausedTime:performance.now())-this.startTime-this.totalPausedDuration}addCallback(i){this.callbacks.push(i)}removeCallback(i){const t=this.callbacks.indexOf(i);t>-1&&this.callbacks.splice(t,1)}tick(){const i=this.getElapsedTime(),t=this.getRemainingInCurrentPeriod(),e=this.getCurrentRound(),s=this.getTotalRounds(),r=this.getDuration();if(i>=r-100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:r,remaining:0,round:e,totalRounds:s,state:this.state});return}const n=this.getPreviousRound(i-this.tickInterval);e>n&&n>0&&this.notifyCallbacks({type:"roundComplete",elapsed:i,remaining:t,round:n,totalRounds:s,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:i,remaining:t,round:e,totalRounds:s,state:this.state})}notifyCallbacks(i){this.callbacks.forEach(t=>{try{t(i)}catch(e){console.error("Timer callback error:",e)}})}notifyStateChange(){const i=this.getElapsedTime();this.notifyCallbacks({type:"stateChange",elapsed:i,remaining:this.getRemainingInCurrentPeriod(),round:this.getCurrentRound(),totalRounds:this.getTotalRounds(),state:this.state})}static formatTime(i){const t=i<=100?0:Math.max(0,Math.ceil(i/1e3)),e=Math.floor(t/60),s=t%60;return`${e.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}static formatTimeWithMs(i){const t=Math.max(0,i),e=Math.floor(t/1e3),s=Math.floor(t%1e3/100),r=Math.floor(e/60),n=e%60;return`${r.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${s}`}}class U extends b{constructor(t,e,s=1){super();a(this,"currentRound",1);this.intervalSec=t,this.totalRounds=e,this.exercisesPerInterval=s}getDuration(){return this.intervalSec*this.totalRounds*1e3}getCurrentRound(){const t=this.getElapsedTime();return Math.min(Math.floor(t/(this.intervalSec*1e3))+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%(this.intervalSec*1e3)}getRemainingInCurrentPeriod(){return this.intervalSec*1e3-this.getTimeInCurrentPeriod()}getExercisesPerInterval(){return this.exercisesPerInterval}getPreviousRound(t){return Math.min(Math.floor(t/(this.intervalSec*1e3))+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),e=this.getDuration()-t,s=this.getCurrentRound();if(e<=0){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:t,remaining:e,round:s,totalRounds:this.totalRounds,state:this.state});return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:e,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:s,totalRounds:this.totalRounds,state:this.state})}}class S extends b{constructor(t,e,s){super();a(this,"currentSet",1);a(this,"isWorkPhase",!0);this.workSec=t,this.restSec=e,this.totalSets=s}getDuration(){return(this.workSec+this.restSec)*this.totalSets*1e3}getCurrentRound(){return this.currentSet}getTotalRounds(){return this.totalSets}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),e=(this.workSec+this.restSec)*1e3,s=t%e;return s<this.workSec*1e3?s:s-this.workSec*1e3}getRemainingInCurrentPeriod(){const t=this.getElapsedTime(),e=(this.workSec+this.restSec)*1e3,s=t%e;return s<this.workSec*1e3?this.workSec*1e3-s:this.restSec*1e3-(s-this.workSec*1e3)}isInWorkPhase(){const t=this.getElapsedTime(),e=(this.workSec+this.restSec)*1e3;return t%e<this.workSec*1e3}getPreviousRound(t){return Math.min(Math.floor(t/((this.workSec+this.restSec)*1e3))+1,this.totalSets)}tick(){const t=this.getElapsedTime(),e=this.getDuration()-t,s=Math.min(Math.floor(t/((this.workSec+this.restSec)*1e3))+1,this.totalSets),r=this.isWorkPhase;if(this.isWorkPhase=this.isInWorkPhase(),e<=100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:this.getDuration(),remaining:0,round:this.totalSets,totalRounds:this.totalSets,state:this.state});return}s>this.currentSet?(this.currentSet=s,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:e,round:s-1,totalRounds:this.totalSets,state:this.state})):r&&!this.isWorkPhase&&this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:s,totalRounds:this.totalSets,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:s,totalRounds:this.totalSets,state:this.state})}}class H extends b{constructor(t,e,s=0){super();a(this,"currentRound",1);a(this,"currentStationIndex",0);this.stations=t,this.totalRounds=e,this.transitionSec=s}getDuration(){const t=this.stations.reduce((s,r)=>s+r.durationSec,0),e=this.transitionSec*Math.max(0,this.stations.length-1);return(t+e)*this.totalRounds*1e3}getCurrentRound(){return this.currentRound}getTotalRounds(){return this.totalRounds}getCurrentStation(){return this.currentStationIndex<this.stations.length?this.stations[this.currentStationIndex]:null}getCurrentStationIndex(){return this.currentStationIndex}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),e=this.getRoundDuration(),s=t%e;let r=0;for(let n=0;n<this.stations.length;n++){const o=this.stations[n].durationSec*1e3;if(s<r+o)return s-r;if(r+=o,n<this.stations.length-1){const d=this.transitionSec*1e3;if(s<r+d)return s-r;r+=d}}return 0}getRemainingInCurrentPeriod(){const t=this.getCurrentStation();return t?(this.isInTransition()?this.transitionSec*1e3:t.durationSec*1e3)-this.getTimeInCurrentPeriod():0}isInTransition(){const t=this.getElapsedTime(),e=this.getRoundDuration(),s=t%e;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,s<r)return!1;if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,s<r))return!0}return!1}getRoundDuration(){const t=this.stations.reduce((s,r)=>s+r.durationSec*1e3,0),e=this.transitionSec*Math.max(0,this.stations.length-1)*1e3;return t+e}updateCurrentPosition(){const t=this.getElapsedTime(),e=this.getRoundDuration();this.currentRound=Math.min(Math.floor(t/e)+1,this.totalRounds);const s=t%e;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,s<r){this.currentStationIndex=n;return}if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,s<r)){this.currentStationIndex=n;return}}this.currentStationIndex=this.stations.length-1}getPreviousRound(t){const e=this.getRoundDuration();return Math.min(Math.floor(t/e)+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),e=this.getDuration()-t;if(e<=0){this.state="completed",this.stop();return}const s=this.currentRound;this.updateCurrentPosition(),this.currentRound>s&&this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:e,round:s,totalRounds:this.totalRounds,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:this.currentRound,totalRounds:this.totalRounds,state:this.state})}}class j extends b{constructor(t,e,s){super();a(this,"currentRound",1);this.highIntensitySec=t,this.lowIntensitySec=e,this.totalRounds=s}getDuration(){return(this.highIntensitySec+this.lowIntensitySec)*this.totalRounds*1e3}getCurrentRound(){const t=this.getElapsedTime(),e=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(t/e)+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),e=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=t%e;return s<this.highIntensitySec*1e3?s:s-this.highIntensitySec*1e3}getRemainingInCurrentPeriod(){const t=this.getElapsedTime(),e=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=t%e;return s<this.highIntensitySec*1e3?this.highIntensitySec*1e3-s:this.lowIntensitySec*1e3-(s-this.highIntensitySec*1e3)}isHighIntensity(){const t=this.getElapsedTime(),e=(this.highIntensitySec+this.lowIntensitySec)*1e3;return t%e<this.highIntensitySec*1e3}getPreviousRound(t){const e=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(t/e)+1,this.totalRounds)}tick(){const t=this.getElapsedTime(),e=this.getDuration()-t,s=this.getCurrentRound();if(e<=0){this.state="completed",this.stop();return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:e,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:t,remaining:e,round:s,totalRounds:this.totalRounds,state:this.state})}}class O extends b{constructor(){super();a(this,"laps",[])}getDuration(){return Number.MAX_SAFE_INTEGER}getCurrentRound(){return this.laps.length+1}getTotalRounds(){return 0}getTimeInCurrentPeriod(){const t=this.getElapsedTime(),e=this.laps.length>0?this.laps[this.laps.length-1]:0;return t-e}getRemainingInCurrentPeriod(){return 0}addLap(){const t=this.getElapsedTime();this.laps.push(t),this.notifyCallbacks({type:"roundComplete",elapsed:t,remaining:0,round:this.laps.length,totalRounds:0,state:this.state})}getLaps(){return[...this.laps]}getLapTime(t){if(t<0||t>=this.laps.length)return 0;const e=this.laps[t],s=t>0?this.laps[t-1]:0;return e-s}reset(){super.reset(),this.laps=[]}getPreviousRound(t){return this.laps.length}tick(){const t=this.getElapsedTime();this.notifyCallbacks({type:"tick",elapsed:t,remaining:0,round:this.laps.length+1,totalRounds:0,state:this.state})}}class E{static createTimer(i,t){if(!t&&i!=="stopwatch")return null;switch(i){case"interval":if(t?.intervalSec&&t?.rounds)return new U(t.intervalSec,t.rounds,t.exercisesPerInterval||1);break;case"work_rest":if(t?.workSec&&t?.restSec&&t?.rounds)return new S(t.workSec,t.restSec,t.rounds);if(t?.restSec&&t?.rounds)return new S(0,t.restSec,t.rounds);break;case"circuit":if(t?.stations&&t.stations.length>0&&t?.rounds)return new H(t.stations,t.rounds,t.transitionSec||0);break;case"tabata":if(t?.highIntensitySec&&t?.lowIntensitySec&&t?.rounds)return new j(t.highIntensitySec,t.lowIntensitySec,t.rounds);break;case"stopwatch":return new O;case"none":default:return null}return null}static createRestTimer(i,t=1){return new S(0,i,t)}}class _{constructor(){a(this,"wakeLock",null);a(this,"supported","wakeLock"in navigator)}async acquire(){if(!this.supported)return console.warn("Wake Lock API not supported"),!1;try{return this.wakeLock||(this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock?.addEventListener("release",()=>{console.log("Wake lock released"),this.wakeLock=null}),console.log("Wake lock acquired")),!0}catch(i){return console.error("Failed to acquire wake lock:",i),!1}}async release(){if(this.wakeLock)try{await this.wakeLock.release(),this.wakeLock=null,console.log("Wake lock released manually")}catch(i){console.error("Failed to release wake lock:",i)}}isActive(){return this.wakeLock!==null&&!this.wakeLock.released}isSupportedApi(){return this.supported}async reacquire(){return this.wakeLock&&this.wakeLock.released?(this.wakeLock=null,await this.acquire()):this.isActive()}}const T=new _;class V{constructor(){a(this,"backgroundStartTime",null);a(this,"callbacks",[]);this.setupVisibilityHandlers()}setupVisibilityHandlers(){document.addEventListener("visibilitychange",()=>{document.hidden?this.handleBackground():this.handleForeground()}),window.addEventListener("blur",()=>{document.hidden||this.handleBackground()}),window.addEventListener("focus",()=>{document.hidden||this.handleForeground()})}handleBackground(){console.log("App went to background"),this.backgroundStartTime=performance.now(),this.maybeShowNotification()}handleForeground(){if(this.backgroundStartTime!==null){const i=performance.now()-this.backgroundStartTime;console.log(`App returned to foreground after ${i}ms`),this.backgroundStartTime=null,this.callbacks.forEach(t=>{try{t()}catch(e){console.error("Background timer callback error:",e)}})}}async maybeShowNotification(){if("Notification"in window&&Notification.permission==="granted"&&this.callbacks.length>0)try{const t=new Notification("Minimalift Workout Active",{body:"Your workout timer is still running in the background.",icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",tag:"workout-active",requireInteraction:!1,silent:!0});setTimeout(()=>t.close(),5e3)}catch(t){console.error("Failed to show notification:",t)}}addForegroundCallback(i){this.callbacks.push(i)}removeForegroundCallback(i){const t=this.callbacks.indexOf(i);t>-1&&this.callbacks.splice(t,1)}getTimeInBackground(){return this.backgroundStartTime!==null?performance.now()-this.backgroundStartTime:0}isInBackground(){return document.hidden}async requestNotificationPermission(){if(!("Notification"in window))return console.warn("Notifications not supported"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return!1;try{return await Notification.requestPermission()==="granted"}catch(i){return console.error("Failed to request notification permission:",i),!1}}}const R=new V;class G{constructor(){a(this,"audioContext",null);a(this,"enableHaptic",!0);a(this,"enableAudio",!0);document.addEventListener("touchstart",this.initAudioContext.bind(this),{once:!0}),document.addEventListener("click",this.initAudioContext.bind(this),{once:!0})}initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log("Audio context initialized")}catch(i){console.warn("Audio context not supported:",i)}}setHapticEnabled(i){this.enableHaptic=i}setAudioEnabled(i){this.enableAudio=i}isHapticSupported(){return"vibrate"in navigator}isAudioSupported(){return this.audioContext!==null}vibrate(i){if(!(!this.enableHaptic||!this.isHapticSupported()))try{navigator.vibrate(i)}catch(t){console.warn("Vibration failed:",t)}}beep(i=800,t=200,e=.1){if(!(!this.enableAudio||!this.audioContext))try{const s=this.audioContext.createOscillator(),r=this.audioContext.createGain();s.connect(r),r.connect(this.audioContext.destination),s.frequency.value=i,s.type="sine",r.gain.setValueAtTime(e,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+t/1e3),s.start(),s.stop(this.audioContext.currentTime+t/1e3)}catch(s){console.warn("Audio playback failed:",s)}}timerStart(){this.vibrate(100),this.beep(600,150)}timerPause(){this.vibrate([50,50,50]),this.beep(400,100)}roundComplete(){this.vibrate([100,50,100]),this.beep(800,200)}exerciseComplete(){this.vibrate([150,100,150,100,150]),this.playSuccess()}sessionComplete(){this.vibrate([200,100,200,100,200,100,300]),this.playSuccessChord()}setComplete(){this.vibrate([100,50,100]),this.beep(700,150)}restStart(){this.vibrate(80),this.beep(500,150)}restComplete(){this.vibrate([50,30,50]),this.beep(800,100)}workPeriodStart(){this.vibrate([50,30,50]),this.beep(1e3,100)}restPeriodStart(){this.vibrate(80),this.beep(500,150)}countdownWarning(){this.vibrate(50),this.beep(700,100)}playSuccess(){if(!this.audioContext)return;[523,659,784].forEach((t,e)=>{setTimeout(()=>{this.beep(t,200,.08)},e*100)})}playSuccessChord(){if(!this.audioContext)return;[523,659,784].forEach(t=>{this.beep(t,500,.05)})}testFeedback(){console.log("Testing feedback..."),setTimeout(()=>this.timerStart(),0),setTimeout(()=>this.workPeriodStart(),1e3),setTimeout(()=>this.countdownWarning(),2e3),setTimeout(()=>this.restPeriodStart(),3e3),setTimeout(()=>this.roundComplete(),4e3),setTimeout(()=>this.exerciseComplete(),5e3)}}const p=new G;class Y extends HTMLElement{constructor(){super();a(this,"currentDay",null);a(this,"currentBlockIndex",0);a(this,"currentExerciseIndex",0);a(this,"currentSetIndex",0);a(this,"currentTimer",null);a(this,"sessionStartTime",0);a(this,"foregroundCallback",null);a(this,"lastPhase",null);a(this,"isRestingBetweenSets",!1);this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners(),this.setupBackgroundHandling()}disconnectedCallback(){this.cleanup()}setDay(t){this.currentDay=t,this.currentBlockIndex=0,this.currentExerciseIndex=0,this.currentSetIndex=0,this.isRestingBetweenSets=!1,this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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

        .session-save-dialog h3 {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px 0;
          color: var(--text-primary);
        }

        .session-save-dialog p {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 0 8px 0;
        }

        .dialog-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .discard-btn, .save-btn {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .discard-btn {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }

        .discard-btn:hover {
          background: var(--border);
          color: var(--text-primary);
        }

        .save-btn {
          background: var(--accent);
          color: white;
        }

        .save-btn:hover {
          opacity: 0.9;
        }

        .cancel-session-btn {
          padding: 8px 16px;
          background: var(--bg-primary);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-session-btn:hover {
          background: var(--border);
          color: var(--text-primary);
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
      `;if(!this.getCurrentBlock())return this.renderSessionComplete();const e=this.getCurrentExercise();return e?`
      ${this.renderHeader()}
      <div class="session-main">
        ${this.renderCurrentExercise(e)}
        ${this.renderTimer()}
        ${this.renderControls()}
        ${this.renderNextUp()}
      </div>
    `:this.renderSessionComplete()}renderHeader(){if(!this.currentDay)return"";const t=this.currentDay.blocks.length,e=this.currentDay.blocks.reduce((r,n)=>r+n.exercises.length,0),s=this.currentBlockIndex*(this.currentDay.blocks[0]?.exercises.length||0)+this.currentExerciseIndex;return`
      <div class="session-header">
        <div class="session-info">
          <div class="session-title">${this.currentDay.title}</div>
          <div class="session-progress">
            Block ${this.currentBlockIndex+1} of ${t} • 
            Exercise ${s+1} of ${e}
          </div>
        </div>
        <button class="cancel-session-btn" id="cancel-session">Cancel</button>
      </div>
    `}renderCurrentExercise(t){const e=this.getCurrentBlock();return e?`
      <div class="current-exercise">
        <div class="exercise-name">${t.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(t,e)}</div>
      </div>
    `:""}renderTimer(){const t=this.getCurrentExercise(),e=this.getCurrentBlock();if(!(e?.timerType&&e.timerType!=="none")&&t){const l=t.sets||1,f=this.currentSetIndex+1;if(this.isRestingBetweenSets&&this.currentTimer){const g=this.currentTimer.getRemainingInCurrentPeriod(),w=b.formatTime(g),k=this.currentTimer.getElapsedTime(),P=this.currentTimer.getDuration(),L=Math.min(k/P,1);return`
          <div class="timer-section">
            <div class="timer-display">${w}</div>
            <div class="timer-phase">Rest after Set ${f-1}</div>
            <div class="timer-progress">Set ${f}/${l} next</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${L*100}%"></div>
            </div>
          </div>
        `}return`
        <div class="timer-section">
          <div class="timer-display">Set ${f}/${l}</div>
          <div class="timer-phase">${t.reps} reps</div>
          ${t.restSec?`<div class="timer-progress">${t.restSec}s rest after set</div>`:""}
        </div>
      `}if(!this.currentTimer)return`
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;const r=this.currentTimer.getRemainingInCurrentPeriod(),n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds(),d=b.formatTime(r),u=this.getTimerProgress(),h=this.getTimerPhase();return`
      <div class="timer-section">
        <div class="timer-display">${d}</div>
        <div class="timer-phase">${h}</div>
        <div class="timer-progress">Round ${n} of ${o}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${u*100}%"></div>
        </div>
      </div>
    `}renderControls(){const t=this.getCurrentBlock(),e=this.getCurrentExercise();if(t?.timerType&&t.timerType!=="none"){const u=this.currentTimer?.getState()||"idle",h=u==="completed";let l="";return!this.currentTimer||u==="idle"?l='<button class="control-btn primary" id="start-btn">Start Timer</button>':u==="running"?l='<button class="control-btn warning" id="pause-btn">Pause</button>':u==="paused"?l='<button class="control-btn primary" id="resume-btn">Resume</button>':h&&(l='<button class="control-btn primary" id="next-btn">Next Exercise</button>'),`
        <div class="session-controls">
          ${l}
          <button class="control-btn secondary" id="reset-btn" ${!this.currentTimer||u==="idle"?"disabled":""}>Reset</button>
          <button class="control-btn secondary" id="skip-btn">Skip</button>
        </div>
      `}if(!e)return'<div class="session-controls"><button class="control-btn secondary" id="skip-btn">Skip</button></div>';const r=e.sets||1,n=this.isRestingBetweenSets,o=this.currentTimer?.getState()||"idle";if(n&&this.currentTimer){if(o==="running")return`
          <div class="session-controls">
            <button class="control-btn warning" id="pause-btn">Pause Rest</button>
            <button class="control-btn secondary" id="skip-rest-btn">Skip Rest</button>
          </div>
        `;if(o==="paused")return`
          <div class="session-controls">
            <button class="control-btn primary" id="resume-btn">Resume Rest</button>
            <button class="control-btn secondary" id="skip-rest-btn">Skip Rest</button>
          </div>
        `;if(o==="completed")return`
          <div class="session-controls">
            <button class="control-btn primary" id="next-set-btn">Start Next Set</button>
          </div>
        `}return`
      <div class="session-controls">
        <button class="control-btn primary" id="complete-set-btn">
          Complete Set ${this.currentSetIndex+1}/${r}
        </button>
        <button class="control-btn secondary" id="skip-btn">Skip Exercise</button>
      </div>
    `}renderNextUp(){const t=this.getNextExercise();return t?`
      <div class="next-up">
        <div class="next-up-label">Next Up</div>
        <div class="next-up-exercise">${t.name}</div>
      </div>
    `:`
        <div class="next-up">
          <div class="next-up-label">Next Up</div>
          <div class="next-up-exercise">Session Complete!</div>
        </div>
      `}renderSessionComplete(){const t=this.sessionStartTime?performance.now()-this.sessionStartTime:0;return`
      <div class="session-complete">
        <div class="complete-icon">🎉</div>
        <div class="complete-title">Workout Complete!</div>
        <div class="complete-stats">Duration: ${b.formatTime(t)}</div>
        <div class="session-controls">
          <button class="control-btn primary" id="finish-btn">Finish Session</button>
        </div>
      </div>
    `}getCurrentBlock(){return!this.currentDay||this.currentBlockIndex>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex]}getCurrentExercise(){const t=this.getCurrentBlock();return!t||this.currentExerciseIndex>=t.exercises.length?null:t.exercises[this.currentExerciseIndex]}getNextExercise(){const t=this.getCurrentBlock();return t?this.currentExerciseIndex+1<t.exercises.length?t.exercises[this.currentExerciseIndex+1]:!this.currentDay||this.currentBlockIndex+1>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex+1].exercises[0]||null:null}formatExerciseDetails(t,e){const s=[];t.sets&&s.push(`${t.sets} sets`),t.reps&&s.push(`${t.reps} reps`),t.restSec&&s.push(`${t.restSec}s rest`);const r=e.timerType;return r&&r!=="none"&&s.push(`${r.toUpperCase()} format`),s.join(" • ")}getTimerProgress(){if(!this.currentTimer)return 0;const t=this.currentTimer.getElapsedTime(),e=this.currentTimer.getDuration();return Math.min(t/e,1)}getTimerPhase(){if(!this.currentTimer)return"Ready";const t=this.getCurrentBlock();if(!(t?.timerType&&t.timerType!=="none"))return"Timer Running";if(this.currentTimer&&this.currentTimer.getTotalRounds()>1){const s=this.currentTimer.getCurrentPhase?.();if(s==="work")return"Work Period";if(s==="rest")return"Rest Period"}return"Timer Running"}createTimerForCurrentBlock(){const t=this.getCurrentBlock();return!t?.timerType||t.timerType==="none"?null:E.createTimer(t.timerType,t.timerConfig)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.addEventListener("click",t=>{const e=t.target;e.id==="start-btn"?this.startTimer():e.id==="pause-btn"?this.pauseTimer():e.id==="resume-btn"?this.resumeTimer():e.id==="reset-btn"?this.resetTimer():e.id==="skip-btn"?this.skipExercise():e.id==="complete-exercise-btn"?this.completeExercise():e.id==="complete-set-btn"?this.completeSet():e.id==="skip-rest-btn"?this.skipRest():e.id==="next-set-btn"?this.startNextSet():e.id==="next-btn"?this.nextExercise():e.id==="finish-btn"?this.finishSession():e.id==="cancel-session"&&this.cancelSession()})}async startTimer(){this.sessionStartTime||(this.sessionStartTime=performance.now(),await R.requestNotificationPermission()),await T.acquire(),this.currentTimer=this.createTimerForCurrentBlock(),this.currentTimer&&(this.currentTimer.addCallback(t=>{this.handleTimerEvent(t)}),this.currentTimer.start(),p.timerStart(),this.render())}pauseTimer(){this.currentTimer?.pause(),p.timerPause(),this.render()}resumeTimer(){this.currentTimer?.start(),p.timerStart(),this.render()}resetTimer(){this.currentTimer?.reset(),this.render()}skipExercise(){this.nextExercise()}completeExercise(){this.nextExercise()}async completeSet(){const t=this.getCurrentExercise();if(!t)return;const e=t.sets||1,s=this.currentSetIndex>=e-1;p.setComplete(),s?this.nextExercise():(t.restSec&&t.restSec>0?(this.currentSetIndex++,this.isRestingBetweenSets=!0,this.currentTimer=E.createRestTimer(t.restSec,1),this.currentTimer.addCallback(r=>{r.type==="complete"?this.handleRestComplete():r.type==="tick"&&this.updateTimerDisplay()}),this.currentTimer.start(),p.restStart()):this.currentSetIndex++,this.render())}skipRest(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),this.handleRestComplete()}startNextSet(){this.handleRestComplete()}handleRestComplete(){this.isRestingBetweenSets=!1,this.currentTimer?.stop(),this.currentTimer=null,p.restComplete(),this.render()}nextExercise(){const t=this.getCurrentBlock();t&&(p.exerciseComplete(),this.currentTimer?.stop(),this.currentTimer=null,this.currentSetIndex=0,this.isRestingBetweenSets=!1,this.currentExerciseIndex+1<t.exercises.length?this.currentExerciseIndex++:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render())}async finishSession(){p.sessionComplete(),await this.cleanup(),this.showSessionSaveDialog()}showSessionSaveDialog(){const t=this.sessionStartTime?Math.round((performance.now()-this.sessionStartTime)/1e3):0,e=Math.floor(t/60),s=t%60,r=`${e}:${s.toString().padStart(2,"0")}`;if(!this.shadowRoot)return;const n=`
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Session Complete!</h3>
          <p>Duration: ${r}</p>
          <p>Do you want to save this workout session?</p>
          
          <div class="dialog-actions">
            <button class="discard-btn" id="discard-session">
              Discard Session
            </button>
            <button class="save-btn" id="save-session">
              Save Session
            </button>
          </div>
        </div>
      </div>
    `,o=document.createElement("div");o.innerHTML=n,this.shadowRoot.appendChild(o);const d=this.shadowRoot.querySelector("#discard-session"),u=this.shadowRoot.querySelector("#save-session");d?.addEventListener("click",()=>{this.discardSession()}),u?.addEventListener("click",()=>{this.saveSession()})}discardSession(){console.log("Session discarded (not saved)"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1}}))}saveSession(){console.log("Session saved"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!0}}))}async cancelSession(){confirm("Are you sure you want to cancel this session? Your progress will not be saved.")&&(console.log("Session cancelled by user"),await this.cleanup(),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1,cancelled:!0}})))}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&T.reacquire(),this.updateTimerDisplay()},R.addForegroundCallback(this.foregroundCallback)}async cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),await T.release(),this.foregroundCallback&&(R.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}handleTimerEvent(t){t.type==="tick"?(this.updateTimerDisplay(),this.checkForPhaseChange(),this.checkForCountdownWarning(t.remaining)):t.type==="complete"?(p.exerciseComplete(),this.render()):t.type==="roundComplete"&&p.roundComplete()}checkForPhaseChange(){const t=this.getTimerPhase();this.lastPhase&&this.lastPhase!==t&&(t==="Work Period"?p.workPeriodStart():t==="Rest Period"&&p.restPeriodStart()),this.lastPhase=t}checkForCountdownWarning(t){const e=Math.ceil(t/1e3);if(e<=3&&e>0){const s=this.lastWarnTime||0,r=performance.now();r-s>900&&(p.countdownWarning(),this.lastWarnTime=r)}}updateTimerDisplay(){if(!this.shadowRoot||!this.currentTimer)return;const t=this.shadowRoot.querySelector(".timer-display"),e=this.shadowRoot.querySelector(".progress-fill"),s=this.shadowRoot.querySelector(".timer-progress"),r=this.shadowRoot.querySelector(".timer-phase");if(t){const n=this.currentTimer.getRemainingInCurrentPeriod();t.textContent=b.formatTime(n)}if(e){const n=this.getTimerProgress();e.style.width=`${n*100}%`}if(s){const n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds();s.textContent=`Round ${n} of ${o}`}r&&(r.textContent=this.getTimerPhase())}}customElements.define("view-session",Y);class K{constructor(){a(this,"registration",null);a(this,"showUpdateCallback",null);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setupUpdateDetection()):this.setupUpdateDetection()}async setupUpdateDetection(){if(!("serviceWorker"in navigator)){console.log("Service workers not supported");return}try{this.registration=await navigator.serviceWorker.register("/sw.js"),console.log("ServiceWorker registered:",this.registration),console.log("Checking for updates on startup..."),await this.checkForUpdates(),console.log("Checking for waiting service worker..."),this.checkForWaitingWorker(),setTimeout(()=>{console.log("Double-checking for waiting service worker after delay..."),this.checkForWaitingWorker()},1e3),this.registration.installing&&this.trackInstallingWorker(this.registration.installing),setInterval(()=>{document.visibilityState==="visible"&&(console.log("Periodic update check (30s interval)"),this.checkForUpdates())},3e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(console.log("App came to foreground, checking for updates"),this.checkForUpdates())}),this.registration.addEventListener("updatefound",()=>{console.log("Update found, installing new version...");const i=this.registration?.installing;i&&this.trackInstallingWorker(i)}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("New service worker took control, reloading page"),window.location.reload()})}catch(i){console.error("ServiceWorker registration failed:",i)}}async checkForUpdates(){if(!this.registration){console.log("No registration available for update check");return}try{console.log("Calling registration.update()..."),await this.registration.update(),console.log("Update check completed"),this.registration.waiting&&(console.log("Found waiting worker after update check"),this.showUpdateAvailable())}catch(i){console.error("Failed to check for updates:",i)}}checkForWaitingWorker(){this.registration&&this.registration.waiting&&(console.log("Found waiting service worker on startup"),this.showUpdateAvailable())}trackInstallingWorker(i){i.addEventListener("statechange",()=>{console.log("Service worker state changed:",i.state),i.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New version ready"),this.showUpdateAvailable())})}showUpdateAvailable(){this.showUpdateCallback?this.showUpdateCallback():this.showDefaultUpdateNotification()}showDefaultUpdateNotification(){confirm("A new version of Minimalift is available! Click OK to update now.")&&this.applyUpdate()}onUpdateAvailable(i){this.showUpdateCallback=i}async applyUpdate(){if(!this.registration?.waiting){console.log("No update waiting");return}this.registration.waiting.postMessage({type:"SKIP_WAITING"})}async forceUpdateCheck(){console.log("Manual update check triggered..."),await this.checkForUpdates(),setTimeout(()=>{this.checkForWaitingWorker()},2e3)}}const D=new K;class X extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.setupUpdateListener()}connectedCallback(){this.render(),this.setupEventListeners()}setupUpdateListener(){D.onUpdateAvailable(()=>{this.show()})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}setupEventListeners(){if(!this.shadowRoot)return;const i=this.shadowRoot.querySelector("#update"),t=this.shadowRoot.querySelector("#dismiss");i?.addEventListener("click",()=>{this.applyUpdate()}),t?.addEventListener("click",()=>{this.hide()})}show(){this.classList.add("visible")}hide(){this.classList.remove("visible")}async applyUpdate(){const i=this.shadowRoot?.querySelector("#update");i&&(i.textContent="Updating...",i.disabled=!0),await D.applyUpdate()}}customElements.define("update-notification",X);class J{constructor(){a(this,"routes",[]);a(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("DOMContentLoaded",()=>this.handleRouteChange())}register(i,t){this.routes.push({path:i,handler:t})}navigate(i){window.location.hash=i}handleRouteChange(){const i=window.location.hash.slice(1)||"/";this.currentPath=i;const t=this.routes.find(e=>e.path.includes(":")?new RegExp("^"+e.path.replace(/:[^/]+/g,"([^/]+)")+"$").test(i):e.path===i);if(t)t.handler();else{const e=this.routes.find(s=>s.path==="/");e&&e.handler()}}getParams(){const i=window.location.hash.slice(1)||"/",t={};return this.routes.find(e=>{if(e.path.includes(":")){const s=e.path.split("/"),r=i.split("/");if(s.length===r.length){let n=!0;for(let o=0;o<s.length;o++)if(s[o].startsWith(":"))t[s[o].slice(1)]=r[o];else if(s[o]!==r[o]){n=!1;break}return n}}return!1}),t}getCurrentPath(){return this.currentPath}start(){this.handleRouteChange()}}const m=new J;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app...");try{let c=function(){e.innerHTML="<view-home></view-home>",e.querySelector("view-home")?.addEventListener("navigate-to-day",n=>{m.navigate(`/day/${n.detail.dayId}`)})},i=function(){const n=m.getParams().id;if(n){e.innerHTML="<view-day></view-day>";const o=e.querySelector("view-day");o&&o.loadDay&&o.loadDay(n),o?.addEventListener("start-session",d=>{m.navigate(`/session/${d.detail.dayId}`)})}};console.log("Initializing program manager..."),await x.initialize(),console.log("Program manager initialized");const t=document.querySelector("app-shell");if(!t){console.error("App shell not found");return}console.log("Found app shell, waiting for shadow DOM..."),await new Promise(r=>{const n=()=>{const o=t.shadowRoot;o&&o.querySelector("#content")?(console.log("Shadow DOM ready"),r(void 0)):setTimeout(n,10)};n()});const e=t.shadowRoot.querySelector("#content");if(!e){console.error("Content container not found");return}m.register("/",()=>c()),m.register("/day/:id",()=>i()),m.register("/session/:id",()=>s());async function s(){const n=m.getParams().id;if(n){const o=await x.getDay(n);if(o){e.innerHTML="<view-session></view-session>";const d=e.querySelector("view-session");d&&d.setDay&&d.setDay(o),d?.addEventListener("session-complete",u=>{console.log("Session completed:",u.detail),m.navigate(`/day/${n}`)})}}}t&&(t.addEventListener("day-selected",r=>{const o=`p1_w1_d${r.detail.day}`;m.navigate(`/day/${o}`)}),t.addEventListener("open-settings",()=>{console.log("Open settings")})),console.log("Starting router..."),m.start(),!window.location.hash||window.location.hash==="#/"?(console.log("No hash found, navigating to Day 1"),m.navigate("/day/p1_w1_d1")):console.log("Found hash:",window.location.hash),console.log("App initialization complete")}catch(c){console.error("Failed to initialize app:",c),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `}});
//# sourceMappingURL=index-CfQYhSSd.js.map
