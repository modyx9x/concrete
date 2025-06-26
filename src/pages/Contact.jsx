import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

const ContactInfoCard = ({ icon, title, content, delay, isLink = false, linkHref = "#" }) => {
  const IconComponent = icon;
  const { t } = useLanguage();
  const contentElement = isLink ? (
    <a href={linkHref} className="text-gray-600 hover:text-blue-600 transition-colors" target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    <p className="text-gray-600">{content}</p>
  );

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-4 rtl:space-x-reverse"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center" aria-hidden="true">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
        {contentElement}
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const { t, direction, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${t('contactTitle')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('contactMetaDescription') || t('contactPageIntro'));
    }
  }, [t, language]);

  const contactDetails = [
    { icon: Phone, title: t('phone'), content: "+966 50 123 4567", delay: 0.1, isLink: true, linkHref: "tel:+966501234567" },
    { icon: Mail, title: t('email'), content: "info@concrete-drilling.sa", delay: 0.2, isLink: true, linkHref: "mailto:info@concrete-drilling.sa" },
    { icon: MapPin, title: t('address'), content: t('companyAddress', { ns: 'contactPage' }) || "123 شارع الملك فهد، الرياض، المملكة العربية السعودية", delay: 0.3 },
    { icon: Building, title: t('headOffice', { ns: 'contactPage' }) || "المكتب الرئيسي", content: t('headOfficeAddress', { ns: 'contactPage' }) || "برج المملكة، الطابق 20، الرياض", delay: 0.4 }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form data submitted:", formData);
    toast({
      title: t('messageSentTitle', { ns: 'contactPage' }) || "تم إرسال الرسالة!",
      description: t('messageSentDesc', { ns: 'contactPage' }) || "شكراً لتواصلك معنا. سنرد عليك في أقرب وقت ممكن.",
      variant: "default",
      className: "bg-green-500 text-white border-green-600"
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };


  return (
    <div className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('contactTitle')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('contactDescription')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: direction === 'rtl' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {t('getInTouch', { ns: 'contactPage' }) || "ابقى على تواصل"}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              {t('contactPageIntro', { ns: 'contactPage' }) || "نحن هنا لمساعدتك في جميع احتياجات تخريم وقطع الخرسانة. لا تتردد في الاتصال بنا أو زيارة مكتبنا."}
            </p>
            <address className="not-italic space-y-6">
              {contactDetails.map(detail => (
                <ContactInfoCard 
                  key={detail.title}
                  icon={detail.icon}
                  title={detail.title}
                  content={detail.content}
                  delay={detail.delay}
                  isLink={detail.isLink}
                  linkHref={detail.linkHref}
                />
              ))}
            </address>
          </motion.div>

          <motion.div 
            className="bg-white p-8 md:p-10 rounded-xl shadow-xl"
            initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            role="form"
            aria-labelledby="contact-form-heading"
          >
            <h2 id="contact-form-heading" className="text-3xl font-bold text-gray-800 mb-6">
              {t('sendMessage')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                <Input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} placeholder={t('yourNamePlaceholder', { ns: 'contactPage' }) || "اسمك الكامل"} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                <Input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} placeholder={t('yourEmailPlaceholder', { ns: 'contactPage' }) || "بريدك الإلكتروني"} autoComplete="email" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">{t('subject', { ns: 'contactPage' }) || "الموضوع"}</label>
                <Input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleInputChange} placeholder={t('subjectPlaceholder', { ns: 'contactPage' }) || "موضوع رسالتك"} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">{t('message')}</label>
                <Textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleInputChange} placeholder={t('yourMessagePlaceholder', { ns: 'contactPage' }) || "اكتب رسالتك هنا..."} />
              </div>
              <div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending', { ns: 'contactPage' }) || "جاري الإرسال..."}
                    </span>
                  ) : (
                    <>
                      <Send className={`h-5 w-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                      {t('submit')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 md:pb-20" aria-labelledby="map-location-heading">
        <motion.h2 
          id="map-location-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t('ourLocation', { ns: 'contactPage' }) || "موقعنا على الخريطة"}
        </motion.h2>
        <motion.div 
          className="h-96 md:h-[500px] bg-gray-300 rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <iframe 
            title={t('ourLocationOnMapTitle') || "موقع شركة تخريم الخرسانات على الخريطة"}
            src="https://www.openstreetmap.org/export/embed.html?bbox=46.675299%2C24.713552%2C46.695299%2C24.733552&layer=mapnik&marker=24.723552%2C46.685299" 
            width="100%" 
            height="100%" 
            style={{border:0}} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </motion.div>
      </section>
    </div>
  );
};

export default Contact;