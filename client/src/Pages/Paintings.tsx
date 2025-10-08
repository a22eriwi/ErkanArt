// client/src/pages/paintings.tsx
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import type { Upload } from "../types/upload";
import { useAuth } from "../components/authContext";
import { NavLink } from "react-router-dom";
import FavoriteIcon from "../assets/favoriteIcon.svg?react";
import FilledFavoriteIcon from "../assets/filledFavoriteIcon.svg?react";

export default function Paintings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [uploads, setUploads] = useState<Upload[]>([]);
  const { apiFetch } = useAuth();
  const { user } = useAuth();

  async function fetchUploads() {
    try {
      const res = await apiFetch(`${API_URL}/uploads/public?type=painting`);
      if (!res.ok) throw new Error("Failed to fetch uploads");
      const data = await res.json();
      setUploads(data);
    } catch (err) {
      console.error("Error loading uploads:", err);
    }
  }

  async function toggleFavorite(id: string, _favorited: boolean) {
    try {
      const res = await apiFetch(`${API_URL}/uploads/${id}/favorite`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to toggle favorite");
      const data = await res.json();

      setUploads((prev) =>
        prev.map((u) =>
          u._id === id ? { ...u, isFavorited: data.favorited } : u
        )
      );
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  }

  useEffect(() => {
    if (!setUploads) return;

    fetchUploads();

  }, [setUploads]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1710: 4,
    1400: 3,
    800: 2,
  };

  return (
    <div className="lg:max-w-[90vw] 2xl:max-w-[80vw] 3xl:max-w-[65vw] m-auto px-5">

      {/* Uploaded paintings */}
      {uploads.length > 0 && (
        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
          {uploads.map((u) => {
            const imgSrc = u.sizes?.thumbnail || u.url;
            const ownerName = u.owner ? `${u.owner.firstName} ${u.owner.lastName}` : "Unknown";
            return (
              <div key={u._id} className=" overflow-hidden mb-2">
                <div className="group relative ">
                  {/* div that creates hover effect  */}
                  <NavLink to={`/paintings/${u._id}`}>
                    <img src={imgSrc} alt={u.title} loading="lazy" className=" rounded-lg w-[100%] h-[100%]" />
                    <div className="bg-black absolute top-0 right-0 w-[100%] h-[100%] rounded-lg opacity-0 group-hover:opacity-30 transition ease-in-out"></div>
                  </NavLink>
                  <div className="absolute top-2 right-2 flex cursor-pointer group-hover:opacity-100">
                    {/* Favorite button */}
                    {user && (
                      <button onClick={() => toggleFavorite(u._id, u.isFavorited || false)} className="btn btn-secondary p-1.5">
                        {u.isFavorited ? (
                          <FilledFavoriteIcon className="size-5" />
                        ) : (
                          <FavoriteIcon className="size-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <section className="py-2 px-1.5 cursor-default">
                  <h3 className="mt-1 text-sm">{ownerName}</h3>
                  <h3 className="mt-1 text-sm font-semibold italic">{u.title}</h3>
                  {u.description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {u.description}
                    </p>
                  )}
                </section>
              </div>
            );
          })}
        </Masonry>
      )}
    </div>
  );
}