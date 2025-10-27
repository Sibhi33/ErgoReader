import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Book } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import LoadingSpinner from './LoadingSpinner';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

// Fix: Declare pdfjsLib on the window object to resolve TypeScript error.
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

interface PdfViewerProps {
  book: Book;
  onBack: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ book, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderPage = useCallback(async (num: number) => {
    if (!pdfDoc) return;
    
    try {
      const page = await pdfDoc.getPage(num);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const context = canvas.getContext('2d');
      if (!context) return;
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
    } catch (e) {
      console.error("Error rendering page", e);
      setError("Failed to render the page. The PDF might be corrupted.");
    }
  }, [pdfDoc]);

  useEffect(() => {
    if (!book.pdfData) {
        setError("No PDF data found for this book.");
        setIsLoading(false);
        return;
    }
    const pdfData = atob(book.pdfData);
    const loadingTask = window.pdfjsLib.getDocument({ data: pdfData });

    loadingTask.promise.then(
      (doc) => {
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setIsLoading(false);
      },
      (reason) => {
        console.error('Error during PDF loading:', reason);
        setError("Failed to load PDF. The file may be invalid or corrupted.");
        setIsLoading(false);
      }
    );
  }, [book.pdfData]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  }, [pdfDoc, pageNum, renderPage]);

  const goToPrevPage = () => setPageNum(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNum(prev => Math.min(prev + 1, numPages));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (event.key === 'ArrowRight') {
        goToNextPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [numPages]); // Re-add listener if numPages changes, though it's unlikely

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Library
        </button>
        {numPages > 0 && (
            <div className="flex items-center gap-2">
                <button onClick={goToPrevPage} disabled={pageNum <= 1} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-slate-700">
                    Page {pageNum} of {numPages}
                </span>
                <button onClick={goToNextPage} disabled={pageNum >= numPages} className="p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        )}
      </div>

      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-lg flex justify-center">
        {isLoading && <LoadingSpinner message="Loading PDF..." />}
        {error && <p className="text-red-500">{error}</p>}
        <canvas ref={canvasRef} className={`${isLoading || error ? 'hidden' : ''}`} />
      </div>
    </div>
  );
};

export default PdfViewer;
