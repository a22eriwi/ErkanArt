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
  apiFetch: (url: string, options?: RequestInit) => Promise<Response>;
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

  async function logout() {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setIsLoggedIn(false);
    setAccessToken(null);
  }

  async function refresh(): Promise<string | null> {
    try {
      const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setUser(null);
        setIsLoggedIn(false);
        setAccessToken(null);
        return null;
      }

      const data = await res.json();
      setAccessToken(data.accessToken);
      setUser(data.user);
      setIsLoggedIn(true);
      return data.accessToken; // ✅ return new token
    } catch (err) {
      console.error("Refresh failed", err);
      setUser(null);
      setIsLoggedIn(false);
      setAccessToken(null);
      return null;
    }
  }

  async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers: Record<string, string> = {};

    if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers[key] = value as string;
      }
    }

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    // If token expired
    if (res.status === 401) {
      const newToken = await refresh(); // ✅ get fresh token

      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`; // ✅ use returned token
        res = await fetch(url, {
          ...options,
          headers,
          credentials: "include",
        });
      }
    }

    return res;
  }
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, accessToken, login, logout, apiFetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}