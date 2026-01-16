import OpenAI from 'openai';

export const openRouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
        'HTTP-Referer': 'http://localhost:3000', // Optional: for OpenRouter rankings
        'X-Title': 'Zero-G Chat', // Optional: for OpenRouter rankings
    },
});
