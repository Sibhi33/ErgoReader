import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import BookList from '../components/BookList';
import BookReader from '../components/BookReader';
import PdfViewer from '../components/PdfViewer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Book, Chapter } from '../types';
import { Status } from '../App';

interface LibraryPageProps {
    books: Book[];
    status: Status;
    error: string | null;
    onLoadBooks: () => void;
    onFetchChapters: (book: Book) => Promise<Chapter[] | null>;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ books, status, error, onLoadBooks, onFetchChapters }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isBookContentLoading, setIsBookContentLoading] = useState(false);

    useEffect(() => {
        onLoadBooks();
    }, [onLoadBooks]);

    const categories = useMemo(() => {
        const geminiBooks = books.filter(b => b.source === 'gemini');
        const userBooksPresent = books.some(b => b.source === 'user');

        const allCategories = geminiBooks
            .map(book => book.category)
            .filter((category): category is string => !!category);
        
        const uniqueCategories = ['All', ...Array.from(new Set(allCategories))];
        if (userBooksPresent && !uniqueCategories.includes('PDF')) {
            uniqueCategories.push('PDF');
        }
        return uniqueCategories;
    }, [books]);

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                book.author.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [books, searchQuery, selectedCategory]);

    const handleSelectBook = async (book: Book) => {
        if (book.source === 'user') {
            setSelectedBook(book);
            window.scrollTo(0, 0);
            return;
        }

        if (book.chapters && book.chapters.length > 0) {
            setSelectedBook(book);
            window.scrollTo(0, 0);
            return;
        }

        setIsBookContentLoading(true);
        const chapters = await onFetchChapters(book);
        if (chapters) {
            const updatedBook = { ...book, chapters };
            setSelectedBook(updatedBook);
            window.scrollTo(0, 0);
        }
        setIsBookContentLoading(false);
    };

    const handleDeselectBook = () => {
        setSelectedBook(null);
    };
      
    const renderLibraryContent = () => {
        switch (status) {
            case 'loading':
                return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
            case 'error':
                return <ErrorMessage message={error || 'An unknown error occurred.'} onRetry={onLoadBooks} />;
            case 'success':
            case 'idle': // Also render for idle, e.g. when only user books are present
                return (
                    <>
                        <Header
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                        {filteredBooks.length > 0 ? (
                            <BookList books={filteredBooks} onSelectBook={handleSelectBook} />
                        ) : (
                            <div className="text-center py-16 text-slate-500">
                                <h2 className="text-2xl font-semibold">No Books Found</h2>
                                <p className="mt-2">Try adjusting your search or category filters, or check back after the library has loaded.</p>
                            </div>
                        )}
                    </>
                );
            default:
                return null;
        }
    };
    
    if (selectedBook) {
        if (selectedBook.source === 'user' && selectedBook.pdfData) {
            return <PdfViewer book={selectedBook} onBack={handleDeselectBook} />;
        }
        return <BookReader book={selectedBook} onBack={handleDeselectBook} />;
    }

    if (isBookContentLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <LoadingSpinner message="Loading book content..." />
            </div>
        );
    }
    
    return renderLibraryContent();
};

export default LibraryPage;
