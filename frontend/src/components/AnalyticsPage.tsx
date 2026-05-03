import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const messagesPerDay = [
  { name: 'Mon', messages: 1200 },
  { name: 'Tue', messages: 1500 },
  { name: 'Wed', messages: 1800 },
  { name: 'Thu', messages: 1600 },
  { name: 'Fri', messages: 1400 },
  { name: 'Sat', messages: 800 },
  { name: 'Sun', messages: 600 },
];

const topCrossSell = [
  { name: 'Cloud Storage Pack', value: 4200 },
  { name: 'Content Pro', value: 3800 },
  { name: 'Premium Support', value: 2100 },
  { name: 'API Expansion Kit', value: 1900 },
];

const revenueWins = [
  { company: 'Nexus Corp', product: 'Enterprise License', value: '$12,400', status: 'SETTLED' },
  { company: 'Velocity Tech', product: 'AI Module Upgrade', value: '$4,200', status: 'SETTLED' },
  { company: 'Lumina Media', product: 'Storage Expansion', value: '$2,100', status: 'PROCESSING' },
];

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

export default function AnalyticsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h2 className="text-white text-xl font-semibold">Analytics</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Total Messages" value="142,890" change="+12.5%" />
        <KpiCard title="Conversion Rate" value="24.6%" change="+3.2%" />
        <KpiCard title="AI Efficiency" value="91.4%" change="+0.8%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Messages Per Day */}
        <div className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-4">
          <h3 className="text-white text-sm font-medium mb-3">Messages Per Day</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={messagesPerDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#0F1623', border: '1px solid #1F2937', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="messages" stroke="#F97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Cross-Sold Products */}
        <div className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-4">
          <h3 className="text-white text-sm font-medium mb-3">Top Cross-Sold Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topCrossSell} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis type="number" stroke="#6B7280" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#6B7280" fontSize={12} width={130} />
              <Tooltip
                contentStyle={{ background: '#0F1623', border: '1px solid #1F2937', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#F97316" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Revenue Wins */}
      <div className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-4">
        <h3 className="text-white text-sm font-medium mb-3">Recent Revenue Wins</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1F2937] text-gray-400 text-xs">
              <th className="text-left py-2">Company</th>
              <th className="text-left py-2">Product</th>
              <th className="text-right py-2">Value</th>
              <th className="text-center py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {revenueWins.map((item, idx) => (
              <tr key={idx} className="border-b border-[#1F2937] last:border-0 text-gray-300">
                <td className="py-2">{item.company}</td>
                <td className="py-2">{item.product}</td>
                <td className="py-2 text-right font-medium">{item.value}</td>
                <td className="py-2 text-center">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status === 'SETTLED' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}