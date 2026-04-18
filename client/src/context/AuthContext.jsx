import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("/api/auth/me");
        setUser(response.data.user);
      } catch {
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [token]);

  const saveSession = (nextToken, nextUser) => {
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (payload) => {
    const response = await api.post("/api/auth/login", payload);
    saveSession(response.data.token, response.data.user);
    return response.data;
  };

  const signup = async (payload) => {
    const response = await api.post("/api/auth/signup", payload);
    saveSession(response.data.token, response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = { user, token, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
