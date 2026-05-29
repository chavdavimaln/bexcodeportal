import React from "react";

import AdminLayout from "../../Components/Layout/AdminLayout";

const UserProfile = () => {

    const loggedUser =
        JSON.parse(
            localStorage.getItem(
                "loggedUser"
            )
        ) || {};

    return (
        <AdminLayout>

            <div className="max-w-[900px]">

                <h2 className="text-[30px] font-semibold mb-8">
                    Profile
                </h2>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-black/10
                        p-8
                    "
                >

                    <div className="flex flex-col md:flex-row gap-8">

                        <img
                            src={
                                loggedUser.profile
                            }
                            alt=""
                            className="
                                w-[180px]
                                h-[180px]
                                rounded-3xl
                                object-cover
                            "
                        />

                        <div className="space-y-4">

                            <h3 className="text-[30px] font-semibold">
                                {
                                    loggedUser.firstName
                                }{" "}
                                {
                                    loggedUser.lastName
                                }
                            </h3>

                            <p>
                                <strong>
                                    Username:
                                </strong>{" "}
                                {
                                    loggedUser.username
                                }
                            </p>

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {
                                    loggedUser.email
                                }
                            </p>

                            <p>
                                <strong>
                                    Role:
                                </strong>{" "}
                                {
                                    loggedUser.role
                                }
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default UserProfile;