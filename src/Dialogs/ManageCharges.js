/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// @mui
import {
  Box,
  Card,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
  InputAdornment,
  Typography,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { updateManageCharges } from '../actions';

const IOSSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  })
);

const ManageCharges = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { store, isUpdatingManageCharges } = useSelector((state) => state.store);

  const [gstEnabled, setGSTEnabled] = useState(store.gstEnabled);
  const [gstNumber, setGSTNumber] = useState(store.gstNumber);
  const [gstPercentage, setGSTPercentage] = useState(store.gstPercentage);

  const [extraCharges, setExtraCharges] = useState(store.extraCharges);

  const addChargeRow = () => {
    setExtraCharges((prev) => [...prev, { index: uuidv4(), name: '', type: 'Flat', percentage: '', charge: '' }]);
  };

  const deleteChargeRow = (index) => {
    setExtraCharges((prev) => prev.filter((el) => el.index !== index));
  };

  const updateChargeRow = (value, index, field) => {
    setExtraCharges((prev) =>
      prev.map((el) => {
        if (el.index !== index) {
          return el;
        }

        el[field] = value;
        return el;
      })
    );
  };

  const onSubmit = () => {
    const formValues = {
      extraCharges,
      gstEnabled,
      gstNumber,
      gstPercentage,
    };

    dispatch(updateManageCharges(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="md" open={open}>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <DialogTitle>Manage charges</DialogTitle>
          <Stack sx={{ mr: 4 }} direction="row" alignItems="center">
            <LoadingButton
              loading={isUpdatingManageCharges}
              onClick={() => {
                onSubmit();
              }}
              variant="contained"
              className="me-4"
            >
              Save
            </LoadingButton>
            <Button onClick={handleClose} variant="outlined">
              Close
            </Button>
          </Stack>
        </div>
        <Grid className="px-4 pt-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }} className="mb-4">
              <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                <Typography variant="h8" className="mb-3">
                  GST
                </Typography>

                <FormControlLabel
                  control={
                    <IOSSwitch
                      checked={gstEnabled}
                      onChange={(e, value) => {
                        setGSTEnabled(value);
                      }}
                    />
                  }
                  label=""
                />
              </div>
              {gstEnabled && (
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
                    helperText="You can update GSTIN from your store Profile"
                    type="text"
                    name="gstNumber"
                    label="GSTIN Number"
                    fullWidth
                    value={gstNumber}
                    onChange={(e) => {
                      setGSTNumber(e.target.value);
                    }}
                  />

                  <TextField
                    type="number"
                    name="gstPercentage"
                    label="GST Percentage"
                    fullWidth
                    value={gstPercentage}
                    onChange={(e) => {
                      setGSTPercentage(e.target.value);
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <PercentRoundedIcon style={{ fontSize: '20px' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              )}
            </Card>
            <Card sx={{ p: 3 }} className="mb-4">
              <div variant="h8" className="mb-3">
                <Typography>Extra charges</Typography>
              </div>

              {extraCharges.map((el, index) => (
                <div key={el.index} className="mb-3">
                  <FormControl className="mb-3" component="fieldset">
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel
                        value="Percentage"
                        label={'Percentage'}
                        control={
                          <Radio
                            checked={el.type === 'percentage' || el.type === 'Percentage'}
                            onClick={() => {
                              updateChargeRow('Percentage', el.index, 'type');
                            }}
                          />
                        }
                      />
                      <FormControlLabel
                        value="Flat"
                        label="Flat"
                        control={
                          <Radio
                            checked={el.type === 'flat' || el.type === 'Flat'}
                            onClick={() => {
                              updateChargeRow('Flat', el.index, 'type');
                            }}
                          />
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: '2fr 1fr' },
                    }}
                  >
                    <TextField
                      type="text"
                      name="chargeName"
                      label="Charge Name"
                      fullWidth
                      value={el.name}
                      onChange={(e) => {
                        updateChargeRow(e.target.value, el.index, 'name');
                      }}
                    />

                    {el.type === 'Flat' && (
                      <TextField
                        type="number"
                        name="chargeAmount"
                        label="Charge Amount"
                        fullWidth
                        value={el.charge}
                        onChange={(e) => {
                          updateChargeRow(e.target.value, el.index, 'charge');
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment>
                              <CurrencyRupeeRoundedIcon style={{ fontSize: '20px' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}

                    {el.type === 'Percentage' && (
                      <TextField
                        type="number"
                        name="chargePercentage"
                        label="Charge Percentage"
                        fullWidth
                        value={el.percentage}
                        onChange={(e) => {
                          updateChargeRow(e.target.value, el.index, 'percentage');
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <PercentRoundedIcon style={{ fontSize: '20px' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Box>
                  <div className="d-flex flex-row align-items-center justify-content-end mt-3">
                    <Button
                      onClick={() => {
                        deleteChargeRow(el.index);
                      }}
                      color="error"
                      size="small"
                    >
                      Remove
                    </Button>
                  </div>
                  <Divider />
                </div>
              ))}

              <div className="d-flex flex-row align-items-center justify-content-center">
                <Button
                  onClick={() => {
                    addChargeRow();
                  }}
                  variant="outlined"
                >
                  Add charges
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default ManageCharges;
