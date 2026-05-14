import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Header } from './components/Header';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import ActivityTable from './components/ActivityTable';
import DashboardPage from './components/DashboardPage';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState('overview');

  return (
    <Router>
      <div className="flex h-screen bg-[#060B14] text-white overflow-hidden">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block">
          <Sidebar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            activePage={activePage}
            setActivePage={setActivePage}
            mobileOpen={false}
            setMobileOpen={() => {}}
            isMobile={false}
          />
        </div>

        {/* Sidebar drawer for mobile */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-30">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute left-0 top-0 h-full w-64 z-40">
              <Sidebar
                collapsed={false}
                setCollapsed={() => {}}
                activePage={activePage}
                setActivePage={setActivePage}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                isMobile={true}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setMobileOpen(!mobileOpen)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/communication-log" element={<ActivityTable />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}