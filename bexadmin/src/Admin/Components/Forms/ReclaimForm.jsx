// Reclaim.jsx

import React, { useState } from "react";

const ReclaimForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");

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
                        fname: "Reclaim",
                        lname: "Lead",
                        email: email, // user entered email
                        phone: "0000000000",
                        topic: "Get Started Now",
                        message:
                            "Lead submitted from Reclaim CTA form. Send reply to aakash@bexcodeservices.com",
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to submit form");
            }

            const result = await response.json();

            setSuccessMsg(
                result.message || "Email sent successfully"
            );

            setEmail("");
        } catch (error) {
            setErrorMsg(
                error.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="
                    w-full max-w-[900px] mx-auto border border-white/30
                    rounded-[24px] sm:rounded-full
                    p-2 sm:p-2.5
                    flex flex-col sm:flex-row
                    items-stretch sm:items-center
                    gap-3 sm:gap-2
                    bg-white
                "
            >
                {/* Input */}
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="
                        flex-1 bg-white
                        rounded-[18px] sm:rounded-full
                        px-4 sm:px-5 md:px-6
                        py-3
                        text-[#212529]
                        placeholder-[#7A7A7A]
                        outline-none
                        font-['Plus_Jakarta_Sans']
                        text-[14px] sm:text-[16px] md:text-[18px]
                    "
                />

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full sm:w-auto
                        rounded-[18px] sm:rounded-full
                        px-5 sm:px-7 md:px-10
                        py-3
                        text-white
                        font-['Plus_Jakarta_Sans']
                        text-[14px] sm:text-[16px] md:text-[18px]
                        font-medium
                        whitespace-nowrap
                        transition-all duration-300
                        hover:scale-[1.02]
                        disabled:opacity-70
                    "
                    style={{
                        backgroundImage:
                            "linear-gradient(90deg, #EA3C26 0%, #842215 100%)"
                    }}
                >
                    {loading ? "Sending..." : "Get Started Now"}
                </button>
            </form>

            {/* Success Message */}
            {successMsg && (
                <p className="text-green-600 text-center mt-4 text-sm sm:text-base max-w-[900px] mx-auto bg-">
                    {successMsg}
                </p>
            )}

            {/* Error Message */}
            {errorMsg && (
                <p className="text-red-600 text-center mt-4 text-sm sm:text-base">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};

export default ReclaimForm;