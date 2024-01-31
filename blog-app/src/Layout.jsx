import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top of the page whenever the route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
