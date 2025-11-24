import { refreshTbmMetadata, getAllTbmMetadata } from '../datastore/metadataStore.js';

(async () => {
  // 刷新缓存（可选，如果已经有最新缓存可以省略）
  await refreshTbmMetadata();

  const all = getAllTbmMetadata();
  console.log(JSON.stringify(all, null, 2));
})();