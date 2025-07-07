import React from 'react';
import saiaImg from '../asset/saia.jpg';
import ipv6Img from '../asset/ipv6.png';

// Web-sourced images/logos (public domain or official initiative pages)
const initiatives = [
  {
    title: 'Women in Cyber Empowerment',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Women_in_Cybersecurity_logo.png', // Example: WiCyS logo (public domain)
    imgAlt: 'Women in Cybersecurity Logo',
    attribution: 'Source: Wikipedia',
    description: (
      <>
        Through Ethiopian Women in Cybersecurity (ETWiC) initiative, we champion gender inclusion in cybersecurity by fostering leadership, mentorship, and opportunities for women to thrive in technical and policy roles.
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
      </>
    ),
  },
  {
    title: 'National Configuration Baseline (NCB) Initiative',
    img: 'https://www.cisecurity.org/-/media/project/cisecurity/cis/images/logos/cis-logo.png', // Example: CIS logo (for config baseline)
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
    img: 'https://thegfce.org/wp-content/uploads/2021/04/GFCE-Logo-2021.png', // Example: Global Forum on Cyber Expertise
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

const Initiatives = () => (
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
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line for timeline */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-dashboard-accent/40 z-0" style={{transform: 'translateX(-50%)'}}></div>
        <div className="flex flex-col gap-16 relative z-10">
          {initiatives.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={item.title} className={`relative flex flex-col md:flex-row items-center md:items-stretch ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* Card on left */}
                {isLeft && (
                  <div className="md:w-1/2 md:pr-8 flex justify-end">
                    <InitiativeCard item={item} align="right" />
                  </div>
                )}
                {/* Timeline dot */}
                <div className="hidden md:flex flex-col items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-dashboard-accent border-4 border-white dark:border-gray-900 shadow-glow z-20" style={{marginTop: '8px'}}></div>
                  {idx !== initiatives.length - 1 && <div className="flex-1 w-1 bg-dashboard-accent/40"></div>}
                </div>
                {/* Card on right */}
                {!isLeft && (
                  <div className="md:w-1/2 md:pl-8 flex justify-start">
                    <InitiativeCard item={item} align="left" />
                  </div>
                )}
                {/* Mobile: show card full width */}
                <div className="md:hidden w-full">
                  <InitiativeCard item={item} align="center" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </div>
);

function InitiativeCard({ item, align }) {
  return (
    <div
      className={
        `bg-white dark:bg-gray-900 rounded-2xl shadow-soft hover:shadow-hover transition-shadow duration-300 p-6 flex flex-col border-t-4 border-dashboard-accent relative max-w-2xl mx-auto min-w-0 md:min-w-[500px]`
      }
      style={{ minHeight: '160px' }}
    >
      {/* Top Row: Image + Title/Attribution */}
      <div className="flex flex-col md:flex-row w-full items-center md:items-start">
        <div className="flex-shrink-0 flex items-center justify-center md:mr-6 mb-4 md:mb-0">
          <img
            src={item.img}
            alt={item.imgAlt}
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-dashboard-primary bg-white dark:bg-gray-800 shadow-glow"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start w-full">
          <h3 className="text-xl md:text-2xl font-bold text-dashboard-primary dark:text-dashboard-accent mb-1 md:mb-2 w-full">
            {item.title}
          </h3>
          <span className="text-xs text-gray-500 mb-2 md:mb-3 w-full text-center md:text-left">{item.attribution}</span>
        </div>
      </div>
      {/* Description: full width below image+title */}
      <div className="text-gray-700 dark:text-gray-300 text-base w-full text-center md:text-left md:pl-0 md:pr-0 mt-2 md:mt-0">
        {item.description}
      </div>
    </div>
  );
}

export default Initiatives; 