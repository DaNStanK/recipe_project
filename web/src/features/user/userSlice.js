import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../fetch/fetchUsers";

const storageUser = JSON.parse(localStorage.getItem('user'));

export const fetchLoginUser = createAsyncThunk('users/fetchLoginUser', async (arg, thunkAPI) => {
   try {
      const response = await loginUser(arg);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
});

const initialState = {
   user: {
      user: storageUser ? storageUser?.user : null,
      token: storageUser ? storageUser?.token : null,
      isLoggedIn: storageUser ? true : false
   },
   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setLogout: (state) => {
         return {
            ...state,
            user: null,
            token: null,
            isLoggedIn: null
         };
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.push(action.payload);
         });
   }
});

export const getUser = (state) => state.user;

export const { setLogout } = userSlice.actions;

export default userSlice.reducer;