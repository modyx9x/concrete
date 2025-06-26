import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage, t, direction } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'projects', path: '/projects' },
    { key: 'blog', path: '/blog' },
    { key: 'contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/blog') {
      return location.pathname === path || location.pathname.startsWith('/blog/');
    }
    return location.pathname === path;
  };


  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 print:hidden" role="region" aria-label={t('topBarLabel') || "Top Bar"}>
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+966501234567" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span dir="ltr">+966 50 123 4567</span>
              <span className="sr-only">{t('phoneNumberLabel') || "رقم الهاتف"}</span>
            </a>
            <a href="mailto:info@concrete-drilling.sa" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>info@concrete-drilling.sa</span>
              <span className="sr-only">{t('emailAddressLabel') || "عنوان البريد الإلكتروني"}</span>
            </a>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-white hover:bg-white/20"
            aria-label={t('toggleLanguageLabel') || "تبديل اللغة"}
          >
            <Globe className="w-4 h-4 mr-2" aria-hidden="true" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
        </div>
      </div>

      <motion.nav
        aria-label={t('mainNavigationLabel') || "Main Navigation"}
        className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 print:hidden ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/90 backdrop-blur-sm'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse" aria-label={t('companyLogoAndName') || "شعار الشركة واسمها"}>
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-xl" aria-hidden="true">ت</span>
              </motion.div>
              <div className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'تخريم الخرسانات' : 'Concrete Drilling'}
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              {navItems.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.path}
                  className={({ isActive: navIsActive }) =>
                    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      navIsActive || isActive(item.path)
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  {t(item.key)}
                  {(isActive(item.path)) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </NavLink>
              ))}
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 ml-4 rtl:mr-4 rtl:ml-0">
                <Link to="/contact">{t('getQuote')}</Link>
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? t('closeMenuLabel') || "إغلاق القائمة" : t('openMenuLabel') || "فتح القائمة"}
            >
              {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden bg-white border-t shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    className={({ isActive: navIsActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                        navIsActive || isActive(item.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {t(item.key)}
                  </NavLink>
                ))}
                <Button asChild className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>{t('getQuote')}</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-28 print:hidden"></div>
    </>
  );
};

export default Navbar;