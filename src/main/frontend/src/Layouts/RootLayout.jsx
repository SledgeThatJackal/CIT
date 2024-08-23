import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid d-flex justify-content-start">
                        <NavLink to="/" className="navbar-brand text-light">Home</NavLink>
                        <NavLink to="/container" className="nav-link text-light ms-3">Container</NavLink>
                        <NavLink to="/item" className="nav-link text-light ms-3">Item</NavLink>
                    </div>
                </nav>
            </header>

            <main className="bg-secondary">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;