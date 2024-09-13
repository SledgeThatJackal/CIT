import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid d-flex align-items-center">
                        <div className="d-flex me-auto">
                            <NavLink to="/" className="navbar-brand text-light">Home</NavLink>
                            <NavLink to="/container" className="nav-link text-light ms-3">Container</NavLink>
                            <NavLink to="/item" className="nav-link text-light ms-3">Item</NavLink>
                        </div>

                        <NavLink to="/settings" className="nav-link"><i className='bi bi-gear' style={{ fontSize: '24px', color: 'white' }}></i></NavLink>
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