// Admin/Pages/Users/UserEdit.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import AdminLayout from "../../Components/Layout/AdminLayout";

const UserEdit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] =
        useState({});

    useEffect(() => {

        const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        const user =
            users.find(
                (item) =>
                    item.id ===
                    Number(id)
            );

        if (user) {
            setForm(user);
        }

    }, [id]);

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

        const users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        const updatedUsers =
            users.map((item) =>
                item.id ===
                    Number(id)
                    ? form
                    : item
            );

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
                    Edit User
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
                                value={
                                    form.username ||
                                    ""
                                }
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

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={
                                    form.firstName ||
                                    ""
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        firstName:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={
                                    form.lastName ||
                                    ""
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lastName:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                value={
                                    form.email ||
                                    ""
                                }
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

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                User Role
                            </label>

                            <select
                                value={
                                    form.role ||
                                    ""
                                }
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        role:
                                            e.target.value,
                                    })
                                }
                                className="w-full border rounded-xl px-4 py-3"
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
                        Update User
                    </button>

                </form>

            </div>

        </AdminLayout>
    );
};

export default UserEdit;