import React from 'react';
import './ChatHeader.css';
import { Consultant } from '../../types/Consultant';

interface Props {
  consultant: Consultant | null;
}

const ChatHeader: React.FC<Props> = ({ consultant }) => {
  if (!consultant) return <div className="chat-header">加载中...</div>;

  return (
    <div className="chat-header">
      <img src={consultant.avatar} className="consultant-avatar" />
      <div>
        <div className="consultant-name">{consultant.name}</div>
        <div className="consultant-status">{consultant.level}</div>
      </div>
    </div>
  );
};

export default ChatHeader;
