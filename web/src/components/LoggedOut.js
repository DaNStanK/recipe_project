import { Link } from 'react-router-dom';

export const LoggedOut = () => {

  return (
    <div className="navbar-users">
      <Link className="navbar-login" id='button' to='/users'>LOGIN</Link>
      <div>or</div>
      <Link className="navbar-create" id='button' to='/users/create'>CREATE ACCOUNT</Link>
    </div>
  );
};
