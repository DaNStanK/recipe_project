import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN":
         return {
            ...state,
            user: action.payload.email,
            isLoggedIn: action.payload.isLoggedIn,
            token: action.payload.token
         };
      case "LOGOUT":
         return {
            ...state,
            user: null,
            isLoggedIn: null,
            token: null
         };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, {
      user: null
   });

   useEffect(() => {
      const storageUser = JSON.parse(localStorage.getItem('user'));

      if (!state.user && storageUser) {
         dispatch({
            type: 'LOGIN',
            payload: storageUser
         });
      }

   }, []);

   console.log(state);
   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};
