import React from 'react';

// Re-using your partner data
const partners = [
  { name: 'US Department of State (DoS)', img: 'https://www.rasbyte.com/assets/State%20Dept-DXvv341D.gif' },
  { name: 'US Department of Homeland Security (DHS)', img: 'https://www.rasbyte.com/assets/DHS-CHJFAPAT.gif' },
  { name: 'Cybersecurity and Infrastructure Security Agency (CISA)', img: 'https://www.rasbyte.com/assets/CISA-B4Ey4v85.gif' },
  { name: 'United States Marine Corps (USMC)', img: 'https://www.rasbyte.com/assets/marine%20corps-BlchUT9D.gif' },
  { name: 'US Customs and Border Protection (CBP)', img: 'https://www.rasbyte.com/assets/CBP-CstKOaYz.gif' },
  { name: 'Federal Emergency Management Agency (FEMA)', img: 'https://www.rasbyte.com/assets/FEMA-DaTuI4qN.gif' },
  { name: 'United States Coast Guard (USCG)', img: 'https://www.rasbyte.com/assets/USCG-CWt4pgg0.gif' },
  { name: 'McAfee', img: 'https://www.rasbyte.com/assets/mcafee-Dp9OQN6g.gif' },
  { name: 'US Patent and Trademark Office', img: 'https://www.rasbyte.com/assets/uspto-g6Eu00FB.gif' },
];

const Capabilities = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black text-dashboard-primary dark:text-white overflow-hidden pt-24">

      {/* --- Hero Section for Capabilities --- */}
      <section className="relative z-10 py-16 px-4 md:px-8 text-center bg-transparent">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-dashboard-primary dark:text-white mb-6 animate-fade-in-up">
            Our <span className="text-dashboard-accent">Expertise</span> & Proven Track Record
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in delay-200">
          At ETNERD, we blend deep technical expertise with extensive experience in high-stakes environments to deliver robust, reliable solutions for your most critical needs
          </p>
        </div>
      </section>

      {/* --- Core Capabilities Section --- */}
      <section className="relative z-10 py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black shadow-inner">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dashboard-primary dark:text-white mb-12 text-center">
            Key <span className="text-dashboard-accent">Cybersecurity & IT</span> Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Capability Card 1 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002 12c0 2.755 1.5 5.242 3.242 7.159L12 22.95l6.758-3.791A12.007 12.007 0 0022 12c0-4.478-2.683-8.266-6.418-9.016z"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Advanced Threat Protection</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Implementing state-of-the-art firewalls, intrusion detection/prevention systems, and endpoint security to proactively defend against evolving cyber threats.
              </p>
            </div>

            {/* Capability Card 2 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Incident Response & Recovery</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Developing comprehensive plans and rapid response teams to minimize damage, contain breaches, and ensure swift recovery from security incidents.
              </p>
            </div>

            {/* Capability Card 3 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-8-4v8m0-8h.01"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Secure Network Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Designing and implementing resilient and secure network infrastructures that protect data in transit and at rest, both on-premise and in the cloud.
              </p>
            </div>

            {/* Capability Card 4 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h2a2 2 0 012 2v1m-4 0h4"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Compliance & Governance</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Assisting organizations in achieving and maintaining compliance with international standards like ISO 27001, GDPR, and local regulatory requirements.
              </p>
            </div>

            {/* Capability Card 5 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h4l2-2m3-2l-3-3m0 0l3-3m-3 3v4m-3 3h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Vulnerability Management</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Conducting regular vulnerability assessments and penetration testing to identify weaknesses and provide actionable insights for remediation.
              </p>
            </div>

            {/* Capability Card 6 */}
            <div className="group flex flex-col p-8 bg-white dark:bg-dashboard-primary-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dashboard-accent/10 dark:bg-dashboard-accent/20 text-dashboard-accent mb-6 transition-all duration-300 group-hover:bg-dashboard-accent group-hover:text-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className="font-display text-xl font-bold text-dashboard-primary dark:text-white mb-3">Managed Security Services</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Providing continuous monitoring, threat intelligence, and security operations center (SOC) services to protect your infrastructure 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Federal Experience & Partnerships --- */}
      <section className="relative z-10 py-16 px-4 md:px-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dashboard-primary dark:text-white mb-12">
            Our <span className="text-dashboard-accent">Trusted Experience</span>
          </h2>
          <div className="bg-white dark:bg-dashboard-primary-bg rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our team members have proudly served as government contractors for a diverse range of prestigious US Federal agencies and private firms, gaining invaluable experience in complex, high-security environments.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6 justify-items-center items-center">
              {partners.map((partner, index) => (
                <div key={partner.name} className="flex flex-col items-center group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg p-2"
                     style={{ animationDelay: `${index * 0.1}s` }}>
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className="h-20 w-auto object-contain mb-3 transition-all duration-300"
                  />
                  <span className="text-center text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-dashboard-accent transition-colors duration-300 max-w-[12rem] leading-tight">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="relative z-10 py-20 px-4 md:px-8 text-white text-center shadow-2xl shadow-orange-200 dark:shadow-orange-500 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-black dark:text-white">
            Ready to Secure Your Digital Future?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-black dark:text-white/90">
            Partner with ETNERD for unparalleled cybersecurity, robust IT infrastructure, and seamless digital transformation.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-dashboard-accent text-white font-semibold rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Get a Free Consultation
          </a>
        </div>
      </section>

      {/* Background Shapes/Animations for visual interest */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-dashboard-accent/10 rounded-full blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-dashboard-primary/10 rounded-full blur-3xl opacity-30 animate-blob2 delay-500" />
      <div className="absolute top-1/4 left-1/2 w-64 h-64 bg-dashboard-accent/5 rounded-full blur-3xl opacity-20 animate-blob3 delay-1000" />
      <div style={{ marginBottom: '3rem' }} />
    </div>
  );
};

export default Capabilities;