import "./ViewRecipe.css";

import plateIcon from "../../icons/icon_plate.svg";
import starIcon from "../../icons/icon_star.svg";
import clockIcon from "../../icons/icon_time.svg";
import exIcon from "../../icons/icon_close.svg"

export const ViewRecipe = ({ setView, recipe }) => {

   return (
      <>
         {recipe &&
            <article className="view-recipe">
               <div className="view-recipe__title-box">
                  <h1>{recipe.title}</h1>
                  <img
                     src={exIcon}
                     alt="Close icon"
                     onClick={() => setView(prevState => !prevState)}
                  />
               </div>
               <div className="view-recipe__container-box">
                  <div className="view-recipe__left-section">
                     <img
                        className="view-recipe__img"
                        src="#"
                        alt="Image_recipe"
                     />
                     <div className="view-recipe__title-category">
                        <h2>Best serve for</h2>
                        <div className="view-recipe__category">
                           <p>{recipe.category}</p>
                        </div>
                     </div>
                     <p className="view-recipe__short-description">{recipe.short_description}</p>
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
                  <div className="view-recipe__right-section">
                     <h2>Recipe Details</h2>
                     <p className="view-recipe__details">{recipe.long_description}</p>

                  </div>
               </div>
            </article>}
      </>
   )
};
