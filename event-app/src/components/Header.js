import './Header.css';
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className="header">
        <img className='header__logo' src={logo} alt='Hostr logo' />
        <Link to='/'>List</Link>
        <Link to='/addevent'>Add Event</Link>
    </nav>
  )
}

export default Header