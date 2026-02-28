import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { BundleProvider } from './contexts/BundleContext';
import { CourseProvider } from './contexts/CourseContext';
import { PdfProvider } from './contexts/PdfContext';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Bundles } from './pages/Bundles';
import { Login } from './pages/Login';
import { About } from './pages/About';
import { Purchases } from './pages/dashboard/Purchases';
import { MyCourses } from './pages/dashboard/MyCourses';
import { MyPdfs } from './pages/dashboard/MyPdfs';
import { PdfReader } from './pages/dashboard/PdfReader';
import { CoursePlayer } from './pages/dashboard/CoursePlayer';
import { Settings as DashboardSettings } from './pages/dashboard/Settings';
import { Approvals } from './pages/admin/Approvals';
import { Products as AdminProducts } from './pages/admin/Products';
import { Bundles as AdminBundles } from './pages/admin/Bundles';
import { Users as AdminUsers } from './pages/admin/Users';
import { Settings as AdminSettings } from './pages/admin/Settings';
import { Overview as AdminOverview } from './pages/admin/Overview';
import { AdminCourses } from './pages/admin/AdminCourses';
import { AdminEnrollments } from './pages/admin/AdminEnrollments';
import { AdminPdfs } from './pages/admin/AdminPdfs';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BundleProvider>
          <CourseProvider>
            <PdfProvider>
              <LanguageProvider>
                <BrowserRouter>
                  <PWAInstallPrompt />
                  <Routes>
                  {/* Public Routes */}
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetails />} />
                    <Route path="/bundles" element={<Bundles />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                  </Route>

                  {/* Buyer Dashboard Routes */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={
                      <div className="max-w-5xl mx-auto space-y-6">
                        <div>
                          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                          <p className="text-slate-600">Welcome back! Here is a summary of your account.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Purchases</h3>
                            <p className="text-3xl font-bold text-brand-600">2</p>
                          </div>
                          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Pending Approvals</h3>
                            <p className="text-3xl font-bold text-amber-500">1</p>
                          </div>
                          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Account Status</h3>
                            <p className="text-xl font-bold text-emerald-500 mt-2">Active</p>
                          </div>
                        </div>
                      </div>
                    } />
                    <Route path="purchases" element={<Purchases />} />
                    <Route path="courses" element={<MyCourses />} />
                    <Route path="pdfs" element={<MyPdfs />} />
                    <Route path="pdfs/:pdfId" element={<PdfReader />} />
                    <Route path="courses/:courseId" element={<CoursePlayer />} />
                    <Route path="settings" element={<DashboardSettings />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="bundles" element={<AdminBundles />} />
                    <Route path="courses" element={<AdminCourses />} />
                    <Route path="enrollments" element={<AdminEnrollments />} />
                    <Route path="pdfs" element={<AdminPdfs />} />
                    <Route path="approvals" element={<Approvals />} />
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </LanguageProvider>
            </PdfProvider>
          </CourseProvider>
        </BundleProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
