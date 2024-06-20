import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <NavLink to="/" className="navbar-brand text-light">Home</NavLink>
                        <NavLink to="/container" className="nav-link text-light">Container</NavLink>
                        <NavLink to="/item" className="nav-link text-light">Item</NavLink>
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