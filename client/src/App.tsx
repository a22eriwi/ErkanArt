// src/App.tsx
import { useState } from "react";
import { Outlet} from "react-router-dom";
import Header from "./Components/Header";
import LoginModal from "./Components/LoginModal";

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
      <div className="bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-gray-200 pb-8">
          <Header onOpenLogin={() => setLoginOpen(true)} />
      <main>
        <Outlet />
      </main>
         <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}