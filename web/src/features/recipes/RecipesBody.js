// react hook
import { useState } from "react";

// icon svgs
import arrowIcon from "../../icons/icon_arrows_white.svg";
import plateIcon from "../../icons/icon_plate.svg";
import starIcon from "../../icons/icon_star.svg";
import clockIcon from "../../icons/icon_time.svg";

import { ViewRecipe } from "./ViewRecipe";


export const RecipesBody = ({ recipe }) => {
   const [view, setView] = useState(false);

   return (

      <div className="recipe">
         <img src="#" alt="" className="recipe__image" />

         <div className="recipe_descriptionBox">

            <span>{recipe.title}</span>
            <p className="recipe__description">{recipe.short_description.substring(0, 400)}...</p>

            <div className="recipe__descriptionIcons">
               <div className="recipe__container">
                  <img src={clockIcon} className="icon" alt="" />
                  <h3>{recipe.preparation_time} min</h3>
               </div>
               <div className="recipe__container">
                  <img src={plateIcon} className="icon" alt="" />
                  <h3>{recipe.number_persons} persons</h3>
               </div>
               <div className="recipe__container">
                  <img src={starIcon} className="icon" alt="" />
                  <h3>{recipe.likes}</h3>
               </div>
            </div>
         </div>

         <div className="recipe_type">
            <p>{recipe.category}</p>
         </div>

         <div
            className="recipe__icon"
            onClick={() => setView(prevState => !prevState)}
         >
            <img src={arrowIcon} alt="arrowIcon" />
         </div>

         {view &&
            <div className="modal">
               <ViewRecipe recipe={recipe} setView={setView} />
            </div>}
      </div>
   )
};
