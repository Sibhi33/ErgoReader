import React from 'react';
import { Route } from '../App';
import UniversitySlider from '../components/UniversitySlider';
import Testimonials from '../components/Testimonials';
import UseCases from '../components/UseCases';

interface LandingPageProps {
  onNavigate: (route: Route) => void;
}

const SectionDivider: React.FC = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="border-t border-slate-200"></div>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full animate-fade-in-up">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="text-center w-full py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Your Reading, <span className="text-primary-600">Redefined</span>.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Experience an intuitive digital library for all your books and documents. Designed for focus, comfort, and accessibility, ErgoReader allows you to upload your own PDFs or explore an endless, AI-generated collection.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('library')}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
              Explore Library
            </button>
            <button
              onClick={() => onNavigate('upload')}
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-md text-primary-700 bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Upload a File
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <UseCases />

      <SectionDivider />

      {/* University Logos Section */}
      <UniversitySlider />

      <SectionDivider />

      {/* Testimonials Section */}
      <Testimonials />

    </div>
  );
};

export default LandingPage;