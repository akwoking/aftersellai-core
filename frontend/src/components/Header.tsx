import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, User, Menu, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[#0A0F1E] border-b border-[#1F2937] flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      {/* Left: Hamburger + Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:block flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by email or product..."
              className="w-full bg-[#0F1623] border border-[#1F2937] text-white placeholder-gray-500 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Right: Notification, Divider, User */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification Bell (placeholder) */}
        <button className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-0.5 w-2 h-2 bg-[#F97316] rounded-full border-2 border-[#0A0F1E]" />
        </button>

        <div className="h-8 w-[1px] bg-[#1F2937] mx-1" />

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white leading-none">Makembe King</p>
              <p className="text-xs text-gray-400 mt-1">AI Automation Manager</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#1A2236] rounded-full border border-[#1F2937] flex items-center justify-center group-hover:bg-[#1F2937] transition-colors overflow-hidden">
              <User className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-[#0F1623] border border-[#1F2937] rounded-lg shadow-lg py-1 z-50">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Future: navigate to profile page
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1A2236] hover:text-white transition-colors"
              >
                <Settings size={14} />
                Profile Settings
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Future: sign out logic
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1A2236] hover:text-white transition-colors"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}