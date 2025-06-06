import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { ShopFilters, Order, Address, PaymentMethod } from '../types';

interface ShopState {
  filters: ShopFilters;
  orders: Order[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  loading: boolean;
  error: string | null;
  setFilters: (filters: Partial<ShopFilters>) => void;
  resetFilters: () => void;
  fetchOrders: () => Promise<void>;
  fetchAddresses: () => Promise<void>;
  fetchPaymentMethods: () => Promise<void>;
  addAddress: (address: Omit<Address, 'id' | 'userId'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id' | 'userId'>) => Promise<void>;
  updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => Promise<void>;
  deletePaymentMethod: (id: string) => Promise<void>;
}

const defaultFilters: ShopFilters = {
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'newest',
  searchQuery: ''
};

export const useShopStore = create<ShopState>((set, get) => ({
  filters: defaultFilters,
  orders: [],
  addresses: [],
  paymentMethods: [],
  loading: false,
  error: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  fetchOrders: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ orders: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchAddresses: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) throw error;
      set({ addresses: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchPaymentMethods: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) throw error;
      set({ paymentMethods: data || [] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addAddress: async (address) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('addresses')
        .insert([address]);

      if (error) throw error;
      await get().fetchAddresses();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateAddress: async (id, address) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('addresses')
        .update(address)
        .eq('id', id);

      if (error) throw error;
      await get().fetchAddresses();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteAddress: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await get().fetchAddresses();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addPaymentMethod: async (method) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('payment_methods')
        .insert([method]);

      if (error) throw error;
      await get().fetchPaymentMethods();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePaymentMethod: async (id, method) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('payment_methods')
        .update(method)
        .eq('id', id);

      if (error) throw error;
      await get().fetchPaymentMethods();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deletePaymentMethod: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await get().fetchPaymentMethods();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));