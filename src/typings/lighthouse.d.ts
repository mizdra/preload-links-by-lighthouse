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

  interface Report {
    audits: {
      'network-requests': NetworkRequestsAudit;
    };
  }
  export type { Report };
}
