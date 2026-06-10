// src/Admin/Pages/Users/UserEdit.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminLayout from "../../Components/Layout/AdminLayout";
import { API_URL } from "../../../Config/api";

const UserEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        username: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        role: "",
        user_status: "",
        dob: "",
    });

    useEffect(() => {
        fetchUser();
    }, [id]);

    const fetchUser = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await fetch(
                    `${API_URL}/admin/auth/details/${id}`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            const result =
                await response.json();

            console.log(
                "User Details:",
                result
            );

            if (
                result.status &&
                result.data.user.length
            ) {

                const user =
                    result.data.user[0];

                setForm({
                    username:
                        user.username || "",
                    fname:
                        user.fname || "",
                    lname:
                        user.lname || "",
                    email:
                        user.email || "",
                    phone:
                        user.phone || "",
                    role:
                        user.role || "",
                    user_status:
                        user.user_status || "",
                    dob:
                        user.dob || "",
                });
            }

        } catch (error) {

            console.error(
                "User Fetch Error:",
                error
            );

        } finally {

            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await fetch(
                    `${API_URL}/admin/auth/update/${id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json",
                            Authorization:
                                `Bearer ${token}`,
                        },
                        body: JSON.stringify(
                            form
                        ),
                    }
                );

            const result =
                await response.json();

            if (result.status) {

                alert(
                    "User updated successfully."
                );

                navigate(
                    "/admin/users"
                );

            } else {

                alert(
                    result.message
                );
            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to update user."
            );
        }
    };

    if (loading) {

        return (
            <AdminLayout>
                <div className="p-10">
                    Loading...
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="max-w-[900px]">

                <h2 className="text-[30px] font-semibold mb-8">
                    Edit User
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-black/10
                        p-8
                        space-y-6
                    "
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>

                            <label className="block mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                value={form.username}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        username:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={form.fname}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fname:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={form.lname}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lname:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Phone
                            </label>

                            <input
                                type="text"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phone:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                value={form.dob}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        dob:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2">
                                Role
                            </label>

                            <select
                                value={form.role}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        role:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            >
                                <option value="admin">
                                    Admin
                                </option>

                                <option value="editor">
                                    Editor
                                </option>
                            </select>

                        </div>

                        <div>

                            <label className="block mb-2">
                                Status
                            </label>

                            <select
                                value={form.user_status}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        user_status:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            >
                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>
                            </select>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="
                            px-8
                            py-3
                            rounded-full
                            bg-red-600
                            text-white
                        "
                    >
                        Update User
                    </button>

                </form>

            </div>

        </AdminLayout>
    );
};

export default UserEdit;