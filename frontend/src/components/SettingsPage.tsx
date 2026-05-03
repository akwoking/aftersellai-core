import React from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  ShieldCheck, 
  Mail,
  Camera,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const SettingsSection = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div>
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
    <div className="dashboard-card divide-y divide-zinc-100">
      {children}
    </div>
  </div>
);

const SettingsRow = ({ icon: Icon, label, description, rightElement }: { icon: any; label: string; description?: string; rightElement: React.ReactNode }) => (
  <div className="p-4 md:p-6 flex items-center justify-between gap-4">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-zinc-50 rounded-lg text-zinc-600">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-zinc-900">{label}</p>
        {description && <p className="text-xs text-zinc-500 mt-0.5">{description}</p>}
      </div>
    </div>
    {rightElement}
  </div>
);

export function SettingsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Settings</h1>
        <p className="text-zinc-500 mt-1 font-medium">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Profile Section */}
          <SettingsSection 
            title="Profile Information" 
            description="Update your personal details and how others see you."
          >
            <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center border-2 border-dashed border-zinc-300 group-hover:border-zinc-900 transition-colors cursor-pointer overflow-hidden">
                  <User className="w-12 h-12 text-zinc-400 group-hover:text-zinc-600" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white border border-zinc-200 rounded-full shadow-sm hover:bg-zinc-50 transition-colors">
                  <Camera className="w-4 h-4 text-zinc-600" />
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Alex Rivera" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="alex@vivid.com" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-50/50 flex justify-end">
              <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-semibold hover:bg-zinc-800 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </SettingsSection>

          {/* Security Section */}
          <SettingsSection 
            title="Security & Privacy" 
            description="Manage your password and security preferences."
          >
            <SettingsRow 
              icon={Lock} 
              label="Password" 
              description="Last changed 3 months ago" 
              rightElement={
                <button className="text-sm font-semibold text-zinc-600 hover:text-zinc-900 py-1.5 px-3 border border-zinc-200 rounded-lg transition-colors">
                  Change
                </button>
              }
            />
            <SettingsRow 
              icon={ShieldCheck} 
              label="Two-factor authentication" 
              description="Add an extra layer of security to your account" 
              rightElement={
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 cursor-pointer">
                  <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </div>
              }
            />
          </SettingsSection>

          {/* Notifications Section */}
          <SettingsSection 
            title="Notifications" 
            description="Choose what alerts you want to receive."
          >
            <SettingsRow 
              icon={Mail} 
              label="Email Notifications" 
              description="Receive weekly summaries and report alerts" 
              rightElement={
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-900 cursor-pointer">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </div>
              }
            />
            <SettingsRow 
              icon={Bell} 
              label="Real-time Alerts" 
              description="Push notifications for critical system updates" 
              rightElement={
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-900 cursor-pointer">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                </div>
              }
            />
          </SettingsSection>
        </div>

        <div className="space-y-6">
          <div className="dashboard-card p-6 bg-zinc-900 text-white">
            <h3 className="text-lg font-bold">Pro Plan</h3>
            <p className="text-zinc-400 text-sm mt-1">Your next billing date is June 12, 2024.</p>
            
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-2xl font-bold">$29<span className="text-sm font-normal text-zinc-400">/mo</span></div>
                <div className="text-xs text-zinc-400">85% of storage used</div>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[85%]" />
              </div>
            </div>
            
            <button className="w-full mt-8 py-2 bg-white text-zinc-900 rounded-lg text-sm font-bold hover:bg-zinc-100 transition-all">
              Manage Billing
            </button>
          </div>

          <div className="dashboard-card divide-y divide-zinc-100">
            <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-medium">Domain Settings</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
            </div>
            <div className="p-4 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-medium">Payment Methods</span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
