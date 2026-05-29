// Admin/Pages/Users/UserAdd.jsx

import React, {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import AdminLayout from "../../Components/Layout/AdminLayout";

const UserAdd = () => {

    const navigate = useNavigate();

    const [form, setForm] =
        useState({
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "Blogger",
            profile: "",
        });

    const handleImage = (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onloadend = () => {

            setForm({
                ...form,
                profile:
                    reader.result,
            });
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (
            form.password !==
            form.confirmPassword
        ) {

            alert(
                "Passwords do not match"
            );

            return;
        }

        const oldUsers =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        const newUser = {
            ...form,
            id: Date.now(),
        };

        const updatedUsers = [
            ...oldUsers,
            newUser,
        ];

        localStorage.setItem(
            "users",
            JSON.stringify(
                updatedUsers
            )
        );

        navigate("/admin/users");
    };

    return (
        <AdminLayout>

            <div className="max-w-[900px]">

                <h2 className="text-[30px] font-semibold mb-8">
                    Add User
                </h2>

                <form
                    onSubmit={
                        handleSubmit
                    }
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

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        username:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        firstName:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lastName:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        email:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        confirmPassword:
                                            e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                User Role
                            </label>

                            <select
                                className="w-full border rounded-xl px-4 py-3"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        role:
                                            e.target.value,
                                    })
                                }
                            >
                                <option>
                                    Administrator
                                </option>

                                <option>
                                    Blogger
                                </option>

                            </select>
                        </div>

                        {/* Profile */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Profile Picture
                            </label>

                            <input
                                type="file"
                                onChange={
                                    handleImage
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                    </div>

                    {/* Preview */}
                    {form.profile && (
                        <img
                            src={form.profile}
                            alt=""
                            className="
                                w-[120px]
                                h-[120px]
                                rounded-2xl
                                object-cover
                                border
                            "
                        />
                    )}

                    <button
                        className="
                            px-8
                            py-3
                            rounded-full
                            bg-red-600
                            text-white
                        "
                    >
                        Save User
                    </button>

                </form>

            </div>

        </AdminLayout>
    );
};

export default UserAdd;