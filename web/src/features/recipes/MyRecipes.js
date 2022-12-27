// styles
import "./MyRecipes.css"

// context api
import { useAuthContext } from "../../hooks/useAuthContext";

// react router
import { Link } from "react-router-dom";

// react hooks
import { useCallback, useEffect, useState } from "react";

// icons
import addIcon from "../../icons/icon_plus_white.svg"

// components
import { RecipeExcerpt } from "./RecipeExcerpt";


export const MyRecipes = () => {
   const { token } = useAuthContext();
   const [recipes, setRecipes] = useState('');

   const getMyRecipes = useCallback(async () => {
      try {
         let res = await fetch(
            `/api/v1/recipes/my`,
            {
               method: 'get',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
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
   }, [token]);

   useEffect(() => {
      getMyRecipes();
   }, []);


   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">My Recipes</h2>
            <div className="container__afterTitle"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes/create">
                  <img src={addIcon} alt="add icon" />
               </Link>
            </div>
         </div>

         <div className="container__inputBox">
            <div className="container_inputBox">
               <div className="innerLeft">
                  <div><span>Recipe Title</span></div>
                  <div><span>Category</span></div>
                  <div><span>Created On</span></div>
               </div>
               <div className="innerRight"><span>Delete</span></div>
            </div>
            {recipes && recipes.map(recipe => (
               <RecipeExcerpt
                  key={recipe._id}
                  recipe={recipe}
                  recipes={recipes}
                  setRecipes={setRecipes}
               />
            ))}
         </div>
      </div>
   );
};

