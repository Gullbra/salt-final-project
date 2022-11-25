import './Header.css';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Header = ({ isAuthenticated }) => {

  return (
    <nav className="header">
        <img className='header__logo' src={logo} alt='Hostr logo' />
        {isAuthenticated 
          ? <Link to='/userprofile' className="header__link"><span className="material-symbols-outlined icon_person">person</span></Link>
          : ''}
     
    </nav>
  )
}

export default Header