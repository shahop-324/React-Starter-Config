/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Typography, Button, Drawer, Stack, IconButton, Box } from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import OtpInput from 'react-otp-input';
import { verifyWhatsAppNumber } from '../../../actions';

const WhatsAppVerification = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState();
  const [isValid, setIsValid] = useState(false);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '500px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Verify WhatsApp Number</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>

            <Box sx={{ width: '400px', p: 4 }}>
              {/*  */}
              <Typography variant="body2" sx={{ mb: 2 }}>
                Please Enter OTP Sent to your mobile number
              </Typography>

              <OtpInput
                value={otp}
                onChange={(otp) => {
                  setOtp(otp);
                  if (otp.length === 6) {
                    setIsValid(true);
                  } else {
                    setIsValid(false);
                  }
                }}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={{
                  width: '2rem',
                  height: '2.2rem',
                  margin: '1rem 1rem',
                  fontSize: '2rem',
                  borderRadius: 4,
                  border: '1px solid rgba(0,0,0,0.3)',
                }}
              />
            </Box>

            <Stack direction="row" alignItems={'center'} justifyContent="end" spacing={2}>
              <Button
                disabled={!isValid}
                variant="contained"
                color="success"
                onClick={() => {
                  dispatch(verifyWhatsAppNumber(otp, handleClose));
                }}
              >
                Verify
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </Stack>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
};

export default WhatsAppVerification;
