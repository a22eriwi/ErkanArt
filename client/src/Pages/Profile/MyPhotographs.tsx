// client/src/Pages/Profile/myPhotographs.tsx
import { useAuth } from "../../components/authContext"
import AddIcon from "../../assets/AddIcon.svg?react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProfileContext } from "./profile";
import UpdateModal from "../../components/updateModal";
import EditIcon from "../../assets/editIcon.svg?react";

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
    const [selectedUpload, setSelectedUpload] = useState<Upload | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);

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
                        <button onClick={() => openUpload("photograph")} className="p-2 flex items-center gap-1 btn btn-secondary">
                            <AddIcon className="size-6" />
                        </button>
                    </div>

                    {/* Uploaded photos */}
                    {uploads.length > 0 ? (
                        <div className="flex justify-center">
                            <div className="columns-2 sm:columns-3 lg:columns-4 gap-5">
                                {uploads.map((u) => {
                                    const imgSrc = u.sizes?.thumbnail || u.url;
                                    return (
                                        <div key={u._id} className="mb-6 block dark:bg-gray-800 bg-white shadow-lg rounded-lg overflow-hidden relative group hover:scale-105 transition-transform duration-300">
                                            <img src={imgSrc} alt={u.title} loading="lazy" className="h-auto object-cover w-[200px] sm:w-[250px]" />
                                            {/* Overlay buttons */}
                                            <button onClick={() => { setSelectedUpload(u); setUpdateOpen(true); }} className="btn btn-secondary absolute transition-transform duration-150
                                            top-2 right-2 px-1 py-1 cursor-pointer opacity-0 group-hover:opacity-100">
                                                <EditIcon className="size-5" />
                                            </button>
                                            <section className="py-3 px-4">
                                                <h3 className="mt-1 text-sm font-semibold">{u.title}</h3>
                                                {u.description && (
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                        {u.description}
                                                    </p>
                                                )}
                                            </section>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            You haven’t uploaded any photographs yet.
                        </p>
                    )}
                    {/* Update Modal */}
                    <UpdateModal
                        isOpen={updateOpen}
                        onClose={() => setUpdateOpen(false)}
                        upload={selectedUpload}
                        API_URL={API_URL}
                        onSuccess={fetchUploads}
                    />
                </>
            ) : (
                <p>Your account is awaiting approval. You cannot upload yet.</p>
            )}
        </div>
    );
}