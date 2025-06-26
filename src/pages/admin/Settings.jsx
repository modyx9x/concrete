import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast";
import { Save, Globe, Bell, UserCircle, Palette } from 'lucide-react';

const Settings = () => {
  const { t, language, direction } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    document.title = `${t('settingsTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);

  const handleNotImplemented = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
      description: t('thisSettingNotFunctional', { ns: 'admin' }),
      variant: "default",
      className: "bg-yellow-500 text-white"
    });
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
        {t('settingsTitle', { ns: 'admin' })}
      </motion.h1>

      <form onSubmit={handleNotImplemented} className="space-y-8">
        <Section title={t('generalSettings', {ns: 'admin'})} icon={Globe} delay={0.1}>
          <div>
            <Label htmlFor="siteName" className="dark:text-slate-300">{t('siteName', {ns: 'admin'})}</Label>
            <Input id="siteName" defaultValue={t('heroTitle')} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
          </div>
          <div>
            <Label htmlFor="siteLanguage" className="dark:text-slate-300">{t('defaultLanguage', {ns: 'admin'})}</Label>
            <select id="siteLanguage" defaultValue={language} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-slate-700 dark:text-slate-100">
              <option value="ar">{t('arabic', {ns: 'admin'})}</option>
              <option value="en">{t('english', {ns: 'admin'})}</option>
            </select>
          </div>
        </Section>

        <Section title={t('accountSettings', {ns: 'admin'})} icon={UserCircle} delay={0.2}>
           <div>
            <Label htmlFor="adminName" className="dark:text-slate-300">{t('adminName', {ns: 'admin'})}</Label>
            <Input id="adminName" defaultValue="Admin User" className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
          </div>
          <div>
            <Label htmlFor="adminEmail" className="dark:text-slate-300">{t('adminEmail', {ns: 'admin'})}</Label>
            <Input id="adminEmail" type="email" defaultValue="admin@example.com" className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
          </div>
          <Button variant="outline" className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">{t('changePassword', {ns: 'admin'})}</Button>
        </Section>

        <Section title={t('notificationSettings', {ns: 'admin'})} icon={Bell} delay={0.3}>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="emailNotifications" defaultChecked className="dark:border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"/>
            <Label htmlFor="emailNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300">
              {t('enableEmailNotifications', {ns: 'admin'})}
            </Label>
          </div>
           <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Checkbox id="siteNotifications" className="dark:border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"/>
            <Label htmlFor="siteNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-slate-300">
              {t('enableSiteNotifications', {ns: 'admin'})}
            </Label>
          </div>
        </Section>
        
        <Section title={t('appearanceSettings', {ns: 'admin'})} icon={Palette} delay={0.4}>
          <div>
            <Label htmlFor="theme" className="dark:text-slate-300">{t('dashboardTheme', {ns: 'admin'})}</Label>
            <select id="theme" defaultValue="system" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-slate-700 dark:text-slate-100">
              <option value="light">{t('lightTheme', {ns: 'admin'})}</option>
              <option value="dark">{t('darkTheme', {ns: 'admin'})}</option>
              <option value="system">{t('systemDefaultTheme', {ns: 'admin'})}</option>
            </select>
          </div>
        </Section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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

export default Settings;