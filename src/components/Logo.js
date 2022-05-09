import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';


const LogoImg = 'https://media-exp1.licdn.com/dms/image/C560BAQF52Zo0u13nuQ/company-logo_200_200/0/1632122032773?e=2147483647&v=beta&t=YHnHAdVcakCRauxH1M_dY4817gPZeEWO5Qt8jM0mfc0';

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
