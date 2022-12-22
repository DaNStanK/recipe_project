import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
   switch (action.type) {
      case "LOGIN":
         return {
            ...state,
            user: action.payload.user,
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

const userStorage = JSON.parse(localStorage.getItem('user'));

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, {
      user: userStorage ? userStorage.user : null,
      isLoggedIn: userStorage ? true : false,
      token: userStorage ? userStorage.token : null
   });

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};
