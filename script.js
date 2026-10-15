const schedule = [
 {day:"Senin",code:"GHI",course:"Algoritma & Pemrograman (TI-1A)",sks:3,lecturer:"2",room:"I/5",semester:"I",type:"Teori"},
 {day:"Selasa",code:"AB",course:"Pendidikan Pancasila (TI-1A)",sks:2,lecturer:"32",room:"I/4",semester:"I",type:"Teori"},
 {day:"Selasa",code:"CDE",course:"Bahasa Inggris Untuk Keperluan Akademis (TI-1A)",sks:3,lecturer:"23",room:"I/3",semester:"I",type:"Teori"},
 {day:"Rabu",code:"AB",course:"Statistika (TI-1A)",sks:2,lecturer:"9",room:"I/1",semester:"I",type:"Teori"},
 {day:"Rabu",code:"CD",course:"Pengantar Teknologi Informasi (TI-1A)",sks:2,lecturer:"2",room:"I/2",semester:"I",type:"Teori"},
 {day:"Kamis",code:"ABC",course:"Prak. Statistika (TI-1A) GRUP A1",sks:1,lecturer:"9",room:"LAB A",semester:"I",type:"Praktikum"},
 {day:"Kamis",code:"ABC",course:"Prak. Statistika (TI-1A) GRUP A2",sks:1,lecturer:"9",room:"LAB A",semester:"I",type:"Praktikum"},
 {day:"Kamis",code:"DEF",course:"Matematika Dasar (TI-1A)",sks:3,lecturer:"22",room:"I/1",semester:"I",type:"Teori"},
 {day:"Kamis",code:"GHI",course:"Prak. Algoritma & Pemrograman (TI-1A) GRUP A1",sks:1,lecturer:"2",room:"LAB A",semester:"I",type:"Praktikum"},
 {day:"Kamis",code:"GHI",course:"Prak. Algoritma & Pemrograman (TI-1A) GRUP A2",sks:1,lecturer:"2",room:"LAB A",semester:"I",type:"Praktikum"},
 {day:"Kamis",code:"JKL",course:"Penugasan Prak. Algoritma & Pemrograman (TI-1A) GRUP A1",sks:1,lecturer:"ASS",room:"—",semester:"I",type:"Penugasan"},
 {day:"Kamis",code:"JKL",course:"Penugasan Prak. Algoritma & Pemrograman (TI-1A) GRUP A2",sks:1,lecturer:"ASS",room:"—",semester:"I",type:"Penugasan"},
 {day:"Jumat",code:"CD",course:"Bahasa Indonesia (TI-1A)",sks:2,lecturer:"24",room:"I/1",semester:"I",type:"Teori"},
 {day:"Jumat",code:"JKL",course:"Penugasan Prak. Statistika (TI-1A) GRUP A1",sks:1,lecturer:"ASS",room:"—",semester:"I",type:"Penugasan"},
 {day:"Jumat",code:"JKL",course:"Penugasan Prak. Statistika (TI-1A) GRUP A2",sks:1,lecturer:"ASS",room:"—",semester:"I",type:"Penugasan"}
];
const timeCodes = [
 {code:"AB",time:"08:00 – 09:40",period:"Pagi"},
 {code:"ABC",time:"08:00 – 10:30",period:"Pagi"},
 {code:"CD",time:"09:50 – 11:30",period:"Pagi"},
 {code:"CDE",time:"09:50 – 12:20",period:"Pagi"},
 {code:"DE",time:"10:40 – 12:20",period:"Pagi"},
 {code:"DEF",time:"10:40 – 13:10",period:"Siang"},
 {code:"EF",time:"11:40 – 13:20",period:"Siang"},
 {code:"GH",time:"14:00 – 15:40",period:"Siang"},
 {code:"GHI",time:"14:00 – 16:30",period:"Siang"},
 {code:"IJ",time:"15:50 – 17:30",period:"Sore"},
 {code:"JK",time:"16:40 – 18:20",period:"Sore"},
 {code:"JKL",time:"16:40 – 19:10",period:"Sore"}
];
const dayOrder = ["Senin","Selasa","Rabu","Kamis","Jumat"];
const timeMap = Object.fromEntries(timeCodes.map(x=>[x.code,x.time]));
const $ = id => document.getElementById(id);
let selectedDay = "Semua";
const typeOf = x => x.type;
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function renderSchedule(){
 const query = $("searchInput").value.trim().toLocaleLowerCase("id");
 const day = $("dayFilter").value;
 const type = $("typeFilter").value;
 const activeDay = day !== "Semua" ? day : selectedDay;
 const filtered = schedule.filter(x => (activeDay==="Semua"||x.day===activeDay) && (type==="Semua"||x.type===type) &&
   [x.day,x.code,x.course,x.lecturer,x.room,x.type,timeMap[x.code]].join(" ").toLocaleLowerCase("id").includes(query));
 $("scheduleList").innerHTML = "";
 let shown = 0;
 dayOrder.forEach(d=>{
  const rows=filtered.filter(x=>x.day===d);
  if(!rows.length)return;
  const label=document.createElement("div");label.className="day-group-label";label.textContent=d.toUpperCase()+" · "+rows.length+" ENTRI";$("scheduleList").appendChild(label);
  rows.forEach(x=>{
   shown++;
   const card=document.createElement("article");card.className="class-card";
   const room=x.room==="—"?"Ruang tidak dicantumkan":x.room;
   card.innerHTML=`<div class="time-block"><span class="time-code">${escapeHTML(x.code)}</span><span class="time-value">${escapeHTML(timeMap[x.code]||"Waktu belum tersedia")}</span></div>
   <div class="class-main"><h3>${escapeHTML(x.course)}</h3><div class="class-meta"><span class="meta-chip room">⌖ ${escapeHTML(room)}</span><span class="meta-chip">Dosen: ${escapeHTML(x.lecturer)}</span><span class="meta-chip">Semester ${escapeHTML(x.semester)}</span></div></div>
   <div class="class-side"><span class="type-pill type-${x.type}">${escapeHTML(x.type.toUpperCase())}</span><span class="credit">${x.sks} SKS</span></div>`;
   $("scheduleList").appendChild(card);
  });
 });
 $("emptyState").classList.toggle("hidden",shown!==0);
 $("scheduleList").classList.toggle("hidden",shown===0);
 $("resultNote").textContent=`Menampilkan ${shown} dari ${schedule.length} entri jadwal.`;
 document.querySelectorAll(".day-tab").forEach(btn=>btn.classList.toggle("active",btn.dataset.day===activeDay));
}
function renderLegend(){
 $("legendGrid").innerHTML=timeCodes.map(x=>`<article class="legend-item"><div class="legend-left"><span class="legend-code">${x.code}</span><span class="legend-label">${x.period}</span></div><span class="legend-time">${x.time}</span></article>`).join("");
}
$("searchInput").addEventListener("input",renderSchedule);
$("dayFilter").addEventListener("change",()=>{selectedDay="Semua";renderSchedule()});
$("typeFilter").addEventListener("change",renderSchedule);
document.querySelectorAll(".day-tab").forEach(btn=>btn.addEventListener("click",()=>{$("dayFilter").value="Semua";selectedDay=btn.dataset.day;renderSchedule()}));
$("resetFilters").addEventListener("click",()=>{$("searchInput").value="";$("dayFilter").value="Semua";$("typeFilter").value="Semua";selectedDay="Semua";renderSchedule()});
$("printBtn").addEventListener("click",()=>window.print());
$("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("light");$("themeToggle").textContent=document.body.classList.contains("light")?"☾":"☼";});
document.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("searchInput").focus();}});
const uniqueCourses=new Set(schedule.map(x=>x.course.replace(/ GRUP A[12]$/,""))).size;
$("courseCount").innerHTML=`${uniqueCourses} <em>nama unik</em>`;
renderLegend();renderSchedule();

// Live Next Session: calculates the current/next class from the browser's local clock.
const weekdayNames = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const weekdayIndex = {"Senin":1,"Selasa":2,"Rabu":3,"Kamis":4,"Jumat":5};
function minutesFromClock(value){const m=String(value).match(/(\d{2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):0;}
function clockText(total){const n=Math.max(0,Math.floor(total));return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}`;}
function durationText(ms){let sec=Math.max(0,Math.floor(ms/1000));const days=Math.floor(sec/86400);sec%=86400;const hours=Math.floor(sec/3600);sec%=3600;const mins=Math.floor(sec/60);const seconds=sec%60;if(days)return `${days}h ${hours}j ${mins}m`;if(hours)return `${hours}j ${mins}m`;if(mins)return `${mins}m ${seconds}d`;return `${seconds} detik`;}
function getLiveSession(now){
 const todayIndex=now.getDay();const nowMinutes=now.getHours()*60+now.getMinutes()+now.getSeconds()/60;
 // First prioritize a class currently in progress today.
 const todayName=weekdayNames[todayIndex];
 const todayClasses=schedule.filter(x=>x.day===todayName).map(x=>{const raw=timeMap[x.code]||"";const parts=raw.split(/–|-/).map(v=>v.trim());return {...x,start:minutesFromClock(parts[0]||"00:00"),end:minutesFromClock(parts[1]||parts[0]||"00:00")};}).sort((a,b)=>a.start-b.start);
 const active=todayClasses.find(x=>nowMinutes>=x.start&&nowMinutes<x.end);
 if(active){const end=new Date(now);end.setHours(Math.floor(active.end/60),active.end%60,0,0);return {item:active,state:"live",start:new Date(now.getFullYear(),now.getMonth(),now.getDate(),Math.floor(active.start/60),active.start%60),end};}
 // Otherwise search forward for the next scheduled start, including next week.
 for(let offset=0;offset<=7;offset++){
  const date=new Date(now);date.setHours(0,0,0,0);date.setDate(date.getDate()+offset);
  const name=weekdayNames[date.getDay()];if(!weekdayIndex[name])continue;
  const classes=schedule.filter(x=>x.day===name).map(x=>{const raw=timeMap[x.code]||"";const parts=raw.split(/–|-/).map(v=>v.trim());return {...x,start:minutesFromClock(parts[0]||"00:00"),end:minutesFromClock(parts[1]||parts[0]||"00:00")};}).sort((a,b)=>a.start-b.start);
  const next=classes.find(x=>offset>0||x.start>nowMinutes);
  if(next){const start=new Date(date);start.setHours(Math.floor(next.start/60),next.start%60,0,0);const end=new Date(date);end.setHours(Math.floor(next.end/60),next.end%60,0,0);return {item:next,state:"next",start,end};}
 }
 return null;
}
function updateNextSession(){
 const card=$("nextSessionCard"),now=new Date(),result=getLiveSession(now);
 if(!result){$("nextLabel").textContent="NEXT SESSION";$("nextCode").textContent="—";$("nextTime").textContent="Jadwal belum tersedia";$("nextCourse").textContent="Tidak ada sesi mendatang";$("nextStatus").textContent="";$("nextProgress").style.width="0%";card.classList.remove("is-live");return;}
 const {item,state,start,end}=result;
 $("nextLabel").textContent=state==="live"?"SESSION IN PROGRESS":"NEXT SESSION · REALTIME";
 $("nextCode").textContent=item.code;
 $("nextTime").textContent=`${clockText(item.start)} – ${clockText(item.end)}`;
 $("nextCourse").textContent=item.course.replace(/ \(TI-1A\)/g,"");
 if(state==="live"){
  $("nextStatus").textContent=`SEDANG BERLANGSUNG · selesai ${durationText(end-now)} lagi`;
  $("nextProgress").style.width=`${Math.min(100,Math.max(0,((now-start)/(end-start))*100))}%`;
  card.classList.add("is-live");
 }else{
  const dateLabel=start.toLocaleDateString("id-ID",{weekday:"short",day:"numeric",month:"short"});
  $("nextStatus").textContent=`MULAI DALAM ${durationText(start-now)} · ${dateLabel.toUpperCase()}`;
  $("nextProgress").style.width="0%";
  card.classList.remove("is-live");
 }
}
updateNextSession();setInterval(updateNextSession,1000);

// Day markers and XII DEV panel. This static demo stores markers in this browser only.
const MARKERS_KEY = "ti1a-classroom-markers-v1";
const ADMIN_USER = "admin";
const ADMIN_PASS = "ti1a2026"; // Demo credentials only; do not use for secure/public authentication.
const markerIcons = {info:"ⓘ",warning:"↗",cancel:"×",exam:"✦"};
const markerLabels = {info:"INFORMASI",warning:"PERUBAHAN JADWAL",cancel:"KELAS DITIADAKAN",exam:"KUIS / UJIAN"};
function loadMarkers(){try{return JSON.parse(localStorage.getItem(MARKERS_KEY)||"[]")}catch{return []}}
function saveMarkers(items){localStorage.setItem(MARKERS_KEY,JSON.stringify(items))}
function openModal(id){$(id).classList.remove("hidden");document.body.style.overflow="hidden"}
function closeModal(id){$(id).classList.add("hidden");if(![...document.querySelectorAll(".modal-backdrop")].some(x=>!x.classList.contains("hidden")))document.body.style.overflow=""}
document.querySelectorAll("[data-close-modal]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.dataset.closeModal)));
document.querySelectorAll(".modal-backdrop").forEach(backdrop=>backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal(backdrop.id)}));
$("adminOpenBtn").addEventListener("click",()=>{ $("loginError").classList.add("hidden"); openModal("adminModal"); });
$("aboutOpenBtn").addEventListener("click",()=>openModal("aboutModal"));
$("adminLoginForm").addEventListener("submit",e=>{
 e.preventDefault();
 if($("adminUsername").value===ADMIN_USER && $("adminPassword").value===ADMIN_PASS){
  $("adminPassword").value=""; $("loginError").classList.add("hidden"); closeModal("adminModal"); renderAdminMarkers(); openModal("adminPanelModal");
 }else{$("loginError").classList.remove("hidden")}
});
$("adminLogoutBtn").addEventListener("click",()=>closeModal("adminPanelModal"));
$("announcementForm").addEventListener("submit",e=>{
 e.preventDefault();
 const marker={id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),day:$("announcementDay").value,type:$("announcementType").value,title:$("announcementTitle").value.trim(),details:$("announcementDetails").value.trim(),date:$("announcementDate").value,color:$("announcementColor").value,createdAt:new Date().toISOString()};
 if(!marker.title)return;
 const all=loadMarkers();all.unshift(marker);saveMarkers(all);
 $("announcementTitle").value="";$("announcementDetails").value="";$("announcementDate").value="";
 renderAdminMarkers();renderPublicMarkers();
});
function renderAdminMarkers(){
 const all=loadMarkers();
 $("adminAnnouncementList").innerHTML=all.length?all.map(m=>`<div class="admin-announcement-row"><div><strong>${escapeHTML(m.day)} · ${escapeHTML(m.title)}</strong><small>${escapeHTML(markerLabels[m.type]||"INFO")}${m.date?" · "+escapeHTML(m.date):""}</small></div><button class="delete-announcement" data-delete-marker="${escapeHTML(m.id)}">Hapus</button></div>`).join(""):`<div class="empty-announcements">Belum ada penanda yang dibuat.</div>`;
 $("adminAnnouncementList").querySelectorAll("[data-delete-marker]").forEach(btn=>btn.addEventListener("click",()=>{saveMarkers(loadMarkers().filter(m=>m.id!==btn.dataset.deleteMarker));renderAdminMarkers();renderPublicMarkers()}));
}
function renderPublicMarkers(){
 const all=loadMarkers();
 const host=$("announcementList");
 if(!all.length){host.innerHTML=`<div class="empty-announcements">Belum ada penanda hari. Admin dapat menambahkan informasi kelas melalui menu Admin.</div>`;return}
 const dayIdx=Object.fromEntries(dayOrder.map((d,i)=>[d,i]));
 all.sort((a,b)=>dayIdx[a.day]-dayIdx[b.day]);
 host.innerHTML=all.map(m=>`<article class="announcement-card"><span class="announcement-mark ${escapeHTML(m.color||"purple")}">${markerIcons[m.type]||"ⓘ"}</span><div class="announcement-content"><div class="announcement-topline"><span class="announcement-day">${escapeHTML(m.day.toUpperCase())}</span><span class="announcement-kind">${escapeHTML(markerLabels[m.type]||"INFORMASI")}</span></div><h4>${escapeHTML(m.title)}</h4>${m.details?`<p>${escapeHTML(m.details)}</p>`:""}${m.date?`<span class="announcement-date">📅 ${escapeHTML(m.date)}</span>`:""}</div></article>`).join("");
}
renderPublicMarkers();
