import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const NO_JOBS_MSG = `Thank you for your interest about employment opportunities at ETNERD. Currently we do not have any open positions, however if you are interested in possible future opportunities please send your CV to <a href="mailto:info@etnerd.com" target="_blank" rel="noopener noreferrer" class="font-semibold underline">info@etnerd.com</a>. We will be in touch if a role becomes available that matches your skills and experiences.`;

const Career = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '', file: null });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch all active jobs
    const fetchJobs = async () => {
      const { data, error } = await supabase.from('et_jobs').select('*').eq('active', true).order('created_at', { ascending: false });
      setJobs(data);
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    let file_url = null;
    try {
      if (form.file) {
        // Only allow PDF
        if (form.file.type !== 'application/pdf') {
          setError('Only PDF files are allowed.');
          setLoading(false);
          return;
        }
        // Upload to etfiles storage
        const { data: uploadData, error: uploadError } = await supabase.storage.from('etfiles').upload(`cvs/${Date.now()}_${form.file.name}`, form.file);
        if (uploadError) throw uploadError;
        // Get public URL
        const { data: publicUrlData } = supabase.storage.from('etfiles').getPublicUrl(uploadData.path);
        file_url = publicUrlData.publicUrl;
      }
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
      if (insertError) throw insertError;
      setSuccess(true);
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '', file: null });
    } catch (err) {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Simple Modal
  const Modal = ({ open, onClose, children }) =>
    open ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-400 hover:text-red-500">&times;</button>
          {children}
        </div>
      </div>
    ) : null;

  if (jobs === null) {
    return <div className="flex justify-center items-center min-h-[60vh] text-lg">Loading...</div>;
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-black pt-28">
        <div className="max-w-2xl bg-white/80 dark:bg-slate-800/80 p-8 rounded-xl shadow mb-8">
          <h2 className="font-display text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-4">Career</h2>
          <p className="text-dashboard-primary dark:text-dashboard-primary-bright mb-2 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: NO_JOBS_MSG }} />
        </div>
        <div className="flex gap-4">
          <button
            className="px-6 py-2 rounded-lg bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark transition"
            onClick={() => setShowModal(true)}
          >
            Send your CV
          </button>
          <button
            className="px-6 py-2 rounded-lg border border-dashboard-accent text-dashboard-accent font-semibold hover:bg-dashboard-accent hover:text-white transition"
            onClick={() => navigate('/')}
          >
            Learn About ETNERD
          </button>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h3 className="text-xl font-bold mb-4">Send Your CV</h3>
          {success ? (
            <div className="text-green-600 font-semibold">Thank you! Your CV has been submitted.</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                rows={3}
              />
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-dashboard-accent text-white rounded px-4 py-2 font-semibold hover:bg-dashboard-accent-dark transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </Modal>
        {/* 3 Info Cards Section */}
        <div className="w-full flex flex-col items-center mt-16 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">Our Work Culture</h3>
              <p className="text-dashboard-primary dark:text-white">We foster an environment of innovation, collaboration, and continuous learning.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">Our Team</h3>
              <p className="text-dashboard-primary dark:text-white">Join a diverse team of talented professionals passionate about technology and innovation.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-8">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">About ETNERD</h3>
              <p className="text-dashboard-primary dark:text-white">Learn more about our mission, vision, and the innovative solutions we provide.</p>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-500 dark:text-slate-400 mb-8">
            Stay connected with us on <a href="https://www.linkedin.com/company/etnerd/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">LinkedIn</a> for future job announcements.
          </div>
        </div>
      </div>
    );
  }

  // Show active jobs as cards, then the CV and Learn About ETNERD buttons, then the info cards
  return (
    <div className="flex flex-col items-center min-h-[60vh] bg-white dark:bg-black pt-28">
      <h2 className="font-display text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-8">Open Positions</h2>
      <div className="w-full flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col border border-gray-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">{job.title}</h3>
              <div className="mb-2">
                <span className="font-semibold text-dashboard-accent">Specification:</span>
                <p className="text-dashboard-primary dark:text-white whitespace-pre-line">{job.specficaton}</p>
              </div>
              <div>
                <span className="font-semibold text-dashboard-accent">Eligibility:</span>
                <p className="text-dashboard-primary dark:text-white whitespace-pre-line">{job.elgblity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mb-8">
          <button
            className="px-6 py-2 rounded-lg bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark transition"
            onClick={() => setShowModal(true)}
          >
            Send your CV
          </button>
          <button
            className="px-6 py-2 rounded-lg border border-dashboard-accent text-dashboard-accent font-semibold hover:bg-dashboard-accent hover:text-white transition"
            onClick={() => navigate('/')}
          >
            Learn About ETNERD
          </button>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <h3 className="text-xl font-bold mb-4">Send Your CV</h3>
          {success ? (
            <div className="text-green-600 font-semibold">Thank you! Your CV has been submitted.</div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="border rounded px-3 py-2"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="border rounded px-3 py-2"
                rows={3}
              />
              <input
                type="file"
                name="file"
                accept="application/pdf"
                onChange={handleChange}
                className="border rounded px-3 py-2"
                required
              />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="bg-dashboard-accent text-white rounded px-4 py-2 font-semibold hover:bg-dashboard-accent-dark transition disabled:opacity-60"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          )}
        </Modal>
        {/* 3 Info Cards Section */}
        <div className="w-full flex flex-col items-center mt-16 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2'/><circle cx='12' cy='7' r='4'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">Our Work Culture</h3>
              <p className="text-dashboard-primary dark:text-white">We foster an environment of innovation, collaboration, and continuous learning.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-4">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">Our Team</h3>
              <p className="text-dashboard-primary dark:text-white">Join a diverse team of talented professionals passionate about technology and innovation.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100 dark:border-slate-800">
              <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-14 w-14 flex items-center justify-center mb-8">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-7 w-7 text-dashboard-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2z'/></svg>
              </div>
              <h3 className="text-xl font-bold text-dashboard-primary mb-2">About ETNERD</h3>
              <p className="text-dashboard-primary dark:text-white">Learn more about our mission, vision, and the innovative solutions we provide.</p>
            </div>
          </div>
          <div className="mt-8 text-center text-slate-500 dark:text-slate-400 mb-8">
            Stay connected with us on <a href="https://www.linkedin.com/company/etnerd/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">LinkedIn</a> for future job announcements.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career; 