import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Sun, Moon } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#gpa-section');
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Skip tracking updates during programmatically triggered smooth scrolls to avoid option-jumping lag
      if (isProgrammaticScroll.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['#gpa-section', '#cgpa-section', '#scale-section', '#faq-section', '#contact-section'];
          const scrollPosition = window.scrollY + 220; // threshold offset

          for (const section of sections) {
            const el = document.querySelector(section);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPosition >= top && scrollPosition < top + height) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const navLinks = [
    { name: 'GPA', href: '#gpa-section' },
    { name: 'CGPA', href: '#cgpa-section' },
    { name: 'Scale', href: '#scale-section' },
    { name: 'FAQ', href: '#faq-section' },
    { name: 'Contact', href: '#contact-section' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    
    // Set programmatically scrolling flag
    isProgrammaticScroll.current = true;
    setActiveSection(href); // Instantly highlight clicked option

    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    // Reset flag after standard smooth scroll duration finishes
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-45 py-4 transition-all duration-300">
      {/* Blur background layer when scrolled */}
      <div className={`absolute inset-0 bg-slate-50/75 dark:bg-[#090909]/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-900/60 -z-10 transition-all duration-300 ${scrolled ? 'opacity-100 shadow-sm' : 'opacity-0'}`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          
          {/* Logo (Icon only on mobile, text on sm+) */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#24b47e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-all">
              <GraduationCap className="w-[21px] h-[21px] stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white hidden sm:inline-block">
              VIT <span className="text-[#24b47e]">GPA</span>
            </span>
          </a>

          {/* Centered Floating Pill Navigation (Linear style capsule) - Fixed at bottom on mobile, inline header on desktop */}
          <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0 sm:z-auto flex items-center bg-slate-100/80 dark:bg-[#121212]/90 backdrop-blur-md border border-slate-200/50 dark:border-[#2a2a2b]/80 p-1 sm:p-1 rounded-full shadow-lg dark:shadow-2xl mx-auto transition-all duration-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap
                    ${isActive
                      ? 'bg-slate-900 text-white dark:bg-gradient-to-b dark:from-[#2e2e30] dark:to-[#18181b] border border-slate-950/10 dark:border-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.1)] text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Dark Mode Toggle */}
          <div className="flex items-center shrink-0">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
