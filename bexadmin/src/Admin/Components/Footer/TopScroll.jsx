import React, { useEffect, useState } from "react";

const TopScroll = () => {
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
            const hide = section.hasAttribute("data-hide-scroll");

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

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const colorClass = isWhite ? "text-white" : "text-black";
    if (isHidden) return null;
    return (
        <button
            onClick={scrollTop}
            className={`hidden xl:flex fixed left-[-40px] top-1/2 -translate-y-1/2 -rotate-90 z-[999]
            text-[13px] tracking-[3px] uppercase transition-all duration-300 mt-5
            
            ${colorClass}
            hover:text-[#EA3C26]`}
        >
            Scroll To Top
        </button>
    );
};

export default TopScroll;