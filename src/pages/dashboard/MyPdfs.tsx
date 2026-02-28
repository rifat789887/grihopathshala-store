import { useAuth } from '@/src/contexts/AuthContext';
import { usePdfs } from '@/src/contexts/PdfContext';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function MyPdfs() {
  const { user } = useAuth();
  const { getUserPdfs } = usePdfs();
  
  const myPdfs = user ? getUserPdfs(user.id) : [];

  if (myPdfs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">My PDFs</h1>
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">No PDFs Yet</h2>
          <p className="text-slate-600 max-w-md mx-auto">
            You don't have access to any PDFs yet. When an admin assigns a PDF to you, it will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My PDFs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPdfs.map((pdf) => (
          <div key={pdf.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            <div className="aspect-[3/4] bg-slate-100 relative">
              {pdf.coverImage ? (
                <img src={pdf.coverImage} alt={pdf.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                  <FileText className="h-16 w-16 mb-2 opacity-50" />
                  <span className="text-sm font-medium">PDF Document</span>
                </div>
              )}
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">{pdf.title}</h3>
              {pdf.description && (
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">{pdf.description}</p>
              )}
              
              <div className="mt-auto pt-4 flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => window.location.href = `/dashboard/pdfs/${pdf.id}`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Read
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const a = document.createElement('a');
                    a.href = pdf.url;
                    a.download = `${pdf.title}.pdf`;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
