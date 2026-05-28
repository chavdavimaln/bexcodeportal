import React, { useState } from "react";

import {
    LayoutDashboard,
    ChevronDown,
    X,
    FileText,
    // Folder,
    Briefcase,
} from "lucide-react";

import { Link } from "react-router-dom";

const AdminSidebar = ({
    sidebarOpen,
    setSidebarOpen,
}) => {

    const [blogOpen, setBlogOpen] =
        useState(true);

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-[998]
                        lg:hidden
                    "
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                />
            )}

            <aside
                className={`
                    fixed
                    top-[80px]
                    left-0
                    h-[calc(100vh-80px)]
                    w-[280px]
                    bg-white
                    border-r
                    border-black/10
                    overflow-y-auto
                    z-[999]
                    transition-all
                    duration-300

                    ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                `}
            >

                {/* Mobile Close */}
                <div className="flex justify-end p-4 lg:hidden">

                    <button
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                    >
                        <X size={24} />
                    </button>

                </div>

                <div className="px-5 pb-10 space-y-3">

                    {/* Dashboard */}
                    <Link
                        to="/admin"
                        className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-[#f5f5f5]
                        "
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>

                    {/* Blogs */}
                    <div>

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
                                hover:bg-[#f5f5f5]
                            "
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} />
                                Blogs
                            </div>

                            <ChevronDown
                                size={18}
                            />
                        </button>

                        {blogOpen && (
                            <div className="ml-10 mt-2 flex flex-col gap-2">

                                <Link
                                    to="/admin/blogs"
                                    className="text-[15px] hover:text-red-600"
                                >
                                    Blog List
                                </Link>

                                <Link
                                    to="/admin/blogs/add"
                                    className="text-[15px] hover:text-red-600"
                                >
                                    Blog Add
                                </Link>

                                <Link
                                    to="/admin/categories"
                                    className="text-[15px] hover:text-red-600"
                                >
                                    Categories
                                </Link>

                            </div>
                        )}

                    </div>

                    {/* Services */}
                    <Link
                        to="/admin/services"
                        className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            rounded-xl
                            hover:bg-[#f5f5f5]
                        "
                    >
                        <Briefcase size={20} />
                        Services
                    </Link>

                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;