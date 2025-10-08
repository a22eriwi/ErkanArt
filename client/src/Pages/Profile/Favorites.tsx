// client/src/Pages/Profile/Favorites.tsx
import { useAuth } from "../../components/authContext"
import CreateSlideShowIcon from "../../assets/createSlideShowIcon.svg?react";
import PlaySlideShow from "../../assets/playSlideShowIcon.svg?react";

export default function Favorites() {
    const { user } = useAuth();

    return (
        <div>
            {user?.isApproved ? (
                <>
                    <div className="flex justify-center items-center gap-3 mb-4">
                        <h1 className="font-semibold text-2xl">Favorites</h1>

                        <div className="flex gap-2">
                            <button className="p-2 flex items-center gap-1 btn btn-secondary hover:">
                                <CreateSlideShowIcon className="size-6" />
                            </button>
                            <button className="p-2 flex items-center gap-1 btn btn-secondary hover:">
                                <PlaySlideShow className="size-6" />
                            </button>
                        </div>


                    </div>
                </>
            ) : (
                <p>Your account is awaiting approval. You cannot upload yet.</p>
            )}
        </div>
    );
}