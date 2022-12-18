// styles
import "./Home.css";

import { useCallback, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
   getRecipes,
   getRecipesStatus,
   getRecipesError,
   fetchRecipes
} from "./recipesSlice";

import arrowIcon from "../../icons/icon_arrows_white.svg";
import plateIcon from "../../icons/icon_plate.svg";
import starIcon from "../../icons/icon_star.svg";
import clockIcon from "../../icons/icon_time.svg";

import { Link } from "react-router-dom";

// custom hooks
// import { useGetRecipes } from "../hooks/useGetRecipes";

export const Home = () => {

   // const user = JSON.parse(localStorage.getItem('user'));
   const dispatch = useDispatch();

   const recipes = useSelector(getRecipes);
   const recipesStatus = useSelector(getRecipesStatus);
   const error = useSelector(getRecipesError);

   const [recipe, setRecipe] = useState('');
   // const [view, setView] = useState(user.isLoggedIn ? true : false);

   useEffect(() => {
      if (recipesStatus === 'idle') {
         dispatch(fetchRecipes);
      }
   }, [dispatch, recipesStatus]);


   // const getRecipe = useCallback(async (id) => {
   //    try {
   //       let res = await fetch(
   //          `/api/v1/recipes/recipe/${id}`,
   //          {
   //             method: 'get',
   //             headers: {
   //                'Content-Type': 'application/json',
   //                'Authorization': user.token ? `Bearer ${user.token}` : '',
   //             }
   //          }
   //       );
   //       //check if the the fetch was successful
   //       if (!res.ok) {
   //          throw new Error(res.statusText);
   //       }
   //       let recipe = await res.json();
   //       return setRecipe(prevState => {
   //          return {
   //             ...prevState,
   //             recipe
   //          }
   //       });
   //    } catch (err) {
   //       return console.log(err.message);
   //    }
   // }, [recipe]);

   // const handleClick = useCallback(() => {

   // }, []);

   return (
      <div className="container__home">
         <div className="container__tittleBox">
            <h2 className="container__title">Home</h2>
            <div className="container__afterTitle"></div>
         </div>

         {recipes &&
            <div className="container__recipes">
               {recipes.map(recipe => (
                  <div key={recipe._id} className="recipe">

                     <img src="#" alt="" className="recipe__image" />

                     <div className="recipe_descriptionBox">
                        <span>{recipe.title}</span>
                        <p className="recipe__description">{recipe.short_description}</p>
                        <div className="recipe__descriptionIcons">
                           <div className="recipe__container">
                              <img src={clockIcon} className="icon" alt="" />
                              <h3>{recipe.preparation_time} min</h3>
                           </div>
                           <div className="recipe__container">
                              <img src={plateIcon} className="icon" alt="" />
                              <h3>{recipe.number_persons} persons</h3>
                           </div>
                           <div className="recipe__container">
                              <img src={starIcon} className="icon" alt="" />
                              <h3>{recipe.likes}</h3>
                           </div>
                        </div>
                     </div>

                     <div className="recipe_type">
                        <p>{recipe.category}</p>
                     </div>
                     <Link
                        className="recipe__icon"
                        to={`/recipe/${recipe._id}`}
                     >
                        <img src={arrowIcon} alt="arrowIcon" />
                     </Link>
                  </div>
               ))}
            </div>}

         {/* {view && <div>Logged in</div>} */}

         {recipesStatus === 'loading' && <h1>Loading...</h1>}
         {error && <h1>{error}</h1>}
      </div>
   );
};
