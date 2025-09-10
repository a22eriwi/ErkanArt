// client/src/Components/Upload.tsx  

import { useState } from "react";
import { useAuth } from "../Components/authContext";
import AddBox from "../assets/addBox.svg?react";

export function Upload({ type }: { type: "painting" | "photograph" }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const { accessToken } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    <div className="space-y-4">

      <div className="justify-center gap-8 grid grid-cols-1 sm:grid-cols-4">

        {/* img input */}
        <div
          className="relative flex flex-col col-span-2 items-center justify-center rounded-md outline-2 outline-dashed
           outline-gray-400 dark:outline-gray-600 bg-white dark:bg-gray-800/50 cursor-pointer hover:outline-sky-500"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              setFile(e.dataTransfer.files[0]);
            }
          }}
        >
          <AddBox className="size-8 text-gray-500 dark:text-gray-300" />
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

        <div className="text-left col-span-2">
          {/* Title input */}
          <label htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={`Add a title (required)`}
            className="m-auto w-full mb-5 mt-1 dark:bg-gray-800/50 bg-white block rounded-md px-3 py-2 outline-1
             outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"
          />

          {/* Description input */}
          <label htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description (optional)"
            rows={5}
            className="w-full mt-1 dark:bg-gray-800/50 bg-white block rounded-md px-3 py-2 outline-1 outline-gray-300
             dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 resize-none"
          ></textarea>
        </div>
      </div>


      {/* upload button */}
      <button
        onClick={handleUpload}
        disabled={!file || !title}
        className="btn btn-primary mt-3"
      >
        Publish {type}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
}