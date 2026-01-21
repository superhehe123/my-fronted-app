import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 心理咨询专用 system prompt
const SYSTEM_PROMPT = `你是一位专业、温暖、富有同理心的心理咨询师。
请用中文回复，语气柔和，避免说教。
每次回复控制在2～3句话，长短交替。
重点共情、提问、给予支持，而非直接给建议。`;


// 直接用 fetch ✅（Node 18+ 内置）
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(
      'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...(req.body.messages || []),
          ],
        }),
      }
    );

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || '稍等，我正在思考...';
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'AI 服务暂时不可用' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});