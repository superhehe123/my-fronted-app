import { ChatConversation } from "../types/ChatConversion";
import { Messages } from "../types/Message";

const mockChatConversions : ChatConversation[] = [
    {
    consultantId: 1,
    consultantName: '张医生',
    consultantAvatar: '/images/doctor1.jpg',
    userId: 1001,
    messages: [
      // —————— 更早（2025-12-17） ——————
      { id: 1, sender: 'user', content: '老师，我最近一直在调整作息。', time: '2025-12-17T10:30:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 2, sender: 'consultant', content: '很好，坚持下去，作息规律很重要。', time: '2025-12-17T10:35:00+08:00', avatar: '/images/doctor1.jpg' },

      // —————— 更早（2026-01-12） ——————
      { id: 3, sender: 'user', content: '我最近焦虑感有些增加，不知道该怎么办。', time: '2026-01-12T14:20:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 4, sender: 'consultant', content: '可以试试呼吸练习或者短时间散步，让自己缓解紧张情绪。', time: '2026-01-12T14:25:00+08:00', avatar: '/images/doctor1.jpg' },

      // —————— 昨天（2026-01-19） ——————
      { id: 5, sender: 'user', content: '老师，我今晚又失眠了……', time: '2026-01-19T21:45:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 6, sender: 'consultant', content: '辛苦了。能说说是什么让你难以入睡吗？', time: '2026-01-19T21:47:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 7, sender: 'user', content: '脑子里一直在回放白天的事，越想越焦虑。', time: '2026-01-19T21:49:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 8, sender: 'consultant', content: '这种“反刍思维”很常见。我们可以试试：把想法写下来，告诉自己“明天再处理它”。', time: '2026-01-19T21:52:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 9, sender: 'user', content: '写下来真的有用吗？', time: '2026-01-19T21:54:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 10, sender: 'consultant', content: '它能帮你把“脑海里的噪音”转移到纸上，减少大脑的负担。今晚可以试试看。', time: '2026-01-19T21:56:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 11, sender: 'user', content: '好，我现在就拿本子写。谢谢您这么晚还回复我。', time: '2026-01-19T21:58:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 12, sender: 'consultant', content: '不用谢，照顾好自己是最重要的。晚安，愿你今夜能安稳入睡。🌙', time: '2026-01-19T22:00:00+08:00', avatar: '/images/doctor1.jpg' },

      // —————— 今天（2026-01-20） ——————
      { id: 13, sender: 'consultant', content: '早上好！昨晚休息得怎么样？', time: '2026-01-20T08:30:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 14, sender: 'user', content: '比前几晚好一些，虽然还是醒了一次，但没那么慌了。', time: '2026-01-20T08:35:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 15, sender: 'consultant', content: '这是很好的进步！睡眠像肌肉，需要慢慢训练。', time: '2026-01-20T08:37:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 16, sender: 'user', content: '嗯，我会继续练习。对了，今天工作压力还是很大……', time: '2026-01-20T08:40:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 17, sender: 'consultant', content: '可以具体说说是什么任务让你感到压力吗？', time: '2026-01-20T08:42:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 18, sender: 'user', content: '有个项目明天要交，但我总觉得做得不够好。', time: '2026-01-20T08:44:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 19, sender: 'consultant', content: '“不够好”是事实，还是你对自己的苛责？', time: '2026-01-20T08:46:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 20, sender: 'user', content: '可能是后者……同事都说我已经做得很好了。', time: '2026-01-20T08:48:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 21, sender: 'consultant', content: '那就相信他们的反馈，也试着相信自己。完成比完美更重要。', time: '2026-01-20T08:50:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 22, sender: 'user', content: '这句话让我松了一口气。', time: '2026-01-20T08:52:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 23, sender: 'consultant', content: '你值得拥有这份轻松。', time: '2026-01-20T08:54:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 24, sender: 'user', content: '对了，上次您说的“每天10分钟放松”，我坚持了三天！', time: '2026-01-20T08:56:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 25, sender: 'consultant', content: '太棒了！这说明你已经在为自己创造空间了。👏', time: '2026-01-20T08:58:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 26, sender: 'user', content: '虽然只是泡茶发呆，但感觉整个人没那么紧绷了。', time: '2026-01-20T09:00:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 27, sender: 'consultant', content: '微小的改变，往往带来巨大的不同。', time: '2026-01-20T09:02:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 28, sender: 'user', content: '嗯！我会继续坚持下去的。', time: '2026-01-20T09:04:00+08:00', avatar: '/images/user-avatar.jpg' },
      { id: 29, sender: 'consultant', content: '我相信你。如果今天又有情绪波动，记得停下来，深呼吸三次。', time: '2026-01-20T09:06:00+08:00', avatar: '/images/doctor1.jpg' },
      { id: 30, sender: 'user', content: '好的，我记住了。', time: '2026-01-20T09:08:00+08:00', avatar: '/images/user-avatar.jpg' }
    ]
  },
  {
    consultantId: 2,
    consultantName: '李医生',
    consultantAvatar: '/images/doctor1.jpg',
    userId: 1001,
    messages: [
      {
        id: 1,
        sender: 'consultant',
        content: '你好，我们开始吧。',
        time: '2026-01-20T09:16:00.000Z',
        avatar: '/images/doctor1.jpg'
      }
    ]
  }
];

// 模拟获取与某咨询师的聊天记录
export async function getConversationByConsultantId( consultantId: number): Promise<ChatConversation | undefined> {
    await new Promise((resolve) =>  setTimeout(resolve, 100) )
    return mockChatConversions.find(c => c.consultantId === consultantId);
}

// 调用后端API获取咨询师回复
export async function getConsultantReply(messages: { role: string; content: string }[]): Promise<string> {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // ✅ 传整个 messages 数组
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("咨询师回复失败");
  }

  const data = await response.json();
  return data.reply;
}