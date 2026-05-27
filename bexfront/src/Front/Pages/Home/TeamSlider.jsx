// TeamSlider.jsx

import React, { useEffect, useRef, useState } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import Favicon from "../../../Images/fav.png";
import { gsap } from "gsap";

/* ----------------------------------
Notification Data (Slider Cards)
---------------------------------- */
const notifications = [
    {
        id: 1,
        name: "Jasmine",
        role: "Ui/Ux Designer",
        message: "Prototype is ready for review — your feedback matters!",
    },
    {
        id: 2,
        name: "Daniel",
        role: "Ui/Ux Designer",
        message: "New design update is live — take a look and share your feedback!",
    },
    {
        id: 3,
        name: "Liam",
        role: "Developer",
        message: "Latest design iteration uploaded — ready for testing!",
    },
    {
        id: 4,
        name: "Sophia",
        role: "Project Manager",
        message: "Client approved the final homepage revision.",
    },
];

const TeamSlider = () => {
    /* ----------------------------------
    Active Slide State
    ---------------------------------- */
    const [active, setActive] = useState(0);

    /* ----------------------------------
    Card DOM refs for GSAP animation
    ---------------------------------- */
    const cardsRef = useRef([]);

    /* ----------------------------------
    Auto Slide Timer Ref
    ---------------------------------- */
    const timerRef = useRef(null);

    /* ----------------------------------
    Next Slide Function
    ---------------------------------- */
    const nextSlide = () => {
        setActive((prev) => (prev + 1) % notifications.length);
    };

    /* ----------------------------------
    Previous Slide Function
    ---------------------------------- */
    const prevSlide = () => {
        setActive((prev) =>
            prev === 0 ? notifications.length - 1 : prev - 1
        );
    };

    /* ----------------------------------
    Start Auto Slide
    ---------------------------------- */
    const startAutoSlide = () => {
        stopAutoSlide();

        timerRef.current = setInterval(() => {
            nextSlide();
        }, 2500);
    };

    /* ----------------------------------
    Stop Auto Slide
    ---------------------------------- */
    const stopAutoSlide = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    /* ----------------------------------
    Auto Slide on Load
    ---------------------------------- */
    useEffect(() => {
        const startAutoSlide = () => {
            stopAutoSlide();

            timerRef.current = setInterval(() => {
                setActive((prev) => (prev + 1) % notifications.length);
            }, 2500);
        };

        startAutoSlide();

        return () => stopAutoSlide();
    }, []);

    /* ----------------------------------
    GSAP Card Stack Animation
    ---------------------------------- */
    useEffect(() => {
        cardsRef.current.forEach((card, i) => {
            const pos =
                (i - active + notifications.length) %
                notifications.length;

            /* Front Card */
            if (pos === 0) {
                gsap.to(card, {
                    y: 110,
                    scale: 1,
                    opacity: 1,
                    zIndex: 30,
                    duration: 0.7,
                    ease: "power3.out",
                });

                /* Middle Card */
            } else if (pos === 1) {
                gsap.to(card, {
                    y: 10,
                    scale: 0.87,
                    opacity: 1,
                    zIndex: 20,
                    duration: 0.7,
                    ease: "power3.out",
                });

                /* Top Card */
            } else if (pos === 2) {
                gsap.to(card, {
                    y: -70,
                    scale: 0.77,
                    opacity: 1,
                    zIndex: 10,
                    duration: 0.7,
                    ease: "power3.out",
                });

                /* Hidden Cards */
            } else {
                gsap.to(card, {
                    y: -50,
                    scale: 0.75,
                    opacity: 0,
                    zIndex: 0,
                    duration: 0.7,
                    ease: "power3.out",
                });
            }
        });
    }, [active]);

    return (
        <div
            className="group w-full max-w-[820px] mx-auto rounded-[40px] shadow-xl bg-white overflow-hidden border border-[#E8E8E8]"

            /* Pause Slider on Hover */
            onMouseEnter={stopAutoSlide}

            /* Resume Slider on Leave */
            onMouseLeave={startAutoSlide}
        >

            {/* ==================================
            Header Area
            ================================== */}
            <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-5 border-b border-[#E8E8E8]">

                {/* Left Side Logo + Text */}
                <div className="flex items-center gap-4 py-4">
                    <div className="w-[70px] h-[70px] rounded-full bg-[#EAEAEA] flex items-center justify-center p-2">
                        <img
                            src={Favicon}
                            alt="Favicon"
                            className="h-[40px]"
                        />
                    </div>

                    <div>
                        <h4 className="text-[20px] sm:text-[24px] lg:text-[30px] font-semibold text-black leading-none">
                            Team Available
                        </h4>

                        <p className="text-[20px] sm:text-[24px] text-[#EA3C26] leading-none">
                            bexcode
                        </p>
                    </div>
                </div>

                {/* Right Side Arrows */}
                <div className="flex gap-2">

                    {/* Previous */}
                    <button
                        onClick={prevSlide}
                        className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#EA3C26]
                        opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Next */}
                    <button
                        onClick={nextSlide}
                        className="w-10 h-10 rounded-full border border-[#E8E8E8] flex items-center justify-center text-[#EA3C26]
                        opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                    >
                        <ChevronRight size={20} />
                    </button>

                </div>
            </div>

            {/* ==================================
            Slider Body
            ================================== */}
            <div className="relative h-[330px] md:h-[300px] px-4 md:px-6 py-6">

                <div className="relative w-full max-w-[620px] h-[350px] mx-auto">

                    {notifications.map((item, index) => (
                        <div
                            key={item.id}

                            /* Save card refs for GSAP */
                            ref={(el) =>
                                (cardsRef.current[index] = el)
                            }

                            className="absolute left-0 right-0 mx-auto w-[100%] flex items-center justify-between bg-[#fff] rounded-[25px] px-6 py-5 shadow-xl min-h-[130px]"
                        >
                            <div className="flex gap-4 items-start w-[100%]">

                                {/* Bell Icon */}
                                <div className="w-13 h-13 rounded-full bg-[#e8e8e8] flex items-center justify-center shrink-0">
                                    <Bell
                                        size={30}
                                        className="text-[#ff3b1d] fill-[#ff3b1d]"
                                    />
                                </div>

                                {/* Text Content */}
                                <div className="flex-1">

                                    {/* Name + Time */}
                                    <div className="flex justify-between gap-4">
                                        <h3 className="text-[14px] sm:text-[18px] lg:text-[24px] text-black leading-tight">
                                            <span className="font-bold">
                                                {item.name}
                                            </span>{" "}
                                            <span className="font-normal">
                                                {item.role}
                                            </span>
                                        </h3>

                                        <span className="text-[14px] sm:text-[16px] lg:text-[20px] text-gray-500 shrink-0">
                                            Now
                                        </span>
                                    </div>

                                    {/* Message */}
                                    <p className="text-[12px] sm:text-[18px] lg:text-[22px] text-[#1f1f1f] leading-[1.35] mt-2">
                                        {item.message}
                                    </p>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default TeamSlider;