// client/src/pages/Profile.tsx
import { useAuth } from "../../Components/authContext"
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import UploadModal from "../../Components/UploadModal";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"painting" | "photograph">("painting");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function openUpload(type: "painting" | "photograph") {
    setUploadType(type);
    setUploadOpen(true);
  }

  return (
    <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5 mt-10">
      <Outlet context={{ openUpload }} /> {/* Renders Favorites, MyPaintings, or MyPhotographs */}

      <UploadModal
        type={uploadType}
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />
    </div>
  )
}