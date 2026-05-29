import React from "react";

import {
    FileText,
    Users,
    LayoutGrid,
} from "lucide-react";

import AdminLayout from "../../Components/Layout/AdminLayout";

const HomeIndex = () => {

    const blogs =
        JSON.parse(
            localStorage.getItem(
                "blogContents"
            )
        ) || [];

    const users =
        JSON.parse(
            localStorage.getItem(
                "users"
            )
        ) || [];

    return (
        <AdminLayout>

            <div>

                <h1 className="text-[32px] font-semibold mb-8">
                    Dashboard
                </h1>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-3xl p-6 border border-black/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">
                                    Total Blogs
                                </p>

                                <h2 className="text-[34px] font-bold mt-2">
                                    {
                                        blogs.length
                                    }
                                </h2>
                            </div>

                            <FileText
                                size={42}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-black/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">
                                    Users
                                </p>

                                <h2 className="text-[34px] font-bold mt-2">
                                    {
                                        users.length
                                    }
                                </h2>
                            </div>

                            <Users
                                size={42}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-black/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">
                                    Services
                                </p>

                                <h2 className="text-[34px] font-bold mt-2">
                                    3
                                </h2>
                            </div>

                            <LayoutGrid
                                size={42}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default HomeIndex;