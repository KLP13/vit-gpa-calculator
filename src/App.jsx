import React from 'react';
import Header from './components/Header';
import GPACalculator from './components/GPACalculator';
import CGPACalculator from './components/CGPACalculator';
import GradeScale from './components/GradeScale';

import FAQSection from './components/FAQSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { Calculator, LayoutGrid, Sparkles } from 'lucide-react';

export default function App() {
  
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30">
      
      {/* Navigation Header */}
      <Header />

      {/* Hero Section (Screen 5) */}
      <main className="flex-grow pt-28">
        
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Decorative Background Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
            
            {/* Soft Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-xs sm:text-sm shadow-sm hover:shadow transition-shadow">
              <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-100 animate-spin-slow" />
              <span>For VIT students · No login required</span>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7.5xl font-black text-slate-900 leading-tight tracking-tight font-display">
                Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-500">VIT GPA</span> <br className="hidden sm:inline" /> in Seconds
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-normal leading-relaxed">
                The most accurate GPA & CGPA calculator built specifically for VIT's grading system. Works for all campuses — Vellore, Chennai, Bhopal, and AP.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
              <a
                href="#gpa-section"
                onClick={(e) => handleScrollTo(e, '#gpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all text-base cursor-pointer"
              >
                <Calculator className="w-5 h-5" />
                Calculate GPA
              </a>

              <a
                href="#cgpa-section"
                onClick={(e) => handleScrollTo(e, '#cgpa-section')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-2xl shadow-sm hover:shadow hover:-translate-y-0.5 transition-all text-base cursor-pointer"
              >
                <LayoutGrid className="w-5 h-5 text-slate-500" />
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
