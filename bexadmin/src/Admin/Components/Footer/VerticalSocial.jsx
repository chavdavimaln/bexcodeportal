// VerticalSocial.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaPinterestP,
} from "react-icons/fa";

const VerticalSocial = () => {
    const [isWhite, setIsWhite] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const detectTheme = () => {
            const x = window.innerWidth - 25;
            const y = window.innerHeight / 2;

            const el = document.elementFromPoint(x, y);

            if (!el) return;

            /* nearest section only */
            const section = el.closest("section, footer");

            if (!section) return;

            /* hide social */
            const hide = section.hasAttribute("data-hide-social");

            /* theme */
            const theme = section.getAttribute("data-social-theme");

            setIsHidden(hide);
            setIsWhite(theme === "dark");
        };

        detectTheme();

        window.addEventListener("scroll", detectTheme);
        window.addEventListener("resize", detectTheme);

        return () => {
            window.removeEventListener("scroll", detectTheme);
            window.removeEventListener("resize", detectTheme);
        };
    }, []);

    const colorClass = isWhite ? "text-white" : "text-black";

    if (isHidden) return null;

    return (
        <div className="hidden xl:flex fixed right-[20px] top-1/2 -translate-y-1/2 z-[999] flex-col items-center gap-3 mt-5">

            <span
                className={`rotate-180 [writing-mode:vertical-rl] uppercase tracking-[3px] text-[12px] font-medium ${colorClass}`}
            >
                Follow Us
            </span>

            <Link to="/" className={`${colorClass} hover:text-[#EA3C26] transition`}>
                <FaPinterestP size={18} />
            </Link>

            <Link to="/" className={`${colorClass} hover:text-[#EA3C26] transition`}>
                <FaInstagram size={18} />
            </Link>

            <Link to="/" className={`${colorClass} hover:text-[#EA3C26] transition`}>
                <FaLinkedinIn size={18} />
            </Link>

            <Link to="/" className={`${colorClass} hover:text-[#EA3C26] transition`}>
                <FaFacebookF size={18} />
            </Link>

        </div>
    );
};

export default VerticalSocial;