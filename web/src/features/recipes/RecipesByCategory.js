import { useParams } from "react-router-dom";

export const RecipesByCategory = () => {
   const { category } = useParams();


   return (
      <div className="container">
         <div className="container__tittleBox">
            <h2 className="container__title">{category}</h2>
            <div className="container__afterTitle"></div>
         </div>
      </div>
   )
}
