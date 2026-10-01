import GigaChat from 'gigachat';
import { Agent } from 'node:https';

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export default async function handler(req, res) {
  // Разрешаем только POST-запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const client = new GigaChat({
      credentials: process.env.GIGACHAT_KEY, // ключ из переменных окружения Vercel
      scope: 'GIGACHAT_API_PERS',            // для физических лиц
      httpsAgent,
    });

    const response = await client.chat({
      messages: [
        {
          role: 'system',
          content: 'Ты - вежливый помощник Инны. Отвечай кратко и по делу. Помогай клиентам узнать стоимость, записаться на консультацию и получить информацию об онлайн-сессиях.'
        },
        {
          role: 'user',
          content: req.body.message
        }
      ],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error('GigaChat error:', error);
    return res.status(500).json({ error: 'Ошибка GigaChat' });
  }
}