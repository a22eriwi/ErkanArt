// client/src/Components/updateModal.tsx  
import { useAuth } from "./authContext";
import { useEffect, useState } from "react";

interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    upload: any;
    API_URL: string;
    onSuccess?: () => void;
}

export default function UpdateModal({ isOpen, onClose, upload, API_URL, onSuccess }: UpdateModalProps) {
    const { accessToken } = useAuth();
    const [title, setTitle] = useState(upload?.title || "");
    const [description, setDescription] = useState(upload?.description || "");
    const { apiFetch } = useAuth();

    useEffect(() => {
        if (upload) {
            setTitle(upload.title || "");
            setDescription(upload.description || "");
        }
    }, [upload]);

    if (!isOpen || !upload) return null;

    async function handleUpdate() {
        try {
            const res = await apiFetch(`${API_URL}/uploads/${upload._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            if (!res.ok) throw new Error("Failed to update");

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error("Update failed", err);
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this upload?")) return;
        try {
            const res = await fetch(`${API_URL}/uploads/${upload._id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!res.ok) throw new Error("Failed to delete");

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error("Delete failed", err);
        }
    }

    return (
        <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
            <div className="relative w-full max-w-[550px] px-8 py-8 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-xl dark:shadow-xl/30">
                <h1 className="font-semibold text-center text-2xl">Edit upload</h1>

                {/* Close button */}
                <button onClick={onClose} className="text-lg absolute top-3 right-3">
                    ✕
                </button>

                {/* Image preview */}
                <div className="flex justify-center mt-6">
                    <div className="max-w-xs relative">
                        <img src={upload.sizes?.medium || upload.url} alt={upload.title} className="rounded-md h-full w-full object-contain" />
                    </div>
                </div>

                {/* Form fields */}
                <div className="flex justify-center mt-5">
                    <div className="text-left w-full">
                        <label htmlFor="title" className="text-sm">
                            Title
                        </label>
                        <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="(Required)" className="text-input px-3 py-4 mb-4 w-full" />

                        <label htmlFor="description" className="text-sm">
                            Description
                        </label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="(Optional)" rows={4} className="text-input px-3 py-4 w-full" />
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <div />
                    <div className="flex gap-3">
                        <button onClick={handleDelete} className="btn btn-accent w-full max-w-[80px]">
                            Delete
                        </button>
                        <button onClick={handleUpdate} disabled={!title} className="btn btn-primary w-full max-w-[80px]">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}