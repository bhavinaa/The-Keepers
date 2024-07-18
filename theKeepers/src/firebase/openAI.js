// openai.js
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const openaiInstance = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  },
});

export const getFocusTip = async () => {
    try {
      const response = await openaiInstance.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Give me a focus tip for better productivity.' }],
        max_tokens: 50,
      });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching focus tip:', error.response ? error.response.data : error.message);
      return 'Stay focused and avoid distractions!';
    }
  };
