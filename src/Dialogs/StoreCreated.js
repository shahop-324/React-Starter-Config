/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
// @mui
import { Dialog, DialogTitle, Typography } from '@mui/material';
import styled from 'styled-components';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Container = styled.div`
  height: 500px;
`;

const StoreCreated = ({ open, handleClose }) => {
  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 6000);
  }, []);

  const { width, height } = useWindowSize();

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <Confetti width={width} height={height} />
        <DialogTitle className="text-center">Store Created</DialogTitle>
        <Container className="d-flex flex-column align-items-center justify-content-center">
          <CheckCircleRoundedIcon className="mb-3" style={{ fontSize: '200', color: 'green' }} />
          <Typography variant="p2">Now, you can easily run your business online with 0% commision.</Typography>
        </Container>
      </Dialog>
    </>
  );
};

export default StoreCreated;
