import "./Navbar.css";
import { Link } from 'react-router-dom';
import { LoggedIn } from './LoggedIn';
import { LoggedOut } from './LoggedOut';
import { useSelector } from "react-redux";
import { getUser } from "../features/user/userSlice";
// images
import logoImg from "../icons/logo_color.svg";

export const Navbar = () => {
   const { user } = useSelector(getUser);

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

            {user?.isLoggedIn && <LoggedIn />}
            {!user?.isLoggedIn && <LoggedOut />}
         </nav>
      </div>
   );
};
