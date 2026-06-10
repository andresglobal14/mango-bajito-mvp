import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import { BranchLocator } from '../components/BranchLocator';
import { ArrowRight, ShoppingCart, Sparkles, Shield, Gift, HelpCircle, Flame, Grid, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Highlight only featured products on the landing page
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  // Quick categories for departments
  const categories = [
    {
      name: "Cocina y Mesa",
      desc: "Vajillas, vasos, cubiertos, y sartenes premium.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600",
      color: "from-amber-500/10 to-orange-500/0"
    },
    {
      name: "Organización",
      desc: "Cajas plásticas, colgadores, y cestas elegantes.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=600",
      color: "from-emerald-500/10 to-teal-500/0"
    },
    {
      name: "Hogar y Decoración",
      desc: "Cojines, plantas artificiales, y lámparas modernas.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
      color: "from-blue-500/10 to-indigo-500/0"
    },
    {
      name: "Juguetería",
      desc: "Diversión garantizada con bloques didácticos seguro.",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=600",
      color: "from-rose-500/10 to-pink-500/0"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/catalogo?categoria=${categoryName}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans min-h-screen flex flex-col space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <section id="hero" className="relative pt-6 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-linear-to-br from-mango-secondary to-mango-primary text-white rounded-[2rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden shadow-2xl shadow-orange-100/30">
            {/* Absolute blur background accents */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-16 -mb-16 pointer-events-none" />

            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left z-10 lg:flex-1"
            >
              <div className="inline-flex items-center gap-1.5 bg-white/15 text-white font-extrabold px-3 py-1.5 rounded-full text-xs tracking-wider uppercase font-mono">
                <Sparkles className="h-3 w-3" />
                <span>¡Todo para tu hogar al mejor precio!</span>
              </div>
              
              <h1 className="text-4.5xl sm:text-5xl md:text-6xl font-black leading-none tracking-tighter font-display text-white">
                Viste tu Hogar con Mango Bajito
              </h1>
              
              <p className="text-sm sm:text-base text-orange-50 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 font-sans">
                Descubre nuestra nueva colección de cocina, baño, organización y decoración de temporada. Compras ágiles con retiro inmediato en Carabobo, Lara, Aragua y Distrito Capital.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link
                  to="/catalogo"
                  className="px-8 py-4 bg-white text-mango-primary hover:scale-105 text-sm font-bold rounded-xl transition duration-150 inline-flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart className="h-4.5 w-4.5" />
                  <span>Ver Catálogo</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Link>
                <Link
                  to="/sucursales"
                  className="px-8 py-4 bg-black/20 backdrop-blur-md text-white border border-white/30 text-sm font-bold rounded-xl transition duration-150 inline-flex items-center justify-center gap-1.5 hover:bg-black/30 text-center"
                >
                  <MapPin className="h-4.5 w-4.5 text-mango-secondary" />
                  <span>Ofertas y Tiendas</span>
                </Link>
              </div>

              {/* Micro details */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-display">6+</p>
                  <p className="text-[10px] text-orange-100 font-bold uppercase tracking-wider font-mono">Tiendas Físicas</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-display">12K+</p>
                  <p className="text-[10px] text-orange-100 font-bold uppercase tracking-wider font-mono">Clientes Felices</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-white font-display">$0.99</p>
                  <p className="text-[10px] text-orange-100 font-bold uppercase tracking-wider font-mono">Ofertas Desde</p>
                </div>
              </div>
            </motion.div>

            {/* Hero visuals */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center items-center lg:flex-1 w-full"
            >
              <div className="relative w-full max-w-md md:max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
                  alt="Mango Bajito Hogar y Decoración"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="bg-mango-green text-white font-mono font-bold text-[9px] px-2 py-0.5 rounded-sm">VENEZUELA MVP</span>
                    <h3 className="font-bold text-lg font-display">Renueva tus espacios hoy</h3>
                    <p className="text-xs text-gray-200">Encuentra vajillas, organizadores, termos y sartenes a precios de locura.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Categorías Destacadas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 text-mango-primary font-bold text-xs uppercase tracking-widest font-mono">
            <Grid className="h-3 w-3" />
            <span>Distribución de Departamentos</span>
          </div>
          <h2 className="text-3xl font-black text-mango-dark tracking-tight font-display">
            Navega por Categorías Populares
          </h2>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Selecciona el área de tu interés para filtrar existencias comerciales y precios directamente.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-64 rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-linear-to-t ${cat.color} from-black/80 to-black/20`} />
              
              <div className="absolute inset-x-0 bottom-0 p-5 text-white flex flex-col justify-end h-full">
                <h3 className="font-extrabold text-lg font-display tracking-tight group-hover:text-mango-secondary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-200 line-clamp-2 mt-1 leading-relaxed">
                  {cat.desc}
                </p>
                <div className="mt-3 text-xs font-bold text-mango-secondary flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                  <span>Ver Colección</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Tendencias Grid */}
      <section className="bg-gray-50/70 border-y border-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-gray-200/60 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 text-mango-primary font-bold text-xs uppercase tracking-widest font-mono">
                <Flame className="h-4 w-4 text-orange-500 fill-current animate-pulse" />
                <span>Lo Más Buscado del Mes</span>
              </div>
              <h2 className="text-3xl font-black text-mango-dark tracking-tight font-display">
                Ofertas y Productos Destacados
              </h2>
              <p className="text-xs sm:text-sm text-gray-400">
                Llevatelo express. Agrega ofertas directo a tu carrito y retíralo en tienda física.
              </p>
            </div>
            
            <Link
              to="/catalogo"
              className="text-sm font-bold text-mango-primary hover:text-orange-600 flex items-center gap-1 transition"
            >
              <span>Ver catálogo completo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Localizador de Sucursales */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="inline-block bg-orange-100 text-mango-primary text-xs font-extrabold px-3 py-1.5 rounded-full uppercase font-mono tracking-widest">
            Presencia a Nivel Nacional
          </span>
          <h2 className="text-3xl font-black text-mango-dark tracking-tight font-display">
            Nuestra Red de Tiendas
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto">
            Habilitamos retiros presenciales inmediatos. Encuentra tu sucursal para verificar disponibilidad local.
          </p>
        </div>

        <BranchLocator />
      </section>

      {/* 5. About ("Sobre Nosotros" / Heritage) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-mango-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Decorative assets */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-mango-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-mango-secondary font-mono">
              Nuestra Historia
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
              Llevando felicidad a la mesa de las familias venezolanas
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Mango Bajito nació con la firme convicción de que decorar tu mesa, organizar tus armarios y adquirir vajilla u obsequios de primerísima calidad no tiene por qué costar una fortuna. 
            </p>
            <p className="text-sm text-gray-400 leading-relaxed font-sans">
              Desde nuestras tiendas emblemáticas en Valencia, Carabobo, y nuestro crecimiento en Caracas Sabana Grande y Maracay, traemos productos que conjugan colores vibrantes, materiales impecables y compras eficientes en un solo lugar. ¡Visítanos y compruébalo!
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-800">
              <div className="flex gap-2 items-center">
                <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-mango-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-200">Compra Segura</h4>
                  <p className="text-[11px] text-gray-500">Localiza inventario real</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-mango-green">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-200">Obsequios Premium</h4>
                  <p className="text-[11px] text-gray-500">Hermoso empaquetado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden border border-gray-800">
            <img
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
              alt="Hogar Vajillas Mango Bajito"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-mango-dark/20" />
          </div>
        </div>
      </section>
    </div>
  );
};
