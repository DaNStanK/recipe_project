import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRecipes, createRecipes, updateRecipes, deleteRecipe } from "../../fetch/fetchRecipes";

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async (arg, thunkAPI) => {
   try {
      const response = await getAllRecipes();
      return response;
   } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err);
   }
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

export const fetchDeleteRecipe = createAsyncThunk('recipes/fetchDeleteRecipe', async (arg, thunkAPI) => {
   try {
      const user = thunkAPI.getState().user.user;
      const response = await deleteRecipe(arg, user?.token);
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
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchRecipes.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entries = action.payload;
         })
         .addCase(fetchCreateRecipe.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.entries.push(action.payload);
         })
         .addCase(fetchUpdateRecipe.fulfilled, (state, action) => {
            if (action.payload !== 'Conflict') {
               const newState = state.entries.map(recipe => {
                  if (recipe?._id === action.payload._id) {
                     return action.payload;
                  }
                  return recipe;
               });
               state.entries = newState;
            }
         })
         .addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
            const recipeID = action.payload;
            const newState = state.entries.filter(recipe => recipe._id !== recipeID);
            console.log(newState);
            state.status = 'succeeded';
            state.entries.push(newState);
         });
   }
});

export const getRecipes = (state) => state.recipes.entries;
export const getRecipesStatus = (state) => state.recipes.status;
export const getRecipesFetchError = (state) => state.recipes.error;

export default recipesSlice.reducer;
