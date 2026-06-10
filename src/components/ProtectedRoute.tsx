import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { middleware } from '../middleware';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // We can simulate the middleware check here by passing page info and cookies representation
  const reqCookies: { [key: string]: string } = {};
  if (user) {
    reqCookies['mb_auth_user'] = JSON.stringify(user);
    reqCookies['mb_session_token'] = 'simulated-token-xyz';
  }

  const result = middleware({
    pathname: location.pathname,
    cookies: reqCookies
  });

  if (!result.next && result.redirect) {
    // Redirect using react-router
    return <Navigate to={result.redirect} state={{ from: location, message: "Debes iniciar sesión para acceder a tu perfil" }} replace />;
  }

  return <>{children}</>;
};
