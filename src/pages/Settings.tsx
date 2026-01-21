import React from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login")
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
      <Button
        type="primary"
        onClick={handleBack}
        icon={<LeftOutlined />}
      >
        退出登录
      </Button>
    </div>
  )
}

export default Settings;