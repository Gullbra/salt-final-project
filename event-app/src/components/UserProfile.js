import { useAuth0 } from "@auth0/auth0-react";
import './UserProfile.css';
import { Link } from 'react-router-dom'
import LogoutButton from './auth/Logout';

const UserProfile = () => {
  const { user } = useAuth0();
  console.log(user)


  return (
    <div className="userProfile">
      <Link className="userProfile__listLink" to='/'><span className="material-symbols-outlined back-icon">arrow_back_ios_new</span></Link>
      <h1 className="userProfile__title">User Profile</h1>
      <img className="userProfile__profile" src={user.picture} alt='Profile Pic'/>
      <p>name: {user.nickname}</p>
      <p>mail: {user.email} verified: {user.email_verified.toString()}</p>
      <LogoutButton />
    </div>
  )
}

export default UserProfile