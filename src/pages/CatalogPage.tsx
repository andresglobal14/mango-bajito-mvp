import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS, Product } from '../constants/products';
import { BRANCHES } from '../constants/branches';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, Check, RefreshCw, X } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('categoria');

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'Todas');
  const [maxPrice, setMaxPrice] = useState<number>(15);
  const [selectedBranch, setSelectedBranch] = useState<string>('Todas');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync with URL query parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // List of unique categories from PRODUCTS
  const categories = ['Todas', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  // Apply routing / state filters locally
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category filter
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;

    // 2. Search query filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(product.specs).some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

    // 3. Price limit filter
    const matchesPrice = product.price <= maxPrice;

    // 4. Branch availability filter
    const matchesBranch = 
      selectedBranch === 'Todas' || 
      (product.stock[selectedBranch] && product.stock[selectedBranch] > 0);

    return matchesCategory && matchesSearch && matchesPrice && matchesBranch;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    // Default featured sorting
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todas');
    setMaxPrice(15);
    setSelectedBranch('Todas');
    setSortBy('featured');
    setSearchParams({});
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Todas') {
      const { categoria, ...rest } = Object.fromEntries(searchParams);
      setSearchParams(rest);
    } else {
      setSearchParams({ categoria: category });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans">
      <div className="space-y-2 border-b border-gray-150 pb-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-mango-dark font-display leading-tight">
          Colección Mango Bajito
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Explora los departamentos del hogar, consulta existencias por tienda y planifica tus compras de temporada.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 gap-8">
        
        {/* ==================== 1. SIDEBAR FILTERS (DESKTOP) ==================== */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 sticky top-24 self-start bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-1.5 text-sm uppercase tracking-wider font-display">
              <SlidersHorizontal className="h-4 w-4 text-mango-primary" />
              <span>Filtros de Búsqueda</span>
            </h3>
            <button
              id="clear-filters-btn"
              onClick={clearFilters}
              className="text-xs font-bold text-mango-primary hover:text-orange-600 transition flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Limpiar</span>
            </button>
          </div>

          {/* Category List Filters */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider font-mono">
              Categorías
            </h4>
            <div className="flex flex-col space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-left text-xs px-3 py-2 rounded-xl transition flex items-center justify-between cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-orange-50 text-mango-primary font-bold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-mango-dark font-medium'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Price Range Selector */}
          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider font-mono">
                Precio Máximo
              </h4>
              <span className="text-xs font-bold text-mango-dark font-mono bg-orange-50 px-2 py-0.5 rounded-md">
                ${maxPrice.toFixed(2)}
              </span>
            </div>
            <div className="pt-2">
              <input
                id="price-range"
                type="range"
                min="1"
                max="15"
                step="0.5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                className="w-full accent-mango-primary cursor-pointer h-1 bg-gray-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold font-mono mt-1">
                <span>$1.00</span>
                <span>$15.00</span>
              </div>
            </div>
          </div>

          {/* Local Stock Availability Check */}
          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            <h4 className="font-extrabold text-xs text-gray-500 uppercase tracking-wider font-mono">
              Disponibilidad en Sucursal
            </h4>
            <select
              id="branch-filter"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-gray-50 text-xs font-bold border border-gray-200 rounded-xl p-2.5 outline-none focus:border-mango-primary"
            >
              <option value="Todas">Todas las sucursales (General)</option>
              {BRANCHES.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.city} - {branch.name.split(' ').slice(2).join(' ')}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* ==================== 2. PRODUCT LISTING PANEL (RIGHT) ==================== */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-gray-400" />
              </span>
              <input
                id="search-products"
                type="text"
                placeholder="Busca vajillas, organizadores, sartenes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-sm rounded-xl border border-gray-200 focus:outline-none focus:bg-white focus:border-mango-primary font-sans transition duration-150"
              />
            </div>

            {/* Sort & Trigger Mobile Filters */}
            <div className="flex items-center gap-3 justify-between">
              <button
                id="mobile-filters-trigger"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden p-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold rounded-xl text-xs transition duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <Filter className="h-4 w-4" />
                <span>Modificar Filtros</span>
              </button>

              <div className="flex items-center gap-1.5 font-sans">
                <label htmlFor="sort-selector" className="text-xs text-gray-500 font-bold whitespace-nowrap">Ordenar por:</label>
                <select
                  id="sort-selector"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 text-xs font-bold border border-gray-200 rounded-xl p-2.5 outline-none focus:border-mango-primary"
                >
                  <option value="featured">Populares Destacados</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="rating">Calificaciones del público</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter tags summary */}
          {(selectedCategory !== 'Todas' || selectedBranch !== 'Todas' || maxPrice < 15 || searchQuery) && (
            <div className="flex items-center justify-between flex-wrap gap-2 py-1.5 px-3 bg-orange-50/40 rounded-xl border border-orange-100/50">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-600 font-medium">
                <span className="font-bold text-mango-dark mr-1">Filtros aplicados:</span>
                
                {selectedCategory !== 'Todas' && (
                  <span className="bg-white border border-orange-200 text-mango-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                    {selectedCategory}
                    <X className="h-3 w-3 cursor-pointer hover:text-mango-dark" onClick={() => handleCategorySelect('Todas')} />
                  </span>
                )}
                {maxPrice < 15 && (
                  <span className="bg-white border border-orange-200 text-mango-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                    Precio Máx: ${maxPrice.toFixed(0)}
                    <X className="h-3 w-3 cursor-pointer hover:text-mango-dark" onClick={() => setMaxPrice(15)} />
                  </span>
                )}
                {selectedBranch !== 'Todas' && (
                  <span className="bg-white border border-orange-200 text-mango-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                    Disponibilidad: {BRANCHES.find(b => b.id === selectedBranch)?.city}
                    <X className="h-3 w-3 cursor-pointer hover:text-mango-dark" onClick={() => setSelectedBranch('Todas')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-white border border-orange-200 text-mango-primary px-2.5 py-1 rounded-lg flex items-center gap-1 truncate max-w-[150px]">
                    "{searchQuery}"
                    <X className="h-3 w-3 cursor-pointer hover:text-mango-dark" onClick={() => setSearchQuery('')} />
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Results Grid counts */}
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-mono">
              MOSTRANDO <strong className="font-extrabold text-mango-dark">{sortedProducts.length}</strong> PRODUCTOS
            </p>
          </div>

          {/* Product Grid display */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 flex flex-col items-center justify-center space-y-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-mango-dark font-display">No encontramos coincidencias</h3>
              <p className="text-sm text-gray-400 max-w-sm">
                No hay ofertas que coincidan con tu criterio actual en las sucursales. Intenta reducir la rigidez de los filtros.
              </p>
              <button
                id="reset-catalog-filters"
                onClick={clearFilters}
                className="px-5 py-2.5 bg-mango-primary text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition duration-150 cursor-pointer shadow-xs"
              >
                Limpiar Filtros de la Colección
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ==================== 3. MOBILE INTERACTIVE DRAPED FILTERS DRAW ==================== */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative ml-0 mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl border-r border-gray-150">
            <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-mango-dark font-display">Filtrar Colección</h2>
              <button
                id="close-mobile-filters"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-mango-dark cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Category Search Selector */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider font-mono">Categoría</h4>
                <div className="flex flex-col space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      id={`mobile-filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => handleCategorySelect(cat)}
                      className={`text-left text-xs px-3 py-2 rounded-lg ${
                        selectedCategory === cat ? 'bg-orange-50 text-mango-primary font-bold' : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider font-mono">Precio Máximo</h4>
                  <span className="text-xs font-bold text-mango-primary font-mono">${maxPrice.toFixed(2)}</span>
                </div>
                <input
                  id="price-range-mobile"
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="w-full accent-mango-primary h-1 bg-gray-200 rounded-lg"
                />
              </div>

              {/* Branch Selector */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-gray-400 uppercase tracking-wider font-mono">Tienda de Retiro</h4>
                <select
                  id="branch-filter-mobile"
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-gray-50 text-xs font-bold border border-gray-200 rounded-xl p-2.5 outline-none focus:border-mango-primary"
                >
                  <option value="Todas">Todas las sucursales</option>
                  {BRANCHES.map(branch => (
                    <option key={branch.id} value={branch.id}>{branch.city} - {branch.name.split(' ').slice(2).join(' ')}</option>
                  ))}
                </select>
              </div>

              <button
                id="apply-mobile-filters"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-mango-primary hover:bg-orange-600 text-white font-bold rounded-xl text-xs transition duration-150 cursor-pointer shadow-xs"
              >
                Aplicar Ajustes
              </button>
              
              <button
                id="clear-mobile-filters"
                onClick={() => {
                  clearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 font-bold rounded-xl text-xs transition duration-150 cursor-pointer"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
