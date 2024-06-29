import { Link } from "react-router-dom";

export default function Auth() {
    return (
        <>
            <div>
                <h1>Want to write your own blogs?</h1>
                <Link to="/Login">Sign In</Link>
                <Link to="/Register">Sign In</Link>
            </div>
        </>
    );
}
