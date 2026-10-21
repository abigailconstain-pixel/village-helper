// Run with: node tests/check.js (no dependencies)
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const js=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const logic=js.slice(js.indexOf('function norm('),js.indexOf('function btn('));
const ctx=vm.createContext({});vm.runInContext(logic,ctx);
const cases=[
['How can I volunteer?','volunteer'],['Quiero ser voluntaria','volunteer'],
['Can I donate food?','donate'],['¿Cómo puedo donar?','donate'],
['Where is the nearest fridge?','locations'],['¿Dónde está la nevera comunitaria?','locations'],
['I need food','food'],['Necesito comida','food'],
['How can I contact them?','contact'],['Cuál es el correo de contacto','contact'],
['Is food available today?','unknown'],['Are you open now?','unknown'],
['¿Hay comida disponible hoy?','unknown'],['What are the opening hours?','unknown'],
['Do I qualify?','unknown'],['¿Cuáles son los requisitos?','unknown'],
['Can I drop off food?','donate'],['Where can I find a fridge?','locations'],
['Thank you','thanks'],['Gracias','thanks'],['xyz nonsense','unknown']];
let count=0;for(const [q,want] of cases){assert.equal(vm.runInContext(`classify(${JSON.stringify(q)})`,ctx),want,`routing: ${q}`);count++}
for(const id of ['quick','chat','form','input','send','lang','clear','copy','textsize','notice']){assert(html.includes(`id="${id}"`),`missing ${id}`);count++}
for(const path of ['who-we-are','village-volunteers','food-donation-guidelines','locate-a-fridge']){assert(html.includes(path));count++}
assert(html.includes('not an official service'));count++;
assert(html.includes('aria-live="polite"'));count++;
assert(html.includes('rel=\'noopener noreferrer\''));count++;
assert(html.includes('lang=e.target.value'));count++;
assert(!/fetch\(|localStorage\.|sessionStorage\./.test(js));count++;
console.log(`PASS: ${count} checks (routing, controls, sources, privacy and accessibility)`);
