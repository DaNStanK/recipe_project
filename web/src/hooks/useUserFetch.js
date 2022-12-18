import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setLoginUser } from "../features/user/userSlice";

export const useUserFetch = () => {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [data, setData] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);

   const createAccount = async (userInput) => {
      setError(null);
      setIsPending(true);
      try {
         let out = await fetch(
            '/api/v1/auth/create-account',
            {
               method: 'post',
               body: JSON.stringify(userInput),
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );

         //check if the login was successful
         if (!out.ok) {
            setError(out.statusText);
            throw new Error(out.statusText);
         }

         // await out.json();
         setIsPending(false);
         setError(null);
         return navigate('/login');
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      }
   };

   const loginUser = async (userInput) => {

      setError(null);
      setIsPending(true);
      try {
         let out = await fetch(
            '/api/v1/auth/login',
            {
               method: 'post',
               body: JSON.stringify(userInput),
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );

         //check if the login was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }

         let res = await out.json();
         console.log(res);
         let user = {
            user: userInput.email,
            token: res.token,
            isLoggedIn: true
         };

         // save login credentials in global user state
         dispatch(setLoginUser(user));

         // add user credentials in local storage
         localStorage.setItem('user', JSON.stringify(user));

         setIsPending(false);
         setError(null);
         return navigate('/');

      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      }
   };

   const updateUser = async (userInput) => {
      const storageUser = JSON.parse(localStorage.getItem('user'));
      setError(null);
      setIsPending(true);
      try {
         let out = await fetch(
            '/api/v1/auth/update',
            {
               method: 'post',
               body: JSON.stringify(userInput),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': storageUser ? `Bearer ${storageUser.token}` : ''
               }
            }
         );

         //check if the login was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }

         setIsPending(false);
         setError(null);
         return navigate('/my-recipes');
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      }
   };

   const getUser = async () => {

      const storageUser = JSON.parse(localStorage.getItem('user'));

      setError(null);
      setIsPending(true);
      try {
         let out = await fetch(
            '/api/v1/auth/users',
            {
               method: 'get',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': storageUser ? `Bearer ${storageUser.token}` : ''
               }
            }
         );

         //check if the login was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }

         let user = await out.json();
         setData(prevState => prevState = user);
         setIsPending(false);
         setError(null);
         return navigate('/my-recipes');
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      }
   };

   const logoutUser = async () => {
      setError(null);
      setIsPending(true);
      try {
         // reset the user global state
         dispatch(setLoginUser());

         // reset local storage
         localStorage.clear();
         setIsPending(false);
         setError(null);
         return navigate('/login');

      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      }
   };

   return { createAccount, loginUser, logoutUser, updateUser, getUser, data, isPending, error };
}