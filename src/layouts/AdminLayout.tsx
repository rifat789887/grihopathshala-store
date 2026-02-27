import { Outlet, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, CheckSquare, Settings, LogOut, Home, Menu, X } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminLayout() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Protect the admin route
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, send to normal dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link to="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <Package className="h-4 w-4" /> Products
      </Link>
      <Link to="/admin/bundles" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <Package className="h-4 w-4" /> Bundles
      </Link>
      <Link to="/admin/approvals" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <CheckSquare className="h-4 w-4" /> Approvals
      </Link>
      <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <Users className="h-4 w-4" /> Users
      </Link>
      <Link to="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-800 hover:text-white transition-colors">
        <Settings className="h-4 w-4" /> Settings
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-300">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="font-serif font-bold text-lg text-white">Grihopathshala Store Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-emerald-400 hover:bg-emerald-900/30 hover:text-emerald-300 transition-colors">
            <Home className="h-4 w-4" /> View Store
          </Link>
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-red-900/50 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-slate-900 relative">
        <header className="h-16 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6">
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="font-serif font-bold text-lg text-white">Admin Panel</span>
          </div>
          <div className="hidden md:block"></div>
          
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden mr-2 p-2 text-emerald-400 bg-emerald-900/30 rounded-full">
              <Home className="h-5 w-5" />
            </Link>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white leading-none">Admin</p>
              <p className="text-xs text-slate-400 mt-1">{user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-900 flex items-center justify-center text-brand-400 border border-brand-800">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </header>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 right-0 bg-slate-950 border-b border-slate-800 z-50 md:hidden shadow-2xl"
            >
              <nav className="p-4 space-y-1">
                <NavLinks />
                <div className="h-px bg-slate-800 my-2"></div>
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-red-400 hover:bg-red-900/50 transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
