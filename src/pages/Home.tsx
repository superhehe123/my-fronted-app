import React, { useEffect, useState } from 'react';
import { Carousel, Card, Divider, Skeleton } from 'antd';
import './Home.css';
import { CheckCircleOutlined } from '@ant-design/icons';
import ConsultantsProfile from '../components/Card-consultants-profile/consultants-profile';
import { Consultant } from '../types/Consultant';
import { fetchConsultants } from '../api/consultant';
import { fetchBanners } from '../api/banner';
import { Banner } from '../types/Banner';


const Home: React.FC = () => {

  const [carouselImages,setCarouselImages] = useState<Banner[]>([])
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [pageLoading, setPageLoading] = useState(true);


  // 模拟从API获取数据
  const loadConsultants = async () => {
    const data = await fetchConsultants();
    setConsultants(data);
  }
  // 模拟从API获取轮播图数据
  const loadCarouselImages = async () => {
    const banners = await fetchBanners();
    setCarouselImages(banners);
  };
  //loading效果
  const loadPageData = async () => {
      setPageLoading(true);
      await Promise.all([
        loadConsultants(),
        loadCarouselImages()
      ]);
      setPageLoading(false);
  };

  useEffect (() => {
    loadPageData()
  }, []);

  return (
     pageLoading ? (
      <Card className="welcome-card">
        <Skeleton
          active
          avatar
          paragraph={{ rows: 4 }}
        />
      </Card>
    ):(
      <>
        <div className="carousel-full">
          {/* 首页轮播图 */}
          <Carousel autoplay draggable arrows>
            {carouselImages.map((item) => (
              <div key={item.id} className="carousel-item">
                <img src={item.imageUrl} alt={`心理咨询 ${item.id}`} />
              </div>
            ))}
          </Carousel>
        </div>

        <Card className="welcome-card">
          <div className="card-header">
              <span className="p1class">心理咨询</span>
              <span className="p2class">没有人是一座孤岛，每个人都需要心理咨询</span>
              <span className="p3class">
                <CheckCircleOutlined /> 
                  咨询师入驻
              </span>
          </div>
          {/* 分割线 */}
          <Divider />
          {/**咨询师列表 */}
          <ConsultantsProfile consultants={consultants} />
        </Card>
      </>
    )


  );
};

export default Home;