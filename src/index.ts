import express from 'express';
import { config } from './config';
import { JiraService, AIService } from './services';
import { JiraWebhookPayload } from './types/jira';
import { logger } from './utils/logger';

const app = express();
logger.info('Initializing server...');

try {
  logger.info('Initializing Jira service...');
  const jiraService = new JiraService(config.jira);
  logger.info('Initializing AI service...');
  const aiService = new AIService(config.openai.apiKey);

  app.use(express.json());

  // Test endpoint to fetch a Jira issue
  app.get('/test/:issueKey', async (req, res) => {
    try {
      logger.info(`Attempting to fetch issue: ${req.params.issueKey}`);
      const issue = await jiraService.getIssue(req.params.issueKey);
      logger.info(`Successfully fetched issue: ${req.params.issueKey}`);
      res.json(issue);
    } catch (error: any) {
      logger.error('Error fetching issue', error);
      res.status(500).json({ error: 'Failed to fetch issue', details: error.message });
    }
  });

  app.post('/webhook', async (req, res) => {
    try {
      const payload = req.body as JiraWebhookPayload;
      
      // Check if this is a new issue in the specified project
      if (
        payload.webhookEvent === 'jira:issue_created' &&
        payload.issue.fields.project.key === config.jira.projectKey
      ) {
        logger.info(`New issue created: ${payload.issue.key}`);
        
        const bugDescription = payload.issue.fields.description;
        const solution = await aiService.generateCodeFix(bugDescription, '');
        await jiraService.updateIssue(payload.issue.key, solution);
        
        logger.info(`Solution posted for issue: ${payload.issue.key}`);
      }

      res.status(200).json({ status: 'success' });
    } catch (error: any) {
      logger.error('Error processing webhook', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  const port = config.app.port;
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
    logger.info(`Test endpoint available at: http://localhost:${port}/test/RS-1721`);
  });
} catch (error: any) {
  logger.error('Error during server initialization', error);
  process.exit(1);
} 