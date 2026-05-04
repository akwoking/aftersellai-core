import { motion } from 'framer-motion';
import { MoreHorizontal, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import api from '../services/api';


const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  DELIVERED: {
    icon: <CheckCircle size={14} />,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
  },
  PENDING: {
    icon: <Clock size={14} />,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
  },
  'ACTION REQUIRED': {
    icon: <AlertTriangle size={14} />,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
  },
};

const [sending, setSending] = useState(false);

const handleSendTest = async () => {
  setSending(true);
  try {
    const response = await api.post('/simulate-order', {
      customer_email: 'YOUR_GMAIL@gmail.com',
      product_name: 'Wireless Bluetooth Headphones',
      related_products: ['Headphone Stand', 'Bluetooth Adapter'],
      tone: 'friendly',
    });
    alert('Test email sent! Check your inbox.');
  } catch (error) {
    console.error(error);
    alert('Failed to send email.');
  } finally {
    setSending(false);
  }
};

const messages = [
  {
    date: 'Oct 24, 2023 09:42 AM',
    customerEmail: 'sarah.j@example.com',
    product: 'Enterprise Core',
    messagePreview: 'Thank you for your inquiry about the Enterprise Core. I\'d recommend pairing it with...',
    status: 'DELIVERED',
  },
  {
    date: 'Oct 24, 2023 08:15 AM',
    customerEmail: 'm.chen@techsolutions.io',
    product: 'Analytics Suite',
    messagePreview: 'I\'ve flagged this billing discrepancy for immediate review. Expect a resolution...',
    status: 'ACTION REQUIRED',
  },
  {
    date: 'Oct 23, 2023 04:30 PM',
    customerEmail: 'david.ross@globalfin.com',
    product: 'Cloud Bridge',
    messagePreview: 'Your trial period is nearing its end. Here\'s an exclusive offer to upgrade...',
    status: 'PENDING',
  },
  {
    date: 'Oct 23, 2023 01:12 PM',
    customerEmail: 'linda.smith@retailco.com',
    product: 'Enterprise Core',
    messagePreview: 'Confirming your appointment for the architecture overview session...',
    status: 'DELIVERED',
  },
  {
    date: 'Oct 22, 2023 11:05 AM',
    customerEmail: 'kevin.v@startuplabs.io',
    product: 'Analytics Suite',
    messagePreview: 'I\'ve updated your dashboard views to include the new KPIs we discussed...',
    status: 'DELIVERED',
  },
];

export default function ActivityTable() {
  return (
    <div className="bg-[#0F1623] rounded-xl border border-[#1F2937] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium text-sm">Communication Log</h3>
        <button className="text-gray-400 hover:text-white" onClick={handleSendTest} disabled={sending}>
          <MoreHorizontal size={16} />
          {sending ? 'Sending...' : 'Send Test Follow-Up'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1F2937] text-gray-400 text-xs">
              <th className="text-left py-2 pr-2">Date</th>
              <th className="text-left py-2 px-2">Customer Email</th>
              <th className="text-left py-2 px-2">Product</th>
              <th className="text-left py-2 px-2">AI Message Preview</th>
              <th className="text-center py-2 pl-2">Status</th>
              <th className="py-2 pl-2"></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-[#1F2937] last:border-0 text-gray-300 hover:bg-[#131A2A] transition-colors"
              >
                <td className="py-3 pr-2 text-xs text-gray-400">{msg.date}</td>
                <td className="py-3 px-2 text-xs">{msg.customerEmail}</td>
                <td className="py-3 px-2 text-xs">{msg.product}</td>
                <td className="py-3 px-2 text-xs max-w-[250px] truncate">{msg.messagePreview}</td>
                <td className="py-3 px-2 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusConfig[msg.status]?.bg
                    } ${statusConfig[msg.status]?.color}`}
                  >
                    {statusConfig[msg.status]?.icon}
                    {msg.status}
                  </span>
                </td>
                <td className="py-3 pl-2">
                  <button className="text-gray-400 hover:text-white">
                    <Eye size={14} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Showing 5 of 1,284 interactions
      </div>
    </div>
  );
}