import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getUserRoles = () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const decoded = jwtDecode(token);
    return decoded.roles || [];
  } catch (e) {
    return [];
  }
};

export const isAdmin = () => {
  return getUserRoles().includes("ROLE_ADMIN");
};

export const logout = () => {
  localStorage.removeItem("token");
};
