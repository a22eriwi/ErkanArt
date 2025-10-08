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
import UploadDetailPage from "./components/detailPage.tsx";

import Favorites from "./pages/profile/favorites.tsx";
import MyPaintings from "./pages/profile/myPaintings.tsx";
import MyPhotographs from "./pages/profile/myPhotographs.tsx";

const router = createBrowserRouter([
  {
    path: "/", element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "artists", element: <Artists /> },
      { path: "paintings", element: <Paintings /> },
      { path: "photography", element: <Photography /> },
      
      //Public detail page
      { path: ":type/:id", element: <UploadDetailPage /> },

      // Profile parent route
      {
        path: "/:username",
        element: <Profile />, // renders <Outlet />
        children: [
          { path: "favorites", element: <Favorites /> },
          { path: "paintings", element: <MyPaintings /> },
          { path: "photographs", element: <MyPhotographs /> },

          // Detail inside profile (user-specific)
          { path: ":type/:id", element: <UploadDetailPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
