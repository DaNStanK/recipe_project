import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../user/userSlice";
import { fetchUpdateRecipe } from "./recipesSlice";


export const RecipeEditForm = ({ recipe, recipeID }) => {

   const [data, setData] = useState(recipe);

   const { token } = useSelector(getUser);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const dataChange = e => {
      setData(prevState => prevState = {
         ...prevState,
         [e.target.name]: isNaN(e.target.value) ? e.target.value : +e.target.value
      });
   };

   const uploadFile = async (e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('picture', e.target.files[0]);

      try {
         let response = await fetch(
            `/api/v1/storage`,
            {
               method: 'POST',
               body: formData,
               headers: {
                  'Authorization': token ? `Bearer ${token}` : ''
               }
            }
         );

         //check if the the fetch was successful
         if (!response.ok) {
            throw new Error(response.statusText);
         }

         const output = await response.json();
         return setData(prevState => prevState = { ...prevState, image_url: output });
      } catch (err) {
         return console.log(err.message);
      }
   };

   const handleClick = e => {
      e.preventDefault();
      dispatch(fetchUpdateRecipe({ data, recipeID }));
      return navigate('/recipes');
   };

   return (
      <div className="container-form">
         <div className="box-left">
            <span>Recipe Image</span>
            <img src={require(`../../uploads/${data.image_url}`)} alt="recipe pic" />
            <label className="fileUpload"> UPLOAD
               <input
                  name="image_url"
                  type="file"
                  accept="image/*"
                  onChange={uploadFile}
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
