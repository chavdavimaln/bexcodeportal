// SubscribeForm.jsx

import React, { useState } from "react";

const SubscribeForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await fetch(
                "http://apibw.rxavenue.com/api/contactus",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        fname: "Newsletter",
                        lname: "Subscriber",
                        email: email, // user entered email
                        phone: "0000000000",
                        topic: "Newsletter Subscription",
                        message:
                            "New newsletter subscriber. Notify aakash@bexcodeservices.com",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to subscribe");
            }

            const result = await response.json();

            setMessage(
                result.message || "Email sent successfully"
            );

            setEmail("");
        } catch (err) {
            setError(
                err.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[720px] border border-white/30 rounded-full p-2 flex items-center gap-2 bg-transparent"
            >
                {/* Input */}
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-4 md:px-6 py-3 text-white placeholder-white/60 outline-none font-['Plus_Jakarta_Sans'] text-[14px] sm:text-[16px] md:text-[18px]"
                    required
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#EA3C26] hover:bg-white hover:text-[#EA3C26] text-white rounded-full px-5 sm:px-6 md:px-8 py-3 font-['Plus_Jakarta_Sans'] text-[14px] sm:text-[16px] md:text-[18px] font-medium transition-all duration-300 whitespace-nowrap disabled:opacity-70"
                >
                    {loading ? "Sending..." : "Subscribe"}
                </button>
            </form>

            {/* Success Message */}
            {message && (
                <p className="text-green-400 mt-4 text-sm md:text-base">
                    {message}
                </p>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-red-400 mt-4 text-sm md:text-base">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SubscribeForm;