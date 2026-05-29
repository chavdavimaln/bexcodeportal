import React from "react";

import {
    FileText,
    Folder,
    Briefcase,
    Users,
} from "lucide-react";

import AdminLayout from "../../Components/Layout/AdminLayout";

const HomeIndexCopy = () => {

    const cards = [
        {
            title: "Total Blogs",
            count: "25",
            icon: <FileText />,
        },
        {
            title: "Categories",
            count: "10",
            icon: <Folder />,
        },
        {
            title: "Services",
            count: "8",
            icon: <Briefcase />,
        },
        {
            title: "Users",
            count: "5",
            icon: <Users />,
        },
    ];

    return (
        <AdminLayout>

            <div>

                <h1
                    className="
                        text-[32px]
                        font-semibold
                        mb-8
                    "
                >
                    Dashboard
                </h1>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-4
                        gap-6
                    "
                >

                    {cards.map(
                        (
                            item,
                            index
                        ) => (
                            <div
                                key={index}
                                className="
                                    bg-white
                                    rounded-[25px]
                                    border
                                    border-black/10
                                    p-6
                                "
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-[#666]">
                                            {
                                                item.title
                                            }
                                        </p>

                                        <h2 className="text-[34px] font-semibold mt-3">
                                            {
                                                item.count
                                            }
                                        </h2>

                                    </div>

                                    <div
                                        className="
                                            w-[60px]
                                            h-[60px]
                                            rounded-2xl
                                            bg-red-100
                                            text-red-600
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >
                                        {
                                            item.icon
                                        }
                                    </div>

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>

        </AdminLayout>
    );
};

export default HomeIndexCopy;