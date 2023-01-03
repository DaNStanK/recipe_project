import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storageUser = JSON.parse(localStorage.getItem('user'));

export const loginUser = createAsyncThunk('users/loginUsers', async (data) => {
   try {
      let out = await fetch(
         '/api/v1/auth/login',
         {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json'
            }
         }
      );
      // check if the fetch was successful   
      if (!out.ok) {
         return new Error(out.statusText);
      }

      let res = await out.json();
      let u = {
         user: data.email,
         token: res.token,
         isLoggedIn: true
      };
      localStorage.setItem('user', JSON.stringify(u));
      return u;
   } catch (err) {
      return console.log(err.message);
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
      setLogin: (state, action) => {
         return {
            ...state,
            user: action.payload
         };
      },
      setLogout: (state) => {
         return {
            ...state,
            user: null,
            token: null,
            isLoggedIn: null
         }
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })
   }
});

export const getUser = (state) => state.user;

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;