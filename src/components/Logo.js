import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';


const LogoImg = 'https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  

  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={LogoImg} style={{height: 40, width: 40}} alt="qwikshop logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
