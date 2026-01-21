import React, { useEffect, useRef } from 'react';
import './ChatWindow.css';
import { Divider } from 'antd';
import ChatInput from './ChatInput';
import { Messages } from '../../types/Message';
// 引入 date-fns 工具函数
import {
  isToday,
  isYesterday,
  format,
  differenceInMinutes,
  isSameDay,
} from 'date-fns';


interface ChatWindowProps {
    messages: Messages[];
    onSend: (content: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSend }) => {

    const bottomRef = useRef<HTMLDivElement>(null);

    // 格式化显示时间
    const formatDisplayTime = (isoString: string) => {
        const date = new Date(isoString);
        const now = new Date();
        const timePart = format(date, 'HH:mm');
        if (isToday(date)) {
            return timePart; // 今天只显示时分
        } else if (isYesterday(date)) {
            return `昨天 ${timePart}`; // 昨天显示昨天+时分
        } else if (date.getFullYear() === now.getFullYear()) {
            return format(date, 'MM-dd HH:mm'); // 同一年显示月-日+时分
        } else {
            return format(date, 'yyyy-MM-dd HH:mm'); // 跨年显示年份+月日+时分
        }
    };

    // 根据消息索引决定是否显示时间标签
    const getTimeLabel = (index: number): string | null => {
        const currentMessage = messages[index];
        const currentTime = new Date(currentMessage.time);
        // 第一条消息一定显示时间
        if(index === 0) {
            return formatDisplayTime(currentMessage.time);
        }
        const preMessage = messages[index - 1];
        const preTime = new Date(preMessage.time);
       // 判断是否为同一天
        if(!isSameDay(currentTime, preTime)) {
            return formatDisplayTime(currentMessage.time);
        }
        // 判断时间间隔是否超过5分钟
        const diffMinutes = differenceInMinutes(currentTime, preTime);
        if(diffMinutes >= 5) {
            return formatDisplayTime(currentMessage.time);
        }
        return null;
    };

    // 每次渲染都滚动到底部
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    return (
        <div className="chat-window">
            <Divider/>
            <div className="messages-container">
                {messages.map((msg, index) => {
                    const timeLabel = getTimeLabel(index);
                    return (
                        <React.Fragment key={msg.id}>
                        {/* 时间显示在聊天框中间 */}
                        {timeLabel && <div className="center-time">{timeLabel}</div>}
                        <div className={`chat-message ${msg.sender}`}>
                            {msg.sender === 'consultant' && msg.avatar && (
                                <img className="chat-avatar" src={msg.avatar} alt="avatar" />
                            )}
                                <div className="chat-bubble">{msg.content}</div>
                            {msg.sender === 'user' && msg.avatar && (
                                <img className="chat-avatar" src={msg.avatar} alt="avatar" />
                            )}
                        </div>
                        </React.Fragment>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <ChatInput onSend={onSend}/>
        </div>
    );
};

export default ChatWindow;
