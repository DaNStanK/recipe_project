//styles
import "./Navbar.css"

// react router
import { Link } from 'react-router-dom';

// components
import { LoggedIn } from './LoggedIn';
import { LoggedOut } from './LoggedOut';

// images
import logoImg from "../icons/logo_color.svg";

import { useAuthContext } from "../hooks/useAuthContext";

export const Navbar = () => {

   const { isLoggedIn } = useAuthContext();

   return (
      <div id="navbar">
         <nav className='navbar-container'>

            <div className="navbar-logo">
               <Link to='/' className='navbar-logo__image'>
                  <img src={logoImg} alt="logo icon" />
               </Link>
            </div>

            <div className="navbar-types">
               <Link to='/recipes/category/breakfast' className='navbar-links'>BREAKFAST</Link>
               <div className='navbar-types__circles'></div>
               <Link to='/recipes/category/brunch' className='navbar-links'>BRUNCH</Link>
               <div className='navbar-types__circles'></div>
               <Link to='/recipes/category/lunch' className='navbar-links'>LUNCH</Link>
               <div className='navbar-types__circles'></div>
               <Link to='/recipes/category/dinner' className='navbar-links'>DINNER</Link>
            </div>
            {isLoggedIn && <LoggedIn />}
            {!isLoggedIn && <LoggedOut />}
         </nav>
      </div>
   )
};
