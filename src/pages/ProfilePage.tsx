import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, LogOut, CheckCircle2, ShoppingBag, Edit3, Save, RefreshCw } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout, updateUserDetail } = useAuthStore();
  const navigate = useNavigate();

  // Edit form states
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      updateUserDetail({
        name: userName,
        phone: phone,
        address: address,
      });
      setSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  // Mock Purchase History typical of Mango Bajito orders
  const mockOrders = [
    {
      id: "ORD-988221",
      date: "01/06/2026",
      status: "Entregado en Sucursal",
      branch: "Valencia Av. Bolívar Norte",
      items: [
        { name: "Juego de Vasos de Vidrio Premium (6 pzs)", qty: 2, price: 4.99 },
        { name: "Sartén Antiadherente de Aluminio de 24cm", qty: 1, price: 6.99 }
      ],
      total: 16.97
    },
    {
      id: "ORD-921099",
      date: "14/05/2026",
      status: "Entregado en Sucursal",
      branch: "Caracas - Sabana Grande",
      items: [
        { name: "Organizador de Plástico con Tapa", qty: 4, price: 2.50 }
      ],
      total: 10.00
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-sans space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200/60 pb-6">
        <div>
          <span className="text-xs font-bold font-mono text-mango-green uppercase tracking-wider block">Panel de Control</span>
          <h1 className="text-3xl font-black text-mango-dark font-display mt-1">Mi Cuenta de Cliente</h1>
          <p className="text-xs text-gray-400 mt-1">Gestiona tus credenciales personales y consulta tu historial de reservas en Venezuela.</p>
        </div>

        <button
          id="profile-logout-top-btn"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs rounded-xl transition duration-150 cursor-pointer w-fit"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-orange-500 to-amber-500" />
            
            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div className="h-20 w-20 rounded-full bg-orange-100 text-mango-primary font-bold text-3xl flex items-center justify-center border-4 border-white shadow-md">
                {user?.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-mango-dark font-display">{user?.name}</h3>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <span className="bg-emerald-50 text-mango-green text-[10px] font-extrabold font-mono px-3 py-0.5 rounded-full border border-emerald-100">
                CLIENTE PREMIUM MB
              </span>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="h-4 w-4 text-mango-green flex-shrink-0" />
                <span>Perfil actualizado exitosamente localmente</span>
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label htmlFor="edit-name" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Nombre</label>
                  <input
                    id="edit-name"
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-semibold outline-none focus:border-mango-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="edit-phone" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Teléfono</label>
                  <input
                    id="edit-phone"
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-semibold outline-none focus:border-mango-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="edit-address" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Dirección Predeterminada de Retiro</label>
                  <textarea
                    id="edit-address"
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-semibold outline-none focus:border-mango-primary focus:bg-white resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    id="cancel-edit-btn"
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-full py-2 border border-gray-200 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    id="save-edit-btn"
                    type="submit"
                    disabled={saving}
                    className="w-full py-2 bg-mango-primary hover:bg-orange-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    {saving ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    <span>Guardar</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 pt-2 border-t border-gray-150">
                <div className="space-y-3.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <User className="h-4.5 w-4.5 text-mango-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-bold font-mono">Nombre registrado</p>
                      <p className="font-bold text-gray-800 truncate mt-0.5">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4.5 w-4.5 text-mango-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-bold font-mono">Correo de contacto</p>
                      <p className="font-bold text-gray-800 truncate mt-0.5">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4.5 w-4.5 text-mango-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-bold font-mono">Teléfono móvil</p>
                      <p className="font-bold text-gray-800 truncate mt-0.5">{user?.phone || 'No registrado'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4.5 w-4.5 text-mango-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 font-bold font-mono">Dirección de despacho preferida</p>
                      <p className="font-semibold text-gray-600 mt-0.5 text-xs leading-normal">{user?.address || 'No registrada'}</p>
                    </div>
                  </div>
                </div>

                <button
                  id="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-4 py-2.5 border border-gray-200 hover:border-mango-primary text-gray-700 hover:text-mango-primary hover:bg-orange-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition duration-150 cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Modificar Datos de Perfil</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Historical visual listings of mock purchases */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-display text-mango-dark">Historial de Reservas</h3>
              <p className="text-xs text-gray-400">Consulta los pedidos programados para retirar en tienda física de Mango Bajito.</p>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-slate-200/55 hover:border-slate-300 bg-[#F8F9FA]/30 overflow-hidden"
                >
                  {/* Title Order */}
                  <div className="bg-[#F8F9FA] p-3.5 border-b border-slate-250/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-mango-dark bg-white border border-gray-200 py-1 px-2.5 rounded-lg">
                        {order.id}
                      </span>
                      <span className="text-gray-400 font-medium font-mono">{order.date}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-700 font-bold font-mono uppercase text-[10px]">
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Body Products of this Order */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs items-center">
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-100 text-mango-primary font-bold px-2 py-0.5 rounded-md text-[10px] font-mono">
                              x{item.qty}
                            </span>
                            <span className="text-gray-700 font-medium">{item.name}</span>
                          </div>
                          <span className="font-bold text-gray-900 font-mono">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer list */}
                    <div className="pt-3.5 border-t border-dashed border-gray-150 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-2 mt-2">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono">Punto de retiro</p>
                        <p className="text-xs font-bold text-gray-700 mt-0.5">{order.branch}</p>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono block">Monto Consolidado</span>
                        <span className="text-base font-extrabold text-mango-dark font-display font-mono">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
