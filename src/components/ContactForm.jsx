import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import CustomSelect from './CustomSelect';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      return;
    }

    // Email basic verification
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');

    // Web3Forms API integration
    const apiData = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      name: name,
      email: email,
      subject: `[VIT GPA/CGPA Calculator] ${formData.subject}`,
      message: message
    };

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(apiData)
    })
      .then(async (response) => {
        const json = await response.json();
        if (response.status === 200 && json.success) {
          setSuccess(true);
          setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
        } else {
          setError(json.message || 'Something went wrong. Please try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Network error. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact-section" className="py-20 bg-white dark:bg-slate-950 border-t dark:border-slate-800 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60 mb-4">
            <Mail className="w-3.5 h-3.5" />
            Contact & Support
          </span>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Found a bug? Have a feature request or need help? Send your message and we'll reply shortly.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-50/50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          {success ? (
            <div className="text-center py-10 space-y-4 animate-scaleUp">
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-900/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Thank you for your feedback. We appreciate your contribution to making this tool better for VITians!
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Validation Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/40 text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name & Email in Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium"
                    required
                  />
                </div>
              </div>

              {/* Subject Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <CustomSelect
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  options={[
                    { value: 'Feedback', label: 'General Feedback' },
                    { value: 'Bug Report', label: 'Report a Calculation Bug' },
                    { value: 'Feature Request', label: 'Request a Feature' },
                    { value: 'Collaboration', label: 'Collaboration / Business' }
                  ]}
                  className="px-4 py-3 text-sm font-medium"
                />
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your request in detail..."
                  rows="5"
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-sm font-medium resize-y"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 dark:shadow-none transition-all text-sm cursor-pointer ${loading ? 'opacity-80 cursor-wait' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
