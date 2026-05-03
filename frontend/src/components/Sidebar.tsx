import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  CreditCard,
  PieChart
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, collapsed }: SidebarItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors group",
        active ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>
      )}
    </div>
  );
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ isOpen, onClose, activePage, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 260,
          x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -260 
        }}
        className={cn(
          "h-screen bg-white border-r border-zinc-200 flex flex-col fixed inset-y-0 left-0 z-50 lg:sticky",
          "transition-all duration-300 ease-in-out",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
      <div className="p-6 flex items-center justify-between text-zinc-900">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer"
            onClick={() => handleNavigate('overview')}
          >
            <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full" />
            </div>
            <span>Vivid</span>
          </motion.div>
        )}
        {collapsed && (
          <div 
            className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center mx-auto cursor-pointer"
            onClick={() => handleNavigate('overview')}
          >
            <div className="w-4 h-4 border-2 border-white rounded-full" />
          </div>
        )}
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div onClick={() => handleNavigate('overview')}>
          <SidebarItem icon={LayoutDashboard} label="Overview" active={activePage === 'overview'} collapsed={collapsed} />
        </div>
        <div onClick={() => handleNavigate('analytics')}>
          <SidebarItem icon={BarChart3} label="Analytics" active={activePage === 'analytics'} collapsed={collapsed} />
        </div>
        <SidebarItem icon={Users} label="Customers" collapsed={collapsed} />
        <SidebarItem icon={CreditCard} label="Transactions" collapsed={collapsed} />
        <SidebarItem icon={PieChart} label="Reports" collapsed={collapsed} />
        
        <div className="pt-4 mt-4 border-t border-zinc-100">
          <SidebarItem icon={Bell} label="Notifications" collapsed={collapsed} />
          <div onClick={() => handleNavigate('settings')}>
            <SidebarItem icon={Settings} label="Settings" active={activePage === 'settings'} collapsed={collapsed} />
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-zinc-100">
        <SidebarItem icon={LogOut} label="Logout" collapsed={collapsed} />
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 w-full flex items-center justify-center p-2 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4 text-zinc-500" /> : <ChevronLeft className="w-4 h-4 text-zinc-500" />}
        </button>
      </div>
    </motion.aside>
    </>
  );
}
