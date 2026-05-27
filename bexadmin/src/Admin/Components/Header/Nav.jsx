// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import Logo from "../../../Images/logo.png";

const Nav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-sm px-6 md:px-12 py-4 relative z-50">
            <div className="mx-auto flex items-center justify-between">

                {/* Left Logo */}
                <div className="text-2xl font-bold text-black">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="lg:w-[170px] w-[100px]" />
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-4 xl:pr-[7vw]">

                    {/* Menu Box */}
                    <div className="flex items-center gap-6 border border-black/20 rounded-full px-6 py-3">

                        {/* Services Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-black font-medium hover:text-red-500 transition">
                                Services <ChevronDown size={16} />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute top-full left-0 mt-3 w-60 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                <Link
                                    to="/virtual-assistant"
                                    className="block px-5 py-3 hover:bg-gray-100 rounded-t-xl"
                                >
                                    Virtual Assistant
                                </Link>
                                <Link
                                    to="/marketing-support"
                                    className="block px-5 py-3 hover:bg-gray-100"
                                >
                                    Marketing Support
                                </Link>
                                <Link
                                    to="/accounting-services"
                                    className="block px-5 py-3 hover:bg-gray-100 rounded-b-xl"
                                >
                                    Accounting Services
                                </Link>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <Link
                            to="/portfolio"
                            className="text-black font-medium hover:text-red-500 transition"
                        >
                            Portfolio
                        </Link>

                        {/* Blogs */}
                        <Link
                            to="/blogs"
                            className="text-black font-medium hover:text-red-500 transition"
                        >
                            Blogs
                        </Link>
                    </div>

                    {/* Contact Button */}
                    <Link
                        to="/contact-us"
                        className="relative px-6 py-3 rounded-full bg-red-600 text-white font-medium overflow-hidden group"
                    >
                        <span className="relative z-10">Contact Us</span>

                        {/* Circular Border Animation */}
                        <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-spin-slow"></span>
                    </Link>
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden flex items-center gap-3">

                    {/* Contact Button */}
                    <Link
                        to="/contact-us"
                        className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium ml-[15px]"
                    >
                        Contact Us
                    </Link>

                    {/* Hamburger */}
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
    <div className="lg:hidden fixed top-[78px] left-0 w-full z-[999] px-6">
        <div className="bg-white shadow-xl rounded-2xl p-5 space-y-4 border border-gray-100">

            {/* Services */}
            <div>
                <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="w-full flex justify-between items-center font-medium text-black"
                >
                    Services <ChevronDown size={18} />
                </button>

                {serviceOpen && (
                    <div className="mt-3 ml-3 space-y-2">
                        <Link
                            to="/virtual-assistant"
                            className="block text-gray-700"
                        >
                            Virtual Assistant
                        </Link>

                        <Link
                            to="/marketing-support"
                            className="block text-gray-700"
                        >
                            Marketing Support
                        </Link>

                        <Link
                            to="/accounting-services"
                            className="block text-gray-700"
                        >
                            Accounting Services
                        </Link>
                    </div>
                )}
            </div>

            {/* Portfolio */}
            <Link
                to="/portfolio"
                className="block font-medium text-black"
            >
                Portfolio
            </Link>

            {/* Blogs */}
            <Link
                to="/blogs"
                className="block font-medium text-black"
            >
                Blogs
            </Link>

        </div>
    </div>
)}
        </nav>
    );
};

export default Nav;