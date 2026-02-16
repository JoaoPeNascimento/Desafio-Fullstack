import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 1. Definimos a tipagem do nosso estado e das ações
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// 2. Criamos a store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      // Ação de Login: salva o token e marca como autenticado
      login: (token: string) =>
        set({
          token,
          isAuthenticated: true,
        }),

      // Ação de Logout: limpa tudo
      logout: () =>
        set({
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // Nome da chave que ficará salva no localStorage
      storage: createJSONStorage(() => localStorage), // (Opcional) Define onde salvar. O padrão já é localStorage.
    },
  ),
);
