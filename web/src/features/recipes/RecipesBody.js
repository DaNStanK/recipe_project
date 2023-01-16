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
         <img src={require(`../../uploads/${recipe.image_url}`)} alt="recipe pic" className="recipe__image" />
         <div className="recipe_descriptionBox">
            <span>{recipe.title}</span>
            <p className="recipe__description">{recipe.short_description.substring(0, 200)}...</p>
            <div className="recipe__descriptionIcons">
               <div className="recipe__container">
                  <img src={clockIcon} alt="clock pic" />
                  <h3>{recipe.preparation_time} min</h3>
               </div>
               <div className="recipe__container">
                  <img src={plateIcon} alt="plate pic" />
                  <h3>{recipe.number_persons} persons</h3>
               </div>
               <div className="recipe__container">
                  {!user?.isLoggedIn &&
                     <img src={starIcon} className="star-icon" alt="star pic" />
                  }
                  {user?.isLoggedIn &&
                     <img
                        src={starIcon}
                        className="star-icon" alt="star pic"
                        onClick={handleClick}
                     />
                  }
                  <h3>{recipe.likes}</h3>
               </div>
            </div>
         </div>
         <div className="recipe_type">
            <p>{recipe.category}</p>
         </div>
         <div className="recipe__icon" onClick={() => setView(prevState => !prevState)}>
            <img src={arrowIcon} alt="arrowIcon" />
         </div>

         {view &&
            <div className="modal">
               <ViewRecipe recipe={recipe} setView={setView} />
            </div>}
      </article>
   );
};
