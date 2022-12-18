import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export const LoggedIn = () => {
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    localStorage.clear();
    dispatch({
      type: 'LOGOUT'
    });
    navigate('/users');
  }, [navigate, dispatch]);

  return (
    <div className="navbar__logged-users">
      <Link to='/my-recipes'>MY RECIPES</Link>

      <div className='navbar-types__login-circles'></div>

      <Link to='/edit-profile'>MY PROFILE</Link>

      <div className='navbar-types__login-circles'></div>

      <button onClick={handleClick}>LOG OUT</button>
    </div>
  )
}
