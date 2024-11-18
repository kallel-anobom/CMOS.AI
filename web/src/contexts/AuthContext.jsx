import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        api.defaults.headers.Authorization = `Bearer ${storedToken}`;
      }
    } catch (error) {
      console.error("Erro ao acessar o localStorage:", error);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const response = await api.post("/login/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      setToken(access_token);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return {success: true };
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const register = async (username, email, password) => {
    try {
      if (!username ||!email ||!password) {
        return console.error("Todos os campos são obrigatórios.");
      }
      await api.post("/users/create/", { username, email, password });
    } catch (error) {
      console.error("Erro ao realizar registro:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete api.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
