import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Inbox, Eye, Trash2, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSubmissions = () => {
  const { t, language, direction } = useLanguage();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'أحمد خالد', email: 'ahmed.k@example.com', subject: 'استفسار عن خدمة التخريم', message: 'أود الاستفسار عن أسعار خدمة تخريم الخرسانة لمشروع بناء فيلا سكنية. المساحة التقريبية 300 متر مربع.', date: '2025-06-15', status: 'unread' },
    { id: 2, name: 'Fatima Al-Otaibi', email: 'fatima.o@example.com', subject: 'Quotation Request for Concrete Cutting', message: 'Dear team, please provide a quotation for concrete cutting services for a commercial building renovation. Details attached.', date: '2025-06-14', status: 'read' },
    { id: 3, name: 'شركة المقاولات الحديثة', email: 'contact@moderncontracting.sa', subject: 'طلب شراكة وتعاون', message: 'نحن شركة مقاولات رائدة ونود بحث سبل التعاون المشترك في مشاريع مستقبلية. يرجى التواصل لتحديد موعد.', date: '2025-06-12', status: 'unread' },
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    document.title = `${t('formSubmissionsTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language]);

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setIsViewModalOpen(true);
    // Mark as read if unread (locally)
    setSubmissions(prev => prev.map(s => s.id === submission.id ? {...s, status: 'read'} : s));
  };

  const handleDeleteConfirmation = (item) => {
    setItemToDelete(item);
  };

  const handleDelete = () => {
    if (itemToDelete) {
      toast({
        title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
        description: `${t('deleteActionNotImplemented', {ns: 'admin', itemName: `${t('messageFrom', {ns:'admin'})} ${itemToDelete.name}`})}`,
        variant: "default",
        className: "bg-yellow-500 text-white"
      });
      // Actual deletion logic would be here
      // setSubmissions(prev => prev.filter(s => s.id !== itemToDelete.id));
      setItemToDelete(null); 
    }
  };

  const toggleStatus = (id) => {
     toast({
        title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
        description: t('statusChangeNotImplemented', {ns: 'admin'}),
        variant: "default",
        className: "bg-yellow-500 text-white"
      });
    // setSubmissions(prev => prev.map(s => s.id === id ? {...s, status: s.status === 'read' ? 'unread' : 'read'} : s));
  };

  const filteredSubmissions = submissions.filter(s => 
    filterStatus === 'all' || s.status === filterStatus
  );

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
          {t('formSubmissionsTitle', { ns: 'admin' })}
        </h1>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-slate-400" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px] dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
              <SelectValue placeholder={t('filterByStatus', {ns: 'admin'})} />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-700 dark:text-slate-100">
              <SelectItem value="all">{t('allStatuses', {ns: 'admin'})}</SelectItem>
              <SelectItem value="unread">{t('unread', {ns: 'admin'})}</SelectItem>
              <SelectItem value="read">{t('read', {ns: 'admin'})}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-lg overflow-hidden"
      >
        {filteredSubmissions.length === 0 ? (
          <p className="p-6 text-center text-gray-500 dark:text-slate-400">{t('noSubmissions', {ns: 'admin'})}</p>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('senderName', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('subject', {ns: 'contactPage'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('submissionDate', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('status', {ns: 'admin'})}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-300 uppercase tracking-wider">{t('actions', {ns: 'admin'})}</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              {filteredSubmissions.map((item, index) => (
                <motion.tr 
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={item.status === 'unread' ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-slate-400">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 max-w-xs truncate">{item.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span onClick={() => toggleStatus(item.id)} className={`cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'read' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
                      {t(item.status, {ns: 'admin'})}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => handleViewSubmission(item)} className="text-indigo-600 border-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700">
                      <Eye className="h-4 w-4 mr-1" /> {t('viewMessage', {ns: 'admin'})}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(item.id)} className={`text-sm ${item.status === 'read' ? 'text-yellow-600 border-yellow-600 hover:bg-yellow-50' : 'text-green-600 border-green-600 hover:bg-green-50'} dark:hover:bg-slate-700`}>
                      {item.status === 'read' ? <XCircle className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                      {item.status === 'read' ? t('markAsUnread', {ns: 'admin'}) : t('markAsRead', {ns: 'admin'})}
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
                              {t('confirmDeletionDesc', {ns: 'admin', itemName: `${t('messageFrom', {ns:'admin'})} ${itemToDelete.name}` })}
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
        )}
      </motion.div>

      {selectedSubmission && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="sm:max-w-lg dark:bg-slate-800">
            <DialogHeader>
              <DialogTitle className="dark:text-slate-100">{t('formSubmissionDetails', {ns: 'admin'})}</DialogTitle>
              <DialogDescription className="dark:text-slate-400">{selectedSubmission.subject}</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-2">
              <p><strong className="dark:text-slate-300">{t('senderName', {ns: 'admin'})}:</strong> <span className="dark:text-slate-200">{selectedSubmission.name}</span></p>
              <p><strong className="dark:text-slate-300">{t('senderEmail', {ns: 'admin'})}:</strong> <span className="dark:text-slate-200">{selectedSubmission.email}</span></p>
              <p><strong className="dark:text-slate-300">{t('submissionDate', {ns: 'admin'})}:</strong> <span className="dark:text-slate-200">{selectedSubmission.date}</span></p>
              <p><strong className="dark:text-slate-300">{t('status', {ns: 'admin'})}:</strong> <span className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedSubmission.status === 'read' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>{t(selectedSubmission.status, {ns: 'admin'})}</span></p>
              <div className="pt-2">
                <strong className="dark:text-slate-300">{t('messageContent', {ns: 'admin'})}:</strong>
                <p className="mt-1 p-3 bg-gray-50 dark:bg-slate-700 rounded-md text-sm text-gray-700 dark:text-slate-200 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewModalOpen(false)} className="dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-600">{t('close', {ns: 'common'})}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FormSubmissions;