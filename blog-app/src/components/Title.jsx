import Line from "./Line";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function Title({ title }) {
    useGSAP(() => {
        gsap.from(".Heading", {
            duration: 0.9,
            opacity: 0,
            y: 100,
        });
    });
    return (
        <>
            <div className="flex justify-around text-[#b8b4b0] w-full lg:mt-[20vh] sm:mt-[10vh] items-center">
                <Line />
                <h2 className="Heading lg:text-4xl sm:text-3xl font-[Alegreya] uppercase">
                    {title}
                </h2>
                <Line />
            </div>
        </>
    );
}

export default Title;
