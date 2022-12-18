export const getAllRecipes = async () => {
   try {
      let out = await fetch(
         '/api/v1/recipes/all',
         {
            method: 'get',
            headers: {
               'Content-Type': 'application/json',
            }
         }
      );
      //check if the the fetch was successful
      if (!out.ok) {
         throw new Error(out.statusText);
      }

      let recipes = await out.json();
      return recipes;
   } catch (err) {
      return console.log(err.message);
   };
};
