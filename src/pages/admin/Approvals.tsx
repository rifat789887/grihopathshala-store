import { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Search, CheckCircle, XCircle } from 'lucide-react';

export function Approvals() {
  const [requests] = useState([
    {
      id: 'REQ-001',
      user: 'Rahim Uddin',
      email: 'rahim@example.com',
      product: 'Complete Physics Guide for SSC',
      date: '2 hours ago',
      status: 'pending'
    },
    {
      id: 'REQ-002',
      user: 'Karim Hasan',
      email: 'karim@example.com',
      product: 'Advanced Mathematics Masterclass',
      date: '5 hours ago',
      status: 'pending'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Purchase Approvals</h1>
          <p className="text-slate-400">Manually approve WhatsApp orders here.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by email or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      <Card className="bg-slate-950 border-slate-800">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Request ID</th>
                  <th className="px-6 py-4 font-medium">Customer</th>
                  <th className="px-6 py-4 font-medium">Product</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{req.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{req.user}</div>
                      <div className="text-xs text-slate-500">{req.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{req.product}</td>
                    <td className="px-6 py-4 text-slate-400">{req.date}</td>
                    <td className="px-6 py-4">
                      <Badge variant="warning" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="h-8 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400">
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400">
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
