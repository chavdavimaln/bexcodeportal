// Admin/Pages/Auth/Login.jsx

import React, { useState } from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import UserData from "./UserData";

const Login = () => {

    const navigate =
        useNavigate();

    const [form, setForm] =
        useState({
            email: "",
            password: "",
        });

    const [message, setMessage] =
        useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        /* Local Users */
        const localUsers =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        /* Merge Users */
        const allUsers = [
            ...UserData,
            ...localUsers,
        ];

        /* Find User */
        const user =
            allUsers.find(
                (item) =>
                    item.email ===
                    form.email
            );

        /* User Not Found */
        if (!user) {

            setMessage(
                "User not registered."
            );

            return;
        }

        /* Wrong Password */
        if (
            user.password !==
            form.password
        ) {

            setMessage(
                "Wrong password."
            );

            return;
        }

        /* Save Logged User */
        localStorage.setItem(
            "loggedUser",
            JSON.stringify(user)
        );

        setMessage(
            "Login successful."
        );

        /* Redirect */
        setTimeout(() => {

            navigate("/admin");

        }, 1000);
    };

    return (
        <section
            className="
                relative
                w-full
                min-h-screen
                flex
                items-center
                justify-center
                px-6
                py-10
                bg-[#f8f8f8]
            "
        >

            <div
                className="
                    w-full
                    max-w-[500px]
                    bg-white
                    border
                    border-black/10
                    rounded-[30px]
                    p-8
                    shadow-sm
                "
            >

                <h2
                    className="
                        text-[30px]
                        font-semibold
                        mb-6
                    "
                >
                    Login
                </h2>

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="space-y-5"
                >

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="
                            w-full
                            border
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                        "
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="Password"
                        className="
                            w-full
                            border
                            rounded-xl
                            px-4
                            py-3
                            outline-none
                        "
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password:
                                    e.target
                                        .value,
                            })
                        }
                    />

                    {/* Button */}
                    <button
                        className="
                            w-full
                            bg-red-600
                            text-white
                            rounded-xl
                            py-3
                            font-medium
                            hover:bg-black
                            transition
                        "
                    >
                        Login
                    </button>

                </form>

                {/* Message */}
                {message && (
                    <p
                        className="
                            mt-4
                            text-sm
                            text-center
                            text-red-600
                        "
                    >
                        {message}
                    </p>
                )}

                {/* Register */}
                <p
                    className="
                        mt-5
                        text-center
                        text-sm
                    "
                >
                    Not registered?{" "}

                    <Link
                        to="/admin/register"
                        className="
                            text-red-600
                            font-medium
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </section>
    );
};

export default Login;