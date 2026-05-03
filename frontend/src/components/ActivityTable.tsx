import React from 'react';
import { MoreHorizontal, ExternalLink } from 'lucide-react';

const activities = [
  { id: 1, user: 'Sophia Williams', type: 'Design Project', amount: '$4,200', date: '2 mins ago', status: 'Completed' },
  { id: 2, user: 'James Miller', type: 'Consultation', amount: '$1,500', date: '15 mins ago', status: 'Pending' },
  { id: 3, user: 'Olivia Brown', type: 'Maintenance', amount: '$850', date: '45 mins ago', status: 'Completed' },
  { id: 4, user: 'Ethan Davis', type: 'Development', amount: '$12,000', date: '1 hour ago', status: 'Declined' },
  { id: 5, user: 'Emma Wilson', type: 'License Renewal', amount: '$2,400', date: '3 hours ago', status: 'Completed' },
];

export function ActivityTable() {
  return (
    <div className="dashboard-card flex flex-col">
      <div className="p-4 md:p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">Recent Transactions</h3>
        <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1">
          View All <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="min-w-[800px] lg:min-w-full">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 text-zinc-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Project Type</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {activities.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-all cursor-pointer group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-medium text-zinc-600">
                        {item.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium text-zinc-900">{item.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 whitespace-nowrap">{item.type}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-zinc-900 whitespace-nowrap">{item.amount}</td>
                  <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">{item.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                      item.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                      'bg-rose-50 text-rose-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
