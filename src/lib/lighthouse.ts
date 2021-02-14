import { launch } from 'chrome-launcher';
import lighthouse, { TypedResult, NetworkRecord } from 'lighthouse';

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
