// styles
import "./Home.css";

// react hooks
import { useEffect, useState, useCallback } from "react";

// react router
import { useParams } from "react-router-dom";

// recipes components
import { RecipesBody } from "./RecipesBody";

export const RecipesByCategory = () => {

   const { category } = useParams();
   const [recipes, setRecipes] = useState('');

   useEffect(() => {
      getRecipesByCategory();
   }, [category]);

   const getRecipesByCategory = useCallback(async () => {
      try {
         let response = await fetch(
            `/api/v1/recipes/category/${category}`,
            {
               method: 'get',
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         );
         //check if the the fetch was successful
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         let fetchedRecipes = await response.json();
         return setRecipes(prevState => prevState = fetchedRecipes);
      } catch (err) {
         return console.log(err.message);
      }
   }, [category]);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">{category}</h2>
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
