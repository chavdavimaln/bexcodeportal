import React from "react";

const AdminFooter = () => {
    const year =
        new Date().getFullYear();
    return (
        <footer
            className="
            mt-10
            border-t
            border-black/10
            pt-5
            text-sm
            text-gray-500
            flex
            justify-between
            flex-wrap
            gap-3
        "
        >

            <p>
                © {year} Bexcode Services
            </p>

            <div className="flex gap-3">

                <button>
                    Privacy Policy
                </button>

                <button>
                    Terms
                </button>

            </div>

        </footer>
    );

};

export default AdminFooter;