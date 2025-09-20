import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.tsx';
import './index.css';

import About from './pages/about.tsx';
import Artists from './pages/artists.tsx';
import Home from './pages/home.tsx';
import Paintings from './pages/paintings.tsx';
import Photography from "./pages/photography.tsx";
import Profile from "./pages/profile/profile.tsx";

import Favorites from "./pages/profile/favorites.tsx";
import MyPaintings from "./pages/profile/myPaintings.tsx";
import MyPhotographs from "./pages/profile/myPhotographs.tsx";

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
        // Profile parent route
      {
        path: "profile",
        element: <Profile />, // renders <Outlet />
        children: [
          { index: true, element: <Favorites /> }, // default subpage
          { path: "Favorites", element: <Favorites /> },
          { path: "myPaintings", element: <MyPaintings /> },
          { path: "myPhotographs", element: <MyPhotographs /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
