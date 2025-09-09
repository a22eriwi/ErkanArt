// src/App.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import LoginModal from "./Components/LoginModal";
import RegisterModal from "./Components/RegisterModal";
import { AuthProvider } from "./Components/authContext";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  return (
    <AuthProvider>
      <div className="bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-white pb-8 min-h-screen">
        <Header onOpenLogin={() => setLoginOpen(true)} />
        <main>
          <Outlet />
        </main>
        <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} onSwitchToRegister={() => { setLoginOpen(false); setRegisterOpen(true); }} />
        <RegisterModal isOpen={registerOpen} onClose={() => setRegisterOpen(false)} onSwitchToLogin={() => { setRegisterOpen(false); setLoginOpen(true); }} />
      </div>
    </AuthProvider>
  );
}