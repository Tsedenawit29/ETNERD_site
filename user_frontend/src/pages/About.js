import React from 'react';
import { Link } from 'react-router-dom';
import experts from '../asset/experts.jpg';
import aboutHero from '../asset/about.png';

const About = () => {

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-black">
    {/* Hero Section */}
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={aboutHero}
        alt="About ETNERD Hero"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'center' }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-dashboard-primary via-sai-teal-500 to-dashboard-accent opacity-80"></div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-dashboard-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-dashboard-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2"></div>
      <div className="absolute -bottom-8 left-40 w-20 h-20 bg-sai-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob3"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-hero-fade">
          About Us
        </h1>
        <div className="w-24 h-1 bg-dashboard-accent mx-auto mb-8 animate-pulse-glow"></div>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-90">
          Empowering businesses with secure, scalable, and innovative technologies
        </p>
      </div>
    </section>

    {/* First Content Section - Text Left, UI Right */}
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Our Mission & Vision
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
      At ETNERD Security Solutions, we deliver top-notch, enterprise-wide solutions with a strong focus on cybersecurity, IT infrastructure, and digital transformation. Our mission is to empower businesses with secure, scalable, and innovative technologies that protect their assets, enhance performance, and drive sustainable growth.
    </p>
                         <div className="flex items-center space-x-4 pt-4">
               <div className="w-12 h-12 bg-dashboard-primary rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <div>
                 <h3 className="font-semibold text-gray-800 dark:text-white">Enterprise Security</h3>
                 <p className="text-gray-600 dark:text-gray-400">Comprehensive protection for your business</p>
               </div>
             </div>
             <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-sai-teal-500 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <div>
                 <h3 className="font-semibold text-gray-800 dark:text-white">Digital Transformation</h3>
                 <p className="text-gray-600 dark:text-gray-400">Modernize and optimize your operations</p>
               </div>
             </div>
          </div>

          {/* Right Side - UI Element */}
          <div className="relative">
                         <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-float-slow">
               <div className="absolute -top-4 -right-4 w-8 h-8 bg-dashboard-accent rounded-full animate-pulse"></div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
                </div>
                                 <div className="grid grid-cols-3 gap-3">
                   <div className="h-16 bg-dashboard-primary/10 dark:bg-dashboard-primary/20 rounded-lg flex items-center justify-center">
                     <svg className="w-8 h-8 text-dashboard-primary dark:text-dashboard-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                   </div>
                   <div className="h-16 bg-sai-teal-100 dark:bg-sai-teal-900/20 rounded-lg flex items-center justify-center">
                     <svg className="w-8 h-8 text-sai-teal-500 dark:text-sai-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                     </svg>
                   </div>
                   <div className="h-16 bg-dashboard-accent/10 dark:bg-dashboard-accent/20 rounded-lg flex items-center justify-center">
                     <svg className="w-8 h-8 text-dashboard-accent dark:text-dashboard-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                 </div>
              </div>
            </div>
                         <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-dashboard-primary to-dashboard-accent rounded-full opacity-20 animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Second Content Section - UI Left, Text Right */}
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - UI Element */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <img 
                src={experts} 
                alt="Expert Team" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover animate-float-medium"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Expert Team</h3>
                <p className="text-sm opacity-90">Dedicated professionals</p>
              </div>
            </div>
            
            {/* Floating elements */}
                         <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-float-fast">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-dashboard-primary rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                   </svg>
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-gray-800 dark:text-white">24/7 Support</p>
                   <p className="text-xs text-gray-600 dark:text-gray-400">Always available</p>
                 </div>
               </div>
             </div>
             
             <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 animate-float-slow">
               <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 bg-sai-teal-500 rounded-full flex items-center justify-center">
                   <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
                 <div>
                   <p className="text-sm font-semibold text-gray-800 dark:text-white">Secure Solutions</p>
                   <p className="text-xs text-gray-600 dark:text-gray-400">Enterprise-grade</p>
                 </div>
               </div>
             </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Tailored Solutions for Your Business
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
      Whether you're looking to strengthen your cyber defense, modernize your systems, or optimize your operations, our team of experts is committed to providing tailored services that align with your unique business needs. We bring deep industry experience, global standards, and a proactive approach to help our clients stay ahead in an ever-evolving digital landscape.
    </p>
            
                         {/* Feature cards */}
             <div className="grid md:grid-cols-2 gap-4 pt-6">
               <div className="bg-gradient-to-r from-dashboard-primary/10 to-dashboard-primary/20 dark:from-dashboard-primary/20 dark:to-dashboard-primary/30 rounded-xl p-4 border-l-4 border-dashboard-primary">
                 <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Cyber Defense</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Advanced security protocols and threat detection</p>
               </div>
               <div className="bg-gradient-to-r from-sai-teal-50 to-sai-teal-100 dark:from-sai-teal-900/20 dark:to-sai-teal-800/20 rounded-xl p-4 border-l-4 border-sai-teal-500">
                 <h3 className="font-semibold text-gray-800 dark:text-white mb-2">System Modernization</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Upgrade and optimize your infrastructure</p>
               </div>
               <div className="bg-gradient-to-r from-dashboard-accent/10 to-dashboard-accent/20 dark:from-dashboard-accent/20 dark:to-dashboard-accent/30 rounded-xl p-4 border-l-4 border-dashboard-accent">
                 <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Global Standards</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Industry best practices and compliance</p>
               </div>
               <div className="bg-gradient-to-r from-sai-teal-50 to-sai-teal-100 dark:from-sai-teal-900/20 dark:to-sai-teal-800/20 rounded-xl p-4 border-l-4 border-sai-teal-500">
                 <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Proactive Approach</h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">Anticipate and prevent potential issues</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section className="py-20 px-4 bg-white shadow-2xl shadow-orange-900 dark:shadow-orange-500 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center text-black dark:text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-8 opacity-90">
          Let's discuss how ETNERD Security Solutions can help you achieve your goals
        </p>
        <div className="flex justify-center">
          <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow-lg shadow-black/30 hover:bg-dashboard-accent-dark transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl"
            >
             Explore our Services
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 rounded-full border-2 mx-4 border-black text-black bg-transparent font-semibold shadow-lg shadow-black/30 hover:bg-dashboard-accent hover:text-white transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl dark:border-white dark:text-white dark:bg-transparent"
            >
              Contact Us
            </Link>
        </div>
      </div>
  </section>
  </div>
);
};

export default About; 