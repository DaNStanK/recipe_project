import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
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
      let result = response.json();
      return result;
   } catch (err) {
      return err.message;
   };
});

const initialState = {
   entities: [],
   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
};

export const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {
      createRecipe: {
         reducer: (state, action) => {
            console.log(action.payload)
            state.recipes.push(action.payload);
         }
      }
   },
   extraReducers(builder) {
      builder
         .addCase(fetchRecipes.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entities = action.payload;
         })
         .addCase(fetchRecipes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })
   }
});

export const getRecipes = (state) => state.recipes.entities;
export const getRecipesStatus = (state) => state.recipes.status;
export const getRecipesError = (state) => state.recipes.error;

export const { createRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
