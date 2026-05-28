// Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthData from "./AuthData";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = AuthData.find(
            (item) => item.email === form.email
        );

        if (!user) {
            setMessage("User not registered.");
            return;
        }

        if (user.password !== form.password) {
            setMessage("Wrong password.");
            return;
        }

        setMessage("Login successful.");

        // Redirect to Home page after success
        setTimeout(() => {
            navigate("/admin");
        }, 1000);
    };

    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="w-full max-w-[500px] mx-auto bg-white border border-black/10 rounded-[30px] p-8 shadow-sm">

                <h2 className="text-[30px] font-semibold mb-6">
                    Login
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                    />

                    <button className="w-full bg-red-600 text-white rounded-xl py-3 font-medium">
                        Login
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-sm text-center text-red-600">
                        {message}
                    </p>
                )}

                <p className="mt-5 text-center text-sm">
                    Not registered?{" "}
                    <Link
                        to="/admin/register"
                        className="text-red-600 font-medium"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default Login;