import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants/products';
import { BRANCHES } from '../constants/branches';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, Star, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Truck, PackageCheck, AlertCircle } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Locate product from ID
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center font-sans">
        <div className="h-16 w-16 mb-4 rounded-full bg-orange-50 text-mango-primary flex items-center justify-center mx-auto">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black text-mango-dark font-display">Producto no encontrado</h2>
        <p className="text-sm text-gray-400 mt-2">El código de artículo introducido no se vincula a nuestra base de datos comercial.</p>
        <Link
          to="/catalogo"
          className="mt-6 inline-flex px-5 py-3 bg-mango-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-orange-600 transition"
        >
          Volver al Catálogo de Productos
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleQtyChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  // Compute total stock of this item globally
  const totalStock = (Object.values(product.stock) as number[]).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans space-y-12">
      
      {/* Breadcrumbs */}
      <nav id="product-detail-breadcrumbs" className="flex items-center gap-2 text-xs text-gray-400 font-medium">
        <Link to="/" className="hover:text-mango-primary transition duration-150">Inicio</Link>
        <ArrowRight className="h-3 w-3" />
        <Link to="/catalogo" className="hover:text-mango-primary transition duration-150">Catálogo</Link>
        <ArrowRight className="h-3 w-3" />
        <span className="text-gray-600 font-semibold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Back Trigger */}
      <button
        id="product-detail-back-btn"
        onClick={() => navigate('/catalogo')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-mango-primary transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Regresar al listado de catálogo</span>
      </button>

      {/* Main Details and Image Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
        
        {/* Left: Interactive zoom image card */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs relative group">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
            {totalStock === 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-red-600 text-white font-extrabold font-mono text-xs px-4 py-2 rounded-xl shadow-lg">
                  AGOTADO TEMPORALMENTE
                </span>
              </div>
            )}
          </div>
          
          <div className="bg-orange-50/35 p-4 rounded-xl border border-orange-100/70 text-xs text-orange-850 flex items-start gap-2.5">
            <PackageCheck className="h-4.5 w-4.5 text-mango-primary flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Retiro Express en Tienda en 1 Hora:</strong> Verifica la disponibilidad a continuación en la tabla y agenda tu checkout. Las reservas de stock se garantizan por 48 horas.
            </p>
          </div>
        </div>

        {/* Right: Technical properties */}
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-block bg-emerald-50 text-mango-green text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase font-mono tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-mango-dark font-display leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4.5 w-4.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-bold">
                {product.rating} de calificación
              </span>
            </div>
          </div>

          <div className="p-5 bg-[#F8F9FA] rounded-xl border border-slate-200/50 flex items-baseline justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">PRECIO UNITARIO MVP</p>
              <p className="text-3xl font-black text-mango-dark font-display">${product.price.toFixed(2)}</p>
            </div>
            
            {totalStock > 0 ? (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg font-mono">
                Inventario Total: {totalStock} pzs
              </span>
            ) : (
              <span className="text-xs bg-rose-100 text-rose-805 font-bold px-3 py-1 rounded-lg font-mono">
                Agotado General
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-extrabold text-xs text-gray-400 font-mono uppercase tracking-wider">Descripción del Artículo</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{product.description}</p>
          </div>

          {/* Stepper with CTA Add to Cart */}
          {totalStock > 0 ? (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3 border-t border-gray-100">
              <div className="flex items-center border border-gray-200 bg-white rounded-xl h-12 overflow-hidden justify-between w-full sm:w-32">
                <button
                  id="qty-decrement"
                  onClick={() => handleQtyChange(quantity - 1)}
                  className="px-4 py-2 text-gray-500 hover:text-mango-dark text-lg font-bold hover:bg-gray-50 h-full transition duration-150 cursor-pointer flex items-center justify-center min-w-[40px]"
                >
                  -
                </button>
                <span className="font-bold text-sm text-gray-800 font-mono w-8 text-center">
                  {quantity}
                </span>
                <button
                  id="qty-increment"
                  onClick={() => handleQtyChange(quantity + 1)}
                  className="px-4 py-2 text-gray-500 hover:text-mango-dark text-lg font-bold hover:bg-gray-50 h-full transition duration-150 cursor-pointer flex items-center justify-center min-w-[40px]"
                >
                  +
                </button>
              </div>

              <button
                id="add-to-cart-detail-btn"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 bg-mango-primary hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition duration-150 shadow-md flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer select-none"
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                <span>Agregar {quantity} al Carrito</span>
              </button>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-xs text-rose-850 flex items-center gap-2 font-semibold">
              <AlertCircle className="h-4.5 w-4.5 text-rose-500 flex-shrink-0" />
              <span>No disponible para compra en línea en este momento debido a roturas generales de stock nacional.</span>
            </div>
          )}

          {/* Product Specifications */}
          <div className="space-y-3 pt-6 border-t border-slate-200/60 font-sans">
            <h3 className="font-extrabold text-xs text-gray-400 font-mono uppercase tracking-wider">Ficha Técnica</h3>
            <div className="grid grid-cols-2 gap-3.5 text-xs text-gray-600">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="p-3 bg-[#F8F9FA] rounded-xl border border-slate-200/50 space-y-1">
                  <p className="font-semibold text-gray-400 text-[10px] uppercase font-mono tracking-wider">{key}</p>
                  <p className="font-bold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== EXISTENCIAS EN SUCURSALES TABLE ==================== */}
      <section className="bg-white rounded-2xl border border-slate-200/60 shadow-xs overflow-hidden">
        <div className="p-6 bg-linear-to-r from-teal-500/10 to-emerald-500/0 border-b border-gray-150 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-mango-green/10 flex items-center justify-center text-mango-green">
            <PackageCheck className="h-5.5 w-5.5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-mango-dark">Existencias en Sucursales Físicas</h2>
            <p className="text-xs text-gray-500">Ubicaciones y stock disponible en tiempo real para retiro el mismo día.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest font-mono">
                <th className="py-4.5 px-6">Ciudad / Sucursal</th>
                <th className="py-4.5 px-6">Dirección de Retiro</th>
                <th className="py-4.5 px-6">Nivel de Stock</th>
                <th className="py-4.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600 font-sans divide-y divide-gray-100">
              {BRANCHES.map((branch) => {
                const stockQty = product.stock[branch.id] ?? 0;
                
                return (
                  <tr key={branch.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Branch Title */}
                    <td className="py-4 px-6 font-bold text-mango-dark">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-bold font-mono uppercase tracking-wider">{branch.city}</span>
                        <span className="text-sm font-extrabold font-display leading-tight mt-0.5">{branch.name}</span>
                      </div>
                    </td>

                    {/* Address details */}
                    <td className="py-4 px-6 text-xs text-gray-500 max-w-xs truncate leading-relaxed">
                      {branch.address}
                    </td>

                    {/* Stock level indicators */}
                    <td className="py-4 px-6 font-mono font-bold">
                      {stockQty > 50 ? (
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-mango-green py-1 px-2.5 rounded-lg border border-emerald-100 text-xs">
                          <span className="h-2 w-2 rounded-full bg-mango-green animate-pulse" />
                          <span>Excelente ({stockQty} uds)</span>
                        </div>
                      ) : stockQty > 0 ? (
                        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 py-1 px-2.5 rounded-lg border border-amber-100 text-xs">
                          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>Pocas Unidades ({stockQty} uds)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 py-1 px-2.5 rounded-lg border border-rose-100 text-xs">
                          <span className="h-2 w-2 rounded-full bg-rose-400" />
                          <span>Agotado</span>
                        </div>
                      )}
                    </td>

                    {/* Actions button */}
                    <td className="py-4 px-6 text-right">
                      <a
                        id={`direction-btn-${branch.id}-${product.id}`}
                        href={`https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex py-1.5 px-3 border border-gray-200 hover:border-mango-primary text-gray-600 hover:text-mango-primary hover:bg-orange-50 bg-white font-bold text-[10px] rounded-lg transition duration-150 cursor-pointer"
                        title="Ver mapa de ubicación"
                      >
                        Ver Mapa
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};
