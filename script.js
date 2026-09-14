const header=document.getElementById("header");
const menuBtn=document.getElementById("menuBtn");
const nav=document.getElementById("nav");
const toast=document.getElementById("toast");

window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>80));
menuBtn.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("siteSearch").addEventListener("submit",e=>{
  e.preventDefault();
  const q=document.getElementById("searchInput").value.trim().toLowerCase();
  const map=[
    {keys:["bill","pay","tax"],url:"https://www.randolph-ma.gov/331/Online-Payments"},
    {keys:["permit","building","inspection"],url:"https://www.randolph-ma.gov/154/Building"},
    {keys:["trash","recycling","water","sewer","dpw"],url:"https://www.randolph-ma.gov/280/Department-of-Public-Works"},
    {keys:["property","assessment","assessor"],url:"https://www.randolph-ma.gov/163/Assessors"},
    {keys:["job","employment","career"],url:"https://www.randolph-ma.gov/Jobs.aspx"},
    {keys:["meeting","agenda","minutes","calendar"],url:"https://www.randolph-ma.gov/AgendaCenter"}
  ];
  const hit=map.find(item=>item.keys.some(k=>q.includes(k)));
  if(hit){window.open(hit.url,"_blank");return}
  toast.textContent=q ? `No quick match for "${q}". Try bills, permits, trash, property, jobs, or meetings.` : "Type what you need first.";
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),3200);
});