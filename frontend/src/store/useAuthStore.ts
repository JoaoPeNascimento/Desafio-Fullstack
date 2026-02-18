import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt";

interface AuthState {
  token: string | null;
  role: string | null;
  id: number | null;
  isAuthenticated: boolean;

  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      id: null,
      isAuthenticated: false,

      login: (token: string) => {
        const decoded = jwtDecode<JwtPayload>(token);

        set({
          token,
          role: decoded.role,
          id: decoded.id,
          isAuthenticated: true,
        });
      },

      logout: () =>
        set({
          token: null,
          role: null,
          id: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
