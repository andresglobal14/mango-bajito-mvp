import React, { useState, useEffect } from 'react';
import { BRANCHES, Branch } from '../constants/branches';
import { MapPin, Navigation, Compass, Phone, Clock, RotateCcw, ChevronRight } from 'lucide-react';

export const BranchLocator: React.FC = () => {
  const [nearestBranch, setNearestBranch] = useState<Branch | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [geoState, setGeoState] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Fallback states
  const [selectedState, setSelectedState] = useState<string>('Todos');
  const [manualFiltered, setManualFiltered] = useState<Branch[]>([]);

  // Unique list of states for fallback selector
  const availableStates = ['Todos', ...Array.from(new Set(BRANCHES.map(b => b.state)))];

  // Filter based on dropdown
  useEffect(() => {
    if (selectedState === 'Todos') {
      setManualFiltered(BRANCHES);
    } else {
      setManualFiltered(BRANCHES.filter(b => b.state === selectedState));
    }
  }, [selectedState]);

  // Haversine formula to compute great-circle distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's Radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGeoState('error');
      setErrorMessage("La geolocalización no es compatible con este navegador.");
      return;
    }

    setGeoState('locating');
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let minDistance = Infinity;
        let closest: Branch | null = null;

        BRANCHES.forEach((branch) => {
          const d = calculateDistance(
            latitude,
            longitude,
            branch.coordinates.lat,
            branch.coordinates.lng
          );
          if (d < minDistance) {
            minDistance = d;
            closest = branch;
          }
        });

        if (closest) {
          setNearestBranch(closest);
          setDistance(minDistance);
          setGeoState('success');
          // Also pre-select state of nearest for convenience
          setSelectedState((closest as Branch).state);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setGeoState('error');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setErrorMessage("Permiso denegado. Utiliza el selector manual a continuación.");
            break;
          case error.POSITION_UNAVAILABLE:
            setErrorMessage("Ubicación no disponible en este momento.");
            break;
          case error.TIMEOUT:
            setErrorMessage("Tiempo de espera agotado al obtener ubicación.");
            break;
          default:
            setErrorMessage("Ocurrió un error al intentar ubicarte.");
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const resetGeolocation = () => {
    setNearestBranch(null);
    setDistance(null);
    setGeoState('idle');
    setErrorMessage(null);
    setSelectedState('Todos');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* Banner Superior Decorativo */}
      <div className="bg-linear-to-r from-orange-500 to-amber-500 p-6 md:p-8 text-white">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Compass className="h-6 w-6 text-white animate-spin-slow" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-orange-100 font-mono">Buscador Inteligente</span>
            <h3 className="text-2xl font-black font-display mt-0.5">Localiza tu Mango Bajito</h3>
          </div>
        </div>
        <p className="text-sm text-orange-50 mt-2 leading-relaxed">
          Encuentra ofertas inigualables más cerca de ti. Haz clic para activar tu localización o explora las sucursales por estado.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Geolocation trigger */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <h4 className="font-bold text-gray-800 text-sm md:text-base">¿Quieres saber cuál es tu tienda más cercana?</h4>
            <p className="text-xs text-gray-500 mt-1">Calculamos automáticamente la distancia de despacho o retiro.</p>
          </div>
          
          {geoState === 'idle' || geoState === 'error' ? (
            <button
              id="locate-me-btn"
              onClick={handleLocateMe}
              className="w-full sm:w-auto px-5 py-3 bg-mango-primary hover:bg-orange-600 text-white font-bold rounded-xl text-sm transition-all duration-150 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="h-4 w-4 fill-current" />
              <span>Calcular tienda más cercana</span>
            </button>
          ) : geoState === 'locating' ? (
            <div className="w-full sm:w-auto px-5 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-sm flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-mango-primary border-t-transparent rounded-full animate-spin" />
              <span>Buscando satélites...</span>
            </div>
          ) : (
            <button
              id="reset-locate-btn"
              onClick={resetGeolocation}
              className="w-full sm:w-auto px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer border border-gray-200"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reiniciar búsqueda gps</span>
            </button>
          )}
        </div>

        {/* Error notification */}
        {geoState === 'error' && errorMessage && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs leading-relaxed">
            <strong className="font-extrabold flex items-center gap-1 mb-1">
              ⚠️ Ajuste Requerido:
            </strong>
            {errorMessage}
          </div>
        )}

        {/* Geolocation Success Card */}
        {geoState === 'success' && nearestBranch && distance !== null && (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                  ¡La más cercana a ti!
                </span>
                <h4 className="text-lg font-extrabold text-mango-dark font-display mt-2">{nearestBranch.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{nearestBranch.address}</p>
              </div>
              <div className="text-right bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl">
                <p className="text-xs font-semibold leading-none text-emerald-700 font-mono">DISTANCIA</p>
                <p className="text-lg font-black leading-none mt-1 font-mono">
                  {distance.toFixed(1)} km
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-3 border-t border-emerald-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>{nearestBranch.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                <span>{nearestBranch.phone}</span>
              </div>
            </div>

            <a
              id="maps-direction-btn-geo"
              href={`https://www.google.com/maps/search/?api=1&query=${nearestBranch.coordinates.lat},${nearestBranch.coordinates.lng}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs items-center justify-center gap-1.5 rounded-xl transition duration-150 cursor-pointer"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>Ver indicaciones de cómo llegar</span>
            </a>
          </div>
        )}

        {/* Fallback Manual Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h4 className="font-extrabold text-gray-900 text-sm uppercase tracking-wide font-display">
                Exploración manual por estado
              </h4>
              <p className="text-xs text-gray-500">¿No deseas compartir tu ubicación? Filtra las tiendas a continuación:</p>
            </div>
            
            {/* Fallback Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="state-selector" className="text-xs font-bold text-gray-500 whitespace-nowrap">Estado:</label>
              <select
                id="state-selector"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-gray-50 text-gray-800 text-xs font-bold border border-gray-200 rounded-xl p-2.5 focus:border-mango-primary focus:ring-1 focus:ring-mango-primary outline-none"
              >
                {availableStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* List of branches filtered manually */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manualFiltered.map((branch) => (
              <div
                key={branch.id}
                className={`p-4 rounded-xl border transition-all duration-150 hover:shadow-xs flex flex-col justify-between ${
                  nearestBranch?.id === branch.id
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-gray-100 bg-gray-50/30 hover:border-gray-200'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-extrabold font-mono uppercase bg-orange-100 text-mango-primary px-2 py-0.5 rounded-md">
                      {branch.state}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">{branch.city}</span>
                  </div>
                  <h5 className="font-bold text-sm text-gray-900 font-display mt-2">{branch.name}</h5>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{branch.address}</p>
                </div>

                <div className="space-y-1.5 text-[11px] text-gray-500 mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-mango-primary flex-shrink-0" />
                    <span className="truncate">{branch.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-mango-primary flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>

                <a
                  id={`maps-btn-${branch.id}`}
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-mango-primary font-bold text-[11px] items-center justify-center gap-1 rounded-lg transition duration-150 cursor-pointer"
                >
                  <MapPin className="h-3 w-3 text-mango-primary" />
                  <span>Ver en Google Maps</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
