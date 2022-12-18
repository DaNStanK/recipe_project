// styles
import "../index.css";

import plusIcon from "../icons/icon_plus_white.svg";

// react-rooter
import { Link } from "react-router-dom";


export const Recipes = () => {

  return (
    <div className="container">

      <div className="container__tittleBox">
        <h2 className="container__title">My Recipes</h2>
        <div className="container__afterTitle"></div>
        <div className="container__button">
          <Link className="container__link" to="/recipe/create">
            <img src={plusIcon} alt="back_icon" />
          </Link>
        </div>
      </div>

      <div className="container__inputBox">

      </div>


    </div>
  )
};
