import React from 'react'

export default function Header() {
    return (
        <>
            <header className="w-full border-b-2 border-gray-700 p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Profile</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:underline">Overview</a></li>
                        <li><a href="#" className="hover:underline">Repositories</a></li>
                        <li><a href="#" className="hover:underline">Projects</a></li>
                        <li><a href="#" className="hover:underline">Packages</a></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
