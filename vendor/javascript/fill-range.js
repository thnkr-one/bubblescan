// fill-range@7.1.1 downloaded from https://ga.jspm.io/npm:fill-range@7.1.1/index.js

import*as t from"util";import*as e from"to-regex-range";var r=t;try{"default"in t&&(r=t.default)}catch(t){}var n=e;try{"default"in e&&(n=e.default)}catch(t){}var s={};const a=r;const i=n;const isObject=t=>t!==null&&typeof t==="object"&&!Array.isArray(t);const transform=t=>e=>t===true?Number(e):String(e);const isValidValue=t=>typeof t==="number"||typeof t==="string"&&t!=="";const isNumber=t=>Number.isInteger(+t);const zeros=t=>{let e=`${t}`;let r=-1;e[0]==="-"&&(e=e.slice(1));if(e==="0")return false;while(e[++r]==="0");return r>0};const stringify=(t,e,r)=>typeof t==="string"||typeof e==="string"||r.stringify===true;const pad=(t,e,r)=>{if(e>0){let r=t[0]==="-"?"-":"";r&&(t=t.slice(1));t=r+t.padStart(r?e-1:e,"0")}return r===false?String(t):t};const toMaxLen=(t,e)=>{let r=t[0]==="-"?"-":"";if(r){t=t.slice(1);e--}while(t.length<e)t="0"+t;return r?"-"+t:t};const toSequence=(t,e,r)=>{t.negatives.sort(((t,e)=>t<e?-1:t>e?1:0));t.positives.sort(((t,e)=>t<e?-1:t>e?1:0));let n=e.capture?"":"?:";let s="";let a="";let i;t.positives.length&&(s=t.positives.map((t=>toMaxLen(String(t),r))).join("|"));t.negatives.length&&(a=`-(${n}${t.negatives.map((t=>toMaxLen(String(t),r))).join("|")})`);i=s&&a?`${s}|${a}`:s||a;return e.wrap?`(${n}${i})`:i};const toRange=(t,e,r,n)=>{if(r)return i(t,e,{wrap:false,...n});let s=String.fromCharCode(t);if(t===e)return s;let a=String.fromCharCode(e);return`[${s}-${a}]`};const toRegex=(t,e,r)=>{if(Array.isArray(t)){let e=r.wrap===true;let n=r.capture?"":"?:";return e?`(${n}${t.join("|")})`:t.join("|")}return i(t,e,r)};const rangeError=(...t)=>new RangeError("Invalid range arguments: "+a.inspect(...t));const invalidRange=(t,e,r)=>{if(r.strictRanges===true)throw rangeError([t,e]);return[]};const invalidStep=(t,e)=>{if(e.strictRanges===true)throw new TypeError(`Expected step "${t}" to be a number`);return[]};const fillNumbers=(t,e,r=1,n={})=>{let s=Number(t);let a=Number(e);if(!Number.isInteger(s)||!Number.isInteger(a)){if(n.strictRanges===true)throw rangeError([t,e]);return[]}s===0&&(s=0);a===0&&(a=0);let i=s>a;let l=String(t);let o=String(e);let u=String(r);r=Math.max(Math.abs(r),1);let f=zeros(l)||zeros(o)||zeros(u);let g=f?Math.max(l.length,o.length,u.length):0;let c=f===false&&stringify(t,e,n)===false;let p=n.transform||transform(c);if(n.toRegex&&r===1)return toRange(toMaxLen(t,g),toMaxLen(e,g),true,n);let h={negatives:[],positives:[]};let push=t=>h[t<0?"negatives":"positives"].push(Math.abs(t));let m=[];let v=0;while(i?s>=a:s<=a){n.toRegex===true&&r>1?push(s):m.push(pad(p(s,v),g,c));s=i?s-r:s+r;v++}return n.toRegex===true?r>1?toSequence(h,n,g):toRegex(m,null,{wrap:false,...n}):m};const fillLetters=(t,e,r=1,n={})=>{if(!isNumber(t)&&t.length>1||!isNumber(e)&&e.length>1)return invalidRange(t,e,n);let s=n.transform||(t=>String.fromCharCode(t));let a=`${t}`.charCodeAt(0);let i=`${e}`.charCodeAt(0);let l=a>i;let o=Math.min(a,i);let u=Math.max(a,i);if(n.toRegex&&r===1)return toRange(o,u,false,n);let f=[];let g=0;while(l?a>=i:a<=i){f.push(s(a,g));a=l?a-r:a+r;g++}return n.toRegex===true?toRegex(f,null,{wrap:false,options:n}):f};const fill=(t,e,r,n={})=>{if(e==null&&isValidValue(t))return[t];if(!isValidValue(t)||!isValidValue(e))return invalidRange(t,e,n);if(typeof r==="function")return fill(t,e,1,{transform:r});if(isObject(r))return fill(t,e,0,r);let s={...n};s.capture===true&&(s.wrap=true);r=r||s.step||1;return isNumber(r)?isNumber(t)&&isNumber(e)?fillNumbers(t,e,r,s):fillLetters(t,e,Math.max(Math.abs(r),1),s):r==null||isObject(r)?fill(t,e,1,r):invalidStep(r,s)};s=fill;var l=s;export{l as default};

