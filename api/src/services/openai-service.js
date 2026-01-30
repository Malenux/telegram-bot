const OpenAI = require('openai')

module.exports = class OpenAIService {
  constructor () {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  async getAssistants () {
    const myAssistants = await this.openai.beta.assistants.list({
      order: 'desc',
      limit: '20'
    })

    return myAssistants.data
  }

  async createThread () {
    const thread = await this.openai.beta.threads.create()
    return thread.id
  }

  async createMessage ({ threadId, assistantId, prompt }) {
    await this.openai.beta.threads.messages.create(
      threadId,
      {
        role: 'user',
        content: prompt
      }
    )

    const run = await this.openai.beta.threads.runs.createAndPoll(
      threadId,
      {
        assistant_id: assistantId
      }
    )

    return this.runStatus({ run, threadId })
  }

  async runStatus ({ run, threadId }) {
    if (run.status === 'completed') {
      const messages = await this.openai.beta.threads.messages.list(threadId)
      return {
        status: 'completed',
        answer: messages.data[0].content[0].text.value
      }
    }

    if (
      run.required_action &&
      run.required_action.submit_tool_outputs &&
      run.required_action.submit_tool_outputs.tool_calls
    ) {
      return {
        status: 'requires_action',
        tools: run.required_action.submit_tool_outputs.tool_calls
      }
    }

    throw new Error(`Run status not supported: ${run.status}`)
  }

  async submitToolOutputs ({ threadId, runId, toolOutputs }) {
    const run = await this.openai.beta.threads.runs.submitToolOutputs(
      runId,
      {
        thread_id: threadId,
        tool_outputs: toolOutputs
      }
    )

    return this.runStatus({ run, threadId })
  }
}
