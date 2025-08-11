var $=Object.defineProperty;var F=(c,i,e)=>i in c?$(c,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[i]=e;var a=(c,i,e)=>F(c,typeof i!="symbol"?i+"":i,e);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class M extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.querySelectorAll(".day-btn").forEach(i=>{i.addEventListener("click",e=>{const s=e.target.dataset.day;s&&this.selectDay(s)})})}selectDay(i){if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".day-btn").forEach(t=>{t.classList.remove("active")}),this.shadowRoot.querySelector(`.day-btn[data-day="${i}"]`)?.classList.add("active"),this.dispatchEvent(new CustomEvent("day-selected",{detail:{day:i}}))}showTimer(i,e){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("#timer-bar"),s=this.shadowRoot.querySelector("#timer-display"),r=this.shadowRoot.querySelector("#timer-round");t&&t.classList.add("active"),s&&(s.textContent=i),r&&(r.textContent=e)}hideTimer(){if(!this.shadowRoot)return;const i=this.shadowRoot.querySelector("#timer-bar");i&&i.classList.remove("active")}}customElements.define("app-shell",M);const A="modulepreload",B=function(c){return"/"+c},D={},z=function(i,e,t){let s=Promise.resolve();if(e&&e.length>0){let u=function(h){return Promise.all(h.map(p=>Promise.resolve(p).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};var n=u;document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=o?.nonce||o?.getAttribute("nonce");s=u(e.map(h=>{if(h=B(h),h in D)return;D[h]=!0;const p=h.endsWith(".css"),d=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${d}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":A,p||(m.as="script"),m.crossOrigin="",m.href=h,l&&m.setAttribute("nonce",l),document.head.appendChild(m),p)return new Promise((y,w)=>{m.addEventListener("load",y),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return i().catch(r)})};class N{constructor(){a(this,"db",null);a(this,"dbName","minimalift_v1");a(this,"version",1)}async openDb(){return this.db?this.db:new Promise((i,e)=>{const t=indexedDB.open(this.dbName,this.version);t.onerror=()=>e(t.error),t.onsuccess=()=>{this.db=t.result,i(this.db)},t.onupgradeneeded=s=>{const r=s.target.result;if(r.objectStoreNames.contains("programs")||r.createObjectStore("programs",{keyPath:"programId"}),r.objectStoreNames.contains("days")||r.createObjectStore("days",{keyPath:"dayId"}).createIndex("programId","programId",{unique:!1}),!r.objectStoreNames.contains("sessions")){const n=r.createObjectStore("sessions",{keyPath:"sessionId",autoIncrement:!0});n.createIndex("dayId","dayId",{unique:!1}),n.createIndex("date","startedAt",{unique:!1})}}})}async tx(i,e="readonly"){return(await this.openDb()).transaction([i],e).objectStore(i)}async get(i,e){const t=await this.tx(i);return new Promise((s,r)=>{const n=t.get(e);n.onsuccess=()=>s(n.result),n.onerror=()=>r(n.error)})}async getAll(i){const e=await this.tx(i);return new Promise((t,s)=>{const r=e.getAll();r.onsuccess=()=>t(r.result),r.onerror=()=>s(r.error)})}async put(i,e){const t=await this.tx(i,"readwrite");return new Promise((s,r)=>{const n=t.put(e);n.onsuccess=()=>s(n.result),n.onerror=()=>r(n.error)})}async delete(i,e){const t=await this.tx(i,"readwrite");return new Promise((s,r)=>{const n=t.delete(e);n.onsuccess=()=>s(),n.onerror=()=>r(n.error)})}async indexGetAll(i,e,t){const r=(await this.tx(i)).index(e);return new Promise((n,o)=>{const l=t?r.getAll(t):r.getAll();l.onsuccess=()=>n(l.result),l.onerror=()=>o(l.error)})}async clear(i){const e=await this.tx(i,"readwrite");return new Promise((t,s)=>{const r=e.clear();r.onsuccess=()=>t(),r.onerror=()=>s(r.error)})}}const v=new N,x=class x{constructor(){}static getInstance(){return x.instance||(x.instance=new x),x.instance}async initialize(){const{seedData:i}=await z(async()=>{const{seedData:t}=await import("./seed-data-G69QiYQA.js");return{seedData:t}},[]);await v.get("programs",i.programId)||await this.loadSeedData(i)}async loadSeedData(i){const e={programId:i.programId,title:i.title};await v.put("programs",e);for(const t of i.days)await v.put("days",t);console.log("Seed data loaded successfully")}async getProgram(i){return await v.get("programs",i)}async getDaysForProgram(i){return await v.indexGetAll("days","programId",i)}async getDay(i){return await v.get("days",i)}async getAllDays(){return(await v.getAll("days")).sort((e,t)=>e.order-t.order)}};a(x,"instance");let P=x;const k=P.getInstance();class W extends HTMLElement{constructor(){super();a(this,"days",[]);this.attachShadow({mode:"open"})}async connectedCallback(){this.days=await k.getAllDays(),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelectorAll(".day-card").forEach(e=>{e.addEventListener("click",t=>{const s=t.currentTarget.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("navigate-to-day",{detail:{dayId:s},bubbles:!0,composed:!0}))})}))}renderDayCard(e){const t=[...new Set(e.blocks.map(r=>r.type))],s=e.blocks.reduce((r,n)=>r+n.exercises.length,0);return`
      <div class="day-card" data-day-id="${e.dayId}">
        <div class="day-number">${e.order}</div>
        <div class="day-title">${e.title}</div>
        <div class="day-summary">${s} exercises • ${e.blocks.length} blocks</div>
        
        <div class="day-blocks">
          ${t.map(r=>`<span class="block-badge">${r}</span>`).join("")}
        </div>
      </div>
    `}}customElements.define("view-home",W);class q extends HTMLElement{constructor(){super();a(this,"day",null);this.attachShadow({mode:"open"})}async loadDay(e){this.day=await k.getDay(e)||null,this.render()}render(){if(this.shadowRoot){if(!this.day){this.shadowRoot.innerHTML="<p>Loading...</p>";return}this.shadowRoot.innerHTML=`
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
    `,this.shadowRoot.querySelector(".start-session-btn")?.addEventListener("click",e=>{const s=e.target.dataset.dayId;s&&this.dispatchEvent(new CustomEvent("start-session",{detail:{dayId:s},bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".substitute-chip").forEach(e=>{e.addEventListener("click",t=>{const s=t.target,r=s.dataset.exerciseId,n=s.dataset.substitute;r&&n&&console.log("Switch to substitute:",n,"for exercise:",r)})})}}renderBlock(e){const t=this.getTimerLabel(e.timerType);return`
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
    `}getBlockTitle(e){return{warmup:"Warm Up",strength:"Strength & Condition",swole:"Swole & Flexy",accessory:"Accessories"}[e]||e}getTimerLabel(e){return{interval:"Interval",work_rest:"Work/Rest",circuit:"Circuit",tabata:"Tabata",stopwatch:"Stopwatch",none:""}[e]||""}}customElements.define("view-day",q);class b{constructor(i=100){a(this,"startTime",0);a(this,"pausedTime",0);a(this,"totalPausedDuration",0);a(this,"intervalId",null);a(this,"state","idle");a(this,"callbacks",[]);this.tickInterval=i}start(){this.state!=="running"&&(this.state==="paused"?this.totalPausedDuration+=performance.now()-this.pausedTime:(this.startTime=performance.now(),this.totalPausedDuration=0),this.state="running",this.intervalId=window.setInterval(()=>this.tick(),this.tickInterval),this.notifyStateChange())}pause(){this.state==="running"&&(this.state="paused",this.pausedTime=performance.now(),this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),this.notifyStateChange())}reset(){this.stop(),this.state="idle",this.startTime=0,this.pausedTime=0,this.totalPausedDuration=0,this.notifyStateChange()}stop(){this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null)}getState(){return this.state}getElapsedTime(){return this.startTime===0?0:(this.state==="paused"?this.pausedTime:performance.now())-this.startTime-this.totalPausedDuration}addCallback(i){this.callbacks.push(i)}removeCallback(i){const e=this.callbacks.indexOf(i);e>-1&&this.callbacks.splice(e,1)}tick(){const i=this.getElapsedTime(),e=this.getRemainingInCurrentPeriod(),t=this.getCurrentRound(),s=this.getTotalRounds(),r=this.getDuration();if(i>=r-100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:r,remaining:0,round:t,totalRounds:s,state:this.state});return}const n=this.getPreviousRound(i-this.tickInterval);t>n&&n>0&&this.notifyCallbacks({type:"roundComplete",elapsed:i,remaining:e,round:n,totalRounds:s,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:i,remaining:e,round:t,totalRounds:s,state:this.state})}notifyCallbacks(i){this.callbacks.forEach(e=>{try{e(i)}catch(t){console.error("Timer callback error:",t)}})}notifyStateChange(){const i=this.getElapsedTime();this.notifyCallbacks({type:"stateChange",elapsed:i,remaining:this.getRemainingInCurrentPeriod(),round:this.getCurrentRound(),totalRounds:this.getTotalRounds(),state:this.state})}static formatTime(i){const e=i<=100?0:Math.max(0,Math.ceil(i/1e3)),t=Math.floor(e/60),s=e%60;return`${t.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`}static formatTimeWithMs(i){const e=Math.max(0,i),t=Math.floor(e/1e3),s=Math.floor(e%1e3/100),r=Math.floor(t/60),n=t%60;return`${r.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}.${s}`}}class U extends b{constructor(e,t,s=1){super();a(this,"currentRound",1);this.intervalSec=e,this.totalRounds=t,this.exercisesPerInterval=s}getDuration(){return this.intervalSec*this.totalRounds*1e3}getCurrentRound(){const e=this.getElapsedTime();return Math.min(Math.floor(e/(this.intervalSec*1e3))+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){return this.getElapsedTime()%(this.intervalSec*1e3)}getRemainingInCurrentPeriod(){return this.intervalSec*1e3-this.getTimeInCurrentPeriod()}getExercisesPerInterval(){return this.exercisesPerInterval}getPreviousRound(e){return Math.min(Math.floor(e/(this.intervalSec*1e3))+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=this.getCurrentRound();if(t<=0){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state});return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state})}}class C extends b{constructor(e,t,s){super();a(this,"currentSet",1);a(this,"isWorkPhase",!0);this.workSec=e,this.restSec=t,this.totalSets=s}getDuration(){return(this.workSec+this.restSec)*this.totalSets*1e3}getCurrentRound(){return this.currentSet}getTotalRounds(){return this.totalSets}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3,s=e%t;return s<this.workSec*1e3?s:s-this.workSec*1e3}getRemainingInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3,s=e%t;return s<this.workSec*1e3?this.workSec*1e3-s:this.restSec*1e3-(s-this.workSec*1e3)}isInWorkPhase(){const e=this.getElapsedTime(),t=(this.workSec+this.restSec)*1e3;return e%t<this.workSec*1e3}getPreviousRound(e){return Math.min(Math.floor(e/((this.workSec+this.restSec)*1e3))+1,this.totalSets)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=Math.min(Math.floor(e/((this.workSec+this.restSec)*1e3))+1,this.totalSets),r=this.isWorkPhase;if(this.isWorkPhase=this.isInWorkPhase(),t<=100){this.state="completed",this.stop(),this.notifyCallbacks({type:"complete",elapsed:this.getDuration(),remaining:0,round:this.totalSets,totalRounds:this.totalSets,state:this.state});return}s>this.currentSet?(this.currentSet=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalSets,state:this.state})):r&&!this.isWorkPhase&&this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalSets,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalSets,state:this.state})}}class H extends b{constructor(e,t,s=0){super();a(this,"currentRound",1);a(this,"currentStationIndex",0);this.stations=e,this.totalRounds=t,this.transitionSec=s}getDuration(){const e=this.stations.reduce((s,r)=>s+r.durationSec,0),t=this.transitionSec*Math.max(0,this.stations.length-1);return(e+t)*this.totalRounds*1e3}getCurrentRound(){return this.currentRound}getTotalRounds(){return this.totalRounds}getCurrentStation(){return this.currentStationIndex<this.stations.length?this.stations[this.currentStationIndex]:null}getCurrentStationIndex(){return this.currentStationIndex}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=this.getRoundDuration(),s=e%t;let r=0;for(let n=0;n<this.stations.length;n++){const o=this.stations[n].durationSec*1e3;if(s<r+o)return s-r;if(r+=o,n<this.stations.length-1){const l=this.transitionSec*1e3;if(s<r+l)return s-r;r+=l}}return 0}getRemainingInCurrentPeriod(){const e=this.getCurrentStation();return e?(this.isInTransition()?this.transitionSec*1e3:e.durationSec*1e3)-this.getTimeInCurrentPeriod():0}isInTransition(){const e=this.getElapsedTime(),t=this.getRoundDuration(),s=e%t;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,s<r)return!1;if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,s<r))return!0}return!1}getRoundDuration(){const e=this.stations.reduce((s,r)=>s+r.durationSec*1e3,0),t=this.transitionSec*Math.max(0,this.stations.length-1)*1e3;return e+t}updateCurrentPosition(){const e=this.getElapsedTime(),t=this.getRoundDuration();this.currentRound=Math.min(Math.floor(e/t)+1,this.totalRounds);const s=e%t;let r=0;for(let n=0;n<this.stations.length;n++){if(r+=this.stations[n].durationSec*1e3,s<r){this.currentStationIndex=n;return}if(n<this.stations.length-1&&(r+=this.transitionSec*1e3,s<r)){this.currentStationIndex=n;return}}this.currentStationIndex=this.stations.length-1}getPreviousRound(e){const t=this.getRoundDuration();return Math.min(Math.floor(e/t)+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e;if(t<=0){this.state="completed",this.stop();return}const s=this.currentRound;this.updateCurrentPosition(),this.currentRound>s&&this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state}),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:this.currentRound,totalRounds:this.totalRounds,state:this.state})}}class j extends b{constructor(e,t,s){super();a(this,"currentRound",1);this.highIntensitySec=e,this.lowIntensitySec=t,this.totalRounds=s}getDuration(){return(this.highIntensitySec+this.lowIntensitySec)*this.totalRounds*1e3}getCurrentRound(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(e/t)+1,this.totalRounds)}getTotalRounds(){return this.totalRounds}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=e%t;return s<this.highIntensitySec*1e3?s:s-this.highIntensitySec*1e3}getRemainingInCurrentPeriod(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3,s=e%t;return s<this.highIntensitySec*1e3?this.highIntensitySec*1e3-s:this.lowIntensitySec*1e3-(s-this.highIntensitySec*1e3)}isHighIntensity(){const e=this.getElapsedTime(),t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return e%t<this.highIntensitySec*1e3}getPreviousRound(e){const t=(this.highIntensitySec+this.lowIntensitySec)*1e3;return Math.min(Math.floor(e/t)+1,this.totalRounds)}tick(){const e=this.getElapsedTime(),t=this.getDuration()-e,s=this.getCurrentRound();if(t<=0){this.state="completed",this.stop();return}s>this.currentRound&&(this.currentRound=s,this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:t,round:s-1,totalRounds:this.totalRounds,state:this.state})),this.notifyCallbacks({type:"tick",elapsed:e,remaining:t,round:s,totalRounds:this.totalRounds,state:this.state})}}class O extends b{constructor(){super();a(this,"laps",[])}getDuration(){return Number.MAX_SAFE_INTEGER}getCurrentRound(){return this.laps.length+1}getTotalRounds(){return 0}getTimeInCurrentPeriod(){const e=this.getElapsedTime(),t=this.laps.length>0?this.laps[this.laps.length-1]:0;return e-t}getRemainingInCurrentPeriod(){return 0}addLap(){const e=this.getElapsedTime();this.laps.push(e),this.notifyCallbacks({type:"roundComplete",elapsed:e,remaining:0,round:this.laps.length,totalRounds:0,state:this.state})}getLaps(){return[...this.laps]}getLapTime(e){if(e<0||e>=this.laps.length)return 0;const t=this.laps[e],s=e>0?this.laps[e-1]:0;return t-s}reset(){super.reset(),this.laps=[]}getPreviousRound(e){return this.laps.length}tick(){const e=this.getElapsedTime();this.notifyCallbacks({type:"tick",elapsed:e,remaining:0,round:this.laps.length+1,totalRounds:0,state:this.state})}}class R{static createTimer(i,e){if(!e&&i!=="stopwatch")return null;switch(i){case"interval":if(e?.intervalSec&&e?.rounds)return new U(e.intervalSec,e.rounds,e.exercisesPerInterval||1);break;case"work_rest":if(e?.workSec&&e?.restSec&&e?.rounds)return new C(e.workSec,e.restSec,e.rounds);if(e?.restSec&&e?.rounds)return new C(0,e.restSec,e.rounds);break;case"circuit":if(e?.stations&&e.stations.length>0&&e?.rounds)return new H(e.stations,e.rounds,e.transitionSec||0);break;case"tabata":if(e?.highIntensitySec&&e?.lowIntensitySec&&e?.rounds)return new j(e.highIntensitySec,e.lowIntensitySec,e.rounds);break;case"stopwatch":return new O;case"none":default:return null}return null}static createRestTimer(i,e=1){return new C(0,i,e)}}class _{constructor(){a(this,"wakeLock",null);a(this,"supported","wakeLock"in navigator)}async acquire(){if(!this.supported)return console.warn("Wake Lock API not supported"),!1;try{return this.wakeLock||(this.wakeLock=await navigator.wakeLock.request("screen"),this.wakeLock?.addEventListener("release",()=>{console.log("Wake lock released"),this.wakeLock=null}),console.log("Wake lock acquired")),!0}catch(i){return console.error("Failed to acquire wake lock:",i),!1}}async release(){if(this.wakeLock)try{await this.wakeLock.release(),this.wakeLock=null,console.log("Wake lock released manually")}catch(i){console.error("Failed to release wake lock:",i)}}isActive(){return this.wakeLock!==null&&!this.wakeLock.released}isSupportedApi(){return this.supported}async reacquire(){return this.wakeLock&&this.wakeLock.released?(this.wakeLock=null,await this.acquire()):this.isActive()}}const I=new _;class V{constructor(){a(this,"backgroundStartTime",null);a(this,"callbacks",[]);this.setupVisibilityHandlers()}setupVisibilityHandlers(){document.addEventListener("visibilitychange",()=>{document.hidden?this.handleBackground():this.handleForeground()}),window.addEventListener("blur",()=>{document.hidden||this.handleBackground()}),window.addEventListener("focus",()=>{document.hidden||this.handleForeground()})}handleBackground(){console.log("App went to background"),this.backgroundStartTime=performance.now(),this.maybeShowNotification()}handleForeground(){if(this.backgroundStartTime!==null){const i=performance.now()-this.backgroundStartTime;console.log(`App returned to foreground after ${i}ms`),this.backgroundStartTime=null,this.callbacks.forEach(e=>{try{e()}catch(t){console.error("Background timer callback error:",t)}})}}async maybeShowNotification(){if("Notification"in window&&Notification.permission==="granted"&&this.callbacks.length>0)try{const e=new Notification("Minimalift Workout Active",{body:"Your workout timer is still running in the background.",icon:"/icons/icon-192x192.png",badge:"/icons/icon-192x192.png",tag:"workout-active",requireInteraction:!1,silent:!0});setTimeout(()=>e.close(),5e3)}catch(e){console.error("Failed to show notification:",e)}}addForegroundCallback(i){this.callbacks.push(i)}removeForegroundCallback(i){const e=this.callbacks.indexOf(i);e>-1&&this.callbacks.splice(e,1)}getTimeInBackground(){return this.backgroundStartTime!==null?performance.now()-this.backgroundStartTime:0}isInBackground(){return document.hidden}async requestNotificationPermission(){if(!("Notification"in window))return console.warn("Notifications not supported"),!1;if(Notification.permission==="granted")return!0;if(Notification.permission==="denied")return!1;try{return await Notification.requestPermission()==="granted"}catch(i){return console.error("Failed to request notification permission:",i),!1}}}const E=new V;class G{constructor(){a(this,"audioContext",null);a(this,"enableHaptic",!0);a(this,"enableAudio",!0);document.addEventListener("touchstart",this.initAudioContext.bind(this),{once:!0}),document.addEventListener("click",this.initAudioContext.bind(this),{once:!0})}initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),console.log("Audio context initialized")}catch(i){console.warn("Audio context not supported:",i)}}setHapticEnabled(i){this.enableHaptic=i}setAudioEnabled(i){this.enableAudio=i}isHapticSupported(){return"vibrate"in navigator}isAudioSupported(){return this.audioContext!==null}vibrate(i){if(!(!this.enableHaptic||!this.isHapticSupported()))try{navigator.vibrate(i)}catch(e){console.warn("Vibration failed:",e)}}beep(i=800,e=200,t=.1){if(!(!this.enableAudio||!this.audioContext))try{const s=this.audioContext.createOscillator(),r=this.audioContext.createGain();s.connect(r),r.connect(this.audioContext.destination),s.frequency.value=i,s.type="sine",r.gain.setValueAtTime(t,this.audioContext.currentTime),r.gain.exponentialRampToValueAtTime(.01,this.audioContext.currentTime+e/1e3),s.start(),s.stop(this.audioContext.currentTime+e/1e3)}catch(s){console.warn("Audio playback failed:",s)}}timerStart(){this.vibrate(100),this.beep(600,150)}timerPause(){this.vibrate([50,50,50]),this.beep(400,100)}roundComplete(){this.vibrate([100,50,100]),this.beep(800,200)}exerciseComplete(){this.vibrate([150,100,150,100,150]),this.playSuccess()}sessionComplete(){this.vibrate([200,100,200,100,200,100,300]),this.playSuccessChord()}setComplete(){this.vibrate([100,50,100]),this.beep(700,150)}restStart(){this.vibrate(80),this.beep(500,150)}restComplete(){this.vibrate([50,30,50]),this.beep(800,100)}workPeriodStart(){this.vibrate([50,30,50]),this.beep(1e3,100)}restPeriodStart(){this.vibrate(80),this.beep(500,150)}countdownWarning(){this.vibrate(50),this.beep(700,100)}playSuccess(){if(!this.audioContext)return;[523,659,784].forEach((e,t)=>{setTimeout(()=>{this.beep(e,200,.08)},t*100)})}playSuccessChord(){if(!this.audioContext)return;[523,659,784].forEach(e=>{this.beep(e,500,.05)})}testFeedback(){console.log("Testing feedback..."),setTimeout(()=>this.timerStart(),0),setTimeout(()=>this.workPeriodStart(),1e3),setTimeout(()=>this.countdownWarning(),2e3),setTimeout(()=>this.restPeriodStart(),3e3),setTimeout(()=>this.roundComplete(),4e3),setTimeout(()=>this.exerciseComplete(),5e3)}}const g=new G;class Y extends HTMLElement{constructor(){super();a(this,"currentDay",null);a(this,"currentBlockIndex",0);a(this,"currentExerciseIndex",0);a(this,"currentSetIndex",0);a(this,"currentTimer",null);a(this,"sessionStartTime",0);a(this,"foregroundCallback",null);a(this,"lastPhase",null);a(this,"isRestingBetweenSets",!1);this.attachShadow({mode:"open"})}connectedCallback(){this.render(),this.setupEventListeners(),this.setupBackgroundHandling()}disconnectedCallback(){this.cleanup()}setDay(e){this.currentDay=e,this.currentBlockIndex=0,this.currentExerciseIndex=0,this.currentSetIndex=0,this.isRestingBetweenSets=!1,console.log("Day loaded:",e),console.log("Blocks:",e.blocks),this.render()}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
    `}renderHeader(){if(!this.currentDay)return"";const e=this.currentDay.blocks.length,t=this.currentDay.blocks.reduce((r,n)=>r+n.exercises.length,0),s=this.currentBlockIndex*(this.currentDay.blocks[0]?.exercises.length||0)+this.currentExerciseIndex;return`
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
    `}renderCurrentExercises(){const e=this.getCurrentBlock();if(!e)return"";if(console.log("Block timer type:",e.timerType),console.log("Block timer config:",e.timerConfig),console.log("Exercises per interval:",e.timerConfig?.exercisesPerInterval),e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){const s=e.timerConfig.exercisesPerInterval,r=Math.floor(this.currentExerciseIndex/s)*s,n=e.exercises.slice(r,r+s);return console.log("Showing compound exercises:",n.map(o=>o.name)),`
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
    `:""}renderTimer(){const e=this.getCurrentExercise(),t=this.getCurrentBlock(),s=t?.timerType&&t.timerType!=="none";if(t?.timerType==="interval"&&t.timerConfig?.exercisesPerInterval&&t.timerConfig.exercisesPerInterval>1){const p=(t.timerConfig.intervalSec||120)/60,d=t.timerConfig.exercisesPerInterval;if(this.currentTimer){const m=this.currentTimer.getRemainingInCurrentPeriod(),y=this.currentTimer.getCurrentRound(),w=this.currentTimer.getTotalRounds(),S=b.formatTime(m),T=this.getTimerProgress();return`
          <div class="timer-section">
            <div class="timer-display">${S}</div>
            <div class="timer-phase">Interval ${y} of ${w}</div>
            <div class="timer-progress">Complete all ${d} exercises • Every ${p} min</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${T*100}%"></div>
            </div>
          </div>
        `}else return`
          <div class="timer-section">
            <div class="timer-display">--:--</div>
            <div class="timer-phase">Ready to start</div>
            <div class="timer-progress">Every ${p} min • ${d} exercises per interval</div>
          </div>
        `}if(!s&&e){const p=e.sets||1,d=this.currentSetIndex+1;if(this.isRestingBetweenSets&&this.currentTimer){const m=this.currentTimer.getRemainingInCurrentPeriod(),y=b.formatTime(m),w=this.currentTimer.getElapsedTime(),S=this.currentTimer.getDuration(),T=Math.min(w/S,1);return`
          <div class="timer-section">
            <div class="timer-display">${y}</div>
            <div class="timer-phase">Rest after Set ${d-1}</div>
            <div class="timer-progress">Set ${d}/${p} next</div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${T*100}%"></div>
            </div>
          </div>
        `}return`
        <div class="timer-section">
          <div class="timer-display">Set ${d}/${p}</div>
          <div class="timer-phase">${e.reps} reps</div>
          ${e.restSec?`<div class="timer-progress">${e.restSec}s rest after set</div>`:""}
        </div>
      `}if(!this.currentTimer)return`
        <div class="timer-section">
          <div class="timer-display">--:--</div>
          <div class="timer-phase">Ready to start</div>
        </div>
      `;const r=this.currentTimer.getRemainingInCurrentPeriod(),n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds(),l=b.formatTime(r),u=this.getTimerProgress(),h=this.getTimerPhase();return`
      <div class="timer-section">
        <div class="timer-display">${l}</div>
        <div class="timer-phase">${h}</div>
        <div class="timer-progress">Round ${n} of ${o}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${u*100}%"></div>
        </div>
      </div>
    `}renderControls(){const e=this.getCurrentBlock();if(e?.timerType&&e.timerType!=="none"){const u=this.currentTimer?.getState()||"idle",h=u==="completed",p=e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1;let d="";return!this.currentTimer||u==="idle"?d='<button class="control-btn primary" id="start-btn">Start Timer</button>':u==="running"?d='<button class="control-btn warning" id="pause-btn">Pause</button>':u==="paused"?d='<button class="control-btn primary" id="resume-btn">Resume</button>':h&&(d=`<button class="control-btn primary" id="next-btn">${p?"Next Round":"Next Exercise"}</button>`),`
        <div class="session-controls">
          ${d}
          <button class="control-btn secondary" id="reset-btn" ${!this.currentTimer||u==="idle"?"disabled":""}>Reset</button>
          <button class="control-btn secondary" id="skip-btn">Skip</button>
        </div>
      `}const s=this.getCurrentExercise();if(!s)return'<div class="session-controls"><button class="control-btn secondary" id="skip-btn">Skip</button></div>';const r=s.sets||1,n=this.isRestingBetweenSets,o=this.currentTimer?.getState()||"idle";if(n&&this.currentTimer){if(o==="running")return`
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
    `}getCurrentBlock(){return!this.currentDay||this.currentBlockIndex>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex]}getCurrentExercise(){const e=this.getCurrentBlock();return!e||this.currentExerciseIndex>=e.exercises.length?null:e.exercises[this.currentExerciseIndex]}getNextExercise(){const e=this.getCurrentBlock();if(!e)return null;let t=1;return e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&(t=e.timerConfig.exercisesPerInterval),this.currentExerciseIndex+t<e.exercises.length?e.exercises[this.currentExerciseIndex+t]:!this.currentDay||this.currentBlockIndex+1>=this.currentDay.blocks.length?null:this.currentDay.blocks[this.currentBlockIndex+1].exercises[0]||null}formatExerciseDetails(e,t){const s=[],r=t.timerType==="interval";return e.sets&&s.push(`${e.sets} sets`),e.reps&&s.push(`${e.reps} reps`),!r&&e.restSec&&s.push(`${e.restSec}s rest`),s.join(" • ")}getTimerProgress(){if(!this.currentTimer)return 0;const e=this.currentTimer.getElapsedTime(),t=this.currentTimer.getDuration();return Math.min(e/t,1)}getTimerPhase(){if(!this.currentTimer)return"Ready";const e=this.getCurrentBlock();if(!(e?.timerType&&e.timerType!=="none"))return"Timer Running";if(this.currentTimer&&this.currentTimer.getTotalRounds()>1){const s=this.currentTimer.getCurrentPhase?.();if(s==="work")return"Work Period";if(s==="rest")return"Rest Period"}return"Timer Running"}createTimerForCurrentBlock(){const e=this.getCurrentBlock();if(!e?.timerType||e.timerType==="none")return null;if(e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1){const t=e.timerConfig.exercisesPerInterval,s=Math.floor(this.currentExerciseIndex/t),n=Math.ceil(e.exercises.length/t)-s;return R.createTimer(e.timerType,{...e.timerConfig,rounds:n})}return R.createTimer(e.timerType,e.timerConfig)}setupEventListeners(){this.shadowRoot&&this.shadowRoot.addEventListener("click",e=>{const t=e.target;t.id==="start-btn"?this.startTimer():t.id==="pause-btn"?this.pauseTimer():t.id==="resume-btn"?this.resumeTimer():t.id==="reset-btn"?this.resetTimer():t.id==="skip-btn"?this.skipExercise():t.id==="complete-exercise-btn"?this.completeExercise():t.id==="complete-set-btn"?this.completeSet():t.id==="skip-rest-btn"?this.skipRest():t.id==="next-set-btn"?this.startNextSet():t.id==="next-btn"?this.nextExercise():t.id==="finish-btn"?this.finishSession():t.id==="cancel-session"&&this.cancelSession()})}async startTimer(){this.sessionStartTime||(this.sessionStartTime=performance.now(),await E.requestNotificationPermission()),await I.acquire(),this.currentTimer=this.createTimerForCurrentBlock(),this.currentTimer&&(this.currentTimer.addCallback(e=>{this.handleTimerEvent(e)}),this.currentTimer.start(),g.timerStart(),this.render())}pauseTimer(){this.currentTimer?.pause(),g.timerPause(),this.render()}resumeTimer(){this.currentTimer?.start(),g.timerStart(),this.render()}resetTimer(){this.currentTimer?.reset(),this.render()}skipExercise(){const e=this.getCurrentBlock();e?.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&e.timerConfig.exercisesPerInterval>1?this.skipIntervalGroup():this.nextExercise()}skipIntervalGroup(){const e=this.getCurrentBlock();if(!e)return;this.currentTimer?.stop(),this.currentTimer=null;const t=e.timerConfig?.exercisesPerInterval||1;this.currentExerciseIndex+t<e.exercises.length?this.currentExerciseIndex+=t:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render()}completeExercise(){this.nextExercise()}async completeSet(){const e=this.getCurrentExercise();if(!e)return;const t=e.sets||1,s=this.currentSetIndex>=t-1;g.setComplete(),s?this.nextExercise():(e.restSec&&e.restSec>0?(this.currentSetIndex++,this.isRestingBetweenSets=!0,this.currentTimer=R.createRestTimer(e.restSec,1),this.currentTimer.addCallback(r=>{r.type==="complete"?this.handleRestComplete():r.type==="tick"&&this.updateTimerDisplay()}),this.currentTimer.start(),g.restStart()):this.currentSetIndex++,this.render())}skipRest(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),this.handleRestComplete()}startNextSet(){this.handleRestComplete()}handleRestComplete(){this.isRestingBetweenSets=!1,this.currentTimer?.stop(),this.currentTimer=null,g.restComplete(),this.render()}nextExercise(){const e=this.getCurrentBlock();if(!e)return;g.exerciseComplete(),this.currentTimer?.stop(),this.currentTimer=null,this.currentSetIndex=0,this.isRestingBetweenSets=!1;let t=1;e.timerType==="interval"&&e.timerConfig?.exercisesPerInterval&&(t=e.timerConfig.exercisesPerInterval),this.currentExerciseIndex+t<e.exercises.length?this.currentExerciseIndex+=t:(this.currentBlockIndex++,this.currentExerciseIndex=0),this.render()}async finishSession(){g.sessionComplete(),await this.cleanup(),this.showSessionSaveDialog()}showSessionSaveDialog(){const e=this.sessionStartTime?Math.round((performance.now()-this.sessionStartTime)/1e3):0,t=Math.floor(e/60),s=e%60,r=`${t}:${s.toString().padStart(2,"0")}`;if(!this.shadowRoot)return;const n=`
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
    `,o=document.createElement("div");o.innerHTML=n,this.shadowRoot.appendChild(o);const l=this.shadowRoot.querySelector("#discard-session"),u=this.shadowRoot.querySelector("#save-session");l?.addEventListener("click",()=>{this.discardSession()}),u?.addEventListener("click",()=>{this.saveSession()})}discardSession(){console.log("Session discarded (not saved)"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1}}))}saveSession(){console.log("Session saved"),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!0}}))}async cancelSession(){confirm("Are you sure you want to cancel this session? Your progress will not be saved.")&&(console.log("Session cancelled by user"),await this.cleanup(),this.dispatchEvent(new CustomEvent("session-complete",{detail:{day:this.currentDay,duration:this.sessionStartTime?performance.now()-this.sessionStartTime:0,saved:!1,cancelled:!0}})))}setupBackgroundHandling(){this.foregroundCallback=()=>{this.currentTimer?.getState()==="running"&&I.reacquire(),this.updateTimerDisplay()},E.addForegroundCallback(this.foregroundCallback)}async cleanup(){this.currentTimer&&(this.currentTimer.stop(),this.currentTimer=null),await I.release(),this.foregroundCallback&&(E.removeForegroundCallback(this.foregroundCallback),this.foregroundCallback=null)}handleTimerEvent(e){e.type==="tick"?(this.updateTimerDisplay(),this.checkForPhaseChange(),this.checkForCountdownWarning(e.remaining)):e.type==="complete"?(g.exerciseComplete(),this.render()):e.type==="roundComplete"&&g.roundComplete()}checkForPhaseChange(){const e=this.getTimerPhase();this.lastPhase&&this.lastPhase!==e&&(e==="Work Period"?g.workPeriodStart():e==="Rest Period"&&g.restPeriodStart()),this.lastPhase=e}checkForCountdownWarning(e){const t=Math.ceil(e/1e3);if(t<=3&&t>0){const s=this.lastWarnTime||0,r=performance.now();r-s>900&&(g.countdownWarning(),this.lastWarnTime=r)}}updateTimerDisplay(){if(!this.shadowRoot||!this.currentTimer)return;const e=this.shadowRoot.querySelector(".timer-display"),t=this.shadowRoot.querySelector(".progress-fill"),s=this.shadowRoot.querySelector(".timer-progress"),r=this.shadowRoot.querySelector(".timer-phase");if(e){const n=this.currentTimer.getRemainingInCurrentPeriod();e.textContent=b.formatTime(n)}if(t){const n=this.getTimerProgress();t.style.width=`${n*100}%`}if(s){const n=this.currentTimer.getCurrentRound(),o=this.currentTimer.getTotalRounds();s.textContent=`Round ${n} of ${o}`}r&&(r.textContent=this.getTimerPhase())}}customElements.define("view-session",Y);class X{constructor(){a(this,"registration",null);a(this,"showUpdateCallback",null);a(this,"updateNotificationShown",!1);document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>this.setupUpdateDetection()):this.setupUpdateDetection()}async setupUpdateDetection(){if(!("serviceWorker"in navigator)){console.log("Service workers not supported");return}try{this.registration=await navigator.serviceWorker.register("/sw.js"),console.log("ServiceWorker registered:",this.registration),console.log("Checking for updates on startup..."),await this.checkForUpdates(),console.log("Checking for waiting service worker..."),this.checkForWaitingWorker(),setTimeout(()=>{console.log("Double-checking for waiting service worker after delay..."),this.checkForWaitingWorker()},1e3),this.registration.installing&&this.trackInstallingWorker(this.registration.installing),setInterval(()=>{document.visibilityState==="visible"&&(console.log("Periodic update check (30s interval)"),this.checkForUpdates())},3e4),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(console.log("App came to foreground, checking for updates"),this.checkForUpdates())}),this.registration.addEventListener("updatefound",()=>{console.log("Update found, installing new version...");const i=this.registration?.installing;i&&this.trackInstallingWorker(i)}),navigator.serviceWorker.addEventListener("controllerchange",()=>{console.log("New service worker took control, reloading page"),window.location.reload()})}catch(i){console.error("ServiceWorker registration failed:",i)}}async checkForUpdates(){if(!this.registration){console.log("No registration available for update check");return}try{console.log("Calling registration.update()..."),await this.registration.update(),console.log("Update check completed"),this.registration.waiting&&(console.log("Found waiting worker after update check"),this.showUpdateAvailable())}catch(i){console.error("Failed to check for updates:",i)}}checkForWaitingWorker(){this.registration&&this.registration.waiting&&(console.log("Found waiting service worker on startup"),this.showUpdateAvailable())}trackInstallingWorker(i){i.addEventListener("statechange",()=>{console.log("Service worker state changed:",i.state),i.state==="installed"&&navigator.serviceWorker.controller&&(console.log("New version ready"),this.showUpdateAvailable())})}showUpdateAvailable(){if(this.updateNotificationShown){console.log("Update notification already shown, skipping");return}this.updateNotificationShown=!0,this.showUpdateCallback?this.showUpdateCallback():this.showDefaultUpdateNotification()}showDefaultUpdateNotification(){confirm("A new version of Minimalift is available! Click OK to update now.")&&this.applyUpdate()}onUpdateAvailable(i){this.showUpdateCallback=i}async applyUpdate(){if(!this.registration?.waiting){console.log("No update waiting");return}this.updateNotificationShown=!1,this.registration.waiting.postMessage({type:"SKIP_WAITING"})}async forceUpdateCheck(){console.log("Manual update check triggered..."),await this.checkForUpdates(),setTimeout(()=>{this.checkForWaitingWorker()},2e3)}}const L=new X;class K extends HTMLElement{constructor(){super();a(this,"isUpdateAvailable",!1);this.attachShadow({mode:"open"}),this.setupUpdateListener()}connectedCallback(){this.render(),this.setupEventListeners()}setupUpdateListener(){L.onUpdateAvailable(()=>{this.isUpdateAvailable=!0,this.show()})}render(){this.shadowRoot&&(this.shadowRoot.innerHTML=`
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
      `),await L.applyUpdate()}}customElements.define("update-indicator",K);class J{constructor(){a(this,"routes",[]);a(this,"currentPath","");window.addEventListener("hashchange",()=>this.handleRouteChange()),window.addEventListener("DOMContentLoaded",()=>this.handleRouteChange())}register(i,e){this.routes.push({path:i,handler:e})}navigate(i){window.location.hash=i}handleRouteChange(){const i=window.location.hash.slice(1)||"/";this.currentPath=i;const e=this.routes.find(t=>t.path.includes(":")?new RegExp("^"+t.path.replace(/:[^/]+/g,"([^/]+)")+"$").test(i):t.path===i);if(e)e.handler();else{const t=this.routes.find(s=>s.path==="/");t&&t.handler()}}getParams(){const i=window.location.hash.slice(1)||"/",e={};return this.routes.find(t=>{if(t.path.includes(":")){const s=t.path.split("/"),r=i.split("/");if(s.length===r.length){let n=!0;for(let o=0;o<s.length;o++)if(s[o].startsWith(":"))e[s[o].slice(1)]=r[o];else if(s[o]!==r[o]){n=!1;break}return n}}return!1}),e}getCurrentPath(){return this.currentPath}start(){this.handleRouteChange()}}const f=new J;document.addEventListener("DOMContentLoaded",async()=>{console.log("DOM loaded, initializing app...");try{let c=function(){t.innerHTML="<view-home></view-home>",t.querySelector("view-home")?.addEventListener("navigate-to-day",n=>{f.navigate(`/day/${n.detail.dayId}`)})},i=function(){const n=f.getParams().id;if(n){t.innerHTML="<view-day></view-day>";const o=t.querySelector("view-day");o&&o.loadDay&&o.loadDay(n),o?.addEventListener("start-session",l=>{f.navigate(`/session/${l.detail.dayId}`)})}};console.log("Initializing program manager..."),await k.initialize(),console.log("Program manager initialized");const e=document.querySelector("app-shell");if(!e){console.error("App shell not found");return}console.log("Found app shell, waiting for shadow DOM..."),await new Promise(r=>{const n=()=>{const o=e.shadowRoot;o&&o.querySelector("#content")?(console.log("Shadow DOM ready"),r(void 0)):setTimeout(n,10)};n()});const t=e.shadowRoot.querySelector("#content");if(!t){console.error("Content container not found");return}f.register("/",()=>c()),f.register("/day/:id",()=>i()),f.register("/session/:id",()=>s());async function s(){const n=f.getParams().id;if(n){const o=await k.getDay(n);if(o){t.innerHTML="<view-session></view-session>";const l=t.querySelector("view-session");l&&l.setDay&&l.setDay(o),l?.addEventListener("session-complete",u=>{console.log("Session completed:",u.detail),f.navigate(`/day/${n}`)})}}}e&&e.addEventListener("day-selected",r=>{const o=`p1_w1_d${r.detail.day}`;f.navigate(`/day/${o}`)}),console.log("Starting router..."),f.start(),!window.location.hash||window.location.hash==="#/"?(console.log("No hash found, navigating to Day 1"),f.navigate("/day/p1_w1_d1")):console.log("Found hash:",window.location.hash),console.log("App initialization complete")}catch(c){console.error("Failed to initialize app:",c),document.body.innerHTML=`
      <div style="padding: 20px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
        <h1>Oops! Something went wrong</h1>
        <p>There was an error loading Minimalift. Please refresh the page to try again.</p>
        <button onclick="window.location.reload()" style="padding: 10px 20px; font-size: 16px; background: #007AFF; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `}});
//# sourceMappingURL=index-CmIPLElv.js.map
