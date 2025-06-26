import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const Projects = lazy(() => import('@/pages/Projects'));
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const AdminLogin = lazy(() => import('@/pages/admin/AdminLogin'));
const AdminDashboardLayout = lazy(() => import('@/pages/admin/AdminDashboardLayout'));
const DashboardOverview = lazy(() => import('@/pages/admin/DashboardOverview'));
const ContentManagement = lazy(() => import('@/pages/admin/ContentManagement'));
const ServiceManagement = lazy(() => import('@/pages/admin/ServiceManagement'));
const ArticleManagement = lazy(() => import('@/pages/admin/ArticleManagement'));
const UserManagement = lazy(() => import('@/pages/admin/UserManagement'));
const Analytics = lazy(() => import('@/pages/admin/Analytics'));
const Settings = lazy(() => import('@/pages/admin/Settings')); 
const AddItem = lazy(() => import('@/pages/admin/AddItem'));
const EditItem = lazy(() => import('@/pages/admin/EditItem'));
const ProjectManagement = lazy(() => import('@/pages/admin/ProjectManagement'));
const TestimonialManagement = lazy(() => import('@/pages/admin/TestimonialManagement'));
const SiteSettings = lazy(() => import('@/pages/admin/SiteSettings'));
const FormSubmissions = lazy(() => import('@/pages/admin/FormSubmissions'));


const PageWrapper = ({ children, isAdminRoute }) => {
  const location = useLocation();
  const { language, t } = useLanguage();

  useEffect(() => {
    let pageTitle = t('heroTitle'); 
    let metaDescriptionContent = t('metaDescription');
    const currentPath = location.pathname;
    const queryParams = new URLSearchParams(location.search);
    const itemType = queryParams.get('type');
    const itemId = currentPath.split('/').pop();


    if (isAdminRoute) {
      if (currentPath.startsWith('/admin/login')) {
        pageTitle = `${t('adminLoginTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
        metaDescriptionContent = t('adminLoginMetaDesc', {ns: 'admin'});
      } else if (currentPath.startsWith('/admin/dashboard/services/add')) {
        pageTitle = `${t('addNewService', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.match(/^\/admin\/dashboard\/services\/edit\/\w+$/)) {
        pageTitle = `${t('editService', {ns: 'admin'})}: ${itemId} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/articles/add')) {
        pageTitle = `${t('addNewArticle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.match(/^\/admin\/dashboard\/articles\/edit\/\w+$/)) {
        pageTitle = `${t('editArticle', {ns: 'admin'})}: ${itemId} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/content/add')) {
        if (itemType === 'project') pageTitle = `${t('addNewProject', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
        else if (itemType === 'testimonial') pageTitle = `${t('addNewTestimonial', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
        else pageTitle = `${t('addNewContent', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.match(/^\/admin\/dashboard\/content\/edit\/\w+$/) || currentPath.match(/^\/admin\/dashboard\/projects\/edit\/\w+$/) || currentPath.match(/^\/admin\/dashboard\/testimonials\/edit\/\w+$/)) {
         if (itemType === 'project') pageTitle = `${t('editProject', {ns: 'admin'})}: ${itemId} - ${t('adminPanelTitle', {ns: 'admin'})}`;
         else if (itemType === 'testimonial') pageTitle = `${t('editTestimonial', {ns: 'admin'})}: ${itemId} - ${t('adminPanelTitle', {ns: 'admin'})}`;
         else pageTitle = `${t('editContent', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/users/add')) {
        pageTitle = `${t('addNewUser', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.match(/^\/admin\/dashboard\/users\/edit\/\w+$/)) {
        pageTitle = `${t('editUser', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/services')) {
        pageTitle = `${t('serviceManagementTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/articles')) {
        pageTitle = `${t('articleManagementTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/projects')) {
        pageTitle = `${t('projectManagementTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/testimonials')) {
        pageTitle = `${t('testimonialManagementTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/site-settings')) {
        pageTitle = `${t('siteSettingsTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard/submissions')) {
        pageTitle = `${t('formSubmissionsTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
      } else if (currentPath.startsWith('/admin/dashboard')) {
        pageTitle = `${t('dashboardOverviewTitle', {ns: 'admin'})} - ${t('adminPanelTitle', {ns: 'admin'})}`;
        metaDescriptionContent = t('dashboardOverviewMetaDesc', {ns: 'admin'});
      }
    } else {
      if (currentPath === '/') {
        pageTitle = `${t('home')} - ${t('heroTitle')}`;
      } else if (currentPath.startsWith('/about')) {
        pageTitle = `${t('about')} - ${t('heroTitle')}`;
        metaDescriptionContent = t('aboutMetaDescription') || metaDescriptionContent;
      } else if (currentPath.startsWith('/services')) {
        pageTitle = `${t('services')} - ${t('heroTitle')}`;
        metaDescriptionContent = t('servicesMetaDescription') || metaDescriptionContent;
      } else if (currentPath.startsWith('/projects')) {
        pageTitle = `${t('projects')} - ${t('heroTitle')}`;
        metaDescriptionContent = t('projectsMetaDescription') || metaDescriptionContent;
      } else if (currentPath.startsWith('/contact')) {
        pageTitle = `${t('contact')} - ${t('heroTitle')}`;
        metaDescriptionContent = t('contactMetaDescription') || metaDescriptionContent;
      } else if (currentPath.startsWith('/blog') && !currentPath.includes('/blog/')) {
        pageTitle = `${t('blog')} - ${t('heroTitle')}`;
        metaDescriptionContent = t('blogMetaDescription') || metaDescriptionContent;
      }
    }
    
    document.title = pageTitle;
    
    const metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', metaDescriptionContent);
    }

    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

  }, [location, language, t, isAdminRoute]);

  return <>{children}</>;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken'); 
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const location = useLocation(); 
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <PageWrapper isAdminRoute={isAdminRoute}>
      <div className={`min-h-screen flex flex-col ${isAdminRoute ? 'bg-slate-100 dark:bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'}`}>
        {!isAdminRoute && <Navbar />}
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:articleId" element={<ArticleDetail />} />
              
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="content/add" element={<AddItem />} />
                <Route path="content/edit/:itemId" element={<EditItem />} />
                <Route path="services" element={<ServiceManagement />} />
                <Route path="services/add" element={<AddItem itemType="service" />} />
                <Route path="services/edit/:itemId" element={<EditItem itemType="service" />} />
                <Route path="articles" element={<ArticleManagement />} />
                <Route path="articles/add" element={<AddItem itemType="article" />} />
                <Route path="articles/edit/:itemId" element={<EditItem itemType="article" />} />
                <Route path="projects" element={<ProjectManagement />} />
                <Route path="projects/add" element={<AddItem itemType="project" />} />
                <Route path="projects/edit/:itemId" element={<EditItem itemType="project" />} />
                <Route path="testimonials" element={<TestimonialManagement />} />
                <Route path="testimonials/add" element={<AddItem itemType="testimonial" />} />
                <Route path="testimonials/edit/:itemId" element={<EditItem itemType="testimonial" />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="users/add" element={<AddItem itemType="user" />} />
                <Route path="users/edit/:userId" element={<EditItem itemType="user" />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="site-settings" element={<SiteSettings />} />
                <Route path="submissions" element={<FormSubmissions />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Suspense>
        </main>
        {!isAdminRoute && <Footer />}
        <Toaster />
      </div>
    </PageWrapper>
  );
}

function AppWrapper() {
  return (
    <LanguageProvider>
      <Router>
        <App />
      </Router>
    </LanguageProvider>
  )
}

export default AppWrapper;