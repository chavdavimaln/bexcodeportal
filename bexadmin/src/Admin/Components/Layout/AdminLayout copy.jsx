import React, { useState } from "react";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayoutCopy = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#f8f8f8]">

            {/* Navbar */}
            <AdminNavbar
                setSidebarOpen={setSidebarOpen}
            />

            {/* Body */}
            <div className="flex pt-[80px]">

                {/* Sidebar */}
                <AdminSidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Main */}
                <main
                    className="
                        flex-1
                        lg:ml-[280px]
                        min-h-[calc(100vh-80px)]
                        flex
                        flex-col
                    "
                >
                    <div className="flex-1 p-6 md:p-8">
                        {children}
                    </div>

                    <AdminFooter />
                </main>

            </div>

        </div>
    );
};

export default AdminLayoutCopy;