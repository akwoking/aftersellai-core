import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'communication-log', label: 'Communication Log', icon: MessageSquare, path: '/communication-log' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { id: 'settings', label: 'System Settings', icon: Settings, path: '/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({ collapsed, setCollapsed, activePage, setActivePage }: SidebarProps) {
  const location = useLocation();

  // Determine active page based on current route
  const currentPath = location.pathname;
  const currentItem = navItems.find(item => item.path === currentPath);
  const activeItemId = currentItem ? currentItem.id : 'overview';

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      className="bg-[#0A0F1E] border-r border-[#1F2937] h-screen flex flex-col sticky top-0"
    >
      {/* Logo area */}
      <div className="h-16 flex items-center justify-center border-b border-[#1F2937] px-4">
        {collapsed ? (
          <span className="text-white font-bold text-lg">AS</span>
        ) : (
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="AfterSell AI" className="h-8" />
            <span className="text-white font-semibold text-sm tracking-wide">AfterSell AI</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItemId === item.id;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#1A2236] text-[#F97316]'
                  : 'text-gray-400 hover:bg-[#131A2A] hover:text-gray-200'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-[#1F2937] text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </motion.aside>
  );
}