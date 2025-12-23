import api from "./api";

export const register = async (email, password) => {
  const response = await api.post("/register", {
    email,
    password,
  });

  return response.data;
};



export const login = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (!response.data || !response.data.token) {
      throw new Error("Token manquant");
    }

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("LOGIN API ERROR:", error);
    throw error; // 🔴 OBLIGATOIRE pour déclencher le catch du composant
  }
};
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
