import "./MyRecipes.css";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { RecipeExcerpt } from "./RecipeExcerpt";

import { useSelector } from "react-redux";

import { getUser } from "../user/userSlice";

import { getMyRecipes } from "../../fetch/fetchRecipes";


export const MyRecipes = () => {

   const { user } = useSelector(getUser);

   const [recipes, setRecipes] = useState(null);

   useEffect(() => {
      (async () => {
         try {
            let response = await getMyRecipes(user?.token);
            if (typeof response === 'string') {
               return null;
            }
            return setRecipes(prevState => prevState = response);
         } catch (err) {
            console.log(err);
            return err;
         }
      })();
   }, [user?.token]);

   return (
      <div className="container">
         <div className="container__title-box">
            <h2 className="container__title-box--title">My Recipes</h2>
            <div className="container__title-box--line"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes/create">
                  <img src="/icons/icon_plus_white.svg" alt="add icon" />
               </Link>
            </div>
         </div>
         <div className="container__table">
            <div className="container__table--title-box">
               <div className="inner-left">
                  <div><span>Recipe Title</span></div>
                  <div><span>Category</span></div>
                  <div><span>Created On</span></div>
               </div>
               <div className="inner-right"><span>Delete</span></div>
            </div>

            {recipes &&
               recipes.map(recipe => (
                  <RecipeExcerpt
                     key={recipe._id}
                     recipe={recipe}
                     setRecipes={setRecipes}
                  />
               ))
            }

         </div>
      </div>
   );

};

