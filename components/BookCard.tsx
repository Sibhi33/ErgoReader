import React from 'react';
import { Book } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface BookCardProps {
  book: Book;
  onSelectBook: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onSelectBook }) => {
  const isUserBook = book.source === 'user';
  
  const query = `${book.category},${book.title.split(' ')[0]},book,cover,art`;
  const imageUrl = `https://source.unsplash.com/400x600/?${encodeURIComponent(query)}`;
  
  return (
    <button
      onClick={() => onSelectBook(book)}
      className="group flex flex-col text-left bg-white rounded-lg shadow-md hover:shadow-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out overflow-hidden"
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-slate-200">
        {isUserBook ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-4 text-center">
            <BookOpenIcon className="w-12 h-12 text-slate-400" />
            <span className="mt-2 text-sm font-semibold text-slate-600 break-words">{book.title}</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Cover for ${book.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{book.title}</h3>
        <p className="text-sm text-slate-600 mt-1">{book.author}</p>
        <span className={`mt-4 text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full last:mr-0 mr-1 self-start ${isUserBook ? 'text-indigo-600 bg-indigo-100' : 'text-primary-600 bg-primary-100'}`}>
          {isUserBook ? "PDF" : book.category}
        </span>
      </div>
    </button>
  );
};

export default BookCard;
