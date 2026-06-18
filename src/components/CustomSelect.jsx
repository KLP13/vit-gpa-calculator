import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({
  name,
  value,
  onChange,
  options, // Array of { value, label } or strings/numbers
  placeholder,
  className = "px-4 py-3 text-sm"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formattedOptions = options.map(opt => {
    if (typeof opt === 'object' && opt !== null && 'value' in opt) {
      return opt;
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOption = formattedOptions.find(opt => String(opt.value) === String(value));
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (val) => {
    setIsOpen(false);
    if (onChange) {
      onChange({
        target: {
          name,
          value: val
        }
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer ${className}`}
      >
        <span className={!selectedOption ? "text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-200 font-medium"}>
          {displayLabel}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden py-1 max-h-96 overflow-y-auto animate-fadeIn">
          {placeholder && (
            <button
              type="button"
              onClick={() => handleSelect("")}
              className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {placeholder}
            </button>
          )}
          {formattedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors block cursor-pointer
                  ${isSelected
                    ? 'bg-indigo-600/10 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white'
                  }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
