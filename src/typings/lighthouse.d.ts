/// <reference types="lighthouse/types/externs" />
/// <reference types="lighthouse/types/config" />
/// <reference types="lighthouse/types/artifacts" />
/// <reference types="lighthouse/types/lhr" />

declare module 'lighthouse' {
  interface NetworkRequestsAuditDetailsItem {
    url: string;
    protocol: string;
    startTime: number;
    endTime: number;
    finished: boolean;
    transferSize: number;
    resourceSize: number;
    statusCode: number;
    mimeType: string;
    resourceType: string;
  }
  interface NetworkRequestsAuditDetails {
    items: NetworkRequestsAuditDetailsItem[];
  }
  interface NetworkRequestsAudit {
    details: NetworkRequestsAuditDetails;
  }

  interface TypedResult {
    audits: {
      'network-requests': NetworkRequestsAudit;
    };
  }
  export type { TypedResult };

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
