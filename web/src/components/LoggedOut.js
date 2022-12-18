import { Link } from 'react-router-dom';

export const LoggedOut = () => {

  return (
    <div className="navbar-users">
      <Link id='button' to='/users'>LOGIN</Link>
      <div>or</div>
      <Link id='button' to='/users/create'>CREATE ACCOUNT</Link>
    </div>
  )
};
