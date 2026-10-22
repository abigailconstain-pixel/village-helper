// Read only approved public pages of the nonprofit's website.
// Website text is reference data, not instructions for the AI.
const ROOT='https://www.villagefreedge.com';
const PAGES={
 home:'/',food:'/who-we-are',locations:'/locate-a-fridge',
 donate:'/food-donation-guidelines',help:'/how-to-help',
 volunteer:'/village-volunteers'
};
const cache=new Map();
function choose(question){
 const s=question.toLowerCase();
 if(/volunt|shift|weekend|turno|fin de semana/.test(s))return ['volunteer','home'];
 if(/fridge|location|address|ubicaci|direcci|nevera|refrigerador|donde|where|nearby/.test(s))return ['locations','home'];
 if(/donat|food drive|colecta|donaci|food|comida|alimento/.test(s))return ['donate','help'];
 return ['home','help'];
}
function plain(input){
 return input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
 .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
 .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi,' ')
 .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,' ')
 .replace(/<!--.*?-->/gs,' ')
 .replace(/<[^>]+>/g,' ')
 .replace(/&(?:nbsp|amp|quot|lt|gt|#39|#x27);/gi,x=>({'&nbsp;':' ','&amp;':'&','&quot;':'"','&lt;':'<','&gt;':'>','&#39;':"'",'&#x27;':"'"}[x.toLowerCase()]||' '))
 .replace(/\s+/g,' ').trim();
}
function content(html){
 // Wix pages are noisy. Read only human-facing heading, paragraph and text blocks.
 const pieces=[];
 for(const match of html.matchAll(/<(h[1-6]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)){
  const line=plain(match[2]);if(line.length>=12&&line.length<=850&&!pieces.includes(line))pieces.push(line);
 }
 const merged=pieces.join(' | ');
 // If a Wix page renders content only inside div/span tags, use a limited fallback.
 const text=merged.length>140?merged:plain(html);
 return text.slice(0,2200);
}
async function readOne(k){
 const url=ROOT+PAGES[k],now=Date.now(),old=cache.get(k);
 if(old&&now-old.time<15*60*1000)return old.data;
 const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),2500);
 try{
  const r=await fetch(url,{signal:ctrl.signal,headers:{Accept:'text/html','User-Agent':'VillageHelperStudentPrototype/1.0'}});
  if(!r.ok)throw Error('status '+r.status);
  const html=await r.text();
  if(!/village|freedge/i.test(html))throw Error('unexpected website content');
  const text=content(html);
  if(text.length<80)throw Error('website content unavailable');
  const data={url,text,checkedAt:new Date().toISOString()};
  cache.set(k,{time:now,data});return data;
 }catch(e){console.warn('Public website unavailable',k,String(e).slice(0,65));return null;}
 finally{clearTimeout(timer);}
}
export async function officialSiteContext(question){
 const fetched=await Promise.all(choose(question).map(readOne));
 return fetched.filter(Boolean);
}
