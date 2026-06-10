import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LandingPage } from './pages/LandingPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BranchesPage } from './pages/BranchesPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Helper component to restore scroll positions upon navigating to new routes
const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Only scroll to top if the page path changes
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      {/* Dynamic Scroll Restorer */}
      <ScrollToTop />

      {/* Main E-commerce Layout Viewport */}
      <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#1A1A1A] antialiased selection:bg-orange-500 selection:text-white">
        
        {/* Global Navigation Header */}
        <Navbar />

        {/* Dynamic sliding shopping cart sidebar */}
        <CartDrawer />

        {/* Router View Port container */}
        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/catalogo/:id" element={<ProductDetailPage />} />
            <Route path="/sucursales" element={<BranchesPage />} />

            {/* Auth Protected router groups */}
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/perfil" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* Fallback routing */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>

        {/* Global Footer details */}
        <Footer />

      </div>
    </BrowserRouter>
  );
}
