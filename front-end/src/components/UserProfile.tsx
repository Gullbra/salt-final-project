/*
import { Link } from 'react-router-dom'
import LogoutButton from './auth/Logout';
import List from "./EventList";
import { useState, useEffect } from "react";
import axios from "axios";
*/
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import '../styles/styling-UserProfile.css';

// import { useLayoutEffect } from "react";
// import { useNavigate } from "react-router-dom";

const UserProfile = (
  //{ eventState, setPartyState }
  ) => {

  const navigate = useNavigate();
  const {
    isAuthenticated, isLoading, loginWithRedirect, logout, user
  } = useAuth0();

  useEffect(() => {}, [isLoading])
  
  if (isLoading) {
    return <loading-spinner class="lds-dual-ring"/>
  } else if (!isAuthenticated) {
    loginWithRedirect()
    return <loading-spinner class="lds-dual-ring"/>;
  }
  
    /*
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [ yourParties, setYourParties ] = useState([])
  
  useEffect( () => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/users/${user.sub.split('|')[1]}/events`)
        .then(response => {
          setYourParties(response.data)
        })
    }
  }, [user])

  
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  */

  // user && console.log(user)

  return (
    <>
      {user &&
        <article className="main__profile-wrapper">
          <img className="userProfile__profile" src={user.picture} alt='Profile Pic'/>
          <p>Name: {user.nickname}</p>
          <p>Mail: {user.email} </p>

          <button>
            manages your events
          </button>
          <button
            onClick={() => navigate('/createevent')}>
            add new event
          </button>
          <button>
            account settings
          </button>
          <button 
            onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </article>
      }
    </>
    /*
    isAuthenticated &&  (    
    <div className="userProfile">
      <Link className="userProfile__listLink" to='/'>
        <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
      </Link>

      <img className="userProfile__profile" src={user.picture} alt='Profile Pic'/>
      <div className="userProfile__card">
      <p>Name: {user.nickname}</p>
      <p>Mail: {user.email} </p>
      </div>
      <h2>My events</h2>
      <List
        eventState={eventState} 
        setPartyState={setPartyState} 
        yourParties={yourParties} 
        setYourParties={setYourParties}
        showDelBtn={true}/>
        <LogoutButton />
      </div>
    )
    */
  )
}

export default UserProfile
