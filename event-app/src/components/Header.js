import './Header.css';
import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <nav className="header">
        <img className='header__logo' src={logo} alt='Hostr logo' />
    </nav>
  )
}

export default Header