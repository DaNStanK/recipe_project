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

// context api
import { useAuthContext } from "../../hooks/useAuthContext";

export const RecipeExcerpt = ({ recipe, recipes, setRecipes }) => {
   const navigate = useNavigate();
   const { token } = useAuthContext();

   const deleteRecipe = useCallback(async () => {
      try {
         let out = await fetch(
            `/api/v1/recipes/recipe/${recipe._id}`,
            {
               method: 'delete',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }
         // setRecipes(recipes.filter(r => r._id !== recipe._id));
         return navigate('/recipes');
      } catch (err) {
         return console.log(err.message);
      }
   }, [recipe, navigate, token]);

   const handleDelete = useCallback(() => {
      setRecipes(recipes.filter(r => r._id !== recipe._id));
      deleteRecipe();
   }, [setRecipes, recipe._id, recipes]);

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
