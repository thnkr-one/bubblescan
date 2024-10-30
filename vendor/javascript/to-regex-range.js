// to-regex-range@5.0.1 downloaded from https://ga.jspm.io/npm:to-regex-range@5.0.1/index.js

import t from"is-number";var e={};const r=t;const toRegexRange=(t,e,n)=>{if(false===r(t))throw new TypeError("toRegexRange: expected the first argument to be a number");if(void 0===e||t===e)return String(t);if(false===r(e))throw new TypeError("toRegexRange: expected the second argument to be a number.");let a={relaxZeros:true,...n};"boolean"===typeof a.strictZeros&&(a.relaxZeros=false===a.strictZeros);let s=String(a.relaxZeros);let l=String(a.shorthand);let o=String(a.capture);let i=String(a.wrap);let u=t+":"+e+"="+s+l+o+i;if(toRegexRange.cache.hasOwnProperty(u))return toRegexRange.cache[u].result;let c=Math.min(t,e);let f=Math.max(t,e);if(1===Math.abs(c-f)){let r=t+"|"+e;return a.capture?`(${r})`:false===a.wrap?r:`(?:${r})`}let h=hasPadding(t)||hasPadding(e);let p={min:t,max:e,a:c,b:f};let g=[];let d=[];if(h){p.isPadded=h;p.maxLen=String(p.max).length}if(c<0){let t=f<0?Math.abs(f):1;d=splitToPatterns(t,Math.abs(c),p,a);c=p.a=0}f>=0&&(g=splitToPatterns(c,f,p,a));p.negatives=d;p.positives=g;p.result=collatePatterns(d,g,a);true===a.capture?p.result=`(${p.result})`:false!==a.wrap&&g.length+d.length>1&&(p.result=`(?:${p.result})`);toRegexRange.cache[u]=p;return p.result};function collatePatterns(t,e,r){let n=filterPatterns(t,e,"-",false,r)||[];let a=filterPatterns(e,t,"",false,r)||[];let s=filterPatterns(t,e,"-?",true,r)||[];let l=n.concat(s).concat(a);return l.join("|")}function splitToRanges(t,e){let r=1;let n=1;let a=countNines(t,r);let s=new Set([e]);while(t<=a&&a<=e){s.add(a);r+=1;a=countNines(t,r)}a=countZeros(e+1,n)-1;while(t<a&&a<=e){s.add(a);n+=1;a=countZeros(e+1,n)-1}s=[...s];s.sort(compare);return s}function rangeToPattern(t,e,r){if(t===e)return{pattern:t,count:[],digits:0};let n=zip(t,e);let a=n.length;let s="";let l=0;for(let t=0;t<a;t++){let[e,a]=n[t];e===a?s+=e:"0"!==e||"9"!==a?s+=toCharacterClass(e,a,r):l++}l&&(s+=true===r.shorthand?"\\d":"[0-9]");return{pattern:s,count:[l],digits:a}}function splitToPatterns(t,e,r,n){let a=splitToRanges(t,e);let s=[];let l=t;let o;for(let t=0;t<a.length;t++){let e=a[t];let i=rangeToPattern(String(l),String(e),n);let u="";if(r.isPadded||!o||o.pattern!==i.pattern){r.isPadded&&(u=padZeros(e,r,n));i.string=u+i.pattern+toQuantifier(i.count);s.push(i);l=e+1;o=i}else{o.count.length>1&&o.count.pop();o.count.push(i.count[0]);o.string=o.pattern+toQuantifier(o.count);l=e+1}}return s}function filterPatterns(t,e,r,n,a){let s=[];for(let a of t){let{string:t}=a;n||contains(e,"string",t)||s.push(r+t);n&&contains(e,"string",t)&&s.push(r+t)}return s}function zip(t,e){let r=[];for(let n=0;n<t.length;n++)r.push([t[n],e[n]]);return r}function compare(t,e){return t>e?1:e>t?-1:0}function contains(t,e,r){return t.some(t=>t[e]===r)}function countNines(t,e){return Number(String(t).slice(0,-e)+"9".repeat(e))}function countZeros(t,e){return t-t%Math.pow(10,e)}function toQuantifier(t){let[e=0,r=""]=t;return r||e>1?`{${e+(r?","+r:"")}}`:""}function toCharacterClass(t,e,r){return`[${t}${e-t===1?"":"-"}${e}]`}function hasPadding(t){return/^-?(0+)\d/.test(t)}function padZeros(t,e,r){if(!e.isPadded)return t;let n=Math.abs(e.maxLen-String(t).length);let a=false!==r.relaxZeros;switch(n){case 0:return"";case 1:return a?"0?":"0";case 2:return a?"0{0,2}":"00";default:return a?`0{0,${n}}`:`0{${n}}`}}toRegexRange.cache={};toRegexRange.clearCache=()=>toRegexRange.cache={};e=toRegexRange;var n=e;export default n;

