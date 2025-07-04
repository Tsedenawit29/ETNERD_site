import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sending (Supabase integration coming soon)...');
  };

  return (
    <section className="max-w-lg mx-auto mt-12 p-6 bg-white dark:bg-dashboard-primary rounded-lg shadow-soft">
      <h2 className="font-display text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-6 text-center">Contact Us</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1 text-dashboard-primary dark:text-dashboard-primary-bright">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-tertiary-light dark:bg-tertiary-dark text-dashboard-primary dark:text-dashboard-primary-bright focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-dashboard-primary dark:text-dashboard-primary-bright">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-tertiary-light dark:bg-tertiary-dark text-dashboard-primary dark:text-dashboard-primary-bright focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-dashboard-primary dark:text-dashboard-primary-bright">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-tertiary-light dark:bg-tertiary-dark text-dashboard-primary dark:text-dashboard-primary-bright focus:outline-none focus:ring-2 focus:ring-dashboard-accent"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-dashboard-accent text-white font-semibold hover:bg-dashboard-accent-dark dark:bg-dashboard-accent-dark dark:text-dashboard-primary hover:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-colors duration-200"
        >
          Send Message
        </button>
        {status && <div className="text-center mt-2 text-dashboard-accent dark:text-dashboard-accent-dark">{status}</div>}
      </form>
    </section>
  );
};

export default Contact; 