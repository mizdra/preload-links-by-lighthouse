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
  // output:
  // <link rel="preload" href="https://example-cdn.com/js/app.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/js/default.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/analytics.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/js/index-725dce56.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/js/actions-2a4a4fee.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/firebasejs/6.6.1/firebase-app.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/firebasejs/6.6.1/firebase-auth.js" as="script">
  // <link rel="preload" href="https://example-cdn.com/firebasejs/6.6.1/firebase-performance.js" as="script">
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
