// styles
import "../../index.css";

// react hooks
import { useCallback, useEffect, useRef } from "react";

// react-router
import { Link } from "react-router-dom";

//custom hooks
import { usePostRecipes } from "../../hooks/usePostRecipes"

// icons
import plusIcon from "../../icons/icon_plus_white.svg";


export const CreateRecipes = () => {
   // const image_url = useRef();
   const title = useRef();
   const category = useRef();
   const preparation_time = useRef();
   const number_persons = useRef();
   const short_description = useRef();
   const long_description = useRef();

   const { createRecipe, error } = usePostRecipes();

   useEffect(() => {
      let payload = {
         category: category.current.value,
         preparation_time: +preparation_time.current.value,
         number_persons: +number_persons.current.value,
         short_description: short_description.current.value,
         long_description: long_description.current.value
      };
      createRecipe(payload);
   }, [createRecipe]);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">My Recipes</h2>
            <div className="container__afterTitle"></div>
            <div className="container__button">
               <Link className="container__link" to="/my-recipes">
                  <img src={plusIcon} alt="back_icon" />
               </Link>
            </div>
         </div>

         <form className="container__inputBox">
            {/* <label>
               <span>Recipe Image</span>
               <img src="#" alt="#" />
               <input type="file" name="picture" ref={image_url} />
            </label> */}
            <label>
               <span>Recipe Title</span>
               <input type="text" name="title" ref={title} />
            </label>
            <label>
               <span>Category</span>
               <input type="text" name="category" ref={category} />
            </label>
            <label>
               <span>Preparation Time</span>
               <input type="number" name="preparation_time" ref={preparation_time} />
            </label>
            <label>
               <span>No. People</span>
               <input type="number" name="number_persons" ref={number_persons} />
            </label>
            <label>
               <span>Short Description</span>
               <input type="text" name="short_description" ref={short_description} />
            </label>
            <label>
               <span>Recipe</span>
               <input type="text" name="long_description" ref={long_description} />
            </label>
            <button id="button">Submit</button>
            {error && <h1>{error}</h1>}
         </form>
      </div>
   )
};
