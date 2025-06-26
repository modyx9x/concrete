import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";
import { Save, SlidersHorizontal, Info, Link as LinkIcon, Edit3 } from 'lucide-react';

const SiteSettings = () => {
  const { t, language, direction } = useLanguage();
  const { toast } = useToast();

  const [siteInfo, setSiteInfo] = useState({
    siteNameAr: t('heroTitle'),
    siteNameEn: 'Advanced Concrete Drilling Co.',
    phone: '+966 50 123 4567',
    email: 'info@concrete-drilling.sa',
    addressAr: t('companyAddress'),
    addressEn: '123 King Fahd Road, Riyadh, Saudi Arabia',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com'
  });

  const [staticContent, setStaticContent] = useState([
    { id: 1, section: t('heroTitle'), key: 'heroSubtitle', valueAr: t('heroSubtitle'), valueEn: 'We provide advanced and safe solutions for all concrete drilling and cutting needs in Saudi Arabia' },
    { id: 2, section: t('aboutTitle'), key: 'aboutDescription', valueAr: t('aboutDescription'), valueEn: 'A leading company in concrete drilling and cutting with over 15 years of experience in the Saudi market' },
  ]);

  useEffect(() => {
    document.title = `${t('siteSettingsTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setSiteInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleStaticContentChange = (id, lang, value) => {
    setStaticContent(prev => prev.map(item => 
      item.id === id ? { ...item, [lang === 'ar' ? 'valueAr' : 'valueEn']: value } : item
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
      description: t('thisSettingNotFunctional', { ns: 'admin' }),
      variant: "default",
      className: "bg-yellow-500 text-white"
    });
    console.log("Site Info:", siteInfo);
    console.log("Static Content:", staticContent);
  };

  const Section = ({ title, icon, children, delay }) => {
    const IconComponent = icon;
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-700 dark:text-slate-200 flex items-center">
          <IconComponent className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-blue-600`} />
          {title}
        </h2>
        {children}
      </motion.section>
    );
  }

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 dark:text-slate-100"
      >
        {t('siteSettingsTitle', { ns: 'admin' })}
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Section title={t('contactInfo', {ns: 'admin'})} icon={Info} delay={0.1}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteNameAr" className="dark:text-slate-300">{t('siteName', {ns: 'admin'})} ({t('arabic', {ns:'admin'})})</Label>
              <Input id="siteNameAr" name="siteNameAr" value={siteInfo.siteNameAr} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="siteNameEn" className="dark:text-slate-300">{t('siteName', {ns: 'admin'})} ({t('english', {ns:'admin'})})</Label>
              <Input id="siteNameEn" name="siteNameEn" value={siteInfo.siteNameEn} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="phone" className="dark:text-slate-300">{t('companyPhone', {ns: 'admin'})}</Label>
              <Input id="phone" name="phone" type="tel" value={siteInfo.phone} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="email" className="dark:text-slate-300">{t('companyEmail', {ns: 'admin'})}</Label>
              <Input id="email" name="email" type="email" value={siteInfo.email} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
          </div>
          <div>
            <Label htmlFor="addressAr" className="dark:text-slate-300">{t('companyAddressAr', {ns: 'admin'})}</Label>
            <Textarea id="addressAr" name="addressAr" value={siteInfo.addressAr} onChange={handleInfoChange} rows={2} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
          </div>
          <div>
            <Label htmlFor="addressEn" className="dark:text-slate-300">{t('companyAddressEn', {ns: 'admin'})}</Label>
            <Textarea id="addressEn" name="addressEn" value={siteInfo.addressEn} onChange={handleInfoChange} rows={2} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
          </div>
        </Section>

        <Section title={t('socialMediaLinks', {ns: 'admin'})} icon={LinkIcon} delay={0.2}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebook" className="dark:text-slate-300">{t('facebookLink', {ns: 'admin'})}</Label>
              <Input id="facebook" name="facebook" type="url" value={siteInfo.facebook} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="twitter" className="dark:text-slate-300">{t('twitterLink', {ns: 'admin'})}</Label>
              <Input id="twitter" name="twitter" type="url" value={siteInfo.twitter} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="instagram" className="dark:text-slate-300">{t('instagramLink', {ns: 'admin'})}</Label>
              <Input id="instagram" name="instagram" type="url" value={siteInfo.instagram} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
            <div>
              <Label htmlFor="linkedin" className="dark:text-slate-300">{t('linkedinLink', {ns: 'admin'})}</Label>
              <Input id="linkedin" name="linkedin" type="url" value={siteInfo.linkedin} onChange={handleInfoChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
            </div>
          </div>
        </Section>

        <Section title={t('staticContentManagementTitle', {ns: 'admin'})} icon={Edit3} delay={0.3}>
          <p className="text-sm text-gray-500 dark:text-slate-400">{t('staticContentDesc', {ns: 'admin'})}</p>
          <div className="space-y-4">
            {staticContent.map(item => (
              <div key={item.id} className="p-4 border rounded-md dark:border-slate-700">
                <h3 className="font-medium text-gray-700 dark:text-slate-300 mb-1">{item.section} - <span className="text-sm text-gray-500 dark:text-slate-400">({item.key})</span></h3>
                <div>
                  <Label htmlFor={`staticAr-${item.id}`} className="dark:text-slate-300">{t('valueAr', {ns: 'admin'})}</Label>
                  <Textarea id={`staticAr-${item.id}`} value={item.valueAr} onChange={(e) => handleStaticContentChange(item.id, 'ar', e.target.value)} rows={2} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
                </div>
                <div className="mt-2">
                  <Label htmlFor={`staticEn-${item.id}`} className="dark:text-slate-300">{t('valueEn', {ns: 'admin'})}</Label>
                  <Textarea id={`staticEn-${item.id}`} value={item.valueEn} onChange={(e) => handleStaticContentChange(item.id, 'en', e.target.value)} rows={2} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-end pt-4"
        >
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="mr-2 h-5 w-5" /> {t('saveChanges', { ns: 'admin' })}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default SiteSettings;