import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  
  const { loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return children;
};

export default ProtectedRoute