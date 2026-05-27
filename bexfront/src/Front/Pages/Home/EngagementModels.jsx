import React from "react";
import TeamSlider from "./TeamSlider";
// import modelImg from "../../../Images/img_engagement.png";

const EngagementModels = () => {
    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="w-full border border-[#E8E8E8] rounded-[30px] md:rounded-[50px] p-6 md:p-10 lg:p-14">

                <div className="flex flex-col gap-10">

                    {/* Title */}
                    <div className="text-center">
                        <h2 className="common-section-title">
                            Engagement Models
                        </h2>
                    </div>

                    {/* Replace Image */}
                    <div>
                        <TeamSlider />
                    </div>
                    {/* <div>
                        <img
                            src={modelImg}
                            alt="Engagement Models"
                            className="w-full max-w-[880px] h-auto mx-auto object-contain"
                        />
                    </div> */}
                    {/* Content */}
                    <div className="flex flex-col w-full max-w-[800px] md:flex-row mx-auto md:items-center justify-center gap-8 md:gap-10">

                        <div className="flex-1">
                            <h3 className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] mb-3">
                                Dedicated resource
                            </h3>

                            <p className="text-[#45556C] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.6]">
                                Full-time team members aligned to your timeline.
                            </p>
                        </div>

                        <div className="hidden md:block w-[1px] bg-[#EA3C26] min-h-[90px]"></div>
                        <div className="block md:hidden h-[1px] bg-[#EA3C26] w-full"></div>

                        <div className="flex-1">
                            <h3 className="font-medium text-[16px] sm:text-[18px] lg:text-[20px] mb-3">
                                IT support services
                            </h3>

                            <p className="text-[#45556C] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.6]">
                                Proactive support for stability, scale, and performance.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default EngagementModels;