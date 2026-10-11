"use strict";
const http=require("http"),fs=require("fs"),path=require("path");
const PUB=path.join(__dirname,"public"),PORT=process.env.PORT||3000;
const H={"Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests", "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload", "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "strict-origin-when-cross-origin", "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()", "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Resource-Policy": "same-origin"};
const T={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".woff2":"font/woff2",".txt":"text/plain; charset=utf-8",".xml":"application/xml",".mp4":"video/mp4"};
const hits=new Map();setInterval(()=>hits.clear(),60000).unref();
function send(r,c,h,b){r.writeHead(c,Object.assign({},H,h));r.end(b)}
http.createServer((q,r)=>{
  const ip=q.socket.remoteAddress,n=(hits.get(ip)||0)+1;hits.set(ip,n);
  if(n>120)return send(r,429,{"Retry-After":"60"},"Too many requests");
  if(q.method!=="GET"&&q.method!=="HEAD")return send(r,405,{Allow:"GET, HEAD"},"Method not allowed");
  let p;try{p=decodeURIComponent(new URL(q.url,"http://x").pathname)}catch(e){return send(r,400,{},"Bad request")}
  if(p.includes("\0"))return send(r,400,{},"Bad request");
  if(p.endsWith("/"))p+="index.html";
  const f=path.join(PUB,path.normalize(p));
  if(!f.startsWith(PUB+path.sep)||/(^|[\/])\.(?!well-known)/.test(path.relative(PUB,f)))return send(r,403,{},"Forbidden");
  const t=T[path.extname(f)];
  const nf=()=>fs.readFile(path.join(PUB,"404.html"),(e,d)=>send(r,404,{"Content-Type":T[".html"]},d||"Not found"));
  if(!t)return nf();
  fs.readFile(f,(e,d)=>e?nf():send(r,200,{"Content-Type":t,"Cache-Control":/\.(html)$/.test(f)?"no-cache":"public, max-age=604800"},q.method==="HEAD"?undefined:d));
}).listen(PORT,()=>console.log("BR NXTGEN site on http://localhost:"+PORT));
