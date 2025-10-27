import React, { useState, useEffect } from 'react';
import { QuoteIcon } from './icons/QuoteIcon';

const testimonials = [
  {
    quote: "ErgoReader has transformed how I manage my research papers. The clean interface and PDF upload feature are game-changers for my academic workflow.",
    author: "Ananya Sharma",
    title: "PhD Candidate, IIT Bombay"
  },
  {
    quote: "Finally, a digital library that's both beautiful and functional. I love exploring the AI-generated books for inspiration.",
    author: "Rohan Das",
    title: "Software Engineer"
  },
  {
    quote: "As a lifelong learner, having all my reading material in one ergonomic space is fantastic. It's simple, fast, and does exactly what I need.",
    author: "Priya Singh",
    title: "Management Consultant"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          What Our Readers Say
        </h2>
        <div className="mt-10 relative min-h-[14rem] sm:min-h-[12rem]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="flex flex-col items-center">
                <QuoteIcon className="w-10 h-10 text-primary-300" />
                <blockquote className="mt-4 text-lg text-slate-700 italic max-w-2xl mx-auto">
                  "{testimonial.quote}"
                </blockquote>
                <footer className="mt-6">
                  <p className="font-bold text-slate-900">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">{testimonial.title}</p>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;