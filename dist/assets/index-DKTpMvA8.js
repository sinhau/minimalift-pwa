var B=Object.defineProperty;var M=(c,r,e)=>r in c?B(c,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[r]=e;var a=(c,r,e)=>M(c,typeof r!="symbol"?r+"":r,e);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();class A extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.querySelectorAll(".day-btn").forEach(r=>{r.addEventListener("click",e=>{const s=e.target.dataset.day;s&&this.selectDay(s)})})}selectDay(r){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(t=>{t.classList.remove("active")}),this.shadowRoot.querySelector(`.day-btn[data-day="${r}"]`)?.classList.add("active"),this.dispatchEvent(new CustomEvent("day-selected",{detail:{day:r}}))}showTimer(r,e){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("#timer-bar"),s=this.shadowRoot.querySelector("#timer-display"),i=this.shadowRoot.querySelector("#timer-round");t&&t.classList.add("active"),s&&(s.textContent=r),i&&(i.textContent=e)}hideTimer(){if(!this.shadowRoot)return;const r=this.shadowRoot.querySelector("#timer-bar");r&&r.classList.remove("active")}}customElements.define("app-shell",A);const z="modulepreload",N=function(c){return"/"+c},$={},W=function(r,e,t){let s=Promise.resolve();if(e&&e.length>0){let h=function(u){return Promise.all(u.map(m=>Promise.resolve(m).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};var n=h;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=h(e.map(u=>{if(u=N(u),u in $)return;$[u]=!0;const m=u.endsWith(".css"),p=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const f=document.createElement("link");if(f.rel=m?"stylesheet":z,m||(f.as="script"),f.crossOrigin="",f.href=u,l&&f.setAttribute("nonce",l),document.head.appendChild(f),m)return new Promise((S,T)=>{f.addEventListener("load",S),f.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&i(l.reason);return r().catch(i)})};class H{constructor(){a(this,"db",null);a(this,"dbName","minimalift_v1");a(this,"version",1)}async openDb(){return this.db?this.db:new Promise((r,e)=>{const t=indexedDB.open(this.dbName,this.version);t.onerror=()=>e(t.error),t.onsuccess=()=>{this.db=t.result,r(this.db)},t.onupgradeneeded=s=>{const i=s.target.result;if(i.objectStoreNames.contains("programs")||i.createObjectStore("programs",{keyPath:"programId"}),i.objectStoreNames.contains("days")||i.createObjectStore("days",{keyPath:"dayId"}).createIndex("programId","programId",{unique:!1}),!i.objectStoreNames.contains("sessions")){const n=i.createObjectStore("sessions",{keyPath:"sessionId",autoIncrement:!0});n.createIndex("dayId","dayId",{unique:!1}),n.createIndex("date","startedAt",{unique:!1})}}})}async tx(r,e="readonly"){return(await this.openDb()).transaction([r],e).objectStore(r)}async get(r,e){const t=await this.tx(r);return new Promise((s,i)=>{const n=t.get(e);n.onsuccess=()=>s(n.result),n.onerror=()=>i(n.error)})}async getAll(r){const e=await this.tx(r);return new Promise((t,s)=>{const i=e.getAll();i.onsuccess=()=>t(i.result),i.onerror=()=>s(i.error)})}async put(r,e){const t=await this.tx(r,"readwrite");return new Promise((s,i)=>{const n=t.put(e);n.onsuccess=()=>s(n.result),n.onerror=()=>i(n.error)})}async delete(r,e){const t=await this.tx(r,"readwrite");return new Promise((s,i)=>{const n=t.delete(e);n.onsuccess=()=>s(),n.onerror=()=>i(n.error)})}async indexGetAll(r,e,t){const i=(await this.tx(r)).index(e);return new Promise((n,o)=>{const l=t?i.getAll(t):i.getAll();l.onsuccess=()=>n(l.result),l.onerror=()=>o(l.error)})}async clear(r){const e=await this.tx(r,"readwrite");return new Promise((t,s)=>{const i=e.clear();i.onsuccess=()=>t(),i.onerror=()=>s(i.error)})}}const b=new H,y=class y{constructor(){}static getInstance(){return y.instance||(y.instance=new y),y.instance}async initialize(){const{seedData:r}=await W(async()=>{const{seedData:t}=await import("./seed-data-G69QiYQA.js");return{seedData:t}},[]);await b.get("programs",r.programId)||await this.loadSeedData(r)}async loadSeedData(r){const e={programId:r.programId,title:r.title};await b.put("programs",e);for(const t of r.days)await b.put("days",t);console.log("Seed data loaded successfully")}async getProgram(r){return await b.get("programs",r)}async getDaysForProgram(r){return await b.indexGetAll("days","programId",r)}async getDay(r){return await b.get("days",r)}async getAllDays(){return(await b.getAll("days")).sort((e,t)=>e.order-t.order)}};a(y,"instance");let D=y;const I=D.getInstance();class U extends HTMLElement{constructor(){super();a(this,"days",[]);this.attachShadow({mode:"open"})}async connectedCallback(){this.days=await I.getAllDays(),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelectorAll(".day-card").forEach(e=>{e.addEventListener("click",t=>{const s=t.currentTarget.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("navigate-to-day",{detail:{dayId:s},bubbles:!0,composed:!0}))})}))}renderDayCard(e){const t=[...new Set(e.blocks.map(i=>i.type))],s=e.blocks.reduce((i,n)=>i+n.exercises.length,0);return`
      <div class="day-card" data-day-id="${e.dayId}">
        <div class="day-number">${e.order}</div>
        <div class="day-title">${e.title}</div>
        <div class="day-summary">${s} exercises • ${e.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${t.map(i=>`<span class="block-badge">${i}</span>`).join("")}
        </div>
      </div>
    `}}customElements.define("view-home",U);class q extends HTMLElement{constructor(){super();a(this,"day",null);this.attachShadow({mode:"open"})}async loadDay(e){this.day=await I.getDay(e)||null,this.render()}render(){if(this.shadowRoot){if(!this.day){this.shadowRoot.innerHTML="<p>Loading...</p>";return}this.shadowRoot.innerHTML=`
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
      
      ${this.day.blocks.map(e=>this.renderBlock(e)).join("")}
      
      <button class="start-session-btn" data-day-id="${this.day.dayId}">
        Start Session
      </button>
    `,this.shadowRoot.querySelector(".start-session-btn")?.addEventListener("click",e=>{const s=e.target.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("start-session",{detail:{dayId:s},bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".substitute-chip").forEach(e=>{e.addEventListener("click",t=>{const s=t.target,i=s.dataset.exerciseId,n=s.dataset.substitute;i&&n&&console.log("Switch to substitute:",n,"for exercise:",i)})})}}renderBlock(e){const t=this.getTimerLabel(e.timerType);return`
      <div class="block">
        <div class="block-header">
          <span class="block-title">${this.getBlockTitle(e.type)}</span>
          ${t?`<span class="timer-badge">${t}</span>`:""}
        </div>
        
        ${e.exercises.map(s=>this.renderExercise(s)).join("")}
        
        ${e.notes?`<div class="block-notes">${e.notes}</div>`:""}
      </div>
    `}renderExercise(e){const t=e.sets?`${e.sets} × ${e.reps}`:e.reps;return`
      <div class="exercise">
        <div class="exercise-header">
          <span class="exercise-name">${e.name}</span>
          <span class="exercise-sets-reps">${t}</span>
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
    `}getBlockTitle(e){return{warmup:"Warm Up",strength:"Strength & Condition",swole:"Swole & Flexy",accessory:"Accessories"}[e]||e}getTimerLabel(e){return{interval:"Interval",work_rest:"Work/Rest",circuit:"Circuit",tabata:"Tabata",stopwatch:"Stopwatch",none:""}[e]||""}}customElements.define("view-day",q);class v{constructor(r=100){a(this,"startTime",0);a(this,"pausedTime",0);a(this,"totalPausedDuration",0);a(this,"intervalId",null);a(this,"state","idle");a(this,"callbacks",[]);this.tickInterval=r}start(){this.state!=="running"&&(this.state==="paused"?this.totalPausedDuration+=performance.now()-this.pausedTime:(this.startTime=performance.now(),this.totalPausedDuration=0),this.state="running",this.intervalId=window.setInterval(()=>this.tick(),this.tickInterval),this.notifyStateChange())}pause(){this.state==="running"&&(this.state="paused",this.pausedTime=performance.now(),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.notifyStateChange())}reset(){this.stop(),this.state="idle",this.startTime=0,this.pausedTime=0,this.totalPausedDuration=0,this.notifyStateChange()}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}getState(){return this.state}getElapsedTime(){return this.startTime===0?0:(this.state==="paused"?this.pausedTime:performance.now())-this.startTime-this.totalPausedDuration}addCallback(r){this.callbacks.push(r)}removeCallback(r){const e=this.callbacks.indexOf(r);e>-1&&this.callbacks.splice(e,1)}tick(){const r=this.getElapsedTime(),e=this.getRemainingInCurrentPeriod(),t=this.getCurrentRound(),s=this.getTotalRounds(),i=this.getDuration();if(r>=i-100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:i,remaining:0,round:t,totalRounds:s,state:this.state});return}const n=this.getPreviousRound(r-this.tickInterval);t>n&&n>0&&this.notifyCallbacks({type:"roundComplete",elapsed:r,remaining:e,round:n,totalRounds:s,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:r,remaining:e,round:t,totalRounds:s,state:this.state})}notifyCallbacks(r){this.callbacks.forEach(e=>{try{e(r)}catch(t){console.error("Timer callback error:",t)}})}notifyStateChange(){const r=this.getElapsedTime();this.notifyCallbacks({type:"stateChange",elapsed:r,remaining:this.getRemainingInCurrentPeriod(),round:this.getCurrentRound(),totalRounds:this.getTotalRounds(),state:this.state})}static formatTime(r){const e=r<=100?0:Math.max(0,Math.ceil(r/1e3)),t=Math.floor(e/60),s=e%60;return`${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}static formatTimeWithMs(r){const e=Math.max(0,r),t=Math.floor(e/1e3),s=Math.floor(e%1e3/100),i=Math.floor(t/60),n=t%60;return`${i.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${s}`}}class j extends v{constructor(e,t,s=1){super();a(this,"currentRound",1);this.intervalSec=e,this.totalRounds=t,this.exercisesPerInterval=s}getDuration(){return this.intervalSec*this.totalRounds*1e3}getCurrentRound(){const e=this.getElapsedTime();return Math.min(Math.floor(e/(this.intervalSec*1e3))+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%(this.intervalSec*1e3)}getRemainingInCurrentPeriod(){return this.intervalSec*1e3-this.getTimeInCurrentPeriod()}getExercisesPerInterval(){return this.exercisesPerInterval}getPreviousRound(e){return Math.min(Math.floor(e/(this.intervalSec*1e3))+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=this.getCurrentRound();if(t<=0){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state});return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state})}}class P extends v{constructor(e,t,s){super();a(this,"currentSet",1);a(this,"isWorkPhase",!0);this.workSec=e,this.restSec=t,this.totalSets=s}getDuration(){return(this.workSec+this.restSec)*this.totalSets*1e3}getCurrentRound(){return this.currentSet}getTotalRounds(){return this.totalSets}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3,s=e%t;return s<this.workSec*1e3?s:s-this.workSec*1e3}getRemainingInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3,s=e%t;return s<this.workSec*1e3?this.workSec*1e3-s:this.restSec*1e3-(s-this.workSec*1e3)}isInWorkPhase(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3;return e%t<this.workSec*1e3}getPreviousRound(e){return Math.min(Math.floor(e/((this.workSec+this.restSec)*1e3))+1,this.totalSets)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=Math.min(Math.floor(e/((this.workSec+this.restSec)*1e3))+1,this.totalSets),i=this.isWorkPhase;if(this.isWorkPhase=this.isInWorkPhase(),t<=100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:this.getDuration(),remaining:0,round:this.totalSets,totalRounds:this.totalSets,state:this.state});return}s>this.currentSet?(this.currentSet=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalSets,state:this.state})):i&&!this.isWorkPhase&&this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalSets,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalSets,state:this.state})}}class O extends v{constructor(e,t,s=0){super();a(this,"currentRound",1);a(this,"currentStationIndex",0);this.stations=e,this.totalRounds=t,this.transitionSec=s}getDuration(){const e=this.stations.reduce((s,i)=>s+i.durationSec,0),t=this.transitionSec*Math.max(0,this.stations.length-1);return(e+t)*this.totalRounds*1e3}getCurrentRound(){return this.currentRound}getTotalRounds(){return this.totalRounds}getCurrentStation(){return this.currentStationIndex<this.stations.length?this.stations[this.currentStationIndex]:null}getCurrentStationIndex(){return this.currentStationIndex}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=this.getRoundDuration(),s=e%t;let i=0;for(let n=0;n<this.stations.length;n++){const o=this.stations[n].durationSec*1e3;if(s<i+o)return s-i;if(i+=o,n<this.stations.length-1){const l=this.transitionSec*1e3;if(s<i+l)return s-i;i+=l}}return 0}getRemainingInCurrentPeriod(){const e=this.getCurrentStation();return e?(this.isInTransition()?this.transitionSec*1e3:e.durationSec*1e3)-this.getTimeInCurrentPeriod():0}isInTransition(){const e=this.getElapsedTime(),t=this.getRoundDuration(),s=e%t;let i=0;for(let n=0;n<this.stations.length;n++){if(i+=this.stations[n].durationSec*1e3,s<i)return!1;if(n<this.stations.length-1&&(i+=this.transitionSec*1e3,s<i))return!0}return!1}getRoundDuration(){const e=this.stations.reduce((s,i)=>s+i.durationSec*1e3,0),t=this.transitionSec*Math.max(0,this.stations.length-1)*1e3;return e+t}updateCurrentPosition(){const e=this.getElapsedTime(),t=this.getRoundDuration();this.currentRound=Math.min(Math.floor(e/t)+1,this.totalRounds);const s=e%t;let i=0;for(let n=0;n<this.stations.length;n++){if(i+=this.stations[n].durationSec*1e3,s<i){this.currentStationIndex=n;return}if(n<this.stations.length-1&&(i+=this.transitionSec*1e3,s<i)){this.currentStationIndex=n;return}}this.currentStationIndex=this.stations.length-1}getPreviousRound(e){const t=this.getRoundDuration();return Math.min(Math.floor(e/t)+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e;if(t<=0){this.state="completed",this.stop();return}const s=this.currentRound;this.updateCurrentPosition(),this.currentRound>s&&this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:this.currentRound,totalRounds:this.totalRounds,state:this.state})}}class _ extends v{constructor(e,t,s){super();a(this,"currentRound",1);this.highIntensitySec=e,this.lowIntensitySec=t,this.totalRounds=s}getDuration(){return(this.highIntensitySec+this.lowIntensitySec)*this.totalRounds*1e3}getCurrentRound(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(e/t)+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=e%t;return s<this.highIntensitySec*1e3?s:s-this.highIntensitySec*1e3}getRemainingInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=e%t;return s<this.highIntensitySec*1e3?this.highIntensitySec*1e3-s:this.lowIntensitySec*1e3-(s-this.highIntensitySec*1e3)}isHighIntensity(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return e%t<this.highIntensitySec*1e3}getPreviousRound(e){const t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(e/t)+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=this.getCurrentRound();if(t<=0){this.state="completed",this.stop();return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state})}}class G extends v{constructor(){super();a(this,"laps",[])}getDuration(){return Number.MAX_SAFE_INTEGER}getCurrentRound(){return this.laps.length+1}getTotalRounds(){return 0}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=this.laps.length>0?this.laps[this.laps.length-1]:0;return e-t}getRemainingInCurrentPeriod(){return 0}addLap(){const e=this.getElapsedTime();this.laps.push(e),this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:0,round:this.laps.length,totalRounds:0,state:this.state})}getLaps(){return[...this.laps]}getLapTime(e){if(e<0||e>=this.laps.length)return 0;const t=this.laps[e],s=e>0?this.laps[e-1]:0;return t-s}reset(){super.reset(),this.laps=[]}getPreviousRound(e){return this.laps.length}tick(){const e=this.getElapsedTime();this.notifyCallbacks({type:"tick",elapsed:e,remaining:0,round:this.laps.length+1,totalRounds:0,state:this.state})}}class k{static createTimer(r,e){if(!e&&r!=="stopwatch")return null;switch(r){case"interval":if(e?.intervalSec&&e?.rounds)return new j(e.intervalSec,e.rounds,e.exercisesPerInterval||1);break;case"work_rest":if(e?.workSec&&e?.restSec&&e?.rounds)return new P(e.workSec,e.restSec,e.rounds);if(e?.restSec&&e?.rounds)return new P(0,e.restSec,e.rounds);break;case"circuit":if(e?.stations&&e.stations.length>0&&e?.rounds)return new O(e.stations,e.rounds,e.transitionSec||0);break;case"tabata":if(e?.highIntensitySec&&e?.lowIntensitySec&&e?.rounds)return new _(e.highIntensitySec,e.lowIntensitySec,e.rounds);break;case"stopwatch":return new G;case"none":default:return null}return null}static createRestTimer(r,e=1){return new P(0,r,e)}}class V{constructor(){a(this,"wakeLock",null);a(this,"supported","wakeLock"in navigator)}async acquire(){if(!this.supported)return console.warn("Wake Lock API not supported"),!1;try{return this.wakeLock||(this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock?.addEventListener("release",()=>{console.log("Wake lock released"),this.wakeLock=null}),console.log("Wake lock acquired")),!0}catch(r){return console.error("Failed to acquire wake lock:",r),!1}}async release(){if(this.wakeLock)try{await this.wakeLock.release(),this.wakeLock=null,console.log("Wake lock released manually")}catch(r){console.error("Failed to release wake lock:",r)}}isActive(){return this.wakeLock!==null&&!this.wakeLock.released}isSupportedApi(){return this.supported}async reacquire(){return this.wakeLock&&this.wakeLock.released?(this.wakeLock=null,await this.acquire()):this.isActive()}}const w=new V;class Y{constructor(){a(this,"backgroundStartTime",null);a(this,"callbacks",[]);this.setupVisibilityHandlers()}setupVisibilityHandlers(){document.addEventListener("visibilitychange",()=>{document.hidden?this.handleBackground():this.handleForeground()}),window.addEventListener("blur",()=>{document.hidden||this.handleBackground()}),window.addEventListener("focus",()=>{document.hidden||this.handleForeground()})}handleBackground(){console.log("App went to background"),this.backgroundStartTime=performance.now(),this.maybeShowNotification()}handleForeground(){if(this.backgroundStartTime!==null){const r=performance.now()-this.backgroundStartTime;console.log(`App returned to foreground after ${r}ms`),this.backgroundStartTime=null,this.callbacks.forEach(e=>{try{e()}catch(t){console.error("Background timer callback error:",t)}})}}async maybeShowNotification(){if("Notification"in window&&Notification.permission==="granted"&&this.callbacks.length>0)try{const e=new Notification("Minimalift Workout Active",{body:"Your workout timer is still running in the background.",icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",tag:"workout-active",requireInteraction:!1,silent:!0});setTimeout(()=>e.close(),5e3)}catch(e){console.error("Failed to show notification:",e)}}addForegroundCallback(r){this.callbacks.push(r)}removeForegroundCallback(r){const e=this.callbacks.indexOf(r);e>-1&&this.callbacks.splice(e,1)}getTimeInBackground(){return this.backgroundStartTime!==null?performance.now()-this.backgroundStartTime:0}isInBackground(){return document.hidden}async requestNotificationPermission(){if(!("Notification"in window))return console.warn("Notifications not supported"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return!1;try{return await Notification.requestPermission()==="granted"}catch(r){return console.error("Failed to request notification permission:",r),!1}}}const C=new Y;class X{constructor(){a(this,"audioContext",null);a(this,"enableHaptic",!0);a(this,"enableAudio",!0);document.addEventListener("touchstart",this.initAudioContext.bind(this),{once:!0}),document.addEventListener("click",this.initAudioContext.bind(this),{once:!0})}initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log("Audio context initialized")}catch(r){console.warn("Audio context not supported:",r)}}setHapticEnabled(r){this.enableHaptic=r}setAudioEnabled(r){this.enableAudio=r}isHapticSupported(){return"vibrate"in navigator}isAudioSupported(){return this.audioContext!==null}vibrate(r){if(!(!this.enableHaptic||!this.isHapticSupported()))try{navigator.vibrate(r)}catch(e){console.warn("Vibration failed:",e)}}beep(r=800,e=200,t=.1){if(!(!this.enableAudio||!this.audioContext))try{const s=this.audioContext.createOscillator(),i=this.audioContext.createGain();s.connect(i),i.connect(this.audioContext.destination),s.frequency.value=r,s.type="sine",i.gain.setValueAtTime(t,this.audioContext.currentTime),i.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e/1e3),s.start(),s.stop(this.audioContext.currentTime+e/1e3)}catch(s){console.warn("Audio playback failed:",s)}}timerStart(){this.vibrate(100),this.beep(600,150)}timerPause(){this.vibrate([50,50,50]),this.beep(400,100)}roundComplete(){this.vibrate([100,50,100]),this.beep(800,200)}exerciseComplete(){this.vibrate([150,100,150,100,150]),this.playSuccess()}sessionComplete(){this.vibrate([200,100,200,100,200,100,300]),this.playSuccessChord()}setComplete(){this.vibrate([100,50,100]),this.beep(700,150)}restStart(){this.vibrate(80),this.beep(500,150)}restComplete(){this.vibrate([50,30,50]),this.beep(800,100)}workPeriodStart(){this.vibrate([50,30,50]),this.beep(1e3,100)}restPeriodStart(){this.vibrate(80),this.beep(500,150)}countdownWarning(){this.vibrate(50),this.beep(700,100)}playSuccess(){if(!this.audioContext)return;[523,659,784].forEach((e,t)=>{setTimeout(()=>{this.beep(e,200,.08)},t*100)})}playSuccessChord(){if(!this.audioContext)return;[523,659,784].forEach(e=>{this.beep(e,500,.05)})}testFeedback(){console.log("Testing feedback..."),setTimeout(()=>this.timerStart(),0),setTimeout(()=>this.workPeriodStart(),1e3),setTimeout(()=>this.countdownWarning(),2e3),setTimeout(()=>this.restPeriodStart(),3e3),setTimeout(()=>this.roundComplete(),4e3),setTimeout(()=>this.exerciseComplete(),5e3)}}const d=new X;class K extends HTMLElement{constructor(){super();a(this,"currentDay",null);a(this,"currentBlockIndex",0);a(this,"currentExerciseIndex",0);a(this,"currentSetIndex",0);a(this,"currentTimer",null);a(this,"sessionStartTime",0);a(this,"foregroundCallback",null);a(this,"lastPhase",null);a(this,"isRestingBetweenSets",!1);this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners(),this.setupBackgroundHandling()}disconnectedCallback(){this.cleanup()}setDay(e){this.currentDay=e,this.currentBlockIndex=0,this.currentExerciseIndex=0,this.currentSetIndex=0,this.isRestingBetweenSets=!1,console.log("Day loaded:",e),console.log("Blocks:",e.blocks),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
      `;const e=this.getCurrentBlock();if(!e)return this.renderSessionComplete();if(e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){if(this.currentExerciseIndex>=e.exercises.length)return this.renderSessionComplete()}else if(!this.getCurrentExercise())return this.renderSessionComplete();return`
      ${this.renderHeader()}
      <div class="session-main">
        ${this.renderCurrentExercises()}
        ${this.renderTimer()}
        ${this.renderControls()}
        ${this.renderNextUp()}
      </div>
    `}renderHeader(){if(!this.currentDay)return"";const e=this.currentDay.blocks.length,t=this.currentDay.blocks.reduce((i,n)=>i+n.exercises.length,0),s=this.currentBlockIndex*(this.currentDay.blocks[0]?.exercises.length||0)+this.currentExerciseIndex;return`
      <div class="session-header">
        <div class="session-info">
          <div class="session-title">${this.currentDay.title}</div>
          <div class="session-progress">
            Block ${this.currentBlockIndex+1} of ${e} • 
            Exercise ${s+1} of ${t}
          </div>
        </div>
        <button class="cancel-session-btn" id="cancel-session">Cancel</button>
      </div>
    `}renderCurrentExercises(){const e=this.getCurrentBlock();if(!e)return"";if(console.log("Block timer type:",e.timerType),console.log("Block timer config:",e.timerConfig),console.log("Exercises per interval:",e.timerConfig?.exercisesPerInterval),e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){const s=e.timerConfig.exercisesPerInterval,i=Math.floor(this.currentExerciseIndex/s)*s,n=e.exercises.slice(i,i+s);return console.log("Showing compound exercises:",n.map(o=>o.name)),`
        <div class="current-exercise">
          ${n.map(o=>`
            <div class="exercise-group">
              <div class="exercise-name">${o.name}</div>
              <div class="exercise-details">${this.formatExerciseDetails(o,e)}</div>
            </div>
          `).join("")}
        </div>
      `}const t=this.getCurrentExercise();return t?`
      <div class="current-exercise">
        <div class="exercise-name">${t.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(t,e)}</div>
      </div>
    `:""}renderTimer(){const e=this.getCurrentExercise(),t=this.getCurrentBlock(),s=t?.timerType&&t.timerType!=="none";if(t?.timerType==="interval"&&t.timerConfig?.exercisesPerInterval&&t.timerConfig.exercisesPerInterval>1){const m=(t.timerConfig.intervalSec||120)/60,p=t.timerConfig.exercisesPerInterval;if(this.currentTimer){const f=this.currentTimer.getRemainingInCurrentPeriod(),S=this.currentTimer.getCurrentRound(),T=this.currentTimer.getTotalRounds(),R=v.formatTime(f),E=this.getTimerProgress();return`
          <div class="timer-section">
            <div class="timer-display">${R}</div>
            <div class="timer-phase">Interval ${S} of ${T}</div>
            <div class="timer-progress">Complete all ${p} exercises • Every ${m} min</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${E*100}%"></div>
            </div>
          </div>
        `}else return`
          <div class="timer-section">
            <div class="timer-display">--:--</div>
            <div class="timer-phase">Ready to start</div>
            <div class="timer-progress">Every ${m} min • ${p} exercises per interval</div>
          </div>
        `}if(!s&&e){const m=e.sets||1,p=this.currentSetIndex+1;if(this.isRestingBetweenSets&&this.currentTimer){const f=this.currentTimer.getRemainingInCurrentPeriod(),S=v.formatTime(f),T=this.currentTimer.getElapsedTime(),R=this.currentTimer.getDuration(),E=Math.min(T/R,1);return`
          <div class="timer-section">
            <div class="timer-display">${S}</div>
            <div class="timer-phase">Rest after Set ${p-1}</div>
            <div class="timer-progress">Set ${p}/${m} next</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${E*100}%"></div>
            </div>
          </div>
        `}return`
        <div class="timer-section">
          <div class="timer-display">Set ${p}/${m}</div>
          <div class="timer-phase">${e.reps} reps</div>
          ${e.restSec?`<div class="timer-progress">${e.restSec}s rest after set</div>`:""}
        </div>
      `}if(!this.currentTimer)return`
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;const i=this.currentTimer.getRemainingInCurrentPeriod(),n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds(),l=v.formatTime(i),h=this.getTimerProgress(),u=this.getTimerPhase();return`
      <div class="timer-section">
        <div class="timer-display">${l}</div>
        <div class="timer-phase">${u}</div>
        <div class="timer-progress">Round ${n} of ${o}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${h*100}%"></div>
        </div>
      </div>
    `}renderControls(){const e=this.getCurrentBlock();if(e?.timerType&&e.timerType!=="none"){const h=this.currentTimer?.getState()||"idle",u=h==="completed",m=e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1;let p="";return!this.currentTimer||h==="idle"?p='<button class="control-btn primary" id="start-btn">Start Timer</button>':h==="running"?p='<button class="control-btn warning" id="pause-btn">Pause</button>':h==="paused"?p='<button class="control-btn primary" id="resume-btn">Resume</button>':u&&(p=`<button class="control-btn primary" id="next-btn">${m?"Next Round":"Next Exercise"}</button>`),`
        <div class="session-controls">
          ${p}
          <button class="control-btn secondary" id="reset-btn" ${!this.currentTimer||h==="idle"?"disabled":""}>Reset</button>
          <button class="control-btn secondary" id="skip-btn">Skip</button>
        </div>
      `}const s=this.getCurrentExercise();if(!s)return'<div class="session-controls"><button class="control-btn secondary" id="skip-btn">Skip</button></div>';const i=s.sets||1,n=this.isRestingBetweenSets,o=this.currentTimer?.getState()||"idle";if(n&&this.currentTimer){if(o==="running")return`
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
          Complete Set ${this.currentSetIndex+1}/${i}
        </button>
        <button class="control-btn secondary" id="skip-btn">Skip Exercise</button>
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
        <div class="complete-stats">Duration: ${v.formatTime(e)}</div>
        <div class="session-controls">
          <button class="control-btn primary" id="finish-btn">Finish Session</button>
        </div>
      </div>
    `}getCurrentBlock(){return!this.currentDay||this.currentBlockIndex>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex]}getCurrentExercise(){const e=this.getCurrentBlock();return!e||this.currentExerciseIndex>=e.exercises.length?null:e.exercises[this.currentExerciseIndex]}getNextExercise(){const e=this.getCurrentBlock();if(!e)return null;let t=1;return e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&(t=e.timerConfig.exercisesPerInterval),this.currentExerciseIndex+t<e.exercises.length?e.exercises[this.currentExerciseIndex+t]:!this.currentDay||this.currentBlockIndex+1>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex+1].exercises[0]||null}formatExerciseDetails(e,t){const s=[],i=t.timerType==="interval";return e.sets&&s.push(`${e.sets} sets`),e.reps&&s.push(`${e.reps} reps`),!i&&e.restSec&&s.push(`${e.restSec}s rest`),s.join(" • ")}getTimerProgress(){if(!this.currentTimer)return 0;const e=this.currentTimer.getElapsedTime(),t=this.currentTimer.getDuration();return Math.min(e/t,1)}getTimerPhase(){if(!this.currentTimer)return"Ready";const e=this.getCurrentBlock();if(!(e?.timerType&&e.timerType!=="none"))return"Timer Running";if(this.currentTimer&&this.currentTimer.getTotalRounds()>1){const s=this.currentTimer.getCurrentPhase?.();if(s==="work")return"Work Period";if(s==="rest")return"Rest Period"}return"Timer Running"}createTimerForCurrentBlock(){const e=this.getCurrentBlock();if(!e?.timerType||e.timerType==="none")return null;if(e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){const t=e.timerConfig.exercisesPerInterval,s=Math.floor(this.currentExerciseIndex/t),n=Math.ceil(e.exercises.length/t)-s;return k.createTimer(e.timerType,{...e.timerConfig,rounds:n})}return k.createTimer(e.timerType,e.timerConfig)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.addEventListener("click",e=>{const t=e.target;t.id==="start-btn"?this.startTimer():t.id==="pause-btn"?this.pauseTimer():t.id==="resume-btn"?this.resumeTimer():t.id==="reset-btn"?this.resetTimer():t.id==="skip-btn"?this.skipExercise():t.id==="complete-exercise-btn"?this.completeExercise():t.id==="complete-set-btn"?this.completeSet():t.id==="skip-rest-btn"?this.skipRest():t.id==="next-set-btn"?this.startNextSet():t.id==="next-btn"?this.nextExercise():t.id==="finish-btn"?this.finishSession():t.id==="cancel-session"&&this.cancelSession()})}async startTimer(){this.sessionStartTime||(this.sessionStartTime=performance.now(),await C.requestNotificationPermission()),await w.acquire(),this.currentTimer=this.createTimerForCurrentBlock(),this.currentTimer&&(this.currentTimer.addCallback(e=>{this.handleTimerEvent(e)}),this.currentTimer.start(),d.timerStart(),this.render())}pauseTimer(){this.currentTimer?.pause(),d.timerPause(),this.render()}resumeTimer(){this.currentTimer?.start(),d.timerStart(),this.render()}resetTimer(){this.currentTimer?.reset(),this.render()}skipExercise(){const e=this.getCurrentBlock();e?.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1?this.skipIntervalGroup():this.nextExercise()}skipIntervalGroup(){const e=this.getCurrentBlock();if(!e)return;this.currentTimer?.stop(),this.currentTimer=null;const t=e.timerConfig?.exercisesPerInterval||1;this.currentExerciseIndex+t<e.exercises.length?this.currentExerciseIndex+=t:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render()}completeExercise(){this.nextExercise()}async completeSet(){const e=this.getCurrentExercise();if(!e)return;const t=e.sets||1,s=this.currentSetIndex>=t-1;d.setComplete(),s?this.nextExercise():(e.restSec&&e.restSec>0?(this.currentSetIndex++,this.isRestingBetweenSets=!0,this.currentTimer=k.createRestTimer(e.restSec,1),this.currentTimer.addCallback(i=>{i.type==="complete"?this.handleRestComplete():i.type==="tick"&&this.updateTimerDisplay()}),this.currentTimer.start(),d.restStart()):this.currentSetIndex++,this.render())}skipRest(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),this.handleRestComplete()}startNextSet(){this.handleRestComplete()}handleRestComplete(){this.isRestingBetweenSets=!1,this.currentTimer?.stop(),this.currentTimer=null,d.restComplete(),this.render()}nextExercise(){const e=this.getCurrentBlock();if(!e)return;d.exerciseComplete(),this.currentTimer?.stop(),this.currentTimer=null,this.currentSetIndex=0,this.isRestingBetweenSets=!1;let t=1;e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&(t=e.timerConfig.exercisesPerInterval),this.currentExerciseIndex+t<e.exercises.length?this.currentExerciseIndex+=t:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render()}async finishSession(){d.sessionComplete(),await this.cleanup(),this.showSessionSaveDialog()}showSessionSaveDialog(){const e=this.sessionStartTime?Math.round((performance.now()-this.sessionStartTime)/1e3):0,t=Math.floor(e/60),s=e%60,i=`${t}:${s.toString().padStart(2,"0")}`;if(!this.shadowRoot)return;const n=`
      <div class="session-save-overlay">
        <div class="session-save-dialog">
          <h3>Session Complete!</h3>
          <p>Duration: ${i}</p>
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
    `,o=document.createElement("div");o.innerHTML=n,this.shadowRoot.appendChild(o);const l=this.shadowRoot.querySelector("#discard-session"),h=this.shadowRoot.querySelector("#save-session");l?.addEventListener("click",()=>{this.discardSession()}),h?.addEventListener("click",()=>{this.saveSession()})}discardSession(){console.log("Session discarded (not saved)"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1}}))}saveSession(){console.log("Session saved"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!0}}))}async cancelSession(){confirm("Are you sure you want to cancel this session? Your progress will not be saved.")&&(console.log("Session cancelled by user"),await this.cleanup(),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1,cancelled:!0}})))}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&w.reacquire(),this.updateTimerDisplay()},C.addForegroundCallback(this.foregroundCallback)}async cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),await w.release(),this.foregroundCallback&&(C.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}handleTimerEvent(e){e.type==="tick"?(this.updateTimerDisplay(),this.checkForPhaseChange(),this.checkForCountdownWarning(e.remaining)):e.type==="complete"?(d.exerciseComplete(),this.render()):e.type==="roundComplete"&&d.roundComplete()}checkForPhaseChange(){const e=this.getTimerPhase();this.lastPhase&&this.lastPhase!==e&&(e==="Work Period"?d.workPeriodStart():e==="Rest Period"&&d.restPeriodStart()),this.lastPhase=e}checkForCountdownWarning(e){const t=Math.ceil(e/1e3);if(t<=3&&t>0){const s=this.lastWarnTime||0,i=performance.now();i-s>900&&(d.countdownWarning(),this.lastWarnTime=i)}}updateTimerDisplay(){if(!this.shadowRoot||!this.currentTimer)return;const e=this.shadowRoot.querySelector(".timer-display"),t=this.shadowRoot.querySelector(".progress-fill"),s=this.shadowRoot.querySelector(".timer-progress"),i=this.shadowRoot.querySelector(".timer-phase");if(e){const n=this.currentTimer.getRemainingInCurrentPeriod();e.textContent=v.formatTime(n)}if(t){const n=this.getTimerProgress();t.style.width=`${n*100}%`}if(s){const n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds();s.textContent=`Round ${n} of ${o}`}i&&(i.textContent=this.getTimerPhase())}}customElements.define("view-session",K);class F extends HTMLElement{constructor(){super();a(this,"shadow");this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}disconnectedCallback(){this.cleanup()}setupEventListeners(){}cleanup(){}setHTML(e){this.shadow&&(this.shadow.innerHTML=e)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}$(e){return this.shadow?.querySelector(e)??null}$$(e){return this.shadow?.querySelectorAll(e)??[]}}class J{constructor(){a(this,"day",null);a(this,"blockIndex",0);a(this,"exerciseIndex",0);a(this,"setIndex",0);a(this,"isRestingBetweenSets",!1);a(this,"sessionStartTime",0)}initialize(r){this.day=r,this.blockIndex=0,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,this.sessionStartTime=Date.now()}getDay(){return this.day}getCurrentBlock(){return!this.day||this.blockIndex>=this.day.blocks.length?null:this.day.blocks[this.blockIndex]}getCurrentExercise(){const r=this.getCurrentBlock();return!r||this.exerciseIndex>=r.exercises.length?null:r.exercises[this.exerciseIndex]}getNextExercise(){const r=this.getCurrentBlock();return r?this.exerciseIndex+1<r.exercises.length?r.exercises[this.exerciseIndex+1]:this.day&&this.blockIndex+1<this.day.blocks.length&&this.day.blocks[this.blockIndex+1].exercises[0]||null:null}getCurrentIntervalExercises(){const r=this.getCurrentBlock();if(!r||r.timerType!=="interval")return[];const e=r.timerConfig?.exercisesPerInterval||1,t=Math.floor(this.exerciseIndex/e)*e;return r.exercises.slice(t,t+e)}nextSet(){const r=this.getCurrentExercise();return!r||!r.sets?!1:this.setIndex+1<r.sets?(this.setIndex++,this.isRestingBetweenSets=!1,!0):!1}nextExercise(){const r=this.getCurrentBlock();return r?(this.setIndex=0,this.isRestingBetweenSets=!1,this.exerciseIndex+1<r.exercises.length?(this.exerciseIndex++,!0):this.nextBlock()):!1}skipIntervalGroup(){const r=this.getCurrentBlock();if(!r||r.timerType!=="interval")return this.nextExercise();const e=r.timerConfig?.exercisesPerInterval||1,s=(Math.floor(this.exerciseIndex/e)+1)*e;return s<r.exercises.length?(this.exerciseIndex=s,this.setIndex=0,this.isRestingBetweenSets=!1,!0):this.nextBlock()}nextBlock(){return!this.day||this.blockIndex+1>=this.day.blocks.length?!1:(this.blockIndex++,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,!0)}isComplete(){return this.day?this.blockIndex>=this.day.blocks.length:!0}getProgress(){if(!this.day)return{current:0,total:0,percentage:0};const r=this.day.blocks.reduce((s,i)=>s+i.exercises.length,0),e=this.day.blocks.slice(0,this.blockIndex).reduce((s,i)=>s+i.exercises.length,0)+this.exerciseIndex,t=r>0?Math.round(e/r*100):0;return{current:e,total:r,percentage:t}}getIndices(){return{blockIndex:this.blockIndex,exerciseIndex:this.exerciseIndex,setIndex:this.setIndex}}setResting(r){this.isRestingBetweenSets=r}isResting(){return this.isRestingBetweenSets}getCurrentSetNumber(){return this.setIndex+1}getSessionDuration(){return Date.now()-this.sessionStartTime}reset(){this.blockIndex=0,this.exerciseIndex=0,this.setIndex=0,this.isRestingBetweenSets=!1,this.sessionStartTime=Date.now()}}class g{static renderHeader(r,e){return r?`
      <div class="session-header">
        <div class="session-title">${r.title}</div>
        <div class="session-progress">
          <div class="progress-bar" style="width: ${e.percentage}%"></div>
        </div>
      </div>
    `:""}static renderCurrentExercises(r,e,t){if(!r.length||!e)return"";if(r.length>1)return`
        <div class="current-exercise">
          ${r.map(n=>`
            <div class="exercise-group">
              <div class="exercise-name">${n.name}</div>
              <div class="exercise-details">${this.formatExerciseDetails(n,e)}</div>
            </div>
          `).join("")}
        </div>
      `;const s=r[0],i=t&&s.sets?`<div class="set-counter">Set ${t} of ${s.sets}</div>`:"";return`
      <div class="current-exercise">
        <div class="exercise-name">${s.name}</div>
        <div class="exercise-details">${this.formatExerciseDetails(s,e)}</div>
        ${i}
      </div>
    `}static renderTimerInfo(r){if(!r||!r.timerConfig)return"";const e=r.timerConfig;let t="";if(r.timerType==="interval"&&e.intervalSec){const s=e.intervalSec>=60?Math.floor(e.intervalSec/60):0,i=s>0?`${s} min`:`${e.intervalSec}s`,n=e.exercisesPerInterval||1,o=n>1?`${n} exercises`:"1 exercise";t=`Every ${i} • ${o} per interval`}else r.timerType==="work_rest"?(t=e.workSec?`Work: ${e.workSec}s`:"",e.restSec&&(t+=t?` • Rest: ${e.restSec}s`:`Rest: ${e.restSec}s`)):r.timerType==="circuit"&&e.stations&&(t=`${e.stations.length} stations`);return t?`<div class="timer-info">${t}</div>`:""}static renderControls(r,e,t,s,i,n){const o=[];if(s){if(r)e?o.push(`
          <button class="control-btn primary" data-action="resume">
            Resume
          </button>
        `):o.push(`
          <button class="control-btn secondary" data-action="pause">
            Pause
          </button>
        `);else{const l=i?"Start Round":"Start Exercise";o.push(`
          <button class="control-btn primary" data-action="start">
            ${l}
          </button>
        `)}(r||e)&&o.push(`
          <button class="control-btn secondary" data-action="reset">
            Reset
          </button>
        `)}else t?o.push(`
        <button class="control-btn primary" data-action="skip-rest">
          Skip Rest
        </button>
      `):o.push(`
        <button class="control-btn primary" data-action="complete-set">
          Complete Set
        </button>
      `);return i&&n?o.push(`
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
    `}static renderNextUp(r){return r?`
      <div class="next-up">
        <div class="next-label">Next Up</div>
        <div class="next-exercise">${r.name}</div>
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
    `}static renderRestTimer(r){return`
      <div class="rest-timer">
        <div class="rest-label">REST</div>
        <div class="rest-countdown">${r}</div>
        <button class="control-btn secondary" data-action="skip-rest">
          Skip Rest
        </button>
      </div>
    `}static formatExerciseDetails(r,e){const t=[];return e.timerType==="interval"&&e.timerConfig?.rounds?t.push(`${e.timerConfig.rounds} rounds × ${r.reps||"?"} reps`):r.sets&&r.reps?t.push(`${r.sets} × ${r.reps}`):r.reps&&t.push(r.reps),r.cues&&t.push(`<span class="exercise-cues">${r.cues}</span>`),t.join(" • ")}static renderContainer(r){return`
      <div class="session-container">
        ${r.header||""}
        <div class="session-main">
          ${r.exercises||""}
          ${r.timerInfo||""}
          ${r.timer||'<div id="timer-display"></div>'}
          ${r.controls||""}
          ${r.nextUp||""}
        </div>
      </div>
    `}static renderEmpty(){return`
      <div class="session-empty">
        <p>No workout loaded</p>
      </div>
    `}}class Q extends F{constructor(){super(...arguments);a(this,"state",new J);a(this,"currentTimer",null);a(this,"foregroundCallback",null);a(this,"timerDisplay",null)}render(){this.setHTML(`
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
    `),this.updateContent()}setDay(e){this.state.initialize(e),this.updateContent()}updateContent(){const e=this.$("#container");if(!e)return;const t=this.state.getDay();if(!t){e.innerHTML=g.renderEmpty();return}if(this.state.isComplete()){e.innerHTML=g.renderSessionComplete();return}const s=this.state.getCurrentBlock(),n=s?.timerType==="interval"&&s.timerConfig?.exercisesPerInterval&&s.timerConfig.exercisesPerInterval>1?this.state.getCurrentIntervalExercises():this.state.getCurrentExercise()?[this.state.getCurrentExercise()]:[],o=this.state.getNextExercise(),l=this.state.getProgress();if(this.state.isResting()&&this.currentTimer){const u=this.currentTimer.lastEvent;if(u){const m=Math.ceil(u.remaining/1e3);e.innerHTML=g.renderContainer({header:g.renderHeader(t,l),exercises:g.renderCurrentExercises(n,s,this.state.getCurrentSetNumber()),timer:g.renderRestTimer(m),nextUp:g.renderNextUp(o)});return}}const h={header:g.renderHeader(t,l),exercises:g.renderCurrentExercises(n,s,this.state.getCurrentSetNumber()),timerInfo:g.renderTimerInfo(s),timer:'<timer-display id="timer-display"></timer-display>',controls:this.renderControlsForState(),nextUp:g.renderNextUp(o)};if(e.innerHTML=g.renderContainer(h),this.timerDisplay=this.$("#timer-display"),this.timerDisplay&&this.currentTimer){const u=this.currentTimer.lastEvent;u&&this.timerDisplay.updateFromEvent(u)}}renderControlsForState(){const e=this.state.getCurrentBlock(),t=e?.timerType&&e.timerType!=="none",s=e?.timerType==="interval",i=e?.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1,n=this.currentTimer?.getState()||"idle",o=n==="running",l=n==="paused",h=this.state.isResting();return g.renderControls(o,l,h,!!t,!!s,!!i)}setupEventListeners(){this.shadow.addEventListener("click",e=>{switch(e.target.dataset.action){case"start":this.startTimer();break;case"pause":this.pauseTimer();break;case"resume":this.resumeTimer();break;case"reset":this.resetTimer();break;case"skip":case"skip-group":this.skipExercise();break;case"complete-set":this.completeSet();break;case"skip-rest":this.skipRest();break;case"finish":this.finishSession();break;case"save":this.saveSession();break;case"discard":this.discardSession();break}}),this.setupBackgroundHandling()}async startTimer(){await w.acquire(),this.state.getCurrentBlock()&&(this.currentTimer=this.createTimerForCurrentBlock(),this.currentTimer&&(this.currentTimer.addCallback(t=>{this.handleTimerEvent(t)}),this.currentTimer.start(),d.timerStart(),this.updateContent()))}pauseTimer(){this.currentTimer?.pause(),d.timerPause(),this.updateContent()}resumeTimer(){this.currentTimer?.start(),d.timerStart(),this.updateContent()}resetTimer(){this.currentTimer?.reset(),this.updateContent()}skipExercise(){const e=this.state.getCurrentBlock();e?.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1?this.state.skipIntervalGroup():this.state.nextExercise(),this.currentTimer?.stop(),this.currentTimer=null,this.updateContent()}async completeSet(){const e=this.state.getCurrentExercise();if(!e)return;d.setComplete(),this.state.nextSet()?e.restSec&&e.restSec>0?(this.state.setResting(!0),this.currentTimer=k.createRestTimer(e.restSec,1),this.currentTimer.addCallback(s=>{s.type==="complete"?this.handleRestComplete():s.type==="tick"&&(this.currentTimer.lastEvent=s,this.updateContent())}),this.currentTimer.start(),d.restStart(),this.updateContent()):this.updateContent():(this.state.nextExercise(),this.updateContent())}skipRest(){this.currentTimer?.stop(),this.currentTimer=null,this.handleRestComplete()}handleRestComplete(){this.state.setResting(!1),this.currentTimer=null,d.restComplete(),this.updateContent()}createTimerForCurrentBlock(){const e=this.state.getCurrentBlock();if(!e?.timerType||e.timerType==="none")return null;if(e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){const t=this.state.getIndices(),s=e.timerConfig.exercisesPerInterval,i=Math.floor(t.exerciseIndex/s),o=Math.ceil(e.exercises.length/s)-i;return k.createTimer(e.timerType,{...e.timerConfig,rounds:o})}return k.createTimer(e.timerType,e.timerConfig)}handleTimerEvent(e){this.timerDisplay&&this.timerDisplay.updateFromEvent(e),this.currentTimer.lastEvent=e,e.type==="tick"?this.checkForCountdownWarning(e.remaining):e.type==="complete"?(d.exerciseComplete(),this.updateContent()):e.type==="roundComplete"&&d.roundComplete()}checkForCountdownWarning(e){const t=Math.ceil(e/1e3);if(t<=3&&t>0){const s=this.lastWarnTime||0,i=performance.now();i-s>900&&(d.countdownWarning(),this.lastWarnTime=i)}}async finishSession(){d.sessionComplete(),await this.cleanup(),this.showSaveDialog()}showSaveDialog(){const e=this.$("#container");if(e){const t=g.renderSaveDialog(),s=document.createElement("div");s.innerHTML=t,e.appendChild(s.firstElementChild)}}saveSession(){console.log("Session saved"),this.emit("session-complete",{day:this.state.getDay(),duration:this.state.getSessionDuration(),saved:!0})}discardSession(){console.log("Session discarded"),this.emit("session-complete",{day:this.state.getDay(),duration:this.state.getSessionDuration(),saved:!1})}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&w.reacquire(),this.updateContent()},C.addForegroundCallback(this.foregroundCallback)}cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),w.release(),this.foregroundCallback&&(C.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}}customElements.define("view-session-refactored",Q);class Z{constructor(){a(this,"registration",null);a(this,"showUpdateCallback",null);a(this,"updateNotificationShown",!1);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setupUpdateDetection()):this.setupUpdateDetection()}async setupUpdateDetection(){if(!("serviceWorker"in navigator)){console.log("Service workers not supported");return}try{this.registration=await navigator.serviceWorker.register("/sw.js"),console.log("ServiceWorker registered:",this.registration),console.log("Checking for updates on startup..."),await this.checkForUpdates(),console.log("Checking for waiting service worker..."),this.checkForWaitingWorker(),setTimeout(()=>{console.log("Double-checking for waiting service worker after delay..."),this.checkForWaitingWorker()},1e3),this.registration.installing&&this.trackInstallingWorker(this.registration.installing),setInterval(()=>{document.visibilityState==="visible"&&(console.log("Periodic update check (30s interval)"),this.checkForUpdates())},3e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(console.log("App came to foreground, checking for updates"),this.checkForUpdates())}),this.registration.addEventListener("updatefound",()=>{console.log("Update found, installing new version...");const r=this.registration?.installing;r&&this.trackInstallingWorker(r)}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("New service worker took control, reloading page"),window.location.reload()})}catch(r){console.error("ServiceWorker registration failed:",r)}}async checkForUpdates(){if(!this.registration){console.log("No registration available for update check");return}try{console.log("Calling registration.update()..."),await this.registration.update(),console.log("Update check completed"),this.registration.waiting&&(console.log("Found waiting worker after update check"),this.showUpdateAvailable())}catch(r){console.error("Failed to check for updates:",r)}}checkForWaitingWorker(){this.registration&&this.registration.waiting&&(console.log("Found waiting service worker on startup"),this.showUpdateAvailable())}trackInstallingWorker(r){r.addEventListener("statechange",()=>{console.log("Service worker state changed:",r.state),r.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New version ready"),this.showUpdateAvailable())})}showUpdateAvailable(){if(this.updateNotificationShown){console.log("Update notification already shown, skipping");return}this.updateNotificationShown=!0,this.showUpdateCallback?this.showUpdateCallback():this.showDefaultUpdateNotification()}showDefaultUpdateNotification(){confirm("A new version of Minimalift is available! Click OK to update now.")&&this.applyUpdate()}onUpdateAvailable(r){this.showUpdateCallback=r}async applyUpdate(){if(!this.registration?.waiting){console.log("No update waiting");return}this.updateNotificationShown=!1,this.registration.waiting.postMessage({type:"SKIP_WAITING"})}async forceUpdateCheck(){console.log("Manual update check triggered..."),await this.checkForUpdates(),setTimeout(()=>{this.checkForWaitingWorker()},2e3)}}const L=new Z;class ee extends HTMLElement{constructor(){super();a(this,"isUpdateAvailable",!1);this.attachShadow({mode:"open"}),this.setupUpdateListener()}connectedCallback(){this.render(),this.setupEventListeners()}setupUpdateListener(){L.onUpdateAvailable(()=>{this.isUpdateAvailable=!0,this.show()})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}setupEventListeners(){this.shadowRoot&&this.addEventListener("click",()=>{this.isUpdateAvailable&&this.applyUpdate()})}show(){this.classList.add("visible")}async applyUpdate(){this.classList.add("updating");const e=this.shadowRoot?.querySelector(".indicator");e&&(e.innerHTML=`
        <svg class="icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
        </svg>
        <div class="tooltip">Updating...</div>
      `),await L.applyUpdate()}}customElements.define("update-indicator",ee);class te extends F{constructor(){super(...arguments);a(this,"latestEvent",null)}render(){this.setHTML(`
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
    `)}clear(){this.latestEvent=null,this.updateDisplay()}updateFromEvent(e){this.latestEvent=e,this.updateDisplay()}updateDisplay(){const e=this.$(".timer-display"),t=this.$(".timer-progress-bar"),s=this.$(".timer-info");if(!e||!this.latestEvent){e&&(e.textContent="--:--");return}const i=this.latestEvent;e.textContent=this.formatTime(i.remaining),e.classList.toggle("warning",i.remaining<=3e3);const n=this.calculateProgress();t&&(t.style.width=`${n}%`);const o=this.getRoundInfo();s&&o&&(s.innerHTML=o)}formatTime(e){const t=Math.ceil(e/1e3),s=Math.floor(t/60),i=t%60;return s>0?`${s}:${i.toString().padStart(2,"0")}`:`0:${i.toString().padStart(2,"0")}`}calculateProgress(){if(!this.latestEvent)return 0;const e=this.latestEvent.elapsed+this.latestEvent.remaining;return e<=0?0:this.latestEvent.elapsed/e*100}getRoundInfo(){return this.latestEvent&&this.latestEvent.round!==void 0&&this.latestEvent.totalRounds?`<span class="timer-round">Round ${this.latestEvent.round+1} of ${this.latestEvent.totalRounds}</span>`:""}}customElements.define("timer-display",te);class se{constructor(){a(this,"routes",[]);a(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("DOMContentLoaded",()=>this.handleRouteChange())}register(r,e){this.routes.push({path:r,handler:e})}navigate(r){window.location.hash=r}handleRouteChange(){const r=window.location.hash.slice(1)||"/";this.currentPath=r;const e=this.routes.find(t=>t.path.includes(":")?new RegExp("^"+t.path.replace(/:[^/]+/g,"([^/]+)")+"$").test(r):t.path===r);if(e)e.handler();else{const t=this.routes.find(s=>s.path==="/");t&&t.handler()}}getParams(){const r=window.location.hash.slice(1)||"/",e={};return this.routes.find(t=>{if(t.path.includes(":")){const s=t.path.split("/"),i=r.split("/");if(s.length===i.length){let n=!0;for(let o=0;o<s.length;o++)if(s[o].startsWith(":"))e[s[o].slice(1)]=i[o];else if(s[o]!==i[o]){n=!1;break}return n}}return!1}),e}getCurrentPath(){return this.currentPath}start(){this.handleRouteChange()}}const x=new se;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app...");try{let c=function(){t.innerHTML="<view-home></view-home>",t.querySelector("view-home")?.addEventListener("navigate-to-day",n=>{x.navigate(`/day/${n.detail.dayId}`)})},r=function(){const n=x.getParams().id;if(n){t.innerHTML="<view-day></view-day>";const o=t.querySelector("view-day");o&&o.loadDay&&o.loadDay(n),o?.addEventListener("start-session",l=>{x.navigate(`/session/${l.detail.dayId}`)})}};console.log("Initializing program manager..."),await I.initialize(),console.log("Program manager initialized");const e=document.querySelector("app-shell");if(!e){console.error("App shell not found");return}console.log("Found app shell, waiting for shadow DOM..."),await new Promise(i=>{const n=()=>{const o=e.shadowRoot;o&&o.querySelector("#content")?(console.log("Shadow DOM ready"),i(void 0)):setTimeout(n,10)};n()});const t=e.shadowRoot.querySelector("#content");if(!t){console.error("Content container not found");return}x.register("/",()=>c()),x.register("/day/:id",()=>r()),x.register("/session/:id",()=>s());async function s(){const n=x.getParams().id;if(n){const o=await I.getDay(n);if(o){t.innerHTML="<view-session></view-session>";const l=t.querySelector("view-session");l&&l.setDay&&l.setDay(o),l?.addEventListener("session-complete",h=>{console.log("Session completed:",h.detail),x.navigate(`/day/${n}`)})}}}e&&e.addEventListener("day-selected",i=>{const o=`p1_w1_d${i.detail.day}`;x.navigate(`/day/${o}`)}),console.log("Starting router..."),x.start(),!window.location.hash||window.location.hash==="#/"?(console.log("No hash found, navigating to Day 1"),x.navigate("/day/p1_w1_d1")):console.log("Found hash:",window.location.hash),console.log("App initialization complete")}catch(c){console.error("Failed to initialize app:",c),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `}});
//# sourceMappingURL=index-DKTpMvA8.js.map
