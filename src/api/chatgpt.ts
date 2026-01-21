
// 定义 AI 需要的消息格式（轻量）
interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

// 函数接收 AIMessage[]，而不是 Messages[]
export async function getConsultantReply(aiMessages: AIMessage[]): Promise<string> {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages: aiMessages }),
  });

  if (!response.ok) {
    throw new Error("咨询师回复失败");
  }

  const data = await response.json();
  return data.reply;
}