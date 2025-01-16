import { Outlet, useNavigate } from "react-router-dom";
import MobilePanel from "./components/MobilePanel";
import { useContext, useEffect } from "react";
import AuthContext from "./context/AuthContext";
function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/");
  });
  return (
    <>
      <div className="w-full min-h-screen bg-[#231e1d] flex">
        <div className="sm:block flex flex-col">
          <Outlet />
          <MobilePanel />
        </div>
      </div>
    </>
  );
}

export default Admin;
