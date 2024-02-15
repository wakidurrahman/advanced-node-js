import * as aModule from './a.js'; // ③ our cycle), but since `a.js` has already been visited from step ①, this path is not explored again
export let loaded = false;
export const a = aModule;
loaded = true;
