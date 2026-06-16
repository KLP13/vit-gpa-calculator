import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "What is the VIT grading system?",
      a: "Vellore Institute of Technology (VIT) uses a 10-point letter grading system (S, A, B, C, D, E, F) representing grade points from 10 down to 5 (E) and 0 (F). Grading is mostly relative, meaning your letter grade depends on the class average and standard deviation of marks rather than hard percentage limits."
    },
    {
      q: "How is GPA calculated at VIT?",
      a: "Semester GPA is calculated using the weighted average formula: GPA = Sum(Course Credits × Grade Points) ÷ Sum(Course Credits). For example, if you get an S (10 points) in a 4-credit course, that course contributes 40 points to your overall semester score."
    },
    {
      q: "What does the S grade mean at VIT?",
      a: "The 'S' grade stands for Outstanding and yields the maximum 10 grade points. It is typically awarded to the top 2% to 5% of students in a course, or students scoring significantly above the class average in relative grading classes."
    }
  ];

  // Inject FAQPage Schema into the document dynamically
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-jsonld-schema';
    script.innerHTML = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('faq-jsonld-schema');
      if (existing) {
        existing.remove();
      }
    };
  }, []);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-slate-50/50 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-4">
            FAQ & Student Help
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Quick, official details about the Vellore Institute of Technology grading rules and expectations.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:border-indigo-100/50 transition-colors"
              >
                {/* Header Button */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-display font-extrabold text-slate-900 text-sm sm:text-base hover:text-indigo-600 transition-colors cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                </button>

                {/* Answer Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 border-t border-slate-50' : 'max-h-0'}`}
                >
                  <p className="px-6 py-5 text-sm sm:text-base text-slate-500 leading-relaxed font-normal text-justify">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
