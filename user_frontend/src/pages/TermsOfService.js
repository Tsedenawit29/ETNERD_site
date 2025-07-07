import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaUserCheck, FaTools, FaExclamationTriangle } from 'react-icons/fa';

function TermsOfService() {
  const sections = [
    {
      title: 'Service Usage',
      icon: <FaFileContract className="w-6 h-6" />,
      content: `By using ETNERD's cybersecurity and IT services, you agree to:
      • Use the services for lawful and ethical purposes
      • Provide accurate information when engaging with our team
      • Not attempt to disrupt or abuse our systems
      • Respect the privacy and security of other users and clients
      We reserve the right to limit or terminate access for misuse.`
    },
    {
      title: 'User Responsibilities',
      icon: <FaUserCheck className="w-6 h-6" />,
      content: `As a user of ETNERD services, you are responsible for:
      • Maintaining the security of your account and credentials
      • Ensuring your use of our services complies with all laws
      • Reporting any security vulnerabilities or incidents
      • Using our tools and resources responsibly
      You must comply with all applicable laws and regulations.`
    },
    {
      title: 'Service Limitations',
      icon: <FaTools className="w-6 h-6" />,
      content: `Our services are provided "as is" with:
      • No guarantee of uninterrupted availability
      • Limited support for legacy systems
      • Standard cybersecurity and IT capabilities
      • Ongoing improvements and updates
      We strive to enhance our services but cannot guarantee perfection.`
    },
    {
      title: 'Disclaimer',
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      content: `We are not responsible for:
      • Issues beyond our control (e.g., third-party outages)
      • Consequences of actions taken based on our advice
      • Data loss or system disruptions
      • Security incidents caused by user negligence
      Always maintain backups and follow best practices.`
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-black dark:via-black dark:to-dashboard-primary-bg">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-black dark:to-gray-900">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-dashboard-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 bg-dashboard-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-dashboard-accent/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container px-4 mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dashboard-primary dark:text-white drop-shadow-lg">
              Terms of <span className="text-dashboard-accent">Service</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Please read these terms carefully before using ETNERD's services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 text-dashboard-primary dark:text-white">Welcome to ETNERD</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                These Terms of Service govern your use of ETNERD's cybersecurity and IT services. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our services are designed to help users secure, modernize, and optimize their digital environments. We provide tools, resources, and expert guidance to support your technology journey.
              </p>
            </motion.div>

            {/* Terms Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-l-8 border-dashboard-accent hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300 group"
                >
                  <div className="absolute left-0 top-0 h-full w-2 bg-dashboard-accent rounded-l-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-dashboard-accent/10 flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-dashboard-primary dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {section.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-gradient-to-br from-dashboard-accent/10 via-white to-dashboard-primary/10 dark:from-dashboard-accent/20 dark:via-gray-800 dark:to-dashboard-primary/20 rounded-xl shadow-2xl p-8 border-l-8 border-dashboard-accent"
            >
              <h3 className="text-2xl font-bold mb-6 text-dashboard-primary dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For any questions about these Terms of Service, please contact us at:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Email: <a href="mailto:contact@etnerd.com" className="text-dashboard-accent hover:underline">contact@etnerd.com</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Address: Addis Ababa, Ethiopia
                </p>
              </div>
            </motion.div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TermsOfService; 