import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import '../styles/styling-HeaderFooter.css';
import logo_site from '../assets/logo_site.svg'
import logo_github from '../assets/logo_github.svg'
import logo_linkedin from '../assets/logo_linkedin.svg'

import icon_key from '../assets/icon_key.svg'
import icon_account from '../assets/icon_account.svg'
import LoginButton from './auth/Login';

let isAuthenticated = true

export const Header = (
  //{ setPartyState }
  ) => {

  /*
  const { isAuthenticated } = useAuth0();
  const getList = () => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/events`)
      .then(response => setPartyState(response.data))
  }
  */

  return (
    <header className='site__header'>

      <header-column class="header--flex">
        back
      </header-column>

      <header-column class="header--flex">
        <Link to='/'>
          <img className='header__logo' 
            // onClick={getList} 
            src={logo_site} 
            alt='Hostr logo' />
        </Link>
      </header-column>

      <header-column class="header--flex">
        {isAuthenticated 
              ? "profile"
                //<Link to='/userprofile'>
                //  profile
                //</Link>
              : "signup"}        
      </header-column>

    </header>
  )
}

export const Footer = () => {

  return (
    <footer className='site__footer'>
      <div>
        <a href="https://github.com/gullbra" 
          target="_blank">
          <img src={logo_github} alt="" />
        </a>

        <a href="https://github.com/gullbra" 
          target="_blank">
            <img src={logo_linkedin} alt="" />
        </a>
  
      </div>
    </footer>
  )
}

/**
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
 
 */
