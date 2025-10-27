
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LibraryPage from './pages/LibraryPage';
import UploadPage from './pages/UploadPage';
import { fetchBooks, fetchChapters } from './services/geminiService';
// Fix: Import 'Chapter' type to resolve 'Cannot find name 'Chapter'' error.
import { Book, Chapter } from './types';

export type Status = 'idle' | 'loading' | 'error' | 'success';
export type Route = 'landing' | 'library' | 'upload';

const USER_BOOKS_STORAGE_KEY = 'ergoreader_user_books';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState<Route>('landing');
  
  // Load Gemini-generated books
  const loadBooks = useCallback(async () => {
    // Prevent re-fetching if books are already loaded
    if (books.some(b => b.source === 'gemini')) {
      setStatus('success');
      return;
    }
    setStatus('loading');
    setError(null);
    try {
      const fetchedBooks = await fetchBooks();
      setBooks(prevBooks => [...prevBooks.filter(b => b.source === 'user'), ...fetchedBooks]);
      setStatus('success');
    } catch (err) {
      setError('Failed to fetch the library. The service may be temporarily unavailable. Please try again later.');
      setStatus('error');
      console.error(err);
    }
  }, [books]);

  // Load user books from localStorage on initial render
  useEffect(() => {
    try {
      const storedBooks = localStorage.getItem(USER_BOOKS_STORAGE_KEY);
      const userBooks: Book[] = storedBooks ? JSON.parse(storedBooks) : [];
      setBooks(userBooks);
    } catch (e) {
      console.error("Failed to load user books from localStorage", e);
      // Initialize with an empty array if storage is corrupted
      setBooks([]);
    }
  }, []);

  // Persist user books to localStorage whenever books state changes
  useEffect(() => {
    try {
      const userBooks = books.filter(book => book.source === 'user');
      localStorage.setItem(USER_BOOKS_STORAGE_KEY, JSON.stringify(userBooks));
    } catch (e) {
      console.error("Failed to save user books to localStorage", e);
    }
  }, [books]);
  
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
            const base64 = event.target.result.split(',')[1];
            const newBook: Book = {
                id: `user-${Date.now()}`,
                title: file.name.replace(/\.pdf$/i, ''),
                author: "Uploaded File",
                source: 'user',
                pdfData: base64,
                category: 'PDF',
            };
            setBooks(prevBooks => [...prevBooks, newBook]);
            // Navigate to the library to show the newly uploaded book
            setRoute('library');
        }
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
      console.error("FileReader error:", reader.error);
    };
    reader.readAsDataURL(file);
  };
  
  const handleFetchChapters = async (book: Book): Promise<Chapter[] | null> => {
    try {
        const chapters = await fetchChapters(book);
        const updatedBook = { ...book, chapters };
        setBooks(prevBooks =>
            prevBooks.map(b => (b.id === updatedBook.id ? updatedBook : b))
        );
        return chapters;
    } catch (err) {
        console.error(err);
        alert(`Failed to load content for "${book.title}". Please check your connection and try again.`);
        return null;
    }
  };

  const renderPage = () => {
    switch(route) {
      case 'landing':
        return <LandingPage onNavigate={setRoute} />;
      case 'library':
        return <LibraryPage 
                  books={books} 
                  status={status}
                  error={error}
                  onLoadBooks={loadBooks}
                  onFetchChapters={handleFetchChapters}
                />;
      case 'upload':
        return <UploadPage onFileUpload={handleFileUpload} />;
      default:
        return <LandingPage onNavigate={setRoute} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar currentRoute={route} onNavigate={setRoute} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-200 mt-auto">
        <p>&copy; {new Date().getFullYear()} ErgoReader. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;