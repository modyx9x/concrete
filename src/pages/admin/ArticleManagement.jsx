import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit3, Trash2, Newspaper, AlertTriangle, Eye, EyeOff, BarChart2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const ArticleManagement = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [articles, setArticles] = useState([
    { id: 1, titleAr: "أهمية تخريم الخرسانة", titleEn: "Importance of Concrete Drilling", categoryAr: "تقنيات البناء", categoryEn: "Construction Techniques", lastModified: '2023-06-10', status: 'published', isVisible: true, views: 1200 },
    { id: 2, titleAr: "كيف تختار طريقة التخريم المناسبة", titleEn: "Choosing Right Drilling Method", categoryAr: "نصائح الخبراء", categoryEn: "Expert Tips", lastModified: '2023-06-08', status: 'draft', isVisible: false, views: 350 },
    { id: 3, titleAr: "معايير السلامة في قطع الخرسانة", titleEn: "Safety in Concrete Cutting", categoryAr: "السلامة المهنية", categoryEn: "Occupational Safety", lastModified: '2023-06-05', status: 'published', isVisible: true, views: 850 },
  ]);

  useEffect(() => {
    document.title = `${t('articleManagementTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      toast({
        title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
        description: `${t('deleteActionNotImplemented', {ns: 'admin', itemName: language === 'ar' ? itemToDelete.titleAr : itemToDelete.titleEn})}`,
        variant: "default",
        className: "bg-yellow-500 text-white"
      });
      setItemToDelete(null); 
    }
  };

  const toggleVisibility = (id) => {
    toast({
      title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
      description: t('visibilityToggleNotImplemented', {ns: 'admin'}),
      variant: "default",
      className: "bg-yellow-500 text-white"
    });
  };
  
  const toggleStatus = (id) => {
    toast({
      title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
      description: t('statusChangeNotImplemented', {ns: 'admin'}),
      variant: "default",
      className: "bg-yellow-500 text-white"
    });
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
          {t('articleManagementTitle', { ns: 'admin' })}
        </h1>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link to="/admin/dashboard/articles/add">
            <PlusCircle className="mr-2 h-5 w-5" /> {t('addNewArticle', { ns: 'admin' })}
          </Link>
        </Button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('articleTitle', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('category', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('publishStatus', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('visibility', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('views', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('actions', {ns: 'admin'})}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {articles.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-100 flex items-center">
                    <Newspaper className="h-5 w-5 mr-2 text-orange-500" />
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">{language === 'ar' ? item.categoryAr : item.categoryEn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge onClick={() => toggleStatus(item.id)} variant={item.status === 'published' ? 'default' : 'secondary'} className={`cursor-pointer ${item.status === 'published' ? 'bg-green-500 hover:bg-green-600' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}>
                      {t(item.status, {ns: 'admin'})}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                       <Switch
                        id={`article-visibility-${item.id}`}
                        checked={item.isVisible}
                        onCheckedChange={() => toggleVisibility(item.id)}
                        aria-label={t('toggleVisibility', {ns: 'admin'})}
                      />
                      <Label htmlFor={`article-visibility-${item.id}`} className="text-xs">
                        {item.isVisible ? <Eye className="h-4 w-4 text-green-500"/> : <EyeOff className="h-4 w-4 text-red-500"/>}
                      </Label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300 flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1 text-gray-400"/> {item.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 rtl:space-x-reverse">
                    <Button asChild variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700">
                      <Link to={`/admin/dashboard/articles/edit/${item.id}`}>
                        <Edit3 className="h-4 w-4 mr-1" /> {t('edit', {ns: 'admin'})}
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteConfirmation(item)} className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-slate-700">
                          <Trash2 className="h-4 w-4 mr-1" /> {t('delete', {ns: 'admin'})}
                        </Button>
                      </AlertDialogTrigger>
                      {itemToDelete && itemToDelete.id === item.id && (
                        <AlertDialogContent className="dark:bg-slate-800">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center dark:text-slate-100">
                              <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
                              {t('confirmDeletionTitle', {ns: 'admin'})}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-slate-300">
                              {t('confirmDeletionDesc', {ns: 'admin', itemName: language === 'ar' ? itemToDelete.titleAr : itemToDelete.titleEn })}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setItemToDelete(null)} className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600">{t('cancel', {ns: 'admin'})}</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">{t('confirmDelete', {ns: 'admin'})}</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      <p className="text-sm text-gray-600 dark:text-slate-400">{t('articleManagementDesc', { ns: 'admin' })}</p>
    </div>
  );
};

export default ArticleManagement;