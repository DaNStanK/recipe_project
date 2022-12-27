// styles
import "./CreateRecipes.css"

// react router
import { useParams, Link } from "react-router-dom";

// icons
import backIcon from "../../icons/icon_back_white.svg";

// react hooks
import { useEffect, useState } from "react";

// context api
import { useAuthContext } from "../../hooks/useAuthContext";

import { RecipeEditForm } from "./RecipeEditForm";

export const EditRecipe = () => {
   const [recipe, setRecipe] = useState('');

   const { recipeID } = useParams();

   const { token } = useAuthContext();

   useEffect(() => {
      const getRecipe = async () => {
         try {
            let response = await fetch(
               `/api/v1/recipes/get-recipe/${recipeID}`,
               {
                  method: 'get',
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': token ? `Bearer ${token}` : ''
                  }
               }
            );
            //check if the the fetch was successful
            if (!response.ok) {
               throw new Error(response.statusText);
            }
            let r = await response.json();
            setRecipe(prevState => prevState = r);
         } catch (err) {
            return console.log(err.message);
         }
      };

      getRecipe();
   }, []);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">My Recipes</h2>
            <div className="container__afterTitle"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes">
                  <img src={backIcon} alt="back icon" />
               </Link>
            </div>
         </div>
         {recipe &&
            <RecipeEditForm
               recipeID={recipeID}
               recipe={recipe}
            />
         }
      </div>
   );
};


