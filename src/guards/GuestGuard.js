import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

//----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {

  const {isSignedIn} = useSelector((state) => state.auth);

  if (isSignedIn) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }
  return <>{children}</>;
}