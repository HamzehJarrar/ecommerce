import React, { createContext, useState, useContext, useEffect } from 'react';
import { ar } from '../locales/ar';
import { en } from '../locales/en';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to Arabic
    return localStorage.getItem('language') || 'ar';
  });

  const [direction, setDirection] = useState(language === 'ar' ? 'rtl' : 'ltr');

  const translations = {
    ar,
    en,
  };

  const t = translations[language];

  useEffect(() => {
    // Update direction based on language
    const newDirection = language === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    document.documentElement.dir = newDirection;
    document.documentElement.lang = language;
    
    // Save to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const value = {
    language,
    direction,
    t,
    setLanguage,
    toggleLanguage,
    isRTL: direction === 'rtl',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
