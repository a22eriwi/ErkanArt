// client/src/pages/paintings.tsx
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import type { Upload } from "../types/upload";
import { useAuth } from "../components/authContext";

export default function Paintings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [uploads, setUploads] = useState<Upload[]>([]);
  const { apiFetch } = useAuth();

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

  useEffect(() => {
    if (!setUploads) return;

    fetchUploads();

  }, [setUploads]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1024: 4,
    850: 3,
    600: 2,
  };

  return (
    <div className="lg:max-w-[900px] xl:max-w-[1100px] m-auto px-5 mt-10">

      {/* Uploaded paintings */}
      {uploads.length > 0 && (
        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
          {uploads.map((u) => {
            const imgSrc = u.sizes?.thumbnail || u.url;
            const ownerName = u.owner ? `${u.owner.firstName} ${u.owner.lastName}` : "Unknown";
            return (
              <div key={u._id} className=" overflow-hidden relative max-w-[250px]">
                <div className="group">
                  <img src={imgSrc} alt={u.title} loading="lazy" className="h-auto object-cover group-hover:opacity-70 transition-transform duration-300 hover:cursor-pointer rounded-lg" />
                  {/* Overlay buttons */}

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