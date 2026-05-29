import React from "react";

import { Link } from "react-router-dom";

const AdminFooter = () => {

    return (
        <footer
            className="
                bg-white
                border-t
                border-black/10
                px-6
                py-4
                flex
                flex-col
                md:flex-row
                justify-between
                gap-3
                text-[14px]
            "
        >

            <p>
                © 2026 Bexcode Services
            </p>

            <div className="flex gap-3">

                <Link to="/">
                    Privacy Policy
                </Link>

                <span>|</span>

                <Link to="/">
                    Terms
                </Link>

            </div>

        </footer>
    );
};

export default AdminFooter;