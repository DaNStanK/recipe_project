import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRecipes } from "../../hooks/useGetRecipes";

export const fetchRecipes = createAsyncThunk(
   'recipes/fetchRecipes', async () => {
      try {
         let response = getAllRecipes();
         return response.data;
      } catch (err) {
         return console.log(err.message);
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
            state.entities.push(action.payload);
         },
         prepare: (
            title,
            category,
            preparation_time,
            number_persons,
            short_description,
            long_description
         ) => {
            return {
               payload: {
                  title,
                  category,
                  preparation_time,
                  number_persons,
                  short_description,
                  long_description
               }
            }
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
