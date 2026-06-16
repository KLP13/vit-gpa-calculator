import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import GPACalculator from './components/GPACalculator';
import CGPACalculator from './components/CGPACalculator';
import GradeScale from './components/GradeScale';

import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Calculator, LayoutGrid, Sparkles } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Navigation Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section (Screen 5) */}
      <main className="flex-grow pt-28">
        
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Decorative Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-200/20 dark:bg-violet-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
            
            {/* Soft Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-shadow">
              <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-100 dark:fill-indigo-950 animate-spin-slow" />
              <span>For VIT students · No login required</span>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight font-display">
                Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-500">VIT GPA</span> <br className="hidden sm:inline" /> in Seconds
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
                The most accurate GPA & CGPA calculator built specifically for VIT's grading system. Works for all campuses — Vellore, Chennai, Bhopal, and AP.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
              <a
                href="#gpa-section"
                onClick={(e) => handleScrollTo(e, '#gpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 dark:shadow-none hover:-translate-y-0.5 transition-all text-base cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                Calculate GPA
              </a>

              <a
                href="#cgpa-section"
                onClick={(e) => handleScrollTo(e, '#cgpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow hover:-translate-y-0.5 transition-all text-base cursor-pointer"
              >
                <LayoutGrid className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                Calculate CGPA
              </a>
            </div>

          </div>
        </section>

        {/* GPA Calculator Section */}
        <GPACalculator />

        {/* CGPA Calculator Section */}
        <CGPACalculator />

        {/* VIT Grading Scale Section */}
        <GradeScale />



        {/* FAQ Accordion Section */}
        <FAQSection />

        {/* Contact Form Section */}
        <ContactForm />

      </main>

      {/* Sticky Footer */}
      <Footer />

    </div>
  );
}
