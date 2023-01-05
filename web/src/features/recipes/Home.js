import "./Home.css";
import { RecipesBody } from "./RecipesBody";
import { useSelector } from "react-redux";
import { getRecipes, getRecipesFetchError } from "./recipesSlice";

export const Home = () => {

   const recipes = useSelector(getRecipes);
   const recipesFetchError = useSelector(getRecipesFetchError);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">Home</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipes &&
            <div className="container__recipes">
               {recipes.map(recipe => (
                  <RecipesBody
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))}
            </div>
         }

         {recipesFetchError &&
            <div>{recipesFetchError}</div>
         }
      </div>
   );
};
