import React, {
    useEffect,
    useState,
} from "react";

import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

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

                                    <th className="text-left p-3 text-md font-medium">
                                        Profile
                                    </th>

                                    <th className="text-left p-3 text-md font-medium">
                                        Name
                                    </th>

                                    <th className="text-left p-3 text-md font-medium">
                                        Email
                                    </th>

                                    <th className="text-left p-3 text-md font-medium">
                                        Role
                                    </th>

                                    <th className="text-left p-3 text-md font-medium">
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

                                            <td className="p-3 text-[14px]">
                                                <img
                                                    src={
                                                        user.profile
                                                    }
                                                    alt=""
                                                    className="
                                                        w-10
                                                        h-10
                                                        rounded-full
                                                        object-cover
                                                    "
                                                />
                                            </td>

                                            <td className="p-3 text-[14px]">
                                                {
                                                    user.firstName
                                                }{" "}
                                                {
                                                    user.lastName
                                                }
                                            </td>

                                            <td className="p-3 text-[14px]">
                                                {
                                                    user.email
                                                }
                                            </td>

                                            <td className="p-3 text-[14px]">
                                                {
                                                    user.role
                                                }
                                            </td>

                                            <td className="p-3">
                                                <div className="flex items-center gap-2">

                                                    <Link
                                                        to={`/admin/users/profile/${user.id}`}
                                                        className="
                                                                w-8
                                                                h-8
                                                                rounded-lg
                                                                bg-blue-50
                                                                text-blue-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-blue-600
                                                                hover:text-white
                                                                transition
                                                            "
                                                        title="View"
                                                    >
                                                        <Eye size={14} />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/users/edit/${user.id}`}
                                                        className="
                                                                w-8
                                                                h-8
                                                                rounded-lg
                                                                bg-black
                                                                text-white
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-gray-700
                                                                transition
                                                            "
                                                        title="Edit"
                                                    >
                                                        <Pencil size={14} />
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="
                                                                w-8
                                                                h-8
                                                                rounded-lg
                                                                bg-red-600
                                                                text-white
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-red-700
                                                                transition
                                                            "
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={14} />
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