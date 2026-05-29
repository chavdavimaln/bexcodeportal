import React, {
    useState,
    useEffect,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

const AdminLayout = ({
    children,
}) => {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    useEffect(() => {

        const loggedUser =
            localStorage.getItem(
                "loggedUser"
            );

        if (!loggedUser) {
            navigate("/admin/login");
        }

    }, [navigate]);

    return (
        <div className="bg-[#f8f8f8] min-h-screen">

            <AdminNavbar
                sidebarOpen={
                    sidebarOpen
                }
                setSidebarOpen={
                    setSidebarOpen
                }
            />

            <AdminSidebar
                sidebarOpen={
                    sidebarOpen
                }
                setSidebarOpen={
                    setSidebarOpen
                }
            />

            <main
                className="
                    pt-[90px]
                    lg:pl-[300px]
                    px-4
                    md:px-6
                    pb-6
                "
            >
                {children}
            </main>

            <div className="lg:pl-[280px]">
                <AdminFooter />
            </div>

        </div>
    );
};

export default AdminLayout;