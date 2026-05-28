// Capsule.jsx

import React, { useEffect, useRef } from "react";

const Capsule = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const names = [
            "product designer",
            "front end developer",
            "UI designer",
            "back end developer",
            "frontend engineer",
            "manager",
            "seo manager",
            "marketing developer",
            "marketing",
            "marketing specialist",
            "SEO",
            "SEO developer",
            "UX designer",
            "graphic designer",
            "project manager",
            "content writer",
            "data analyst",
            "QA tester",
            "mobile developer",
            "devops engineer",
            "full stack developer",
            "brand strategist",
            "social media manager",
            "growth hacker"
        ];

        const totalCapsules = 24;
        const minPerRow = 4;
        const maxPerRow = 4;

        let created = 0;
        const rows = [];

        container.innerHTML = "";

        while (created < totalCapsules) {
            const rowNumber = rows.length + 1;

            const row = document.createElement("div");

            /* UPDATED CLASS NAME */
            row.className = `row capsule_row_${rowNumber}`;

            const count =
                Math.floor(Math.random() * (maxPerRow - minPerRow + 1)) + minPerRow;

            const capsules = [];

            for (let i = 0; i < count && created < totalCapsules; i++) {
                const cap = document.createElement("div");
                cap.className = "capsule";
                cap.textContent = names[created % names.length];

                row.appendChild(cap);
                capsules.push(cap);
                created++;
            }

            container.appendChild(row);
            rows.push(capsules);
        }

        function animateRows() {
            rows.forEach((capsules, rowIndex) => {
                setTimeout(() => {
                    capsules.forEach((c) => {
                        c.classList.remove("active");
                        void c.offsetWidth;
                    });

                    const randomIndex = Math.floor(
                        Math.random() * capsules.length
                    );

                    capsules[randomIndex].classList.add("active");
                }, rowIndex * 120);
            });
        }

        animateRows();

        const interval = setInterval(animateRows, 1100);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="capsules_wrapper"
            id="capsules_wrapper"
            ref={containerRef}
        ></div>
    );
};

export default Capsule;