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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/50 shadow-sm mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-100/30 dark:fill-indigo-950/10" />
              <span>For VIT students · No login required</span>
            </div>

            {/* Headline */}
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-[68px] font-bold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
                Your GPA,<br />
                <span className="text-indigo-600 dark:text-indigo-400">calculated right.</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-normal leading-relaxed opacity-75">
                The only GPA & CGPA calculator built specifically for VIT's grading system. Semester GPA, cumulative CGPA, target predictor — all in one place.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <a
                href="#gpa-section"
                onClick={(e) => handleScrollTo(e, '#gpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#24b47e] hover:bg-[#1c9d6c] text-white font-medium rounded-lg transition-all text-sm cursor-pointer shadow-sm hover:scale-[1.01]"
              >
                <Calculator className="w-4 h-4 text-white stroke-[2]" />
                Calculate GPA
              </a>

              <a
                href="#cgpa-section"
                onClick={(e) => handleScrollTo(e, '#cgpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#171717] hover:bg-[#1f1f1f] text-white font-medium border border-[#2e2e2e] rounded-lg transition-all text-sm cursor-pointer hover:scale-[1.01]"
              >
                <LayoutGrid className="w-4 h-4 text-slate-400 stroke-[2]" />
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
