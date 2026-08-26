import { create } from "zustand";
import { persist } from "zustand/middleware";

// The token, and nothing else. The signed-in user is server data, so it is a
// query - copying it in here would be exactly the duplication the stage forbids.
type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clear: () => void;
};

// create<T>()(...) double-call: zustand's way of letting us set the type
// explicitly before passing the store creator function.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      // localStorage key persist saves this store under.
      name: "auth-storage",
      // Bumped because the stored shape lost its user field.
      version: 2,
    },
  ),
);
