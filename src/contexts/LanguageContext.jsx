import React, { createContext, useContext, useState, useEffect } from 'react';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ar: arTranslations,
  en: enTranslations,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    setLanguage(newLanguage);
    setDirection(newDirection);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newDirection;
    localStorage.setItem('language', newLanguage);
  };

  const t = (key, options) => {
    let currentTranslations = translations[language] || translations.ar;
    
    if (options && options.ns) {
      const nsKeys = options.ns.split('.');
      let nsObject = currentTranslations;
      for (const nsKey of nsKeys) {
        if (nsObject && nsObject.hasOwnProperty(nsKey)) {
          nsObject = nsObject[nsKey];
        } else {
          nsObject = undefined;
          break;
        }
      }
      if (nsObject && typeof nsObject === 'object' && nsObject.hasOwnProperty(key)) {
        currentTranslations = nsObject;
      } else if(nsObject && typeof nsObject === 'string' && key === options.ns.split('.').pop()){
         let translation = nsObject;
         if (options && typeof options === 'object') {
           Object.keys(options).forEach(k => {
             if (k !== 'ns' && k !== 'defaultValue') {
               translation = translation.replace(new RegExp(`\\{${k}\\}`, 'g'), options[k]);
             }
           });
         }
         return translation;
      }
    }
    
    let translation = currentTranslations[key] || options?.defaultValue || key;

    if (options && typeof options === 'object') {
      Object.keys(options).forEach(k => {
        if (k !== 'ns' && k !== 'defaultValue') {
          translation = translation.replace(new RegExp(`\\{${k}\\}`, 'g'), options[k]);
        }
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};