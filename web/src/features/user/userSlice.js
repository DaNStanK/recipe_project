import { createSlice } from "@reduxjs/toolkit";

const storageUser = JSON.parse(localStorage.getItem('user'))

const initialState = {
   user: storageUser ? storageUser?.email : null,
   token: storageUser ? storageUser?.token : null,
   isLoggedIn: storageUser ? true : null
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setLoginUser: (state, action) => {
         return state.push(action.payload);
      },
      setLogoutUser: (state) => {
         return {
            ...state,
            user: null,
            token: null,
            isLoggedIn: null
         };
      }
   }
});

export const getUser = (state) => state.user;

export const { setLoginUser, setLogoutUser } = userSlice.actions;

export default userSlice.reducer;