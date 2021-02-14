// usage: yarn run ts-node --files example/3-convert-cdn-links.ts

import { URL } from 'url';
import { auditNetworkRequest, filterByScript, generatePreloadLinks } from '../src/index';

(async () => {
  const networkRecords = await auditNetworkRequest('https://web.dev/', { logLevel: 'info' });
  const filteredNetworkRecords = networkRecords.filter(filterByScript);
  const html = generatePreloadLinks({
    networkRecords: filteredNetworkRecords,
    hrefMapper: (networkRecord) => {
      const url = new URL(networkRecord.url);
      return new URL(url.pathname, 'https://example-cdn.com/').href;
    },
  });
  console.log(html);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
