import { NetworkRecord } from 'lighthouse';

export type HrefMapper = (networkRecord: NetworkRecord) => string;
export type AsMapper = (networkRecord: NetworkRecord) => string | undefined;

export const DEFAULT_HREF_MAPPER: HrefMapper = (networkRecord) => networkRecord.url;
export const DEFAULT_AS_MAPPER: AsMapper = (networkRecord) => {
  if (networkRecord.resourceType === 'Script') return 'script';
  return undefined;
};

export type GeneratePreloadLinksArgs = {
  networkRecords: NetworkRecord[];
  hrefMapper?: HrefMapper;
  asMapper?: AsMapper;
};

export function generatePreloadLinks(args: GeneratePreloadLinksArgs): string {
  const hrefMapper = args.hrefMapper ?? DEFAULT_HREF_MAPPER;
  const asMapper = args.asMapper ?? DEFAULT_AS_MAPPER;
  return args.networkRecords
    .map((networkRecord) => {
      const href = hrefMapper(networkRecord);
      const as = asMapper(networkRecord);
      if (href.startsWith('data')) {
        console.log(networkRecord);
      }

      let preloadLink = `<link rel="preload"`;
      preloadLink += ` href="${href}"`;
      if (as) preloadLink += ` as="${as}"`;
      preloadLink += `>`;
      return preloadLink;
    })
    .join('\n');
}
