import { useAuth0 } from "@auth0/auth0-react";
import './UserProfile.css';
import { Link } from 'react-router-dom'
import LogoutButton from './auth/Logout';
import List from "./List";
import { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = ({ partyState, setPartyState }) => {
  
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [ yourParties, setYourParties ] = useState([])
  
  useEffect( () => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_DOMAIN}/events/${user.sub.split('|')[1]}`)
        .then(response => {
          setYourParties(response.data)
        })
    }
  }, [user])

  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&  (    
    <div className="userProfile">
      <Link className="userProfile__listLink" to='/'>
        <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
      </Link>

      <h1 className="userProfile__title">User Profile</h1>
      <img className="userProfile__profile" src={user.picture} alt='Profile Pic'/>
      <div className="userProfile__card">
      <p>Name: {user.nickname}</p>
      <p>Mail: {user.email} </p>
      </div>
      <LogoutButton />

      <List 
        partyState={partyState} 
        setPartyState={setPartyState} 
        yourParties={yourParties} 
        setYourParties={setYourParties}
        showDelBtn={true}/>
      </div>
    )
  )
}

export default UserProfile
