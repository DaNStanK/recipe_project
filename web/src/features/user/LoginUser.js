//styles
import "./LoginUser.css";

// react hooks
import { useRef, useCallback } from "react";

// react router
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";

export const Login = () => {

   const { dispatch } = useAuthContext();

   const navigate = useNavigate();

   const email = useRef();
   const password = useRef();

   const handleSubmit = useCallback((e) => {
      e.preventDefault();
      const loginUser = async (data) => {
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
               console.log(out.statusText);
               return new Error(out.statusText);
            }

            let res = await out.json();
            let u = {
               user: data.email,
               token: res.token,
               isLoggedIn: true
            };
            localStorage.setItem('user', JSON.stringify(u));
            dispatch({
               type: 'LOGIN',
               payload: u
            });
            return navigate('/');
         } catch (err) {
            return console.log(err.message);
         }
      };

      loginUser({
         email: email.current.value,
         password: password.current.value
      });
   }, [dispatch, navigate]);

   return (
      <div className='container'>
         <div className="container__tittleBox">
            <h2 className="container__title">Log In</h2>
            <div className="container__afterTitle"></div>
         </div>

         <div className="container__box">
            <div className='container__descriptionBox-login'>
               <h1><span>Welcome to</span> Baby's</h1>
               <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
            </div>

            <form onSubmit={handleSubmit} className='container__loginInputs'>
               <label className='container__label'>
                  <span>Email:</span>
                  <input type="email" name="email" ref={email} />
               </label >
               <label className='container__label'>
                  <span>Password:</span>
                  <input type="password" name="password" ref={password} />
               </label>

               <button className="button-login">LOG IN</button>
            </form>
         </div>
      </div>
   )
};
