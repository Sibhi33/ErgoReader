
import React from 'react';
import { Book } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface BookReaderProps {
  book: Book;
  onBack: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ book, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Library
        </button>
      </div>

      <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 lg:p-12 rounded-lg shadow-lg">
        <header className="mb-8 border-b pb-6 border-slate-200">
          <p className="text-sm font-medium text-primary-600 uppercase tracking-wider">{book.category}</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2">{book.title}</h1>
          <p className="text-lg text-slate-600 mt-3">by {book.author}</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Summary</h2>
          <p className="text-base lg:text-lg text-slate-700 leading-relaxed prose prose-lg max-w-none">{book.summary}</p>
        </section>

        <div>
          {book.chapters?.map((chapter, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">{chapter.title}</h2>
              <div className="prose prose-lg max-w-none text-slate-700 leading-loose">
                {chapter.content.split('\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BookReader;