import React, { useRef, useState, useEffect } from 'react';
import './ChatInput.css';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface ChatInputProps {
  onSend: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    
    const [value, setValue] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

  // 点击 emoji 按钮切换面板
    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

  // 发送消息
    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue('');
        setShowEmojiPicker(false);
    };

  // 点击 emoji 插入光标
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const newValue = value.substring(0, startPos) + emojiData.emoji + value.substring(endPos);

        setValue(newValue);

        setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
            startPos + emojiData.emoji.length,
            startPos + emojiData.emoji.length
        );
        }, 0);
    };

    // 点击页面其他地方关闭 emoji 面板
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target as Node)
        ) {
            setShowEmojiPicker(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="chat-input" ref={containerRef}>
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { // Enter 不按 Shift 就发送
                    e.preventDefault(); // 阻止默认换行
                    handleSend();       // 调用发送函数
                }
            }}
            placeholder="请输入消息..."
            rows={4}
        />
        <div className="chat-input-buttons">
            <button type="button" onClick={toggleEmojiPicker} className="emoji-btn">
            😊
            </button>
            <button onClick={handleSend} className="send-btn">
            发送
            </button>
        </div>
        {showEmojiPicker && (
            <div className="emoji-picker-popup">
            <EmojiPicker onEmojiClick={handleEmojiClick} width={300} height={350} />
            </div>
        )}
        </div>
    );
};

export default ChatInput;
