import { Outlet, Link, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';

export function DashboardLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Protect the dashboard route
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link to="/" className="font-serif font-bold text-lg text-slate-900">Grihopathshala Store</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-brand-50 text-brand-700">
            <LayoutDashboard className="h-4 w-4" /> Overview
          </Link>
          <Link to="/dashboard/purchases" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Package className="h-4 w-4" /> My Purchases
          </Link>
          <Link to="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            <Settings className="h-4 w-4" /> Settings
          </Link>
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
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <span className="font-serif font-bold text-lg md:hidden">Dashboard</span>
          <div className="hidden md:block"></div> {/* Spacer for desktop */}
          
          {/* User Profile Header */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900 leading-none">{user.user_metadata?.full_name || 'Student'}</p>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 border border-brand-200">
              <User className="h-5 w-5" />
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
