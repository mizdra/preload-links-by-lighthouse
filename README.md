# preload-links-by-lighthouse

Generate html with embedded preload links using lighthouse

## Installation

```bash
$ npm i @mizdra/preload-links-by-lighthouse
```

## Usage

```typescript
import { auditNetworkRequest, filterByScript, generatePreloadLinks } from '@mizdra/preload-links-by-lighthouse';

(async () => {
  const networkRecords = await auditNetworkRequest('https://web.dev/', {
    // pass the lighthouse options (optional)
    logLevel: 'info',
  });
  const filteredNetworkRecords = networkRecords.filter(filterByScript);
  const html = generatePreloadLinks({ networkRecords: filteredNetworkRecords });
  console.log(html);
  // output:
  // <link rel="preload" href="https://web.dev/js/app.js?v=1d84cab8" as="script">
  // <link rel="preload" href="https://web.dev/js/default.js?v=d79b36fb" as="script">
  // <link rel="preload" href="https://www.google-analytics.com/analytics.js" as="script">
  // <link rel="preload" href="https://web.dev/js/index-725dce56.js" as="script">
  // <link rel="preload" href="https://web.dev/js/actions-2a4a4fee.js" as="script">
  // <link rel="preload" href="https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js" as="script">
  // <link rel="preload" href="https://www.gstatic.com/firebasejs/6.6.1/firebase-auth.js" as="script">
  // <link rel="preload" href="https://www.gstatic.com/firebasejs/6.6.1/firebase-performance.js" as="script">
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

## Examples

See [examples/](https://github.com/mizdra/preload-links-by-lighthouse/tree/main/example).

## For Maintainers

### How to dev

- `yarn run start`: Run for production
- `yarn run build`: Build for production
- `yarn run dev`: Run for development
- `yarn run check`: Try static-checking

### How to release

```console
$ # Wait for passing CI...
$ git switch master
$ git pull
$ yarn version
$ rm -rf dist && yarn run build
$ npm publish
$ git push --follow-tags
```
