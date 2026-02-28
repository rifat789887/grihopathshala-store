import React, { useState } from 'react';
import { usePdfs } from '@/src/contexts/PdfContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/contexts/AuthContext';
import { ArrowLeft, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export function PdfReader() {
  const { pdfId } = useParams<{ pdfId: string }>();
  const { getUserPdfs } = usePdfs();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const myPdfs = user ? getUserPdfs(user.id) : [];
  const pdf = myPdfs.find(p => p.id === pdfId);

  if (!pdf) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <p>PDF not found or you don't have access to it.</p>
        </div>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/dashboard/pdfs')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to My PDFs
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/pdfs')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-xl font-bold text-slate-900 truncate max-w-md">{pdf.title}</h1>
        </div>
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
          <Download className="h-4 w-4 mr-2" /> Download PDF
        </Button>
      </div>

      <div className="flex-1 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden relative">
        {/* Using object tag as a simple internal PDF reader fallback */}
        <object 
          data={pdf.url} 
          type="application/pdf" 
          className="w-full h-full"
          onError={() => setError("Could not load the PDF viewer. Please try downloading the file instead.")}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white p-6 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Internal Viewer Unavailable</h3>
            <p className="text-slate-600 mb-6 max-w-md">
              {error || "Your browser doesn't support the internal PDF viewer. You can download the file to read it."}
            </p>
            <Button 
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
              <Download className="h-4 w-4 mr-2" /> Download PDF
            </Button>
          </div>
        </object>
      </div>
    </div>
  );
}
