import React from 'react';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {


  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Logo and About */}
          <div className="max-w-lg space-y-4">
            <a href="#" className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-slate-900" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                VIT <span className="text-indigo-400">GPA</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed">
              A high-precision, client-side calculator tailored specifically for Vellore Institute of Technology students across all campuses (Vellore, Chennai, Bhopal, AP). Calculate semester GPAs, cumulative CGPAs, and predict targets easily.
            </p>
          </div>

          {/* Connect section */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Connect With Us
            </h4>
            <a
              href="https://www.linkedin.com/in/kakarla-lakshmi-prasad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 hover:bg-[#0077b5] text-slate-300 hover:text-white border border-slate-700/50 shadow-sm transition-all duration-300 hover:scale-105"
              title="Connect on LinkedIn"
            >
              <svg 
                className="w-5 h-5 fill-current" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="leading-relaxed text-center md:text-left max-w-2xl">
            Disclaimer: This tool is an independent utility built for students and is NOT officially affiliated with or endorsed by Vellore Institute of Technology (VIT). All calculation logic and grade point definitions are based on official guidelines released on the VTOP portal.
          </p>
          <p className="flex items-center gap-1 shrink-0">
            Made with <Heart className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> by VITian for VITians.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} VIT GPA Calculator. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
