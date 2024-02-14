import * as bModule from './b.js';  // ②
export let loaded = false;
export const b = bModule;
loaded = true;
