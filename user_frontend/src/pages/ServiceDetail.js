import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ServiceIcon from '../components/ServiceIcon';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    content: '',
    email: '',
    phone: '',
    date: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('et_services').select('*').eq('id', id).single();
      if (!error) setService(data);
      setLoading(false);
    };
    fetchService();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    const { name, content, email, phone, date } = form;
    const { error } = await supabase.from('et_book').insert([
      {
        service: service?.title || '',
        name,
        content,
        email,
        phone,
        submitted_at: date ? new Date(date) : null,
      },
    ]);
    if (error) {
      setError('Failed to book service. Please try again.');
    } else {
      setSuccess('Service booked successfully!');
      setForm({ name: '', content: '', email: '', phone: '', date: '' });
    }
    setSubmitting(false);
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (!service) return <div className="text-center py-16">Service not found.</div>;

  // Parse features if present and is a string (for backward compatibility)
  let features = [];
  if (service.features) {
    if (Array.isArray(service.features)) {
      features = service.features;
    } else if (typeof service.features === 'string') {
      try {
        features = JSON.parse(service.features);
      } catch {
        features = [];
      }
    }
  }

  return (
    <section className="w-full min-h-[70vh] flex flex-col md:flex-row gap-8 px-4 md:px-16 py-12 bg-white dark:bg-black mt-20">
      <div className="w-full md:w-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-dashboard-accent text-white font-semibold shadow hover:bg-dashboard-accent-dark transition-all duration-200"
        >
          &larr; Back
        </button>
      </div>
      {/* Service Details */}
      <div className="flex-1 flex flex-col items-start justify-center">
        <div className="flex items-center mb-6 w-full">
          {service.image_url ? (
            <img src={service.image_url} alt={service.title} className="w-20 h-20 object-cover rounded-full border-4 shadow mr-6" />
          ) : (
            <ServiceIcon iconName={service.icon_name} className="w-20 h-20 mr-6 text-dashboard-primary" />
          )}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-0">{service.title}</h2>
        </div>
        <p className="text-dashboard-primary dark:text-white text-lg mb-4">{service.description}</p>
        <div className="text-dashboard-primary dark:text-white text-base mb-6 whitespace-pre-line">{service.content}</div>
        {features.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-xl text-dashboard-primary dark:text-dashboard-primary-light mb-4">Why Choose Our {service.title} Service?</h3>
            <ul className="list-none space-y-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">&#10003;</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Book Service Form */}
      <div className="w-full md:w-[400px] bg-white/80 dark:bg-dashboard-primary/80 rounded-xl shadow-lg p-8 flex flex-col justify-center">
        <h3 className="font-bold text-2xl text-dashboard-accent dark:text-dashboard-accent-dark mb-4">Book This Service</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="px-4 py-2 rounded border border-gray-300 focus:ring-dashboard-accent focus:border-dashboard-accent" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="px-4 py-2 rounded border border-gray-300 focus:ring-dashboard-accent focus:border-dashboard-accent" />
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required className="px-4 py-2 rounded border border-gray-300 focus:ring-dashboard-accent focus:border-dashboard-accent" />
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="px-4 py-2 rounded border border-gray-300 focus:ring-dashboard-accent focus:border-dashboard-accent" />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Additional Details (optional)" rows={3} className="px-4 py-2 rounded border border-gray-300 focus:ring-dashboard-accent focus:border-dashboard-accent" />
          <button type="submit" disabled={submitting} className="mt-2 px-6 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow hover:bg-dashboard-accent-dark transition-all duration-200">
            {submitting ? 'Booking...' : 'Book Service'}
          </button>
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default ServiceDetail; 