import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronDown, FaNetworkWired, FaShieldAlt, FaTools, FaQuestionCircle, FaGlobe } from 'react-icons/fa';

function FAQs() {
  const [openCategory, setOpenCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      id: 'general',
      title: 'General',
      icon: <FaGlobe className="w-6 h-6" />,
      questions: [
        {
          id: 'what-is-etnerd',
          question: 'What is ETNERD and what do you do?',
          answer: `ETNERD is a cybersecurity and IT solutions provider. We deliver consulting, managed security, digital transformation, compliance, and capacity building services for organizations of all sizes.`
        },
        {
          id: 'who-benefits',
          question: 'Who can benefit from ETNERD services?',
          answer: `Government agencies, enterprises, small businesses, and individuals seeking robust cybersecurity and IT solutions can all benefit from our expertise.`
        },
        {
          id: 'contact',
          question: 'How can I contact ETNERD?',
          answer: `You can reach us at contact@etnerd.com or use the Contact page on our website to submit your inquiry.`
        },
        {
          id: 'mission',
          question: 'What is ETNERD’s mission?',
          answer: `Our mission is to empower organizations with secure, scalable, and innovative technologies that protect assets, enhance performance, and drive sustainable growth.`
        },
        {
          id: 'location',
          question: 'Where is ETNERD based?',
          answer: `ETNERD is headquartered in Addis Ababa, Ethiopia, and serves clients across Africa and globally.`
        },
        {
          id: 'team',
          question: 'Who makes up the ETNERD team?',
          answer: `Our team consists of experienced cybersecurity professionals, IT consultants, and trainers with backgrounds in both local and international projects.`
        }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      icon: <FaTools className="w-6 h-6" />,
      questions: [
        {
          id: 'capacity-building',
          question: 'What is Capacity Building at ETNERD?',
          answer: `We train IT professionals, youth, and stakeholders on emerging cyber threats and how to harden, defend, and monitor their data flow. Our training helps:
• Reduce attack surfaces
• Ensure compliance with regulations
• Support rapid incident response
• Promote secure information sharing`
        },
        {
          id: 'custom-solutions',
          question: 'Does ETNERD offer customized solutions?',
          answer: `Yes, we tailor our cybersecurity and IT solutions to meet the unique needs and challenges of each client.`
        },
        {
          id: 'managed-services',
          question: 'What are managed security services?',
          answer: `Managed security services provide continuous monitoring, threat intelligence, and security operations to protect your infrastructure 24/7.`
        },
        {
          id: 'digital-transformation',
          question: 'What is digital transformation at ETNERD?',
          answer: `Digital transformation involves modernizing your IT infrastructure, adopting cloud solutions, and automating processes to improve efficiency and security.`
        },
        {
          id: 'incident-response',
          question: 'How does ETNERD handle incident response?',
          answer: `We provide rapid incident response services, including threat detection, containment, eradication, and recovery, to minimize business impact.`
        },
        {
          id: 'compliance-support',
          question: 'What compliance support does ETNERD offer?',
          answer: `We help organizations achieve and maintain compliance with standards such as ISO 27001, GDPR, and local cybersecurity regulations.`
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Best Practices',
      icon: <FaShieldAlt className="w-6 h-6" />,
      questions: [
        {
          id: 'data-security',
          question: 'How does ETNERD ensure the security of my data?',
          answer: `We use industry best practices, advanced threat protection, regular vulnerability assessments, and continuous monitoring to safeguard your data against evolving cyber threats.`
        },
        {
          id: 'compliance',
          question: 'Can ETNERD help with compliance?',
          answer: `Yes, we assist organizations in achieving and maintaining compliance with international standards (ISO 27001, GDPR) and local regulations.`
        },
        {
          id: 'incident-response',
          question: 'What is incident response and why is it important?',
          answer: `Incident response is the process of identifying, managing, and recovering from cybersecurity incidents. It minimizes damage, contains breaches, and ensures swift recovery.`
        },
        {
          id: 'vulnerability-management',
          question: 'What is vulnerability management?',
          answer: `Vulnerability management is the process of identifying, evaluating, treating, and reporting security vulnerabilities in systems and software.`
        },
        {
          id: 'training',
          question: 'Does ETNERD offer cybersecurity training?',
          answer: `Yes, we offer training for IT staff, executives, and end-users on cybersecurity awareness, best practices, and regulatory compliance.`
        },
        {
          id: 'cloud-security',
          question: 'How does ETNERD secure cloud environments?',
          answer: `We implement cloud security best practices, including identity and access management, encryption, monitoring, and regular security assessments.`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFC] to-[#E6F7F2] dark:from-black dark:to-dashboard-primary-bg">
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
              Frequently Asked <span className="text-dashboard-accent">Questions</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions about ETNERD and cybersecurity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-white dark:bg-dashboard-primary-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setOpenCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    openCategory === category.id
                      ? 'bg-dashboard-accent text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon}
                  <span>{category.title}</span>
                </button>
              ))}
            </div>

            {/* Questions and Answers */}
            <div className="space-y-4">
              {categories
                .find(cat => cat.id === openCategory)
                ?.questions.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(item.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    >
                      <span className="text-lg font-semibold text-dashboard-primary dark:text-white">
                        {item.question}
                      </span>
                      <FaChevronDown
                        className={`w-5 h-5 text-dashboard-accent transform transition-transform duration-300 ${
                          openQuestions[item.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openQuestions[item.id] && (
                      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-dashboard-accent/10 flex items-center justify-center">
                  <FaQuestionCircle className="w-6 h-6 text-dashboard-accent" />
                </div>
                <h3 className="text-2xl font-bold text-dashboard-primary dark:text-white">
                  Still Have Questions?
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Can't find what you're looking for? Contact our support team for assistance.
              </p>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Email: <a href="mailto:contact@etnerd.com" className="text-dashboard-accent hover:underline">contact@etnerd.com</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Visit our  <Link
              to="/contact"
              className="text-dashboard-accent hover:underline"
            >
            Contact page
            </Link> for more ways to reach us.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQs; 