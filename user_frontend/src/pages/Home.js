import React from 'react';
import homeVideo from '../asset/home.mp4';

const Home = () => (
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
    </div>
  </section>
);

export default Home; 