import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { API_URL } from "../../../Config/api";
import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";
import {
    Link,
} from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/admin/auth/list`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log("Users API Response:", result);

            if (result.status) {
                setUsers(result.data || []);
            }
        } catch (error) {
            console.error("User Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };
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
                <div className="flex justify-between mb-8">
                    <div>
                        <h2 className="text-[32px] font-semibold">
                            User Management
                        </h2>

                        <p className="text-gray-500">
                            Total Users: {users.length}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Username</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Phone</th>
                                <th className="p-3 text-left">Role</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Created</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center p-5"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-t"
                                    >
                                        <td className="p-3">
                                            {user.id}
                                        </td>

                                        <td className="p-3">
                                            {user.fname} {user.lname}
                                        </td>

                                        <td className="p-3">
                                            {user.username}
                                        </td>

                                        <td className="p-3">
                                            {user.email}
                                        </td>

                                        <td className="p-3">
                                            {user.phone || "-"}
                                        </td>

                                        <td className="p-3">
                                            {user.role}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${user.user_status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {user.user_status || "Inactive"}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            {new Date(
                                                user.created_at
                                            ).toLocaleDateString()}
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
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="text-center p-5"
                                    >
                                        No Users Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserList;