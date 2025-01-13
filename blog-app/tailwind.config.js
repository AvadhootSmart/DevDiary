/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        screens: {
            sm: "380px",
            md: "768px",
            lg: "768px",
            xl: "1440px",
        },
        extend: {},
    },
    plugins: [],
};
