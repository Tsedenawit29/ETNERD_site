import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import ServiceIcon from '../components/ServiceIcon';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('et_services').select('*').order('created_at', { ascending: false });
      if (!error) setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-dashboard-primary-bg flex flex-col items-center relative overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-dashboard-accent/10 rounded-full blur-3xl animate-blob z-0" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-dashboard-accent/10 rounded-full blur-3xl animate-blob2 z-0" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-dashboard-primary/10 rounded-full blur-3xl animate-blob3 z-0" />
        {/* Cyber Network Lines & Dots */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="120" r="6" fill="#2563eb" opacity="0.7" />
          <circle cx="400" cy="80" r="4" fill="#ff9800" opacity="0.7" />
          <circle cx="900" cy="180" r="5" fill="#2563eb" opacity="0.7" />
          <circle cx="1200" cy="100" r="4" fill="#ff9800" opacity="0.7" />
          <circle cx="700" cy="60" r="3" fill="#2563eb" opacity="0.7" />
          <line x1="200" y1="120" x2="400" y2="80" stroke="#2563eb" strokeWidth="2" opacity="0.3" />
          <line x1="400" y1="80" x2="700" y2="60" stroke="#ff9800" strokeWidth="2" opacity="0.3" />
          <line x1="700" y1="60" x2="900" y2="180" stroke="#2563eb" strokeWidth="2" opacity="0.3" />
          <line x1="900" y1="180" x2="1200" y2="100" stroke="#ff9800" strokeWidth="2" opacity="0.3" />
        </svg>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold mb-4 text-center mt-16 drop-shadow-lg z-10">
          <span className="text-dashboard-primary dark:text-white">Our </span>
          <span className="text-dashboard-accent">Services</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-dashboard-primary dark:text-white mb-10 max-w-3xl w-full text-center font-sans mt-6 z-10">
          Discover our comprehensive range of cybersecurity, IT infrastructure, and digital transformation services designed to protect and empower your business.
        </p>
      </section>
      {/* Services List Section */}
      <section className="flex flex-col items-center justify-center px-4 md:px-8 w-full bg-white dark:bg-dashboard-primary-bg pb-20 relative">
        {loading ? (
          <div className="text-dashboard-primary dark:text-white">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-dashboard-primary dark:text-white">No services found.</div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-[-4rem] z-10">
            {services.map(service => (
              <div key={service.id} className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-l-8 border-dashboard-primary p-8 flex flex-col items-center transition-transform hover:scale-[1.04] hover:shadow-[0_8px_32px_0_#2563eb55] hover:bg-dashboard-primary/5 dark:hover:bg-dashboard-primary/40 group overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-2 bg-dashboard-primary rounded-l-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative mb-6 transition-transform duration-300 hover:scale-110">
                  <div className="p-[4px] rounded-full bg-black dark:bg-dashboard-primary">
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-28 h-28 object-cover rounded-full bg-white shadow-xl border-4 border-dashboard-primary"
                      />
                    ) : (
                      <div className="w-28 h-28 flex items-center justify-center rounded-full bg-dashboard-primary/10 dark:bg-dashboard-primary/30">
                        <ServiceIcon iconName={service.icon_name} className="w-12 h-12 text-dashboard-accent" />
                      </div>
                    )}
                  </div>
                  {/* Icon overlay for extra branding */}
                  {service.image_url && (
                    <span className="absolute bottom-0 right-0 bg-dashboard-accent text-white rounded-full p-2 shadow-lg border-2 border-white">
                      <ServiceIcon iconName={service.icon_name} className="w-6 h-6" />
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-2xl text-dashboard-primary dark:text-white mb-2 text-center font-display tracking-tight">{service.title}</h3>
                <p className="text-dashboard-primary dark:text-white text-base mb-6 text-center font-sans leading-relaxed">{service.description}</p>
                <div className="flex flex-col gap-3 w-full items-center">
                  <Link
                    to={`/services/${service.id}`}
                    className="px-6 py-2 rounded-full border-2 border-dashboard-accent text-dashboard-accent bg-white font-semibold shadow hover:bg-dashboard-accent hover:text-white transition-all duration-200 text-base text-center font-display w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Call to Action Box */}
        <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-br from-dashboard-accent/10 via-white to-dashboard-primary/10 dark:from-dashboard-accent/20 dark:via-gray-800 dark:to-dashboard-primary/20 rounded-xl shadow-[0_8px_32px_0_#2563eb55] p-8 border-l-8 border-dashboard-primary flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4 text-dashboard-primary dark:text-white">Need a Custom Solution?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">Our experts can tailor cybersecurity and IT services to your unique business needs. Reach out for a personalized consultation.</p>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow hover:bg-orange-600 dark:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-all duration-200 text-lg text-center font-display"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services; 