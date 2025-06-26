import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, direction } = useLanguage();

  const quickLinks = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'projects', path: '/projects' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white print:hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ت</span>
              </div>
              <div className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                <span className="text-xl font-bold">
                  {language === 'ar' ? 'تخريم الخرسانات' : 'Concrete Drilling'}
                </span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`${t('followUsOn')} ${social.label}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-semibold">{t('quickLinks')}</p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <span className={`w-2 h-2 bg-blue-500 rounded-full ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`}></span>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-semibold">{t('contactTitle')}</p>
            <address className="not-italic space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+966501234567" className="text-gray-300 hover:text-white" dir="ltr">+966 50 123 4567</a>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@concrete-drilling.sa" className="text-gray-300 hover:text-white">info@concrete-drilling.sa</a>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  {t('companyAddress')}
                </span>
              </div>
            </address>
          </motion.div>

          
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-semibold">
              {t('newsletterSignupTitle')}
            </p>
            <p className="text-gray-300">
              {t('newsletterSignupText')}
            </p>
            <form className="flex">
              <label htmlFor="footer-email" className="sr-only">{language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}</label>
              <input
                id="footer-email"
                type="email"
                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                aria-label={language === 'ar' ? 'بريدك الإلكتروني للاشتراك في النشرة الإخبارية' : 'Your email for newsletter subscription'}
              />
              <button type="submit" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-r-md hover:from-blue-600 hover:to-purple-600 transition-colors duration-200">
                {t('subscribe')}
              </button>
            </form>
          </motion.div>
        </div>

        
        <motion.div
          className="border-t border-white/20 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            © {new Date().getFullYear()} {language === 'ar' ? 'شركة تخريم الخرسانات المتقدمة' : 'Advanced Concrete Drilling Company'}. {t('allRightsReserved')}.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;