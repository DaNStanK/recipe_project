// styles
import "./Home.css";

// react hooks
import { useEffect, useState } from "react";

// react router
import { useParams } from "react-router-dom";

// recipes components
import { RecipesBody } from "./RecipesBody";

// redux
import { useSelector } from "react-redux";
import { getRecipes } from "./recipesSlice";

export const RecipesByCategory = () => {

   const { category } = useParams();
   const recipesByCategory = useSelector(getRecipes);
   const [recipes, setRecipes] = useState('');

   useEffect(() => {
      console.log(recipesByCategory);
      setRecipes(prevState => prevState = recipesByCategory.filter(recipe => recipe.category === category));
   }, [category, recipesByCategory]);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">{category}</h2>
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
            </div>}
      </div>
   );
};
