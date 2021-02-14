import { launch } from 'chrome-launcher';
import lighthouse, { TypedResult, NetworkRecord } from 'lighthouse';

export async function auditNetworkRequest(url: string): Promise<NetworkRecord[]> {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options: LH.Flags = { logLevel: 'info', output: 'json', onlyAudits: ['network-requests'], port: chrome.port };
  const report = await lighthouse(url, options);
  await chrome.kill();

  if (report === undefined) {
    throw new Error('Fail to generate report by lighthouse');
  }

  const result = (report.lhr as unknown) as TypedResult;

  const items = result.audits['network-requests'].details.items;
  return items;
}
