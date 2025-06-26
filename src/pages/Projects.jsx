import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, PlusCircle, Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const ProjectCard = ({ project, onOpenModal }) => {
  const { t, direction } = useLanguage();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="relative">
        <img  
          className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105 aspect-video" 
          alt={project.title}
          loading="lazy"
         src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/20"
            onClick={() => onOpenModal(project)}
            aria-label={`${t('viewProjectDetailsFor')} ${project.title}`}
          >
            <Eye className={`h-5 w-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
            {t('viewProject')}
          </Button>
        </div>
      </div>
      <div className="p-6">
        <h3 id={`project-title-${project.id}`} className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-1">{project.category}</p>
        <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { t, direction, language } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = `${t('projectsTitle')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('projectsMetaDescription') || t('projectsDescription'));
    }
  }, [t, language]);

  const allProjects = [
    { id: 1, title: t('project1Title') || "مشروع برج الرياض", category: t('projectCategoryDrilling') || "تخريم الخرسانات", description: t('project1Desc') || "أعمال تخريم دقيقة لتركيب أنظمة الواجهات الزجاجية.", image: "Modern skyscraper construction site with drilling", date: "2023-05-15", client: t('project1Client') || "شركة بناءكو" },
    { id: 2, title: t('project2Title') || "توسعة مستشفى الملك فهد", category: t('projectCategoryCutting') || "قطع الخرسانات", description: t('project2Desc') || "قطع جدران خرسانية لإنشاء ممرات جديدة وتوسيع الأقسام.", image: "Hospital expansion project with concrete cutting", date: "2022-11-20", client: t('project2Client') || "وزارة الصحة" },
    { id: 3, title: t('project3Title') || "مجمع تجاري في جدة", category: t('projectCategoryCoreDrilling') || "الحفر الأساسي", description: t('project3Desc') || "أخذ عينات خرسانية لاختبارات الجودة وتركيبات إنشائية.", image: "Shopping mall construction with core drilling", date: "2023-01-10", client: t('project3Client') || "مجموعة العثيم التجارية" },
    { id: 4, title: t('project4Title') || "مشروع مترو الدمام", category: t('projectCategoryWallSawing') || "قطع الجدران", description: t('project4Desc') || "إنشاء فتحات تهوية وأنفاق خدمات في محطات المترو.", image: "Metro station construction with wall sawing", date: "2023-08-02", client: t('project4Client') || "هيئة تطوير المنطقة الشرقية" },
    { id: 5, title: t('project5Title') || "تجديد فندق الخبر", category: t('projectCategoryDrilling') || "تخريم الخرسانات", description: t('project5Desc') || "تخريم لمرور تمديدات كهربائية وصحية جديدة في الفندق.", image: "Hotel renovation with precision drilling", date: "2022-09-05", client: t('project5Client') || "مجموعة فنادق الخليج" },
    { id: 6, title: t('project6Title') || "جسر الملك سلمان", category: t('projectCategoryCutting') || "قطع الخرسانات", description: t('project6Desc') || "تعديلات هيكلية وقطع أجزاء خرسانية لتقوية الجسر.", image: "Bridge construction showing concrete cutting work", date: "2023-03-22", client: t('project6Client') || "وزارة النقل" },
  ];

  const categories = ['all', ...new Set(allProjects.map(p => p.category))];

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="py-16 md:py-24 bg-slate-100">
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {t('projectsTitle')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('projectsDescription')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="relative w-full md:w-1/2 lg:w-1/3">
            <label htmlFor="project-search-input" className="sr-only">{t('searchProjects', { ns: 'projectsPage' }) || "ابحث في المشاريع..."}</label>
            <Input 
              id="project-search-input"
              type="search"
              placeholder={t('searchProjects', { ns: 'projectsPage' }) || "ابحث في المشاريع..."}
              className={`ps-10 ${direction === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t('searchProjectsInputLabel') || "Search projects input"}
            />
            <Search className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${direction === 'rtl' ? 'right-3' : 'left-3'}`} aria-hidden="true" />
          </div>
          <div role="group" aria-label={t('projectCategoriesFilterLabel') || "Filter projects by category"} className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map(category => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                onClick={() => setFilter(category)}
                className={`transition-all duration-200 ${filter === category ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                aria-pressed={filter === category}
              >
                {category === 'all' ? (t('all', { ns: 'projectsPage' }) || "الكل") : category}
              </Button>
            ))}
          </div>
        </div>
        
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} onOpenModal={openModal} />
              ))
            ) : (
              <motion.p 
                className="col-span-full text-center text-gray-600 text-lg py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {t('noProjectsFound', { ns: 'projectsPage' }) || "لم يتم العثور على مشاريع تطابق بحثك."}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length > 6 && (
            <div className="text-center mt-12">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <PlusCircle className={`h-5 w-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                    {t('loadMore', { ns: 'projectsPage' }) || "تحميل المزيد"}
                </Button>
            </div>
        )}
      </section>

      <AnimatePresence>
      {isModalOpen && selectedProject && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="sm:max-w-[625px] glass" aria-labelledby={`modal-title-${selectedProject.id}`} aria-describedby={`modal-desc-${selectedProject.id}`}>
            <DialogHeader>
              <DialogTitle id={`modal-title-${selectedProject.id}`} className="text-2xl font-bold text-gray-800">{selectedProject.title}</DialogTitle>
              <DialogDescription id={`modal-desc-${selectedProject.id}`} className="text-gray-600">{selectedProject.category}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <img  
                className="w-full h-80 object-cover rounded-lg mb-4 aspect-video" 
                alt={selectedProject.title} 
                loading="lazy"
               src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
              <p className="text-gray-700 leading-relaxed mb-2">{selectedProject.description}</p>
              <p className="text-sm text-gray-500"><strong>{t('client', { ns: 'projectsPage' }) || "العميل"}:</strong> {selectedProject.client}</p>
              <p className="text-sm text-gray-500"><strong>{t('date', { ns: 'projectsPage' }) || "التاريخ"}:</strong> <time dateTime={selectedProject.date}>{selectedProject.date}</time></p>
            </div>
            <DialogFooter>
              <Button onClick={closeModal} variant="outline">
                {t('close', { ns: 'common' }) || "إغلاق"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;