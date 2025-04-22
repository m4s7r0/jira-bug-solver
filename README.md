# Jira Bug Solver

An AI-powered solution that automatically generates code fixes for Jira issues using OpenAI's GPT models.

## Features

- 🔄 Automatic Jira issue monitoring via webhooks
- 🤖 AI-powered code fix generation using OpenAI
- 📝 Detailed issue analysis and solution documentation
- 🔒 Secure API key management
- 🚀 Easy deployment and configuration
- 📊 Comprehensive logging and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Jira account with API access
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/m4s7r0/jira-bug-solver.git
cd jira-bug-solver
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
# Jira Configuration
JIRA_HOST=your-instance.atlassian.net
JIRA_API_TOKEN=your-api-token
JIRA_EMAIL=your-email
JIRA_PROJECT_KEY=your-project-key

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Build the production version:
```bash
npm run build
```

3. Start the production server:
```bash
npm start
```

## Configuration

### Jira Setup
1. Create an API token in your Jira account
2. Configure webhooks in your Jira project to point to your application's `/webhook` endpoint
3. Set the appropriate project key in the environment variables

### OpenAI Setup
1. Obtain an API key from OpenAI
2. Add the API key to your environment variables

## API Endpoints

- `GET /test/:issueKey` - Test endpoint to fetch a specific Jira issue
- `POST /webhook` - Webhook endpoint for Jira issue updates

## Development

- Run tests: `npm test`
- Run linter: `npm run lint`
- Build TypeScript: `npm run build`

## Dependencies

- express: Web server framework
- jira-client: Jira API client
- openai: OpenAI API client
- dotenv: Environment variable management
- axios: HTTP client

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 