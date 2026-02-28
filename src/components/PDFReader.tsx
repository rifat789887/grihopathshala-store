import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFReaderProps {
  url: string;
  title: string;
}

export function PDFReader({ url, title }: PDFReaderProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 p-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={zoomOut}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-slate-600 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={zoomIn}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="text-sm font-medium text-slate-600">
            Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
          </p>
          <button
            type="button"
            disabled={pageNumber >= (numPages || 1)}
            onClick={nextPage}
            className="p-1.5 hover:bg-slate-100 rounded-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div>
          <a 
            href={url} 
            download={title}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-50 text-brand-700 hover:bg-brand-100 rounded-md text-sm font-medium transition-colors"
          >
            <Download className="h-4 w-4" /> Download
          </a>
        </div>
      </div>

      {/* PDF Document */}
      <div className="flex-1 overflow-auto bg-slate-200/50 p-4 flex justify-center">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-full text-slate-500">
              Loading PDF...
            </div>
          }
          error={
            <div className="flex items-center justify-center h-full text-red-500">
              Failed to load PDF. Please try downloading it instead.
            </div>
          }
          className="flex flex-col items-center"
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-md"
          />
        </Document>
      </div>
    </div>
  );
}
