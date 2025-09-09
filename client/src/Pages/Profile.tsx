// client/src/pages/Profile.tsx
import { useAuth } from "../Components/authContext"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Upload } from "../Components/Upload";

export default function Profile() {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"favorites" | "paintings" | "photographs">("favorites");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5">
        <h1 className="text-2xl font-semibold mt-10 text-center"> {user?.firstName} {user?.lastName}</h1>

        {/* Tabs */}
        <div className="flex gap-2 justify-center mt-5">
          <button onClick={() => setActiveTab("favorites")} className={`px-4 py-3 text-sm font-semibold rounded-md
          ${activeTab === "favorites" ? "underline decoration-2 underline-offset-10" : "dark:hover:bg-gray-800 hover:bg-gray-200/70"}`}>
            Favorites
          </button>

          <button onClick={() => setActiveTab("paintings")} className={`px-4 py-3 text-sm font-semibold rounded-md
          ${activeTab === "paintings" ? "underline decoration-2 underline-offset-10" : "dark:hover:bg-gray-800 hover:bg-gray-200/70"}`}>
            Paintings
          </button>

          <button onClick={() => setActiveTab("photographs")} className={`px-4 py-3 text-sm font-semibold rounded-md
          ${activeTab === "photographs" ? "underline decoration-2 underline-offset-10" : "dark:hover:bg-gray-800 hover:bg-gray-200/70"}`}>
            Photographs
          </button>
        </div>

        <div className="mt-10 text-center">
          {activeTab === "favorites" &&
            <div>
              <p>Favorites</p>
            </div>
          }
          {activeTab === "paintings" &&
            <div>
              <Upload type="painting" />
            </div>
          }
          {activeTab === "photographs" &&
            <div>
              <Upload type="photograph" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}