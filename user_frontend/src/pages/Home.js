import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ensure supabaseClient is correctly configured
import ServiceIcon from '../components/ServiceIcon'; // Assuming ServiceIcon component exists
import etnerdImage from '../asset/hero5.jpg'; // Your background hero image
import RasbyteLogo from '../asset/rasbytepartner.png';
import compassLogo from '../asset/compass.png';
import ipv6etLogo from '../asset/ipv6.png';
import cdiLogo from '../asset/cdi.png';
import SaiaLogo from '../asset/saia.jpg';
import '../../src/App.css';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCards = 3;
  const carouselInterval = useRef(null);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);
  const newsVisibleCards = 3;
  const newsCarouselInterval = useRef(null);
  const iconsRowRef = useRef(null);
  const whyChooseRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('et_services').select('*').order('created_at', { ascending: false });
      if (!error) setServices(data || []);
      setLoading(false);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      const { data, error } = await supabase
        .from('et_news')
        .select('*')
        .eq('active', true)
        .order('published_date', { ascending: false });
      if (!error) setNews(data || []);
      setNewsLoading(false);
    };
    fetchNews();
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    if (services.length > visibleCards) {
      carouselInterval.current = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % services.length);
      }, 3500);
      return () => clearInterval(carouselInterval.current);
    }
  }, [services]);

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % services.length);
  };
  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Helper to get visible services for carousel
  const getVisibleServices = () => {
    if (services.length <= visibleCards) return services;
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      result.push(services[(carouselIndex + i) % services.length]);
    }
    return result;
  };

  // Auto-slide carousel for news
  useEffect(() => {
    if (news.length > newsVisibleCards) {
      const interval = setInterval(() => {
        setNewsCarouselIndex((prev) => (prev + 1) % news.length);
      }, 4000); // Slide every 4 seconds
      return () => clearInterval(interval);
    }
  }, [news, newsVisibleCards]);

  const nextNewsSlide = () => {
    setNewsCarouselIndex((prev) => (prev + 1) % news.length);
  };
  const prevNewsSlide = () => {
    setNewsCarouselIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  // Helper to get visible news for carousel
  const getVisibleNews = () => {
    if (news.length === 0) return [];
    const result = [];
    // Center the current card
    const half = Math.floor(newsVisibleCards / 2);
    for (let i = -half; i <= half; i++) {
      const idx = (newsCarouselIndex + i + news.length) % news.length;
      result.push(news[idx]);
    }
    return result;
  };

  // Animate icons row on mount
  useEffect(() => {
    if (iconsRowRef.current) {
      const icons = iconsRowRef.current.querySelectorAll('.hero-icon-animate');
      icons.forEach((icon, i) => {
        icon.style.opacity = 0;
        icon.style.transform = 'translateY(30px)';
        setTimeout(() => {
          icon.style.transition = 'opacity 0.7s cubic-bezier(0.77,0,0.18,1), transform 0.7s cubic-bezier(0.77,0,0.18,1)';
          icon.style.opacity = 1;
          icon.style.transform = 'translateY(0)';
        }, 300 + i * 180);
      });
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-dashboard-primary-bg">
        {/* Dropdown chevron icon on the bottom left */}
        <button
          className="absolute left-6 bottom-8 z-30 p-2 rounded-full bg-white/80 dark:bg-black/60 shadow-lg hover:bg-dashboard-accent transition-all duration-300 animate-bounce"
          onClick={() => whyChooseRef.current && whyChooseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          aria-label="Scroll to icons"
        >
          <svg className="w-8 h-8 text-dashboard-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {/* Full background image with continuous movement - always showing full Ethiopian map */}
        <img
          src={etnerdImage}
          alt="ETNERD Hero Background - Ethiopian Map"
          className="absolute inset-0 w-full h-full object-cover z-0 hero-pro"
          style={{ objectPosition: 'center 35%' }}
        />
        {/* Dark shadow overlay that gradually lightens */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/60 to-black/40 dark:from-black/90 dark:via-black/70 dark:to-black/50 animate-shadow-lift" />
        {/* Global connection lines - strategically placed */}
        <div className="absolute inset-0 z-15 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 w-px h-32 bg-gradient-to-b from-dashboard-primary/30 to-transparent animate-pulse-slow" />
          <div className="absolute top-1/2 right-1/4 w-24 h-px bg-gradient-to-r from-dashboard-accent/30 to-transparent animate-pulse-medium" />
          <div className="absolute bottom-1/3 left-1/3 w-16 h-px bg-gradient-to-r from-dashboard-primary/25 to-transparent animate-pulse-fast" />
          <div className="absolute top-1/3 right-1/3 w-20 h-px bg-gradient-to-r from-dashboard-accent/25 to-transparent animate-pulse-slow" />
        </div>
        {/* Animated accent shapes with knowledge theme */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-dashboard-primary/20 blur-3xl opacity-60 animate-blob z-5" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-dashboard-accent/25 blur-2xl opacity-50 animate-blob2 z-5" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-dashboard-primary/15 blur-2xl opacity-40 animate-blob3 z-5" />
        {/* Main content in front */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full px-4 text-center">
          {/* Ethiopian flag colors accent */}
          <div className="absolute top-8 left-8 w-16 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full opacity-60 animate-pulse-slow" />
          <div className="absolute top-8 right-8 w-16 h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full opacity-60 animate-pulse-slow" />
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-3 tracking-tight drop-shadow-lg animate-fade-in hero-title-bold"
            style={{ marginTop: '10rem' }}
          >
            Local Brains. <span className="text-dashboard-accent">Global Standards.</span>
          </h1>
          <p className="max-w-4xl text-base md:text-lg lg:text-xl text-gray-200 mb-8 animate-slide-up drop-shadow leading-relaxed hero-desc-bold"
            style={{ marginTop: '1rem' }}
          >
            At <span className="text-dashboard-accent font-semibold">ETNERD Security Solutions</span>, we harness the power of Ethiopian innovation and global expertise to deliver world-class cybersecurity, IT infrastructure, and digital transformation solutions. Our mission is to empower businesses with secure, scalable, and innovative technologies that protect their assets, enhance performance, and drive sustainable growth across Africa and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-0 animate-fade-in">
                {/* About Us Button - White background, dark text */}
            <Link
              to="/about"
              className="px-6 py-3 rounded-full border-2 border-white text-white bg-transparent font-semibold shadow-lg shadow-black/30 hover:bg-dashboard-accent hover:text-white transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl"
            >
              About Us
            </Link>
            {/* Contact Us Button - Orange background, white text */}
            <Link
              to="/initiatives"
              className="px-6 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow-lg shadow-black/30 hover:bg-dashboard-accent-dark transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl"
            >
              Our Initiatives
            </Link>
          </div>
          {/* Security, Innovation, World icons row */}
          <div ref={iconsRowRef} className="mt-20 flex flex-row items-center justify-center gap-10">
            {/* Security Icon */}
            <div className="flex flex-col items-center hero-icon-animate">
              <svg className="w-20 h-20 text-dashboard-primary mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2l8 4v6c0 5.55-3.84 10.74-9 12C5.84 22.74 2 17.55 2 12V6l10-4z" fill="#133041" fillOpacity="0.7" />
                <circle cx="12" cy="13" r="3" fill="#ff9800" />
              </svg>
              <span className="text-sm font-semibold text-dashboard-primary dark:text-dashboard-primary">Security</span>
            </div>
            {/* Innovation Icon (Lightbulb) */}
            <div className="flex flex-col items-center hero-icon-animate">
              <svg className="w-20 h-20 text-dashboard-accent mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#ff9800" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="3" fill="#ff9800" fillOpacity="0.3" />
              </svg>
              <span className="text-sm font-semibold text-dashboard-accent dark:text-dashboard-accent-dark">Innovation</span>
            </div>
            {/* World Icon */}
            <div className="flex flex-col items-center hero-icon-animate">
              <svg className="w-20 h-20 text-dashboard-primary mb-2" fill="none" stroke="#133041" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#133041" fillOpacity="0.15" />
                <ellipse cx="12" cy="12" rx="8" ry="4" stroke="#ff9800" strokeWidth="2" fill="none" />
                <path d="M12 2a10 10 0 0 1 0 20M2 12a10 10 0 0 1 20 0" stroke="#ff9800" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-sm font-semibold text-dashboard-primary dark:text-dashboard-primary">Global Impact</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ETNERD Section */}
      <section ref={whyChooseRef} className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-dashboard-primary dark:via-dashboard-accent-dark dark:to-dashboard-primary">
              Why Choose <span className="font-bold">ETNERD</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We combine Ethiopian innovation with global cybersecurity expertise to deliver unmatched value and protection for your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Certified Experts */}
            <div className="group bg-white dark:bg-dashboard-primary-bg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-dashboard-primary to-dashboard-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zM12 15l-3-3 1.41-1.41L12 12.17l1.59-1.59L15 12l-3 3z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-4">
                Certified Experts
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our team holds internationally recognized certifications including CISSP, CEH, and CompTIA Security+. We bring world-class expertise with deep understanding of local business environments.
              </p>
            </div>

            {/* Enterprise-Grade Security */}
            <div className="group bg-white dark:bg-dashboard-primary-bg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-dashboard-accent to-dashboard-accent-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-4">
                Enterprise-Grade Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We implement robust, scalable security solutions designed for large organizations. Our infrastructure protection and threat detection systems meet global enterprise standards.
              </p>
            </div>

            {/* Proactive Approach */}
            <div className="group bg-white dark:bg-dashboard-primary-bg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-dashboard-primary to-dashboard-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.06.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-4">
                Proactive Defense
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We don't wait for attacks to happen. Our advanced threat intelligence and predictive analytics identify and neutralize risks before they impact your business operations.
              </p>
            </div>

            {/* Global Standards */}
            <div className="group bg-white dark:bg-dashboard-primary-bg rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-dashboard-accent to-dashboard-accent-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-4">
                Global Standards
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our solutions align with international best practices including ISO 27001, NIST, and GDPR compliance. We ensure your business meets global cybersecurity standards while maintaining local relevance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section - Carousel */}
      <section className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-dashboard-primary dark:via-dashboard-accent-dark dark:to-dashboard-primary">
              Latest News
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stay up to date with our latest announcements and stories.
            </p>
          </div>
          {newsLoading ? (
            <div className="text-center text-dashboard-primary dark:text-white text-xl">Loading news...</div>
          ) : news.length === 0 ? (
            <div className="text-center text-dashboard-primary dark:text-white text-lg">No news articles found.</div>
          ) : (
            <div className="relative">
              {/* Left hover zone for moving left */}
              {news.length > newsVisibleCards && (
                <div
                  className="absolute left-0 top-0 h-full w-1/4 z-20 cursor-pointer"
                  onMouseEnter={() => {
                    if (!newsCarouselInterval.current) {
                      newsCarouselInterval.current = setInterval(() => {
                        setNewsCarouselIndex((prev) => (prev - 1 + news.length) % news.length);
                      }, 2000);
                    }
                  }}
                  onMouseLeave={() => {
                    if (newsCarouselInterval.current) {
                      clearInterval(newsCarouselInterval.current);
                      newsCarouselInterval.current = null;
                    }
                  }}
                />
              )}
              {/* Right hover zone for moving right */}
              {news.length > newsVisibleCards && (
                <div
                  className="absolute right-0 top-0 h-full w-1/4 z-20 cursor-pointer"
                  onMouseEnter={() => {
                    if (!newsCarouselInterval.current) {
                      newsCarouselInterval.current = setInterval(() => {
                        setNewsCarouselIndex((prev) => (prev + 1) % news.length);
                      }, 2000);
                    }
                  }}
                  onMouseLeave={() => {
                    if (newsCarouselInterval.current) {
                      clearInterval(newsCarouselInterval.current);
                      newsCarouselInterval.current = null;
                    }
                  }}
                />
              )}
              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out justify-center items-center">
                  {getVisibleNews().map((item, i) => {
                    const centerIdx = Math.floor(newsVisibleCards / 2);
                    const isCenter = i === centerIdx;
                    const isSecond = i === centerIdx - 1 || i === centerIdx + 1;
                    return (
                      <div
                        key={item.id}
                        className={`flex-shrink-0 px-2 transition-all duration-500 
                          ${isCenter ? 'scale-110 z-20 shadow-3xl bg-white dark:bg-dashboard-primary-bg' : ''}
                          ${isSecond && !isCenter ? 'scale-105 z-10 shadow-xl opacity-90' : ''}
                          ${!isCenter && !isSecond ? 'scale-95 opacity-60' : ''}
                        `}
                        style={{ maxWidth: '370px', minWidth: '270px' }}
                      >
                        <div
                          className="relative rounded-2xl shadow-lg overflow-hidden min-h-[220px] flex flex-col justify-end group border border-dashboard-accent/10 h-full bg-white dark:bg-dashboard-primary-bg"
                        >
                          {/* Published date at top right, with more space */}
                          <span className="absolute top-4 right-6 text-xs text-dashboard-accent font-semibold bg-white/80 dark:bg-dashboard-primary-bg/80 px-3 py-1 rounded-full z-10 shadow-md">
                            {item.published_date ? new Date(item.published_date).toLocaleDateString() : ''}
                          </span>
                          <div className="relative z-10 p-4 flex flex-col h-full justify-end">
                            <h3 className="text-lg font-bold text-dashboard-primary dark:text-white font-display mb-1 line-clamp-2 mt-8">
                              {item.headline}
                            </h3>
                            <p className="text-dashboard-primary/80 dark:text-gray-200 text-sm mb-3 line-clamp-3">
                              {item.content.split(' ').slice(0, 20).join(' ')}{item.content.split(' ').length > 20 ? '...' : ''}
                            </p>
                            <Link
                              to="/news"
                              className="inline-flex items-center text-dashboard-accent font-semibold hover:text-orange-600 transition-colors duration-200 text-sm mt-auto"
                            >
                              Read more
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Navigation Arrows */}
              {news.length > newsVisibleCards && (
                <>
                  <button
                    onClick={prevNewsSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 z-30"
                    aria-label="Previous news"
                  >
                    <svg className="w-5 h-5 text-dashboard-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextNewsSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 z-30"
                    aria-label="Next news"
                  >
                    <svg className="w-5 h-5 text-dashboard-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Our Services Section */}
      <section className="w-full bg-white dark:bg-dashboard-primary-bg py-16 px-4 md:px-8 flex flex-col items-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-dashboard-primary dark:via-dashboard-accent-dark dark:to-dashboard-primary">
          Our Services
        </h2>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          {services.slice(0, 3).map(service => (
            <div key={service.id} className="flex flex-col items-center bg-white dark:bg-dashboard-primary rounded-3xl shadow-lg border border-dashboard-accent/10 dark:border-dashboard-accent-dark/10 p-6 transition-transform hover:scale-105 hover:shadow-2xl">
              {service.image_url ? (
                <img src={service.image_url} alt={service.title} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-lg" />
              ) : (
                <div className="w-full h-48 flex items-center justify-center rounded-2xl bg-dashboard-primary/10 dark:bg-dashboard-primary/30 mb-6">
                  <ServiceIcon iconName={service.icon_name} className="w-16 h-16 text-dashboard-accent" />
                </div>
              )}
              <h3 className="font-bold text-xl text-dashboard-primary dark:text-white mb-2 text-center font-display">{service.title}</h3>
              <p className="text-dashboard-primary dark:text-white text-base mb-4 text-center font-sans">{service.description}</p>
            </div>
          ))}
        </div>
        <Link to="/services" className="px-8 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow-lg hover:bg-dashboard-accent-dark transition-all duration-300 text-lg font-display">Discover More</Link>
      </section>

      {/* Partners Section */}
      <section className="w-full py-20 bg-white dark:bg-dashboard-primary-bg flex flex-col items-center">
        <div className="w-full bg-white dark:bg-dashboard-primary-bg rounded-3xl shadow-2xl px-0 py-12 mx-auto flex flex-col items-center border border-dashboard-primary/10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2 text-center bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-white dark:via-dashboard-accent-dark dark:to-white">
            Our Valuable Partners
          </h2>
          <p className="text-base md:text-lg text-dashboard-primary dark:text-white mb-8 text-center max-w-2xl">ETNERD is privileged to have a trusted network of partners who help us deliver world-class solutions and services to our clients.</p>
          <div className="flex flex-nowrap justify-center items-center gap-20 w-full overflow-x-auto px-8 mb-4">
            {/* Partner logos - full width, horizontal, animated */}
            <img src={RasbyteLogo} alt="Rasbyte" className="h-24 w-auto object-contain transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-partner-bounce-x" style={{ animationDelay: '0s' }} />
            <img src={compassLogo} alt="Compass" className="h-24 w-auto object-contain transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-partner-bounce-x" style={{ animationDelay: '0.5s' }} />
            <img src={ipv6etLogo} alt="ipv6 Ethiopia" className="h-24 w-auto object-contain transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-partner-bounce-x" style={{ animationDelay: '1s' }} />
            <img src={cdiLogo} alt="CDI" className="h-24 w-auto object-contain transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-partner-bounce-x" style={{ animationDelay: '1.5s' }} />
            <img src={SaiaLogo} alt="Saia" className="h-24 w-auto object-contain transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl cursor-pointer animate-partner-bounce-x" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;