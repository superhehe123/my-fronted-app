import { Messages } from "./Message";

export interface ChatConversation {
  consultantId: number;      // 关键：用于查询
  consultantName: string;
  consultantAvatar: string;
  userId: number;            // 后期可扩展多用户
  messages: Messages[];       // 聊天记录
}
