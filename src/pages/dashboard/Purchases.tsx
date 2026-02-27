import { Card, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Download, ExternalLink, Clock } from 'lucide-react';

export function Purchases() {
  const purchases = [
    {
      id: '1',
      title: 'Complete Physics Guide for SSC',
      type: 'PDF',
      status: 'approved',
      date: 'Oct 12, 2023',
      accessNote: 'Click download to get your PDF.',
    },
    {
      id: '2',
      title: 'Advanced Mathematics Masterclass',
      type: 'Course',
      status: 'pending',
      date: 'Oct 15, 2023',
      accessNote: 'Waiting for admin approval after WhatsApp confirmation.',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Purchases</h1>
        <p className="text-slate-600">Access your approved study materials here.</p>
      </div>

      <div className="grid gap-4">
        {purchases.map((purchase) => (
          <Card key={purchase.id} className="overflow-hidden">
            <CardContent className="p-0 flex flex-col sm:flex-row">
              <div className="w-full sm:w-48 h-32 bg-slate-100 shrink-0 relative">
                <img 
                  src={`https://picsum.photos/seed/${purchase.id}/400/300`} 
                  alt={purchase.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">{purchase.title}</h3>
                    <Badge variant={purchase.status === 'approved' ? 'success' : 'warning'} className="shrink-0 capitalize">
                      {purchase.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {purchase.date}</span>
                    <Badge variant="secondary">{purchase.type}</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-600">{purchase.accessNote}</p>
                  
                  {purchase.status === 'approved' ? (
                    <Button size="sm" className="shrink-0">
                      {purchase.type === 'PDF' ? (
                        <><Download className="h-4 w-4 mr-2" /> Download</>
                      ) : (
                        <><ExternalLink className="h-4 w-4 mr-2" /> Access Course</>
                      )}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" disabled className="shrink-0">
                      Processing...
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
