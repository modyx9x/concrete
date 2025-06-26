import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Eye, Users, FileText, MessageSquare, BarChartBig } from 'lucide-react';

const StatCard = ({ title, value, icon, description, colorClass, delay }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${colorClass}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">{title}</CardTitle>
          <IconComponent className="h-5 w-5 text-white/80" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white">{value}</div>
          <p className="text-xs text-white/90 pt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const DashboardOverview = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title = `${t('dashboardOverviewTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);
  
  const stats = [
    { title: t('totalVisitors', { ns: 'admin' }), value: "10,250", icon: Eye, description: t('lastMonth', {ns: 'admin'}), colorClass: "bg-gradient-to-r from-blue-500 to-blue-600", delay: 0.1 },
    { title: t('registeredUsers', { ns: 'admin' }), value: "1,280", icon: Users, description: t('activeThisWeek', {ns: 'admin'}), colorClass: "bg-gradient-to-r from-green-500 to-green-600", delay: 0.2 },
    { title: t('articlesPublished', { ns: 'admin' }), value: "75", icon: FileText, description: t('pendingApproval', {ns: 'admin', count: 3}), colorClass: "bg-gradient-to-r from-purple-500 to-purple-600", delay: 0.3 },
    { title: t('contactMessages', { ns: 'admin' }), value: "120", icon: MessageSquare, description: t('unreadMessages', {ns: 'admin', count: 5}), colorClass: "bg-gradient-to-r from-orange-500 to-orange-600", delay: 0.4 },
  ];

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 dark:text-slate-100"
      >
        {t('dashboardOverviewTitle', { ns: 'admin' })}
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="lg:col-span-2 shadow-lg dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-slate-100">
                <BarChartBig className="h-6 w-6 mr-2 text-indigo-500" />
                {t('trafficOverview', { ns: 'admin' })}
              </CardTitle>
              <CardDescription className="dark:text-slate-400">{t('trafficLast30Days', { ns: 'admin' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-md flex items-center justify-center">
                <p className="text-gray-500 dark:text-slate-400">{t('chartPlaceholder', { ns: 'admin' })}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="shadow-lg dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-slate-100">{t('recentActivities', { ns: 'admin' })}</CardTitle>
              <CardDescription className="dark:text-slate-400">{t('latestUpdates', { ns: 'admin' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[1,2,3,4].map(i => (
                  <li key={i} className="text-sm text-gray-700 dark:text-slate-300 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-md">
                    {t(`activityPlaceholder${i}`, {ns: 'admin', defaultValue: `Activity item ${i} placeholder`})}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;