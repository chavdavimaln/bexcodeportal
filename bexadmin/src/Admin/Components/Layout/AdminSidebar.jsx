import React, { useState } from "react";

import {
    Home,
    FileText,
    Users,
    ChevronDown,
    LayoutGrid,
} from "lucide-react";

import {
    Link,
    useLocation,
} from "react-router-dom";

const AdminSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const location = useLocation();

    /* Logged User */
    const loggedUser =
        JSON.parse(
            localStorage.getItem(
                "loggedUser"
            )
        ) || {};

    const [blogOpen, setBlogOpen] =
        useState(true);

    const [userOpen, setUserOpen] =
        useState(true);

    /* Safe Role Check */
    const isAdmin =
        loggedUser?.role
            ?.toLowerCase()
            ?.trim() ===
        "administrator";

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/40
                        z-[998]
                        lg:hidden
                    "
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed
                    top-[70px]
                    left-0
                    h-[calc(100vh-70px)]
                    bg-white
                    border-r
                    border-black/10
                    z-[999]
                    transition-all
                    duration-300
                    overflow-y-auto

                    ${sidebarOpen
                        ? `
                                translate-x-0
                              `
                        : `
                                -translate-x-full
                                lg:translate-x-0
                              `
                    }

                    w-[280px]
                `}
            >

                <div className="p-5">

                    {/* Dashboard */}
                    <Link
                        to="/admin"
                        className={`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            mb-2
                            transition

                            ${location.pathname ===
                                "/admin"
                                ? `
                                        bg-red-600
                                        text-white
                                      `
                                : `
                                        hover:bg-gray-100
                                        text-black
                                      `
                            }
                        `}
                    >
                        <Home size={20} />

                        Dashboard
                    </Link>

                    {/* Blogs */}
                    <button
                        onClick={() =>
                            setBlogOpen(
                                !blogOpen
                            )
                        }
                        className="
                            w-full
                            flex
                            items-center
                            justify-between
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-gray-100
                            transition
                        "
                    >

                        <div className="flex items-center gap-3">
                            <FileText size={20} />

                            Blogs
                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition ${blogOpen
                                ? "rotate-180"
                                : ""
                                }`}
                        />

                    </button>

                    {blogOpen && (
                        <div className="ml-4 mt-2 space-y-2">

                            <Link
                                to="/admin/blogs"
                                className="
                                    block
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Blog List
                            </Link>

                            <Link
                                to="/admin/blogs/add"
                                className="
                                    block
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Add Blog
                            </Link>

                            <Link
                                to="/admin/blogs/categories"
                                className="
                                    block
                                    px-4
                                    py-2
                                    rounded-lg
                                    hover:bg-gray-100
                                    transition
                                "
                            >
                                Categories
                            </Link>

                        </div>
                    )}

                    {/* Services */}
                    <Link
                        to="/admin/services"
                        className={`
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            mt-2
                            transition

                            ${location.pathname ===
                                "/admin/services"
                                ? `
                                        bg-red-600
                                        text-white
                                      `
                                : `
                                        hover:bg-gray-100
                                      `
                            }
                        `}
                    >
                        <LayoutGrid size={20} />

                        Services
                    </Link>

                    {/* Users Section */}
                    {isAdmin && (
                        <>
                            <button
                                onClick={() =>
                                    setUserOpen(
                                        !userOpen
                                    )
                                }
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-4
                                    py-3
                                    rounded-xl
                                    hover:bg-gray-100
                                    mt-2
                                    transition
                                "
                            >

                                <div className="flex items-center gap-3">
                                    <Users size={20} />

                                    Users
                                </div>

                                <ChevronDown
                                    size={18}
                                    className={`transition ${userOpen
                                        ? "rotate-180"
                                        : ""
                                        }`}
                                />

                            </button>

                            {userOpen && (
                                <div className="ml-4 mt-2 space-y-2">

                                    <Link
                                        to="/admin/users"
                                        className="
                                            block
                                            px-4
                                            py-2
                                            rounded-lg
                                            hover:bg-gray-100
                                            transition
                                        "
                                    >
                                        All Users
                                    </Link>

                                    <Link
                                        to="/admin/users/add"
                                        className="
                                            block
                                            px-4
                                            py-2
                                            rounded-lg
                                            hover:bg-gray-100
                                            transition
                                        "
                                    >
                                        Add User
                                    </Link>

                                </div>
                            )}
                        </>
                    )}

                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;