// braces@3.0.3 downloaded from https://ga.jspm.io/npm:braces@3.0.3/index.js

import*as e from"fill-range";var t={};t.isInteger=e=>typeof e==="number"?Number.isInteger(e):typeof e==="string"&&e.trim()!==""&&Number.isInteger(Number(e));t.find=(e,t)=>e.nodes.find((e=>e.type===t));t.exceedsLimit=(e,n,r=1,s)=>s!==false&&(!(!t.isInteger(e)||!t.isInteger(n))&&(Number(n)-Number(e))/Number(r)>=s);t.escapeNode=(e,t=0,n)=>{const r=e.nodes[t];if(r&&(n&&r.type===n||r.type==="open"||r.type==="close")&&r.escaped!==true){r.value="\\"+r.value;r.escaped=true}};t.encloseBrace=e=>{if(e.type!=="brace")return false;if(e.commas>>0+e.ranges>>0===0){e.invalid=true;return true}return false};t.isInvalidBrace=e=>{if(e.type!=="brace")return false;if(e.invalid===true||e.dollar)return true;if(e.commas>>0+e.ranges>>0===0){e.invalid=true;return true}if(e.open!==true||e.close!==true){e.invalid=true;return true}return false};t.isOpenOrClose=e=>e.type==="open"||e.type==="close"||(e.open===true||e.close===true);t.reduce=e=>e.reduce(((e,t)=>{t.type==="text"&&e.push(t.value);t.type==="range"&&(t.type="text");return e}),[]);t.flatten=(...e)=>{const t=[];const flat=e=>{for(let n=0;n<e.length;n++){const r=e[n];Array.isArray(r)?flat(r):r!==void 0&&t.push(r)}return t};flat(e);return t};var n={};const r=t;n=(e,t={})=>{const stringify=(e,n={})=>{const s=t.escapeInvalid&&r.isInvalidBrace(n);const o=e.invalid===true&&t.escapeInvalid===true;let a="";if(e.value)return(s||o)&&r.isOpenOrClose(e)?"\\"+e.value:e.value;if(e.value)return e.value;if(e.nodes)for(const t of e.nodes)a+=stringify(t);return a};return stringify(e)};var s=n;var o=e;try{"default"in e&&(o=e.default)}catch(e){}var a={};const l=o;const u=t;const compile$1=(e,t={})=>{const walk=(e,n={})=>{const r=u.isInvalidBrace(n);const s=e.invalid===true&&t.escapeInvalid===true;const o=r===true||s===true;const a=t.escapeInvalid===true?"\\":"";let i="";if(e.isOpen===true)return a+e.value;if(e.isClose===true){console.log("node.isClose",a,e.value);return a+e.value}if(e.type==="open")return o?a+e.value:"(";if(e.type==="close")return o?a+e.value:")";if(e.type==="comma")return e.prev.type==="comma"?"":o?e.value:"|";if(e.value)return e.value;if(e.nodes&&e.ranges>0){const n=u.reduce(e.nodes);const r=l(...n,{...t,wrap:false,toRegex:true,strictZeros:true});if(r.length!==0)return n.length>1&&r.length>1?`(${r})`:r}if(e.nodes)for(const t of e.nodes)i+=walk(t,e);return i};return walk(e)};a=compile$1;var i=a;var p=e;try{"default"in e&&(p=e.default)}catch(e){}var c={};const A=p;const R=s;const _=t;const append=(e="",t="",n=false)=>{const r=[];e=[].concat(e);t=[].concat(t);if(!t.length)return e;if(!e.length)return n?_.flatten(t).map((e=>`{${e}}`)):t;for(const s of e)if(Array.isArray(s))for(const e of s)r.push(append(e,t,n));else for(let e of t){n===true&&typeof e==="string"&&(e=`{${e}}`);r.push(Array.isArray(e)?append(s,e,n):s+e)}return _.flatten(r)};const expand$1=(e,t={})=>{const n=t.rangeLimit===void 0?1e3:t.rangeLimit;const walk=(e,r={})=>{e.queue=[];let s=r;let o=r.queue;while(s.type!=="brace"&&s.type!=="root"&&s.parent){s=s.parent;o=s.queue}if(e.invalid||e.dollar){o.push(append(o.pop(),R(e,t)));return}if(e.type==="brace"&&e.invalid!==true&&e.nodes.length===2){o.push(append(o.pop(),["{}"]));return}if(e.nodes&&e.ranges>0){const r=_.reduce(e.nodes);if(_.exceedsLimit(...r,t.step,n))throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");let s=A(...r,t);s.length===0&&(s=R(e,t));o.push(append(o.pop(),s));e.nodes=[];return}const a=_.encloseBrace(e);let l=e.queue;let u=e;while(u.type!=="brace"&&u.type!=="root"&&u.parent){u=u.parent;l=u.queue}for(let t=0;t<e.nodes.length;t++){const n=e.nodes[t];if(n.type!=="comma"||e.type!=="brace")n.type!=="close"?n.value&&n.type!=="open"?l.push(append(l.pop(),n.value)):n.nodes&&walk(n,e):o.push(append(o.pop(),l,a));else{t===1&&l.push("");l.push("")}}return l};return _.flatten(walk(e))};c=expand$1;var f=c;var C={};C={MAX_LENGTH:1e4,CHAR_0:"0",CHAR_9:"9",CHAR_UPPERCASE_A:"A",CHAR_LOWERCASE_A:"a",CHAR_UPPERCASE_Z:"Z",CHAR_LOWERCASE_Z:"z",CHAR_LEFT_PARENTHESES:"(",CHAR_RIGHT_PARENTHESES:")",CHAR_ASTERISK:"*",CHAR_AMPERSAND:"&",CHAR_AT:"@",CHAR_BACKSLASH:"\\",CHAR_BACKTICK:"`",CHAR_CARRIAGE_RETURN:"\r",CHAR_CIRCUMFLEX_ACCENT:"^",CHAR_COLON:":",CHAR_COMMA:",",CHAR_DOLLAR:"$",CHAR_DOT:".",CHAR_DOUBLE_QUOTE:'"',CHAR_EQUAL:"=",CHAR_EXCLAMATION_MARK:"!",CHAR_FORM_FEED:"\f",CHAR_FORWARD_SLASH:"/",CHAR_HASH:"#",CHAR_HYPHEN_MINUS:"-",CHAR_LEFT_ANGLE_BRACKET:"<",CHAR_LEFT_CURLY_BRACE:"{",CHAR_LEFT_SQUARE_BRACKET:"[",CHAR_LINE_FEED:"\n",CHAR_NO_BREAK_SPACE:" ",CHAR_PERCENT:"%",CHAR_PLUS:"+",CHAR_QUESTION_MARK:"?",CHAR_RIGHT_ANGLE_BRACKET:">",CHAR_RIGHT_CURLY_BRACE:"}",CHAR_RIGHT_SQUARE_BRACKET:"]",CHAR_SEMICOLON:";",CHAR_SINGLE_QUOTE:"'",CHAR_SPACE:" ",CHAR_TAB:"\t",CHAR_UNDERSCORE:"_",CHAR_VERTICAL_LINE:"|",CHAR_ZERO_WIDTH_NOBREAK_SPACE:"\ufeff"};var E=C;var d={};const y=s;const{MAX_LENGTH:H,CHAR_BACKSLASH:v,CHAR_BACKTICK:g,CHAR_COMMA:h,CHAR_DOT:T,CHAR_LEFT_PARENTHESES:m,CHAR_RIGHT_PARENTHESES:L,CHAR_LEFT_CURLY_BRACE:S,CHAR_RIGHT_CURLY_BRACE:x,CHAR_LEFT_SQUARE_BRACKET:I,CHAR_RIGHT_SQUARE_BRACKET:O,CHAR_DOUBLE_QUOTE:N,CHAR_SINGLE_QUOTE:B,CHAR_NO_BREAK_SPACE:U,CHAR_ZERO_WIDTH_NOBREAK_SPACE:b}=E;const parse$1=(e,t={})=>{if(typeof e!=="string")throw new TypeError("Expected a string");const n=t||{};const r=typeof n.maxLength==="number"?Math.min(H,n.maxLength):H;if(e.length>r)throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${r})`);const s={type:"root",input:e,nodes:[]};const o=[s];let a=s;let l=s;let u=0;const i=e.length;let p=0;let c=0;let A;const advance=()=>e[p++];const push=e=>{e.type==="text"&&l.type==="dot"&&(l.type="text");if(!l||l.type!=="text"||e.type!=="text"){a.nodes.push(e);e.parent=a;e.prev=l;l=e;return e}l.value+=e.value};push({type:"bos"});while(p<i){a=o[o.length-1];A=advance();if(A!==b&&A!==U)if(A!==v)if(A!==O)if(A!==I)if(A!==m)if(A!==L)if(A!==N&&A!==B&&A!==g)if(A!==S)if(A!==x)if(A===h&&c>0){if(a.ranges>0){a.ranges=0;const e=a.nodes.shift();a.nodes=[e,{type:"text",value:y(a)}]}push({type:"comma",value:A});a.commas++}else if(A===T&&c>0&&a.commas===0){const e=a.nodes;if(c===0||e.length===0){push({type:"text",value:A});continue}if(l.type==="dot"){a.range=[];l.value+=A;l.type="range";if(a.nodes.length!==3&&a.nodes.length!==5){a.invalid=true;a.ranges=0;l.type="text";continue}a.ranges++;a.args=[];continue}if(l.type==="range"){e.pop();const t=e[e.length-1];t.value+=l.value+A;l=t;a.ranges--;continue}push({type:"dot",value:A})}else push({type:"text",value:A});else{if(a.type!=="brace"){push({type:"text",value:A});continue}const e="close";a=o.pop();a.close=true;push({type:e,value:A});c--;a=o[o.length-1]}else{c++;const e=l.value&&l.value.slice(-1)==="$"||a.dollar===true;const t={type:"brace",open:true,close:false,dollar:e,depth:c,commas:0,ranges:0,nodes:[]};a=push(t);o.push(a);push({type:"open",value:A})}else{const e=A;let n;t.keepQuotes!==true&&(A="");while(p<i&&(n=advance()))if(n!==v){if(n===e){t.keepQuotes===true&&(A+=n);break}A+=n}else A+=n+advance();push({type:"text",value:A})}else{if(a.type!=="paren"){push({type:"text",value:A});continue}a=o.pop();push({type:"text",value:A});a=o[o.length-1]}else{a=push({type:"paren",nodes:[]});o.push(a);push({type:"text",value:A})}else{u++;let e;while(p<i&&(e=advance())){A+=e;if(e!==I)if(e!==v){if(e===O){u--;if(u===0)break}}else A+=advance();else u++}push({type:"text",value:A})}else push({type:"text",value:"\\"+A});else push({type:"text",value:(t.keepEscaping?A:"")+advance()})}do{a=o.pop();if(a.type!=="root"){a.nodes.forEach((e=>{if(!e.nodes){e.type==="open"&&(e.isOpen=true);e.type==="close"&&(e.isClose=true);e.nodes||(e.type="text");e.invalid=true}}));const e=o[o.length-1];const t=e.nodes.indexOf(a);e.nodes.splice(t,1,...a.nodes)}}while(o.length>0);push({type:"eos"});return s};d=parse$1;var K=d;var P={};const w=s;const M=i;const G=f;const D=K;
/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */const braces=(e,t={})=>{let n=[];if(Array.isArray(e))for(const r of e){const e=braces.create(r,t);Array.isArray(e)?n.push(...e):n.push(e)}else n=[].concat(braces.create(e,t));t&&t.expand===true&&t.nodupes===true&&(n=[...new Set(n)]);return n};
/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */braces.parse=(e,t={})=>D(e,t)
/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */;braces.stringify=(e,t={})=>w(typeof e==="string"?braces.parse(e,t):e,t);
/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */braces.compile=(e,t={})=>{typeof e==="string"&&(e=braces.parse(e,t));return M(e,t)};
/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */braces.expand=(e,t={})=>{typeof e==="string"&&(e=braces.parse(e,t));let n=G(e,t);t.noempty===true&&(n=n.filter(Boolean));t.nodupes===true&&(n=[...new Set(n)]);return n};
/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */braces.create=(e,t={})=>e===""||e.length<3?[e]:t.expand!==true?braces.compile(e,t):braces.expand(e,t);P=braces;var F=P;export{F as default};

