import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  session: any;
  setUser: (user: User | null) => void;
  setSession: (session: any) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      signOut: async () => {
        try {
          await supabase.auth.signOut();
        } catch (error: any) {
          // If the error is session_not_found, we can safely ignore it
          // as the session is already invalid/expired
          if (error?.message?.includes('session_not_found')) {
            console.log('Session already expired, clearing local state');
          } else {
            console.error('Error during sign out:', error);
          }
        } finally {
          // Always clear the local state regardless of server response
          set({ user: null, session: null });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Initialize auth state from Supabase
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    useAuthStore.getState().setUser(session?.user || null);
    useAuthStore.getState().setSession(session);
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setSession(null);
  }
});