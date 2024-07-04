import React, { useContext } from "react";
import Panel from "./components/Panel";
import { Outlet } from "react-router-dom";
function Admin() {
    return (
        <>
            <div className="w-full min-h-screen bg-[#231e1d] flex">
                <Panel />
                <Outlet />
            </div>
        </>
    );
}

export default Admin;
