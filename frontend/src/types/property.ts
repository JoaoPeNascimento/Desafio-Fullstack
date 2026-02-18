export interface PropertyDTO {
  id: number;
  name: string;
  description: string;
  type: "APARTAMENTO" | "CASA" | "TERRENO";
  value: number;
  area: number;
  bedrooms: number;
  address: string;
  city: string;
  state: string;
  active: boolean;
  brokerId: number;
  brokerName: string;
}

export interface PropertyCreateDTO {
  name: string;
  description: string;
  type: "APARTAMENTO" | "CASA" | "TERRENO";
  value: number;
  area: number;
  bedrooms: number;
  address: string;
  city: string;
  state: string;
}

export interface PropertyUpdateDTO {
  name?: string;
  description?: string;
  type?: "APARTAMENTO" | "CASA" | "TERRENO";
  value?: number;
  area?: number;
  bedrooms?: number;
  address?: string;
  city?: string;
  state?: string;
  brokerId?: number;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PropertyFilter {
  name?: string;
  type?: "APARTAMENTO" | "CASA" | "TERRENO";
  minValue?: number;
  maxValue?: number;
  minBedrooms?: number;
}
