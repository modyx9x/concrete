import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart, Users, MousePointerClick, TrendingUp, FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Analytics = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    document.title = `${t('analyticsTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
     toast({
      title: "🚧 " + t('featureUnderDevelopmentTitle', { ns: 'admin' }),
      description: t('analyticsPageDesc', { ns: 'admin' }),
      variant: "default",
      className: "bg-amber-500 text-white"
    });
  }, [t, language, toast]);

  const analyticsCards = [
    { title: t('siteVisitors', {ns: 'admin'}), value: "25.6K", icon: Users, trend: "+15%", trendType: "up", delay: 0.1 },
    { title: t('pageViews', {ns: 'admin'}), value: "102.1K", icon: FileText, trend: "+8%", trendType: "up", delay: 0.2 },
    { title: t('bounceRate', {ns: 'admin'}), value: "45.2%", icon: MousePointerClick, trend: "-2%", trendType: "down", delay: 0.3 },
    { title: t('avgSessionDuration', {ns: 'admin'}), value: "5m 32s", icon: TrendingUp, trend: "+5%", trendType: "up", delay: 0.4 },
  ];

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 dark:text-slate-100"
      >
        {t('analyticsTitle', { ns: 'admin' })}
      </motion.h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map(card => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.delay }}
          >
            <Card className="shadow-lg dark:bg-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-300">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground dark:text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800 dark:text-slate-100">{card.value}</div>
                <p className={`text-xs ${card.trendType === "up" ? "text-green-500" : "text-red-500"}`}>
                  {card.trend} {t('vsLastMonth', {ns: 'admin'})}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { title: t('trafficSources', {ns: 'admin'}), delay: 0.5 },
          { title: t('userDemographics', {ns: 'admin'}), delay: 0.6 }
        ].map(chart => (
          <motion.div
            key={chart.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: chart.delay }}
          >
            <Card className="shadow-lg dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800 dark:text-slate-100">
                  <BarChart className="h-5 w-5 mr-2 text-indigo-500" />
                  {chart.title}
                </CardTitle>
                <CardDescription className="dark:text-slate-400">{t('last30Days', {ns: 'admin'})}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-slate-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-slate-400">{t('chartDataPlaceholder', { ns: 'admin' })}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-slate-400 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-md">
        {t('analyticsPageDesc', { ns: 'admin' })}
      </p>
    </div>
  );
};

export default Analytics;