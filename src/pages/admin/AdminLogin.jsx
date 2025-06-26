import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { LogIn, Building2 } from 'lucide-react';

const AdminLogin = () => {
  const { t, language, direction } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = `${t('adminLoginTitle', { ns: 'admin' })} - ${t('adminPanelTitle', { ns: 'admin' })}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('adminLoginMetaDesc', { ns: 'admin' }));
    }
  }, [t, language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // IMPORTANT: This is a MOCK authentication. 
    // In a real application, NEVER store passwords like this or authenticate on the client-side.
    // This should be replaced with a secure call to a backend (e.g., Supabase Auth).
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('adminToken', 'mock_admin_token_12345'); // Mock token
      localStorage.setItem('adminUser', JSON.stringify({ email: 'admin@example.com', name: 'Admin User', role: 'administrator' }));
      toast({
        title: t('loginSuccessTitle', { ns: 'admin' }),
        description: t('loginSuccessDesc', { ns: 'admin' }),
        variant: "default",
        className: "bg-green-500 text-white"
      });
      navigate('/admin/dashboard/overview');
    } else {
      toast({
        title: t('loginFailedTitle', { ns: 'admin' }),
        description: t('loginFailedDesc', { ns: 'admin' }),
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl"
      >
        <div className="text-center">
          <Building2 className="mx-auto h-12 w-auto text-blue-600" />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            {t('adminLoginWelcome', { ns: 'admin' })}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t('adminLoginSubtext', { ns: 'admin' })}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label htmlFor="email-address">{t('emailLabel', { ns: 'admin' })}</Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder={t('emailPlaceholder', { ns: 'admin' })}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pt-4">
              <Label htmlFor="password">{t('passwordLabel', { ns: 'admin' })}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1"
                placeholder={t('passwordPlaceholder', { ns: 'admin' })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <LogIn className={`h-5 w-5 text-blue-300 group-hover:text-blue-200 ${direction === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              )}
              {isLoading ? t('loggingIn', {ns: 'admin'}) : t('loginButton', { ns: 'admin' })}
            </Button>
          </div>
        </form>
        <p className="mt-2 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {t('heroTitle')} - {t('allRightsReserved')}
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;