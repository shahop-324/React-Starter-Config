/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Button, Chip } from '@mui/material';
// utils


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

GeneralWidgetSummary.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string,
  total: PropTypes.number,
};

export default function GeneralWidgetSummary({ comingSoon, title, action, total, icon, color = 'primary' }) {
  return (
    <RootStyle
      sx={{
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
      }}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        {icon}
      </IconWrapperStyle>
      <Typography variant="h5">{total}</Typography>
      {comingSoon ? (
        <Chip className="my-3" label={'Coming Soon'} variant="contained" color="primary" />
      ) : (
        <Button onClick={action} className="my-3" variant="contained" to="#">
          {title}
        </Button>
      )}
    </RootStyle>
  );
}
