import "./ViewRecipe.css";

import plateIcon from "../../icons/icon_plate.svg";
import starIcon from "../../icons/icon_star.svg";
import clockIcon from "../../icons/icon_time.svg";
import closeIcon from "../../icons/icon_close.svg";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../user/userSlice";
import { fetchUpdateRecipe } from "./recipesSlice";
import { useCallback } from "react";

export const ViewRecipe = ({ setView, recipe }) => {
   const dispatch = useDispatch();
   const { user } = useSelector(getUser);

   const handleClick = useCallback((e) => {
      e.preventDefault();
      dispatch(fetchUpdateRecipe({
         data: { ...recipe, likes: recipe.likes + 1 },
         recipeID: recipe._id
      }));
   }, [dispatch, recipe]);

   return (
      <>
         {recipe &&
            <article className="view-recipe">
               <div className="view-recipe__title-box">
                  <h1>{recipe.title}</h1>
                  <img
                     src={closeIcon}
                     alt="Close icon"
                     onClick={() => setView(prevState => !prevState)}
                  />
               </div>
               <div className="view-recipe__container-box">
                  <div className="view-recipe__left-section">
                     <img
                        className="view-recipe__img"
                        src={require(`../../uploads/${recipe.image_url}`)}
                        alt="recipe"
                     />
                     <div className="view-recipe__title-category">
                        <h2>Best served for</h2>
                        <div className="view-recipe__category">
                           <p>{recipe.category}</p>
                        </div>
                     </div>
                     <p className="view-recipe__short-description">{recipe.short_description.substring(0, 330)}</p>
                     <div className="recipe__descriptionIcons">
                        <div className="recipe__container">
                           <img src={clockIcon} />
                           <h3>{recipe.preparation_time} min</h3>
                        </div>
                        <div className="recipe__container">
                           <img src={plateIcon} />
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
                  <div className="view-recipe__right-section">
                     <h2>Recipe Details</h2>
                     <p className="view-recipe__details">{recipe.long_description}</p>

                  </div>
               </div>
            </article>}
      </>
   );
};
