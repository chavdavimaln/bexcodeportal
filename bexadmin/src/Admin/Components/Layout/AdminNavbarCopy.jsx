import React, { useState } from "react";

import {
    Menu,
    User,
    ChevronDown,
    LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Logo from "../../../Images/logo.png";

const AdminNavbarCopy = ({
    setSidebarOpen,
}) => {

    const [dropdownOpen, setDropdownOpen] =
        useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("adminLogin");

        navigate("/admin/login");
    };

    return (
        <header
            className="
                fixed
                top-0
                left-0
                w-full
                h-[80px]
                bg-white
                border-b
                border-black/10
                z-[999]
                px-6
                md:px-10
                flex
                items-center
                justify-between
            "
        >

            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Mobile Menu */}
                <button
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                    className="lg:hidden"
                >
                    <Menu size={28} />
                </button>

                {/* Logo */}
                <Link to="/admin">
                    <img
                        src={Logo}
                        alt=""
                        className="w-[130px]"
                    />
                </Link>

            </div>

            {/* Right */}
            <div className="relative">

                <button
                    onClick={() =>
                        setDropdownOpen(
                            !dropdownOpen
                        )
                    }
                    className="
                        flex
                        items-center
                        gap-2
                        border
                        border-black/10
                        rounded-full
                        px-4
                        py-2
                    "
                >
                    <User size={18} />
                    <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                    <div
                        className="
                            absolute
                            right-0
                            top-full
                            mt-3
                            w-[220px]
                            bg-white
                            rounded-2xl
                            shadow-xl
                            border
                            border-black/10
                            overflow-hidden
                        "
                    >

                        <Link
                            to="/admin/profile"
                            className="
                                block
                                px-5
                                py-3
                                hover:bg-[#f8f8f8]
                            "
                        >
                            Profile
                        </Link>

                        <button
                            onClick={
                                handleLogout
                            }
                            className="
                                w-full
                                flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                text-left
                                hover:bg-[#f8f8f8]
                            "
                        >
                            <LogOut size={16} />
                            Logout
                        </button>

                    </div>
                )}

            </div>

        </header>
    );
};

export default AdminNavbarCopy;