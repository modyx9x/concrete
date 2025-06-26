import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Zap, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, delay }) => {
  const IconComponent = icon;
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 glass"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white" aria-hidden="true">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, delay }) => {
  return (
    <motion.blockquote
      className="bg-gradient-to-tr from-purple-50 via-pink-50 to-red-50 p-6 rounded-xl shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <p className="text-gray-700 italic mb-4">"{quote}"</p>
      <footer className="text-right">
        <p className="font-semibold text-purple-700">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </footer>
    </motion.blockquote>
  );
}

const Home = () => {
  const { t, direction, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('home')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metaDescription'));
    }
  }, [t, language]);

  const features = [
    { icon: Zap, title: t('concreteDrilling'), description: t('concreteDrillingShortDesc') || "أحدث تقنيات التخريم الدقيق والسريع للخرسانة." },
    { icon: ShieldCheck, title: t('concreteCutting'), description: t('concreteCuttingShortDesc') || "حلول قطع آمنة وفعالة لمختلف أنواع الخرسانة المسلحة." },
    { icon: Users, title: t('expertTeam'), description: t('expertTeamShortDesc') || "فريق من الخبراء لتقديم أفضل خدمة لعملائنا الكرام." }
  ];

  const testimonials = [
    { quote: t('testimonial1Quote') || "خدمة ممتازة وسرعة في الإنجاز. أوصي بهم بشدة!", author: t('testimonial1Author') || "م. أحمد العلي", role: t('testimonial1Role') || "مدير مشروع، شركة البناء الحديث", delay: 0.1 },
    { quote: t('testimonial2Quote') || "احترافية عالية ودقة في العمل. كانوا الخيار الأمثل لمشروعنا.", author: t('testimonial2Author') || "م. سارة خالد", role: t('testimonial2Role') || "مهندسة موقع، مشاريع الغد", delay: 0.2 },
    { quote: t('testimonial3Quote') || "تعامل راقي وجودة لا مثيل لها. شكراً لفريق العمل المتميز.", author: t('testimonial3Author') || "خالد الفهد", role: t('testimonial3Role') || "مقاول عام", delay: 0.3 }
  ];

  const projectPlaceholders = [
    { id: 1, titleKey: 'project1TitlePlaceholder', imageAltKey: 'project1ImageAltPlaceholder', imageDesc: 'مبنى حديث قيد الإنشاء مع أعمال تخريم واضحة' },
    { id: 2, titleKey: 'project2TitlePlaceholder', imageAltKey: 'project2ImageAltPlaceholder', imageDesc: 'جسر خرساني كبير يخضع لأعمال قطع دقيقة' },
    { id: 3, titleKey: 'project3TitlePlaceholder', imageAltKey: 'project3ImageAltPlaceholder', imageDesc: 'عمال يقومون بالحفر الأساسي في موقع صناعي' },
  ];


  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" aria-labelledby="hero-heading">
        <div className="absolute inset-0 opacity-20">
          <img  className="w-full h-full object-cover" alt="خلفية مجردة لأعمال بناء وهندسة" loading="eager" src="https://images.unsplash.com/photo-1588062928441-be881286eff8" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
          >
            {t('heroSubtitle')}
          </motion.p>
          <motion.div
            className="space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse flex flex-col md:flex-row justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full md:w-auto animate-pulse-glow"
              asChild
            >
              <Link to="/contact">
                {t('getQuote')}
                <ArrowRight className={`h-5 w-5 ${direction === 'rtl' ? 'mr-2' : 'ml-2'}`} aria-hidden="true" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 shadow-lg transform hover:scale-105 transition-transform duration-200 w-full md:w-auto"
              asChild
            >
              <Link to="/services">{t('ourServices')}</Link>
            </Button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent print:hidden"></div>
      </section>

      <section className="container mx-auto px-4" aria-labelledby="features-heading">
        <motion.h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('servicesTitle')}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={index * 0.15} 
            />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white" aria-labelledby="about-us-cta-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            id="about-us-cta-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('aboutTitle')}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('aboutDescription')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/about">
                {t('learnMore', { ns: 'common' }) || 'اعرف المزيد عنا'}
                <ArrowRight className={`h-5 w-5 ${direction === 'rtl' ? 'mr-2' : 'ml-2'}`} aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4" aria-labelledby="testimonials-heading">
        <motion.h2 
          id="testimonials-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('testimonialsTitle', { ns: 'common' }) || 'ماذا يقول عملاؤنا'}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              delay={testimonial.delay}
            />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-slate-100" aria-labelledby="projects-teaser-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            id="projects-teaser-heading"
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('projectsTitle')}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('projectsDescription')}
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {projectPlaceholders.map((p, index) => (
               <motion.div 
                key={p.id} 
                className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
               >
                <Link to="/projects" aria-label={`${t('viewProjectDetailsFor')} ${t(p.titleKey) || `مشروع ${p.id}`}`}>
                  <img   
                    className="w-full h-60 object-cover aspect-video" 
                    alt={t(p.imageAltKey) || `صورة لمشروع ${p.id}`} 
                    loading="lazy"
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{t(p.titleKey) || `${t('project', { ns: 'common' }) || 'مشروع'} ${p.id}`}</h3>
                    <p className="text-sm text-gray-500">{t('viewProject')}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-transform duration-200" asChild>
            <Link to="/projects">
              {t('viewAllProjects', {ns: 'common'}) || 'عرض كل المشاريع'}
            </Link>
          </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;