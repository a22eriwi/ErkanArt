import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import './index.css';

import About from './Pages/About.tsx';
import Artists from './Pages/Artists.tsx';
import Home from './Pages/Home.tsx';
import Paintings from './Pages/Paintings.tsx';
import Photography from "./Pages/Photography.tsx";
import Profile from "./Pages/Profile.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "About", element: <About /> },
      { path: "Artists", element: <Artists /> },
      { path: "Paintings", element: <Paintings /> },
      { path: "Photography", element: <Photography /> },
      { path: "Profile", element: <Profile /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
