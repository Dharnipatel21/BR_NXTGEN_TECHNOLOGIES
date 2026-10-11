
function goBack(){if(history.length>1&&document.referrer.indexOf(location.host)>-1)history.back();else location.href="index.html"}
const R=document.documentElement;try{const t=localStorage.getItem("th");if(t)R.dataset.theme=t}catch(e){}
document.getElementById("th").onclick=()=>{R.dataset.theme=R.dataset.theme==="dark"?"light":"dark";try{localStorage.setItem("th",R.dataset.theme)}catch(e){}};
document.getElementById("mb").onclick=()=>document.getElementById("nav").classList.toggle("on");
document.querySelectorAll(".nb>button").forEach(b=>b.onclick=()=>{const p=b.parentElement,o=p.classList.contains("open");document.querySelectorAll(".nb").forEach(n=>n.classList.remove("open"));if(!o)p.classList.add("open")});
document.querySelectorAll(".flip").forEach(f=>f.onclick=()=>f.classList.toggle("on"));
document.querySelectorAll(".back").forEach(b=>b.onclick=goBack);
document.querySelectorAll(".soc a").forEach(a=>a.addEventListener("click",e=>e.stopPropagation()));
document.querySelectorAll(".av img").forEach(i=>{const f=()=>i.remove();i.addEventListener("error",f);if(i.complete&&!i.naturalWidth)f()});
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion:reduce)").matches){const o=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}}),{threshold:.12});document.querySelectorAll(".card,.steps li,.band,main h2,.flip").forEach(el=>{el.classList.add("rv");o.observe(el)})}
const tw=document.getElementById("tw");if(tw){const w=["Digital Future","Operations","Energy Use","Product Quality","Supply Chain"];let i=0,c=w[0].length,d=true;(function s(){const t=w[i];c+=d?-1:1;tw.textContent=t.slice(0,c)||"\u00a0";let ms=d?40:80;if(d&&c<=0){d=false;i=(i+1)%w.length;ms=250}else if(!d&&c>=w[i].length){d=true;ms=1800}setTimeout(s,ms)})()}
