import React from 'react'
import UserAaction from './UserAaction'
import AboutUser from './AboutUser'

export default function Main() {
    return (
        <>
            <main className="flex max-h-full overflow-auto w-full bg-opacity-75  rounded-lg">
                <AboutUser/>
                <UserAaction/>
            </main>
        </>
    )
}
