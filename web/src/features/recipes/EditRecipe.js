import { useParams } from "react-router-dom";

export const EditRecipe = () => {

   const { recipeID } = useParams();

   return (
      <article>
         <h1>Recipe id: {recipeID}</h1>
      </article>
   );
};


