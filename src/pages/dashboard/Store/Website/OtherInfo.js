/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import {
  Stack,
  Button,
  Typography,
  Grid,
  Card,
  Box,
  InputAdornment,
  TextField,
  Autocomplete,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreOtherInfo } from '../../../../actions';

const StoreOtherInfo = () => {
  const dispatch = useDispatch();

  const { isUpdatingOtherInfo, store } = useSelector((state) => state.store);
  const [constantDeliveryChargeBasedOn, setConstantDeliveryChargeBasedOn] = useState(store.constantDeliveryChargeBasedOn);
  const [deliveryChargeType, setDeliveryChargeType] = useState(store.deliveryChargeType);
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState(store.freeDeliveryAbove);
  const [shipmentTime, setShipmentTime] = useState(store.orderIsShippedIn);
  const [returnAccepted, setReturnAccepted] = useState(store.returnAccepted);
  const [replacementAccepted, setReplacementAccepted] = useState(store.replacementAccepted);
  const [deliveryHappensWithin] = useState(store.deliveryHappensWithin);
  const [state] = useState(store.deliveryState);
  const [city] = useState(store.deliveryCity);
  const [replacementPeriod, setReplacementPeriod] = useState(store.replacementPeriod);
  const [returnPeriod, setReturnPeriod] = useState(store.returnPeriod);
  const [minRange] = useState(store.minDeliveryDistance);
  const [maxRange] = useState(store.maxDeliveryDistance);
  const [showShopInDeliveryZoneOnly] = useState(store.showShopInsideDeliveryZoneOnly);

  const onSubmit = () => {
    const formValues = {
      freeDeliveryAbove,
      orderIsShippedIn: shipmentTime,
      returnAccepted,
      replacementAccepted,
      replacementPeriod,
      returnPeriod,
      deliveryHappensWithin,
      deliveryState: state,
      deliveryCity: city,
      minDeliveryDistance: minRange,
      maxDeliveryDistance: maxRange,
      showShopInsideDeliveryZoneOnly: showShopInDeliveryZoneOnly,
      deliveryChargeType,
      constantDeliveryChargeBasedOn,
    };

    dispatch(updateStoreOtherInfo(formValues));
  };

  return (
    <div>
      <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mb-2">
      <a style={{textDecoration: "none"}} href={`https://qwikshop.online/${store.subName}`} target="_blank" rel="noreferrer">
        <Button variant="contained" startIcon={<RemoveRedEyeIcon />}>
          Preview
        </Button>
        </a>
      </div>

      <Grid className="px-4 pt-3" container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            
            
            <Box
              sx={{
                mb: 4,
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <FormControl sx={{mb: 3}}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Type of delivery pricing
              </FormLabel>
              <RadioGroup
                value={deliveryChargeType}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={'dynamic'}
                  control={
                    <Radio
                    
                      onClick={() => {
                        setDeliveryChargeType('dynamic');
                      }}
                    />
                  }
                  label="Dynamic"
                />
                <FormControlLabel
                  value={'constant'}
                  control={
                    <Radio
                      onClick={() => {
                        setDeliveryChargeType('constant');
                      }}
                    />
                  }
                  label="Constant"
                />
              </RadioGroup>

            </FormControl>
            {deliveryChargeType === 'constant' &&  <FormControl sx={{mb: 3}}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Constant Delivery Pricing will be based on
              </FormLabel>
              <RadioGroup
                value={constantDeliveryChargeBasedOn}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value={'distance'}
                  control={
                    <Radio
                    
                      onClick={() => {
                        setConstantDeliveryChargeBasedOn('distance');
                      }}
                    />
                  }
                  label="Distance"
                />
                <FormControlLabel
                  value={'weight'}
                  control={
                    <Radio
                      onClick={() => {
                        setConstantDeliveryChargeBasedOn('weight');
                      }}
                    />
                  }
                  label="Weight"
                />
              </RadioGroup>
            </FormControl> }
           
              <TextField
                name="freeDeliveryAbove"
                label="Free Delivery Above"
                fullWidth
                value={freeDeliveryAbove}
                onChange={(e) => {
                  setFreeDeliveryAbove(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <CurrencyRupeeRoundedIcon sx={{ fontSize: '20px' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                value={shipmentTime}
                onChange={(e, value) => {
                  setShipmentTime(value);
                }}
                id=""
                fullWidth
                options={shipedInTime}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Order is shipped in"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: '', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Return accepted (on applicable products)?
                </FormLabel>
                <RadioGroup
                  value={returnAccepted}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        onClick={() => {
                          setReturnAccepted(true);
                        }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        onClick={() => {
                          setReturnAccepted(false);
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Is Replacement accepted (on applicable products)?
                </FormLabel>
                <RadioGroup
                  value={replacementAccepted}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        onClick={() => {
                          setReplacementAccepted(true);
                        }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        onClick={() => {
                          setReplacementAccepted(false);
                        }}
                      />
                    }
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              {returnAccepted && (
                <Autocomplete
                  value={returnPeriod}
                  onChange={(e, value) => {
                    setReturnPeriod(value);
                  }}
                  id=""
                  fullWidth
                  options={timeline}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Return Period"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              )}

              {replacementAccepted && (
                <Autocomplete
                  value={replacementPeriod}
                  onChange={(e, value) => {
                    setReplacementPeriod(value);
                  }}
                  id=""
                  fullWidth
                  options={timeline}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Replacement Period"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              )}
            </Box>


          </Card>
          <div style={{ width: '100%' }} className="d-flex flex-row align-items-center justify-content-end mt-3">
            <LoadingButton
              onClick={() => {
                onSubmit();
              }}
              loading={isUpdatingOtherInfo}
              variant="contained"
            >
              Save
            </LoadingButton>
          </div>
        </Grid>
        <Stack spacing={3}>
        <Typography variant='body2'>Dynamic Pricing: Calculated based on delivery pincode, pickup pincode, weight & type of shipment.</Typography>
            <Typography variant='body2'>Constant Pricing: This will be constant as defined by you based on distance & weight.</Typography>
        </Stack>
        
      </Grid>
    </div>
  );
};

export default StoreOtherInfo;

const shipedInTime = [
  { label: '10-30 min' },
  { label: '1-3 hr' },
  { label: '4-10 hr' },
  { label: '1-2 day' },
  { label: '2-4 day' },
  { label: '4-6 day' },
  { label: '6-8 day' },
  { label: '8-10 day' },
  { label: '10+ days' },
];

const timeline = [
  { label: '2 days' },
  { label: '3 days' },
  { label: '5 days' },
  { label: '7 days' },
  { label: '12 days' },
  { label: '15 days' },
  { label: '30 days' },
  { label: '60 days' },
];
