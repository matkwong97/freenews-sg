
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

// Additional publicly advertised RSS feeds. Individual endpoints may fail and are ignored safely.
const extraFeeds=[
 ["Guardian Singapore","https://www.theguardian.com/world/singapore/rss","local"],
 ["Guardian Business","https://www.theguardian.com/business/rss","finance"],
 ["Guardian Environment","https://www.theguardian.com/environment/rss","environment"],
 ["Guardian Sport","https://www.theguardian.com/sport/rss","sports"],
 ["NPR Technology","https://feeds.npr.org/1019/rss.xml","technology"],
 ["NPR Science","https://feeds.npr.org/1007/rss.xml","science"],
 ["NPR Business","https://feeds.npr.org/1006/rss.xml","finance"],
 ["NPR Health","https://feeds.npr.org/1128/rss.xml","health"],
 ["NYT Business","https://rss.nytimes.com/services/xml/rss/nyt/Business.xml","finance"],
 ["NYT Science","https://rss.nytimes.com/services/xml/rss/nyt/Science.xml","science"],
 ["NYT Health","https://rss.nytimes.com/services/xml/rss/nyt/Health.xml","health"],
 ["NYT Asia","https://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml","regional"],
 ["NYT Sports","https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml","sports"],
 ["The Verge All","https://www.theverge.com/rss/full.xml","technology"],
 ["Hacker News","https://hnrss.org/frontpage","technology"],
 ["ScienceDaily","https://www.sciencedaily.com/rss/all.xml","science"],
 ["Phys.org","https://phys.org/rss-feed/","science"],
 ["Medical Xpress","https://medicalxpress.com/rss-feed/","health"],
 ["ESPN F1","https://www.espn.com/espn/rss/f1/news","sports"],
 ["Sky Sports F1","https://www.skysports.com/rss/12433","sports"],
 ["Sky Sports Football","https://www.skysports.com/rss/12040","sports"],
 ["ABC Australia","https://www.abc.net.au/news/feed/51120/rss.xml","regional"],
 ["ABC Business","https://www.abc.net.au/news/feed/51892/rss.xml","finance"],
 ["France24 World","https://www.france24.com/en/rss","global"],
 ["Euronews","https://www.euronews.com/rss?level=theme&name=news","global"],
 ["The Conversation Asia","https://theconversation.com/asia/articles.atom","regional"],
 ["The Conversation Tech","https://theconversation.com/global/technology/articles.atom","technology"],
 ["NASA Breaking","https://www.nasa.gov/news-release/feed/","science"],
 ["WHO News","https://www.who.int/rss-feeds/news-english.xml","health"],
 ["UN News","https://news.un.org/feed/subscribe/en/news/all/rss.xml","global"],
 ["Channel NewsAsia Commentary","https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml&category=6776","local"],
 ["Mothership Latest","https://mothership.sg/feed/","local"]
];
const allFeeds=[...feeds,...extraFeeds,...discovery.map(discoveryFeed)];
function canonicalSourceLink(link,domain){
 try{const u=new URL(link);return u.hostname===domain||u.hostname.endsWith("."+domain)||u.hostname==="news.google.com"||u.hostname==="www.google.com"}catch{return false}
}
function clean(s){return (s||"").replace(/<!\[CDATA\[|\]\]>/g,"").replace(/<[^>]*>/g," ").replace(/&(?:amp|#38);/g,"&").replace(/&(?:quot|#34);/g,'"').replace(/&(?:apos|#39);/g,"'").replace(/&nbsp;/g," ").replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/\s+/g," ").trim()}
function tag(s,n){return (s.match(new RegExp("<(?:[\\w-]+:)?"+n+"(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w-]+:)?"+n+">","i"))||[])[1]||""}
function parse(xml,source,cat){let entries=xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi)||xml.match(/<entry(?:\s[^>]*)?>[\s\S]*?<\/entry>/gi)||[];return entries.slice(0,45).map(s=>{let title=clean(tag(s,"title")),link=clean(tag(s,"link"))||((s.match(/<link[^>]+href="([^"]+)"/)||[])[1]||""),description=clean(tag(s,"description")||tag(s,"summary")||tag(s,"content")),date=tag(s,"pubDate")||tag(s,"published")||tag(s,"updated");return {title,link,description:description.slice(0,1200),date:(Number.isFinite(Date.parse(date))?new Date(date).toISOString():""),source,category:cat}}).filter(x=>x.title&&/^https?:/.test(x.link))}
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

function responseJSON(data,ttl=0){return Response.json(data,{headers:{"cache-control":ttl?`public, max-age=${ttl}`:"no-store"}})}
async function fetchWithTimeout(url,ms=6500){let c=new AbortController(),timer=setTimeout(()=>c.abort(),ms);try{return await fetch(url,{signal:c.signal,headers:{"Accept":"application/json","User-Agent":"FreeNewsSG/1.0"}})}finally{clearTimeout(timer)}}
const countryNames={SG:'Singapore',MY:'Malaysia',ID:'Indonesia',TH:'Thailand',PH:'Philippines',VN:'Vietnam',CN:'China',HK:'Hong Kong',TW:'Taiwan',JP:'Japan',KR:'South Korea',IN:'India',AU:'Australia',NZ:'New Zealand',US:'United States',GB:'United Kingdom',CA:'Canada',DE:'Germany',FR:'France'};
function eligibleJob(job,country){
 const raw=String(job.location||'').toLowerCase().trim();if(!raw)return false;
 const loc=country.toLowerCase();
 const short={Singapore:['singapore','sg'],Malaysia:['malaysia'],Indonesia:['indonesia'],Thailand:['thailand'],Philippines:['philippines'],Vietnam:['vietnam'],China:['china'],Japan:['japan'],India:['india'],Australia:['australia'],Canada:['canada'],'United States':['united states','usa','us only'],'United Kingdom':['united kingdom','uk only','great britain']};
 const terms=short[country]||[loc];
 if(terms.some(t=>new RegExp('(^|[^a-z])'+t+'([^a-z]|$)','i').test(raw)))return true;
 // Remote roles are only included when the publisher explicitly lists global eligibility.
 return /^(worldwide|anywhere|global|any location|work from anywhere|remote - worldwide)$/i.test(raw);
}
// Singapore public-sector job data: Open Government Products GitHub repository.
// This is a published, regularly refreshed dataset, NOT an authenticated MyCareersFuture API.
async function singaporeGovJobs(){
 const url='https://raw.githubusercontent.com/opengovsg/careersgovsg-jobs-data/main/data/job-listings.json';
 const r=await fetchWithTimeout(url,15000);
 if(!r.ok)throw Error('Careers@Gov dataset '+r.status);
 const data=await r.json();if(!Array.isArray(data))throw Error('Unexpected Careers@Gov dataset format');
 const now=Date.now();
 return data.filter(x=>x.jobTitle&&x.agency&&(!x.closingDate||Number(x.closingDate)>=now))
 .map(x=>{
  const platform=String(x.platform||'hrp'),jobId=String(x.jobId||''),posting=String(x.postingNo||'');
  let link='';
  if(platform==='hrp'&&jobId&&posting)link=`https://jobs.careers.gov.sg/jobs/hrp/${encodeURIComponent(jobId)}/${encodeURIComponent(posting)}`;
  else if(platform==='workable'&&posting)link=`https://apply.workable.com/j/${encodeURIComponent(posting)}`;
  else if(platform==='greenhouse'&&jobId)link=`https://jobs.careers.gov.sg/jobs/greenhouse/${encodeURIComponent(jobId)}?gh_jid=${encodeURIComponent(jobId)}`;
  return {id:'sggov-'+platform+'-'+jobId+'-'+posting,title:String(x.jobTitle),company:String(x.agency),
   location:String(x.location||'Singapore'),description:clean([x.jobDescription,x.jobResponsibilities,x.jobRequirements].filter(Boolean).join('\n\n')).slice(0,4200),
   category:[x.industry,x.field,x.functionalArea].filter(Boolean).join(' '),
   date:x.startDate?new Date(Number(x.startDate)).toISOString():'',url:link,source:'Careers@Gov (public dataset)',remote:false};
 }).filter(x=>x.url);
}
// Optional licensed API. Requires HEADCOUNT_API_KEY as a Cloudflare Worker secret.
async function singaporeHeadcountJobs(env){
 if(!env.HEADCOUNT_API_KEY)return [];
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);
 let r;try{r=await fetch('https://api.headcountlabs.com/v1/jobs?country=SG&currentness=current&limit=100',{signal:controller.signal,headers:{'Authorization':'Bearer '+env.HEADCOUNT_API_KEY,'Accept':'application/json'}})}finally{clearTimeout(timer)}
 if(!r.ok)throw Error('Headcount API '+r.status);
 const data=await r.json();const rows=Array.isArray(data)?data:(data.jobs||data.results||data.data||[]);
 if(!Array.isArray(rows))return [];
 return rows.map(x=>({id:'hc-'+String(x.id||x.job_id||x.url||''),title:String(x.title||x.job_title||''),company:String(x.company?.name||x.company_name||x.employer||''),location:'Singapore',description:clean(String(x.description||x.description_text||'')).slice(0,3500),category:String(x.category||x.industry||''),date:x.posted_at||x.date_posted||x.created_at||'',url:String(x.url||x.job_url||x.apply_url||''),source:'Headcount Labs',remote:false})).filter(x=>x.title&&x.company&&/^https:\/\//.test(x.url));
}
async function getJobs(request,env,ctx){
 const u=new URL(request.url);let code=(u.searchParams.get('country')||request.cf?.country||'').toUpperCase();
 if(!countryNames[code])return responseJSON({jobs:[],country:null,notice:'Location could not be verified. Choose your country to view eligible vacancies.',availableSources:0},0);
 const country=countryNames[code];
 const cache=caches.default,key=new Request(new URL('/_cached/jobs/'+code,request.url).href);
 let hit=await cache.match(key);if(hit)return hit;
 const results=await Promise.allSettled([
 (async()=>{let r=await fetchWithTimeout('https://remotive.com/api/remote-jobs?limit=500');if(!r.ok)throw Error('Remotive '+r.status);let j=await r.json();return (j.jobs||[]).map(x=>({id:'r'+x.id,title:x.title||'',company:x.company_name||'',location:x.candidate_required_location||'',description:clean(x.description||'').slice(0,2200),category:x.category||'',date:x.publication_date||'',url:x.url||'',source:'Remotive',remote:true}))})(),
 (async()=>{let r=await fetchWithTimeout('https://www.arbeitnow.com/api/job-board-api');if(!r.ok)throw Error('Arbeitnow '+r.status);let j=await r.json();return (j.data||[]).map(x=>({id:'a'+x.slug,title:x.title||'',company:x.company_name||'',location:x.location||'',description:clean(x.description||'').slice(0,2200),category:(x.tags||[]).join(' '),date:x.created_at?new Date(x.created_at*1000).toISOString():'',url:x.url||'',source:'Arbeitnow',remote:!!x.remote}))})(),
 ...(code==='SG'?[singaporeGovJobs(),singaporeHeadcountJobs(env)]:[])
 ]);
 let all=results.flatMap(r=>r.status==='fulfilled'?r.value:[]).filter(x=>x.title&&x.company&&/^https:\/\//.test(x.url)&&(x.source==='Careers@Gov (public dataset)'||x.source==='Headcount Labs'?code==='SG':eligibleJob(x,country)));
 const seen=new Set();all=all.filter(x=>{let k=(x.company+'|'+x.title).toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]/gu,'');if(seen.has(k))return false;seen.add(k);return true});
 all.sort((a,b)=>Date.parse(b.date||0)-Date.parse(a.date||0));
 let out=responseJSON({jobs:all,country,availableSources:results.filter(r=>r.status==='fulfilled').length,sources:code==='SG'?['Careers@Gov public dataset','Remotive','Arbeitnow',...(env.HEADCOUNT_API_KEY?['Headcount Labs']:[])]:['Remotive','Arbeitnow'],updated:new Date().toISOString(),notice:code==='SG'?(all.some(j=>j.source==='Careers@Gov (public dataset)')?'Singapore government vacancies from a publicly maintained Careers@Gov dataset, plus country-eligible jobs from other feeds. Verify current status at the source.':'Singapore government dataset unavailable or empty; showing only other verified country-eligible roles. Use the job-board links for more.'):(all.length?'Only listings explicitly eligible for this country or worldwide are shown.':'No verified country-eligible listings from the current public feeds; use the local job-board links below.')},900);
 ctx.waitUntil(cache.put(key,out.clone()));return out;
}
async function matthewMode(request,env){
 let d;try{d=await request.json()}catch{return responseJSON({notice:'Invalid request'},0)}
 let title=String(d.title||'').slice(0,300),description=String(d.description||'').slice(0,1800);
 if(!title)return responseJSON({notice:'No headline'},0);
 if(!env.AI)return responseJSON({explanation:'Aiyoh, this story is about '+title+'. But the AI explanation is not available now lah. Read the original publisher report for the full story.',ai:false},0);
 try{
 let prompt=`Explain this news in light, conversational Singapore Singlish. Equal parts funny, snarky and cheeky, but kind, respectful and never cruel to victims. Make the factual explanation clear FIRST. Use only the supplied headline and publisher excerpt; do not invent details, context, quotes or causes. 90-130 words, 2 paragraphs maximum. Make clear when excerpt lacks detail. Don't present opinions as facts. No markdown. HEADLINE: ${title} EXCERPT: ${description}`;
 let r=await env.AI.run('@cf/meta/llama-3.1-8b-instruct',{messages:[{role:'system',content:'You are Matthew Mode, a playful Singaporean news explainer. Accurate, considerate, cheeky. Never fabricate news.'},{role:'user',content:prompt}],temperature:.65,max_tokens:340});
 return responseJSON({explanation:String(r.response||'').slice(0,1400),ai:true},0)
 }catch{return responseJSON({notice:'Matthew Mode temporarily unavailable. The original story is still available.'},0)}
}
export default {async fetch(request,env,ctx){let url=new URL(request.url);if(url.pathname==="/api/jobs")return getJobs(request,env,ctx);if(url.pathname==="/api/location")return responseJSON({country:request.cf?.country||null},600);if(url.pathname==="/api/matthew"&&request.method==="POST")return matthewMode(request,env);if(url.pathname==="/api/enrich"&&request.method==="POST")return enrich(request,env);if(url.pathname==="/api/translate"&&request.method==="POST")return translate(request,env);if(url.pathname==="/api/summary"){
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
if(url.pathname!=="/api/news")return env.ASSETS.fetch(request);
const cache=caches.default,cacheKey=new Request(new URL('/_cached/news',request.url).href);
const cached=await cache.match(cacheKey);if(cached)return cached;
const pinned=allFeeds.filter(x=>x[2]==="local"||x[3]==="zh"||x[3]==="ms").slice(0,16);const others=allFeeds.filter(x=>!pinned.includes(x));const offset=(Math.floor(Date.now()/90000)*17)%others.length;const activeFeeds=[...pinned,...Array.from({length:28},(_,i)=>others[(offset+i)%others.length])];
let results=await Promise.allSettled(activeFeeds.map(async ([source,link,cat,lang,domain])=>{let controller=new AbortController();let timeout=setTimeout(()=>controller.abort(),4200);try{let r=await fetch(link,{signal:controller.signal,headers:{"User-Agent":"FreeNewsSG/1.0 (RSS news reader)"},cf:{cacheTtl:90,cacheEverything:true}});if(!r.ok)throw Error(r.status);return parse(await r.text(),source,cat).filter(a=>!domain||canonicalSourceLink(a.link,domain)).map(a=>({...a,language:lang||"en",discovery:!!domain}))}finally{clearTimeout(timeout)}}));let all=results.flatMap(x=>x.status==="fulfilled"?x.value:[]);let seen=new Set();all=all.filter(x=>{let key=x.title.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu,"").slice(0,90);if(seen.has(key))return false;seen.add(key);return true}).sort((a,b)=>new Date(b.date)-new Date(a.date));let response=new Response(JSON.stringify({articles:all,sourcesAvailable:results.filter(x=>x.status==="fulfilled"&&x.value.length).length,sourcesTotal:allFeeds.length,updated:new Date().toISOString()}),{headers:{"content-type":"application/json; charset=utf-8","cache-control":"public,max-age=90","access-control-allow-origin":"*"}});ctx.waitUntil(cache.put(cacheKey,response.clone()));return response}}
