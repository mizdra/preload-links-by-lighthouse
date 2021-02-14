import { NetworkRecord } from 'lighthouse';

export function filterByScript(networkRecord: NetworkRecord): boolean {
  return networkRecord.protocol !== 'data' && networkRecord.resourceType === 'Script';
}
