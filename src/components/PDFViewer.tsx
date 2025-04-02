import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string | null;
}

function PDFViewer({ url }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  }

  if (!url) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Upload a PDF document to preview its content here</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto flex justify-center">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="max-w-full"
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-lg"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
      
      {numPages > 0 && (
        <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 border-t">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm">
            Page {pageNumber} of {numPages}
          </span>
          
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="ml-4 space-x-2">
            <button
              onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-sm">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(s => Math.min(2, s + 0.1))}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;