// styles
import "./CreateUser.css";

// react hooks
import { useCallback, useRef } from "react";

import { useNavigate } from "react-router-dom";

// custom hooks
// import { useUserFetch } from "../../hooks/useUserFetch";

export const CreateUser = () => {
   const navigate = useNavigate();

   // userRef for not rerendering page on each change of input field
   const email = useRef();
   const first_name = useRef();
   const last_name = useRef();
   const birthday = useRef();
   const password = useRef();
   const password2 = useRef();

   // fetch ws create user
   const createAccount = useCallback(async (userInput) => {
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
            throw new Error(out.statusText);
         }
         // await out.json();
         return navigate('/login');
      } catch (err) {
         return console.log(err.message);;
      }
   }, [navigate]);

   const handleSubmit = useCallback(e => {
      e.preventDefault();
      createAccount({
         email: email.current.value,
         first_name: first_name.current.value,
         last_name: last_name.current.value,
         birthday: new Date(birthday.current.value),
         password: password.current.value,
         password2: password2.current.value
      });
   }, [createAccount]);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">Create Account</h2>
            <div className="container__afterTitle"></div>
         </div>

         <div className="container__box">

            <div className="container__descriptionBox-create">
               <h1><span>Create your</span> <br /> account</h1>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis minima suscipit dolorem maiores aliquam possimus recusandae saepe quibusdam atque fugit nihil tempora quisquam ipsam repellendus veritatis animi, ratione, delectus pariatur.</p>
            </div>

            <div className="container__inputBox">
               <form onSubmit={handleSubmit} className="container__registerInputs">
                  <label>
                     <span>First Name</span>
                     <input type="text" name="first_name" ref={first_name} />
                  </label>
                  <label>
                     <span>Last Name</span>
                     <input type="text" name="last_name" ref={last_name} />
                  </label>
                  <label>
                     <span>Email</span>
                     <input type="email" name="email" ref={email} />
                  </label>
                  <label>
                     <span>Birthday</span>
                     <input type="date" name="birthday" ref={birthday} />
                  </label>
                  <label>
                     <span>Password</span>
                     <input type="password" name="password" ref={password} />
                  </label>
                  <label>
                     <span>Retype password</span>
                     <input type="password" name="password2" ref={password2} />
                  </label>
                  <button className="button-create">Create Account</button>
               </form>
            </div>
         </div>
      </div >
   )
};
