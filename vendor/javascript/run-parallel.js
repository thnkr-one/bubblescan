// run-parallel@1.2.0 downloaded from https://ga.jspm.io/npm:run-parallel@1.2.0/index.js

import n from"queue-microtask";var e={};e=runParallel;const t=n;function runParallel(n,e){let o,l,r;let a=true;if(Array.isArray(n)){o=[];l=n.length}else{r=Object.keys(n);o={};l=r.length}function done(n){function end(){e&&e(n,o);e=null}a?t(end):end()}function each(n,e,t){o[n]=t;(0===--l||e)&&done(e)}l?r?r.forEach((function(e){n[e]((function(n,t){each(e,n,t)}))})):n.forEach((function(n,e){n((function(n,t){each(e,n,t)}))})):done(null);a=false}var o=e;export default o;

