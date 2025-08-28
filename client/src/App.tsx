// src/App.tsx
import { Outlet} from "react-router-dom";
import Header from "./Components/Header";

export default function App() {
  return (
      <div className="bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-gray-200 pb-8">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}