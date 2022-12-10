import './Header.css';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './auth/Login';

const Header = ({ setPartyState }) => {

  const { isAuthenticated } = useAuth0();
  const getList = () => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/events`)
      .then(response => setPartyState(response.data))
  }

  return (
    <nav className="header">
        <Link to='/'>
          <img 
            className='header__logo' 
            onClick={getList} 
            src={logo} 
            alt='Hostr logo' />
        </Link>
        {isAuthenticated 
          ? <Link to='/userprofile' className="header__link"><span className="material-symbols-outlined icon_person">person</span></Link>
          : <LoginButton/>}
     
    </nav>
  )
}

export default Header