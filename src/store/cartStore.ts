import { create } from 'zustand';
import { Product } from '../constants/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, quantity = 1) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      set({
        items: currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
    } else {
      set({ items: [...currentItems, { product, quantity }] });
    }
    // Automatically open drawer when adding item for visual feedback
    set({ isOpen: true });
  },

  removeItem: (productId) => {
    set({
      items: get().items.filter(item => item.product.id !== productId)
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    });
  },

  clearCart: () => set({ items: [] }),
  setIsOpen: (isOpen) => set({ isOpen }),

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }
}));
