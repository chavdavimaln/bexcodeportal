// Admin/Pages/Services/ServicesList.jsx

import React from "react";

import AdminLayout from "../../Components/Layout/AdminLayout";

const ServicesList = () => {

    return (
        <AdminLayout>

            <div>

                <h1 className="text-[32px] font-semibold mb-8">
                    Services List
                </h1>

                <div
                    className="
                        bg-white
                        border
                        border-black/10
                        rounded-[25px]
                        p-6
                    "
                >
                    Services content here
                </div>

            </div>

        </AdminLayout>
    );
};

export default ServicesList;