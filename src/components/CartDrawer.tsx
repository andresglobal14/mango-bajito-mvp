import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { ShoppingBag, X, Plus, Minus, Trash2, Lock, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) return;
    setIsSuccessModalOpen(true);
  };

  const handleCompleteSimulation = () => {
    setIsSuccessModalOpen(false);
    clearCart();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            {/* Backdrop Overlay */}
            <motion.div
              id="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Cart Drawer Panel */}
            <motion.div
              id="cart-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-gray-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center text-mango-primary">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-mango-dark font-display">Tu Compra</h2>
                    <p className="text-xs text-gray-500 font-mono">
                      {items.length === 0 ? 'Vacío' : `${items.reduce((acc, current) => acc + current.quantity, 0)} artículos`}
                    </p>
                  </div>
                </div>
                <button
                  id="close-cart-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full cursor-pointer hover:bg-gray-100 text-gray-400 hover:text-mango-dark transition duration-150"
                  aria-label="Cerrar Carrito"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="h-16 w-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                      <ShoppingCart className="h-8 w-8" />
                    </div>
                    <h3 className="text-md font-bold text-mango-dark">¡Tu carrito está limpio!</h3>
                    <p className="text-sm text-gray-500 max-w-xs mt-1">
                      Aún no has agregado ofertas del mango bajito al carrito. Explora nuestro catálogo premium de temporada.
                    </p>
                    <button
                      id="cart-drawer-explore-btn"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/catalogo');
                      }}
                      className="mt-6 px-5 py-2.5 bg-mango-primary hover:bg-orange-600 text-white font-medium rounded-xl text-sm transition duration-150 shadow-sm cursor-pointer"
                    >
                      Ir al Catálogo
                    </button>
                  </div>
                ) : (
                  items.map(({ product, quantity }) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50/100 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-800 truncate">{product.name}</h4>
                        <p className="text-xs text-mango-green font-semibold mt-0.5">{product.category}</p>
                        <div className="flex items-center justify-between mt-2">
                          {/* Stepper */}
                          <div className="flex items-center border border-gray-200 bg-white rounded-lg">
                            <button
                              id={`minus-${product.id}`}
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="p-1 px-2 text-gray-400 hover:text-mango-dark transition cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-xs font-semibold px-2 text-gray-700 min-w-[20px] text-center">
                              {quantity}
                            </span>
                            <button
                              id={`plus-${product.id}`}
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="p-1 px-2 text-gray-400 hover:text-mango-dark transition cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          {/* Price / Delete */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-mango-dark">
                              ${(product.price * quantity).toFixed(2)}
                            </span>
                            <button
                              id={`delete-${product.id}`}
                              onClick={() => removeItem(product.id)}
                              className="text-gray-400 hover:text-rose-500 p-1 rounded-md transition duration-150 cursor-pointer"
                              title="Eliminar artículo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {items.length > 0 && (
                <div className="p-6 bg-white border-t border-gray-100 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>IVA (16% Incluído)</span>
                      <span>${(getTotalPrice() * 0.16).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-100">
                      <span className="font-bold text-gray-800 text-base">Total a Pagar</span>
                      <span className="font-extrabold text-xl text-mango-dark font-display">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Auth Checkout Guard Constraint */}
                  {!isAuthenticated ? (
                    <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Lock className="h-3.5 w-3.5 flex-shrink-0 text-amber-600" />
                        <span>Restricción de Compra</span>
                      </div>
                      <p className="leading-relaxed">
                        Inicia sesión para finalizar tu compra. Los despachos de productos del catálogo se programan tras autenticarse.
                      </p>
                      <button
                        id="cart-drawer-login-btn"
                        onClick={() => {
                          setIsOpen(false);
                          navigate('/login');
                        }}
                        className="w-full mt-2 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-colors shadow-sm cursor-pointer"
                      >
                        Iniciar Sesión Ahora
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center gap-1.5 font-medium">
                      <Lock className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Sesión activa como: <strong className="font-bold">{user?.name}</strong></span>
                    </div>
                  )}

                  {/* Buy/Checkout Button */}
                  <button
                    id="checkout-trigger-btn"
                    disabled={!isAuthenticated}
                    onClick={handleCheckout}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md transition duration-150 flex items-center justify-center gap-2 ${
                      isAuthenticated
                        ? 'bg-mango-primary hover:bg-orange-600 text-white hover:shadow-lg transform active:scale-98 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                    }`}
                  >
                    {!isAuthenticated && <Lock className="h-4 w-4" />}
                    <span>Comprar y Retirar en Sucursal</span>
                  </button>
                </div>
              )}
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Success Simulation Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="fixed inset-0 bg-black"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl relative z-10 border border-gray-100"
            >
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                <ShoppingBag className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 font-display">¡Pedido Simulado!</h3>
              
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                ¡Gracias por visitar el MVP de <strong>Mango Bajito</strong>, <span className="font-bold text-mango-dark">{user?.name}</span>!
              </p>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-left border border-gray-100">
                <p className="text-xs text-gray-400 font-mono">UBICACIÓN DE RETIRO:</p>
                <p className="text-sm font-bold text-mango-dark">{user?.address || "Sucursal seleccionada"}</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold">Total simulado: ${getTotalPrice().toFixed(2)}</p>
              </div>

              <p className="text-xs text-mango-primary bg-orange-50 p-2.5 rounded-lg mt-4 font-semibold">
                Este es un MVP operativo. Zustand y React Router han gestionado tu experiencia en tiempo real sin recargar la página.
              </p>
              
              <button
                id="success-modal-close"
                onClick={handleCompleteSimulation}
                className="mt-6 w-full py-3 bg-mango-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Volver a la tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
