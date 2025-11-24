import * as t from '../services/thresholdService.js';

const snap = t.getMergedCacheSnapshot();
console.log('snapshot keys length', Object.keys(snap).length);
console.log('sample keys', Object.keys(snap).slice(0, 10));
console.log('sample value for first key', snap[Object.keys(snap)[0]] || null);
