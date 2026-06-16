import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, Calculator, HelpCircle } from 'lucide-react';
import { calculateGPA, getPerformanceLabel, GRADE_POINTS } from '../utils/calculator';

export default function GPACalculator() {
  // Initialize with 5 empty rows by default
  const defaultCourses = Array.from({ length: 5 }, (_, i) => ({
    id: Date.now() + i,
    credits: '',
    grade: ''
  }));

  const [courses, setCourses] = useState(defaultCourses);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAddCourse = () => {
    setCourses([...courses, { id: Date.now(), credits: '', grade: '' }]);
  };

  const handleRemoveCourse = (id) => {
    // Keep at least 1 course row
    if (courses.length === 1) {
      setError('You need at least one course row.');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
    setError('');
  };

  const handleCourseChange = (id, field, value) => {
    setCourses(
      courses.map(course => {
        if (course.id === id) {
          return { ...course, [field]: value };
        }
        return course;
      })
    );
    setError('');
  };

  const handleCalculate = () => {
    // Filter out rows that are incomplete
    const filledCourses = courses.filter(c => c.credits && c.grade);
    
    if (filledCourses.length === 0) {
      setError('Please fill credits and grades for at least one course.');
      setResult(null);
      return;
    }

    // Check if any row is partially filled
    const partiallyFilled = courses.some(c => (c.credits && !c.grade) || (!c.credits && c.grade));
    if (partiallyFilled) {
      setError('Please complete both Credits and Grade for all partially filled rows.');
      setResult(null);
      return;
    }

    const calc = calculateGPA(filledCourses);
    if (calc.isError) {
      setError(calc.message);
      setResult(null);
    } else {
      setResult(calc);
      setError('');
    }
  };

  const handleReset = () => {
    setCourses(Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      credits: '',
      grade: ''
    })));
    setResult(null);
    setError('');
  };

  const creditsOptions = [1, 1.5, 2, 3, 4, 5];
  const gradesOptions = Object.keys(GRADE_POINTS);

  return (
    <section id="gpa-section" className="py-20 bg-slate-50/50 dark:bg-slate-950/20 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge & Title */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Semester GPA
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight mb-4 animate-fadeIn">
            GPA Calculator
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your courses, select credits and grades, and get your semester GPA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
              {/* Labels header */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 mb-4 text-xs font-semibold text-slate-400 dark:text-slate-550 uppercase tracking-wider px-3">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-5">Credits</div>
                <div className="col-span-5">Grade</div>
                <div className="col-span-1"></div>
              </div>

              {/* Rows List */}
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center bg-slate-50/50 dark:bg-slate-950/40 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-slate-100 dark:border-slate-800/80 relative group transition-colors">
                    
                    {/* Index Counter */}
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>

                    {/* Credits Selection */}
                    <div className="col-span-5">
                      <label className="block sm:hidden text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">Credits</label>
                      <select
                        value={course.credits}
                        onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="" className="dark:bg-slate-950">Credits</option>
                        {creditsOptions.map(c => (
                          <option key={c} value={c} className="dark:bg-slate-950">{c} Credits</option>
                        ))}
                      </select>
                    </div>

                    {/* Grade Selection */}
                    <div className="col-span-5">
                      <label className="block sm:hidden text-xs font-semibold text-slate-400 dark:text-slate-500 mb-1">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="" className="dark:bg-slate-950">Grade</option>
                        {gradesOptions.map(g => (
                          <option key={g} value={g} className="dark:bg-slate-950">{g} Grade</option>
                        ))}
                      </select>
                    </div>

                    {/* Remove Row Button */}
                    <div className="col-span-1 flex items-center justify-end sm:justify-center">
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-colors"
                        title="Remove Course Row"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Error Warning */}
              {error && (
                <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Calculator Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6">
                <button
                  onClick={handleAddCourse}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition-all text-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Add Course
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold transition-all text-sm cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>

                  <button
                    onClick={handleCalculate}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 transition-all text-sm cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    Calculate GPA
                  </button>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {result && (
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-850 dark:from-slate-900 dark:to-slate-850 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-900/10 dark:shadow-none border border-indigo-800 dark:border-slate-800 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  
                  {/* Big Number GPA */}
                  <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-indigo-800/80 dark:border-slate-850 pb-6 md:pb-0 md:pr-6">
                    <span className="text-indigo-300 dark:text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Your Semester GPA</span>
                    <span className="font-display font-black text-5xl sm:text-6xl text-white">
                      {result.gpa.toFixed(2)}
                    </span>
                  </div>

                  {/* Performance Label Badge */}
                  <div className="text-center md:text-left md:col-span-2 space-y-3">
                    <div>
                      <span className="text-indigo-300 dark:text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Performance Class</span>
                      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border ${getPerformanceLabel(result.gpa).color}`}>
                        {getPerformanceLabel(result.gpa).label}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm text-indigo-200 dark:text-slate-400 pt-2">
                      <div>
                        <span className="text-indigo-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Total Subjects</span>
                        <span className="font-bold text-white text-base">{courses.filter(c => c.credits && c.grade).length}</span>
                      </div>
                      <div>
                        <span className="text-indigo-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Total Credits</span>
                        <span className="font-bold text-white text-base">{result.totalCredits}</span>
                      </div>
                      <div>
                        <span className="text-indigo-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Grade Points</span>
                        <span className="font-bold text-white text-base">{result.totalGradePoints}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: References */}
          <div className="space-y-6">
            
            {/* VIT Grade Scale Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                VIT Grade Scale
              </h3>
              
              <div className="flex flex-wrap gap-2.5 justify-between mb-4">
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center shadow-md shadow-emerald-100 dark:shadow-none">S</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">10 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-teal-500 text-white font-bold flex items-center justify-center shadow-md shadow-teal-100 dark:shadow-none">A</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">9 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center shadow-md shadow-blue-100 dark:shadow-none">B</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">8 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-violet-400 text-white font-bold flex items-center justify-center shadow-md shadow-violet-100 dark:shadow-none">C</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">7 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center shadow-md shadow-amber-100 dark:shadow-none">D</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">6 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-orange-500 text-white font-bold flex items-center justify-center shadow-md shadow-orange-100 dark:shadow-none">E</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">5 pts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-9 h-9 rounded-xl bg-red-500 text-white font-bold flex items-center justify-center shadow-md shadow-red-100 dark:shadow-none">F</span>
                  <span className="text-xs text-slate-500 mt-2 font-medium">0 pts</span>
                </div>
              </div>
            </div>

            {/* How It Works Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-6">
                How It Works
              </h3>
              
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Add one row per subject you took this semester.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Select the credits and grade for each subject.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Click <strong>Calculate GPA</strong> to see your result.
                  </p>
                </li>
              </ol>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}
