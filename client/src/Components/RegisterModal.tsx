// client/src/Components/registerModal.tsx
import { useState } from "react";
import KontoIcon from "../assets/konto.svg?react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: { isOpen: boolean; onClose: () => void; onSwitchToLogin: () => void; }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Registration failed");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      {/* Modal container */}
      <div className="relative w-full max-w-lg px-8 sm:px-14 py-16 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-lg dark:shadow-xl/30">

        {/* Close button */}
        <button onClick={onClose} className="text-lg absolute top-3 right-3">
          ✕
        </button>

        {/* Content */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <KontoIcon className="size-15" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="mb-4">
              <input placeholder="First Name" id="fname" name="fname" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="text-input px-3 py-2.5" />
            </div>

            <div className="mb-4">
              <input placeholder="Last Name" id="sname" name="sname" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="text-input px-3 py-2.5" />
            </div>

            <div className="mb-4">
              <input placeholder="Email Address" id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="text-input px-3 py-2.5" />
            </div>

            <div>
              <input placeholder="Password" id="password" name="password" type="password" required autoComplete="new-password"  value={password} onChange={(e) => setPassword(e.target.value)}
                className="text-input px-3 py-2.5" />
            </div>

            <div>
              <button type="submit" className=" w-full btn btn-primary">
                Sign up
              </button>
            </div>
            {message && <p className="text-center text-sm mt-2">{message}</p>}
          </form>

          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-button">
              Sign in
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
