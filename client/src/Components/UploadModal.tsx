// client/src/Components/UploadModal.tsx  
import { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import UploadIcon from "../assets/uploadIcon.svg?react";
import DeleteIcon from "../assets/deleteIcon.svg?react";

export default function UploadModal({ type, isOpen, onClose, onSuccess, }: { type: "painting" | "photograph"; isOpen: boolean; onClose: () => void;  onSuccess?: () => void;  }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { accessToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Create preview URL on file change
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // cleanup
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

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

      // If upload successful Close modal + reset state
      setStatus("Upload successful!");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setFile(null);
        setTitle("");
        setDescription("");
        setStatus(null);
        onClose();
      }, 600);

    } catch (err: any) {
      console.error(err);
      setStatus("Upload failed: " + err.message);
    }
  }

  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) { onClose(); setFile(null); setTitle(""); setDescription(""); } }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      {/* Modal container */}
      <div className="relative w-full max-w-[550px] px-8 py-8 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-xl dark:shadow-xl/30">

        <h1 className="font-semibold text-center text-2xl">Publish {type}</h1>
        {/* Close button */}
        <button onClick={() => { onClose(); setFile(null); setTitle(""); setDescription(""); }} className="text-lg absolute top-3 right-3">
          ✕
        </button>

        <div className="flex justify-center flex-col m-auto sm:max-w-lg text-sm mt-6">
          {previewUrl ? (
            <>
              <div className="flex justify-center">
                <div className="max-w-xs relative">
                  <img src={previewUrl} alt="Preview" className="rounded-md h-full w-full object-contain" />
                  <div onClick={() => setFile(null)} className="btn btn-accent absolute top-2 right-2 px-1 py-1 cursor-pointer">
                    <DeleteIcon className="size-5" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="relative flex flex-col items-center justify-center outline-dashed cursor-pointer p-10 h-[300px] w-xs text-input"
                onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files?.[0]) { setFile(e.dataTransfer.files[0]); } }}>
                <UploadIcon className="size-8 text-gray-500 dark:text-gray-400" />
                <span className=" text-gray-500 dark:text-gray-400 mt-2">
                  Choose a file or drag and drop it here
                </span>
                {/* Hidden file input that covers the whole div */}
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>
          )}

          <div className="flex justify-center mt-5">
            <div className="text-left w-full">
              {/* Title input */}
              <label htmlFor="title" className="text-sm">
                Title
              </label>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`(Required)`} className="text-input px-3 py-4 mb-4" />

              {/* Description input */}
              <label htmlFor="description" className="text-sm">
                Description
              </label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="(Optional)" rows={4} className="text-input px-3 py-4">
              </textarea>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              {status && <p className="text-center text-emerald-400 font-semibold">{status}</p>}
            </div>
            <div className="flex gap-3">
              {/* upload button & cancel button */}
              <button onClick={() => { onClose(); setFile(null); setTitle(""); setDescription(""); }} className="btn btn-accent w-full max-w-[80px]">
                Cancel
              </button>
              <button onClick={handleUpload} disabled={!file || !title} className="btn btn-primary w-full max-w-[80px]">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}