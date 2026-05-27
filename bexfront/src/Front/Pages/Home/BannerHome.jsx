// BannerHome.jsx

import React from "react";
import { Link } from "react-router-dom";
import Capsule from "./Capsule";

// import bannerBg from "../../../Images/IT_banner.png";

const BannerHome = () => {
    return (
        <>
            <section className="relative w-full flex items-center pl-6 2xl:pl-14 md:pl-12 py-10 md:py-14 overflow-hidden social-dark"
            data-hide-social data-hide-scroll
        >
                <div className="grid grid-cols-1 min-[992px]:grid-cols-2 items-center gap-10">

                    {/* Left Content */}
                    <div className="flex flex-col justify-center">

                        {/* Common Website Heading */}
                        <h1 className="common-heading mb-6">
                            <span className="text-[#3C3838] block">IT, without</span>
                            <span className="text-[#EA3C26] block">the hiring chaos.</span>
                        </h1>

                        {/* Paragraph */}
                        <p className="banner-text mb-8">
                            FROM WEB & APP DEV TO DEVOPS AND DATA, GET DEDICATED ENGINEERS WHO
                            OWN DELIVERY — SHIPPED ON YOUR TIMELINE.
                        </p>

                        {/* Button */}
                        <div className="mt-8">
                            <Link
                                to="/contact-us"
                                className="btn_red text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]"
                            >
                                Scope My Scope
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full rounded-3xl capsule_col">
                        <Capsule />
                    </div>

                </div>
                <div className="min-[992px]:w-[50%] w-full lg:h-[45vh] h-[200px] absolute right-0 bottom-0 bg-gradient-to-t from-[#fff] via-[#fff]/80 to-transparent pointer-events-none select-none"></div>
                {/* </div> */}
            </section>
        </>
    );
};

export default BannerHome;