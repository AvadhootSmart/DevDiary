import { Link } from "react-router-dom";

export default function Auth() {
    return (
        <>
            <div className="mt-10">
                <h1 className="text-xl">Want to write your own blogs?</h1>
                <div className="mt-5 flex gap-2">
                    <Link
                        to="/Auth"
                        className="border-2 border-[#b8b4b0] rounded-md p-4 "
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </>
    );
}
