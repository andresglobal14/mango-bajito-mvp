import { create } from 'zustand';

export interface User {
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUserDetail: (details: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email, name) => {
    const defaultUser: User = {
      email,
      name,
      phone: "+58 (412) 555-0199",
      address: "Urbanización Guaparo, Valencia, Edo. Carabobo"
    };
    set({ user: defaultUser, isAuthenticated: true });
    localStorage.setItem('mb_auth_user', JSON.stringify(defaultUser));
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('mb_auth_user');
  },

  updateUserDetail: (details) => {
    set((state) => {
      if (!state.user) return state;
      const updatedUser = { ...state.user, ...details };
      localStorage.setItem('mb_auth_user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  }
}));

// Initialize from localStorage if exists
if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('mb_auth_user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      useAuthStore.setState({ user: parsed, isAuthenticated: true });
    } catch (e) {
      // Clear invalid storage
      localStorage.removeItem('mb_auth_user');
    }
  }
}
