import "./CreateRecipes.css";

import { useParams, Link } from "react-router-dom";

import { RecipeEditForm } from "./RecipeEditForm";

import backIcon from "../../icons/icon_back_white.svg";


export const EditRecipe = () => {

   const { recipeID } = useParams();

   return (
      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">My Recipes</h2>
            <div className="container__title-box--line"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes">
                  <img src={backIcon} alt="back icon" />
               </Link>
            </div>
         </div>
         <RecipeEditForm recipeID={recipeID} />
      </div>
   );
};


