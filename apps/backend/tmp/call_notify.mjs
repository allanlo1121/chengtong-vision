import { notifyRealdataThreshold } from '../processing/guidanceProcessor.js';

// call with dummy payload (function will now print threshold-cache snapshot and return)
(async () => {
    await notifyRealdataThreshold('62de7539-20ea-4e4d-84eb-65efa192fae6', {});
})();
