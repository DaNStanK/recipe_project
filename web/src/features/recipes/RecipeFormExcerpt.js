// react hooks
import { useRef, useCallback, useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// context hook
import { useAuthContext } from "../../hooks/useAuthContext";

// images
import recipeImage from "../../uploads/recipe.jpg"

export const RecipeFormExcerpt = ({ recipe }) => {

   const { token } = useAuthContext();

   const navigate = useNavigate();

   // const [filename, setFilename] = useState('');

   const image_url = useRef(recipe ? recipe?.image_url : '');
   const title = useRef(recipe ? recipe?.title : '');
   const category = useRef(recipe ? recipe?.category : '');
   const preparation_time = useRef(recipe ? recipe.preparation_time : '');
   const number_persons = useRef(recipe ? recipe?.number_persons : '');
   const short_description = useRef(recipe ? recipe?.short_description : '');
   const long_description = useRef(recipe ? recipe?.long_description : '');

   const createRecipe = useCallback(async (data) => {
      try {
         let out = await fetch(
            `/api/v1/recipes/create`,
            {
               method: 'post',
               body: JSON.stringify(data),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         console.log(JSON.stringify(data));
         if (!out.ok) {
            throw new Error(out.statusText);
         }
         // let response = await out.json();
         // console.log(response);
         return navigate('/recipes');
      } catch (err) {
         return console.log(err.message);
      }
   }, []);

   const uploadFile = useCallback(async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append(e.target.files[0].name, e.target.files[0]);
      console.log(formData);

      try {
         let out = await fetch(
            `/api/v1/storage`,
            {
               method: 'POST',
               body: formData,
               headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         if (!out.ok) {
            throw new Error(response.statusText);
         }

         const response = out.json();
         console.log(out);
         // return setFilename(prevState => prevState = {...prevState, image_url: out.filename});
      } catch (err) {
         return console.log(err.message);
      }
   }, []);

   const handleSubmit = (e) => {

      e.preventDefault();

      const payload = {
         // image_url: filename,
         title: title.current.value,
         category: category.current.value,
         preparation_time: +preparation_time.current.value,
         number_persons: +number_persons.current.value,
         short_description: short_description.current.value,
         long_description: long_description.current.value
      };

      createRecipe(payload);
   };

   return (
      <form className="container-form" onSubmit={handleSubmit}>
         <div className="box-left">
            <span>Recipe Image</span>
            <img src={recipeImage} alt="#" />
            <label className="fileUpload"> UPLOAD
               <input name="picture" type="file" accept="image/*" ref={image_url} onChange={uploadFile} />
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
                     <option selected></option>
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
