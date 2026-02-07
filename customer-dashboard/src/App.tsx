import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import RequestDetail from './pages/RequestDetail';
import NewRequest from './pages/NewRequest';
import NewsReports from './pages/NewsReports';
import NewsDetail from './pages/NewsDetail';
import Contract from './pages/Contract';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#003366',
    colorLink: '#003366',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Yu Gothic UI", sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#003366',
      algorithm: true,
    },
    Menu: {
      itemSelectedBg: '#e6f4ff',
      itemSelectedColor: '#003366',
    },
  },
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={jaJP} theme={theme}>
      <BrowserRouter basename="/customer-dashboard">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="requests" element={<Requests />} />
            <Route path="requests/new" element={<NewRequest />} />
            <Route path="requests/:id" element={<RequestDetail />} />
            <Route path="messages" element={<Messages />} />
            <Route path="news" element={<NewsReports />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="contract" element={<Contract />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
