import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const ProtectedRoute = (
  { children }: { children:any}
  ) => {
  
  const {
    isAuthenticated, isLoading, loginWithRedirect
  } = useAuth0();

  useEffect(() => {}, [isLoading])
  
  if (!isLoading && !isAuthenticated) {
    return loginWithRedirect();
  }
  
  return (
    isAuthenticated 
      ? children
      : <></>
  );
};

export default ProtectedRoute