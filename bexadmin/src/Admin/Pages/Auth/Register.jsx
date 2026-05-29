// Register.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        checked: false,
    });

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (form.fullName.trim() === "") {
            setMessage("Enter full name.");
            return;
        }

        if (!emailRegex.test(form.email)) {
            setMessage("Invalid email.");
            return;
        }

        if (form.password.length < 6) {
            setMessage("Password minimum 6 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (!form.checked) {
            setMessage("Please accept confirmation.");
            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const alreadyUser = users.find(
            (item) => item.email === form.email
        );

        if (alreadyUser) {
            setMessage("Email already registered.");
            return;
        }

        const newUser = {
            id: Date.now(),
            fullName: form.fullName,
            email: form.email,
            password: form.password,
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        setMessage("Registration successful.");
    };

    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="w-full max-w-[550px] mx-auto bg-white border border-black/10 rounded-[30px] p-8 shadow-sm">

                <h2 className="text-[30px] font-semibold mb-6">
                    Register
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                fullName:
                                    e.target.value,
                            })
                        }
                    />

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
                                password:
                                    e.target.value,
                            })
                        }
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full border rounded-xl px-4 py-3 outline-none"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword:
                                    e.target.value,
                            })
                        }
                    />

                    <label className="flex gap-2 text-sm">
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    checked:
                                        e.target
                                            .checked,
                                })
                            }
                        />
                        I confirm all details are correct.
                    </label>

                    <button className="w-full bg-red-600 text-white rounded-xl py-3 font-medium">
                        Register
                    </button>
                </form>

                {message && (
                    <p className="mt-4 text-sm text-center text-red-600">
                        {message}
                    </p>
                )}

                <p className="mt-5 text-center text-sm">
                    Already registered?{" "}
                    <Link
                        to="/admin/login"
                        className="text-red-600 font-medium"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default Register;