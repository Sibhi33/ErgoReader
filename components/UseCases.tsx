import React from 'react';

const useCases = [
  {
    title: 'For Students & Researchers',
    description: 'Organize research papers, textbooks, and notes in one place. Search and read with ease, without distractions.',
  },
  {
    title: 'For Professionals',
    description: 'Keep reports, whitepapers, and business documents accessible. A clean, professional interface for your work materials.',
  },
  {
    title: 'For Lifelong Learners',
    description: 'Build a personal library of your favorite e-books and articles. Enjoy a comfortable, ergonomic reading experience anytime.',
  },
];

const UseCases: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Why ErgoReader?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A versatile library for every part of your life.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {useCases.map((item, index) => (
            <div key={index} className="flex flex-col text-left p-6 bg-slate-50 rounded-lg border border-slate-200">
              <h3 className="text-lg font-bold text-primary-700">{item.title}</h3>
              <p className="mt-2 text-base text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;