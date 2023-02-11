import { useCallback, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../user/userSlice";

import { fetchUpdateRecipe } from "./recipesSlice";

import arrowIcon from "../../icons/icon_arrows_white.svg";

import plateIcon from "../../icons/icon_plate.svg";

import starIcon from "../../icons/icon_star.svg";

import clockIcon from "../../icons/icon_time.svg";

import { ViewRecipe } from "./ViewRecipe";


export const RecipesBody = ({ recipe }) => {

   const dispatch = useDispatch();

   const { user } = useSelector(getUser);

   const [view, setView] = useState(false);

   const handleClick = useCallback((e) => {
      e.preventDefault();
      dispatch(fetchUpdateRecipe({
         data: { ...recipe, likes: recipe.likes + 1 },
         recipeID: recipe._id
      }));
   }, [dispatch, recipe]);

   return (

      <article className="recipe">
         <img
            className="recipe__image"
            src={`../../uploads/${recipe.image_url}`}
            alt="recipe pic"
         />
         <div className="recipe__description-box">
            <span>{recipe.title}</span>
            <p className="recipe__description-box--description">
               {recipe.short_description.substring(0, 200)}...
            </p>
            <div className="recipe__description-box--icons">
               <div>
                  <img src={clockIcon} alt="clock pic" />
                  <h3>{recipe.preparation_time} min</h3>
               </div>
               <div>
                  <img src={plateIcon} alt="plate pic" />
                  <h3>{recipe.number_persons} persons</h3>
               </div>
               <div>

                  {!user?.isLoggedIn && <img
                     className="star-icon"
                     src={starIcon}
                     alt="star pic"
                  />}

                  {user?.isLoggedIn && <img
                     className="star-icon" alt="star pic"
                     src={starIcon}
                     onClick={handleClick}
                  />}

                  <h3>{recipe.likes}</h3>
               </div>
            </div>
         </div>
         <div className="recipe__category">
            <p>{recipe.category}</p>
         </div>
         <div className="recipe__icon" onClick={() => setView(prevState => !prevState)}>
            <img src={arrowIcon} alt="arrowIcon" />
         </div>

         {view && <div className="modal">
            <ViewRecipe recipe={recipe} setView={setView} />
         </div>}
      </article>

   );

};
