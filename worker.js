
const feeds=[
["8world 新加坡","https://www.8world.com/api/v1/rss-outbound-feed?_format=xml&category=176","local","zh"],
["8world 东南亚","https://www.8world.com/api/v1/rss-outbound-feed?_format=xml&category=181","regional","zh"],
["8world 国际","https://www.8world.com/api/v1/rss-outbound-feed?_format=xml&category=191","global","zh"],
["BBC World","https://feeds.bbci.co.uk/news/world/rss.xml","global"],["BBC Technology","https://feeds.bbci.co.uk/news/technology/rss.xml","technology"],["BBC Business","https://feeds.bbci.co.uk/news/business/rss.xml","finance"],["BBC Science","https://feeds.bbci.co.uk/news/science_and_environment/rss.xml","science"],["BBC Sport","https://feeds.bbci.co.uk/sport/rss.xml","sports"],
["The Guardian World","https://www.theguardian.com/world/rss","global"],["The Guardian Tech","https://www.theguardian.com/uk/technology/rss","technology"],
["CNA Singapore","https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=10416","local"],
["CNA Asia","https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6511","regional"],
["NPR World","https://feeds.npr.org/1004/rss.xml","global"],["NPR News","https://feeds.npr.org/1001/rss.xml","global"],
["Al Jazeera","https://www.aljazeera.com/xml/rss/all.xml","global"],["DW","https://rss.dw.com/rdf/rss-en-all","global"],
["The Verge","https://www.theverge.com/rss/index.xml","technology"],["Ars Technica","https://feeds.arstechnica.com/arstechnica/index","technology"],
["TechCrunch","https://techcrunch.com/feed/","technology"],["AP News","https://apnews.com/hub/ap-top-news?output=rss","global"],
["Reuters","https://www.reutersagency.com/feed/?best-topics=top-news&post_type=best","global"],
["SCMP","https://www.scmp.com/rss/91/feed","regional"],["Mothership","https://mothership.sg/feed/","local"],
["The Independent Singapore","https://theindependent.sg/feed/","local"],["The Online Citizen","https://www.theonlinecitizen.com/feed/","local"],
["The Straits Times","https://www.straitstimes.com/news/singapore/rss.xml","local"],
["Bloomberg","https://feeds.bloomberg.com/markets/news.rss","finance"],
["ESPN","https://www.espn.com/espn/rss/news","sports"],["NASA","https://www.nasa.gov/feed/","science"],
["Stomp","https://stomp.straitstimes.com/rss.xml","local"],["NYT World","https://rss.nytimes.com/services/xml/rss/nyt/World.xml","global"],
["NYT Technology","https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml","technology"],
["CNA Latest","https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml","local"]
];
// Publisher-domain discovery through Google News RSS. These are NOT direct publisher RSS feeds.
// We only display Google News metadata with links to original coverage, and never bypass paywalls.
const discovery=[
 ["Lianhe Zaobao","zaobao.com.sg","zh","local"],
 ["Shin Min Daily News","shinmin.sg","zh","local"],
 ["Berita Harian Singapore","beritaharian.sg","ms","local"],
 ["BERITA Mediacorp","berita.mediacorp.sg","ms","local"]
];
function discoveryFeed([name,domain,lang,category]){
 const q=encodeURIComponent("site:"+domain+" when:7d");
 const locale=lang==="zh"?"hl=zh-SG&gl=SG&ceid=SG%3Azh-Hans":"hl=ms&gl=SG&ceid=SG%3Aen";
 return [name,"https://news.google.com/rss/search?q="+q+"&"+locale,category,lang,domain];
}
const allFeeds=[...feeds,...discovery.map(discoveryFeed)];
function canonicalSourceLink(link,domain){
 try{const u=new URL(link);return u.hostname===domain||u.hostname.endsWith("."+domain)||u.hostname==="news.google.com"||u.hostname==="www.google.com"}catch{return false}
}
function clean(s){return (s||"").replace(/<!\[CDATA\[|\]\]>/g,"").replace(/<[^>]*>/g," ").replace(/&(?:amp|#38);/g,"&").replace(/&(?:quot|#34);/g,'"').replace(/&(?:apos|#39);/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/\s+/g," ").trim()}
function tag(s,n){return (s.match(new RegExp("<(?:[\\w-]+:)?"+n+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?"+n+">","i"))||[])[1]||""}
function parse(xml,source,cat){let entries=xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi)||xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi)||[];return entries.slice(0,28).map(s=>{let title=clean(tag(s,"title")),link=clean(tag(s,"link"))||((s.match(/<link[^>]+href="([^"]+)"/)||[])[1]||""),description=clean(tag(s,"description")||tag(s,"summary")||tag(s,"content")),date=tag(s,"pubDate")||tag(s,"published")||tag(s,"updated");return {title,link,description:description.slice(0,1200),date:(Number.isFinite(Date.parse(date))?new Date(date).toISOString():""),source,category:cat}}).filter(x=>x.title&&/^https?:/.test(x.link))}
const MODEL="@cf/meta/llama-3.1-8b-instruct";
async function askAI(env,prompt,max_tokens=650){
 if(!env.AI)throw Error("Workers AI binding unavailable");
 const r=await env.AI.run(MODEL,{messages:[{role:"system",content:"You are a careful multilingual news editor. Never invent facts, quotes, figures, or dates. Use only the provided news excerpts. Return ONLY valid JSON."},{role:"user",content:prompt}],max_tokens,temperature:0.15});
 const out=typeof r==="string"?r:(r.response||"");
 const match=out.match(/\{[\s\S]*\}/);
 if(!match)throw Error("Invalid AI output");
 return JSON.parse(match[0]);
}
async function enrich(req,env){
 let b=await req.json(),a=b.article||{},lang=["en","zh","ms"].includes(b.lang)?b.lang:"en";
 if(typeof a.title!=="string"||!a.title||a.title.length>400||typeof a.description!=="string"||a.description.length>2000)return Response.json({error:"Invalid article"}, {status:400});
 const label={en:"English",zh:"Simplified Chinese",ms:"Malay"}[lang];
 const prompt=`Write in ${label}. From the SOURCE EXCERPT ONLY, produce a concise factual news summary of 1-2 paragraphs, ideally 70-130 words if enough evidence is available, and 2-4 short TLDR bullet points. If the excerpt is too short, make a shorter summary and say that the publisher excerpt provides limited detail. Do not add context from memory or speculate. Translate the headline naturally. JSON keys: "headline" (string), "summary" (string), "bullets" (array of strings).\nSOURCE: ${String(a.source||"").slice(0,90)}\nHEADLINE: ${a.title}\nEXCERPT: ${a.description}`;
 try{let d=await askAI(env,prompt,700);if(typeof d.headline!=="string"||typeof d.summary!=="string"||!Array.isArray(d.bullets))throw Error("Bad format");return Response.json({headline:d.headline,summary:d.summary,bullets:d.bullets.slice(0,5),ai:true})}
 catch(e){return Response.json({headline:a.title,summary:a.description||"No publisher excerpt available.",bullets:[a.description||a.title],ai:false,notice:"AI summary or translation unavailable; displaying the original publisher excerpt."})}
}
async function translate(req,env){
 const b=await req.json(),lang=["zh","ms"].includes(b.lang)?b.lang:"en",items=Array.isArray(b.items)?b.items.slice(0,18):[];
 if(lang==="en")return Response.json({titles:items.map(x=>x.title),translated:true});
 const language=lang==="zh"?"Simplified Chinese":"Malay";
 try{
 const d=await askAI(env,`Translate each news headline into ${language} accurately. Preserve names, numbers, uncertainty, and meaning. Return JSON with exactly one key "titles": an array of ${items.length} translated strings in the same order. Input: ${JSON.stringify(items.map(x=>String(x.title||"").slice(0,250)))}`,1100);
 if(!Array.isArray(d.titles)||d.titles.length!==items.length||!d.titles.every(x=>typeof x==="string"))throw Error("Wrong number of translations");
 return Response.json({titles:d.titles,translated:true})
 }catch(e){return Response.json({titles:items.map(x=>x.title),translated:false,notice:"Headline translation currently unavailable."})}
}
export default {async fetch(request,env,ctx){let url=new URL(request.url);if(url.pathname==="/api/enrich"&&request.method==="POST")return enrich(request,env);if(url.pathname==="/api/translate"&&request.method==="POST")return translate(request,env);if(url.pathname==="/api/summary"){
if(request.method!=="POST")return new Response("Method not allowed",{status:405});
let data;try{data=await request.json()}catch{return Response.json({error:"Invalid request"},{status:400})}
const lang=["en","zh","ms"].includes(data.lang)?data.lang:"en";
const title=String(data.title||"").slice(0,250),description=String(data.description||"").slice(0,2500);
if(!title||!description)return Response.json({error:"Publisher summary unavailable",mode:"unavailable"},{status:422});
if(!env.AI)return Response.json({mode:"original",summary:description,bullets:[],translated:false,note:"AI translation is not configured; original publisher description shown."});
const language={en:"English",zh:"Simplified Chinese",ms:"Malay"}[lang];
try{
const prompt=`You are a precise multilingual news editor. Write in ${language}. You have ONLY the supplied headline and publisher description, not the full article. Never invent, extrapolate or introduce facts, quotes, dates or numbers not explicitly present. Write one or two short paragraphs (max 110 words for English/Malay or 180 Chinese characters) and 2-4 concise TLDR bullets. If input lacks detail, explicitly state the summary is limited to the publisher description. Return ONLY JSON {"summary":"...","bullets":["..."],"headline":"..."}; translate the headline accurately. No markdown.`;
const r=await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast",{messages:[{role:"system",content:prompt},{role:"user",content:JSON.stringify({title,description})}],max_tokens:550,temperature:0.15});
let raw=String(r.response||"");let match=raw.match(/\{[\s\S]*\}/);if(!match)throw Error("Invalid AI response");
let out=JSON.parse(match[0]);if(typeof out.summary!=="string"||!Array.isArray(out.bullets)||typeof out.headline!=="string")throw Error("Invalid AI fields");
return Response.json({mode:"ai",translated:true,summary:out.summary.slice(0,1400),headline:out.headline.slice(0,300),bullets:out.bullets.slice(0,4).map(x=>String(x).slice(0,350))},{headers:{"cache-control":"no-store"}});
}catch(e){return Response.json({mode:"original",translated:false,summary:description,bullets:[],note:"AI summary unavailable. Showing the original publisher description."})}
}
if(url.pathname!=="/api/news")return env.ASSETS.fetch(request);let results=await Promise.allSettled(allFeeds.map(async ([source,link,cat,lang,domain])=>{let controller=new AbortController();let timeout=setTimeout(()=>controller.abort(),5500);try{let r=await fetch(link,{signal:controller.signal,headers:{"User-Agent":"FreeNewsSG/1.0 (RSS news reader)"},cf:{cacheTtl:300,cacheEverything:true}});if(!r.ok)throw Error(r.status);return parse(await r.text(),source,cat).filter(a=>!domain||canonicalSourceLink(a.link,domain)).map(a=>({...a,language:lang||"en",discovery:!!domain}))}finally{clearTimeout(timeout)}}));let all=results.flatMap(x=>x.status==="fulfilled"?x.value:[]);let seen=new Set();all=all.filter(x=>{let key=x.title.toLowerCase().normalize("NFKC").replace(/[^\\p{L}\\p{N}]/gu,"").slice(0,90);if(seen.has(key))return false;seen.add(key);return true}).sort((a,b)=>new Date(b.date)-new Date(a.date));return new Response(JSON.stringify({articles:all,sourcesAvailable:results.filter(x=>x.status==="fulfilled"&&x.value.length).length,sourcesTotal:allFeeds.length}),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","access-control-allow-origin":"*"}})}}
