import { Avatar, Button, Card, Carousel } from 'antd';
import React from 'react';
import "./Consultants-profile.css";
import { Consultant } from '../../types/Consultant';
import { useNavigate } from 'react-router-dom';


interface ConsultantsProfileProps {
  consultants: Consultant[];
}

const ConsultantsProfile: React.FC<ConsultantsProfileProps> = ({consultants}) => {

    const navigate = useNavigate();

    const hanldeStartConsult = (id: number) => {
        navigate(`/chat/${id}`);
    }

    return (
        <>
            <Carousel
                dots={false}
                arrows
                infinite={false}
                slidesToShow={4}   // 一页显示 4 个卡片
                slidesToScroll={4} // 点击箭头滚动 4 个
                draggable
                responsive={[
                    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3 } },
                    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
                    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }, //响应式布局
                ]}
                >
                {consultants.map((item) => (
                    <div key={item.id}>
                        <Card className="consultant-profile-card" hoverable>
                        {/**顶部背景 */}
                        <div 
                        className="card-banner" 
                        style={{ backgroundImage: `url(${item.avatar})` }}
                        />
                        <div className="profile-info">
                            {/**头像 */}
                        <Avatar 
                            src={item.avatar} 
                            size={80} 
                            className="profile-avatar"
                        />
                        <div className="profile-text">
                            {/**姓名 */}
                            <div className="profile-name">{item.name}</div>
                            {/**咨询次数 */}
                            <div className="profile-count">累计帮助了 {item.helpedCount} 人</div>
                        </div>
                        </div>
                        {/**资质荣誉 */}
                        <div className="profile-tags">
                        <div className="tag-item">
                            <span className="dot"/>
                            {item.level}  
                        </div>
                        <div className="tag-item">
                            <span className="dot"/>
                            {item.honor}  
                        </div>
                        </div>
                        {/* 擅长领域 */}
                        <div className="profile-skills">
                        擅长：{item.skills.join('、')}
                        </div>
                        <Button 
                            type="primary" 
                            className="consult-button" 
                            onClick={ () => hanldeStartConsult(item.id)}
                        >
                        开始咨询
                        </Button>
                    </Card>
                    </div>
                ))}
            </Carousel>

        </>
         
    )
}

export default ConsultantsProfile;