import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';

export interface NetworkRecord {
  url: string;
  protocol: string;
  startTime: number;
  endTime: number;
  finished: boolean;
  transferSize: number;
  resourceSize: number;
  statusCode: number;
  mimeType: string;
  resourceType:
    | 'XHR'
    | 'Fetch'
    | 'EventSource'
    | 'Script'
    | 'Stylesheet'
    | 'Image'
    | 'Media'
    | 'Font'
    | 'Document'
    | 'TextTrack'
    | 'WebSocket'
    | 'Other'
    | 'Manifest'
    | 'SignedExchange'
    | 'Ping'
    | 'CSPViolationReport'
    | string; // conservatively
}

export interface NetworkRequestsAuditDetails {
  items: NetworkRecord[];
}
export interface NetworkRequestsAudit {
  details: NetworkRequestsAuditDetails;
}

export interface TypedResult {
  audits: {
    'network-requests': NetworkRequestsAudit;
  };
}

const DEFAULT_OPTIONS: LH.Flags = {
  output: 'json',
  onlyAudits: ['network-requests'],
};

export async function auditNetworkRequest(url: string, lighthouseOptions?: LH.Flags): Promise<NetworkRecord[]> {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const report = await lighthouse(url, {
    ...DEFAULT_OPTIONS,
    ...lighthouseOptions,
    port: chrome.port,
  });
  await chrome.kill();

  if (report === undefined) {
    throw new Error('Fail to generate report by lighthouse');
  }

  const result = (report.lhr as unknown) as TypedResult;

  const items = result.audits['network-requests'].details.items;
  return items;
}
