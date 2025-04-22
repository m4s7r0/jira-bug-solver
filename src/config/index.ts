import dotenv from 'dotenv';

dotenv.config();

export const config = {
  jira: {
    host: process.env.JIRA_HOST!,
    email: process.env.JIRA_EMAIL!,
    apiToken: process.env.JIRA_API_TOKEN!,
    projectKey: process.env.JIRA_PROJECT_KEY!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
}; 