import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

function generate(collections, typography) {
 const all=collections.flatMap(c=>c.variables.map(v=>({...v,collection:c.collection})));
 const byId=new Map(all.map(v=>[v.id,v]));
 const cssNames=new Set();
 for(const v of all) {
  if(cssNames.has(v.cssName)) throw Error("Duplicate CSS name "+v.cssName);
  cssNames.add(v.cssName);
  if(!/^--[a-z0-9-]+$/.test(v.cssName)) throw Error("Invalid CSS name");
  for(const mode of v.collection.modes) if(!(mode.modeId in v.valuesByMode)) throw Error("Missing mode: "+v.name);
 }
 function resolve(v,modeName,seen=[]) {
  if(seen.includes(v.id)) throw Error("Alias cycle: "+v.id);
  const mode=v.collection.modes.find(m=>m.name===modeName)||v.collection.modes.find(m=>m.modeId===v.collection.defaultModeId);
  const value=v.valuesByMode[mode.modeId];
  if(value?.type==="VARIABLE_ALIAS") {
   const target=byId.get(value.id);
   if(!target||target.type!==v.type) throw Error("Missing or mismatched alias: "+v.name);
   return resolve(target,modeName,[...seen,v.id]);
  }
  if(v.type==="FLOAT" && (typeof value!=="number"||!Number.isFinite(value))) throw Error("Bad number");
  if(v.type==="STRING" && typeof value!=="string") throw Error("Bad string");
  if(v.type==="COLOR" && !["r","g","b","a"].every(k=>typeof value[k]==="number"&&value[k]>=0&&value[k]<=1)) throw Error("Bad color");
  return value;
 }
 for(const v of all) for(const mode of v.collection.modes) resolve(v,mode.name);
 const n=x=>String(Number(x.toFixed(9)));
 function cssValue(v,modeName) {
  const mode=v.collection.modes.find(m=>m.name===modeName)||v.collection.modes.find(m=>m.modeId===v.collection.defaultModeId);
  const val=v.valuesByMode[mode.modeId];
  if(val?.type==="VARIABLE_ALIAS") return `var(${byId.get(val.id).cssName})`;
  if(v.type==="COLOR") return `rgb(${n(val.r*100)}% ${n(val.g*100)}% ${n(val.b*100)}% / ${n(val.a)})`;
  if(v.type==="FLOAT") return `${val}px`;
  if(v.type==="STRING") return JSON.stringify(val);
  throw Error("Unsupported variable type");
 }
 const banner="/* Generated from ../tokens/*.json by ../build.mjs. Do not edit by hand.\n   Staged only: the website does not import this file. */\n\n";
 let variables=banner;
 for(const mode of ["Desktop","Mobile"]) {
  variables+=mode==="Desktop"?'[data-ds="portfolio"] {\n':'[data-ds="portfolio"][data-ds-responsive="mobile"] {\n';
  for(const c of collections) {
   variables+=`  /* ${c.collection.name} */\n`;
   for(const v of c.variables) variables+=`  ${v.cssName}: ${cssValue(byId.get(v.id),mode)};\n`;
  }
  variables+="}\n\n";
 }
 const seenStyles=new Set();
 let text= banner+"/* Apply data-ds-text using the exact, case-sensitive Figma style name.\n   Paragraph spacing is applied only between direct child <p> elements. */\n\n";
 const unit=x=>x.unit==="AUTO"?"normal":x.unit==="PIXELS"?`${x.value}px`:`${x.value/100}em`;
 for(const s of typography.styles) {
  if(seenStyles.has(s.name)) throw Error("Duplicate style name");
  seenStyles.add(s.name);
  function binding(property,fallback) {
   const ref=s.boundVariables?.[property];
   if(!ref) return fallback;
   const target=byId.get(ref.id);
   if(!target) throw Error("Unknown style binding");
   return `var(${target.cssName})`;
  }
  const weight={Regular:400,Italic:400,Medium:500,SemiBold:600,Bold:700}[s.fontName.style];
  if(!weight) throw Error("Unknown font style "+s.fontName.style);
  const transform={UPPER:"uppercase",LOWER:"lowercase",TITLE:"capitalize",ORIGINAL:"none"}[s.textCase];
  const decoration={NONE:"none",UNDERLINE:"underline",STRIKETHROUGH:"line-through"}[s.textDecoration];
  if(!transform||!decoration) throw Error("Unsupported text property");
  const attr=`[data-ds-text=${JSON.stringify(s.name)}]`;
  const selectors=`[data-ds="portfolio"]${attr},\n[data-ds="portfolio"] ${attr}`;
  const props={
   "font-family":binding("fontFamily",JSON.stringify(s.fontName.family))+", sans-serif",
   "font-weight":String(weight),
   "font-style":s.fontName.style==="Italic"?"italic":"normal",
   "font-size":binding("fontSize",`${s.fontSize}px`),
   "line-height":binding("lineHeight",s.lineHeight.unit==="PERCENT"?`${s.lineHeight.value/100}`:unit(s.lineHeight)),
   "letter-spacing":binding("letterSpacing",unit(s.letterSpacing)),
   "text-transform":transform,
   "text-decoration-line":decoration,
   "text-indent":`${s.paragraphIndent}px`,
   "--ds-paragraph-spacing":binding("paragraphSpacing",`${s.paragraphSpacing}px`)
  };
  text+=selectors+" {\n"+Object.entries(props).map(([k,v])=>`  ${k}: ${v};`).join("\n")+"\n}\n\n";
  const children=suffix=>`[data-ds="portfolio"]${attr}${suffix},\n[data-ds="portfolio"] ${attr}${suffix}`;
  text+=children(" > p")+" {\n  margin: 0;\n}\n"+children(" > p + p")+" {\n  margin-block-start: var(--ds-paragraph-spacing);\n}\n\n";
 }
 return {"variables.css":variables,"typography.css":text,"effects.css":banner+"/* No local effect styles exist in the source Figma file.\n   No shadows, blurs, or other effects have been invented. */\n"};
}

const root = new URL('./', import.meta.url);
const read = name => JSON.parse(readFileSync(new URL('tokens/' + name + '.json', root), 'utf8'));
const collections = ['primitives', 'semantic', 'mapped', 'responsive'].map(read);
const output = generate(collections, read('typography'));
const check = process.argv.includes('--check');
if (!check) mkdirSync(new URL('styles/', root), { recursive: true });
for (const [name, content] of Object.entries(output)) {
  const path = new URL('styles/' + name, root);
  if (check) {
    if (readFileSync(path, 'utf8') !== content) throw new Error('Generated file is out of date: ' + name);
  } else writeFileSync(path, content);
}
console.log('Validated ' + collections.reduce((n, c) => n + c.variables.length, 0) + ' variables and ' + read('typography').styles.length + ' text styles. CSS ' + (check ? 'matches source.' : 'regenerated.'));
