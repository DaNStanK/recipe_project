// style
import "./RecipeExcerpt.css"

// date-fns module
import { format } from "date-fns";

// icon
import garbageIcon from "../../icons/icon_trashcan.svg";

// react router
import { useNavigate } from "react-router-dom";

// react hook
import { useCallback } from "react";

import { useSelector } from "react-redux";

import { getUser } from "../user/userSlice";

export const RecipeExcerpt = ({ recipe, recipes, setRecipes }) => {

   const navigate = useNavigate();

   const { user } = useSelector(getUser);

   const deleteRecipe = useCallback(async () => {
      try {
         let response = await fetch(
            `/api/v1/recipes/recipe/${recipe._id}`,
            {
               method: 'delete',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': user?.token ? `Bearer ${user?.token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         if (!response.ok) {
            throw new Error(response.statusText);
         }
         setRecipes(prevState => prevState = recipes.filter(r => r._id !== recipe._id));
         return navigate('/recipes');
      } catch (err) {
         return console.log(err.message);
      }
   }, [recipe, navigate, user]);

   const handleDelete = useCallback(() => {
      deleteRecipe();
   }, [deleteRecipe]);

   return (
      <div className="container_inputBox content">
         <div
            className="innerLeft-excerpt"
            onClick={() => navigate(`/recipes/${recipe._id}`)}
         >
            <div className="innerLeft-recipe_tittle">{recipe.title}</div>
            <div className="recipe_category">{recipe.category}</div>
            <div className="innerLeft-recipe_date">
               {format(new Date(recipe.created_on), 'dd.MM.yyyy')}
            </div>
         </div>
         <div
            className="innerRight"
            onClick={handleDelete}
         ><img src={garbageIcon} alt="remove icon" /></div>
      </div>
   );
}
