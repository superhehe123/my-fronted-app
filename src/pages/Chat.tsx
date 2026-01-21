import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatWindow from '../components/Chat/ChatWindow';
import ChatHeader from '../components/Chat/ChatHeader';
import { Consultant } from '../types/Consultant';
import { fetchConsultantDetail } from '../api/consultant';
import { Messages } from '../types/Message';
import { getConversationByConsultantId } from '../api/chatbox';
import { getConsultantReply } from '../api/chatgpt';
import { set } from 'date-fns';

const Chat: React.FC = () => {
  
  const { consultantId } = useParams<{ consultantId: string }>();
  const [consultant, setConsultant] = useState<Consultant|null>(null);
  const [messages, setMessages] = useState<Messages[]>([]); // 消息列表
  const storageKey = `chat${consultantId}`; // 本地存储 key

  // 模拟获取咨询师数据
  const loadConsultantData = async (id: string) => {
     try {
      const data = await fetchConsultantDetail(id);
      if (data) {
        setConsultant(data);
      } else {
        alert('咨询师不存在');
      }
    } catch (err) {
      console.error('加载失败:', err);
      alert('加载咨询师信息失败');
    }
  }
  
  // 从本地存储加载消息
  const loadMessagesFromStorage = () : Messages[]=> {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        return [];
      }
    }
    return [];
  }
  
  // 保存消息到本地存储
  const saveMessagesToStorage = (msgs: Messages[]) => {
    localStorage.setItem(storageKey, JSON.stringify(msgs));
  }

  // 模拟获取消息数据
  const loadMessages = async () => {
    const data = await getConversationByConsultantId(Number(consultantId));
    setMessages(data?.messages || []);
  }

  // 发送消息处理函数
  const handleSend = async (content: string) => {
    if (!consultantId || !content.trim()) return;
    const newMessage: Messages = {
      id: Date.now(), // 临时 id（真实 id 由后端生成）
      sender: 'user',
      content,
      avatar: '/images/user-avatar.jpg',
      time: new Date().toISOString(),
    };
    // 立刻更新 UI（用户体验）
    setMessages(prev => {
      const updated = [...prev, newMessage];  
      saveMessagesToStorage(updated); // 保存到本地
      return updated;
    });

    let replyText = '咨询师暂时无法回复，请稍后再试';    
    try {
      // 调用 ChatGPT 接口获取咨询师回复
      const aiMessages = [...messages, newMessage].map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }as const));
      replyText = await getConsultantReply(aiMessages);
    } catch (error) {
      console.error(error);
      replyText = '咨询师当前无法回复，请稍后再试';
    }
    const newMessageConsultant: Messages = {
      id: Date.now() + 1, // 临时 id（真实 id 由后端生成）
      sender: 'consultant',
      content: replyText,
      avatar: '/images/doctor1.jpg',
      time: new Date().toISOString(),
    };

    setMessages(prev => {
      const updated = [...prev, newMessageConsultant];  
      saveMessagesToStorage(updated); // 保存到本地
      return updated;
    })

  };

  useEffect(() => {
    if (consultantId) {
      loadConsultantData(consultantId);
      // 先从本地存储加载消息
      const storedMessages = loadMessagesFromStorage();
      if (storedMessages.length > 0) {
        setMessages(storedMessages);
      } else {
        loadMessages();
      }
    }
  }, [consultantId]);

  

  return (
     <div className="chat-page">
      <ChatHeader consultant={consultant} />
      <ChatWindow messages={messages} onSend={handleSend}/>
    </div>
  );
};


export default Chat;
