// components
import { Layout } from "./components/Layout";
import { Home } from "./features/recipes/Home";
import { CreateRecipes } from "./features/recipes/CreateRecipes";
import { Login } from "./features/user/LoginUser";
import { MyRecipes } from "./features/recipes/MyRecipes";
import { RecipesByCategory } from "./features/recipes/RecipesByCategory";
import { EditRecipe } from "./features/recipes/EditRecipe";
import { NotFound } from "./components/NotFound";
import { CreateUser } from "./features/user/CreateUser";

// react-router
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export const App = () => {

   const [user, setUser] = useState(false);

   useEffect(() => {
      const storageUser = JSON.parse(localStorage.getItem('user'));
      if (storageUser && !user) return setUser(prevState => prevState = storageUser?.isLoggedIn);
   }, [user]);

   return (

      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={user.isLoggedIn ? <Home /> : <Login />} />

            <Route path="users">
               <Route index element={user.isLoggedIn ? <Home /> : <Login />} />
               <Route path="create" element={user.isLoggedIn ? <Home /> : <CreateUser />} />
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
