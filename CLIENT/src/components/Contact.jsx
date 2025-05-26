import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail as MailIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <header>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <a href="/" className="inline-block">
            <img src="./images/logo.png" alt="OUTFYLD logo" className="h-12" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h1 className="text-5xl font-extrabold mb-4  text-neonGreen">Get in Touch</h1>
            <p className="text-xl  dark:text-white">
              We’d love to hear from you—drop us a line anytime.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-10">
            <section>
              <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2 text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                {[
                  { Icon: MapPin, label: 'Address', value: 'Amravati, Maharashtra, India' },
                  { Icon: Phone, label: 'Phone', value: '(+91) 7058526196', href: 'tel:+917058526196' },
                  { Icon: MailIcon, label: 'Email', value: 'admin@outfyld.in', href: 'mailto:admin@outfyld.in' },
                  { Icon: Clock, label: 'Business Hours', value: 'Mon–Fri, 9 AM–6 PM IST' }
                ].map(({ Icon, label, value, href }) => (
                  <div key={label} className="flex items-start">
                    <Icon className="w-7 h-7 text-neonGreen mt-1 mr-4" />
                    <div>
                      <h3 className="text-lg font-medium text-white">{label}</h3>
                      {href ? (
                        <a
                          href={href}
                          className="text-gray-700 dark:text-gray-300 hover:underline transition"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Social Links */}
            <section>
              <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2 text-white">
                Connect With Us
              </h2>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, url: 'https://www.instagram.com/outfyld?igsh=MTRkbm16bWRmYnc1bQ%3D%3D' },
                  { Icon: Twitter, url: 'https://x.com/AnkanJagtap' },
                  { Icon: Linkedin, url: 'https://linkedin.com/in/ankan-jagtap-384902367' },
                  { Icon: Instagram, url: 'https://www.instagram.com/outfyld?igsh=MTRkbm16bWRmYnc1bQ%3D%3D' }
                ].map(({ Icon, url }) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full shadow bg-gray-100 dark:bg-gray-800 hover:bg-[#13586d] transition"
                  >
                    <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-white" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Call-to-Action */}
          <section className="lg:col-span-2 flex flex-col justify-center items-center p-12 rounded-lg text-charcoal dark:text-white">
            <h2 className="text-4xl font-bold mb-4 text-charcoal dark:text-white">Ready to Talk?</h2>
            <p className="mb-8 text-center max-w-2xl text-charcoal dark:text-white">
              Reach out to our team directly via email or phone. We're here to assist you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="mailto:admin@outfyld.in"
                className="inline-block border-2 border-neonGreen text-neonGreen dark:border-white dark:text-white hover:bg-[#13586d] hover:text-white font-semibold px-10 py-4 rounded-lg transition"
              >
                Email Us
              </a>
              <a
                href="tel:+14155550123"
                className="inline-block border-2 border-neonGreen text-neonGreen dark:border-white dark:text-white hover:bg-[#13586d] hover:text-white font-semibold px-10 py-4 rounded-lg transition"
              >
                Call 7058526196
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
