declare module 'lighthouse' {
  // There is no official type definition provided for NetworkRecord.
  // Therefore, I guessed it from the lighthouse source code.
  // To avoid runtime errors, our type definition are designed to be conservative.
  // ref: https://github.com/GoogleChrome/lighthouse/blob/8caa938b41f3330c393fcf2a1226ffb4afe89b55/lighthouse-core/lib/network-request.js#L73
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

  declare async function lighthouse(
    url,
    flags?: LH.Flags,
    configJSON?: LH.Config.Json,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userConnection?: any,
  ): Promise<LH.RunnerResult | undefined>;
  // eslint-disable-next-line import/no-default-export
  export default lighthouse;
}
