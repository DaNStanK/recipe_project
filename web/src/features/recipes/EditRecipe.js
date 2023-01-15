import "./CreateRecipes.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecipeEditForm } from "./RecipeEditForm";
import { useSelector } from "react-redux";
import { getRecipe } from "../../fetch/fetchRecipes";
import { getUser } from "../user/userSlice";
import backIcon from "../../icons/icon_back_white.svg";
// import { getRecipes } from "./recipesSlice";

export const EditRecipe = () => {

   // const recipes = useSelector(getRecipes);
   const { user } = useSelector(getUser);
   const { recipeID } = useParams();
   const [recipe, setRecipe] = useState('');

   // on reload of the page there are no recipes?? have to check even so i have dispatch(fetchRecipes()) added on index.js load

   // useEffect(() => {
   //    const newRecipe = recipes
   //       .filter(recipe => recipe._id === recipeID)
   //       .reduce((acc, curr) => curr, {});
   //    setRecipe(prevState => prevState = newRecipe);
   // }, [recipeID, recipes]);

   useEffect(() => {
      (async () => {
         let newRecipe = await getRecipe(recipeID, user?.token);
         setRecipe(prevState => prevState = newRecipe);
      })();
   }, [recipeID, user?.token]);

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


