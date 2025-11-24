import guidance from '../processing/guidanceProcessor.js';
console.log('exports:', Object.keys(guidance));
if (typeof guidance.notifyRealdataThreshold === 'function') console.log('notifyRealdataThreshold is a function');
else console.log('missing notifyRealdataThreshold');
