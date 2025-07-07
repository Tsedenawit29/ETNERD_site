import React, { useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CVSubmit = () => {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '', file: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setForm((prev) => ({ ...prev, file }));
      setError('');
    } else {
      setError('Only PDF files are allowed.');
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setForm((prev) => ({ ...prev, file }));
        setError('');
      } else {
        setError('Only PDF files are allowed.');
      }
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    let file_url = null;
    try {
      if (!form.file) {
        setError('Please upload a PDF file.');
        setLoading(false);
        return;
      }
      if (form.file.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        setLoading(false);
        return;
      }
      // Upload to etfiles storage
      const { data: uploadData, error: uploadError } = await supabase.storage.from('etfiles').upload(`cvs/${Date.now()}_${form.file.name}`, form.file);
      if (uploadError) throw uploadError;
      // Get public URL
      file_url = uploadData.path;
      const { error: insertError } = await supabase.from('et_career').insert([
        {
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          meassage: form.message,
          file_url,
        },
      ]);
      if (insertError) {
        setError(insertError.message || 'Failed to submit. Please try again.');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '', file: null });
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-black flex flex-col items-center py-12 px-2 md:px-0 mt-16">
      {/* Hero Section */}
      <div className="max-w-2xl text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-dashboard-primary mb-4">Submit Your CV</h1>
        <p className="text-lg text-dashboard-primary/80 dark:text-white mb-2">Apply for future opportunities at ETNERD. Upload your CV and tell us about yourself!</p>
      </div>
      {/* Main Content: Form + Animation */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Form Card */}
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-xl p-8 md:p-16 flex flex-col items-center w-full">
          {success ? (
            <div className="text-green-600 font-semibold text-lg text-center">Thank you! Your CV has been submitted.</div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="John Doe"
                    value={form.full_name}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input
                  type="text"
                  name="phone"
                  placeholder="(123) 456-7890"
                  value={form.phone}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Subject <span className="text-red-500">*</span></label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="Job Application">Job Application</option>
                  <option value="Internship">Internship</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={handleChange}
                    className="border rounded px-3 py-2 w-full bg-white dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    rows={4}
                    required
                  />
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg px-4 py-6 text-center cursor-pointer transition ${dragActive ? 'border-dashboard-accent bg-dashboard-accent/10' : 'border-gray-300 bg-gray-50 dark:bg-slate-800'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-8 h-8 mb-2 text-dashboard-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16v-4a4 4 0 014-4 4 4 0 014 4v4m-4 4v-4m0 0V4m0 12l-4-4m4 4l4-4" />
                    </svg>
                    <span className="font-semibold">Drag & drop your PDF here, or <span className="underline text-dashboard-accent">choose file</span></span>
                    <span className="text-xs text-gray-500 mt-1">PDF only. Max 5MB.</span>
                    {form.file && <span className="block mt-2 text-green-600 font-semibold">{form.file.name}</span>}
                  </div>
                </div>
              </div>
              {error && <div className="text-red-600 text-sm text-center">{error}</div>}
              <button
                type="submit"
                className="bg-dashboard-accent text-white rounded px-4 py-2 font-semibold hover:bg-dashboard-accent-dark transition disabled:opacity-60 w-full"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </div>
        {/* Animated SVG/Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center h-full">
          {/* Beautiful animated SVG: Document upload with sparkles */}
          <svg className="w-[400px] h-[400px] animate-fade-in" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="docGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f59e42" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <rect x="60" y="80" width="280" height="320" rx="32" fill="url(#docGradient)" className="animate-pulse-slow" />
            <rect x="90" y="120" width="220" height="200" rx="16" fill="#fff" className="dark:fill-slate-900" />
            <rect x="120" y="160" width="160" height="20" rx="6" fill="#f59e42" className="dark:fill-dashboard-accent animate-pulse" />
            <rect x="120" y="200" width="120" height="16" rx="5" fill="#2563eb" className="dark:fill-dashboard-accent-dark animate-pulse-slow" />
            <rect x="120" y="230" width="100" height="16" rx="5" fill="#e5e7eb" className="dark:fill-slate-700" />
            <circle cx="320" cy="100" r="10" fill="#f59e42" className="animate-pulse" />
            <circle cx="80" cy="110" r="6" fill="#2563eb" className="animate-pulse" />
            <circle cx="200" cy="360" r="8" fill="#f59e42" className="animate-pulse" />
            <circle cx="300" cy="320" r="5" fill="#2563eb" className="animate-pulse" />
            <circle cx="120" cy="320" r="4" fill="#f59e42" className="animate-pulse" />
            <g className="animate-float-slow">
              <rect x="180" y="270" width="40" height="40" rx="8" fill="#f59e42" className="dark:fill-dashboard-accent" />
              <path d="M200 285v10M200 295v10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
              <circle cx="200" cy="295" r="3" fill="#fff" />
            </g>
          </svg>
          <p className="mt-8 text-lg text-dashboard-primary dark:text-white text-center font-semibold">Upload your CV securely and join our talent pool!<br/>We value your privacy and ambition.</p>
        </div>
      </div>
    </div>
  );
};

export default CVSubmit; 