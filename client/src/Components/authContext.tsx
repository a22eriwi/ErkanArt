// client/src/Components/authContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  email: string;
  role?: string;
  exp?: number;
  isApproved: boolean;
}

interface AuthContextType {
  user: DecodedUser | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DecodedUser | null>(null);
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
    const decoded: DecodedUser = jwtDecode(data.accessToken);
    setUser(decoded);
    setIsLoggedIn(true);
  }

  async function refresh() {
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
    const decoded: DecodedUser = jwtDecode(data.accessToken);
    setUser(decoded);
    setIsLoggedIn(true);
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