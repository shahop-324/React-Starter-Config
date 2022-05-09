/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

import { useTimer } from 'react-timer-hook';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Box, Typography, IconButton, Stack, Button, Divider } from '@mui/material';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Card = styled.div`
  border: 1px solid #54d62c5e;
  border-radius: 10px;
  padding: 12px;
  min-height: 150px;
`;

const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

const FirstTimeOfferCard = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days,} = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <>
      <Card>
        <Stack direction={'row'} spacing={3}>
          <LocalOfferIcon color="success" />
          <Typography color="success" variant="h6">
            Rs. 600 OFF
          </Typography>
        </Stack>

        <Stack direction={'row'} spacing={3} className="my-3">
          <Typography variant="subtitle1">USE HAPPY60</Typography>
          <Typography variant="subtitle2">Above Rs.6000</Typography>
        </Stack>
        <Divider />

        <Stack direction="row" alignItems="center" justifyContent={'space-between'} className="my-2">
          <Typography>Time Left</Typography>
          <div style={{ fontSize: '14px' }}>
            <span>{days} day </span>:<span> {hours} hr </span>:<span> {minutes} min </span>:<span> {seconds} s</span>
          </div>
        </Stack>
        <Divider />
        <Stack direction={'row'} alignItems="center" justifyContent={'space-around'} className="mt-3">
          <Button variant="outlined">Copy</Button>
          <Button>Share</Button>
        </Stack>
      </Card>
    </>
  );
};

const StoreOffers = () => (
    <div className="container mt-5">
      <div className="mb-4 d-flex flex-row align-items-center">
        <IconButton>
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <Typography variant="h5" className="ms-3">
          Offers
        </Typography>
      </div>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
        }}
      >
        <FirstTimeOfferCard expiryTimestamp={time} />
        <FirstTimeOfferCard expiryTimestamp={time} />
        <FirstTimeOfferCard expiryTimestamp={time} />
      </Box>
    </div>
  );

export default StoreOffers;

// First Time Offers
// 26 Jan Special offer
// Buy X get Y free
// Flat discount
// Percentage discount
