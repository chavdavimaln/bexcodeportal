// FAQs.jsx

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
            question: "What do tech services include?",
            answer:
                (
                    <>
                        Tech services cover end-to-end development of <strong>website development, mobile app development, and custom software development,</strong> along with ongoing technical support and maintenance. The focus is on scalable, high-performance solutions aligned with business goals."
                    </>
                ),
        },
        {
            question: "How do dedicated resources operate?",
            answer: (
                <>
                    <strong>Dedicated development resources</strong> work as an extension of the team, aligned with your workflows, timelines, and priorities with privacy. They provide consistent ownership across development, support, and ongoing technical tasks.
                </>
            )
        },
        {
            question: "What is the typical onboarding and deployment timeline?",
            answer: (
                <>
                    Once the scope for your <strong>software development services</strong> or <strong>web development project</strong> is defined, onboarding begins immediately. Setup, access, and alignment are handled in parallel to ensure execution starts quickly and without delays.
                </>
            )
        },
        {
            question: "Do you support compliance and data security standards?",
            answer:
                "Our wide experience includes working with healthcare-focused solutions that require adherence to HIPAA compliance and strict data privacy standards. Systems are built with security, confidentiality, and regulatory requirements in mind."
        }
    ];

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full px-6 2xl:px-14 md:px-12 py-10 md:py-14 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                {/* Left Title */}
                <div className="lg:col-span-4">
                    <h2 className="common-section-title">
                        FAQs
                    </h2>
                </div>

                {/* Right FAQ List */}
                <div className="lg:col-span-8 flex flex-col gap-5">

                    {faqData.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border border-[#EA3C26] rounded-[20px] overflow-hidden transition-all duration-300"
                            >
                                {/* Question */}
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
                                >
                                    <span className="font-['Plus_Jakarta_Sans'] text-[#212529] font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-snug">
                                        {item.question}
                                    </span>

                                    <span className="text-[#EA3C26] shrink-0">
                                        {isOpen ? (
                                            <ChevronUp size={22} />
                                        ) : (
                                            <ChevronDown size={22} />
                                        )}
                                    </span>
                                </button>

                                {/* Answer */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-5 md:px-6 pb-5">
                                            <p className="font-['Plus_Jakarta_Sans'] text-[#45556C] text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7]">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default FAQs;