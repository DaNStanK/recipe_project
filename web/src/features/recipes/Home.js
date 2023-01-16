import "./Home.css";
import { RecipesBody } from "./RecipesBody";
import { useSelector } from "react-redux";
import { getRecipes } from "./recipesSlice";

export const Home = () => {
   const recipes = useSelector(getRecipes);

   const recipesByNewestDate = recipes
      .map(recipe => recipe = { ...recipe, created_on: Date.parse(recipe.created_on) })
      .sort((a, b) => b.created_on - a.created_on)
      .splice(0, 3);

   const recipesByMostLikes = recipes.map(recipe => recipe).sort((a, b) => b.likes - a.likes);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">Fresh & new</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipesByNewestDate &&
            <div className="container__recipes">
               {recipesByNewestDate.map(recipe => (
                  <RecipesBody
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))}
            </div>
         }

         <div className="container__tittleBox">
            <h2 className="container__title">Most Popular Recipes</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipesByMostLikes &&
            <div className="container__recipes">
               {recipesByMostLikes.map(recipe => (
                  <RecipesBody
                     key={recipe._id}
                     recipe={recipe}
                  />
               ))}
            </div>
         }
      </div>
   );
};
