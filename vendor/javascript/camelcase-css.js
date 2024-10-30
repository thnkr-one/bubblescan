// camelcase-css@2.0.1 downloaded from https://ga.jspm.io/npm:camelcase-css@2.0.1/index-es5.js

var a={};var r=/-(\w|$)/g;var e=function callback(a,r){return r.toUpperCase()};var t=function camelCaseCSS(a){a=a.toLowerCase();return"float"===a?"cssFloat":45===a.charCodeAt(0)&&109===a.charCodeAt(1)&&115===a.charCodeAt(2)&&45===a.charCodeAt(3)?a.substr(1).replace(r,e):a.replace(r,e)};a=t;var c=a;export default c;

