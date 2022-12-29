import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

import '../styles/styling-HeaderFooter.css';
import logo_site from '../assets/logo_site.svg'
import logo_github from '../assets/logo_github.svg'
import logo_linkedin from '../assets/logo_linkedin.svg'

export const Header = (
  //{ setEventState }
  ) => {

  const navigate = useNavigate()
  const currentUrl = useLocation().pathname
  const { 
    isAuthenticated, 
  } = useAuth0();

  /*
  const getList = () => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/events`)
      .then(response => setEventState(response.data))
  }
  */

  return (
    <header className='site__header'>

      <header-column class="header--flex">
        {(currentUrl !== '/') 
          &&  <nav 
                className='material-symbols-outlined header__account_icons'
                onClick={() => {
                  currentUrl === '/userprofile'
                    ? navigate('/')
                    : navigate(-1)
                }}
              >
                chevron_left
              </nav>}
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


        <Link to='/userprofile'>
          <nav 
            className='material-symbols-outlined header__account_icons'
            // onClick={() => { loginWithRedirect()}}
          >{isAuthenticated ? "account_circle": "key"}</nav>
        </Link>
      </header-column>

    </header>
  )
}

export const Footer = () => {

  return (
    <footer className='site__footer'>
      <div>

        <a href="https://github.com/gullbra" 
          target="_blank"
          rel="noreferrer">
          <img src={logo_github} alt="github logo" />
        </a>

        <a href="https://github.com/gullbra" 
          target="_blank"
          rel="noreferrer">
            <img src={logo_linkedin} alt="linkedin logo" />
        </a>
  
      </div>
    </footer>
  )
}
