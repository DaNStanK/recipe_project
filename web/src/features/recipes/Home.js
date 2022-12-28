// styles
import "./Home.css";

import { useEffect } from "react";

import { RecipesBody } from "./RecipesBody";

import { useDispatch, useSelector } from "react-redux"

import { fetchRecipes } from "./recipesSlice";

export const Home = () => {

   const dispatch = useDispatch();

   const recipes = useSelector(state => state.recipes.entities);
   const recipesStatus = useSelector(state => state.recipes.status);
   const recipesError = useSelector(state => state.recipes.error);

   useEffect(() => {
      if (recipesStatus === 'idle') {
         dispatch(fetchRecipes());
      }
   }, [recipesStatus, dispatch]);

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

         {recipesError &&
            <div>{recipesError}</div>
         }
      </div>
   );
};
