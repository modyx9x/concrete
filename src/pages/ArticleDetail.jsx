import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const mockArticles = [
  {
    id: 'importance-of-concrete-drilling',
    title_ar: 'أهمية تخريم الخرسانة في المشاريع الحديثة',
    title_en: 'The Importance of Concrete Drilling in Modern Projects',
    content_ar: `
      <p>يعتبر تخريم الخرسانة عملية أساسية في صناعة البناء والتشييد الحديثة. إنها تتجاوز مجرد حفر ثقوب؛ إنها تتعلق بالدقة والكفاءة والسلامة الهيكلية. سواء كان الأمر يتعلق بتركيب أنظمة السباكة أو الكهرباء أو التكييف، أو إنشاء فتحات للمثبتات والمسامير، فإن التخريم الدقيق يضمن عدم المساس بسلامة الهيكل الخرساني.</p>
      <h2 class="text-2xl font-semibold my-4">لماذا الدقة مهمة جداً؟</h2>
      <p>يمكن أن يؤدي التخريم غير الدقيق إلى إضعاف الخرسانة، مما قد يتسبب في حدوث تشققات أو حتى فشل هيكلي في الحالات القصوى. تستخدم الشركات المحترفة معدات متطورة مثل مثاقب الماس وتقنيات الحفر الأساسي لضمان أن تكون كل فتحة بالحجم والموقع والعمق الصحيحين تمامًا.</p>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="معدات تخريم خرسانة متطورة وحديثة" loading="lazy" src="https://images.unsplash.com/photo-1678944827354-fb54b9040a04" />
      <h3 class="text-xl font-semibold my-3">التطبيقات الشائعة لتخريم الخرسانة:</h3>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li>تركيب أنابيب المياه والصرف الصحي.</li>
        <li>تمرير الكابلات الكهربائية وأسلاك الاتصالات.</li>
        <li>تثبيت الدرابزين والحواجز.</li>
        <li>إنشاء فتحات للتهوية والتكييف.</li>
        <li>أخذ عينات من الخرسانة لاختبارات الجودة.</li>
      </ul>
      <p>في الختام، لا يمكن الاستهانة بدور تخريم الخرسانة الاحترافي. إنه استثمار في جودة وسلامة وطول عمر أي مشروع بناء.</p>
    `,
    content_en: `
      <p>Concrete drilling is a fundamental process in the modern construction industry. It goes beyond just making holes; it's about precision, efficiency, and structural integrity. Whether it's for installing plumbing, electrical systems, HVAC, or creating openings for anchors and bolts, precise drilling ensures the concrete structure's integrity is not compromised.</p>
      <h2 class="text-2xl font-semibold my-4">Why is Precision So Important?</h2>
      <p>Inaccurate drilling can weaken the concrete, potentially leading to cracks or even structural failure in extreme cases. Professional companies use advanced equipment like diamond drill bits and core drilling techniques to ensure every hole is of the exact size, location, and depth required.</p>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="Advanced and modern concrete drilling equipment" loading="lazy" src="https://images.unsplash.com/photo-1609446606549-1d42c193f74b" />
      <h3 class="text-xl font-semibold my-3">Common Applications of Concrete Drilling:</h3>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li>Installation of water and sewage pipes.</li>
        <li>Routing electrical cables and communication wires.</li>
        <li>Anchoring handrails and barriers.</li>
        <li>Creating openings for ventilation and air conditioning.</li>
        <li>Taking concrete core samples for quality testing.</li>
      </ul>
      <p>In conclusion, the role of professional concrete drilling cannot be overstated. It's an investment in the quality, safety, and longevity of any construction project.</p>
    `,
    category_ar: 'تقنيات البناء',
    category_en: 'Construction Techniques',
    author_ar: 'فريق الهندسة',
    author_en: 'Engineering Team',
    date: '2025-05-15',
    image_alt_ar: 'عامل يقوم بتخريم الخرسانة بدقة في موقع بناء',
    image_alt_en: 'Worker performing precise concrete drilling at a construction site',
    image_placeholder: 'Worker performing precise concrete drilling on a construction site',
    tags_ar: ['تخريم الخرسانة', 'بناء', 'هندسة مدنية', 'سلامة إنشائية'],
    tags_en: ['Concrete Drilling', 'Construction', 'Civil Engineering', 'Structural Safety'],
    meta_description_ar: 'تعرف على أهمية تخريم الخرسانة الدقيق في مشاريع البناء الحديثة وكيف يساهم في السلامة الهيكلية والكفاءة.',
    meta_description_en: 'Learn about the importance of precise concrete drilling in modern construction projects and how it contributes to structural safety and efficiency.',
  },
  {
    id: 'choosing-right-drilling-method',
    title_ar: 'كيف تختار طريقة التخريم المناسبة لمشروعك؟',
    title_en: 'How to Choose the Right Drilling Method for Your Project',
    content_ar: `
      <p>يعد اختيار طريقة تخريم الخرسانة المناسبة قرارًا حاسمًا يؤثر على كفاءة المشروع وتكاليفه ونتائجه النهائية. هناك عدة عوامل يجب مراعاتها، بما في ذلك نوع الخرسانة، وحجم وعمق الثقوب المطلوبة، ووجود حديد التسليح، والقيود البيئية.</p>
      <h2 class="text-2xl font-semibold my-4">أنواع طرق التخريم الشائعة:</h2>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li><strong>الحفر الدوراني (Rotary Drilling):</strong> مناسب للثقوب الصغيرة في الخرسانة غير المسلحة.</li>
        <li><strong>الحفر الدوراني بالطرق (Rotary Hammer Drilling):</strong> أكثر قوة وفعالية للخرسانة المسلحة والثقوب متوسطة الحجم.</li>
        <li><strong>الحفر الماسي الأساسي (Diamond Core Drilling):</strong> يوفر ثقوبًا نظيفة ودقيقة للغاية، مثالي للفتحات الكبيرة وأخذ العينات.</li>
      </ul>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="مقارنة بين طرق تخريم الخرسانة المختلفة المعروضة" loading="lazy" src="https://images.unsplash.com/photo-1519634093379-625390ebebc7" />
      <h3 class="text-xl font-semibold my-3">اعتبارات إضافية:</h3>
      <p>فكر في مستوى الضوضاء والغبار المسموح به في الموقع. الحفر الرطب، على سبيل المثال، يقلل من الغبار ولكنه يتطلب إدارة للمياه. استشر دائمًا متخصصًا لتحديد أفضل نهج لمشروعك المحدد لضمان تحقيق النتائج المثلى بأمان وكفاءة.</p>
    `,
    content_en: `
      <p>Choosing the right concrete drilling method is a crucial decision that impacts project efficiency, cost, and final outcome. Several factors must be considered, including the type of concrete, the size and depth of holes required, the presence of rebar, and environmental constraints.</p>
      <h2 class="text-2xl font-semibold my-4">Common Drilling Methods:</h2>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li><strong>Rotary Drilling:</strong> Suitable for small holes in unreinforced concrete.</li>
        <li><strong>Rotary Hammer Drilling:</strong> More powerful and effective for reinforced concrete and medium-sized holes.</li>
        <li><strong>Diamond Core Drilling:</strong> Provides very clean and precise holes, ideal for large openings and sample extraction.</li>
      </ul>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="Comparison of different concrete drilling methods displayed" loading="lazy" src="https://images.unsplash.com/photo-1637678362768-7de0212a855d" />
      <h3 class="text-xl font-semibold my-3">Additional Considerations:</h3>
      <p>Consider the noise and dust levels permissible on site. Wet drilling, for example, reduces dust but requires water management. Always consult a professional to determine the best approach for your specific project to ensure optimal results safely and efficiently.</p>
    `,
    category_ar: 'نصائح الخبراء',
    category_en: 'Expert Tips',
    author_ar: 'م. عبدالله السالم',
    author_en: 'Eng. Abdullah Alsalem',
    date: '2025-04-28',
    image_alt_ar: 'مجموعة متنوعة من رؤوس مثقاب الخرسانة المعروضة',
    image_alt_en: 'Various concrete drill bits displayed',
    image_placeholder: 'Assortment of concrete drill bits for different applications',
    tags_ar: ['اختيار المعدات', 'تخطيط المشاريع', 'كفاءة العمل', 'تقنيات الحفر'],
    tags_en: ['Equipment Selection', 'Project Planning', 'Work Efficiency', 'Drilling Techniques'],
    meta_description_ar: 'دليل شامل لاختيار طريقة تخريم الخرسانة الأنسب لمشروعك، مع مقارنة بين التقنيات المختلفة.',
    meta_description_en: 'A comprehensive guide to choosing the most suitable concrete drilling method for your project, with a comparison of different techniques.',
  },
  {
    id: 'safety-in-concrete-cutting',
    title_ar: 'معايير السلامة الأساسية في عمليات قطع الخرسانة',
    title_en: 'Essential Safety Standards in Concrete Cutting Operations',
    content_ar: `
      <p>تعتبر عمليات قطع الخرسانة من الأنشطة التي تنطوي على مخاطر محتملة إذا لم يتم اتخاذ احتياطات السلامة المناسبة. يعد ضمان سلامة العمال والجمهور المحيط أمرًا بالغ الأهمية.</p>
      <h2 class="text-2xl font-semibold my-4">معدات الحماية الشخصية (PPE):</h2>
      <p>يجب على جميع العاملين ارتداء معدات الوقاية الشخصية المناسبة، والتي تشمل على الأقل:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li>حماية العين (نظارات واقية أو واقيات وجه).</li>
        <li>حماية الجهاز التنفسي (أقنعة الغبار أو أجهزة التنفس).</li>
        <li>حماية السمع (سدادات أذن أو واقيات أذن).</li>
        <li>قفازات شديدة التحمل.</li>
        <li>أحذية سلامة ذات مقدمة فولاذية.</li>
        <li>ملابس واقية مرئية.</li>
      </ul>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="عامل يرتدي كامل معدات الحماية الشخصية أثناء قطع الخرسانة" loading="lazy" src="https://images.unsplash.com/photo-1694522362256-6c907336af43" />
      <h3 class="text-xl font-semibold my-3">إجراءات السلامة في الموقع:</h3>
      <p>بالإضافة إلى معدات الوقاية الشخصية، يجب تأمين منطقة العمل بشكل صحيح، واستخدام واقيات الشفرات، وضمان التهوية الكافية، وتدريب المشغلين بشكل كامل على استخدام المعدات بأمان. يجب إجراء فحوصات منتظمة للمعدات للتأكد من أنها في حالة عمل جيدة.</p>
      <p>إن الالتزام الصارم بمعايير السلامة لا يحمي العمال فحسب، بل يضمن أيضًا سير العمل بسلاسة ويقلل من احتمالية وقوع حوادث مكلفة.</p>
    `,
    content_en: `
      <p>Concrete cutting operations involve potential hazards if proper safety precautions are not taken. Ensuring the safety of workers and the surrounding public is paramount.</p>
      <h2 class="text-2xl font-semibold my-4">Personal Protective Equipment (PPE):</h2>
      <p>All workers must wear appropriate PPE, which includes at a minimum:</p>
      <ul class="list-disc list-inside space-y-2 my-4 pl-4">
        <li>Eye protection (safety glasses or face shields).</li>
        <li>Respiratory protection (dust masks or respirators).</li>
        <li>Hearing protection (earplugs or earmuffs).</li>
        <li>Heavy-duty gloves.</li>
        <li>Steel-toed safety boots.</li>
        <li>Visible protective clothing.</li>
      </ul>
      <img   class="my-6 rounded-lg shadow-md w-full h-auto object-cover aspect-video" alt="Worker in full PPE during concrete cutting operation" loading="lazy" src="https://images.unsplash.com/photo-1694522362256-6c907336af43" />
      <h3 class="text-xl font-semibold my-3">On-Site Safety Procedures:</h3>
      <p>In addition to PPE, the work area must be properly secured, blade guards used, adequate ventilation ensured, and operators fully trained in safe equipment use. Regular equipment checks must be performed to ensure they are in good working condition.</p>
      <p>Strict adherence to safety standards not only protects workers but also ensures smooth workflow and reduces the likelihood of costly accidents.</p>
    `,
    category_ar: 'السلامة المهنية',
    category_en: 'Occupational Safety',
    author_ar: 'إدارة السلامة',
    author_en: 'Safety Department',
    date: '2025-03-10',
    image_alt_ar: 'عامل يرتدي معدات السلامة أثناء قطع الخرسانة بمنشار',
    image_alt_en: 'Worker wearing safety gear while cutting concrete with a saw',
    image_placeholder: 'Construction worker with full safety equipment operating a concrete saw',
    tags_ar: ['سلامة الموقع', 'قطع الخرسانة', 'إدارة المخاطر', 'معدات الوقاية الشخصية'],
    tags_en: ['Site Safety', 'Concrete Cutting', 'Risk Management', 'PPE'],
    meta_description_ar: 'نظرة عامة على معايير السلامة الأساسية التي يجب اتباعها في عمليات قطع الخرسانة لضمان بيئة عمل آمنة.',
    meta_description_en: 'An overview of essential safety standards to follow in concrete cutting operations to ensure a safe working environment.',
  },
];


const ArticleDetail = () => {
  const { articleId } = useParams();
  const { t, language, direction } = useLanguage();
  const navigate = useNavigate();
  
  const article = mockArticles.find(a => a.id === articleId);

  useEffect(() => {
    if (article) {
      const articleTitle = language === 'ar' ? article.title_ar : article.title_en;
      const articleMetaDesc = language === 'ar' ? article.meta_description_ar : article.meta_description_en;
      
      document.title = `${articleTitle} - ${t('heroTitle')}`;
      
      let metaDescriptionTag = document.querySelector('meta[name="description"]');
      if (!metaDescriptionTag) {
        metaDescriptionTag = document.createElement('meta');
        metaDescriptionTag.name = "description";
        document.head.appendChild(metaDescriptionTag);
      }
      metaDescriptionTag.setAttribute('content', articleMetaDesc);

      // Structured data
      let structuredDataScript = document.getElementById('structured-data-article');
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'structured-data-article';
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleTitle,
        "image": `https://concrete-drilling-saudi.com/images/blog/${article.id}.jpg`, // Replace with actual image URL
        "author": {
          "@type": "Person",
          "name": language === 'ar' ? article.author_ar : article.author_en
        },
        "publisher": {
          "@type": "Organization",
          "name": t('heroTitle'),
          "logo": {
            "@type": "ImageObject",
            "url": "https://concrete-drilling-saudi.com/logo.png" // Replace with actual logo URL
          }
        },
        "datePublished": article.date,
        "dateModified": article.date, 
        "description": articleMetaDesc,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
      });
      
      return () => {
        // Clean up structured data on component unmount if it was added by this component
        if (structuredDataScript && structuredDataScript.id === 'structured-data-article') {
           // structuredDataScript.remove(); // Commented out to prevent removal if other pages use it.
        }
      };

    } else {
      navigate('/blog', { replace: true });
    }
  }, [article, language, t, navigate, articleId]);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{t('loadingArticle') || "جاري تحميل المقال..."}</p>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = language === 'ar' ? article.title_ar : article.title_en;

  const socialShareLinks = [
    { icon: Facebook, name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { icon: Twitter, name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}` },
    { icon: Linkedin, name: 'LinkedIn', url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}` },
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Button variant="outline" onClick={() => navigate('/blog')} className="mb-8 group border-gray-300 text-gray-600 hover:bg-gray-100 hover:border-gray-400">
            <ArrowLeft className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${direction === 'rtl' ? 'ml-2 rotate-180' : 'mr-2'}`} />
            {t('backToBlog')}
          </Button>

          <header className="mb-8">
            <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {language === 'ar' ? article.category_ar : article.category_en}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
              {language === 'ar' ? article.title_ar : article.title_en}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4 rtl:space-x-reverse">
              <div className="flex items-center">
                <User className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                <span>{language === 'ar' ? article.author_ar : article.author_en}</span>
              </div>
              <div className="flex items-center">
                <Calendar className={`w-4 h-4 ${direction === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                <time dateTime={article.date}>{new Date(article.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </div>
            </div>
          </header>

          <img  
            className="w-full h-auto md:h-[450px] object-cover rounded-xl shadow-lg mb-8 aspect-video"
            alt={language === 'ar' ? article.image_alt_ar : article.image_alt_en}
            loading="lazy"
           src="https://images.unsplash.com/photo-1688435581883-e2d8e57429b2" />

          <article 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed selection:bg-blue-100 selection:text-blue-800"
            dangerouslySetInnerHTML={{ __html: language === 'ar' ? article.content_ar : article.content_en }}
            style={{ direction: direction }}
          />

          <div className="mt-10 mb-8">
            <span className="font-semibold text-gray-700">{t('tags')}: </span>
            {(language === 'ar' ? article.tags_ar : article.tags_en).map(tag => (
              <Link 
                key={tag} 
                to={`/blog?tag=${encodeURIComponent(tag)}`} 
                className={`inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-medium text-gray-700 ${direction === 'rtl' ? 'ml-2' : 'mr-2'} mb-2 transition-colors`}
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="py-6 border-t border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-gray-700 font-semibold">
              <Share2 className={`w-5 h-5 ${direction === 'rtl' ? 'ml-2' : 'mr-2'} text-blue-600`} />
              {t('shareArticle')}
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse">
              {socialShareLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors text-gray-600 hover:text-blue-600"
                  aria-label={`${t('shareOn')} ${link.name}`}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('relatedArticles')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockArticles.filter(a => a.id !== articleId).slice(0,3).map(relatedArticle => (
                <div key={relatedArticle.id} className="bg-slate-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                  <Link to={`/blog/${relatedArticle.id}`} className="block">
                    <img   
                      className="w-full h-40 object-cover rounded mb-3 aspect-video" 
                      alt={language === 'ar' ? relatedArticle.image_alt_ar : relatedArticle.image_alt_en}
                      loading="lazy"
                     src="https://images.unsplash.com/photo-1441458834224-9b5d5a49dda3" />
                    <h3 className="text-md font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                      {language === 'ar' ? relatedArticle.title_ar : relatedArticle.title_en}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default ArticleDetail;