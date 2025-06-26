import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit3, Trash2, Package, AlertTriangle, Eye, EyeOff } from 'lucide-react';
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

const ServiceManagement = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [services, setServices] = useState([
    { id: 1, titleAr: "تخريم الخرسانات", titleEn: "Concrete Drilling", icon: "Hammer", lastModified: '2023-06-10', isVisible: true },
    { id: 2, titleAr: "قطع الخرسانات", titleEn: "Concrete Cutting", icon: "Disc", lastModified: '2023-06-08', isVisible: true },
    { id: 3, titleAr: "قطع الجدران", titleEn: "Wall Sawing", icon: "SquareStack", lastModified: '2023-06-05', isVisible: false },
  ]);

  useEffect(() => {
    document.title = `${t('serviceManagementTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
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
    // For local state update demonstration:
    // setServices(prevServices => 
    //   prevServices.map(service => 
    //     service.id === id ? { ...service, isVisible: !service.isVisible } : service
    //   )
    // );
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
          {t('serviceManagementTitle', { ns: 'admin' })}
        </h1>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Link to="/admin/dashboard/services/add">
            <PlusCircle className="mr-2 h-5 w-5" /> {t('addNewService', { ns: 'admin' })}
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('serviceName', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('serviceIcon', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('lastModified', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('visibility', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('actions', {ns: 'admin'})}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {services.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-100 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-indigo-500" />
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">{item.icon}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">{item.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-300">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                       <Switch
                        id={`visibility-switch-${item.id}`}
                        checked={item.isVisible}
                        onCheckedChange={() => toggleVisibility(item.id)}
                        aria-label={t('toggleVisibility', {ns: 'admin'})}
                      />
                      <Label htmlFor={`visibility-switch-${item.id}`} className="text-xs">
                        {item.isVisible ? <Eye className="h-4 w-4 text-green-500"/> : <EyeOff className="h-4 w-4 text-red-500"/>}
                      </Label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 rtl:space-x-reverse">
                    <Button asChild variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700">
                      <Link to={`/admin/dashboard/services/edit/${item.id}`}>
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
      <p className="text-sm text-gray-600 dark:text-slate-400">{t('serviceManagementDesc', { ns: 'admin' })}</p>
    </div>
  );
};

export default ServiceManagement;