import { LoginDTO, RegisterDTO, TokenDTO } from "../types/auth";

const API_BASE_URL = "http://localhost:8080/api";

export const authService = {
  async login(data: LoginDTO): Promise<TokenDTO> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao realizar login");
    }

    return await res.json();
  },

  async register(data: RegisterDTO): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Falha ao realizar registro");
    }
  },
};
