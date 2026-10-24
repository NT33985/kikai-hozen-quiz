/* Factory Growth & Achievements - machine maintenance quiz */
(function(){
  "use strict";
  const STORAGE="kikaiChallengeV1";
  const STAGES=[
    {at:0,name:"小さな作業場",icon:"🛠️",desc:"まずは工具をそろえて、保全の第一歩！"},
    {at:10,name:"工具ステーション",icon:"🔧",desc:"工具と作業台がそろいました。"},
    {at:50,name:"旋盤導入",icon:"⚙️",desc:"最初の加工設備が入りました。"},
    {at:100,name:"1号機稼働",icon:"🎉",desc:"ついに自分の工場で設備が動き始めました！"},
    {at:200,name:"搬送ライン増設",icon:"📦",desc:"製品を運ぶコンベヤが稼働。"},
    {at:300,name:"制御盤を導入",icon:"⚡",desc:"設備の制御と監視ができるようになりました。"},
    {at:500,name:"ロボット導入",icon:"🤖",desc:"自動化に向けて大きく前進！"},
    {at:1000,name:"スマートファクトリー",icon:"🏭",desc:"保全技術が結集した自動化工場が完成！"},
    {at:2000,name:"世界水準の工場",icon:"🌏",desc:"さらなる高みへ。設備改善は続きます。"}
  ];
  const BADGES=[
    {id:"first",type:"累積正解",at:1,label:"初めての正解",icon:"🔩",detail:"累積1問正解"},
    {id:"total10",type:"累積正解",at:10,label:"始動",icon:"🔧",detail:"累積10問正解"},
    {id:"total50",type:"累積正解",at:50,label:"機械の仲間",icon:"⚙️",detail:"累積50問正解"},
    {id:"total100",type:"累積正解",at:100,label:"百戦錬磨",icon:"🥉",detail:"累積100問正解"},
    {id:"total300",type:"累積正解",at:300,label:"設備の達人",icon:"🥈",detail:"累積300問正解"},
    {id:"total500",type:"累積正解",at:500,label:"保全マスター",icon:"🥇",detail:"累積500問正解"},
    {id:"total1000",type:"累積正解",at:1000,label:"伝説の保全士",icon:"🏆",detail:"累積1000問正解"},
    {id:"total2000",type:"累積正解",at:2000,label:"工場の守護神",icon:"💎",detail:"累積2000問正解"},
    {id:"streak3",type:"連続正解",at:3,label:"3連続！",icon:"🔥",detail:"3問連続正解"},
    {id:"streak5",type:"連続正解",at:5,label:"波に乗った！",icon:"✨",detail:"5問連続正解"},
    {id:"streak10",type:"連続正解",at:10,label:"集中力抜群",icon:"🎯",detail:"10問連続正解"},
    {id:"streak20",type:"連続正解",at:20,label:"ノーミス職人",icon:"🧠",detail:"20問連続正解"},
    {id:"streak30",type:"連続正解",at:30,label:"精密マスター",icon:"💠",detail:"30問連続正解"},
    {id:"streak50",type:"連続正解",at:50,label:"完全無欠",icon:"👑",detail:"50問連続正解"},
    {id:"attempt50",type:"学習の継続",at:50,label:"コツコツ点検",icon:"📖",detail:"累積50問に回答（正誤不問）"},
    {id:"attempt200",type:"学習の継続",at:200,label:"毎日の積み重ね",icon:"📚",detail:"累積200問に回答（正誤不問）"},
    {id:"attempt500",type:"学習の継続",at:500,label:"努力の結晶",icon:"📋",detail:"累積500問に回答（正誤不問）"},
    {id:"unique20",type:"知識の広がり",at:20,label:"知識を開拓",icon:"🗺️",detail:"異なる20問に正解"},
    {id:"unique100",type:"知識の広がり",at:100,label:"知識の百科事典",icon:"📘",detail:"異なる100問に正解"},
    {id:"unique300",type:"知識の広がり",at:300,label:"全方位の知識",icon:"🔬",detail:"異なる300問に正解"},
    {id:"recover1",type:"復習・再挑戦",at:1,label:"リベンジ成功",icon:"🔁",detail:"以前に間違えた問題で1回正解"},
    {id:"recover5",type:"復習・再挑戦",at:5,label:"復習の達人",icon:"🧰",detail:"以前に間違えた問題で5回正解"},
    {id:"recover20",type:"復習・再挑戦",at:20,label:"弱点克服王",icon:"🛡️",detail:"以前に間違えた問題で20回正解"},
    {id:"grade1",type:"級別の挑戦",at:20,label:"1級への挑戦",icon:"🔵",detail:"1級の異なる20問に正解"},
    {id:"grade2",type:"級別の挑戦",at:20,label:"2級への挑戦",icon:"🟢",detail:"2級の異なる20問に正解"},
    {id:"predicted",type:"級別の挑戦",at:20,label:"予想問題ハンター",icon:"🎲",detail:"予想問題の異なる20問に正解"}
  ];
  const GROUPS=["累積正解","連続正解","学習の継続","知識の広がり","復習・再挑戦","級別の挑戦"];
  const blank=()=>({currentStreak:0,bestStreak:0,recoveries:0,unlocked:[]});
  let state=blank(), modal=null, home=null, tab="factory", selectedBadge=null, toastTimer=null, toast=null;
  const safeNum=v=>Number.isFinite(+v)?Math.max(0,Math.floor(+v)):0;
  function getCorrect(){return typeof correct==="number"?safeNum(correct):0}
  function getAttempts(){return typeof attempts==="number"?safeNum(attempts):0}
  function getLog(){return typeof answerLog==="object" && answerLog ? answerLog : {}}
  function getCounts(){
    const keys=Object.keys(getLog()).filter(k=>getLog()[k]&&getLog()[k].correct===true);
    return {unique:keys.length,grade1:keys.filter(k=>k.startsWith("1級-")).length,
      grade2:keys.filter(k=>k.startsWith("2級-")).length,
      predicted:keys.filter(k=>k.includes("-予想-")).length};
  }
  function stageFor(n){let s=STAGES[0];for(const it of STAGES){if(n>=it.at)s=it;}return s}
  function stageIndex(n){return STAGES.indexOf(stageFor(n))}
  function getNextStage(n){return STAGES.find(x=>x.at>n)||null}
  function metric(b,c){
    if(b.id==="first")return getCorrect();
    if(b.id.startsWith("total"))return getCorrect();
    if(b.id.startsWith("streak"))return state.bestStreak;
    if(b.id.startsWith("attempt"))return getAttempts();
    if(b.id.startsWith("unique"))return c.unique;
    if(b.id.startsWith("recover"))return state.recoveries;
    if(b.id==="grade1")return c.grade1;
    if(b.id==="grade2")return c.grade2;
    if(b.id==="predicted")return c.predicted;
    return 0;
  }
  function persist(){try{localStorage.setItem(STORAGE,JSON.stringify(state))}catch(e){console.warn("チャレンジ実績を保存できません",e)}}
  function load(){
    try{
      const obj=JSON.parse(localStorage.getItem(STORAGE)||"{}");
      if(obj&&typeof obj==="object"){
        state.currentStreak=safeNum(obj.currentStreak);
        state.bestStreak=Math.max(state.currentStreak,safeNum(obj.bestStreak));
        state.recoveries=safeNum(obj.recoveries);
        state.unlocked=Array.isArray(obj.unlocked)?obj.unlocked.filter(x=>typeof x==="string"):[];
      }
    }catch(e){state=blank()}
  }
  function grant(silent,previousStage){
    const c=getCounts(), earned=[];
    for(const b of BADGES){
      if(!state.unlocked.includes(b.id)&&metric(b,c)>=b.at){
        state.unlocked.push(b.id);earned.push(b);
      }
    }
    persist();
    if(!silent){
      const newStage=stageFor(getCorrect());
      if(previousStage && previousStage.at!==newStage.at)
        announce(newStage.icon+" 工場が進化！",newStage.name+" が完成しました");
      else if(earned.length)
        announce("🏅 新しいバッジ獲得！",earned.slice(0,2).map(b=>b.icon+" "+b.label).join("・")+(earned.length>2?" ほか"+(earned.length-2)+"個":""));
    }
  }
  function sceneSvg(n){
    const level=stageIndex(n);
    const bg=level>=7?"#dff2ff":"#e9f4fc";
    let parts='';
    if(level>=1)parts+='<rect x="68" y="134" width="102" height="8" rx="3" fill="#ad7953"/><path d="M78 142v24m82-24v24" stroke="#755035" stroke-width="8"/><rect x="94" y="109" width="43" height="26" rx="4" fill="#f59e0b"/><path d="M110 103v-9m-10 9h20" stroke="#475569" stroke-width="5"/>';
    if(level>=2)parts+='<rect x="198" y="106" width="95" height="58" rx="7" fill="#4c7397"/><rect x="208" y="115" width="58" height="33" rx="3" fill="#d3ecfc"/><circle cx="272" cy="133" r="8" fill="#ffce56"/><path d="M206 158h77" stroke="#1e3a5f" stroke-width="6"/>';
    if(level>=3)parts+='<circle cx="245" cy="98" r="13" fill="#facc15"/><path d="M245 76v9m0 26v9m-22-22h9m26 0h9m-38-16 7 7m18 18 7 7" stroke="#f59e0b" stroke-width="3"/>';
    if(level>=4)parts+='<rect x="315" y="139" width="202" height="19" rx="7" fill="#334155"/><path d="M330 157v13m173-13v13" stroke="#64748b" stroke-width="7"/>'+[337,373,409,445,481].map(x=>'<circle cx="'+x+'" cy="149" r="6" fill="#a8d4ee"/>').join('')+'<rect x="356" y="125" width="44" height="13" rx="3" fill="#f5ae55"/><rect x="422" y="125" width="40" height="13" rx="3" fill="#f5ae55"/>';
    if(level>=5)parts+='<rect x="535" y="85" width="62" height="80" rx="6" fill="#64748b"/><rect x="544" y="94" width="45" height="32" rx="3" fill="#a8f0d6"/><circle cx="552" cy="139" r="5" fill="#22c55e"/><circle cx="570" cy="139" r="5" fill="#f97316"/><circle cx="584" cy="139" r="5" fill="#94a3b8"/>';
    if(level>=6)parts+='<path d="M477 131l18-40 25 19 14-28" fill="none" stroke="#f9ae46" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/><circle cx="495" cy="91" r="8" fill="#2c5e89"/><circle cx="520" cy="110" r="8" fill="#2c5e89"/><path d="M531 78l10-7m-7 13 11 7" stroke="#1e3a5f" stroke-width="5"/>';
    if(level>=7)parts+='<path d="M349 35h190l20 22H370Z" fill="#125487"/><path d="M386 35l18 22m21-22 18 22m21-22 18 22m21-22 18 22" stroke="#8ed5f4" stroke-width="3"/><text x="506" y="26" fill="#1e4e7b" font-size="19" font-weight="bold">SMART FACTORY</text>';
    if(level>=8)parts+='<text x="581" y="40" font-size="32">🏆</text>';
    return '<svg viewBox="0 0 640 192" role="img" aria-label="累積正解数に応じて設備が増える工場" xmlns="http://www.w3.org/2000/svg">'+
      '<rect width="640" height="192" rx="14" fill="'+bg+'"/><circle cx="568" cy="28" r="19" fill="#fcd66c" opacity=".9"/>'+
      '<path d="M0 177h640v15H0Z" fill="#a9c7a4"/>'+
      '<path d="M10 178V75l75-33 67 33V48l75-26 80 33v123Z" fill="#c8d9e8" stroke="#7397b4" stroke-width="3"/>'+
      '<rect x="16" y="88" width="610" height="86" rx="6" fill="#fff" stroke="#b7d0e3" stroke-width="3"/>'+
      '<path d="M16 88h610" stroke="#366b96" stroke-width="7"/>'+
      '<rect x="36" y="104" width="117" height="64" rx="3" fill="#e1f3ff" stroke="#8cb1ca" stroke-width="3"/>'+
      '<path d="M36 129h117m-59-25v64" stroke="#9dbdd3" stroke-width="3"/>'+
      '<rect x="182" y="104" width="432" height="64" rx="4" fill="#f7fafc"/>'+
      parts+'</svg>';
  }
  function progress(n,next){
    if(!next)return '<div class="ch-progress"><span style="width:100%"></span></div>';
    const from=stageFor(n).at;
    const percent=Math.min(100,Math.max(0,(n-from)/(next.at-from)*100));
    return '<div class="ch-progress" role="progressbar" aria-valuenow="'+n+'" aria-valuemin="'+from+'" aria-valuemax="'+next.at+'"><span style="width:'+percent+'%"></span></div>';
  }
  function factoryHtml(n,large){
    const s=stageFor(n),next=getNextStage(n);
    return '<div class="ch-factory '+(large?'ch-factory-large':'')+'">'+
      '<div class="ch-scene">'+sceneSvg(n)+'</div>'+
      '<div class="ch-factory-text"><span class="ch-eyebrow">MY FACTORY · LEVEL '+(stageIndex(n)+1)+'</span>'+
      '<h3>'+s.icon+' '+s.name+'</h3><p>'+s.desc+'</p>'+
      '<div class="ch-level-numbers"><strong>累積 '+n.toLocaleString('ja-JP')+' 問正解</strong><span>'+(next?'次の進化まであと '+(next.at-n)+' 問':'最終ステージ達成！')+'</span></div>'+
      progress(n,next)+'</div></div>';
  }
  function initUi(){
    home=document.createElement('section');home.id="challengeHome";home.className="ch-home";
    home.setAttribute('aria-label','工場成長・チャレンジ実績');
    const header=document.querySelector('.main-header');
    if(header)header.insertAdjacentElement('afterend',home);
    const homeBtn=document.getElementById('homeBtn');
    if(homeBtn){
      const btn=document.createElement('button');btn.type="button";btn.className="ch-play-open";btn.id="challengePlayOpen";
      btn.textContent="🏭";btn.setAttribute('aria-label','工場とバッジを見る');
      btn.title="工場とバッジを見る";btn.onclick=openModal;
      homeBtn.insertAdjacentElement('afterend',btn);
    }
    modal=document.createElement('div');modal.id="challengeModal";modal.className="ch-overlay";
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="ch-dialog" role="dialog" aria-modal="true" aria-label="マイ工場とバッジ">'+
      '<div class="ch-dialog-head"><div><span class="ch-eyebrow">CHALLENGE MODE</span><h2>🏭 マイ工場とバッジ</h2></div>'+
      '<button type="button" class="ch-close" data-ch-action="close" aria-label="閉じる">×</button></div>'+
      '<div class="ch-tabs"><button type="button" data-ch-action="factory" class="active">🏭 工場</button>'+
      '<button type="button" data-ch-action="badges">🏅 バッジ</button></div>'+
      '<div id="chModalContent"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',function(ev){
      if(ev.target===modal){closeModal();return}
      const button=ev.target.closest('[data-ch-action]');
      if(!button)return;
      const act=button.getAttribute('data-ch-action');
      if(act==="close"){closeModal();return}
      if(act==="factory"||act==="badges"){tab=act;selectedBadge=null;renderModal();return}
      if(act.startsWith('badge:')){selectedBadge=act.slice(6);renderModal();}
    });
    document.addEventListener('keydown',ev=>{if(ev.key==="Escape"&&modal.classList.contains("is-open"))closeModal()});
    toast=document.createElement('div');toast.className='ch-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);
  }
  function announce(title,sub){
    if(!toast)return;
    toast.innerHTML='<strong>'+title+'</strong><span>'+sub+'</span>';
    toast.classList.add('visible');
    if(toastTimer)clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove('visible'),3200);
  }
  function renderHome(){
    if(!home)return;
    const n=getCorrect(),next=getNextStage(n),badges=state.unlocked.length;
    home.innerHTML='<div class="ch-home-summary"><div class="ch-home-icon">🏭</div>'+
      '<div class="ch-home-copy"><strong>チャレンジモード</strong><span>累積 '+n.toLocaleString('ja-JP')+' 問正解 · 🔥 連続 '+state.currentStreak+' 問 · 🏅 '+badges+' 個</span>'+
      '<small>'+(next?'次の工場進化まであと '+(next.at-n)+' 問':'工場の最終ステージ達成！')+'</small></div>'+
      '<button type="button" class="ch-open" id="challengeHomeOpen">工場・バッジを見る ›</button></div>';
    document.getElementById('challengeHomeOpen').onclick=openModal;
  }
  function renderModal(){
    if(!modal)return;
    const n=getCorrect(), c=getCounts(),earned=state.unlocked.length;
    modal.querySelectorAll('.ch-tabs button').forEach(b=>b.classList.toggle('active',b.getAttribute('data-ch-action')===tab));
    const target=modal.querySelector('#chModalContent');
    if(tab==="factory"){
      let milestones=STAGES.map(s=>'<div class="ch-step '+(n>=s.at?'done':'')+'"><span>'+(n>=s.at?'✓':'🔒')+'</span><div><strong>'+s.name+'</strong><small>'+s.at.toLocaleString('ja-JP')+'問正解で解放</small></div></div>').join('');
      target.innerHTML='<div class="ch-modal-stats"><div><b>'+n.toLocaleString('ja-JP')+'</b><span>累積正解</span></div>'+
        '<div><b>🔥 '+state.currentStreak+'</b><span>現在の連続正解</span></div>'+
        '<div><b>'+state.bestStreak+'</b><span>最高連続正解</span></div>'+
        '<div><b>'+earned+' / '+BADGES.length+'</b><span>獲得バッジ</span></div></div>'+
        factoryHtml(n,true)+'<h3 class="ch-section-title">工場の成長記録</h3><div class="ch-steps">'+milestones+'</div>';
    }else{
      let html='<div class="ch-badge-intro"><strong>🏅 '+earned+' / '+BADGES.length+' 個獲得</strong><span>連続正解は間違えると0に戻ります。最高記録は保存されます。</span></div>';
      for(const g of GROUPS){
        const items=BADGES.filter(b=>b.type===g);
        html+='<section class="ch-badge-section"><h3>'+g+'</h3><div class="ch-badge-grid">';
        for(const b of items){
          const has=state.unlocked.includes(b.id);
          html+='<button type="button" class="ch-badge '+(has?'earned':'locked')+(selectedBadge===b.id?' chosen':'')+'" data-ch-action="badge:'+b.id+'" aria-label="'+b.label+(has?' 獲得済み':' 未獲得')+'">'+
            '<span class="ch-badge-icon">'+(has?b.icon:'🔒')+'</span><strong>'+b.label+'</strong><small>'+(has?'獲得済み':metric(b,c)+' / '+b.at)+'</small></button>';
        }
        html+='</div></section>';
      }
      const b=BADGES.find(v=>v.id===selectedBadge);
      if(b){
        html+='<div class="ch-badge-info"><strong>'+(state.unlocked.includes(b.id)?b.icon:'🔒')+' '+b.label+'</strong><span>'+b.detail+' · '+(state.unlocked.includes(b.id)?'獲得済み':'あと '+Math.max(0,b.at-metric(b,c))+' で獲得')+'</span></div>';
      }
      html+='<p class="ch-note">※ この端末・ブラウザ内に保存されます。端末間の自動同期はありません。</p>';
      target.innerHTML=html;
    }
  }
  function openModal(){
    if(!modal)return;
    tab='factory';selectedBadge=null;renderModal();
    modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');
    const close=modal.querySelector('.ch-close');if(close)close.focus();
  }
  function closeModal(){
    if(!modal)return;
    modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');
  }
  window.challengeOnAnswer=function(e){
    if(!e||!e.valid)return;
    const before=stageFor(Math.max(0,getCorrect()-(e.isCorrect?1:0)));
    if(e.isCorrect){
      state.currentStreak++;
      state.bestStreak=Math.max(state.bestStreak,state.currentStreak);
      if(e.wasWrong)state.recoveries++;
    }else{
      state.currentStreak=0;
    }
    grant(false,before);
    renderHome();
    if(modal&&modal.classList.contains('is-open'))renderModal();
  };
  window.challengeRefresh=function(){
    renderHome();
    if(modal&&modal.classList.contains('is-open'))renderModal();
  };
  window.challengeReset=function(){
    state=blank();persist();closeModal();renderHome();
  };
  load();
  initUi();
  grant(true,null); // Existing cumulative progress is honored without flooding the screen with toasts.
  renderHome();
})();
