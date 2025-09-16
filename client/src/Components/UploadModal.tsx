// client/src/Components/UploadModal.tsx  
import { useState } from "react";
import { useAuth } from "./authContext";
import UploadIcon from "../assets/uploadIcon.svg?react";

export default function UploadModal({ type, isOpen, onClose, }: { type: "painting" | "photograph"; isOpen: boolean; onClose: () => void; }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { accessToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  async function handleUpload() {
    if (!file || !accessToken) return;

    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      const contentType = file.type;

      // Get presigned URL
      const res = await fetch(`${API_URL}/uploads/presign`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ext, contentType }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URL");

      const { url, key } = await res.json();

      // Upload to R2
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": contentType },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Failed to upload file to R2");

      // Save record in MongoDB
      await fetch(`${API_URL}/uploads/record`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          type, // "painting" or "photograph"
          fileKey: key,
        }),
      });

      setStatus("Upload successful!");
    } catch (err: any) {
      console.error(err);
      setStatus("Upload failed: " + err.message);
    }
  }

  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      {/* Modal container */}
      <div className="relative w-full max-w-[600px] px-8 py-12 sm:px-14 sm:py-16 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-xl dark:shadow-xl/30">

        {/* Close button */}
        <button onClick={onClose} className="text-lg absolute top-3 right-3">
          ✕
        </button>

        <div className="flex justify-center flex-col m-auto sm:max-w-lg text-sm">

          {/* img input */}
          <div className="flex justify-center">
            <div className="relative flex flex-col items-center justify-center outline-dashed cursor-pointer p-10 h-[300px] w-xs text-input"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) {
                  setFile(e.dataTransfer.files[0]);
                }
              }}
            >
              <UploadIcon className="size-8 text-gray-500 dark:text-gray-400" />
              <span className=" text-gray-500 dark:text-gray-400 mt-2">
                Choose a file or drag and drop it here
              </span>

              {/* Hidden file input that covers the whole div */}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <div className="text-left w-full ">
              {/* Title input */}
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`(Required)`}
                className="text-input px-3 py-4 mb-4"
              />

              {/* Description input */}
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="(Optional)"
                rows={4}
                className="text-input px-3 py-4"
              ></textarea>
            </div>
          </div>
          {/* upload button */}
          <button onClick={handleUpload} disabled={!file || !title} className="btn btn-primary mt-5 w-full">
            Publish {type}
          </button>
          {status && <p>{status}</p>}
        </div>

      </div>
    </div>
  );
}