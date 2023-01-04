import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRecipes, createRecipes, updateRecipes } from "../../fetch/fetchRecipes";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (arg, thunkAPI) => {
   try {
      const response = await getAllRecipes();
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   };
});

export const fetchCreateRecipe = createAsyncThunk('recipes/fetchCreateRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await createRecipes(arg, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
});

export const fetchUpdateRecipe = createAsyncThunk('recipes/fetchUpdateRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const { data, recipeID } = arg;
      const response = await updateRecipes(data, recipeID, user?.token);
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
});

const initialState = {
   entries: [],
   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
   error: null
};

export const recipesSlice = createSlice({
   name: 'recipes',
   initialState,
   reducers: {
      createRecipe: (state, action) => {
         state.recipes.push(action.payload);
      }

   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchRecipes.pending, (state, action) => {
            state.status = 'loading';
         })
         .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entries = action.payload;
         })
         .addCase(fetchCreateRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entries.push(action.payload);
         })
         .addCase(fetchUpdateRecipe.fulfilled, (state, action) => {
            const { _id: recipeID } = action.payload;
            state.status = 'succeeded';
            state.entries.map(recipe => {
               if (recipe._id === recipeID) {
                  return action.payload;
               }
               return recipe;
            });
         })
         .addCase(fetchCreateRecipe.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         })
         .addCase(fetchRecipes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
         });
   }
});

export const getRecipes = (state) => state.recipes.entries;
export const getRecipesStatus = (state) => state.recipes.status;
export const getRecipesFetchError = (state) => state.recipes.error;

export const { createRecipe } = recipesSlice.actions;

export default recipesSlice.reducer;
