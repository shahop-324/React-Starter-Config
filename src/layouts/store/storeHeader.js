/* eslint-disable react/jsx-key */
import React from 'react';
import { Outlet } from 'react-router-dom';
// form
import { styled } from '@mui/material/styles';
import {
  Avatar,
  IconButton,
  Box,
  Badge,
  Grid,
  Divider,
  InputAdornment,
  Autocomplete,
  TextField,
  Typography,
} from '@mui/material';

// redux
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreFooter from './storeFooter';
import StorePreFooter from './storePreFooter';

const HeaderStyle = styled('header')(({ theme }) => ({
  lineHeight: 0,
  width: '100%',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const StoreHeader = () => (
  <>
    <HeaderStyle className="pt-3 pb-4">
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            alignItems: 'center',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '1fr 2fr 1fr' },
          }}
        >
          <Avatar src={''} alt={''} variant="rounded" />
          <div className="d-flex flex-row align-items-center justify-content-center">
            <Autocomplete
              id="country-select-demo"
              sx={{ width: '360px' }}
              options={[]}
              autoHighlight
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  InputProps={{
                    ...params.inputProps,
                    autoComplete: '', // disable autocomplete and autofill
                    startAdornment: (
                      <InputAdornment>
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                    endAdornment: <InputAdornment>{/* <MyLocationIcon /> */}</InputAdornment>,
                  }}
                />
              )}
            />
          </div>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifySelf: 'end' }}>
            <div className="d-flex flex-column align-items-center">
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" className="mb-1">
                <CategoryRoundedIcon />
              </IconButton>
              <Typography>Catalouge</Typography>
            </div>

            <div className="d-flex flex-column align-items-center mx-3">
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" className="mb-1">
                <Badge badgeContent={17} color="error">
                  <ShoppingBagRoundedIcon />
                </Badge>
              </IconButton>
              <Typography>Bag</Typography>
            </div>

            <div className="d-flex flex-column align-items-center me-3">
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" className="mb-1">
                <Badge badgeContent={5} color="warning">
                  <FavoriteBorderRoundedIcon />
                </Badge>
              </IconButton>

              <Typography>Wishlist</Typography>
            </div>
            <div className="d-flex flex-column align-items-center me-3">
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" className="mb-1">
                <Badge badgeContent={2} color="success">
                  <LocalOfferIcon />
                </Badge>
              </IconButton>

              <Typography>Discounts</Typography>
            </div>
            <div className="d-flex flex-column align-items-center">
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit" className="mb-1">
                <AccountCircleRoundedIcon />
              </IconButton>
              <Typography>Account</Typography>
            </div>
          </Box>
        </Box>
      </Grid>
    </HeaderStyle>
    <Divider />

    <Outlet />
    <div className="mt-5">
      <StorePreFooter />
      <StoreFooter />
    </div>
  </>
);

export default StoreHeader;

// ----------------------------------------------------------------------
