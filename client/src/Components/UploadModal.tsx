// client/src/Components/UploadModal.tsx  
import { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import UploadIcon from "../assets/uploadIcon.svg?react";
import DeleteIcon from "../assets/deleteIcon.svg?react";

export default function UploadModal({ type, isOpen, onClose, onSuccess, }: { type: "painting" | "photograph"; isOpen: boolean; onClose: () => void; onSuccess?: () => void; }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { accessToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { apiFetch } = useAuth();

  // Central cleanup for file, title, description & preview
  function clearFileAndState() {
    setFile(null);         // triggers useEffect -> revokes preview URL
    setTitle("");
    setDescription("");
    setStatus(null);
  }

  // Create preview URL on file change
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return null;
      });
    }
  }, [file]);

  if (!isOpen) return null;

  async function handleUpload() {
    if (!file || !accessToken) return;

    async function resizeImage(
      file: File,
      targetWidth: number,
      quality = 0.9
    ): Promise<File> {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const scale = targetWidth / img.width;
          const targetHeight = img.height * scale;

          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas context not available"));

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedFile = new File(
                  [blob],
                  `${targetWidth}w_${file.name}`, // prefix with width for clarity
                  { type: blob.type, lastModified: Date.now() }
                );
                resolve(resizedFile);
              } else {
                reject(new Error("Canvas blob conversion failed"));
              }
            },
            "image/jpeg",
            quality
          );
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });
    }

    try {
      // Resize
      const thumbnail = await resizeImage(file, 250); // thumbnail has 250px width
      const medium = await resizeImage(file, 1200);  // medium has up to 1200px
      const original = file; // original file (untouched)

      // Get all presigned URLs in one request
      const res = await apiFetch(`${API_URL}/uploads/presign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ext: file.name.split(".").pop()?.toLowerCase(),
          contentType: file.type,
        }),
      });

      if (!res.ok) throw new Error("Failed to get presigned URLs");
      const { keys, urls } = await res.json();

      // Upload each version
      await Promise.all([
        fetch(urls.original, {
          method: "PUT",
          headers: { "Content-Type": original.type },
          body: original,
        }),
        fetch(urls.medium, {
          method: "PUT",
          headers: { "Content-Type": medium.type }, // medium = JPEG
          body: medium,
        }),
        fetch(urls.thumbnail, {
          method: "PUT",
          headers: { "Content-Type": thumbnail.type }, // thumbnail = JPEG
          body: thumbnail,
        }),
      ]);

      // Save record in MongoDB
      await fetch(`${API_URL}/uploads/record`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          type,
          fileKey: keys.original,
          sizes: {
            medium: keys.medium,
            thumbnail: keys.thumbnail,
          },
        }),
      });

      setStatus("Upload successful!");
      if (onSuccess) onSuccess();

      setTimeout(() => {
        clearFileAndState();
        onClose();
      }, 600);
    } catch (err: any) {
      console.error(err);
      setStatus("Upload failed: " + err.message);
    }
  }

  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) { clearFileAndState(); onClose(); } }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      {/* Modal container */}
      <div className="relative w-full max-w-[550px] px-8 py-8 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-xl dark:shadow-xl/30">

        <h1 className="font-semibold text-center text-2xl">Publish {type}</h1>
        {/* Close button */}
        <button onClick={() => { clearFileAndState(); onClose(); }} className="text-lg absolute top-3 right-3">
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
              {status && (
                <p
                  className={`text-center font-semibold ${status.includes("successful") ? "text-emerald-400" : "text-red-500"
                    }`}
                >
                  {status}
                </p>
              )}
            </div>
            <button onClick={handleUpload} disabled={!file || !title} className="btn btn-primary w-full max-w-[80px]">
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}