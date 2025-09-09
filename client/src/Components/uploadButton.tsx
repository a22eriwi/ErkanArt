// client/src/Components/uploadButton.tsx

import { useAuth } from "../Components/authContext";
import AddBox from "../assets/addBox.svg?react";

interface ProtectedUploadButtonProps {
    onClick: () => void;
}

export default function UploadButton({ onClick }: ProtectedUploadButtonProps) {
    const { user } = useAuth();

    if (!user?.isApproved) {
        return <p>
            Your account is awaiting approval. You cannot upload yet.
        </p>;
    }

    return (
        <button onClick={ onClick }>
            <AddBox className="size-8" />
        </button>
    );
}