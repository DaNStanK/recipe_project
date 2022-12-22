// styles
import "../../index.css";

// react hooks
import { useCallback, useRef } from "react";

// react-router
import { Link, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";

// icons
import backIcon from "../../icons/icon_back_white.svg";


export const CreateRecipes = () => {

   const image_url = useRef();
   const title = useRef();
   const category = useRef();
   const preparation_time = useRef();
   const number_persons = useRef();
   const short_description = useRef();
   const long_description = useRef();

   const { token } = useAuthContext();
   const navigate = useNavigate();

   const createRecipe = useCallback(async () => {
      try {
         let out = await fetch(
            `/api/v1/recipes/create`,
            {
               method: 'post',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         if (!out.ok) {
            throw new Error(out.statusText);
         }
         let response = await out.json();
         console.log(response);
         return navigate('/recipes');
      } catch (err) {
         return console.log(err.message);
      }
   }, []);

   const handleSubmit = useCallback(() => {
      // const downloadImg = {};
      // const uploadImg = async () => {
      //    try {
      //       let out = await fetch(
      //          `/api/v1/storage`,
      //          {
      //             method: 'post',
      //             headers: {
      //                'Content-Type': 'application/json'
      //             }
      //          }
      //       );
      //       //check if the the fetch was successful
      //       if (!out.ok) {
      //          throw new Error(out.statusText);
      //       }
      //       downloadImg = await out.json();
      //       return downloadImg
      //    } catch (err) {
      //       return console.log(err.message);
      //    }
      // };
      console.log(image_url.current.value);

      // let payload = {
      //    category: category.current.value,
      //    preparation_time: +preparation_time.current.value,
      //    number_persons: +number_persons.current.value,
      //    short_description: short_description.current.value,
      //    long_description: long_description.current.value
      // };
      // createRecipe(payload);
   }, []);

   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">My Recipes</h2>
            <div className="container__afterTitle"></div>
            <div className="container__button">
               <Link className="container__link" to="/recipes">
                  <img src={backIcon} alt="back_icon" />
               </Link>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="container__inputBox">
            <label>
               <span>Recipe Image</span>
               <img src="#" alt="#" />
               <form encType="multipart/form-data"></form>
               <input
                  type="file"
                  name="picture"
                  ref={image_url}
                  accept="image/*"
               />
            </label>
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
            <button id="button">Save</button>
         </form>
      </div>
   )
};
