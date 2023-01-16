import "./Home.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipesBody } from "./RecipesBody";

import { useSelector } from "react-redux";
import { getRecipes } from "./recipesSlice";

export const RecipesByCategory = () => {

   const { category } = useParams();
   const recipesStore = useSelector(getRecipes);
   const [recipes, setRecipes] = useState('');

   useEffect(() => {
      setRecipes(prevState => prevState = recipesStore.filter(recipe => recipe.category === category));
   }, [category, recipesStore]);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">{category}</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipes &&
            <div className="container__recipes">
               {recipes &&
                  recipes.map(recipe => (
                     <RecipesBody
                        key={recipe._id}
                        recipe={recipe}
                     />
                  ))}
            </div>}
      </div>
   );
};
