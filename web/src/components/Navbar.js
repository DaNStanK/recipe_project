import "./Navbar.css";

import { Link, useNavigate } from 'react-router-dom';

import { LoggedIn } from './LoggedIn';

import { LoggedOut } from './LoggedOut';

import { useSelector } from "react-redux";

import { getUser } from "../features/user/userSlice";

import logoImg from "../icons/logo_color.svg";


export const Navbar = () => {

   const { user } = useSelector(getUser);

   const navigate = useNavigate();

   return (

      <nav className='navbar-container'>
         <div className="navbar-container__logo" onClick={() => navigate('/')}>
            <img src={logoImg} alt="logo icon" />
         </div>
         <div className="navbar-container__category">
            <Link
               to='/recipes/category/breakfast'
               className='navbar-container__category--links'
            >BREAKFAST</Link>
            <div className='navbar-container__category--circles'></div>
            <Link
               to='/recipes/category/brunch'
               className='navbar-container__category--links'
            >BRUNCH</Link>
            <div className='navbar-container__category--circles'></div>
            <Link
               to='/recipes/category/lunch'
               className='navbar-container__category--links'
            >LUNCH </Link>
            <div className='navbar-container__category--circles'></div>
            <Link
               to='/recipes/category/dinner'
               className='navbar-container__category--links'
            >DINNER</Link>
         </div>

         {user?.isLoggedIn && <LoggedIn />}


         {!user?.isLoggedIn && <LoggedOut />}
      </nav>

   );

};
