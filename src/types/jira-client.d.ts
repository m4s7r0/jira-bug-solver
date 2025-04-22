declare module 'jira-client' {
  export default class JiraApi {
    constructor(options: {
      protocol?: string;
      host: string;
      username: string;
      password: string;
      apiVersion: string;
      strictSSL: boolean;
    });

    findIssue(issueNumber: string): Promise<any>;
    addComment(issueNumber: string, comment: string): Promise<void>;
  }
} 