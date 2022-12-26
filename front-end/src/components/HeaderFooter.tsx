import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";

import '../styles/styling-HeaderFooter.css';
import logo_site from '../assets/logo_site.svg'
import logo_github from '../assets/logo_github.svg'
import logo_linkedin from '../assets/logo_linkedin.svg'

// import LoginButton from './auth/Login';

let isAuthenticated = true

export const Header = (
  //{ setEventState }
  ) => {

  const navigate = useNavigate()
  // console.log(
  //   useLocation().pathname
  // )
  /*
  const { isAuthenticated } = useAuth0();
  const getList = () => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/api/events`)
      .then(response => setEventState(response.data))
  }
  */

  return (
    <header className='site__header'>

      <header-column class="header--flex">
        {useLocation().pathname !== '/' 
          &&  <nav 
                className='material-symbols-outlined header__account_icons'
                onClick={() => navigate(-1)}
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
        {/* <Link to={isAuthenticated ? '/userprofile' : '/login'}> */}
          <nav className='material-symbols-outlined header__account_icons'>
            {isAuthenticated ? "account_circle": "key"}
          </nav>
        {/* </Link>     */}
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
