import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp } from 'lucide-react';

const KpiCard = ({ title, value, change }: { title: string; value: string; change: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-4"
  >
    <div className="text-gray-400 text-xs mb-1">{title}</div>
    <div className="text-white text-2xl font-bold">{value}</div>
    <div className="text-green-400 text-xs mt-1">{change}</div>
  </motion.div>
);

export default function DashboardPage() {
  // For simplicity, re‑use the same static KPI data. You can later fetch from the backend.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-white text-xl font-semibold">Dashboard</h2>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back, here's your store's performance at a glance.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Messages" value="142,890" change="+12.5%" />
        <KpiCard title="Conversion Rate" value="24.6%" change="+3.2%" />
        <KpiCard title="AI Efficiency" value="91.4%" change="+0.8%" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/communication-log"
          className="bg-[#0F1623] border border-[#1F2937] rounded-xl p-6 hover:border-[#F97316] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A2236] rounded-lg group-hover:bg-[#F97316]/10">
              <MessageSquare size={20} className="text-[#F97316]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Communication Log</h3>
              <p className="text-gray-400 text-sm">View and send follow‑up messages</p>
            </div>
          </div>
        </Link>
        <Link
          to="/analytics"
          className="bg-[#0F1623] border border-[#1F2937] rounded-xl p-6 hover:border-[#F97316] transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#1A2236] rounded-lg group-hover:bg-[#F97316]/10">
              <TrendingUp size={20} className="text-[#F97316]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Analytics</h3>
              <p className="text-gray-400 text-sm">Deep dive into charts and revenue</p>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}