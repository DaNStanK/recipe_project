// styles
import "./Home.css";

import { useCallback, useEffect, useState } from "react";

import { RecipesBody } from "./RecipesBody";

export const Home = () => {

   const [recipes, setRecipes] = useState('');

   useEffect(() => {
      getRecipes();
   }, []);

   const getRecipes = useCallback(async () => {
      try {
         let res = await fetch(
            `/api/v1/recipes/all`,
            {
               method: 'get',
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );
         //check if the the fetch was successful
         if (!res.ok) {
            throw new Error(res.statusText);
         }
         let r = await res.json();
         return setRecipes(prevState => prevState = r);
      } catch (err) {
         return console.log(err.message);
      }
   }, []);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">Home</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipes &&
            <div className="container__recipes">
               {recipes.map(recipe => (
                  <RecipesBody
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))}
            </div>}
      </div>
   );
};
