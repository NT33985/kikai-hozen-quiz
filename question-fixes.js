(function(){
"use strict";
const get=(g,y,n)=>PAST.find(q=>q.grade===g&&q.year===y&&q.qno===n);
const p=(g,y,n,x)=>{const q=get(g,y,n);if(q)Object.assign(q,x);else console.warn("Question not found",g,y,n)};
const o=(g,y,n,x)=>p(g,y,n,{options:x});
o("1級",2017,32,[
"フレーキングとは、軸受が荷重を受けて回転したときに、軌道輪や転動体の表面が転がり疲れによって、うろこ状に剥がれる現象である。",
"電食とは、軌道輪と転動体との間の非常に薄い油膜を通して、微弱電流が断続して流れた場合のスパークによって発生する現象である。",
"スミアリングとは、錆が転がり軸受の内輪全面に広がる現象である。",
"フレッチングとは、接触する2面間が、相対的な繰り返し微小滑りを生じて摩耗する現象である。"]);
o("1級",2017,33,[
"ポンプ内の流れに局部的な真空を生じ、水が気化して気泡が発生することをサージングという。",
"水圧管内水量を急に遮断したときに、水流の慣性で管内に衝撃・振動水圧が発生する現象をウォータハンマという。",
"管内の圧力が、時間の変化と共に変動する現象をキャビテーションという。",
"粒子の衝突により、配管内面などが徐々に剥離する現象をコロージョンという。"]);
p("1級",2017,36,{question:"潤滑油に関する記述のうち、適切でないものはどれか。",options:[
"潤滑油は主に密封、防塵および防食を目的に使用されるものである。",
"潤滑部分の損傷状態を検出する方法にはSOAP法やフェログラフィ法がある。",
"一般的に、鉱物系油を主とした合成潤滑油は、油膜構成力が増し、温度上昇による粘度低下が防げる。",
"潤滑油の汚染の測定法には計数法と質量法とがある。質量法には汚染物の量または不溶解分の量を測定する方法がある。"]});
o("1級",2017,45,[
"プラスチックは、熱硬化性のものと熱可塑性のものに大別される。",
"エポキシ樹脂は、金属への接着力が大きく耐薬品性も良好なので、金属の接着剤や塗料に用いられる。",
"ポリアミド樹脂（ナイロン）は、強靱で耐摩耗性があり、合成繊維や歯車などの成形品としても用いられる。",
"プラスチックは、比較的強度が大きくて軽いだけでなく、一般的に衝撃強度が強く、熱による膨張変化は小さい。"]);
[26,27,29,30,32,33,35,36,38,41,42,44,45,47,49].forEach(n=>{const q=get("1級",2018,n);if(q){const i=q.options[3].indexOf("。 ");if(i>=0)q.options[3]=q.options[3].slice(0,i+1)}});
const remove=(g,y,n,i,re)=>{const q=get(g,y,n);if(q)q.options[i]=q.options[i].replace(re,"")};
remove("1級",2017,35,0,/。\s*けん\s*$/);
remove("1級",2018,33,1,/\s*しま\s*$/);
remove("1級",2018,35,0,/\s*せん\s*$/);
remove("1級",2018,36,0,/\s*すり\s*$/);
remove("1級",2018,45,1,/\s*すず\s*$/);
remove("1級",2018,45,2,/\s*さび\s*$/);
remove("1級",2018,46,0,/\s*さび\s*$/);
o("1級",2021,40,[
"油圧モータのオイルシールは、一般的に、ドレン圧力が0.3MPa程度までならば使用できる。",
"油圧シリンダの速度低下の原因の1つとして、油圧ポンプの容積効率の低下や圧力上昇の不良などが考えられる。",
"減圧弁のドレンポートに必要以上の背圧がかかると、二次側の圧力は低下する。",
"ブリードオフ回路は、メータイン回路やメータアウト回路と比べ、動力損失が大きい。"]);
o("1級",2021,41,[
"空油変換器を使用することで、シリンダの低速での動作を安定させることができる。",
"自動可変式ルブリケータには、空気の流れが少ないときも潤滑油の供給量が一定になるよう可変絞り機構が設けられている。",
"交流ソレノイドは、直流ソレノイドと比較してソレノイドコイルの焼損が発生しにくい。",
"アキュムレータに封入するガスは、窒素を使用する。"]);
o("1級",2023,31,[
"ストライエーションは、繰り返し荷重の1サイクルごとに形成される縞模様のことをいう。",
"延性ストライエーションは、へき開面に沿って形成され、腐食性雰囲気での疲労破面や亀裂進展速度が速い場合などに観察される。",
"ディンプル模様の破面は、延性破壊が起きたと推定される。",
"フラクトグラフィとは、破断面の破壊の状態を観察・解析することをいう。"]);
p("1級",2023,47,{question:"材料力学に関する記述のうち、適切なものはどれか。",options:[
"断面積40mm²の丸棒に1,600Nの引張荷重が働いているときの引張応力は64N/mm²である。",
"両端支持ばりで、中央に500Nの集中荷重が作用して釣り合っているとき、2つの支点の反力はそれぞれ500Nである。",
"機械構造用炭素鋼鋼材の基準強さが570MPaのとき、許容応力を190MPaとすると、安全率は5となる。",
"長さ5mの丸棒を引っ張ったときの縦ひずみが0.1％の場合、伸びは5mmである。"]});
o("2級",2022,31,[
"スクラッチングとは、境界潤滑膜が切れて直接歯面同士が接触し、温度上昇を起こして溶着が発生する現象である。",
"スコーリングとは、歯面に過大荷重が繰返し加わり、歯面表面下の組織に過大応力が生じ、かなりの厚さで金属剥離が発生する現象である。",
"ピッチングとは、歯面の凹凸の高い部分に荷重が集中し、この荷重によって細かい亀裂が生じ、その亀裂が進展してピンホールが発生する現象である。",
"ポリッシングとは、潤滑油中の不純物や異物などがかみ込み、歯面の滑り方向に擦り傷が発生する現象である。"]);
o("2級",2022,39,[
"浸透探傷試験は、赤色や蛍光の浸透性のよい検査液を用いて、表面の欠陥を検出する方法である。",
"渦電流探傷試験は、導電性のある試験体の近くに交流を通じたコイルを接近させ、電磁誘導現象によって試験体に発生した渦電流の変化を検出して探傷試験を行う方法である。",
"磁粉探傷試験は、被検査物を磁化した状態で、傷によって生じる漏洩磁束を磁粉もしくは検査コイルを用いて検出する方法である。",
"超音波探傷試験は、稼働中の測定物から放出される超音波をセンサで検出して、破壊が発生する前にその予兆を調べる方法である。"]);
p("2級",2022,29,{question:"下図に示すノギスにおいて、内側用ジョウと呼ばれる部位として、適切なものはどれか。"});
p("2級",2022,41,{question:"下図に示す空気圧シリンダにおいて、タイロッドと呼ばれる部位として、適切なものはどれか。",options:["A","B","C","D"]});
o("2級",2022,50,["1,000","1,100","1,500","1,600"]);
o("2級",2025,31,[
"ポンプに発生したキャビテーション対策の1つとして、吸込側のフィルタの清掃を行うことが挙げられる。",
"ポンプに発生したキャビテーション対策の1つとして、吸込揚程を大きくすることが挙げられる。",
"ポンプに発生したキャビテーション対策の1つとして、吸込配管の内径を大きくすることが挙げられる。",
"うず巻きポンプから流体が規定量吐出されない原因の1つとして、インペラへの異物付着が挙げられる。"]);
p("1級",2025,5,{question:"下図に示す回路は、自己保持回路を形成している。"});
for(const y of [2021,2023,2024,2025])o("1級",y,50,["図ア（上から1番目）","図イ（上から2番目）","図ウ（上から3番目）","図エ（上から4番目）"]);
const ruby35=get("1級",2017,35);if(ruby35&&ruby35.options[0]&&!ruby35.options[0].endsWith("。"))ruby35.options[0]+="。";
const ruby1936=get("1級",2019,36);if(ruby1936)ruby1936.options[1]=ruby1936.options[1].replace(/。\s*すり\s*$/,"。");
for(const q of PAST){q.options=q.options.map(t=>t.replace(/([ぁ-んァ-ン一-龯]) ([ぁ-んァ-ン一-龯])/g,"$1$2"));q.question=q.question.replace(/([ぁ-んァ-ン一-龯]) ([ぁ-んァ-ン一-龯])/g,"$1$2");}
for(const [g,y,n] of [["1級",2024,40],["2級",2022,32]]){const q=get(g,y,n);if(!q)continue;PAST.splice(PAST.indexOf(q),1);const i=ALL.indexOf(q);if(i>=0)ALL.splice(i,1);}
const st=document.createElement("style");
st.textContent=".fig{width:auto;height:auto;max-width:100%;max-height:none;object-fit:contain;cursor:zoom-in}.opt{height:auto;min-height:53px;overflow-wrap:anywhere}.opt>span:last-child{white-space:pre-wrap;line-height:1.55;flex:1;min-width:0}.figZoom{position:fixed;inset:0;background:rgba(10,22,37,.90);z-index:20000;display:none;align-items:center;justify-content:center;padding:55px 8px 24px;overflow:auto}.figZoom.on{display:flex}.figZoom img{max-width:calc(100vw - 16px);max-height:calc(100vh - 85px);object-fit:contain;background:white}.figZoom button{position:fixed;top:12px;right:12px;width:auto;color:black;background:white}";
document.head.appendChild(st);
const z=document.createElement("div");z.className="figZoom";z.innerHTML='<button type="button">✕ 閉じる</button><img alt="問題図を拡大">';document.body.appendChild(z);
const close=()=>z.classList.remove("on");z.querySelector("button").onclick=close;z.onclick=e=>{if(e.target===z)close()};document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
document.getElementById("quizCard").addEventListener("click",e=>{if(e.target instanceof HTMLImageElement&&e.target.classList.contains("fig")){z.querySelector("img").src=e.target.src;z.classList.add("on")}});
function circuit(y){
const c=document.createElement("canvas");c.width=480;c.height=365;const a=c.getContext("2d");a.fillStyle="white";a.fillRect(0,0,480,365);a.strokeStyle="#111";a.fillStyle="#111";a.lineWidth=2.5;a.lineJoin="round";a.lineCap="round";a.font="22px Arial";
const l=(x,y,X,Y)=>{a.beginPath();a.moveTo(x,y);a.lineTo(X,Y);a.stroke()},dot=(x,y)=>{a.beginPath();a.arc(x,y,4,0,Math.PI*2);a.fill()},t=(s,x,y)=>a.fillText(s,x,y);
if(y===2024)t("P",73,59);l(95,52,365,52);dot(220,52);l(220,52,220,80);l(220,80,220,102);l(208,128,232,94);l(220,128,220,150);dot(220,150);t("BS1",106,116);t("E−",162,116);
l(220,150,220,166);l(205,179,220,200);l(220,204,220,222);dot(220,222);t("BS2",106,202);t("E−",163,202);l(220,150,330,150);l(330,150,330,171);
if(y===2024){l(320,202,340,170);l(330,202,330,222);l(325,187,337,191)}else{l(315,197,330,177);l(330,203,330,222)}
l(330,222,220,222);t("MC",345,191);l(220,222,220,255);a.strokeRect(178,255,84,43);t("MC",195,284);l(220,298,220,326);l(95,326,365,326);dot(220,326);if(y===2024)t("N",73,332);return c.toDataURL("image/png");}
try{for(const y of [2024,2025]){const q=get("1級",y,5);if(q)q.questionImage=circuit(y)}}catch(e){console.warn("Circuit correction unavailable",e)}
function pad(g,y,n,bottom,right,draw){const q=get(g,y,n);if(!q||!q.questionImage)return;const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=img.naturalWidth+right;c.height=img.naturalHeight+bottom;const a=c.getContext("2d");a.fillStyle="white";a.fillRect(0,0,c.width,c.height);a.drawImage(img,0,0);if(draw)draw(a,img.naturalWidth,img.naturalHeight);q.questionImage=c.toDataURL("image/png")};img.src=q.questionImage;}
pad("2級",2022,29,28,18,(a,w,h)=>{a.font="24px serif";a.fillStyle="#111";a.fillText("C",187,h+23)});
pad("2級",2022,41,60,75,(a,w,h)=>{a.fillStyle="white";a.fillRect(258,169,88,13);a.strokeStyle="#111";a.fillStyle="#111";a.lineWidth=1.4;a.font="25px serif";a.beginPath();a.moveTo(266,169);a.lineTo(285,211);a.moveTo(305,165);a.lineTo(328,211);a.moveTo(344,96);a.lineTo(390,147);a.stroke();a.fillText("B",279,235);a.fillText("C",324,235);a.fillText("D",390,170)});
pad("1級",2024,50,30,12,null);
refreshFilters();updateStats();console.info("Question audit patches loaded",PAST.length);
})();