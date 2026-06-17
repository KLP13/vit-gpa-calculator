import React, { useState, useEffect } from 'react';
import { Plus, Trash2, RefreshCw, Calculator, Target, AlertCircle, CheckCircle2 } from 'lucide-react';
import { calculateCGPA, predictTargetGPA } from '../utils/calculator';

export default function CGPACalculator() {
  // Semester Cards state (start with 2 by default, matching Screen 2)
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Semester 1', gpa: '', credits: '' },
    { id: 2, name: 'Semester 2', gpa: '', credits: '' }
  ]);

  const [cgpaResult, setCgpaResult] = useState(null);
  const [calcError, setCalcError] = useState('');

  // Target GPA Predictor inputs
  const [predictorInput, setPredictorInput] = useState({
    currentCGPA: '',
    creditsCompleted: '',
    targetCGPA: 8.0,
    remainingSemesters: '2',
    creditsPerSemester: ''
  });

  const [predictorResult, setPredictorResult] = useState(null);

  // Sync predictor default credit completed based on semesters
  useEffect(() => {
    // If user has calculated CGPA, auto-fill the current CGPA and completed credits in the predictor!
    if (cgpaResult && !cgpaResult.isError) {
      setPredictorInput(prev => ({
        ...prev,
        currentCGPA: cgpaResult.cgpa.toString(),
        creditsCompleted: cgpaResult.totalCredits.toString()
      }));
    }
  }, [cgpaResult]);

  // Handle semester field changes
  const handleSemChange = (id, field, value) => {
    setSemesters(
      semesters.map(sem => {
        if (sem.id === id) {
          return { ...sem, [field]: value };
        }
        return sem;
      })
    );
    setCalcError('');
  };

  const handleAddSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([
      ...semesters,
      { id: Date.now(), name: `Semester ${nextNum}`, gpa: '', credits: '' }
    ]);
  };

  const handleRemoveSemester = (id) => {
    if (semesters.length === 1) {
      setCalcError('You need at least one semester card.');
      return;
    }
    const filtered = semesters.filter(s => s.id !== id);
    // Rename semesters sequentially for clean display
    const renamed = filtered.map((sem, index) => ({
      ...sem,
      name: `Semester ${index + 1}`
    }));
    setSemesters(renamed);
    setCalcError('');
  };

  const handleCalculateCGPA = () => {
    const filledSems = semesters.filter(s => s.gpa && s.credits);
    
    if (filledSems.length === 0) {
      setCalcError('Please enter GPA and Credits for at least one semester.');
      setCgpaResult(null);
      return;
    }

    // Check if any row is partially filled
    const partiallyFilled = semesters.some(s => (s.gpa && !s.credits) || (!s.gpa && s.credits));
    if (partiallyFilled) {
      setCalcError('Please complete both GPA and Credits for all partially filled cards.');
      setCgpaResult(null);
      return;
    }

    const calc = calculateCGPA(filledSems);
    if (calc.isError) {
      setCalcError(calc.message);
      setCgpaResult(null);
    } else {
      setCgpaResult(calc);
      setCalcError('');
    }
  };

  const handleResetCGPA = () => {
    setSemesters([
      { id: 1, name: 'Semester 1', gpa: '', credits: '' },
      { id: 2, name: 'Semester 2', gpa: '', credits: '' }
    ]);
    setCgpaResult(null);
    setCalcError('');
  };

  // Run predictor calculation
  useEffect(() => {
    const { currentCGPA, creditsCompleted, targetCGPA, remainingSemesters, creditsPerSemester } = predictorInput;
    
    if (currentCGPA && creditsCompleted && remainingSemesters && creditsPerSemester) {
      const pred = predictTargetGPA({
        currentCGPA,
        creditsCompleted,
        targetCGPA,
        remainingSemesters,
        creditsPerSemester
      });
      setPredictorResult(pred);
    } else {
      setPredictorResult(null);
    }
  }, [predictorInput]);

  const handlePredictorChange = (field, value) => {
    setPredictorInput(prev => ({
      ...prev,
      [field]: value
    }));
  };



  return (
    <section id="cgpa-section" className="py-20 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge & Title */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
            Cumulative CGPA
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight mb-4">
            CGPA Calculator
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Enter your GPA and credits for each completed semester to calculate your overall CGPA.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Semester Cards Inputs */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {semesters.map((sem, index) => (
                <div key={sem.id} className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 relative group hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                  
                  {/* Semester Header with Delete Button */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="font-display font-semibold text-slate-800 dark:text-slate-200 text-sm">
                        {sem.name}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveSemester(sem.id)}
                      className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                      title="Remove Semester"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Two Column Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                        Semester GPA
                      </label>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        max="10"
                        step="0.01"
                        value={sem.gpa}
                        onChange={(e) => handleSemChange(sem.id, 'gpa', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                        Credits
                      </label>
                      <input
                        type="number"
                        placeholder="Credits"
                        min="1"
                        max="40"
                        value={sem.credits}
                        onChange={(e) => handleSemChange(sem.id, 'credits', e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Error Warning */}
            {calcError && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 text-sm">
                {calcError}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-6">
              <button
                onClick={handleAddSemester}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition-all text-sm cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />
                Add Semester
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleResetCGPA}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold transition-all text-sm cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>

                <button
                  onClick={handleCalculateCGPA}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 transition-all text-sm cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  Calculate CGPA
                </button>
              </div>
            </div>

            {/* CGPA Calculator Results Card */}
            {cgpaResult && (
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-850 dark:from-slate-900 dark:to-slate-850 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-900/10 dark:shadow-none border border-indigo-800 dark:border-slate-800 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-indigo-800/80 dark:border-slate-850 pb-6 md:pb-0 pr-6">
                    <span className="text-indigo-300 dark:text-slate-400 text-xs font-bold uppercase tracking-widest block mb-1">Your Cumulative CGPA</span>
                    <span className="font-display font-black text-5xl sm:text-6xl text-white">
                      {cgpaResult.cgpa.toFixed(2)}
                    </span>
                  </div>

                  <div className="text-center md:text-left md:col-span-2">
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-indigo-200 dark:text-slate-400">
                      <div>
                        <span className="text-indigo-400 dark:text-slate-550 block text-[10px] uppercase font-bold tracking-wider">Completed Semesters</span>
                        <span className="font-bold text-white text-base">{semesters.filter(s => s.gpa && s.credits).length}</span>
                      </div>
                      <div>
                        <span className="text-indigo-400 dark:text-slate-550 block text-[10px] uppercase font-bold tracking-wider">Total Credits Earned</span>
                        <span className="font-bold text-white text-base">{cgpaResult.totalCredits}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Target GPA Predictor Widget */}
          <div className="space-y-6">
            
            {/* Target GPA Predictor Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/40 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white leading-tight">
                    Target GPA Predictor
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Find out what GPA you need to reach your goal
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                
                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-550 mb-1.5 uppercase tracking-wider">
                      Current CGPA
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 7.50"
                      min="0"
                      max="10"
                      step="0.01"
                      value={predictorInput.currentCGPA}
                      onChange={(e) => handlePredictorChange('currentCGPA', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-550 mb-1.5 uppercase tracking-wider">
                      Credits Done
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 88"
                      min="0"
                      value={predictorInput.creditsCompleted}
                      onChange={(e) => handlePredictorChange('creditsCompleted', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Target CGPA Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Target CGPA
                    </label>
                    <span className="font-display font-black text-indigo-600 dark:text-indigo-400 text-lg">
                      {parseFloat(predictorInput.targetCGPA).toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="10.0"
                    step="0.1"
                    value={predictorInput.targetCGPA}
                    onChange={(e) => handlePredictorChange('targetCGPA', e.target.value)}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                    <span>5.0</span>
                    <span>10.0</span>
                  </div>
                </div>

                {/* Remaining Sems and Credits/Sem */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-550 mb-1.5 uppercase tracking-wider">
                      Remaining Sems
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2"
                      min="1"
                      max="8"
                      value={predictorInput.remainingSemesters}
                      onChange={(e) => handlePredictorChange('remainingSemesters', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 dark:text-slate-550 mb-1.5 uppercase tracking-wider">
                      Credits / Sem
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 22"
                      min="1"
                      value={predictorInput.creditsPerSemester}
                      onChange={(e) => handlePredictorChange('creditsPerSemester', e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Target Result Box */}
                {predictorResult ? (
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                    {!predictorResult.isAchievable ? (
                      <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-800 dark:text-red-400 text-sm flex items-start gap-2.5 leading-relaxed">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500 dark:text-red-400 mt-0.5" />
                        <div>
                          <span className="font-bold block text-red-900 dark:text-red-300">Target Unachievable</span>
                          Mathematically impossible to hit this target (needs average GPA of <strong>{predictorResult.requiredGPA}</strong>). Try lowering your target or improving past grades.
                        </div>
                      </div>
                    ) : predictorResult.isAlreadyAchieved ? (
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 text-sm flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 dark:text-emerald-400 mt-0.5" />
                        <div>
                          <span className="font-bold block text-emerald-900 dark:text-emerald-300">Target Achieved!</span>
                          Your current standing is already above your target CGPA of {predictorInput.targetCGPA}. Just maintain a passing grade to stay on track.
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-slate-700 dark:text-slate-350 text-sm space-y-2 leading-relaxed">
                        <p>
                          To achieve your target CGPA of <strong className="text-indigo-700 dark:text-indigo-400 font-bold">{parseFloat(predictorInput.targetCGPA).toFixed(2)}</strong>, you must score an average semester GPA of:
                        </p>
                        <div className="flex items-baseline gap-2 py-1">
                          <span className="font-display font-black text-3xl text-indigo-600 dark:text-indigo-400">
                            {predictorResult.requiredGPA.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-550 font-semibold">in remaining semesters</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                          Calculated for {predictorInput.remainingSemesters} sems, total of {parseInt(predictorInput.remainingSemesters) * parseFloat(predictorInput.creditsPerSemester)} remaining credits.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                    Fill in all details above to see the minimum required future GPA.
                  </div>
                )}
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
