import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user } = useAuth0();
  console.log(user)


  return (
    <div>

      <h1>User Profile</h1>
      <img src={user.picture} alt='Profile Pic'/>
      <p>name: {user.name}</p>
      <p>mail: {user.email} verified: {user.email_verified.toString()}</p>
      

    </div>
  )
}

export default UserProfile