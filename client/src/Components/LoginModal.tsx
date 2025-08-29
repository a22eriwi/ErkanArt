import KontoIcon from "../assets/konto.svg?react";

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div onMouseDown={(e) => {if (e.target === e.currentTarget) onClose();}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
            <form action="#" method="POST" className="space-y-6">
                <div className="mt-2 mb-4">
                  <input placeholder="Email address" id="email" name="email" type="email" required autoComplete="email"
                  className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"/>
                </div>

              <div>
                <div>
                  <input placeholder="Password" id="password" name="password" type="password" required autoComplete="current-password"
                  className="dark:bg-gray-800/50 bg-white block w-full rounded-md px-3 py-2.5 text-base outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500"/>
                </div>
                <div className="text-sm mt-2.5">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                  Sign in
                </button>
              </div>
            </form>

          <p className="mt-8 text-center text-sm">
            Don’t have an account?{" "}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
