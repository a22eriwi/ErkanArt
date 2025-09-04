// client/src/Components/authContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  isApproved: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // try refreshing on mount
  useEffect(() => {
    refresh();
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();

    setAccessToken(data.accessToken);
    setUser(data.user);
    setIsLoggedIn(true);
  }

  async function refresh() {
    try {
      const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        setIsLoggedIn(false);
        setAccessToken(null);
        return;
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      setUser(data.user);
      setIsLoggedIn(true);
    }
    catch (err) {
      console.error("Refresh failed", err);
      setUser(null);
      setIsLoggedIn(false);
      setAccessToken(null);
    }
  }

  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsLoggedIn(false);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}