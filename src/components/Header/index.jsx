import React from 'react';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/')
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50">
            <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                        AnimesExpress
                    </h1>

                    <nav className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="inline-flex items-center px-4 py-2 border-2 outline-1 outline-transparent border-red-600 text-red-600 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-red-600 hover:text-white focus:outline-1 focus:outline-red-600 active:scale-95"
                        >
                            <span className="mr-2">🚪</span>
                            Sair
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
