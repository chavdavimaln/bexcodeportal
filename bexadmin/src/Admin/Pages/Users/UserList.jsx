import React, {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import AdminLayout from "../../Components/Layout/AdminLayout";

const UserList = () => {

    const [users, setUsers] =
        useState([]);

    useEffect(() => {

        const localUsers =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        setUsers(localUsers);

    }, []);

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Delete this user?"
            );

        if (!confirmDelete) return;

        const updatedUsers =
            users.filter(
                (item) =>
                    item.id !== id
            );

        localStorage.setItem(
            "users",
            JSON.stringify(
                updatedUsers
            )
        );

        setUsers(updatedUsers);
    };

    return (
        <AdminLayout>

            <div>

                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-[30px] font-semibold">
                        Users
                    </h2>

                    <Link
                        to="/admin/users/add"
                        className="
                            px-6
                            py-3
                            rounded-full
                            bg-red-600
                            text-white
                        "
                    >
                        Add User
                    </Link>

                </div>

                <div className="bg-white rounded-3xl border border-black/10 overflow-hidden">

                    <div className="overflow-auto">

                        <table className="w-full min-w-[900px]">

                            <thead className="bg-[#f8f8f8]">
                                <tr>

                                    <th className="text-left p-5">
                                        Profile
                                    </th>

                                    <th className="text-left p-5">
                                        Name
                                    </th>

                                    <th className="text-left p-5">
                                        Email
                                    </th>

                                    <th className="text-left p-5">
                                        Role
                                    </th>

                                    <th className="text-left p-5">
                                        Actions
                                    </th>

                                </tr>
                            </thead>

                            <tbody>

                                {users.map(
                                    (user) => (
                                        <tr
                                            key={
                                                user.id
                                            }
                                            className="border-t border-black/10"
                                        >

                                            <td className="p-5">
                                                <img
                                                    src={
                                                        user.profile
                                                    }
                                                    alt=""
                                                    className="
                                                        w-14
                                                        h-14
                                                        rounded-full
                                                        object-cover
                                                    "
                                                />
                                            </td>

                                            <td className="p-5">
                                                {
                                                    user.firstName
                                                }{" "}
                                                {
                                                    user.lastName
                                                }
                                            </td>

                                            <td className="p-5">
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td className="p-5">
                                                {
                                                    user.role
                                                }
                                            </td>

                                            <td className="p-5">
                                                <div className="flex gap-3">

                                                    <Link
                                                        to={`/admin/users/profile/${user.id}`}
                                                        className="px-4 py-2 rounded-full bg-black text-white"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        to={`/admin/users/edit/${user.id}`}
                                                        className="px-4 py-2 rounded-full bg-blue-600 text-white"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }
                                                        className="px-4 py-2 rounded-full bg-red-600 text-white"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default UserList;