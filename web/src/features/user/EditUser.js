import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser, getUser } from "./userSlice";
import { fetchUser } from "../../fetch/fetchUsers";

import "./EditUser.css";

import avatarPic from "../../uploads/avatar7_big.png";

export const EditUser = () => {
   const { user } = useSelector(getUser);
   const dispatch = useDispatch();

   const [data, setData] = useState(null);

   useEffect(() => {
      (async () => {
         try {
            let output = await fetchUser(user?.token);
            return setData(prevState => prevState = output);
         } catch (err) {
            console.log(err.message);
            return err;
         }
      })();
   }, [user?.token]);

   const dataChange = useCallback((e) => {
      setData(prevState => {
         return {
            ...prevState,
            [e.target.name]: ['birthday'] ? new Date(e.target.value) : e.target.value
         };
      });
   });

   const handleSubmit = useCallback((e) => {
      e.preventDefault();
      console.log(data);
      dispatch(fetchUpdateUser(data));
   }, [data, dispatch]);

   return (

      <div className="container">
         {data && <div className="container__tittleBox">
            <h2 className="container__title">My Profile</h2>
            <div className="container__afterTitle"></div>
         </div>}

         {data &&
            <div className="container__input">
               <div className="container__imageBox">
                  <img src={avatarPic} alt="Avatar Img" />
                  <button id="button">CHANGE AVATAR</button>
               </div>

               <div className="container__inputBox edit__profile">
                  <form
                     className="container__registerInputs"
                     onSubmit={handleSubmit}
                  >
                     <label>
                        <span>First Name</span>
                        <input
                           type="text"
                           name="first_name"
                           value={data.first_name}
                           onChange={dataChange}
                        />
                     </label>
                     <label>
                        <span>Last Name</span>
                        <input
                           type="text"
                           name="last_name"
                           value={data.last_name}
                           onChange={dataChange}
                        />
                     </label>
                     <label>
                        <span>Email</span>
                        <input
                           type="email"
                           name="email"
                           value={data.email}
                           onChange={dataChange}
                        />
                     </label>
                     <label>
                        <span>Birthday</span>
                        <input
                           type="date"
                           name="birthday"
                           value={data.birthday}
                           onChange={dataChange}
                        />
                     </label>
                     <label className="last__two">
                        <span >Password</span>
                        <input
                           type="password"
                           name="password"
                           onChange={dataChange}
                        />
                     </label>
                     <label className="last__two">
                        <span>Repeat password</span>
                        <input
                           type="password"
                           name="password2"
                           onChange={dataChange}
                        />
                     </label>
                     <button id="button">Save</button>
                  </form>
               </div>
            </div>
         }

      </div>
   );
};
