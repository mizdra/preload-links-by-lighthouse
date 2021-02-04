import execa from 'execa';
import { Report } from 'lighthouse';

const url = process.argv[2];

if (url === undefined) {
  console.error('URL が渡されていません');
  console.error('preload-link-generator <URL>');
  process.exit(1);
}

(async () => {
  const { stdout } = await execa('lighthouse', [
    '--only-audits=network-requests',
    '--output',
    'json',
    '--output-path',
    'stdout',
    '--chrome-flags="--headless"',
    url,
  ]);
  const report = JSON.parse(stdout) as Report;
  const items = report.audits['network-requests'].details.items;
  const chunkItems = items.filter(
    (item) =>
      (item.mimeType === 'application/x-javascript' || item.mimeType === 'application/javascript') &&
      item.resourceType === 'Script',
  );
  for (const chunkItem of chunkItems) {
    console.log(`<link rel="preload" as="script" href="${chunkItem.url}">`);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
