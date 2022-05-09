/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import { exportComponentAsPNG } from 'react-component-export-image';
import styled from 'styled-components';

import {
  Typography,
  
  Card,
  Grid,
  Dialog,
  
  Button,
 
} from '@mui/material';

import { useSelector } from 'react-redux';
import QwikShopLogo from '../assets/QwikShop_logo.png';

const QRUpper = styled.div`
  height: 90%;
  width: 100%;
  background-color: #2065d1;
`;

const ComponentToPrint = React.forwardRef(({ store }, ref) => {
  
  

  return (
  <div ref={ref}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} className="d-flex flex-row align-items-center justify-content-center m-3">
        <Card sx={{ width: '300px', height: '500px' }}>
          <div className="layer-1" style={{ height: '50%', width: '100%', zIndex: '1000' }}>
            <QRUpper>{}</QRUpper>
          </div>

          <div
            style={{ height: '100%', width: '100%', zIndex: '100000', position: 'absolute', top: '0', left: '0' }}
            className="d-flex flex-column align-items-center justify-content-around"
          >
            <Typography variant="h4" color="white">
              Order Online!
            </Typography>
            <Typography color="white" style={{ fontSize: '16px' }}>
              Scan QR to check our products
            </Typography>
            <div
              style={{
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
              }}
            >
              <QRCode value={`https://qwikshop.online/${store.subName}`} size={120} />
            </div>
            <Typography variant="h7" style={{ fontSize: '16px' }}>
              {store.storeName}
            </Typography>
            <a href="#" style={{ fontSize: '15px' }}>
              qwikshop.online/{store.subName}
            </a>
            {<img src={QwikShopLogo} alt="logo" style={{ height: '60px' }} /> }
            
          </div>
        </Card>
      </Grid>
    </Grid>
  </div>
)})

const StoreQRCode = ({ open, handleClose }) => {
  const { store } = useSelector((state) => state.store);

  const componentRef = useRef();

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
        <ComponentToPrint store={store} ref={componentRef} />

        <div className="d-flex flex-row align-items-center justify-content-center mb-4">
          <Button onClick={() => exportComponentAsPNG(componentRef)} variant="outlined">
            Download
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default StoreQRCode;
