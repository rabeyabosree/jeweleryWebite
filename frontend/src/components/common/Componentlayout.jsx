import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom'
import Footer from './Footer';

function Componentlayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className='pt-16'>
                {/* The Outlet renders the child route (like Home, About, etc.) */}
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Componentlayout