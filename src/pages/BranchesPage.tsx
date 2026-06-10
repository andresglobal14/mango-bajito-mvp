import React from 'react';
import { BRANCHES } from '../constants/branches';
import { BranchLocator } from '../components/BranchLocator';
import { MapPin, Phone, Clock, Store, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export const BranchesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans space-y-12">
      
      {/* Title section */}
      <div className="space-y-2 border-b border-gray-150 pb-6">
        <h1 className="text-3xl md:text-4xl font-black text-mango-dark font-display">
          Nuestras Sucursales
        </h1>
        <p className="text-sm text-gray-500">
          Operamos tiendas insignia en las principales regiones comerciales de Venezuela. Ubica tu tienda física preferida.
        </p>
      </div>

      {/* Geolocator header widget */}
      <div>
        <BranchLocator />
      </div>

      {/* Full listing card directory */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-mango-dark font-display">Directorio Oficial de Tiendas</h2>
          <p className="text-xs text-gray-400">Detalle de direcciones, datos telefónicos y enlaces satelitales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-2xl border border-slate-200/60 hover:border-mango-secondary/40 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header state/city indicators */}
                <div className="flex justify-between items-center gap-2">
                  <span className="bg-orange-100 text-mango-primary text-[10px] font-extrabold px-3 py-1 rounded-md uppercase font-mono tracking-wider">
                    {branch.state}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold font-mono">
                    <Store className="h-4 w-4 text-mango-green" />
                    <span>SUCURSAL ACTIVA</span>
                  </div>
                </div>

                {/* Name & Address */}
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-mango-dark font-display leading-tight">{branch.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">{branch.address}</p>
                </div>
              </div>

              {/* Specs listing */}
              <div className="space-y-3.5 pt-4 border-t border-gray-100/70 text-xs text-gray-600">
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4.5 w-4.5 text-mango-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-gray-800 leading-none">Horario de Atención comercial</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-normal">{branch.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4.5 w-4.5 text-mango-primary flex-shrink-0" />
                  <div>
                    <h5 className="font-bold text-gray-800 leading-none">Teléfono de contacto</h5>
                    <p className="text-gray-500 text-xs mt-1 leading-none">{branch.phone}</p>
                  </div>
                </div>
              </div>

              {/* Redirect triggers */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  id={`maps-redirect-full-btn-${branch.id}`}
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MapPin className="h-3.5 w-3.5 text-mango-primary" />
                  <span>Ubicar en Google Maps</span>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </a>
                
                <a
                  id={`whatsapp-contact-${branch.id}`}
                  href={`https://wa.me/58${branch.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-805 font-bold text-xs rounded-xl transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Chatear por Whatsapp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support help card */}
      <section className="bg-white border border-slate-200/60 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-bold font-display text-mango-dark">¿Tienes inconvenientes con un retiro presencial?</h3>
          <p className="text-xs sm:text-sm text-gray-400">Nuestro departamento centralizado de atención canaliza todas tus quejas o dudas express.</p>
        </div>
        
        <a
          id="central-support-mail"
          href="mailto:soporte@mangobajito.com.ve"
          className="px-6 py-3 bg-mango-primary hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition shadow-sm select-none cursor-pointer"
        >
          Canalizar un Caso
        </a>
      </section>

    </div>
  );
};
