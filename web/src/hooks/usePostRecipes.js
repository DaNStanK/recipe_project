// react hooks
import { useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// redux
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";

export const usePostRecipes = () => {

   const [data, setData] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);

   const user = useSelector(getUser);

   const navigate = useNavigate();

   const createRecipe = async (userInput) => {
      setError(null);
      setIsPending(true);
      try {
         let out = await fetch(
            '/api/v1/recipes/create',
            {
               method: 'post',
               body: JSON.stringify(userInput),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': user.token ? `Bearer ${user.token}` : ''
               }
            }
         );

         //check if the login was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }

         let newUser = await out.json();
         setData(newUser);
         setIsPending(false);
         setError(null);
         return navigate('/my-recipes');
      } catch (err) {
         console.log(err.message);
         setError(err.message);
         return setIsPending(false);
      };
   };

   return {
      data,
      isPending,
      error,
      createRecipe
   };
};
