// components
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

// react-router
import { Routes, Route } from "react-router-dom";

// context hook
import { useAuthContext } from "./hooks/useAuthContext";

export const App = () => {

   const { isLoggedIn } = useAuthContext();

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="users">
               <Route index element={isLoggedIn ? <Home /> : <Login />} />
               <Route path="create" element={isLoggedIn ? <Home /> : <CreateUser />} />
               <Route path="edit" element={<EditUser />} />
            </Route>

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
}
