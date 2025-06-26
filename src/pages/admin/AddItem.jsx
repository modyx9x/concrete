import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, FilePlus, UserPlus as UserPlusIcon, Package, Newspaper, Briefcase, MessageSquare as MessageSquareText } from 'lucide-react';

const AddItem = () => {
  const { t, language, direction } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const queryParams = new URLSearchParams(location.search);
  const itemTypeFromQuery = queryParams.get('type') || 'content';
  const [itemType, setItemType] = useState(itemTypeFromQuery);

  const [formData, setFormData] = useState({});

  let pageTitle, itemIcon;

  if (itemType === 'user') {
    pageTitle = t('addNewUser', { ns: 'admin' });
    itemIcon = <UserPlusIcon className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-green-600`} />;
  } else if (itemType === 'service') {
    pageTitle = t('addNewService', { ns: 'admin' });
    itemIcon = <Package className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-indigo-600`} />;
  } else if (itemType === 'article') {
    pageTitle = t('addNewArticle', { ns: 'admin' });
    itemIcon = <Newspaper className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-orange-600`} />;
  } else if (itemType === 'project') {
    pageTitle = t('addNewProject', { ns: 'admin' });
    itemIcon = <Briefcase className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-cyan-600`} />;
  } else if (itemType === 'testimonial') {
    pageTitle = t('addNewTestimonial', { ns: 'admin' });
    itemIcon = <MessageSquareText className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-pink-600`} />;
  } else { 
    pageTitle = t('addNewContent', { ns: 'admin' });
    itemIcon = <FilePlus className={`h-6 w-6 ${direction === 'rtl' ? 'ml-3' : 'mr-3'} text-blue-600`} />;
  }
  
  useEffect(() => {
    const typeFromQuery = queryParams.get('type') || 'content';
    setItemType(typeFromQuery);
  }, [location.search]);


  useEffect(() => {
    document.title = `${pageTitle} - ${t('adminPanelTitle', { ns: 'admin' })}`;
  }, [t, language, pageTitle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0].name, [`${name}File`]: files[0] }));
      toast({
        title: t('imageSelected', {ns: 'admin'}),
        description: t('imageSelectedDesc', {ns: 'admin', fileName: files[0].name}),
      });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 " + t('featureNotImplementedTitle', { ns: 'admin' }),
      description: t('addItemNotImplemented', { ns: 'admin', itemType: t(itemType, {ns: 'admin'}) }),
      variant: "default",
      className: "bg-yellow-500 text-white"
    });
    console.log("Form data for new item:", formData);
  };

  const renderGeneralContentFields = () => (
    <>
      <div>
        <Label htmlFor="title" className="dark:text-slate-300">{t('contentTitle', { ns: 'admin' })}</Label>
        <Input id="title" name="title" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterContentTitle', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="contentType" className="dark:text-slate-300">{t('contentType', { ns: 'admin' })}</Label>
         <Select name="contentType" onValueChange={(value) => handleSelectChange('contentType', value)}>
          <SelectTrigger className="w-full mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
            <SelectValue placeholder={t('selectContentType', {ns: 'admin'})} />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-700 dark:text-slate-100">
            <SelectItem value="page">{t('page', { ns: 'admin' })}</SelectItem>
            <SelectItem value="blogPost">{t('blogPost', { ns: 'admin' })}</SelectItem>
            <SelectItem value="service">{t('service', { ns: 'admin' })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="contentBody" className="dark:text-slate-300">{t('contentBody', { ns: 'admin' })}</Label>
        <Textarea id="contentBody" name="contentBody" rows={10} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterContentBody', {ns: 'admin'})} required />
      </div>
    </>
  );

  const renderArticleFields = () => (
    <>
      <div>
        <Label htmlFor="articleTitleAr" className="dark:text-slate-300">{t('articleTitle', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="articleTitleAr" name="articleTitleAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleTitleAr', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="articleTitleEn" className="dark:text-slate-300">{t('articleTitle', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="articleTitleEn" name="articleTitleEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleTitleEn', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="articleSlug" className="dark:text-slate-300">{t('articleSlug', { ns: 'admin' })}</Label>
        <Input id="articleSlug" name="articleSlug" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder="example-article-slug" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('articleSlugDesc', { ns: 'admin' })}</p>
      </div>
      <div>
        <Label htmlFor="articleExcerptAr" className="dark:text-slate-300">{t('articleExcerpt', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="articleExcerptAr" name="articleExcerptAr" rows={3} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleExcerptAr', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="articleExcerptEn" className="dark:text-slate-300">{t('articleExcerpt', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="articleExcerptEn" name="articleExcerptEn" rows={3} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleExcerptEn', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="articleContentAr" className="dark:text-slate-300">{t('articleContent', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="articleContentAr" name="articleContentAr" rows={10} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleContentAr', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="articleContentEn" className="dark:text-slate-300">{t('articleContent', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="articleContentEn" name="articleContentEn" rows={10} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterArticleContentEn', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="articleImage" className="dark:text-slate-300">{t('articleImage', { ns: 'admin' })}</Label>
        <Input id="articleImage" name="articleImage" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-600 dark:file:text-slate-200 dark:hover:file:bg-slate-500" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('imageUploadDesc', { ns: 'admin' })}</p>
      </div>
       <div>
        <Label htmlFor="articleImageAltAr" className="dark:text-slate-300">{t('imageAltText', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="articleImageAltAr" name="articleImageAltAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterImageAltAr', { ns: 'admin' })} />
      </div>
       <div>
        <Label htmlFor="articleImageAltEn" className="dark:text-slate-300">{t('imageAltText', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="articleImageAltEn" name="articleImageAltEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterImageAltEn', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="articleMetaDescriptionAr" className="dark:text-slate-300">{t('metaDescription', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="articleMetaDescriptionAr" name="articleMetaDescriptionAr" rows={2} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterMetaDescriptionAr', {ns: 'admin'})} />
      </div>
      <div>
        <Label htmlFor="articleMetaDescriptionEn" className="dark:text-slate-300">{t('metaDescription', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="articleMetaDescriptionEn" name="articleMetaDescriptionEn" rows={2} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterMetaDescriptionEn', {ns: 'admin'})} />
      </div>
      <div>
        <Label htmlFor="articleTagsAr" className="dark:text-slate-300">{t('tags', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="articleTagsAr" name="articleTagsAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterTagsAr', { ns: 'admin' })} />
         <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('tagsDesc', { ns: 'admin' })}</p>
      </div>
      <div>
        <Label htmlFor="articleTagsEn" className="dark:text-slate-300">{t('tags', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="articleTagsEn" name="articleTagsEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterTagsEn', { ns: 'admin' })} />
      </div>
    </>
  );
  
  const renderServiceFields = () => (
    <>
      <div>
        <Label htmlFor="serviceTitleAr" className="dark:text-slate-300">{t('serviceName', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="serviceTitleAr" name="serviceTitleAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterServiceNameAr', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="serviceTitleEn" className="dark:text-slate-300">{t('serviceName', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="serviceTitleEn" name="serviceTitleEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterServiceNameEn', { ns: 'admin' })} required />
      </div>
       <div>
        <Label htmlFor="serviceDescriptionAr" className="dark:text-slate-300">{t('serviceDescription', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="serviceDescriptionAr" name="serviceDescriptionAr" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterServiceDescriptionAr', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="serviceDescriptionEn" className="dark:text-slate-300">{t('serviceDescription', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="serviceDescriptionEn" name="serviceDescriptionEn" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterServiceDescriptionEn', {ns: 'admin'})} required />
      </div>
       <div>
        <Label htmlFor="serviceIcon" className="dark:text-slate-300">{t('serviceIcon', { ns: 'admin' })} (Lucide Icon Name)</Label>
        <Input id="serviceIcon" name="serviceIcon" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder="e.g. Hammer, Drill, Cog" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('lucideIconHelp', { ns: 'admin' })} <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{t('lucideIconsLink', {ns: 'admin'})}</a>.</p>
      </div>
      <div>
        <Label htmlFor="serviceImage" className="dark:text-slate-300">{t('serviceImage', { ns: 'admin' })}</Label>
        <Input id="serviceImage" name="serviceImage" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-slate-600 dark:file:text-slate-200 dark:hover:file:bg-slate-500" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('imageUploadDesc', { ns: 'admin' })}</p>
      </div>
       <div>
        <Label htmlFor="serviceImageAltAr" className="dark:text-slate-300">{t('imageAltText', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="serviceImageAltAr" name="serviceImageAltAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterImageAltAr', { ns: 'admin' })} />
      </div>
       <div>
        <Label htmlFor="serviceImageAltEn" className="dark:text-slate-300">{t('imageAltText', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="serviceImageAltEn" name="serviceImageAltEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterImageAltEn', { ns: 'admin' })} />
      </div>
    </>
  );

  const renderProjectFields = () => (
    <>
      <div>
        <Label htmlFor="projectNameAr" className="dark:text-slate-300">{t('projectName', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="projectNameAr" name="projectNameAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterProjectNameAr', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="projectNameEn" className="dark:text-slate-300">{t('projectName', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="projectNameEn" name="projectNameEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterProjectNameEn', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="projectCategory" className="dark:text-slate-300">{t('projectCategory', { ns: 'admin' })}</Label>
        <Select name="projectCategory" onValueChange={(value) => handleSelectChange('projectCategory', value)}>
          <SelectTrigger className="w-full mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
            <SelectValue placeholder={t('selectProjectCategory', {ns: 'admin'})} />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-700 dark:text-slate-100">
            <SelectItem value="concrete_drilling">{t('concreteDrilling')}</SelectItem>
            <SelectItem value="concrete_cutting">{t('concreteCutting')}</SelectItem>
            <SelectItem value="wall_sawing">{t('wallSawing')}</SelectItem>
            <SelectItem value="core_drilling">{t('coreDrilling')}</SelectItem>
            <SelectItem value="demolition_services">{t('demolitionServices')}</SelectItem>
            <SelectItem value="specialized_solutions">{t('specializedSolutions')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="projectDescriptionAr" className="dark:text-slate-300">{t('projectDescription', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="projectDescriptionAr" name="projectDescriptionAr" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterProjectDescriptionAr', {ns: 'admin'})} />
      </div>
      <div>
        <Label htmlFor="projectDescriptionEn" className="dark:text-slate-300">{t('projectDescription', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="projectDescriptionEn" name="projectDescriptionEn" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterProjectDescriptionEn', {ns: 'admin'})} />
      </div>
      <div>
        <Label htmlFor="projectClient" className="dark:text-slate-300">{t('projectClient', { ns: 'admin' })}</Label>
        <Input id="projectClient" name="projectClient" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterProjectClient', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="projectDate" className="dark:text-slate-300">{t('projectDate', { ns: 'admin' })}</Label>
        <Input id="projectDate" name="projectDate" type="date" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" />
      </div>
      <div>
        <Label htmlFor="projectImage" className="dark:text-slate-300">{t('projectImage', { ns: 'admin' })}</Label>
        <Input id="projectImage" name="projectImage" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 dark:file:bg-slate-600 dark:file:text-slate-200 dark:hover:file:bg-slate-500" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('imageUploadDesc', { ns: 'admin' })}</p>
      </div>
    </>
  );

  const renderTestimonialFields = () => (
    <>
      <div>
        <Label htmlFor="testimonialAuthor" className="dark:text-slate-300">{t('testimonialAuthor', { ns: 'admin' })}</Label>
        <Input id="testimonialAuthor" name="testimonialAuthor" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterTestimonialAuthor', { ns: 'admin' })} required />
      </div>
      <div>
        <Label htmlFor="authorPositionAr" className="dark:text-slate-300">{t('authorPosition', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Input id="authorPositionAr" name="authorPositionAr" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterAuthorPositionAr', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="authorPositionEn" className="dark:text-slate-300">{t('authorPosition', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Input id="authorPositionEn" name="authorPositionEn" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterAuthorPositionEn', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="testimonialTextAr" className="dark:text-slate-300">{t('testimonialText', { ns: 'admin' })} ({t('arabic', { ns: 'admin' })})</Label>
        <Textarea id="testimonialTextAr" name="testimonialTextAr" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterTestimonialTextAr', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="testimonialTextEn" className="dark:text-slate-300">{t('testimonialText', { ns: 'admin' })} ({t('english', { ns: 'admin' })})</Label>
        <Textarea id="testimonialTextEn" name="testimonialTextEn" rows={5} onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterTestimonialTextEn', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="rating" className="dark:text-slate-300">{t('rating', { ns: 'admin' })}</Label>
        <Input id="rating" name="rating" type="number" min="1" max="5" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterRating', { ns: 'admin' })} />
      </div>
      <div>
        <Label htmlFor="authorImage" className="dark:text-slate-300">{t('authorImage', { ns: 'admin' })}</Label>
        <Input id="authorImage" name="authorImage" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 dark:file:bg-slate-600 dark:file:text-slate-200 dark:hover:file:bg-slate-500" />
        <p className="text-xs text-gray-500 mt-1 dark:text-slate-400">{t('imageUploadDesc', { ns: 'admin' })}</p>
      </div>
    </>
  );

  const renderUserFields = () => (
    <>
      <div>
        <Label htmlFor="userName" className="dark:text-slate-300">{t('userName', { ns: 'admin' })}</Label>
        <Input id="userName" name="userName" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterUserName', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="userEmail" className="dark:text-slate-300">{t('userEmail', { ns: 'admin' })}</Label>
        <Input id="userEmail" name="userEmail" type="email" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterUserEmail', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="userPassword" className="dark:text-slate-300">{t('password', { ns: 'admin' })}</Label>
        <Input id="userPassword" name="userPassword" type="password" onChange={handleInputChange} className="mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600" placeholder={t('enterUserPassword', {ns: 'admin'})} required />
      </div>
      <div>
        <Label htmlFor="userRole" className="dark:text-slate-300">{t('userRole', { ns: 'admin' })}</Label>
        <Select name="userRole" onValueChange={(value) => handleSelectChange('userRole', value)}>
          <SelectTrigger className="w-full mt-1 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600">
            <SelectValue placeholder={t('selectUserRole', {ns: 'admin'})} />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-700 dark:text-slate-100">
            <SelectItem value="administrator">{t('administrator', { ns: 'admin' })}</SelectItem>
            <SelectItem value="editor">{t('editor', { ns: 'admin' })}</SelectItem>
            <SelectItem value="viewer">{t('viewer', { ns: 'admin' })}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center">
          {itemIcon}
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">
            {pageTitle}
          </h1>
        </div>
        <Button variant="outline" onClick={() => navigate(-1)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">
          <ArrowLeft className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          {t('backToList', { ns: 'admin' })}
        </Button>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 shadow-xl rounded-lg p-6 md:p-8 space-y-6"
      >
        {itemType === 'user' && renderUserFields()}
        {itemType === 'service' && renderServiceFields()}
        {itemType === 'article' && renderArticleFields()}
        {itemType === 'project' && renderProjectFields()}
        {itemType === 'testimonial' && renderTestimonialFields()}
        {itemType === 'content' && renderGeneralContentFields()} 
        
        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="mr-2 h-5 w-5" /> {t('saveNewItem', { ns: 'admin' })}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddItem;