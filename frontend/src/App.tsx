/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { OverviewChart } from './components/OverviewChart';
import { ActivityTable } from './components/ActivityTable';
import { SettingsPage } from './components/SettingsPage';
import { AnalyticsPage } from './components/AnalyticsPage';
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  TrendingUp,
  Download,
  Filter,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('overview');

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        activePage={currentPage}
        onNavigate={setCurrentPage}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {currentPage === 'overview' ? (
              <div className="space-y-6 md:space-y-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-zinc-500 mt-1 font-medium text-sm md:text-base">Welcome back, Alex. Here's what's happening today.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
                      <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
                      <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter</span>
                    </button>
                    <button className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm shadow-zinc-200">
                      <Plus className="w-4 h-4" /> New Project
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  <StatCard 
                    title="Total Revenue" 
                    value="$128,430.00" 
                    change={12.5} 
                    icon={DollarSign} 
                    trend="up" 
                  />
                  <StatCard 
                    title="Active Users" 
                    value="2,420" 
                    change={8.2} 
                    icon={Users} 
                    trend="up" 
                  />
                  <StatCard 
                    title="New Orders" 
                    value="156" 
                    change={2.4} 
                    icon={ShoppingBag} 
                    trend="down" 
                  />
                  <StatCard 
                    title="Conversion Rate" 
                    value="3.24%" 
                    change={14.8} 
                    icon={TrendingUp} 
                    trend="up" 
                  />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="lg:col-span-2">
                    <OverviewChart />
                  </div>
                  <div className="dashboard-card p-6 flex flex-col justify-between overflow-hidden">
                    {/* Progress bars content */}
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900">Project Goals</h3>
                      <p className="text-sm text-zinc-500 mb-6">Track your quarterly progress</p>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between text-sm font-medium mb-2">
                            <span>Revenue Target</span>
                            <span>75%</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-zinc-900" 
                              initial={{ width: 0 }}
                              animate={{ width: '75%' }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm font-medium mb-2">
                            <span>User Growth</span>
                            <span>42%</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-zinc-600" 
                              initial={{ width: 0 }}
                              animate={{ width: '42%' }}
                              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm font-medium mb-2">
                            <span>Customer Retention</span>
                            <span>92%</span>
                          </div>
                          <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-emerald-500" 
                              initial={{ width: 0 }}
                              animate={{ width: '92%' }}
                              transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-zinc-100">
                      <div className="bg-zinc-50 p-4 rounded-xl">
                        <p className="text-sm font-semibold text-zinc-900">Weekly Tip</p>
                        <p className="text-xs text-zinc-500 mt-1">Users who use the mobile app spend 40% more time on your platform.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 gap-8">
                  <ActivityTable />
                </div>
              </div>
            ) : currentPage === 'analytics' ? (
              <AnalyticsPage />
            ) : (
              <SettingsPage />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
