// CapabilityBuckets.jsx

import React from "react";
import {
    ChevronsLeftRight,
} from "lucide-react";

const CapabilityBuckets = () => {
    const cards = [
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    Web & Mobile <br />
                    Development
                </>
            ),
            text: "MVPs, product features, and modern frontends."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    DevOps & <br />
                    Cloud
                </>
            ),
            text: "Reliable infra, autoscaling, cost optimization."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    AI/ML & <br />
                    Data
                </>
            ),
            text: "Model prototyping, analytics pipelines, dashboards."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    Support & <br />
                    Helpdesk
                </>
            ),
            text: "MVPs, product features, and modern frontends."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    QA <br />
                    Testing
                </>
            ),
            text: "Test plans, automation, release readiness.."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    UX/UI <br />
                    Product Design
                </>
            ),
            text: "Research to pixel-perfect interfaces."
        },
        {
            icon: <ChevronsLeftRight size={22} strokeWidth={2} />,
            title: (
                <>
                    Staff <br />
                    Augmentation
                </>
            ),
            text: "Dedicated developers & teams embedded with you."
        }
    ];

    return (
        <section className="relative w-full flex items-center px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

                {/* Left Side Title */}
                <div className="lg:col-span-1">
                    <h2 className="common-section-title">
                        Capability <br /> buckets
                    </h2>
                </div>

                {/* Right Side Cards */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                        {cards.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-[20px] border border-[#E8E8E8] bg-white p-5 xl:p-7 flex gap-4 h-full min-h-[150px] hover:shadow-md transition-all duration-300"
                            >
                                {/* Icon */}
                                <div className="w-[41px] h-[41px] min-w-[41px] rounded-lg bg-[#FFF3F1] flex items-center justify-center text-[#EA3C26]">
                                    {item.icon}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-start">
                                    <h3 className="font-['Plus_Jakarta_Sans'] text-black font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-tight mb-[10px]">
                                        {item.title}
                                    </h3>

                                    <p className="font-['Plus_Jakarta_Sans'] text-[#45556C] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.5]">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default CapabilityBuckets;