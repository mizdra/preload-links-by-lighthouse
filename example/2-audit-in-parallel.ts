import * as cluster from 'cluster';
import { auditNetworkRequest, filterByScript, generatePreloadLinks } from '../src/index';

(async () => {
  if (cluster.isMaster) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cluster.fork({ URL: 'https://web.dev/' });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    cluster.fork({ URL: 'https://web.dev/blog/' });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const url = process.env.URL!;
    const networkRecords = await auditNetworkRequest(url, { logLevel: 'info' });
    const filteredNetworkRecords = networkRecords.filter(filterByScript);
    const html = generatePreloadLinks({ networkRecords: filteredNetworkRecords });
    console.log({ url, html });
    cluster.worker.disconnect();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
