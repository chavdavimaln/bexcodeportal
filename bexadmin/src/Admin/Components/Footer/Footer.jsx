// Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import TopScroll from "./TopScroll";
import VerticalSocial from "./VerticalSocial";

import LogoWhite from "../../../Images/logo_white.png";
import Img1 from "../../../Images/tpa_ribbon.png";
import Img2 from "../../../Images/accredited_agency.png";
import FlagUSA from "../../../Images/flag_us.png";
import FlagIndia from "../../../Images/flag_india.png";
import FlagCanada from "../../../Images/flag_canada.png";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <>

            <footer
                className="relative w-full bg-black text-white px-6 md:px-12 2xl:px-14 py-10 md:py-14"
                data-social-theme="dark"
            >
                <div className="w-full">

                    {/* ROW 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-12">

                        {/* Column 1 */}
                        <div>
                            <Link to="/" className="inline-block mb-8">
                                <img
                                    src={LogoWhite}
                                    alt="Logo"
                                    className="h-[45px] w-auto"
                                />
                            </Link>

                            <div className="flex flex-wrap gap-4 mb-8 md:text-[16px] text-[14px]">
                                <Link to="/">Fb.</Link>
                                <Link to="/">Tw.</Link>
                                <Link to="/">Lk.</Link>
                                <Link to="/">Lg.</Link>
                                <Link to="/">Yt.</Link>
                                <Link to="/">Pin.</Link>
                            </div>

                            <p className="text-white/50 md:text-[14px] text-[12px] uppercase mb-2">
                                For Inquiry
                            </p>

                            <Link
                                to="/"
                                className="md:text-[16px] text-[14px]"
                            >
                                info@bexcodeservices.com
                            </Link>
                        </div>

                        {/* Column 2 */}
                        <div>
                            <h3 className="text-[26px] mb-8">Address</h3>

                            <div className="space-y-6 text-white/80 leading-[1.7]">

                                <div className="flex gap-3">
                                    
                                <img
                                    src={FlagUSA}
                                    alt="USA Flag"
                                    className="w-6 h-6 object-contain mt-1 shrink-0"
                                />
                                <p>
                                    908 Breckenridge Parkway, Tampa,
                                    FL 33610, USA
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <img
                                    src={FlagCanada}
                                    alt="Canada Flag"
                                    className="w-6 h-6 object-contain mt-1 shrink-0"
                                />
                                <p>
                                    3190 Devon Dr, Windsor,
                                    ON N8X 4L2, Canada
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <img
                                    src={FlagIndia}
                                    alt="India Flag"
                                    className="w-6 h-6 object-contain mt-1 shrink-0"
                                />
                                <p>
                                    Basement-11, Vandematram Apartment,
                                    Ghatlodia, Ahmedabad,
                                    Gujarat-380061, India
                                </p>
                            </div>

                            </div>
                        </div>

                        {/* Column 3 */}
                        <div>
                            <h3 className="text-[26px] mb-4">
                                Work inquiries
                            </h3>

                            <p className="text-white/70 mb-4">
                                Interested in working with us?
                            </p>

                            <Link
                                to="/"
                                className="text-[18px] md:text-[22px]"
                            >
                                hr@bexcodeservices.com
                            </Link>

                            <div className="flex gap-4 mt-8 md:flex-nowrap flex-wrap">
                                <Link to="/">
                                    <img
                                        src={Img1}
                                        alt=""
                                        className="h-[100px]"
                                    />
                                </Link>

                                <Link to="/">
                                    <img
                                        src={Img2}
                                        alt=""
                                        className="h-[100px]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between gap-4 text-white/70 text-[14px]">

                        <p>
                            ©{year} Bexcode Services | All rights reserved
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            <Link to="/privacy-policy">
                                Privacy & Cookie Policy
                            </Link>

                            <span>|</span>

                            <Link to="/terms-of-service">
                                Terms of Service
                            </Link>
                        </div>

                    </div>
                </div>
            </footer>
            
            {/* Fixed Side Components */}
            <TopScroll />
            <VerticalSocial />
        </>
    );
};

export default Footer;



