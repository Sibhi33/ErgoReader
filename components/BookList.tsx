
import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onSelectBook }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onSelectBook={onSelectBook} />
      ))}
    </div>
  );
};

export default BookList;
