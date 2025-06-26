import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit3, Trash2, MessageSquare as MessageSquareText, Star, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const TestimonialManagement = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    document.title = `${t('testimonialManagementTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      toast({
        title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
        description: `${t('deleteActionNotImplemented', {ns: 'admin', itemName: itemToDelete.author})}`,
        variant: "default",
        className: "bg-yellow-500 text-white"
      });
      setItemToDelete(null); 
    }
  };
  
  const mockTestimonialItems = [
    { id: 1, author: "أحمد محمود", position: "مدير مشروع، شركة البناء الحديث", text: "خدمة ممتازة ودقة في المواعيد. أنصح بهم بشدة!", rating: 5, avatar: "https://avatar.vercel.sh/ahmed.png", lastModified: '2023-04-10' },
    { id: 2, author: "فاطمة علي", position: "مهندسة معمارية", text: "احترافية عالية وجودة عمل لا مثيل لها. شكراً لكم.", rating: 5, avatar: "https://avatar.vercel.sh/fatima.png", lastModified: '2023-03-20' },
    { id: 3, author: "John Doe", position: "CEO, International Constructions", text: "Very reliable and professional team. Highly recommended.", rating: 4, avatar: "https://avatar.vercel.sh/john.png", lastModified: '2023-02-15' },
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
    ));
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
          {t('testimonialManagementTitle', { ns: 'admin' })}
        </h1>
        <Button asChild className="bg-pink-600 hover:bg-pink-700 text-white">
          <Link to="/admin/dashboard/content/add?type=testimonial">
            <PlusCircle className="mr-2 h-5 w-5" /> {t('addNewTestimonial', { ns: 'admin' })}
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('testimonialAuthor', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('rating', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('testimonialText', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('lastModified', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('actions', {ns: 'admin'})}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {mockTestimonialItems.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={item.avatar} alt={item.author} />
                        <AvatarFallback>{item.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{item.author}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{item.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">{renderStars(item.rating)}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-slate-300 max-w-xs truncate">{item.text}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">{item.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 rtl:space-x-reverse">
                    <Button asChild variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700">
                      <Link to={`/admin/dashboard/content/edit/${item.id}?type=testimonial`}>
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
                              {t('confirmDeletionDesc', {ns: 'admin', itemName: itemToDelete.author })}
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
    </div>
  );
};

export default TestimonialManagement;