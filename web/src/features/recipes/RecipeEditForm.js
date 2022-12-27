// react hooks
import { useCallback, useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router-dom";

// context hook
import { useAuthContext } from "../../hooks/useAuthContext";


export const RecipeEditForm = ({ recipe, recipeID }) => {

   const { token } = useAuthContext();

   const [data, setData] = useState(recipe);

   const navigate = useNavigate();

   const dataChange = useCallback((e) => {
      setData(prevState => prevState = {
         ...prevState,
         [e.target.name]: isNaN(e.target.value) ? e.target.value : +e.target.value
      });
   }, [setData, data]);

   useEffect(() => {
      console.log(data);
      console.log(recipeID);
   }, []);

   const updateRecipe = useCallback(async (newData) => {
      try {
         let response = await fetch(
            `/api/v1/recipes/update-recipe/${recipeID}`,
            {
               method: 'put',
               body: JSON.stringify(newData),
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );
         //check if the the fetch was successful
         if (!response.ok) {
            throw new Error(response.statusText);
         }

         return navigate('/recipes');
      } catch (err) {
         return console.log(err.message);
      }
   }, [recipeID, token, navigate]);

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
               body: JSON.stringify(formData),
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
   }, [token]);

   const handleClick = useCallback(e => {
      e.preventDefault();
      // console.log(data);
      updateRecipe(data);
   }, [data]);

   return (
      <div className="container-form">
         <div className="box-left">
            <span>Recipe Image</span>
            <img src={require('../../uploads/recipe.jpg')} alt="recipe image" />
            <label className="fileUpload"> UPLOAD
               <input
                  name="image_url"
                  type="file"
                  accept="image/*"
                  onChange={dataChange}
               />
            </label>
         </div>
         <div className="box-middle">
            <div>
               <label>
                  <span>Recipe Title</span>
                  <input
                     className="recipe-title"
                     type="text"
                     name="title"
                     value={data.title}
                     onChange={dataChange}
                  />
               </label>
            </div>
            <div className="middle-innerBox">
               <label htmlFor="category" >
                  <span>Category</span><br />
                  <select
                     className="category"
                     name="category"
                     defaultValue={data.category}
                     onChange={dataChange}
                     id="category"
                  >
                     <option value=''></option>
                     <option value="breakfast">Breakfast</option>
                     <option value="brunch">Brunch</option>
                     <option value="lunch">Lunch</option>
                     <option value="dinner">Dinner</option>
                  </select>
               </label>
               <label>
                  <span>Preparation Time</span>
                  <input
                     className="preparation-time"
                     type="text"
                     name="preparation_time"
                     value={String(data.preparation_time)}
                     onChange={dataChange}
                  />
               </label>
               <label >
                  <span>No. People</span>
                  <input
                     className="persons-number"
                     type="number"
                     name="number_persons"
                     value={data.number_persons}
                     onChange={dataChange}
                  />
               </label>
            </div>
            <label className="short-description">
               <span>Short Description</span>
               <textarea
                  name="short_description"
                  value={data.short_description}
                  onChange={dataChange}
               />
            </label>
            <button id="button" onClick={handleClick}>Save</button>
         </div>
         <div className="box-right">
            <label>
               <span>Recipe</span>
               <textarea
                  name="long_description"
                  value={data.long_description}
                  onChange={dataChange}
               />
            </label>
         </div>
      </div>
   );
};
