import "./Home.css";
import { RecipesBody } from "./RecipesBody";
import { useSelector } from "react-redux";
import { getRecipes } from "./recipesSlice";

export const Home = () => {
  const recipes = useSelector(getRecipes);

  const recipesByNewestDate = recipes
    .map(recipe => recipe = { ...recipe, created_on: Date.parse(recipe.created_on) })
    .splice(0, 3);

  const recipesByMostLikes = recipes
    .map(recipe => recipe)
    .sort((a, b) => b.likes - a.likes)
    .splice(0, 6);

  return (
    <div className="home">

      <div className="container">

        <div className="container__title-box">
          <h2 className="container__title-box--title">Fresh & new</h2>
          <div className="container__title-box--line"></div>
        </div>


        {recipesByNewestDate &&
          <div className="container__recipes">
            {recipesByNewestDate.map(recipe => (
              <RecipesBody key={recipe._id} recipe={recipe} />
            ))}
          </div>}


        <div className="container__title-box">
          <h2 className="container__title-box--title">Most Popular Recipes</h2>
          <div className="container__title-box--line"></div>
        </div>


        {recipesByMostLikes &&
          <div className="container__recipes">
            {recipesByMostLikes.map(recipe => (
              <RecipesBody key={recipe._id} recipe={recipe} />
            ))}
          </div>}

      </div>

    </div>
  );
};
