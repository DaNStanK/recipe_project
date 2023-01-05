import "./RecipeExcerpt.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDeleteRecipe } from "./recipesSlice";
// icon
import garbageIcon from "../../icons/icon_trashcan.svg";

export const RecipeExcerpt = ({ recipe, recipes, setRecipes }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleDelete = () => {
      dispatch(fetchDeleteRecipe(recipe?._id));
      setRecipes(prevState => prevState = recipes.filter(r => r._id !== recipe._id));
      return navigate('/recipes');
   };

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
};
