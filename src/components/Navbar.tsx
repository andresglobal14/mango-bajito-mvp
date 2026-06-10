import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { ShoppingCart, Menu, X, MapPin, Tag, User, LogOut, Store } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setIsOpen, getTotalItems } = useCartStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const activeClassName = "text-mango-dark font-extrabold border-b-2 border-mango-secondary pb-1 transition-all duration-150";
  const inactiveClassName = "text-slate-500 hover:text-mango-dark font-medium transition-colors duration-150";

  return (
    <header className="sticky top-0 bg-white border-b border-gray-100 z-40 shadow-xs">
      {/* Top Banner (Retail Accent) */}
      <div className="bg-mango-primary text-white text-center py-1.5 px-4 text-xs font-semibold tracking-wide flex justify-center items-center gap-1.5 font-display md:text-sm">
        <Tag className="h-3 w-3 animate-pulse" /> 
        <span>¡Tan barato como Mango Bajito! Ofertas especiales de temporada disponibles</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand/Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-mango-primary leading-none">
                MANGO BAJITO
              </span>
              <span className="text-[10px] font-bold text-mango-green tracking-widest uppercase mt-0.5">
                Venezuela • MVP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
              Inicio
            </NavLink>
            <NavLink to="/catalogo" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
              Catálogo
            </NavLink>
            <NavLink to="/sucursales" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
              Sucursales
            </NavLink>
          </nav>

          {/* Right Area (Cart & Auth) */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Branches Locator Indicator Quick Link */}
            <Link to="/sucursales" className="text-gray-500 hover:text-mango-primary flex items-center gap-1 text-sm border-r border-gray-200 pr-4 transition-colors">
              <MapPin className="h-4 w-4 text-mango-primary" />
              <span>Sucursales</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              id="navbar-cart-trigger"
              onClick={handleCartClick}
              className="relative p-2.5 text-gray-600 hover:bg-orange-50 hover:text-mango-primary rounded-xl transition duration-150 cursor-pointer flex items-center justify-center"
              aria-label="Ver Carrito"
            >
              <ShoppingCart className="h-5.5 w-5.5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[10px] rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-red-100">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Auth Indicator */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 pl-2 text-sm text-gray-700 hover:text-mango-primary font-semibold border-l border-gray-200"
                >
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-mango-primary font-bold">
                    {user?.name.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                </Link>
                <button
                  id="navbar-logout-btn"
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition duration-150 cursor-pointer"
                  title="Salir de la sesión"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold text-white bg-mango-primary hover:bg-orange-600 rounded-xl transition duration-150 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>Ingresar</span>
              </Link>
            )}
          </div>

          {/* Mobile Actions and Burger */}
          <div className="flex items-center md:hidden gap-3">
            {/* Mobile Shopping Cart Trigger */}
            <button
              id="navbar-cart-trigger-mobile"
              onClick={handleCartClick}
              className="relative p-2.5 text-gray-600 hover:bg-orange-50 rounded-xl cursor-pointer"
              aria-label="Ver Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-extrabold text-[10px] rounded-full h-4.5 w-4.5 flex items-center justify-center border-2 border-white shadow-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-base font-semibold ${isActive ? 'bg-orange-50 text-mango-primary' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-base font-semibold ${isActive ? 'bg-orange-50 text-mango-primary' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Catálogo de Productos
          </NavLink>
          <NavLink
            to="/sucursales"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-base font-semibold ${isActive ? 'bg-orange-50 text-mango-primary' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            Nuestras Sucursales
          </NavLink>

          {/* Protected Links in Mobile */}
          {isAuthenticated ? (
            <>
              <div className="border-t border-gray-100 my-2 pt-2">
                <div className="px-3 py-2 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-mango-primary font-bold">
                    {user?.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm leading-none">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate leading-none mt-1">{user?.email}</p>
                  </div>
                </div>
              </div>
              <NavLink
                to="/perfil"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg text-base font-semibold ${isActive ? 'bg-orange-50 text-mango-primary' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                Mi Perfil de Usuario
              </NavLink>
              <button
                id="mobile-logout-btn"
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <div className="border-t border-gray-100 my-2 pt-4">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-4 py-3 bg-mango-primary hover:bg-orange-600 text-white rounded-xl font-bold transition shadow-xs cursor-pointer"
              >
                Ingresar a mi Cuenta
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
