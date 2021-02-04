# preload-link-generator

Generate the template with embedded preload links using puppeteer

## How to use

```bash
$ git clone https://github.com/mizdra/preload-link-generator
$ cd preload-link-generator
$ yarn install
$ yarn run dev https://web.dev/
<link rel="preload" as="script" href="https://web.dev/bootstrap.js?v=12713bd8">
<link rel="preload" as="script" href="https://web.dev/app-b9eb7802.js">
<link rel="preload" as="script" href="https://web.dev/chunk-c1eead40.js">
<link rel="preload" as="script" href="https://web.dev/default-f5cf78c3.js">
<link rel="preload" as="script" href="https://web.dev/lit-1a9275ac.js">
<link rel="preload" as="script" href="https://web.dev/chunk-cf097461.js">
<link rel="preload" as="script" href="https://web.dev/chunk-88cbc230.js">
```

## How to dev

- `yarn run start`: Run for production
- `yarn run build`: Build for production
- `yarn run dev`: Run for development
- `yarn run check`: Try static-checking
