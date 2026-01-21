import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import Sidebar from '../components/Sidebar/Sidebar';
import Chat from '../pages/chat';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 无导航栏的页面 */}
        <Route path="/login" element={<Login />} />
        
        {/* 有导航栏的页面 */}
        <Route 
          path="/*"
          element={
            <div className="app-layout">
              <Sidebar />
              <div className="page-content">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/chat/:consultantId" element={<Chat />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;