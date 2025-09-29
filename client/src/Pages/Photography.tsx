// client/src/pages/photography.tsx
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import type { Upload } from "../types/upload";

export default function Photography() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [uploads, setUploads] = useState<Upload[]>([]);

  async function fetchUploads() {
    try {
      const res = await fetch(`${API_URL}/uploads/public?type=photograph`);
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
    1710: 4,
    1400: 3,
    800: 2,
  };

  return (
    <div className="lg:max-w-[90vw] 2xl:max-w-[80vw] 3xl:max-w-[65vw] m-auto px-5 mt-10">

      {/* Uploaded photos */}
      {uploads.length > 0 && (
        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
          {uploads.map((u) => {
            const imgSrc = u.sizes?.thumbnail || u.url;
            const ownerName = u.owner ? `${u.owner.firstName} ${u.owner.lastName}` : "Unknown";
            return (
              <div key={u._id} className=" overflow-hidden relative mb-2">
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