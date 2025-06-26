import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Search, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const mockArticles = [
  {
    id: 'importance-of-concrete-drilling',
    title_ar: 'أهمية تخريم الخرسانة في المشاريع الحديثة',
    title_en: 'The Importance of Concrete Drilling in Modern Projects',
    excerpt_ar: 'اكتشف لماذا يعتبر تخريم الخرسانة الدقيق أمرًا حيويًا لنجاح مشاريع البناء والتشييد الحديثة.',
    excerpt_en: 'Discover why precise concrete drilling is crucial for the success of modern construction projects.',
    category_ar: 'تقنيات البناء',
    category_en: 'Construction Techniques',
    author_ar: 'فريق الهندسة',
    author_en: 'Engineering Team',
    date: '2025-05-15',
    image_alt_ar: 'عامل يقوم بتخريم الخرسانة بدقة في موقع بناء',
    image_alt_en: 'Worker performing precise concrete drilling at a construction site',
    image_placeholder: 'Worker performing precise concrete drilling on a construction site',
    tags_ar: ['تخريم الخرسانة', 'بناء', 'هندسة مدنية'],
    tags_en: ['Concrete Drilling', 'Construction', 'Civil Engineering'],
  },
  {
    id: 'choosing-right-drilling-method',
    title_ar: 'كيف تختار طريقة التخريم المناسبة لمشروعك؟',
    title_en: 'How to Choose the Right Drilling Method for Your Project',
    excerpt_ar: 'دليل شامل لاختيار أفضل تقنيات تخريم الخرسانة بناءً على متطلبات مشروعك المحددة.',
    excerpt_en: 'A comprehensive guide to selecting the best concrete drilling techniques based on your specific project requirements.',
    category_ar: 'نصائح الخبراء',
    category_en: 'Expert Tips',
    author_ar: 'م. عبدالله السالم',
    author_en: 'Eng. Abdullah Alsalem',
    date: '2025-04-28',
    image_alt_ar: 'مجموعة متنوعة من رؤوس مثقاب الخرسانة معروضة',
    image_alt_en: 'Various concrete drill bits displayed',
    image_placeholder: 'Assortment of concrete drill bits for different applications',
    tags_ar: ['اختيار المعدات', 'تخطيط المشاريع', 'كفاءة العمل'],
    tags_en: ['Equipment Selection', 'Project Planning', 'Work Efficiency'],
  },
  {
    id: 'safety-in-concrete-cutting',
    title_ar: 'معايير السلامة الأساسية في عمليات قطع الخرسانة',
    title_en: 'Essential Safety Standards in Concrete Cutting Operations',
    excerpt_ar: 'تعرف على إجراءات السلامة الحيوية التي يجب اتباعها لضمان بيئة عمل آمنة أثناء قطع الخرسانة.',
    excerpt_en: 'Learn about the vital safety procedures to follow to ensure a safe working environment during concrete cutting.',
    category_ar: 'السلامة المهنية',
    category_en: 'Occupational Safety',
    author_ar: 'إدارة السلامة',
    author_en: 'Safety Department',
    date: '2025-03-10',
    image_alt_ar: 'عامل يرتدي معدات السلامة أثناء قطع الخرسانة بمنشار',
    image_alt_en: 'Worker wearing safety gear while cutting concrete with a saw',
    image_placeholder: 'Construction worker with full safety equipment operating a concrete saw',
    tags_ar: ['سلامة الموقع', 'قطع الخرسانة', 'إدارة المخاطر'],
    tags_en: ['Site Safety', 'Concrete Cutting', 'Risk Management'],
  },
];

const ArticleCard = ({ article, lang }) => {
  const { t, direction } = useLanguage();
  return (
    <motion.article
      aria-labelledby={`article-title-${article.id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${article.id}`} className="block" aria-label={`${t('readMoreAbout')} ${lang === 'ar' ? article.title_ar : article.title_en}`}>
        <img  
          className="w-full h-56 object-cover aspect-[16/9]"
          alt={lang === 'ar' ? article.image_alt_ar : article.image_alt_en}
          loading="lazy"
         src="https://images.unsplash.com/photo-1688435581883-e2d8e57429b2" />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
            {lang === 'ar' ? article.category_ar : article.category_en}
          </span>
        </div>
        <Link to={`/blog/${article.id}`} className="block">
          <h2 id={`article-title-${article.id}`} className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
            {lang === 'ar' ? article.title_ar : article.title_en}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {lang === 'ar' ? article.excerpt_ar : article.excerpt_en}
        </p>
        <div className="text-xs text-gray-500 mb-3">
          <div className="flex items-center mb-1">
            <User className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            <span>{lang === 'ar' ? article.author_ar : article.author_en}</span>
          </div>
          <div className="flex items-center">
            <Calendar className={`w-3 h-3 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            <time dateTime={article.date}>{new Date(article.date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          </div>
        </div>
        <div className="mb-4">
          {(lang === 'ar' ? article.tags_ar : article.tags_en).slice(0, 2).map(tag => (
            <span key={tag} className={`inline-block bg-gray-200 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 ${direction === 'rtl' ? 'ml-1' : 'mr-1'} mb-1`}>
              #{tag}
            </span>
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="mt-auto w-full border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors">
          <Link to={`/blog/${article.id}`} aria-label={`${t('readMoreAbout')} ${lang === 'ar' ? article.title_ar : article.title_en}`}>
            {t('readMore')}
            <ArrowRight className={`h-4 w-4 ${direction === 'rtl' ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </Button>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const { t, language, direction } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  useEffect(() => {
    document.title = `${t('blogTitle')} - ${t('heroTitle')}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('blogMetaDescription'));
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = t('blogMetaDescription');
      document.head.appendChild(newMeta);
    }
  }, [t, language]);

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const results = mockArticles.filter(article => {
      const title = (language === 'ar' ? article.title_ar : article.title_en).toLowerCase();
      const excerpt = (language === 'ar' ? article.excerpt_ar : article.excerpt_en).toLowerCase();
      const category = (language === 'ar' ? article.category_ar : article.category_en).toLowerCase();
      const tags = (language === 'ar' ? article.tags_ar : article.tags_en).join(' ').toLowerCase();
      return title.includes(lowerSearchTerm) || excerpt.includes(lowerSearchTerm) || category.includes(lowerSearchTerm) || tags.includes(lowerSearchTerm);
    });
    setFilteredArticles(results);
  }, [searchTerm, language]);

  const popularCategories = [...new Set(mockArticles.map(a => language === 'ar' ? a.category_ar : a.category_en))].slice(0, 5);
  const recentPosts = mockArticles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);


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
            {t('blogTitle')}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto text-blue-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('blogSubtitle')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="mb-8">
              <div className="relative">
                <label htmlFor="search-articles-input" className="sr-only">{t('searchArticles')}</label>
                <Input
                  id="search-articles-input"
                  type="search"
                  placeholder={t('searchArticles')}
                  className={`w-full ${direction === 'rtl' ? 'pr-10' : 'pl-10'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label={t('searchArticles')}
                />
                <Search className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 ${direction === 'rtl' ? 'right-3' : 'left-3'}`} aria-hidden="true" />
              </div>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} lang={language} />
                ))}
              </div>
            ) : (
              <motion.p 
                className="text-center text-gray-600 text-lg py-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {t('noArticlesFound')}
              </motion.p>
            )}
            
            {filteredArticles.length > 6 && (
              <nav aria-label={t('paginationLabel') || "Article pagination"} className="mt-12 flex justify-center">
                <Button variant="outline" className="mx-1" aria-label={t('gotoPage', {page: 1}) || "Go to page 1"}>1</Button>
                <Button variant="default" className="mx-1 bg-blue-600 text-white" aria-current="page" aria-label={t('currentPage', {page: 2}) || "Current page, Page 2"}>2</Button>
                <Button variant="outline" className="mx-1" aria-label={t('gotoPage', {page: 3}) || "Go to page 3"}>3</Button>
              </nav>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-8" aria-label={t('blogSidebarLabel') || "Blog Sidebar"}>
            <motion.section 
              aria-labelledby="popular-categories-heading"
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 id="popular-categories-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{t('popularCategories')}</h3>
              <ul className="space-y-2">
                {popularCategories.map(category => (
                  <li key={category}>
                    <Link to={`/blog?category=${encodeURIComponent(category)}`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                      <Tag className={`w-4 h-4 text-blue-500 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              aria-labelledby="recent-posts-heading"
              className="bg-white p-6 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: direction === 'rtl' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 id="recent-posts-heading" className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">{t('recentPosts')}</h3>
              <ul className="space-y-4">
                {recentPosts.map(post => (
                  <li key={post.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <Link to={`/blog/${post.id}`} className="flex-shrink-0" aria-label={`${t('readMoreAbout')} ${language === 'ar' ? post.title_ar : post.title_en}`}>
                      <img   
                        className="w-16 h-16 object-cover rounded-md aspect-square" 
                        alt={language === 'ar' ? post.image_alt_ar : post.image_alt_en}
                        loading="lazy"
                       src="https://images.unsplash.com/photo-1701033718128-c0dc5057b747" />
                    </Link>
                    <div>
                      <Link to={`/blog/${post.id}`} className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors block leading-tight">
                        {language === 'ar' ? post.title_ar : post.title_en}
                      </Link>
                      <time dateTime={post.date} className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { month: 'short', day: 'numeric' })}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
            
            <motion.section
              aria-labelledby="newsletter-signup-heading"
              className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-xl shadow-lg text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 id="newsletter-signup-heading" className="text-xl font-semibold mb-3">{t('newsletterSignupTitle')}</h3>
              <p className="text-sm mb-4 opacity-90">{t('newsletterSignupText')}</p>
              <form className="flex">
                <label htmlFor="sidebar-email" className="sr-only">{t('yourEmailPlaceholder')}</label>
                <Input id="sidebar-email" type="email" placeholder={t('yourEmailPlaceholder')} className="flex-grow rounded-l-md border-0 text-gray-800 placeholder-gray-500" aria-label={t('yourEmailPlaceholder')} />
                <Button type="submit" className="bg-white text-blue-600 rounded-r-md hover:bg-gray-100">
                  {t('subscribe')}
                </Button>
              </form>
            </motion.section>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Blog;