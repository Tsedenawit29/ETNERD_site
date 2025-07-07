import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaDatabase, FaLock } from 'react-icons/fa';

function PrivacyPolicy() {
  const sections = [
    {
      title: 'Information Collection',
      icon: <FaDatabase className="w-6 h-6" />,
      content: `We collect information that you provide directly to us, including:
      • Contact information (name, email address, phone number)
      • Service inquiry details
      • Technical data about your device and network
      • Usage statistics for our website and services
      This information helps us deliver and improve ETNERD's cybersecurity and IT solutions.`
    },
    {
      title: 'Data Protection',
      icon: <FaShieldAlt className="w-6 h-6" />,
      content: `We implement strong security measures to protect your information:
      • Encryption of data in transit and at rest
      • Regular security assessments and audits
      • Access controls and authentication
      • Secure storage of sensitive data
      Your information is treated with the highest level of security at ETNERD.`
    },
    {
      title: 'User Rights',
      icon: <FaUserShield className="w-6 h-6" />,
      content: `You have the right to:
      • Access your personal information
      • Request correction of your data
      • Delete your account and associated data
      • Opt-out of marketing communications
      • Export your data in a portable format
      Contact us to exercise any of these rights.`
    },
    {
      title: 'Data Sharing',
      icon: <FaLock className="w-6 h-6" />,
      content: `We may share your information with:
      • Service providers who assist in our operations
      • Legal authorities when required by law
      • Partners for service delivery (with your consent)
      We never sell your personal information to third parties.`
    }
  ];

  return (
    <div className="min-h-screen pt-20">
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-dashboard-primary dark:text-white">
              Privacy <span className="text-dashboard-accent">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your privacy is our priority. Learn how we protect your data at ETNERD.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white dark:bg-dashboard-primary-bg">
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
              <h2 className="text-3xl font-bold mb-6 text-dashboard-primary dark:text-white">Our Commitment to Privacy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                At ETNERD, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our cybersecurity and IT services.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We understand the importance of privacy in the digital age, especially when dealing with sensitive business and personal information. Our practices are designed to maintain the highest standards of data protection while providing valuable technology solutions.
              </p>
            </motion.div>

            {/* Policy Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                >
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
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-dashboard-primary dark:text-white">Contact Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
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

export default PrivacyPolicy; 