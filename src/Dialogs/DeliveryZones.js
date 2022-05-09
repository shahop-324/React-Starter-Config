/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Typography,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelfDeliveryZone } from '../actions';

const DeliveryZones = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpadtingSelfDeliveryZone } = useSelector((state) => state.store);
  const [storePincode, setStorePincode] = useState(store.pincode);
  const [pricePer100gm, setPricePer100gm] = useState(store.pricePer100gm);
  const [pricePer5km, setPricePer5km] = useState(store.pricePer5km);

  const onSubmit = () => {
    const formValues = {
      storePincode,
      pricePer100gm,
      pricePer5km,
    };

    dispatch(updateSelfDeliveryZone(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <div className="d-flex flex-row align-items-center justify-content-between mx-3">
          <DialogTitle className="me-3">Pincode / Distance Based Delivery</DialogTitle>
          <div className="d-flex flex-row align-items-center">
            <LoadingButton onClick={onSubmit} loading={isUpadtingSelfDeliveryZone} variant="contained" className="me-3">
              Save
            </LoadingButton>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </div>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-4">
              <Typography variant="body2" className="mb-3">
                All delivery distances will be calculated from your store pincode.
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  disabled
                  helperText={'You can change your store pincode by updating store profile'}
                  name="storePincode"
                  label="Store Pincode"
                  fullWidth
                  value={storePincode}
                  onChange={(e) => {
                    setStorePincode(e.target.value);
                  }}
                />
              </Box>
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">
              <Typography className="mb-3">Delivery Price per 100gm Weight</Typography>

              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  name="pricePer100gm"
                  label="Price per 100gm weight"
                  fullWidth
                  value={pricePer100gm}
                  onChange={(e) => {
                    setPricePer100gm(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">
              <Typography className="mb-3">Delivery Price per 5km</Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <TextField
                  name="pricePer100gm"
                  label="Price per 5km"
                  fullWidth
                  value={pricePer5km}
                  onChange={(e) => {
                    setPricePer5km(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <CurrencyRupeeRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <DialogActions>
          <div className="d-flex flex-row align-items-center">
            <LoadingButton onClick={onSubmit} loading={isUpadtingSelfDeliveryZone} variant="contained" className="me-3">
              Save
            </LoadingButton>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeliveryZones;
