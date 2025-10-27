import React from 'react';
import { Route } from '../App';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface NavbarProps {
  currentRoute: Route;
  onNavigate: (route: Route) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate }) => {
  const navItems: { route: Route, label: string }[] = [
    { route: 'library', label: 'Library' },
    { route: 'upload', label: 'Upload' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <BookOpenIcon className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              ErgoReader
            </span>
          </div>
          <nav className="flex items-center gap-4 sm:gap-6">
            {navItems.map(item => (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`text-sm font-medium transition-colors hover:text-primary-600 focus:outline-none focus:text-primary-600 ${
                  currentRoute === item.route ? 'text-primary-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
