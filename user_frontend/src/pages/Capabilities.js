import React from 'react';

const partners = [
  {
    name: 'US Department of State (DoS)',
    img: 'https://www.rasbyte.com/assets/State%20Dept-DXvv341D.gif',
  },
  {
    name: 'US Department of Homeland Security (DHS)',
    img: 'https://www.rasbyte.com/assets/DHS-CHJFAPAT.gif',
  },
  {
    name: 'Cybersecurity and Infrastructure Security Agency (CISA)',
    img: 'https://www.rasbyte.com/assets/CISA-B4Ey4v85.gif',
  },
  {
    name: 'United States Marine Corps (USMC)',
    img: 'https://www.rasbyte.com/assets/marine%20corps-BlchUT9D.gif',
  },
  {
    name: 'US Customs and Border Protection (CBP)',
    img: 'https://www.rasbyte.com/assets/CBP-CstKOaYz.gif',
  },
  {
    name: 'Federal Emergency Management Agency (FEMA)',
    img: 'https://www.rasbyte.com/assets/FEMA-DaTuI4qN.gif',
  },
  {
    name: 'United States Coast Guard (USCG)',
    img: 'https://www.rasbyte.com/assets/USCG-CWt4pgg0.gif',
  },
  {
    name: 'McAfee',
    img: 'https://www.rasbyte.com/assets/mcafee-Dp9OQN6g.gif',
  },
  {
    name: 'US Patent and Trademark Office',
    img: 'https://www.rasbyte.com/assets/uspto-g6Eu00FB.gif',
  },
];

const Capabilities = () => (
  <div className="bg-white dark:bg-black min-h-[100vh] flex flex-col">
    {/* Federal Experience & Partnerships */}
    <section className="max-w-4xl mx-auto mb-16 flex-grow pt-28">
      <div className="w-full max-w-3xl mx-auto mb-10 p-6 rounded-xl shadow bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <h2 className="text-2xl md:text-3xl font-bold text-dashboard-primary mb-4">Federal Experience & Partnerships</h2>
        <p className="text-dashboard-primary/90 dark:text-white text-lg">
          Some of the federal agencies and private firms where our team members have previously served as contractors include US Department of State (DoS), US Department of Homeland Security (DHS), Cybersecurity and Infrastructure Security Agency (CISA), United States Marine Corps (USMC), US Customs and Border Protection (CBP), Federal Emergency Management Agency (FEMA), United States Coast Guard (USCG), US Patent and Trademark Office, & McAfee.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center items-center">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center">
            <img src={partner.img} alt={partner.name} className="h-36 w-36 object-contain mb-2 rounded-lg shadow-lg" />
            <span className="text-center text-base text-dashboard-primary dark:text-white font-medium mt-2 max-w-[12rem]">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Capabilities; 