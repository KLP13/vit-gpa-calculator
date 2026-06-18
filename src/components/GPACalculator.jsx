import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw, Calculator, HelpCircle } from 'lucide-react';
import { calculateGPA, GRADE_POINTS } from '../utils/calculator';
import CustomSelect from './CustomSelect';

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

  const creditsSelectOptions = creditsOptions.map(c => ({ value: c, label: `${c} Credits` }));
  const gradesSelectOptions = gradesOptions.map(g => ({ value: g, label: `${g} Grade` }));

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
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 sm:p-8 shadow-sm">
              {/* Labels header */}
              <div className="grid grid-cols-12 gap-2 sm:gap-4 mb-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 sm:px-3">
                <div className="col-span-2 sm:col-span-1 text-center">#</div>
                <div className="col-span-4 sm:col-span-5">Credits</div>
                <div className="col-span-4 sm:col-span-5">Grade</div>
                <div className="col-span-2 sm:col-span-1"></div>
              </div>

              {/* Rows List */}
              <div className="space-y-3 sm:space-y-4">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2 sm:gap-4 items-center bg-transparent sm:bg-transparent p-0 sm:p-0 rounded-none sm:rounded-none border-0 sm:border-0 relative group transition-colors">
                    
                    {/* Index Counter */}
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-semibold flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>

                    {/* Credits Selection */}
                    <div className="col-span-4 sm:col-span-5">
                      <CustomSelect
                        value={course.credits}
                        onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                        options={creditsSelectOptions}
                        placeholder="Credits"
                        className="px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Grade Selection */}
                    <div className="col-span-4 sm:col-span-5">
                      <CustomSelect
                        value={course.grade}
                        onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                        options={gradesSelectOptions}
                        placeholder="Grade"
                        className="px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm"
                      />
                    </div>

                    {/* Remove Row Button */}
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
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

                  {/* Stats columns */}
                  <div className="text-center md:text-left md:col-span-2">
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-indigo-200 dark:text-slate-400">
                      <div>
                        <span className="text-indigo-400 dark:text-slate-555 block text-[10px] uppercase font-bold tracking-wider">Total Subjects</span>
                        <span className="font-bold text-white text-base">{courses.filter(c => c.credits && c.grade).length}</span>
                      </div>
                      <div>
                        <span className="text-indigo-400 dark:text-slate-555 block text-[10px] uppercase font-bold tracking-wider">Total Credits</span>
                        <span className="font-bold text-white text-base">{result.totalCredits}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: References */}
          <div className="space-y-6">
            
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
