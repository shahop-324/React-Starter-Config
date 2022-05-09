import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// pages
import { useSelector } from 'react-redux';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { pathname } = useLocation();
  console.log(pathname, "This is pathname");
  const [requestedLocation, setRequestedLocation] = useState(null);

  const { isSignedIn } = useSelector((state) => state.auth);

  if (isSignedIn) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
