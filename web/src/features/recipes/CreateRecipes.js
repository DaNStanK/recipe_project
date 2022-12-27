// styles
import "./CreateRecipes.css"

// react hooks
import { useState } from "react";

// react-router
import { Link } from "react-router-dom";

import { RecipeFormExcerpt } from "./RecipeFormExcerpt";

// icons
import backIcon from "../../icons/icon_back_white.svg";

export const CreateRecipes = () => {
   const [recipe, setRecipe] = useState('');

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">My Recipes</h2>
            <div className="container__afterTitle"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes">
                  <img src={backIcon} alt="back_icon" />
               </Link>
            </div>
         </div>
         <RecipeFormExcerpt
            recipe={recipe}
            setRecipe={setRecipe}
         />
      </div>
   )
};
