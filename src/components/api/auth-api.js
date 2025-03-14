import api from "@/components/api/api";

export const csrfCookie = () => api.get("sanctum/csrf-cookie");

export const login = (credentials) => api.post("/auth/login",credentials);
export const logout = () => api.post("/auth/logout");
export const register = (credentials) => api.post("/auth/register",credentials);

export const getUser = () => api.get("api/user");