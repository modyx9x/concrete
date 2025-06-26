import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LayoutDashboard, FileText, Users, BarChart2, Settings as SettingsIcon, LogOut, Menu, X, ChevronsLeft, ChevronsRight, Sun, Moon, Globe as GlobeIcon, Briefcase, MessageSquare as MessageSquareText, SlidersHorizontal, Inbox, Package, Newspaper } from 'lucide-react';

const AdminSidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const { t, direction } = useLanguage();
  const location = useLocation();

  const navItems = [
    { name: t('dashboardOverviewTitle', { ns: 'admin' }), icon: LayoutDashboard, path: 'overview' },
    { name: t('contentManagementTitle', { ns: 'admin' }), icon: FileText, path: 'content' },
    { name: t('serviceManagementTitle', { ns: 'admin' }), icon: Package, path: 'services' },
    { name: t('articleManagementTitle', { ns: 'admin' }), icon: Newspaper, path: 'articles' },
    { name: t('projectManagementTitle', { ns: 'admin' }), icon: Briefcase, path: 'projects' },
    { name: t('testimonialManagementTitle', { ns: 'admin' }), icon: MessageSquareText, path: 'testimonials' },
    { name: t('userManagementTitle', { ns: 'admin' }), icon: Users, path: 'users' },
    { name: t('formSubmissionsTitle', { ns: 'admin' }), icon: Inbox, path: 'submissions' },
    { name: t('analyticsTitle', { ns: 'admin' }), icon: BarChart2, path: 'analytics' },
    { name: t('siteSettingsTitle', { ns: 'admin' }), icon: SlidersHorizontal, path: 'site-settings' },
    { name: t('settingsTitle', { ns: 'admin' }), icon: SettingsIcon, path: 'settings' },
  ];

  const sidebarVariants = {
    open: { width: isMobile ? "80%" : 280, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: isMobile ? 0 : 70, x: isMobile && direction === 'rtl' ? "100%" : isMobile && direction === 'ltr' ? "-100%" : 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };
  
  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { delay: 0.2 } },
    closed: { opacity: 0, x: -20 },
  };

  const iconVariants = {
     open: { rotate: 0 },
     closed: { rotate: 0 }
  };

  return (
    <>
    {isMobile && isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar}></div>}
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`fixed ${direction === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} top-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 text-slate-100 shadow-lg z-40 flex flex-col print:hidden`}
    >
      <div className={`flex items-center justify-between p-4 h-16 border-b border-slate-700 ${!isOpen && !isMobile ? 'justify-center' : ''}`}>
        { (isOpen || isMobile) && 
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <motion.img src="/favicon.ico" alt={t('companyLogoAlt', {ns:'admin'})} className="h-8 w-auto" variants={itemVariants} />
            <motion.h1 variants={itemVariants} className="text-xl font-semibold whitespace-nowrap">{t('adminPanelTitle', { ns: 'admin' })}</motion.h1>
          </Link>
        }
        { !isMobile && 
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-300 hover:text-white hover:bg-slate-700">
            {isOpen ? (direction === 'rtl' ? <ChevronsRight /> : <ChevronsLeft />) : (direction === 'rtl' ? <ChevronsLeft /> : <ChevronsRight />)}
            <span className="sr-only">{isOpen ? t('collapseSidebar', {ns: 'admin'}) : t('expandSidebar', {ns: 'admin'})}</span>
          </Button>
        }
      </div>
      <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(`/admin/dashboard/${item.path}`);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-slate-700 transition-colors duration-200 ${!isOpen && !isMobile ? 'justify-center' : ''} ${isActive ? 'bg-slate-700' : ''}`}
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <motion.div variants={iconVariants}>
                <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'} group-hover:text-slate-200`} />
              </motion.div>
              <AnimatePresence>
              {(isOpen || isMobile) && <motion.span variants={itemVariants} className={`text-sm font-medium whitespace-nowrap ${isActive ? 'text-white' : ''}`}>{item.name}</motion.span>}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>
      {(isOpen || isMobile) && 
        <motion.div variants={itemVariants} className="p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">© {new Date().getFullYear()} {t('heroTitle')}</p>
        </motion.div>
      }
    </motion.aside>
    </>
  );
};

const AdminHeader = ({ toggleSidebar, isSidebarOpenOnMobile }) => {
  const { t, language, toggleLanguage, direction } = useLanguage();
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user) setAdminUser(user);
    
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDarkTheme(currentTheme === 'dark');
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme ? 'dark' : 'light';
    setIsDarkTheme(!isDarkTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className={`sticky top-0 ${direction === 'rtl' ? 'md:mr-[70px]' : 'md:ml-[70px]'} flex items-center justify-between h-16 px-6 bg-white dark:bg-slate-800 border-b dark:border-slate-700 shadow-sm z-20 print:hidden`}>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden text-gray-600 dark:text-slate-300">
          {isSidebarOpenOnMobile ? <X /> : <Menu />}
          <span className="sr-only">{isSidebarOpenOnMobile ? t('closeMenuLabel') : t('openMenuLabel')}</span>
        </Button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-100 hidden md:block">{t('adminPanelWelcome', { ns: 'admin', name: adminUser?.name || 'Admin' })}</h2>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">
          {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">{isDarkTheme ? t('switchToLightMode', {ns:'admin'}) : t('switchToDarkMode', {ns:'admin'})}</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleLanguage} className="text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">
          <GlobeIcon className="h-5 w-5" />
          <span className="sr-only">{t('toggleLanguageLabel')}</span>
        </Button>

        <DropdownMenu dir={direction}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={adminUser?.avatar || `https://avatar.vercel.sh/${adminUser?.email}.png`} alt={adminUser?.name || 'Admin Avatar'} />
                <AvatarFallback>{adminUser?.name?.[0]?.toUpperCase() || 'A'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align={direction === 'rtl' ? "start" : "end"} forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{adminUser?.name || 'Admin'}</p>
                <p className="text-xs leading-none text-muted-foreground">{adminUser?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="settings" className="w-full flex items-center">
                <SettingsIcon className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('settingsTitle', { ns: 'admin' })}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/50 focus:text-red-700 dark:focus:text-red-300">
              <LogOut className={`h-4 w-4 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t('logoutButton', { ns: 'admin' })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};


const AdminDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { direction } = useLanguage();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if(!mobile) setIsSidebarOpen(true); 
      else setIsSidebarOpen(false); 
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const mainContentMarginClass = () => {
    if (isMobile) return 'mr-0 ml-0'; 
    if(isSidebarOpen) return direction === 'rtl' ? 'mr-[280px]' : 'ml-[280px]';
    return direction === 'rtl' ? 'mr-[70px]' : 'ml-[70px]';
  }
  
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${mainContentMarginClass()}`}>
        <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpenOnMobile={isMobile && isSidebarOpen}/>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;