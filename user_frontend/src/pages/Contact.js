import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { supabase } from '../supabaseClient';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Sending your message...');

    try {
      const { error } = await supabase.from('et_contact_messages').insert([
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          seen: false,
        }
      ]);
      if (error) throw error;
      setStatus('Message sent successfully! We will get back to you shortly.');
      setForm({ name: '', email: '', subject: '', message: '' }); // Clear form on success
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-dashboard-primary-bg text-dashboard-primary dark:text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-white dark:via-dashboard-accent-dark dark:to-white drop-shadow-lg">
          Get in Touch
        </h1>
        <p className="text-2xl text-center text-dashboard-primary dark:text-white mb-14 max-w-3xl mx-auto font-sans">
          We're here to help you with your cybersecurity needs. Whether you have a question, need support, or want to explore partnership opportunities, reach out to us.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information & Map Column */}
          <div className="space-y-10">
            {/* Contact Details */}
            <div className="bg-white dark:bg-dashboard-primary-bg p-10 rounded-3xl shadow-2xl border border-dashboard-accent/10">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-8 tracking-tight">Contact Details</h3>
              <div className="space-y-6 text-lg md:text-xl">
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-dashboard-accent text-4xl drop-shadow" />
                  <div>
                    <p className="font-semibold font-display text-dashboard-primary dark:text-white">Our Office</p>
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-dashboard-accent text-4xl drop-shadow" />
                  <div>
                    <p className="font-semibold font-display text-dashboard-primary dark:text-white">Email Us</p>
                    <a href="mailto:contact@etnerd.com" className="text-dashboard-primary hover:text-dashboard-accent dark:text-white dark:hover:text-dashboard-accent-dark transition-colors font-sans">contact@etnerd.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-dashboard-accent text-4xl drop-shadow" />
                  <div>
                    <p className="font-semibold font-display text-dashboard-primary dark:text-white">Call Us</p>
                    <a href="tel:+251-911-677-096" className="text-dashboard-primary hover:text-dashboard-accent dark:text-white dark:hover:text-dashboard-accent-dark transition-colors font-sans">+251-911-677-096</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaClock className="text-dashboard-accent text-4xl drop-shadow" />
                  <div>
                    <p className="font-semibold font-display text-dashboard-primary dark:text-white">Business Hours</p>
                    <p>Mon - Fri: 9:00 AM - 5:00 PM EAT</p>
                    <p>Sat - Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map Integration */}
            <div className="bg-white dark:bg-dashboard-primary-bg p-6 rounded-3xl shadow-xl border-2 border-dashboard-primary/20 dark:border-dashboard-primary/40">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-6">Find Us on the Map</h3>
              <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl overflow-hidden border-2 border-dashboard-primary/20 dark:border-dashboard-primary/40 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.613348616198!2d38.7909068!3d9.0118314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c88b7b25e1%3A0xc07a82b9a7f3d64a!2sBole%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Location of ETNERD Security Solutions on Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
          {/* Contact Form Column */}
          <div className="bg-white dark:bg-dashboard-primary-bg p-10 rounded-3xl shadow-2xl border border-dashboard-accent/10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-dashboard-accent dark:text-dashboard-accent-dark mb-8 tracking-tight">Send Us a Message</h3>
            <form className="space-y-7" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-lg font-semibold mb-2 text-dashboard-primary dark:text-white font-display">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-dashboard-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dashboard-accent dark:focus:ring-dashboard-accent-dark transition-all duration-200 font-sans text-lg"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-semibold mb-2 text-dashboard-primary dark:text-white font-display">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-dashboard-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dashboard-accent dark:focus:ring-dashboard-accent-dark transition-all duration-200 font-sans text-lg"
                  placeholder="e.g., jane.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold mb-2 text-dashboard-primary dark:text-white font-display">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-dashboard-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dashboard-accent dark:focus:ring-dashboard-accent-dark transition-all duration-200 font-sans text-lg"
                  placeholder="e.g., Inquiry about Cybersecurity Services"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-semibold mb-2 text-dashboard-primary dark:text-white font-display">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-dashboard-primary dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-dashboard-accent dark:focus:ring-dashboard-accent-dark transition-all duration-200 font-sans text-lg"
                  placeholder="Type your message here..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-full font-semibold shadow-lg transition-transform duration-300 text-xl font-display tracking-wide ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                    : 'bg-dashboard-accent text-white hover:bg-orange-600 dark:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent'
                } hover:scale-105`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status && (
                <div className={`text-center mt-4 font-medium text-lg font-display ${status.includes('successfully') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
        {/* Additional Content / Call to Action */}
        <div className="mt-24 text-center bg-gradient-to-br from-white via-dashboard-primary-lightest to-dashboard-primary/10 dark:from-dashboard-primary-bg dark:via-dashboard-primary-dark dark:to-black py-16 rounded-3xl shadow-xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-dashboard-primary via-dashboard-accent to-dashboard-primary bg-clip-text text-transparent dark:from-white dark:via-dashboard-accent-dark dark:to-white">
            Ready to Secure Your Digital Future?
          </h2>
          <p className="text-2xl text-dashboard-primary dark:text-white mb-10 max-w-2xl mx-auto font-sans">
            Our team of experts is eager to discuss your specific cybersecurity challenges and provide tailored solutions. Don't hesitate to reach out!
          </p>
          <a
            href="/services"
            className="inline-block py-4 px-12 bg-dashboard-accent text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 dark:bg-dashboard-accent-dark dark:hover:bg-dashboard-accent transition-colors duration-300 text-xl font-display hover:scale-105"
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;