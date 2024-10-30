// d3-time@3.1.0 downloaded from https://ga.jspm.io/npm:d3-time@3.1.0/src/index.js

import{bisector as e,tickStep as t}from"d3-array";const n=new Date,s=new Date;function timeInterval(e,t,r,a){function interval(t){return e(t=0===arguments.length?new Date:new Date(+t)),t}interval.floor=t=>(e(t=new Date(+t)),t);interval.ceil=n=>(e(n=new Date(n-1)),t(n,1),e(n),n);interval.round=e=>{const t=interval(e),n=interval.ceil(e);return e-t<n-e?t:n};interval.offset=(e,n)=>(t(e=new Date(+e),null==n?1:Math.floor(n)),e);interval.range=(n,s,r)=>{const a=[];n=interval.ceil(n);r=null==r?1:Math.floor(r);if(!(n<s)||!(r>0))return a;let o;do{a.push(o=new Date(+n)),t(n,r),e(n)}while(o<n&&n<s);return a};interval.filter=n=>timeInterval((t=>{if(t>=t)while(e(t),!n(t))t.setTime(t-1)}),((e,s)=>{if(e>=e)if(s<0)while(++s<=0)while(t(e,-1),!n(e));else while(--s>=0)while(t(e,1),!n(e));}));if(r){interval.count=(t,a)=>{n.setTime(+t),s.setTime(+a);e(n),e(s);return Math.floor(r(n,s))};interval.every=e=>{e=Math.floor(e);return isFinite(e)&&e>0?e>1?interval.filter(a?t=>a(t)%e===0:t=>interval.count(0,t)%e===0):interval:null}}return interval}const r=timeInterval((()=>{}),((e,t)=>{e.setTime(+e+t)}),((e,t)=>t-e));r.every=e=>{e=Math.floor(e);return isFinite(e)&&e>0?e>1?timeInterval((t=>{t.setTime(Math.floor(t/e)*e)}),((t,n)=>{t.setTime(+t+n*e)}),((t,n)=>(n-t)/e)):r:null};const a=r.range;const o=1e3;const l=60*o;const i=60*l;const c=24*i;const u=7*c;const g=30*c;const T=365*c;const m=timeInterval((e=>{e.setTime(e-e.getMilliseconds())}),((e,t)=>{e.setTime(+e+t*o)}),((e,t)=>(t-e)/o),(e=>e.getUTCSeconds()));const v=m.range;const f=timeInterval((e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*o)}),((e,t)=>{e.setTime(+e+t*l)}),((e,t)=>(t-e)/l),(e=>e.getMinutes()));const C=f.range;const U=timeInterval((e=>{e.setUTCSeconds(0,0)}),((e,t)=>{e.setTime(+e+t*l)}),((e,t)=>(t-e)/l),(e=>e.getUTCMinutes()));const M=U.range;const h=timeInterval((e=>{e.setTime(e-e.getMilliseconds()-e.getSeconds()*o-e.getMinutes()*l)}),((e,t)=>{e.setTime(+e+t*i)}),((e,t)=>(t-e)/i),(e=>e.getHours()));const d=h.range;const k=timeInterval((e=>{e.setUTCMinutes(0,0,0)}),((e,t)=>{e.setTime(+e+t*i)}),((e,t)=>(t-e)/i),(e=>e.getUTCHours()));const D=k.range;const y=timeInterval((e=>e.setHours(0,0,0,0)),((e,t)=>e.setDate(e.getDate()+t)),((e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*l)/c),(e=>e.getDate()-1));const F=y.range;const I=timeInterval((e=>{e.setUTCHours(0,0,0,0)}),((e,t)=>{e.setUTCDate(e.getUTCDate()+t)}),((e,t)=>(t-e)/c),(e=>e.getUTCDate()-1));const Y=I.range;const W=timeInterval((e=>{e.setUTCHours(0,0,0,0)}),((e,t)=>{e.setUTCDate(e.getUTCDate()+t)}),((e,t)=>(t-e)/c),(e=>Math.floor(e/c)));const w=W.range;function timeWeekday(e){return timeInterval((t=>{t.setDate(t.getDate()-(t.getDay()+7-e)%7);t.setHours(0,0,0,0)}),((e,t)=>{e.setDate(e.getDate()+7*t)}),((e,t)=>(t-e-(t.getTimezoneOffset()-e.getTimezoneOffset())*l)/u))}const H=timeWeekday(0);const S=timeWeekday(1);const p=timeWeekday(2);const z=timeWeekday(3);const O=timeWeekday(4);const x=timeWeekday(5);const b=timeWeekday(6);const j=H.range;const q=S.range;const A=p.range;const B=z.range;const E=O.range;const G=x.range;const J=b.range;function utcWeekday(e){return timeInterval((t=>{t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-e)%7);t.setUTCHours(0,0,0,0)}),((e,t)=>{e.setUTCDate(e.getUTCDate()+7*t)}),((e,t)=>(t-e)/u))}const K=utcWeekday(0);const L=utcWeekday(1);const N=utcWeekday(2);const P=utcWeekday(3);const Q=utcWeekday(4);const R=utcWeekday(5);const V=utcWeekday(6);const X=K.range;const Z=L.range;const $=N.range;const _=P.range;const ee=Q.range;const te=R.range;const ne=V.range;const se=timeInterval((e=>{e.setDate(1);e.setHours(0,0,0,0)}),((e,t)=>{e.setMonth(e.getMonth()+t)}),((e,t)=>t.getMonth()-e.getMonth()+12*(t.getFullYear()-e.getFullYear())),(e=>e.getMonth()));const re=se.range;const ae=timeInterval((e=>{e.setUTCDate(1);e.setUTCHours(0,0,0,0)}),((e,t)=>{e.setUTCMonth(e.getUTCMonth()+t)}),((e,t)=>t.getUTCMonth()-e.getUTCMonth()+12*(t.getUTCFullYear()-e.getUTCFullYear())),(e=>e.getUTCMonth()));const oe=ae.range;const le=timeInterval((e=>{e.setMonth(0,1);e.setHours(0,0,0,0)}),((e,t)=>{e.setFullYear(e.getFullYear()+t)}),((e,t)=>t.getFullYear()-e.getFullYear()),(e=>e.getFullYear()));le.every=e=>isFinite(e=Math.floor(e))&&e>0?timeInterval((t=>{t.setFullYear(Math.floor(t.getFullYear()/e)*e);t.setMonth(0,1);t.setHours(0,0,0,0)}),((t,n)=>{t.setFullYear(t.getFullYear()+n*e)})):null;const ie=le.range;const ce=timeInterval((e=>{e.setUTCMonth(0,1);e.setUTCHours(0,0,0,0)}),((e,t)=>{e.setUTCFullYear(e.getUTCFullYear()+t)}),((e,t)=>t.getUTCFullYear()-e.getUTCFullYear()),(e=>e.getUTCFullYear()));ce.every=e=>isFinite(e=Math.floor(e))&&e>0?timeInterval((t=>{t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e);t.setUTCMonth(0,1);t.setUTCHours(0,0,0,0)}),((t,n)=>{t.setUTCFullYear(t.getUTCFullYear()+n*e)})):null;const ue=ce.range;function ticker(n,s,a,v,f,C){const U=[[m,1,o],[m,5,5*o],[m,15,15*o],[m,30,30*o],[C,1,l],[C,5,5*l],[C,15,15*l],[C,30,30*l],[f,1,i],[f,3,3*i],[f,6,6*i],[f,12,12*i],[v,1,c],[v,2,2*c],[a,1,u],[s,1,g],[s,3,3*g],[n,1,T]];function ticks(e,t,n){const s=t<e;s&&([e,t]=[t,e]);const r=n&&"function"===typeof n.range?n:tickInterval(e,t,n);const a=r?r.range(e,+t+1):[];return s?a.reverse():a}function tickInterval(s,a,o){const l=Math.abs(a-s)/o;const i=e((([,,e])=>e)).right(U,l);if(i===U.length)return n.every(t(s/T,a/T,o));if(0===i)return r.every(Math.max(t(s,a,o),1));const[c,u]=U[l/U[i-1][2]<U[i][2]/l?i-1:i];return c.every(u)}return[ticks,tickInterval]}const[ge,Te]=ticker(ce,ae,K,W,k,U);const[me,ve]=ticker(le,se,H,y,h,f);export{y as timeDay,F as timeDays,x as timeFriday,G as timeFridays,h as timeHour,d as timeHours,timeInterval,r as timeMillisecond,a as timeMilliseconds,f as timeMinute,C as timeMinutes,S as timeMonday,q as timeMondays,se as timeMonth,re as timeMonths,b as timeSaturday,J as timeSaturdays,m as timeSecond,v as timeSeconds,H as timeSunday,j as timeSundays,O as timeThursday,E as timeThursdays,ve as timeTickInterval,me as timeTicks,p as timeTuesday,A as timeTuesdays,z as timeWednesday,B as timeWednesdays,H as timeWeek,j as timeWeeks,le as timeYear,ie as timeYears,W as unixDay,w as unixDays,I as utcDay,Y as utcDays,R as utcFriday,te as utcFridays,k as utcHour,D as utcHours,r as utcMillisecond,a as utcMilliseconds,U as utcMinute,M as utcMinutes,L as utcMonday,Z as utcMondays,ae as utcMonth,oe as utcMonths,V as utcSaturday,ne as utcSaturdays,m as utcSecond,v as utcSeconds,K as utcSunday,X as utcSundays,Q as utcThursday,ee as utcThursdays,Te as utcTickInterval,ge as utcTicks,N as utcTuesday,$ as utcTuesdays,P as utcWednesday,_ as utcWednesdays,K as utcWeek,X as utcWeeks,ce as utcYear,ue as utcYears};
