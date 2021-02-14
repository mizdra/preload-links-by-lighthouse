import { launch } from 'chrome-launcher';
import lighthouse, { TypedResult } from 'lighthouse';

const url = process.argv[2];

if (url === undefined) {
  console.error('URL が渡されていません');
  console.error('preload-link-generator <URL>');
  process.exit(1);
}

(async () => {
  const chrome = await launch({ chromeFlags: ['--headless'] });
  const options: LH.Flags = { logLevel: 'info', output: 'json', onlyAudits: ['network-requests'], port: chrome.port };
  const report = await lighthouse(url, options);
  await chrome.kill();

  if (report === undefined) {
    throw new Error('Fail to generate report by lighthouse');
  }

  const result = (report.lhr as unknown) as TypedResult;

  const items = result.audits['network-requests'].details.items;
  const chunkItems = items.filter((item) => item.resourceType === 'Script');
  for (const chunkItem of chunkItems) {
    console.log(`<link rel="preload" as="script" href="${chunkItem.url}">`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
