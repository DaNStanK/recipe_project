import { Layout } from "./components/Layout";
import { Home } from "./features/recipes/Home";
import { CreateRecipes } from "./features/recipes/CreateRecipes";
import { Login } from "./features/user/LoginUser";
import { MyRecipes } from "./features/recipes/MyRecipes";
import { RecipesByCategory } from "./features/recipes/RecipesByCategory";
import { NotFound } from "./components/NotFound";
import { CreateUser } from "./features/user/CreateUser";
import { EditRecipe } from "./features/recipes/EditRecipe";
import { EditUser } from "./features/user/EditUser";

import { Routes, Route } from "react-router-dom";

export const App = () => {

   return (
      <Routes>
         {/* default route */}
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* users sub-routes */}
            <Route path="users">
               <Route index element={<Login />} />
               <Route path="create" element={<CreateUser />} />
               <Route path="edit" element={<EditUser />} />
            </Route>
            {/* recipes sub-routes */}
            <Route path="recipes">
               <Route index element={<MyRecipes />} />
               <Route path="create" element={<CreateRecipes />} />
               <Route path=":recipeID" element={<EditRecipe />} />
               <Route path="category/:category" element={<RecipesByCategory />} />
            </Route>
         </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};
