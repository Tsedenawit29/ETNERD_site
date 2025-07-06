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
      <section className="w-full py-20 bg-dashboard-primary-lightest dark:bg-dashboard-primary-dark flex flex-col items-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-40 rounded-full bg-dashboard-accent/10 blur-2xl opacity-60 pointer-events-none" />
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-white dark:via-dashboard-accent-dark dark:to-white mt-16">
          Our Services
        </h1>
        <p className="text-lg md:text-xl text-dashboard-primary dark:text-white mb-10 max-w-2xl text-center font-sans mt-6">
          Discover our comprehensive range of cybersecurity, IT infrastructure, and digital transformation services designed to protect and empower your business.
        </p>
      </section>
      {/* Services List Section */}
      <section className="flex flex-col items-center justify-center px-4 md:px-8 w-full bg-white dark:bg-dashboard-primary-bg">
        {loading ? (
          <div className="text-dashboard-primary dark:text-white">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-dashboard-primary dark:text-white">No services found.</div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="bg-white dark:bg-dashboard-primary rounded-3xl shadow-lg border border-dashboard-accent/10 dark:border-dashboard-accent-dark/10 p-8 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl hover:bg-dashboard-primary/5 dark:hover:bg-dashboard-primary/40">
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
                <h3 className="font-bold text-xl text-dashboard-primary dark:text-white mb-2 text-center font-display">{service.title}</h3>
                <p className="text-dashboard-primary dark:text-white text-base mb-6 text-center font-sans">{service.description}</p>
                <Link
                  to={`/services/${service.id}`}
                  className="px-6 py-2 rounded-full bg-dashboard-accent text-white font-semibold shadow hover:bg-orange-600 dark:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-all duration-200 text-base text-center font-display"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Services; 