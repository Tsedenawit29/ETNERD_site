import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import saiaImg from '../asset/saia.jpg';
import ipv6Img from '../asset/ipv6.png';
import wicImg from '../asset/wic.png';
import globalstandardsImg from '../asset/globalstandards.jpg';
import capacityimg from '../asset/capacity.jpg';

// Web-sourced images/logos (public domain or official initiative pages)
const initiatives = [
  {
    title: 'Women in Cyber Empowerment',
    img: wicImg, // Example: WiCyS logo (public domain)
    imgAlt: 'Women in Cybersecurity Logo',
    attribution: 'Source: Wikipedia',
    description: (
      <>
        Through Ethiopian Women in Cybersecurity (ETWiC) initiative, we champion gender inclusion in cybersecurity by fostering leadership, mentorship, and opportunities for women to thrive in technical and policy roles.
        <br />
        <a
          href="https://etwic.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-dashboard-accent underline hover:text-dashboard-primary font-semibold"
        >
          Learn more
        </a>
      </>
    ),
  },
  {
    title: 'National IPv6 Awareness',
    img: ipv6Img,
    imgAlt: 'World IPv6 Launch Logo',
    attribution: 'Source: worldipv6launch.org',
    description: (
      <>
        IPv6 Ethiopia is an initiative aimed at raising awareness about IPv6, its importance, and its adoption across the country. As the foundation of the future internet, IPv6 ensures scalability, security, and connectivity for the next generation of digital services and innovation.
        <br />
        <a
          href="https://ipv6et.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-dashboard-accent underline hover:text-dashboard-primary font-semibold"
        >
          Learn more
        </a>
      </>
    ),
  },
  {
    title: 'AI Security in Africa',
    img: saiaImg,
    imgAlt: 'SAIA Initiative Logo',
    attribution: 'Source: local asset',
    description: (
      <>
        Secure AI in Africa (SAI²) is an initiative dedicated to advancing AI security across the continent by promoting awareness, delivering targeted training, and fostering local capacity. This initiative also focuses on securing emerging technologies.
        <br />
        <a
          href="https://secureaiafrica.africa/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-dashboard-accent underline hover:text-dashboard-primary font-semibold"
        >
          Learn more
        </a>
      </>
    ),
  },
  {
    title: 'National Configuration Baseline (NCB) Initiative',
    img: globalstandardsImg , // Example: CIS logo (for config baseline)
    imgAlt: 'CIS Security Logo',
    attribution: 'Source: cisecurity.org',
    description: (
      <>
        <span className="font-semibold">Standardizing Security. Strengthening National Resilience.</span><br/>
        The National Configuration Baseline (NCB) is a critical cybersecurity initiative focused on establishing standardized, secure, and centrally managed system configurations across public institutions and key national sectors. This initiative ensures consistent security posture, reduces vulnerabilities, and simplifies compliance with national and international cybersecurity standards.
      </>
    ),
  },
  {
    title: 'Capacity Building',
    img: capacityimg, // Example: Global Forum on Cyber Expertise
    imgAlt: 'GFCE Logo',
    attribution: 'Source: thegfce.org',
    description: (
      <>
        We train IT professionals, the youth, and all relevant stakeholders on emerging cyber threats and how to harden, defend, and monitor their data flow (North South and East West traffic).
      </>
    ),
  },
];

const impactAreas = [
  {
    icon: (
      <svg className="w-8 h-8 text-dashboard-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 7v9m-7-7h14" /></svg>
    ),
    title: 'Bridging Gaps',
    desc: 'Addressing critical cybersecurity gaps in policy, technology, and awareness.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-sai-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h1" /></svg>
    ),
    title: 'Empowering Communities',
    desc: 'Building local capacity and fostering inclusion for a resilient digital society.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-dashboard-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2m-4-4V7a4 4 0 10-8 0v6a4 4 0 008 0z" /></svg>
    ),
    title: 'Driving Innovation',
    desc: 'Promoting secure adoption of emerging technologies and best practices.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-sai-teal-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3" /></svg>
    ),
    title: 'Strengthening Resilience',
    desc: 'Ensuring sustainable, standardized, and secure digital infrastructure.'
  },
];

// Add this style block at the top or bottom of the file for custom animation
// You can also move this to your CSS file if preferred
const floatingDotStyle = `
@keyframes floatDot {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
.floating-dot {
  animation: floatDot 2.5s ease-in-out infinite;
}
`;

// SVG icon badge component
function InitiativeIcon({ type }) {
  // Choose icon based on initiative type
  switch (type) {
    case 'Women in Cyber Empowerment':
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dashboard-primary text-white shadow-lg mr-3">
          {/* User/Group Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </span>
      );
    case 'National IPv6 Awareness':
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sai-teal-500 text-white shadow-lg mr-3">
          {/* Network Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0V4m0 7v9m8-8h-4m-8 0H4" /></svg>
        </span>
      );
    case 'AI Security in Africa':
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dashboard-accent text-white shadow-lg mr-3">
          {/* AI/Chip Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="7" width="10" height="10" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9v6m18-6v6M9 3h6m-6 18h6" /></svg>
        </span>
      );
    case 'National Configuration Baseline (NCB) Initiative':
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-dashboard-primary text-white shadow-lg mr-3">
          {/* Shield/Config Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        </span>
      );
    case 'Capacity Building':
      return (
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sai-teal-500 text-white shadow-lg mr-3">
          {/* Graduation Cap Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0 0c-4.418 0-8-1.79-8-4" /></svg>
        </span>
      );
    default:
      return null;
  }
}

// Animated blob component (improved for more visual appeal)
function AnimatedBlob({ color, className }) {
  return (
    <div
      className={`absolute z-0 ${className} w-40 h-40 rounded-full ${color} filter blur-2xl opacity-30 animate-blob`}
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Floating, animated initiative card
function InitiativeCard({ item, align, index }) {
  // Alternate blob color
  const blobColor = index % 2 === 0 ? 'bg-dashboard-primary' : 'bg-dashboard-accent';
  // Card float/tilt animation
  const floatClass = index % 2 === 0 ? 'animate-float-slow rotate-2' : 'animate-float-medium -rotate-2';
  return (
    <div className="relative flex flex-col w-full max-w-4xl min-w-0 mx-auto">
      {/* Animated blob background */}
      <AnimatedBlob color={blobColor} className={align === 'left' ? 'left-0 -top-8' : 'right-0 -top-8'} />
      {/* Card */}
      <div
        className={`relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl px-14 py-5 flex flex-col w-full border-t-4 border-dashboard-accent ${floatClass} transition-transform duration-500 md:max-w-4xl md:min-h-[120px]`}
      >
        {/* Top Row: Image + Title/Icon */}
        <div className="flex flex-col md:flex-row w-full items-center md:items-center">
          <div className="flex-shrink-0 flex items-center justify-center md:mr-10 mb-4 md:mb-0">
            <img
              src={item.img}
              alt={item.imgAlt}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-dashboard-primary bg-white dark:bg-gray-800 shadow-glow"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col items-center md:items-start w-full">
            <div className="flex items-center mb-2">
              <InitiativeIcon type={item.title} />
              <h3 className="text-xl md:text-2xl font-bold text-dashboard-primary dark:text-dashboard-accent ml-1">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
        {/* Description: full width below image+title */}
        <div className="w-full mt-2 text-left text-gray-700 dark:text-gray-200 text-base">
          {item.description}
        </div>
      </div>
    </div>
  );
}

export default function Initiatives() {
  const cardRefs = useRef([]);
  const timelineRef = useRef();
  const [dotTop, setDotTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const timelineRect = timelineRef.current?.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      let minDist = Infinity;
      let bestIdx = 0;
      cardRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenter - viewportCenter);
          if (dist < minDist) {
            minDist = dist;
            bestIdx = idx;
          }
        }
      });
      // Set the dot position to the center of the best card, relative to the timeline section
      const bestRef = cardRefs.current[bestIdx];
      if (bestRef && timelineRect) {
        const rect = bestRef.getBoundingClientRect();
        setDotTop(rect.top + rect.height / 2 - timelineRect.top);
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Inject custom animation style */}
      <style>{floatingDotStyle}</style>
      <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-black">
        {/* Hero Section */}
        <section className="relative h-72 flex items-center justify-center overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-dashboard-primary via-sai-teal-500 to-dashboard-accent opacity-80"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {/* Animated blobs */}
          <div className="absolute top-10 left-10 w-24 h-24 bg-dashboard-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-24 right-10 w-20 h-20 bg-dashboard-accent rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2"></div>
          <div className="absolute -bottom-8 left-40 w-16 h-16 bg-sai-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob3"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-hero-fade">
              Securing the Digital Future — One Initiative at a Time.
            </h1>
            <div className="w-20 h-1 bg-dashboard-accent mx-auto mb-4 animate-pulse-glow"></div>
          </div>
        </section>

        {/* Mission & Impact Areas Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Mission Paragraph */}
            <div>
              <h2 className="text-3xl font-bold text-dashboard-primary dark:text-dashboard-accent mb-4">Our Strategic Mission</h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-900/80 rounded-xl p-6 shadow-soft">
                At the heart of our mission lies a commitment to building a safer, more resilient digital world. We lead with purpose across five strategic cybersecurity initiatives, each designed to address critical gaps, drive innovation, and empower communities in the evolving cyber landscape.
              </p>
            </div>
            {/* Impact Areas (inspired by About page) */}
            <div>
              <h2 className="text-2xl font-bold text-dashboard-accent dark:text-dashboard-primary mb-4">Strategic Impact Areas</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {impactAreas.map((area) => (
                  <div key={area.title} className="flex flex-col items-center bg-gradient-to-br from-dashboard-primary/10 to-dashboard-accent/10 dark:from-dashboard-primary/20 dark:to-dashboard-accent/20 rounded-xl p-4 border-l-4 border-dashboard-accent shadow-soft">
                    {area.icon}
                    <h3 className="font-semibold text-gray-800 dark:text-white mt-2 mb-1 text-center">{area.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  </section>

        {/* Timeline/Alternating Initiatives Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
            {/* Centered vertical line for timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-dashboard-accent/40 z-0" style={{transform: 'translateX(-50%)'}}></div>
            {/* Single floating dot, moves with scroll */}
            <div
              className="hidden md:block absolute left-1/2 z-20"
              style={{ transform: 'translateX(-50%)', top: dotTop ? `${dotTop - 16}px` : '0px', transition: 'top 0.3s cubic-bezier(0.4,0,0.2,1)' }}
            >
              <div className="w-8 h-8 rounded-full bg-dashboard-accent border-4 border-white dark:border-gray-900 shadow-glow floating-dot"></div>
            </div>
            <div className="flex flex-col gap-12 relative z-10">
              {initiatives.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={item.title}
                    ref={el => cardRefs.current[idx] = el}
                    className="relative w-full flex md:items-center"
                  >
                    {/* Card on left or right */}
                    {isLeft ? (
                      <div className="hidden md:flex w-1/2 justify-end pr-8">
                        <InitiativeCard item={item} align="right" index={idx} />
                      </div>
                    ) : (
                      <div className="hidden md:flex w-1/2 order-2 justify-start pl-8">
                        <InitiativeCard item={item} align="left" index={idx} />
                      </div>
                    )}
                    {/* Empty space for alternate side */}
                    {isLeft ? (
                      <div className="hidden md:block w-1/2" />
                    ) : (
                      <div className="hidden md:block w-1/2 order-1" />
                    )}
                    {/* Mobile: show card full width */}
                    <div className="md:hidden w-full">
                      <InitiativeCard item={item} align="center" index={idx} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

         {/* Call to Action Section */}
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center text-black dark:text-white">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl mb-8 opacity-90">
          Let's discuss how ETNERD Security Solutions can help you achieve your goals
        </p>
        <div className="flex justify-center">
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-dashboard-accent text-white font-semibold shadow-lg shadow-black/30 hover:bg-gray-100 transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl"
          >
            Explore our Services
          </Link>
          <Link
            to="/services"
            className="px-6 py-3 rounded-full border-2 mx-4 border-black dark:border-white text-black dark:text-white bg-transparent font-semibold shadow-lg shadow-black/30 hover:bg-white hover:text-dashboard-accent transition-all duration-300 text-base text-center transform hover:-translate-y-1 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
      </div>
    </>
  );
} 