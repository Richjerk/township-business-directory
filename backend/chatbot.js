// backend/chatbot.js
const { Configuration, OpenAI } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

async function getChatResponse(prompt) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 150,
  });
  return response.data.choices[0].text.trim();
}

module.exports = { getChatResponse };
