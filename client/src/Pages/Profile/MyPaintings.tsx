// client/src/Pages/Profile/myPaintings.tsx
import { useAuth } from "../../components/authContext"
import AddIcon from "../../assets/AddIcon.svg?react";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProfileContext } from "./profile";
import UpdateModal from "../../components/updateModal";
import EditIcon from "../../assets/editIcon.svg?react";
import Masonry from "react-masonry-css";
import type { Upload } from "../../types/upload";

export default function MyPhotographs() {
    const API_URL = import.meta.env.VITE_API_URL;
    const { user, accessToken } = useAuth();
    const { openUpload, setOnUploadSuccess } = useOutletContext<ProfileContext>();
    const [uploads, setUploads] = useState<Upload[]>([]);
    const [selectedUpload, setSelectedUpload] = useState<Upload | null>(null);
    const [updateOpen, setUpdateOpen] = useState(false);
    const { apiFetch } = useAuth();

    async function fetchUploads() {
        try {
            const res = await apiFetch(`${API_URL}/uploads/user?type=painting`);
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

    // Masonry breakpoints
    const breakpointColumnsObj = {
        default: 4,
        1024: 4,
        850: 3,
        600: 2,
    };

    return (
        <div>
            {user?.isApproved ? (
                <>
                    <div className="flex justify-center items-center gap-3 mb-6">
                        <h1 className="font-semibold text-2xl">My paintings</h1>
                        <button onClick={() => openUpload("painting")} className="p-2 flex items-center gap-1 btn btn-secondary">
                            <AddIcon className="size-6" />
                        </button>
                    </div>

                    {/* Uploaded photos */}
                    {uploads.length > 0 ? (
                        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto gap-5" columnClassName="flex flex-col gap-5">
                            {uploads.map((u) => {
                                const imgSrc = u.sizes?.thumbnail || u.url;
                                return (
                                    <div key={u._id} className=" overflow-hidden relative max-w-[250px] mb-2">
                                        <div className="group">
                                            <img src={imgSrc} alt={u.title} loading="lazy" className="h-auto object-cover group-hover:opacity-70 transition-transform duration-300 hover:cursor-pointer rounded-lg" />
                                            {/* Overlay buttons */}
                                            <button onClick={() => { setSelectedUpload(u); setUpdateOpen(true); }} className="btn btn-secondary absolute
                                            top-2 right-2 p-1.5 cursor-pointer opacity-0 group-hover:opacity-100">
                                                <EditIcon className="size-5" />
                                            </button>
                                        </div>
                                        <section className="py-2 px-1.5 cursor-default">
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