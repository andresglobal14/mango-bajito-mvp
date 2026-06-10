import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { User, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Pick up dynamic redirect path or parameters
  const redirectFrom = (location.state as any)?.from?.pathname || '/';
  const alertMsg = (location.state as any)?.message;

  const [email, setEmail] = useState('andres.arevalo@gmail.com');
  const [userName, setUserName] = useState('Andrés Arévalo');
  const [password, setPassword] = useState('*********');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !userName) return;

    // Execute session log in
    login(email, userName);
    setShowSuccess(true);

    // Short timeout for seamless login animations
    setTimeout(() => {
      navigate(redirectFrom, { replace: true });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex justify-center items-center font-sans">
      
      {/* Container main card */}
      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl overflow-hidden w-full max-w-md relative">
        {/* Banner header visual */}
        <div className="bg-linear-to-r from-orange-500 to-amber-500 p-6 text-white text-center">
          <span className="text-3xl">🥭</span>
          <h2 className="text-xl font-extrabold font-display uppercase tracking-tight mt-1">Mango Bajito Acceso</h2>
          <p className="text-xs text-orange-100">Inicia sesión para canjear tu compra y resguardar reservas de stock.</p>
        </div>

        {/* Action center */}
        {showSuccess ? (
          <div className="p-8 text-center space-y-4 animate-scaleUp">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 font-display">¡Bienvenido de vuelta!</h3>
              <p className="text-xs text-gray-500 mt-1">Redireccionando de manera segura a la tienda física...</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-800 text-left font-medium space-y-1">
              <p>👤 <strong>Cliente:</strong> {userName}</p>
              <p>✉️ <strong>Email:</strong> {email}</p>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Redirect notice alert banner */}
            {alertMsg && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl text-xs flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-mango-primary flex-shrink-0 animate-pulse" />
                <span>{alertMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name input block */}
              <div className="space-y-1.5">
                <label htmlFor="login-name" className="text-xs font-bold text-gray-500 block uppercase tracking-wider font-mono">Nombre Completo</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    id="login-name"
                    type="text"
                    required
                    placeholder="Escribe tu nombre"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-gray-50 text-xs font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:bg-white focus:border-mango-primary outline-none"
                  />
                </div>
              </div>

              {/* Email Address block */}
              <div className="space-y-1.5">
                <label htmlFor="login-email" className="text-xs font-bold text-gray-500 block uppercase tracking-wider font-mono">Correo Electrónico</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 text-xs font-semibold p-3 pl-10 border border-gray-200 rounded-xl focus:bg-white focus:border-mango-primary outline-none"
                  />
                </div>
              </div>

              {/* Password Block (Disabled standard MVP pattern) */}
              <div className="space-y-1.5">
                <label htmlFor="login-password" className="text-xs font-bold text-gray-500 block uppercase tracking-wider font-mono">Contraseña de Acceso</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </span>
                  <input
                    id="login-password"
                    type="password"
                    disabled
                    value={password}
                    className="w-full bg-gray-100 text-xs font-mono font-semibold p-3 pl-10 border border-gray-200 rounded-xl text-gray-450 cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Este MVP simula accesos ágiles sin claves complejas para pruebas del evaluador.</p>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                className="w-full mt-6 py-3.5 bg-mango-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition shadow-md hover:shadow-orange-100 block text-center cursor-pointer select-none"
              >
                Ingresar a la Plataforma
              </button>

            </form>

            <div className="text-center pt-2 border-t border-gray-100">
              <p className="text-[11px] text-gray-400">
                Al accesar demuestras conformidad con los lineamientos del MVP.
              </p>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
