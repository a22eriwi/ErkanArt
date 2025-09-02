import { useState } from "react";
import KontoIcon from "../assets/konto.svg?react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: { isOpen: boolean; onClose: () => void; onSwitchToLogin: () => void; }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Registration failed");
      } else {
        setMessage(data.message || "Registration successful! Wait for approval.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      {/* Modal container */}
      <div className="relative w-full max-w-lg px-6 sm:px-14 py-12 sm:py-18 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-lg">

        {/* Close button */}
        <button onClick={onClose} className="text-lg absolute top-3 right-3 hover:text-sky-700 dark:hover:text-white">
          ✕
        </button>

        {/* Content */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center">
            <KontoIcon className="size-15" />
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="mb-4">
              <input placeholder="First Name" id="fname" name="fname" type="text" required autoComplete="email" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
            </div>

            <div className="mb-4">
              <input placeholder="Last Name" id="sname" name="sname" type="text" required autoComplete="email" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
            </div>

            <div className="mb-4">
              <input placeholder="Email Address" id="email" name="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
            </div>

            <div>
              <input placeholder="Password" id="password" name="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500" />
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                Create Account
              </button>
            </div>
            {message && <p className="text-center text-sm mt-4">{message}</p>}
          </form>

          <p className="mt-8 text-center text-sm">
            Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}
