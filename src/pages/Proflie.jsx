import React, { useEffect } from 'react'
import Header from '../components/profile/Header'
import Main from '../components/profile/Main'



export default function Proflie() {
    
    return (
        <div className="max-h-[100vh]  flex flex-col items-center">
            <Header />
            <Main />
        </div>
    )
}
