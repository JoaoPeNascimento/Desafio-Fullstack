import { useAuthStore } from "../store/useAuthStore";
import { PropertyDTO } from "../types/property";
import { UserCreateDTO, UserDTO, UserUpdateDTO } from "../types/user";

const API_BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const userService = {
  async getMe(): Promise<UserDTO> {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      throw new Error("Falha ao buscar informações do usuário");
    }

    return res.json();
  },

  async update(dto: UserUpdateDTO): Promise<UserDTO> {
    const res = await fetch(`${API_BASE_URL}/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error("Falha ao atualizar usuário");
    return res.json();
  },

  async create(dto: UserCreateDTO): Promise<UserDTO> {
    const res = await fetch(`${API_BASE_URL}/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (res.status === 403)
      throw new Error(
        "Acesso negado: Apenas administradores podem criar usuários.",
      );
    if (!res.ok) throw new Error("Falha ao criar usuário");

    return res.json();
  },

  async getFavorites(): Promise<PropertyDTO[]> {
    const res = await fetch(`${API_BASE_URL}/favorites`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao buscar favoritos");
    return res.json();
  },

  async addFavorite(propertyId: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao adicionar favorito");
  },

  async removeFavorite(propertyId: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/favorites/${propertyId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao remover favorito");
  },
};
