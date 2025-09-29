// client/src/components/uploadDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./authContext";
import type { Upload } from "../types/upload";
import Masonry from "react-masonry-css";

export default function UploadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { apiFetch } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

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
        const res = await apiFetch(`${API_URL}/uploads/public?type=painting`);
        if (!res.ok) throw new Error("Failed to fetch uploads");
        const data = await res.json();
        setUploads(data);
      } catch (err) {
        console.error("Error fetching uploads:", err);
      }
    }
    fetchAll();
  }, []);

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 4,
    1710: 4,
    1400: 3,
    800: 2,
  };

  if (!upload) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="lg:max-w-[90vw] 2xl:max-w-[80vw] 3xl:max-w-[65vw] m-auto px-5 mt-10">
      {/* Left side: selected upload */}
      <div className="flex-1 max-w-[600px]">
        <img
          src={upload.sizes?.medium || upload.url}
          alt={upload.title}
          className="w-full rounded-lg mb-6"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">{upload.title}</h2>
          {upload.description && (
            <p className="text-gray-600 dark:text-gray-300">{upload.description}</p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            by {upload.owner.firstName} {upload.owner.lastName}
          </p>
        </div>
      </div>

      {/* Right side: masonry feed */}
      <div className="flex-[2]">
        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
          {uploads
            .filter((u) => u._id !== upload._id)
            .map((u) => (
              <div
                key={u._id}
                className="cursor-pointer"
                onClick={() => navigate(`/uploads/${u._id}`)}
              >
                <img
                  src={u.sizes?.medium || u.url}
                  alt={u.title}
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
        </Masonry>
      </div>
    </div>
  );
}