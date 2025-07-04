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
      <section className="relative w-full min-h-[100vh] max-h-[100vh] flex items-center justify-center overflow-hidden z-0 bg-white dark:bg-black">
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
      <section className="w-full bg-white dark:bg-black py-16 px-4 md:px-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-8 text-center">Our Services</h2>
        {loading ? (
          <div className="text-center text-dashboard-primary dark:text-dashboard-primary-bright">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-dashboard-primary dark:text-dashboard-primary-bright">No services found.</div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {services.map(service => (
              <div key={service.id} className="min-w-[300px] max-w-xs relative rounded-xl shadow-soft flex flex-col items-center snap-center overflow-hidden group bg-white/80 dark:bg-dashboard-primary/80 p-6">
                <div className="flex items-center w-full mb-3">
                  {service.image_url && (
                    <img src={service.image_url} alt={service.title} className="w-16 h-16 object-cover rounded-full border-4  shadow mr-4" />
                  )}
                  <h3 className="font-bold text-lg text-dashboard-accent dark:text-dashboard-accent-dark text-left flex-1">{service.title}</h3>
                </div>
                <div className="w-full">
                  <p className="text-dashboard-primary dark:text-dashboard-primary-bright text-sm mb-2">
                    {truncateSentence(service.description || service.content)}
                  </p>
                  <div className="flex justify-end">
                    <Link to={`/services/${service.id}`} className="text-dashboard-accent dark:text-dashboard-accent-dark font-semibold hover:underline">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

// Helper function to truncate to one sentence
function truncateSentence(text) {
  if (!text) return '';
  const match = text.match(/.*?[.!?](\s|$)/);
  return match ? match[0] : text;
}

export default Home; 