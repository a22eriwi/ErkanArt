import KontoIcon from "../assets/konto.svg?react";
export default function Login() {
    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center">
                        <KontoIcon className="size-15" />
                    </div>
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight">Sign in to your account</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="border-1 border-gray-300 dark:border-gray-700 mb-4 p-15 rounded-xl dark:bg-white/3 bg-white">
                        <form action="#" method="POST" className="space-y-6">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm/6 font-medium">
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder="Email address"
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md dark:bg-white/5 px-3 py-2.5 text-base outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium">
                                    </label>
                                </div>
                                <div>
                                    <input
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md dark:bg-white/5 px-3 py-2.5 text-base outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                                <div className="text-sm mt-4">
                                    <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-500 hover:dark:text-indigo-400 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-500 hover:dark:bg-indigo-400 hover:bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-8 text-center text-sm/6">
                        Don’t have an account?{' '}
                        <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-500 hover:dark:text-indigo-400 hover:text-indigo-500">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}