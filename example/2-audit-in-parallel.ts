// usage: yarn run ts-node --files example/2-audit-in-parallel.ts

import { resolve } from 'path';
import Piscina from 'piscina';
import { filterByScript, generatePreloadLinks, NetworkRecord } from '../src/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function uniqueBy<T extends Record<any, any>, U extends keyof T>(array: T[], field: U): T[] {
  const result: T[] = [];
  const keys: T[U][] = [];
  for (const item of array) {
    if (!keys.includes(item[field])) {
      result.push(item);
      keys.push(item[field]);
    }
  }
  return result;
}

const piscina = new Piscina({ filename: resolve(__dirname, '2-audit-in-parallel/worker.js') });

(async () => {
  const [topNetworkRecords, blogNetworkRecords] = await Promise.all([
    piscina.runTask({ url: 'https://web.dev/' }) as Promise<NetworkRecord[]>,
    piscina.runTask({ url: 'https://web.dev/blog/' }) as Promise<NetworkRecord[]>,
  ]);
  const networkRecords = [...topNetworkRecords, ...blogNetworkRecords]; // merge
  const filteredNetworkRecords = uniqueBy(networkRecords, 'url') // exclude duplicates
    .sort((a, b) => a.startTime - b.startTime) // asc by startTime
    .filter(filterByScript);
  const html = generatePreloadLinks({ networkRecords: filteredNetworkRecords });
  console.log(html);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
