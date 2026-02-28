import { useState } from 'react';
import { Outlet, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut, User, Menu, X, Home } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';

export function DashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Protect the dashboard route
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const NavLinks = () => (
    <>
      <Link 
        to="/" 
        onClick={() => setIsMobileMenuOpen(false)}
        className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      >
        <Home className="h-4 w-4" /> Go to Home
      </Link>
      <Link 
        to="/dashboard" 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${location.pathname === '/dashboard' ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
      >
        <LayoutDashboard className="h-4 w-4" /> Overview
      </Link>
      <Link 
        to="/dashboard/courses" 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${location.pathname.includes('/dashboard/courses') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
      >
        <Package className="h-4 w-4" /> My Courses
      </Link>
      <Link 
        to="/dashboard/purchases" 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${location.pathname.includes('/dashboard/purchases') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
      >
        <Package className="h-4 w-4" /> My Purchases
      </Link>
      <Link 
        to="/dashboard/settings" 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${location.pathname.includes('/dashboard/settings') ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
      >
        <Settings className="h-4 w-4" /> Settings
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 border-r border-slate-200 bg-white flex flex-col z-50 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <Link to="/" className="font-serif font-bold text-lg text-slate-900">Grihopathshala</Link>
          <button className="md:hidden text-slate-500 hover:text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <NavLinks />
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-serif font-bold text-lg md:hidden">Dashboard</span>
          </div>
          
          {/* User Profile Header */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 leading-none">{user.user_metadata?.full_name || 'Student'}</p>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 border border-brand-200 shrink-0">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
