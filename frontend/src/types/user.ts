export interface UserDTO {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "CORRETOR" | "CLIENTE";
}

export interface UserUpdateDTO {
  name?: string;
  password?: string;
}
