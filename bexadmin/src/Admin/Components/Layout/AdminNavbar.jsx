import React, { useState } from "react";

import {
    Menu,
    ChevronDown,
    LogOut,
    User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdminNavbar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] =
        useState(false);

    const loggedUser =
        JSON.parse(
            localStorage.getItem(
                "loggedUser"
            )
        ) || {};

    const handleLogout = () => {

        localStorage.removeItem(
            "loggedUser"
        );

        navigate("/admin/login");
    };

    return (
        <header
            className="
                fixed
                top-0
                left-0
                right-0
                h-[70px]
                bg-white
                border-b
                border-black/10
                z-[999]
                px-4
                md:px-6
            "
        >
            <div className="h-full flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={() =>
                            setSidebarOpen(
                                !sidebarOpen
                            )
                        }
                        className="
                            lg:hidden
                            w-10
                            h-10
                            rounded-full
                            border
                            border-black/10
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Menu size={20} />
                    </button>

                    <h2 className="text-[22px] font-semibold">
                        Admin Panel
                    </h2>

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
                            gap-3
                            border
                            border-black/10
                            rounded-full
                            px-3
                            py-2
                        "
                    >

                        <img
                            src={
                                loggedUser.profile ||
                                "https://i.pravatar.cc/300"
                            }
                            alt=""
                            className="
                                w-10
                                h-10
                                rounded-full
                                object-cover
                            "
                        />

                        <div className="hidden md:block text-left">
                            <h4 className="text-[14px] font-semibold">
                                {
                                    loggedUser.firstName
                                }{" "}
                                {
                                    loggedUser.lastName
                                }
                            </h4>

                            <p className="text-[12px] text-gray-500">
                                {
                                    loggedUser.role
                                }
                            </p>
                        </div>

                        <ChevronDown size={18} />

                    </button>

                    {dropdownOpen && (
                        <div
                            className="
                                absolute
                                right-0
                                mt-3
                                w-[220px]
                                bg-white
                                border
                                border-black/10
                                rounded-2xl
                                shadow-lg
                                overflow-hidden
                            "
                        >

                            <button
                                onClick={() =>
                                    navigate(
                                        "/admin/users/profile"
                                    )
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-5
                                    py-4
                                    hover:bg-gray-50
                                "
                            >
                                <User size={18} />

                                Profile
                            </button>

                            <button
                                onClick={
                                    handleLogout
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-5
                                    py-4
                                    hover:bg-gray-50
                                    text-red-600
                                "
                            >
                                <LogOut size={18} />

                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </header>
    );
};

export default AdminNavbar;