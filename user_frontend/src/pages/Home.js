import React, { useEffect, useState } from 'react';
import homeVideo from '../asset/home.mp4';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home = () => {
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
      <section className="relative w-full min-h-[100vh] max-h-[100vh] flex items-center justify-center overflow-hidden z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={homeVideo}
          autoPlay
          loop
          muted
          playsInline
          poster=""
        />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-black/40 dark:bg-black/70">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-4 tracking-tight drop-shadow-lg text-center animate-fade-in">
            Local Brains. Global Standards
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-dashboard-primary-bright mb-8 text-center animate-slide-up drop-shadow">
            At ETNERD Security Solutions, we deliver top-notch, enterprise-wide solutions with a strong focus on cybersecurity, IT infrastructure, and digital transformation. Our mission is to empower businesses with secure, scalable, and innovative technologies that protect their assets, enhance performance, and drive sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 animate-fade-in">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow-lg hover:bg-dashboard-accent-dark transition-all duration-200 text-base text-center"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 rounded-full border-2 border-dashboard-accent text-dashboard-accent bg-transparent font-semibold shadow-lg hover:bg-dashboard-accent hover:text-white transition-all duration-200 text-base text-center"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="w-full bg-white dark:bg-dashboard-primary py-16 px-4 md:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-8 text-center">Our Services</h2>
        {loading ? (
          <div className="text-center text-dashboard-primary dark:text-white">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-dashboard-primary dark:text-white">No services found.</div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {services.map(service => (
              <div key={service.id} className="min-w-[300px] max-w-xs bg-white dark:bg-dashboard-primary-bright rounded-xl shadow-soft p-6 flex flex-col items-center snap-center">
                {service.image_url && (
                  <img src={service.image_url} alt={service.title} className="w-32 h-32 object-cover rounded-lg mb-4 shadow" />
                )}
                <h3 className="font-bold text-xl text-dashboard-accent dark:text-dashboard-accent-dark mb-2 text-center">{service.title}</h3>
                <p className="text-dashboard-primary dark:text-white text-center text-sm mb-2">{service.description || service.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home; 