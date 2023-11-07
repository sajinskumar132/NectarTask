"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

function Navbar() {
    const router = useRouter()
    return (
        <div>
            <nav className=' bg-blue-400 placeholder:w-full p-3 rounded-b-lg'>
                <div className=' p-2 bg-white text-blue-500 w-40 rounded-lg text-center font-bold cursor-pointer' onClick={() => {
                    router.push('/')
                }}>
                    <h1>My Locations</h1>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
