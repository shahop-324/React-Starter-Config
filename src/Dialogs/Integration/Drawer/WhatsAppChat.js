/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import CloseRounded from '@mui/icons-material/CloseRounded';
import { IconButton, Drawer, Stack, Box, Typography, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { updateWhatsAppNumber } from '../../../actions';
import WhatsAppVerification from '../Verification/WhatsApp';
import CustomPhoneNumber from '../../../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

const WhatsAppBusinessChat = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store } = useSelector((state) => state.store);

  const [whatsAppBusinessNumber, setWhatsAppBusinessNumber] = useState(store.WhatsAppNumber);

  const [openVerification, setOpenVerification] = useState(false);

  const handleCloseVerification = () => {
    setOpenVerification(false);
  };

  useEffect(() => {
    if (store.WAVerified) {
      handleClose();
    }
  }, [store]);

  return (
    <>
      <React.Fragment key={'right'}>
        <Drawer anchor={'right'} open={open} onClose={handleClose}>
          <Box sx={{ my: 3, mx: 4, width: '400px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">WhatsApp Chat</Typography>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Stack>
            <Box sx={{ my: 4 }}>
              <Box
                className="mb-3"
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                }}
              >
                <PhoneInput
                  name="whatsAppBusinessNumber"
                  placeholder="WhatsApp Business Number"
                  value={whatsAppBusinessNumber}
                  onChange={setWhatsAppBusinessNumber}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
              </Box>

              <Button
                onClick={() => {
                  setOpenVerification(true);
                  dispatch(updateWhatsAppNumber(whatsAppBusinessNumber, false, () => {}));
                }}
                sx={{ my: 2 }}
                variant="contained"
                fullWidth
              >
                Connect
              </Button>
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
      {openVerification && <WhatsAppVerification open={openVerification} handleClose={handleCloseVerification} />}
    </>
  );
};

export default WhatsAppBusinessChat;
