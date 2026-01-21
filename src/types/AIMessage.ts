// 定义 AI 需要的消息格式（轻量）
export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}