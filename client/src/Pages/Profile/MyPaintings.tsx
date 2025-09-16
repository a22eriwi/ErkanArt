// client/src/Pages/Profile/MyPaintings.tsx
import { useAuth } from "../../Components/authContext"
import AddIcon from "../../assets/AddIcon.svg?react";
import { useOutletContext } from "react-router-dom";

type ProfileContext = {
    openUpload: (type: "painting" | "photograph") => void;
};

export default function MyPaintings() {
    const { user } = useAuth();
    const { openUpload } = useOutletContext<ProfileContext>();

    return (
        <div>
            {user?.isApproved ? (
                <div className="flex justify-center items-center gap-3">
                    <h1 className="font-semibold text-2xl">My paintings</h1>
                    <button onClick={() => openUpload("painting")} className="p-2 flex items-center gap-1 btn btn-secondary"> <AddIcon className="size-6" /></button>
                </div>
            ) : (
                <p>Your account is awaiting approval. You cannot upload yet.</p>
            )}
        </div>
    );
}