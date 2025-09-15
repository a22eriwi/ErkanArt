// client/src/pages/Profile.tsx
import { useAuth } from "../../Components/authContext"
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";


export default function Profile() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5 mt-10">
      <Outlet /> {/* Renders Favorites, MyPaintings, or MyPhotographs */}
    </div>
  )
}