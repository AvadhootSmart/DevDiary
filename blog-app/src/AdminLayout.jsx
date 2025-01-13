import React, { useContext } from "react";
import Panel from "./components/Panel";
import { Outlet } from "react-router-dom";
import MobilePanel from "./components/MobilePanel";
function Admin() {
    return (
        <>
            <div className="w-full min-h-screen bg-[#231e1d] flex">
                <div className="sm:hidden">
                    <Panel />
                    <Outlet />
                </div>
                <div className="sm:block flex flex-col">
                    <Outlet />
                    <MobilePanel />
                </div>
            </div>
        </>
    );
}

export default Admin;
