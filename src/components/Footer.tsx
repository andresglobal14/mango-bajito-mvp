import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Clock, Mail, Truck, ShieldCheck, HelpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mango-dark text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info Grid (Trust Banners) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-800 text-center md:text-left">
          {/* Item 1 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-mango-primary">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-100 font-display">Retiro Fácil en Tienda</h4>
              <p className="text-xs text-gray-400 mt-1">Compra online y retira gratis hoy mismo en cualquier sucursal.</p>
            </div>
          </div>
          {/* Item 2 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-mango-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-100 font-display">Precios Mango Bajito</h4>
              <p className="text-xs text-gray-400 mt-1">Garantía del precio más competitivo del mercado en toda Venezuela.</p>
            </div>
          </div>
          {/* Item 3 */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center text-mango-primary">
              <HelpCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-100 font-display">Soporte Continuo</h4>
              <p className="text-xs text-gray-400 mt-1">¿Necesitas ayuda? Chatea con nuestro equipo comercial por WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* Categories Link Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
          {/* Block 1 (Company Card) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🥭</span>
              <span className="text-lg font-extrabold text-white font-display uppercase tracking-tight">MANGO BAJITO</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              La cadena de tiendas favorita de Venezuela para el hogar, decoración, organización y cocina. Diseños modernos y calidad insuperable "tan barato como mango bajito".
            </p>
            <div className="flex gap-4 pt-2 justify-center md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-mango-primary rounded-lg transition duration-150"
                aria-label="Facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 text-gray-400 hover:text-white hover:bg-mango-primary rounded-lg transition duration-150"
                aria-label="Instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Block 2 (Quick Nav) */}
          <div>
            <h3 className="font-bold text-gray-100 font-display mb-4 text-sm tracking-widest uppercase">Enlaces</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-sans">
              <li><Link to="/" className="hover:text-mango-primary transition">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-mango-primary transition">Catálogo de Productos</Link></li>
              <li><Link to="/sucursales" className="hover:text-mango-primary transition">Nuestras Sucursales</Link></li>
              <li><Link to="/login" className="hover:text-mango-primary transition">Ingreso / Autenticación</Link></li>
              <li><Link to="/perfil" className="hover:text-mango-primary transition">Mi Cuenta (Protegido)</Link></li>
            </ul>
          </div>

          {/* Block 3 (Product Collections) */}
          <div>
            <h3 className="font-bold text-gray-100 font-display mb-4 text-sm tracking-widest uppercase">Categorías</h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-sans">
              <li><Link to="/catalogo?categoria=Cocina y Mesa" className="hover:text-mango-primary transition">Cocina y Mesa</Link></li>
              <li><Link to="/catalogo?categoria=Organización" className="hover:text-mango-primary transition">Organización Plástica</Link></li>
              <li><Link to="/catalogo?categoria=Hogar y Decoración" className="hover:text-mango-primary transition">Hogar y Decoración</Link></li>
              <li><Link to="/catalogo?categoria=Juguetería" className="hover:text-mango-primary transition">Juguetería Infantil</Link></li>
            </ul>
          </div>

          {/* Block 4 (Contact Support) */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-100 font-display text-sm tracking-widest uppercase">Atención al Cliente</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-mango-primary flex-shrink-0" />
                <span>+58 (241) 857-1122</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-mango-primary flex-shrink-0" />
                <span className="break-all">contacto@mangobajito.com.ve</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 mt-0.5 text-mango-primary flex-shrink-0" />
                <div>
                  <p>Lunes a Sábado</p>
                  <p className="text-xs text-gray-500 font-mono">8:30 AM - 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Disclaimer */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans">
          <p>© 2026 Mango Bajito Venezuela. Todos los derechos reservados.</p>
          <p className="font-mono text-gray-600">
            MVP Desarrollado en React 19 + Tailwind v4 + Zustand
          </p>
        </div>
      </div>
    </footer>
  );
};
