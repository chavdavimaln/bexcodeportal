/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            spacing: {
                13: '4rem',
                14: '5rem',
                15: '6rem',
                16: '7rem',
                17: '8rem',
            },
        },
    },
    plugins: [],
}
