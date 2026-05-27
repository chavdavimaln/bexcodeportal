// HowWeWork.jsx

import React from "react";
import { Link } from "react-router-dom";

const HowWeWork = () => {
    const steps = [
        {
            no: "01",
            title: "Discovery & scope",
            text: "Share your needs, define what winning looks like"
        },
        {
            no: "02",
            title: "Build your team",
            text: "We match specialists based on skills, speed and goals"
        },
        {
            no: "03",
            title: "Execute & deliver",
            text: "Sprint-based execution with clear milestones and ownership"
        },
        {
            no: "04",
            title: "Scale & support",
            text: "Expand capacity and ongoing support as your business grows"
        }
    ];

    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden ">
            <div className="w-full flex flex-col items-center text-center">

                {/* Title */}
                <h2 className="common-section-title mb-4">
                    How we work
                </h2>

                {/* Paragraph */}
                <p className="common-paragraph max-w-[760px] mb-12">
                    Simple, transparent process from discovery to delivery.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full ">

                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className="relative rounded-[50px] "
                        >
                            {/* Inner Card */}
                            <div className="relative bg-white rounded-[37px] px-6 md:px-8 py-8 h-full overflow-hidden hiw-card">

                                {/* Content */}
                                <div className="relative z-10 text-left">

                                    <div className="text-[42px] sm:text-[52px] lg:text-[64px] leading-none font-medium text-[#FC151533] mb-4 font-['Plus_Jakarta_Sans']">
                                        {item.no}
                                    </div>

                                    <h3 className="text-[#212529] font-['Plus_Jakarta_Sans'] text-[16px] sm:text-[18px] lg:text-[20px] font-medium mb-3">
                                        {item.title}
                                    </h3>

                                    <p className="text-[#212529] font-['Plus_Jakarta_Sans'] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.6] max-w-[340px]">
                                        {item.text}
                                    </p>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>

                {/* Button */}
                <div className="mt-12">
                    <Link
                        to="/contact-us"
                        className="btn_red text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]"
                    >
                        Get a Project Estimate
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HowWeWork;