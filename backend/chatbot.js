const { Configuration, OpenAIApi } = require('openai'); // Ensure this line is correct

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this variable in your .env
});

const openai = new OpenAIApi(configuration);

async function getChatResponse(prompt) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo', // or any model you are using
    messages: [{ role: 'user', content: prompt }],
  });
  return response.data.choices[0].message.content;
}

module.exports = { getChatResponse };

