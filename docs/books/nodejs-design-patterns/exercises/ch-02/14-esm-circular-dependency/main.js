import * as a from './a.js'; // ①
import * as b from './b.js';

console.log('a ->', a);
console.log('b ->', b);

/**
a -> <ref *1> [Module: null prototype] {
  b: [Module: null prototype]  { 
        a: [Circular *1], 
        loaded: true 
    },
  loaded: true
}
b -> <ref *1> [Module: null prototype] {
  a: [Module: null prototype] { 
        b: [Circular *1], 
        loaded: true 
    },
  loaded: true
} 
 */
