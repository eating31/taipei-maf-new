import React from 'react';
import { BrowserRouter, Route, Routes,Navigate  } from 'react-router-dom';

import About from './Page/About';
import Activity from './Page/Activity';
import Source from './Page/Source';
import News from './Page/News';
import Index from './Page/Index';
import Footer from './Component/Common/Footer';
import TopNavbar from './Component/Common/TopNavbar';
import Download from './Page/Download'


import 'bootstrap/dist/css/bootstrap.min.css';
import { ContextProvider } from './Contexts/Context';
import NotFound from './Page/NotFound';
import Profile from './Page/Profile';
import Manage from './Page/Manage';
import Register from './Page/Register';
import SingleNew from './Component/News/SingleNew';
import SingleActivity from './Component/Activity/SingleActivity';
import ActivityManage from './Page/ActivityManage';
import NewsManage from './Page/NewsManage';
import UserManage from './Page/UserManage';
import FileManage from './Page/FileManage';

function App() {
  const isLogin = localStorage.getItem('token')
  return (
    <div>
      <ContextProvider>
      <TopNavbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* <Route path="/" element={isLogin ? <Navigate to="/backend/manage" />:<Navigate to="/login" />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/about/:title" element={<About />} />
            <Route path="/download" element={<Download />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<SingleNew />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity/:id" element={<SingleActivity />} />
            {/* <Route path="/activity/register/:code" element={<Register />} /> */}
            <Route path="/source" element={<Source />} />
            <Route path="/source/:title" element={<Source />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/manage/user" element={<UserManage />} />
            <Route path="/manage/news" element={<NewsManage />} />
            <Route path="/manage/activity" element={<ActivityManage />} />
            <Route path="/manage/file" element={<FileManage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ContextProvider>
    </div>
  );
}

export default App;
