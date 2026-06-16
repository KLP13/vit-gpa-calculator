import React from 'react';
import { GRADE_POINTS } from '../utils/calculator';

export default function GradeScale() {
  const gradeDetails = [
    { grade: 'S', points: 10, label: 'Outstanding', desc: 'Top-tier performance, typically top 2-5% of class in relative grading.', color: 'bg-emerald-500 text-white' },
    { grade: 'A', points: 9, label: 'Excellent', desc: 'Exceptionally high performance and robust knowledge of course contents.', color: 'bg-teal-500 text-white' },
    { grade: 'B', points: 8, label: 'Very Good / Good', desc: 'Strong grasp of concepts, high average scores.', color: 'bg-blue-500 text-white' },
    { grade: 'C', points: 7, label: 'Good / Average', desc: 'Decent performance meeting all basic requirements.', color: 'bg-violet-400 text-white' },
    { grade: 'D', points: 6, label: 'Fair / Satisfactory', desc: 'Average performance, standard understanding.', color: 'bg-amber-500 text-white' },
    { grade: 'E', points: 5, label: 'Pass', desc: 'Lowest passing grade. Earns credits but has low weight.', color: 'bg-orange-500 text-white' },
    { grade: 'F', points: 0, label: 'Fail', desc: 'Inadequate performance. Must register and repeat the course.', color: 'bg-red-500 text-white' }
  ];

  return (
    <section id="scale-section" className="py-20 bg-slate-50/50 dark:bg-slate-950/20 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight mb-4">
            VIT Grading Scale
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            The official 10-point scale used across all VIT campuses.
          </p>
        </div>

        {/* Outer Card container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 animate-fadeIn">
          
          {/* Quick Badges Row (Matches Screen 4) */}
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white text-center sm:text-left mb-6">
              VIT Grade Scale Reference
            </h3>
            
            <div className="flex flex-wrap gap-3.5 justify-center sm:justify-between">
              {gradeDetails.map((g) => (
                <div key={g.grade} className="flex flex-col items-center shrink-0 w-20 bg-slate-50 dark:bg-slate-950 border border-slate-100/50 dark:border-slate-850 p-4 rounded-2xl hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                  <span className={`w-10 h-10 rounded-2xl ${g.color} font-black text-lg flex items-center justify-center shadow-lg shadow-indigo-100/50 dark:shadow-none`}>
                    {g.grade}
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3">{g.points} pts</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
