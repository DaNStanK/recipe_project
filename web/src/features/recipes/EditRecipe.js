import "./CreateRecipes.css";
import { useParams, Link } from "react-router-dom";
import { RecipeEditForm } from "./RecipeEditForm";
import { useSelector } from "react-redux";
import backIcon from "../../icons/icon_back_white.svg";
import { getRecipes } from "./recipesSlice";

export const EditRecipe = () => {

   const { recipeID } = useParams();

   const recipe = useSelector(getRecipes)
      .filter(recipe => recipe._id === recipeID)
      .reduce((acc, curr) => curr, {});

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


