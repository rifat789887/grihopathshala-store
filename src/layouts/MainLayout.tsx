import { Outlet, Link, useLocation } from 'react-router-dom';
import { BookOpen, User, Globe, MessageCircle, LayoutDashboard, MoreVertical, Home, ShoppingBag, Layers } from 'lucide-react';
import { useTranslation } from '@/src/contexts/LanguageContext';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useEffect } from 'react';

export function MainLayout() {
  const { t, lang, toggleLang } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col relative pb-16 md:pb-0">
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2' 
            : 'bg-white border-b border-slate-200 py-3'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 3-dot menu for mobile */}
            <button className="md:hidden p-1 -ml-1 text-slate-600 hover:text-brand-600 transition-colors">
              <MoreVertical className="h-6 w-6" />
            </button>
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-600 p-1.5 rounded-lg group-hover:bg-brand-700 transition-colors hidden sm:block">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl md:text-2xl tracking-tight text-slate-900">
                গৃহপাঠশালা স্টোর
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">{t('nav.products')}</Link>
            <Link to="/bundles" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">{t('nav.bundles')}</Link>
            <Link to="/about" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors">{t('nav.about')}</Link>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors px-2 py-1 rounded-md hover:bg-slate-100"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{lang === 'en' ? 'BN' : 'EN'}</span>
            </button>
            
            <div className="hidden md:block">
              {user ? (
                <Link to={user.email === 'mdrifat.contact@gmail.com' ? '/admin' : '/dashboard'} className="text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors flex items-center gap-2 bg-brand-50 px-4 py-2 rounded-full hover:bg-brand-100 border border-brand-200">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{user.email === 'mdrifat.contact@gmail.com' ? 'Admin Panel' : 'Dashboard'}</span>
                </Link>
              ) : (
                <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200">
                  <User className="h-4 w-4" />
                  <span>{t('nav.signin')}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-12 mb-safe">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} গৃহপাঠশালা স্টোর. All rights reserved.</p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50 pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <Link to="/" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/') ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}>
          <Home className={`h-5 w-5 mb-1 ${isActive('/') ? 'fill-brand-50' : ''}`} />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <Link to="/products" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/products') ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}>
          <ShoppingBag className={`h-5 w-5 mb-1 ${isActive('/products') ? 'fill-brand-50' : ''}`} />
          <span className="text-[10px] font-semibold">Products</span>
        </Link>
        <Link to="/bundles" className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/bundles') ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}>
          <Layers className={`h-5 w-5 mb-1 ${isActive('/bundles') ? 'fill-brand-50' : ''}`} />
          <span className="text-[10px] font-semibold">Bundles</span>
        </Link>
        <Link to={user ? (user.email === 'mdrifat.contact@gmail.com' ? '/admin' : '/dashboard') : "/login"} className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive('/dashboard') || isActive('/admin') || isActive('/login') ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}>
          <User className={`h-5 w-5 mb-1 ${isActive('/dashboard') || isActive('/admin') || isActive('/login') ? 'fill-brand-50' : ''}`} />
          <span className="text-[10px] font-semibold">{user ? (user.email === 'mdrifat.contact@gmail.com' ? 'Admin' : 'Dashboard') : 'Account'}</span>
        </Link>
      </div>

      {/* Global Floating WhatsApp Button */}
      <a 
        href="https://wa.me/+8801300424328" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-xl shadow-emerald-500/20 hover:bg-[#20bd5a] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
}
