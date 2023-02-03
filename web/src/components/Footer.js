// styles
import './Footer.css';

// react router
import { Link } from 'react-router-dom';

// images
import logoImg from '../icons/logo_white.svg';

export const Footer = () => {

   return (
      <div id="footer">

         <div className="footer-container">
            <div className="footer-logo">
               <Link to='/'>
                  <img src={logoImg} alt="logo icon" />
               </Link>
            </div>

            <div className="footer-types">
               <Link to='/recipes/category/breakfast' className='footer-links'>BREAKFAST</Link>
               <div className='footer-types__circles'></div>
               <Link to='/recipes/category/brunch' className='footer-links'>BRUNCH</Link>
               <div className='footer-types__circles'></div>
               <Link to='/recipes/category/lunch' className='footer-links'>LUNCH</Link>
               <div className='footer-types__circles'></div>
               <Link to='/recipes/category/dinner' className='footer-links'>DINNER</Link>
            </div>

            <div className="footer-users">
               <span>Baby's Food Place copyright &reg; 2021</span>
            </div>
         </div>

      </div>
   );
};