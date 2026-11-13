import { useContext } from "react";
import { AuthContext } from "./authContextValue";

// me parece muy repetitivo añadirle todo el rato contexto asi que customhook para 
export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return contexto;
}