import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const ProtectedRoute = (
  { children }: { children:JSX.Element}
  ) => {

  const {
    isAuthenticated, isLoading, loginWithRedirect
  } = useAuth0();

  useEffect(() => {}, [isLoading])
  
  if (isLoading) {
    return <loading-spinner class="lds-dual-ring"/>
  } else if (!isAuthenticated) {
    loginWithRedirect()
    return <loading-spinner class="lds-dual-ring"/>;
  }
  return (
    children
  );
};

export default ProtectedRoute