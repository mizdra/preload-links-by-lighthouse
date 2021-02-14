/// <reference types="lighthouse/types/externs" />
/// <reference types="lighthouse/types/config" />
/// <reference types="lighthouse/types/artifacts" />
/// <reference types="lighthouse/types/lhr" />

declare module 'lighthouse' {
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
    resourceType: string;
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
