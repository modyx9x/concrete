import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer as Drill, Disc, SquareStack, CheckCircle, Construction, Cog, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, imageAlt, delay, direction: langDirection }) => {
  const IconComponent = icon;
  const { t } = useLanguage();
  return (
    <motion.article
      aria-labelledby={`service-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      initial={{ opacity: 0, x: langDirection === 'rtl' ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <img  
        className="w-full h-64 object-cover aspect-video"
        alt={imageAlt}
        loading="lazy"
       src="https://images.unsplash.com/photo-1627577741153-74b82d87607b" />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center" aria-hidden="true">
            <IconComponent className="w-6 h-6" />
          </div>
          <h3 id={`service-title-${title.replace(/\s+/g, '-').toLowerCase()}`} className={`text-xl font-semibold text-gray-800 ${langDirection === 'rtl' ? 'mr-4' : 'ml-4'}`}>{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        <Button variant="link" className="text-blue-600 hover:text-purple-700 p-0" asChild>
          <Link to="/contact" aria-label={`${t('requestServiceFor')} ${title}`}>
            {t('requestService', { ns: 'servicesPage' })}
          </Link>
        </Button>
      </div>
    </motion.article>
  );
};

const Services = () => {
  const { t, direction, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('servicesTitle')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('servicesMetaDescription') || t('servicesDescription'));
    }
  }, [t, language]);

  const servicesList = [
    { 
      icon: Drill, 
      titleKey: 'concreteDrilling', 
      descriptionKey: 'concreteDrillingDesc', 
      imageAltKey: 'concreteDrillingImageAlt',
      delay: 0.1 
    },
    { 
      icon: Disc, 
      titleKey: 'concreteCutting', 
      descriptionKey: 'concreteCuttingDesc', 
      imageAltKey: 'concreteCuttingImageAlt',
      delay: 0.2 
    },
    { 
      icon: SquareStack, 
      titleKey: 'wallSawing', 
      descriptionKey: 'wallSawingDesc', 
      imageAltKey: 'wallSawingImageAlt',
      delay: 0.3 
    },
    { 
      icon: CheckCircle, 
      titleKey: 'coreDrilling', 
      descriptionKey: 'coreDrillingDesc', 
      imageAltKey: 'coreDrillingImageAlt',
      delay: 0.4 
    },
    { 
      icon: Construction, 
      titleKey: 'demolitionServices', 
      descriptionKey: 'demolitionServicesDesc', 
      imageAltKey: 'demolitionServicesImageAlt',
      delay: 0.5 
    },
    { 
      icon: Cog, 
      titleKey: 'specializedSolutions', 
      descriptionKey: 'specializedSolutionsDesc', 
      imageAltKey: 'specializedSolutionsImageAlt',
      delay: 0.6 
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-slate-50">
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('servicesTitle')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('servicesDescription')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="services-grid-heading">
        <h2 id="services-grid-heading" className="sr-only">{t('servicesListTitle') || "قائمة خدماتنا"}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <ServiceCard
              key={service.titleKey}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descriptionKey)}
              imageAlt={t(service.imageAltKey) || `Image for ${t(service.titleKey)} service`}
              delay={service.delay}
              direction={direction}
            />
          ))}
        </div>
      </section>
      
      <section className="py-16 md:py-20 bg-white" aria-labelledby="why-choose-us-heading">
        <div className="container mx-auto px-4">
          <motion.h2 
            id="why-choose-us-heading"
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('whyChooseUs', { ns: 'servicesPage' })}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: CheckCircle, title: t('qualityService', { ns: 'servicesPage' }), desc: t('qualityServiceDesc', { ns: 'servicesPage' }) },
              { icon: Cog, title: t('advancedTech', { ns: 'servicesPage' }), desc: t('advancedTechDesc', { ns: 'servicesPage' }) },
              {icon: Users, title: t('expertTeam', { ns: 'servicesPage' }), desc: t('expertTeamDesc', { ns: 'servicesPage' }) }
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div 
                  key={index} 
                  className="p-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white mx-auto" aria-hidden="true">
                    <ItemIcon className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 text-white" aria-labelledby="consultation-cta-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            id="consultation-cta-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('needConsultation', { ns: 'servicesPage' })}
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-100 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('ctaServicesText', { ns: 'servicesPage' })}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/contact">{t('getFreeQuote', { ns: 'servicesPage' })}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;