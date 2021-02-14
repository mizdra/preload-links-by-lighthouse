// usage: yarn run ts-node --files example/1-print-preload-links.ts https://web.dev/

import { auditNetworkRequest, filterByScript, generatePreloadLinks } from '../src/index';

const url = process.argv[2];

if (url === undefined) {
  console.error('URL not passed');
  console.error('preload-link-generator <URL>');
  process.exit(1);
}

(async () => {
  const networkRecords = await auditNetworkRequest(url, {
    // pass the lighthouse options (optional)
    logLevel: 'info',
  });
  const filteredNetworkRecords = networkRecords.filter(filterByScript);
  const html = generatePreloadLinks({ networkRecords: filteredNetworkRecords });
  console.log(html);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
