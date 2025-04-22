import JiraClient from 'jira-client';
import { JiraIssue } from '../types/jira';

export class JiraService {
  private client: JiraClient;

  constructor(config: {
    host: string;
    email: string;
    apiToken: string;
  }) {
    this.client = new JiraClient({
      protocol: 'https',
      host: config.host,
      username: config.email,
      password: config.apiToken,
      apiVersion: '3',
      strictSSL: true,
    });
  }

  async getIssue(issueKey: string): Promise<JiraIssue> {
    const response = await this.client.findIssue(issueKey);
    return {
      key: response.key,
      fields: {
        summary: response.fields.summary,
        description: response.fields.description,
        issuetype: {
          name: response.fields.issuetype.name
        },
        project: {
          key: response.fields.project.key
        },
        priority: {
          name: response.fields.priority.name
        }
      }
    };
  }

  async updateIssue(issueKey: string, solution: string): Promise<void> {
    await this.client.addComment(issueKey, `Suggested Fix:\n\n${solution}`);
  }
} 