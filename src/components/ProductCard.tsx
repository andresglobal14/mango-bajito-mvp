import React from 'react';
import { Product } from '../constants/products';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking add to cart
    addItem(product, 1);
  };

  // Determine total global stock across all branches for card badge
  const totalStock = (Object.values(product.stock) as number[]).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 hover:border-mango-secondary/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Product Image & Badges */}
      <Link to={`/catalogo/${product.id}`} className="relative block overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Rating overlay */}
        <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-xs text-white text-[10px] font-bold py-1 px-2 rounded-lg flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>

        {/* Stock Alert Badge */}
        {totalStock === 0 ? (
          <div className="absolute top-2.5 right-2.5 bg-rose-500 text-white text-[9px] font-mono font-extrabold py-1 px-2 rounded-lg">
            AGOTADO GENERAL
          </div>
        ) : totalStock < 50 ? (
          <div className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[9px] font-mono font-extrabold py-1 px-2 rounded-lg">
            STOCK LIMITADO
          </div>
        ) : null}

        {/* Quick View Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/90 backdrop-blur-xs text-mango-dark font-bold text-xs py-2 px-3.5 rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="h-4 w-4" />
            <span>Ver Detalles</span>
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase font-mono tracking-wider text-mango-green bg-emerald-50 py-0.5 px-2 rounded-md">
            {product.category}
          </span>
          <h4 className="text-sm font-bold text-gray-800 line-clamp-2 pt-1 font-sans hover:text-mango-primary group-hover:text-mango-primary">
            <Link to={`/catalogo/${product.id}`}>{product.name}</Link>
          </h4>
        </div>

        <div>
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <p className="text-[10px] text-gray-400 font-bold leading-none">PRECIO MVP</p>
              <span className="text-lg font-black text-mango-dark font-display">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <button
              id={`add-${product.id}`}
              onClick={handleAddToCart}
              disabled={totalStock === 0}
              className={`p-2.5 rounded-xl transition duration-150 shadow-xs cursor-pointer flex items-center justify-center select-none ${
                totalStock === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'
                  : 'bg-mango-primary hover:bg-orange-600 text-white hover:scale-105 active:scale-95'
              }`}
              title={totalStock === 0 ? "Agotado en todas las tiendas" : "Agregar al carrito"}
            >
              <ShoppingCart className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
