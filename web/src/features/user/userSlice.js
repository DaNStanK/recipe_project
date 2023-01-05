import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../fetch/fetchUsers";


export const fetchLoginUser = createAsyncThunk('users/fetchLoginUser', async (arg, thunkAPI) => {
   try {
      const response = await loginUser(arg);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
});

export const fetchUpdateUser = createAsyncThunk('users/fetchUpdateUser', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await loginUser(arg, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
});

const storageUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
   user: {
      email: storageUser ? storageUser?.email : null,
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
            isLoggedIn: false
         };
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
         })
         .addCase(fetchUpdateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = {
               ...state.user,
               user: action.payload.email
            };
         });
   }
});

export const getUser = (state) => state.user;
export const { setLogout } = userSlice.actions;
export default userSlice.reducer;