import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Header } from './components/Header';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import ActivityTable from './components/ActivityTable';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activePage, setActivePage] = useState('overview');

  return (
    <Router>
      <div className="flex h-screen bg-[#060B14] text-white">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              {/* Dashboard / Overview page (can show a summary or redirect) */}
              <Route path="/" element={<AnalyticsPage />} />
              {/* Communication Log */}
              <Route path="/communication-log" element={<ActivityTable />} />
              {/* Analytics */}
              <Route path="/analytics" element={<AnalyticsPage />} />
              {/* System Settings */}
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}