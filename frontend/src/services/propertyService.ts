import { useAuthStore } from "../store/useAuthStore";
import {
  Page,
  PropertyCreateDTO,
  PropertyDTO,
  PropertyFilter,
  PropertyUpdateDTO,
} from "../types/property";

const API_BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = useAuthStore.getState().token;
  if (!token) throw new Error("Usuário não autenticado");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const propertyService = {
  // GET com paginação e filtros
  async getAll(
    filters: PropertyFilter = {},
    page = 0,
    size = 10,
    sort = "id,desc",
  ): Promise<Page<PropertyDTO>> {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("size", size.toString());
    params.append("sort", sort);

    if (filters.name) params.append("name", filters.name);
    if (filters.type) params.append("type", filters.type);

    if (filters.minValue)
      params.append("minPrice", filters.minValue.toString());
    if (filters.maxValue)
      params.append("maxPrice", filters.maxValue.toString());

    if (filters.minBedrooms)
      params.append("minBedrooms", filters.minBedrooms.toString());

    const res = await fetch(`${API_BASE_URL}/property?${params.toString()}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao buscar propriedades");

    return res.json();
  },

  async getById(id: number): Promise<PropertyDTO> {
    const res = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao buscar propriedade por ID");
    return res.json();
  },

  async getUserProperties(): Promise<PropertyDTO[]> {
    const res = await fetch(`${API_BASE_URL}/property/getUserProperties`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao buscar propriedades do usuário");
    return res.json();
  },

  async create(dto: PropertyCreateDTO): Promise<PropertyDTO> {
    const res = await fetch(`${API_BASE_URL}/property`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error("Falha ao criar propriedade");
    return res.json();
  },

  async update(id: number, dto: PropertyUpdateDTO): Promise<PropertyDTO> {
    const res = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(dto),
    });

    if (!res.ok) throw new Error("Falha ao atualizar propriedade");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao deletar propriedade");
  },

  async toggleStatus(id: number): Promise<PropertyDTO> {
    const res = await fetch(`${API_BASE_URL}/property/status/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Falha ao alterar status");
    return res.json();
  },
};
