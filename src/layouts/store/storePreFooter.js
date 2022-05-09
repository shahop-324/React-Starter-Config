import React from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Divider, Typography, Stack, Card } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import PaymentsIcon from '@mui/icons-material/Payments';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

const StorePreFooter = () => (
    <RootStyle>
      <Divider />

      <Stack
        direction={'row'}
        container
        spacing={3}
        className="px-4 py-4"
        sx={{ textAlign: { xs: 'center', md: 'left' }, justifyContent: { xs: 'center', md: 'space-around' } }}
      >
        <Grid xs={12} md={4}>
          <Card sx={{ height: '260px' }}>
            <div style={{ height: '260px' }} className="d-flex flex-column align-items-center justify-content-center">
              <LocalShippingIcon style={{ fontSize: '50px', color: '#538BF7' }} />
              <Typography variant="subtitle2" className="my-2">
                Free delivery above Rs. 499
              </Typography>
              <Typography variant="subtitle2">PAN India Delivery</Typography>
              <Typography variant="subtitle2" className="my-2">
                Shipped within 4-24 hours
              </Typography>
            </div>
          </Card>
        </Grid>

        <Grid xs={12} md={4}>
          <Card sx={{ height: '260px' }}>
            <div style={{ height: '260px' }} className="d-flex flex-column align-items-center justify-content-center">
              <PublishedWithChangesIcon style={{ fontSize: '50px', color: '#538BF7' }} />
              <Typography variant="subtitle2" className="my-2">
                Easy 7 Days Return*
              </Typography>
              <Typography variant="subtitle2">Easy 10 Replacement*</Typography>
            </div>
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          <Card sx={{ height: '260px' }}>
            <div style={{ height: '260px' }} className="d-flex flex-column align-items-center justify-content-center">
              {' '}
              <PaymentsIcon style={{ fontSize: '50px', color: '#538BF7' }} />{' '}
              <Typography variant="subtitle2" className="my-2">
                Cash on delivery
              </Typography>
              <Typography variant="subtitle2">Netbanking, Credit, Debit card</Typography>
              <Typography variant="subtitle2" className="my-2">
                Wallet, UPI
              </Typography>
            </div>
          </Card>
        </Grid>
      </Stack>
    </RootStyle>
  );

export default StorePreFooter;
