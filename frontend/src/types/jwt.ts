export interface JwtPayload {
  sub: string;
  role: "ADMIN" | "CLIENTE" | "CORRETOR";
  id: number;
  exp: number;
}
