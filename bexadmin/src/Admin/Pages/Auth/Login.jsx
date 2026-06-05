// Admin/Pages/Auth/Login.jsx

import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import { API_URL } from "../../../Config/api";

const Login = () => {

    const navigate =
        useNavigate();

    const [form, setForm] = useState({ email: "", password: "", });

    const [message, setMessage] = useState("");

    const handleSubmit =
        async (e) => {
            e.preventDefault();
            setMessage("");
            try {
                const response =
                    await fetch(
                        `${API_URL}/admin/auth/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: form.email,
                                password: form.password,
                            }),
                        }
                    );

                const result = await response.json();
                if (!response.ok || !result.status) {
                    setMessage(result.message || "Login failed");
                    return;
                }

                localStorage.setItem("token", result.data.token);
                localStorage.setItem("loggedUser", JSON.stringify(result.data.user));
                setMessage(result.message);

                setTimeout(
                    () => {

                        navigate(
                            "/admin"
                        );

                    },
                    1000
                );

            } catch (error) {

                console.error(
                    error
                );

                setMessage(
                    "Unable to connect server."
                );
            }
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
                                    e.target.value,
                            })
                        }
                    />

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
                                    e.target.value,
                            })
                        }
                    />

                    <button
                        type="submit"
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