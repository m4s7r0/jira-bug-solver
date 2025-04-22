export interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    description: string;
    issuetype: {
      name: string;
    };
    project: {
      key: string;
    };
    priority: {
      name: string;
    };
  };
}

export interface JiraWebhookPayload {
  webhookEvent: string;
  issue: JiraIssue;
} 