import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
   const context = useContext(AuthContext);

   if (!context) {
      throw Error('Use of context must be inside of context provider!');
   }

   return context;
};
