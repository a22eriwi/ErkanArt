// client/src/components/detailPage.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import type { Upload } from "../types/upload";
import Masonry from "react-masonry-css";

export default function UploadDetailPage() {
  const { id, username, type } = useParams<{ id: string; username: string; type: "painting" | "photograph" }>();
  const cleanType = type!.slice(0, -1); // "painting" or "photograph"
  const location = useLocation();
  const navigate = useNavigate();
  const { apiFetch, user } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  // detect if -> in profile (user's own uploads)
  const isOwnProfile = username === `${user?.firstName.toLowerCase()}-${user?.lastName.toLowerCase()}`;

  const [upload, setUpload] = useState<Upload | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchUpload() {
      try {
        const res = await apiFetch(`${API_URL}/uploads/${id}`);
        if (!res.ok) throw new Error("Failed to fetch upload");
        const data = await res.json();
        setUpload(data);
      } catch (err) {
        console.error("Error fetching upload:", err);
      }
    }

    fetchUpload();
  }, [id]);

  useEffect(() => {
    async function fetchAll() {
      try {

        const route = isOwnProfile ? "user" : "public";
        const res = await apiFetch(`${API_URL}/uploads/${route}?type=${cleanType}`);
        if (!res.ok) throw new Error("Failed to fetch uploads");
        const data = await res.json();
        setUploads(data);
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    }
    fetchAll();
  }, [isOwnProfile, location.pathname]);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1710: 4,
    1400: 3,
    800: 2,
  };

  if (!upload) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="lg:max-w-[90vw] 2xl:max-w-[80vw] 3xl:max-w-[65vw] m-auto px-5 lg:px-0">
      {/* Left side: selected upload */}
      <div className="grid gap-5 lg:flex mb-15">
        <img src={upload.sizes?.medium || upload.url} alt={upload.title} className="rounded-lg max-h-[70vh] 2xl:max-h-[80vh] lg:max-w-[65vw] 2xl:max-w-[55vw] 3xl:max-w-[50vw]" />
        <div>
          <p className="text-sm">
            {upload.owner.firstName} {upload.owner.lastName}
          </p>
          <h2 className="text-xl md:text-2xl font-semibold mt-2 italic break-words">{upload.title}</h2>
          {upload.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-2">{upload.description}</p>
          )}
        </div>
      </div>

      {/* Right side: masonry feed */}
      <div className="flex-[2]">
        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
          {uploads
            .filter((u) => u._id !== upload._id)
            .map((u) => (
              <div key={u._id} className="cursor-pointer relative group" onClick={() => navigate(`/${username}/${type}/${u._id}`)}>
                <img src={u.sizes?.medium || u.url} alt={u.title} className="rounded-lg object-cover" />
                <div className="bg-black absolute top-0 right-0 w-[100%] h-[100%] rounded-lg opacity-0 group-hover:opacity-30 transition ease-in-out"></div>
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
}