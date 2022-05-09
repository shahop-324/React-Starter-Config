import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomPhoneNumber from '../../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

import { updateCustomer } from '../../actions';

// eslint-disable-next-line react/prop-types
const EditCustomer = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const { isUpdating, customers } = useSelector((state) => state.customer);

  const customer = customers.find((el) => el._id === id);

  const [phone, setPhone] = useState(customer.phone);
  const [customerName, setCustomerName] = useState(customer.name);
  const [customerCity, setCustomerCity] = useState(customer.city);
  const [pincode, setPincode] = useState(customer.pincode);
  const [email, setEmail] = useState(customer.email);

  const onSubmit = () => {
    const formValues = {
      name: customerName,
      phone,
      email,
      city: customerCity,
      pincode,
    };
    dispatch(updateCustomer(formValues, id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Update customer</DialogTitle>
        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  name="customerName"
                  label="Customer Name"
                  fullWidth
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                  }}
                />
                <TextField
                  name="customerCity"
                  label="Customer City"
                  fullWidth
                  value={customerCity}
                  onChange={(e) => {
                    setCustomerCity(e.target.value);
                  }}
                />
                <TextField
                  name="pincode"
                  label="Pincode"
                  fullWidth
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                />
                <TextField
                  name="email"
                  label="Customer Email"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <PhoneInput
                  name="phoneNumber"
                  placeholder="Customer phone number"
                  value={phone}
                  onChange={setPhone}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end mt-4">
                <LoadingButton
                  onClick={() => {
                    onSubmit();
                  }}
                  type="submit"
                  variant="contained"
                  loading={isUpdating}
                >
                  Update customer
                </LoadingButton>
                <Button
                  className="ms-3"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default EditCustomer;
