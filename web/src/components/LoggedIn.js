import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

export const LoggedIn = () => {
  const dispatch = useDispatch();

  return (
    <div className="navbar__logged-users">
      <Link className="login-links one" to='/recipes'>MY RECIPES</Link>
      <div className='navbar-types__login-circles'></div>
      <Link className="login-links two" to='/users/edit'>MY PROFILE</ Link>
      <div className='navbar-types__login-circles'></div>
      <Link className="login-links three" to='/users' onClick={() => dispatch(logoutUser())}>LOG OUT</Link>
    </div>
  );
};
