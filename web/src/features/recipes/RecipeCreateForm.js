import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCreateRecipe } from "./recipesSlice";
import { getUser } from "../user/userSlice";
import recipeImage from "../../uploads/recipe.jpg";
import { storeFile } from "../../fetch/fetchRecipes";

export const RecipeCreateForm = ({ recipe }) => {
   const [filename, setFilename] = useState('');

   const title = useRef(recipe ? recipe?.title : '');
   const category = useRef(recipe ? recipe?.category : '');
   const preparation_time = useRef(recipe ? recipe.preparation_time : '');
   const number_persons = useRef(recipe ? recipe?.number_persons : '');
   const short_description = useRef(recipe ? recipe?.short_description : '');
   const long_description = useRef(recipe ? recipe?.long_description : '');

   const { user } = useSelector(getUser);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const uploadFile = async (e, setImgUrl, token) => {
      try {
         e.preventDefault();
         let fileName = await storeFile(e, token);
         return setImgUrl(prevState => prevState = fileName);
      } catch (err) {
         console.log(err.message);
         return err;
      }
   };

   const handleSubmit = e => {
      e.preventDefault();
      dispatch(fetchCreateRecipe({
         image_url: filename,
         title: title.current.value,
         category: category.current.value,
         preparation_time: +preparation_time.current.value,
         number_persons: +number_persons.current.value,
         short_description: short_description.current.value,
         long_description: long_description.current.value
      }));
      navigate('/recipes');
   };

   return (
      <form className="container-form" onSubmit={handleSubmit}>
         <div className="box-left">
            <span>Recipe Image</span>
            <img src={recipeImage} alt="recipe pic" />
            <label className="fileUpload"> UPLOAD
               <input name="image_url" type="file" accept="image/*" onChange={(e) => uploadFile(e, setFilename, user?.token)} />
            </label>
         </div>
         <div className="box-middle">
            <div>
               <label>
                  <span>Recipe Title</span>
                  <input className="recipe-title" type="text" name="title" ref={title} />
               </label>
            </div>
            <div className="middle-innerBox">
               <label htmlFor="category" >
                  <span>Category</span><br />
                  <select className="category" name="category" ref={category} id="category" >
                     <option defaultValue=''></option>
                     <option value="breakfast">Breakfast</option>
                     <option value="brunch">Brunch</option>
                     <option value="lunch">Lunch</option>
                     <option value="dinner">Dinner</option>
                  </select>
               </label>
               <label>
                  <span>Preparation Time</span>
                  <input className="preparation-time" type="number" name="preparation_time" ref={preparation_time} />
               </label>
               <label >
                  <span>No. People</span>
                  <input className="persons-number" type="number" name="number_persons" ref={number_persons} />
               </label>
            </div>
            <label className="short-description">
               <span>Short Description</span>
               <textarea name="short_description" ref={short_description} />
            </label>
            <button id="button">Save</button>
         </div>
         <div className="box-right">
            <label>
               <span>Recipe</span>
               <textarea name="long_description" ref={long_description} />
            </label>
         </div>
      </form>
   );
};
