import React, {useState} from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const RequiredAuth = ({children}) => {
  const [auth] = useState(false);
  let location = useLocation();


  if (auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequiredAuth
