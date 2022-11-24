import './Header.css';
import logo from '../assets/logo.svg'
import LoginButton from './auth/Login';
import LogoutButton from './auth/Logout';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

  const { isAuthenticated } = useAuth0();

  return (
    <nav className="header">
        <img className='header__logo' src={logo} alt='Hostr logo' />
        {isAuthenticated 
          ? <Link to='/userprofile'>User Profile</Link>
          : ''}
        {isAuthenticated 
          ? <LogoutButton/>
          : <LoginButton />}
    </nav>
  )
}

export default Header