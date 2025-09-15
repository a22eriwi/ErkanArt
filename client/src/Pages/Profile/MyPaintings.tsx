// client/src/Pages/Profile/MyPaintings.tsx

import { useState } from "react";
import { useAuth } from "../../Components/authContext"
import { Upload } from "../../Components/Upload";
import AddIcon from "../../assets/AddIcon.svg?react";

export default function MyPaintings() {
    const [showUpload, setShowUpload] = useState(false);
    const { user } = useAuth();

    return (
        <div>
            {user?.isApproved ? (
                <>
                    {!showUpload ? (
                        <div className="flex justify-center items-center gap-3">
                            <h1 className="font-semibold text-2xl">My paintings</h1>
                            <button onClick={() => setShowUpload(true)} className="p-2 flex items-center gap-1 btn btn-secondary">
                                <AddIcon className="size-6" />
                            </button>
                        </div>
                    ) : (
                        <Upload type="painting" />
                    )}
                </>
            ) : (
                <p>Your account is awaiting approval. You cannot upload yet.</p>
            )}
        </div>
    )
}