// queue-microtask@1.2.3 downloaded from https://ga.jspm.io/npm:queue-microtask@1.2.3/index.js

var e="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var o={};let t;o="function"===typeof queueMicrotask?queueMicrotask.bind("undefined"!==typeof window?window:e):e=>(t||(t=Promise.resolve())).then(e).catch((e=>setTimeout((()=>{throw e}),0)));var i=o;export default i;

