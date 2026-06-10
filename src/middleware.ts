/**
 * Middleware de Autenticación Simulado (MVP "Mango Bajito")
 * 
 * Este archivo simula la lógica de protección de rutas típica de Next.js Middleware.
 * En el entorno SPA de Vite + React, es utilizado por nuestro de componente de 
 * Rutas Protegidas (ProtectedRoute) encargándose del control de acceso a `/perfil`.
 */

export interface MiddlewareRequest {
  pathname: string;
  cookies: { [key: string]: string };
}

export interface MiddlewareResponse {
  redirect?: string;
  next: boolean;
}

export function middleware(request: MiddlewareRequest): MiddlewareResponse {
  const protectedRoutes = ['/perfil', '/checkout'];
  const authRoutes = ['/login', '/registro'];
  
  const isProtected = protectedRoutes.some(route => request.pathname.startsWith(route));
  const isAuthPage = authRoutes.some(route => request.pathname.startsWith(route));
  
  // En este demo, verificamos la presencia de la cookie o el token de sesión simulado
  const hasSession = !!request.cookies['mb_session_token'] || !!request.cookies['mb_auth_user'];

  if (isProtected && !hasSession) {
    // Si intenta acceder a una ruta protegida sin sesión, redirigimos a login
    return {
      next: false,
      redirect: '/login'
    };
  }

  if (isAuthPage && hasSession) {
    // Si intenta ingresar a login ya estando autenticado, redirigimos a perfil
    return {
      next: false,
      redirect: '/perfil'
    };
  }

  // Permite continuar
  return {
    next: true
  };
}
