// client/src/Pages/Profile/MyPhotographs.tsx
import { useAuth } from "../../Components/authContext"
import AddIcon from "../../assets/AddIcon.svg?react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProfileContext } from "./Profile";

type Upload = {
    _id: string;
    title: string;
    description?: string;
    type: "painting" | "photograph";
    url: string; // original
    sizes?: {
        thumbnail?: string | null;
        medium?: string | null;
    };
};

export default function MyPhotographs() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { user, accessToken } = useAuth();
    const { openUpload, setOnUploadSuccess } = useOutletContext<ProfileContext>();
    const [uploads, setUploads] = useState<Upload[]>([]);

    async function fetchUploads() {
        try {
            const res = await fetch(`${API_URL}/uploads/uploaded?type=photograph`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch uploads");
            const data = await res.json();
            setUploads(data);
        } catch (err) {
            console.error("Error loading uploads:", err);
        }
    }

    useEffect(() => {
        if (!accessToken) return;

        fetchUploads();
        // register callback for UploadModal success
        setOnUploadSuccess(() => fetchUploads);

        // cleanup on unmount
        return () => setOnUploadSuccess(null);
    }, [accessToken]);

    return (
        <div>
            {user?.isApproved ? (
                <>
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <h1 className="font-semibold text-2xl">My photographs</h1>
                        <button
                            onClick={() => openUpload("photograph")}
                            className="p-2 flex items-center gap-1 btn btn-secondary"
                        >
                            <AddIcon className="size-6" />
                        </button>
                    </div>

                    {/* Uploaded photos */}
                    {uploads.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {uploads.map((u) => {
                                const imgSrc = u.sizes?.thumbnail || u.url; // Prioritize thumbnail
                                return (
                                    <div key={u._id} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800">
                                        <img src={imgSrc} alt={u.title} className="w-full h-48 object-cover" loading="lazy" />
                                        <div className="p-2">
                                            <h2 className="font-semibold text-sm">{u.title}</h2>
                                            {u.description && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {u.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            You haven’t uploaded any photographs yet.
                        </p>
                    )}
                </>
            ) : (
                <p>Your account is awaiting approval. You cannot upload yet.</p>
            )}
        </div>
    );
}