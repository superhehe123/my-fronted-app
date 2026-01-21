import { Banner } from '../types/Banner';

const mockBanners: Banner[] = [
  { id: 1, imageUrl: '/images/1.jpg' },
  { id: 2, imageUrl: '/images/2.jpg' },
  { id: 3, imageUrl: '/images/3.jpg' },
  { id: 4, imageUrl: '/images/4.jpg' },
  { id: 5, imageUrl: '/images/5.jpg' },
];

// 模拟获取轮播图的API
export async function fetchBanners(): Promise<Banner[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockBanners;
}
