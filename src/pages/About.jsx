import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, ShieldCheck, TrendingUp, Award, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StatCard = ({ icon, value, label, delay }) => {
  const IconComponent = icon;
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-xl shadow-lg text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mx-auto" aria-hidden="true">
        <IconComponent className="w-8 h-8" />
      </div>
      <p className="text-4xl font-bold text-blue-700 mb-1">{value}</p>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const { t, direction, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('aboutTitle')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('aboutMetaDescription') || t('aboutDescription'));
    }
  }, [t, language]);

  const stats = [
    { icon: Award, value: "15+", label: t('yearsExperience'), delay: 0.1 },
    { icon: TrendingUp, value: "500+", label: t('completedProjects'), delay: 0.2 },
    { icon: Users, value: "98%", label: t('satisfiedClients'), delay: 0.3 }
  ];

  const values = [
    { icon: ShieldCheck, title: (t('ourValues.quality', { ns: 'aboutPage' }) || "الجودة"), description: (t('ourValues.qualityDesc', { ns: 'aboutPage' }) || "نلتزم بأعلى معايير الجودة في جميع خدماتنا.") },
    { icon: Zap, title: (t('ourValues.innovation', { ns: 'aboutPage' }) || "الابتكار"), description: (t('ourValues.innovationDesc', { ns: 'aboutPage' }) || "نستخدم أحدث التقنيات والأساليب لتقديم حلول مبتكرة.") },
    { icon: Target, title: (t('ourValues.customerFocus', { ns: 'aboutPage' }) || "التركيز على العميل"), description: (t('ourValues.customerFocusDesc', { ns: 'aboutPage' }) || "رضا عملائنا هو أولويتنا القصوى ونسعى لتجاوز توقعاتهم.") }
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
            {t('aboutTitle')}
          </motion.h1>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="company-overview-heading">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img   
              className="rounded-xl shadow-2xl w-full h-auto object-cover aspect-video" 
              alt={t('aboutImageAlt', { ns: 'aboutPage' }) || "فريق عمل شركة تخريم الخرسانات يناقش خطة مشروع"}
              loading="lazy"
             src="https://images.unsplash.com/photo-1605444526695-075c25b64843" />
          </motion.div>
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 id="company-overview-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('aboutSubtitle', { ns: 'aboutPage' }) || "رواد تخريم الخرسانات في المملكة"}</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('aboutDescription')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('aboutDescriptionExtended', { ns: 'aboutPage' }) || "نحن نفخر بتقديم حلول شاملة وموثوقة لجميع أنواع مشاريع البناء والتشييد، مع الالتزام بأعلى معايير السلامة والكفاءة. فريقنا من المهندسين والفنيين المدربين على أعلى مستوى جاهز لتلبية كافة متطلباتكم."}
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" asChild>
              <Link to="/contact">{t('contactUsNow', { ns: 'aboutPage' }) || "تواصل معنا الآن"}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white" aria-labelledby="our-achievements-heading">
        <div className="container mx-auto px-4">
          <motion.h2
            id="our-achievements-heading"
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('ourAchievements', { ns: 'aboutPage' }) || "إنجازاتنا بالأرقام"}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} icon={stat.icon} value={stat.value} label={stat.label} delay={stat.delay} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="container mx-auto px-4 py-16 md:py-20" aria-labelledby="our-core-values-heading">
        <motion.h2
          id="our-core-values-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('ourCoreValues', { ns: 'aboutPage' }) || "قيمنا الأساسية"}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 text-white" aria-hidden="true">
                  <IconComponent className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-700 via-purple-700 to-pink-600 text-white" aria-labelledby="ready-to-start-heading">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            id="ready-to-start-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('readyToStart', { ns: 'aboutPage' }) || "هل أنت مستعد لبدء مشروعك؟"}
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-100 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {t('ctaAboutText', { ns: 'aboutPage' }) || "دعنا نساعدك في تحقيق أهدافك. اتصل بنا اليوم للحصول على استشارة مجانية."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg transform hover:scale-105 transition-transform duration-200" asChild>
              <Link to="/services">{t('exploreServices', { ns: 'aboutPage' }) || "اكتشف خدماتنا"}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;