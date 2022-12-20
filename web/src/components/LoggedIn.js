import "./Navbar.css"

import { useCallback } from 'react';

import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';

export const LoggedIn = () => {
  const { dispatch } = useAuthContext();

  const handleClick = useCallback(() => {
    localStorage.clear();
    dispatch({
      type: 'LOGOUT'
    });
  }, [dispatch]);

  return (
    <div className="navbar__logged-users">
      <Link
        className="login-links one"
        to='/recipes'
      >MY RECIPES</Link>

      <div className='navbar-types__login-circles'></div>

      <Link
        className="login-links two"
        to='/users/edit'
      >MY PROFILE</Link>

      <div className='navbar-types__login-circles'></div>

      <Link
        className="login-links three"
        to='/users'
        onClick={handleClick}
      >LOG OUT</Link>
    </div>
  )
}
