import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {

  return (
    <header className="bg-slate-50/80 backdrop-blur-lg py-4 mb-8 border-b border-slate-200">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BookOpenIcon className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Library
          </h1>
        </div>
        <div className="relative flex-grow sm:flex-grow-0 sm:w-72">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search title or author..."
                className="block w-full rounded-md border-slate-300 bg-white py-2 pl-10 pr-3 leading-5 text-slate-900 placeholder-slate-400 shadow-sm focus:border-primary-500 focus:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
            />
        </div>
      </div>
      <nav className="mt-4">
        <ul className="flex flex-wrap items-center gap-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-primary-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
