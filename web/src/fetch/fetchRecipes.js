export const getAllRecipes = async () => {
   try {
      let response = await fetch(
         `/api/v1/recipes/all`,
         {
            method: 'get',
            headers: {
               'Content-Type': 'application/json'
            }
         }
      );
      //check if the the fetch was successful
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      const result = await response.json();
      return result;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const createRecipes = async (data, token) => {
   try {
      const response = await fetch(
         `/api/v1/recipes/create`,
         {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token ? `Bearer ${token}` : ""
            }
         }
      );
      //check if the the fetch was successful
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      const output = await response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const updateRecipes = async (data, recipeID, token) => {
   try {
      const response = await fetch(
         `/api/v1/recipes/update-recipe/${recipeID}`,
         {
            method: 'put',
            body: JSON.stringify(data),
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

      const output = await response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const getRecipesByCategory = async (categoryName) => {
   try {
      let response = await fetch(
         `/api/v1/recipes/category/${categoryName}`,
         {
            method: 'get',
            headers: {
               'Content-Type': 'application/json'
            }
         }
      );
      //check if the the fetch was successful
      if (!response.ok) {
         throw new Error(response.statusText);
      }

      let output = await response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const getMyRecipes = async (token) => {
   try {
      let response = await fetch(
         `/api/v1/recipes/my`,
         {
            method: 'get',
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

      let output = await response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const getRecipe = async (recipeID, token) => {
   try {
      let response = await fetch(
         `/api/v1/recipes/get-recipe/${recipeID}`,
         {
            method: 'get',
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

      let output = await response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const deleteRecipe = async (recipeID, token) => {
   try {
      let response = await fetch(
         `/api/v1/recipes/recipe/${recipeID}`,
         {
            method: 'delete',
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

      const output = response.json();
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};

export const storeFile = async (e, token) => {
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
      return output;
   } catch (err) {
      console.log(err.message);
      return err;
   }
};