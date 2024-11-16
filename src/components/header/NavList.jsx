import React, { useState, useEffect } from 'react';
import Navs from './NavData';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(null);
    const [role, setRole] = useState(null); // Add role state
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const { logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.username);
            setRole(user.role); // Set the user's role
        } else {
            setUsername(null);
            setRole(null); // Clear role if no user is logged in
        }
    }, []);

    // Get the updated NavData based on username and role
    const navItems = Navs(username, role);

    return (
        <div className="nav-list flex justify-end items-center">
            <nav className="navs">
                <ul className="flex justify-end gap-2 text-xs lg:text-sm">
                    {navItems.map((nav, index) => (
                        <li
                            className={`nav-item ${
                                index === navItems.length - 2 ? 'yellow-bg' : ''
                            }`}
                            key={index}
                        >
                            {nav.subnavs ? (
                                <a
                                    href="#!"
                                    onClick={toggleDropdown}
                                    className="cursor-pointer"
                                >
                                    <span
                                        dangerouslySetInnerHTML={{ __html: nav.icon }}
                                        className="mr-1"
                                    />
                                    {nav.name}
                                </a>
                            ) : (
                                <NavLink to={nav.link}>
                                    <span
                                        dangerouslySetInnerHTML={{ __html: nav.icon }}
                                        className="mr-1"
                                    />
                                    {nav.name}
                                </NavLink>
                            )}

                            {nav.subnavs && isDropdownOpen && (
                                <ul className="dropdown bg-white z-50 mt-4 shadow-md shadow-black rounded p-2 absolute">
                                    {!username && (
                                        <li>
                                            <NavLink
                                                to="/signin"
                                                className="block w-full text-left py-1 rounded-sm hover:bg-appColor bg-bgColor px-2"
                                            >
                                                Sign In
                                            </NavLink>
                                        </li>
                                    )}
                                    {nav.subnavs.map((subnav, subIndex) => (
                                        <li key={subIndex}>
                                            <NavLink
                                                to={subnav.link}
                                                className="block py-1 px-2 hover:bg-gray-200"
                                            >
                                                {subnav.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                    {username && (
                                        <li>
                                            <button
                                                onClick={logout}
                                                className="block w-full text-left text-red-400 py-1 px-2 border border-red-400 rounded-sm hover:bg-gray-200"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="menu hidden">
                <button
                    onClick={toggleMenu}
                    className="menu-button text-xl hover:border hover:border-yellow-400"
                >
                    {isOpen ? (
                        <ion-icon name="close-outline" />
                    ) : (
                        <ion-icon name="menu-outline" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default NavList;
