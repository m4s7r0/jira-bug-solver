import OpenAI from 'openai';

export class AIService {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateCodeFix(bugDescription: string, context: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a senior developer tasked with fixing production bugs."
        },
        {
          role: "user",
          content: `Please provide a code fix for this bug:\n${bugDescription}\nContext:\n${context}`
        }
      ]
    });

    return response.choices[0].message.content || 'No solution generated';
  }
} 