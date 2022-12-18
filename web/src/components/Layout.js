// react hook
import { useEffect } from "react";

// components
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar"

import { useAuthContext } from "../hooks/useAuthContext";

export const Layout = () => {
   const { state } = useAuthContext();

   useEffect(() => {
      console.log(state);
   }, []);

   return (
      <>
         <Navbar />
         <main id="App">
            <Outlet />
         </main>
         <Footer />
      </>
   );
};
