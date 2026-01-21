
type Sender = 'consultant' | 'user';

export interface Messages {
  id: number;
  sender: Sender;
  content: string;
  time: string; // 新增时间字段
  avatar?: string; // 可选头像
}
