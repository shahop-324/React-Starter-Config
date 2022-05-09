/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Autocomplete, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CustomPhoneNumber from '../forms/PhoneNumber';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';
import { addStaffMember } from '../actions';

const AddStaffMember = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { isCreatingStaff } = useSelector((state) => state.store);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [permissionList, setPermissionList] = useState([]);

  const [nameError, setNameError] = useState({ error: false, message: 'Name is required' });
  const [emailError, setEmailError] = useState({ error: false, message: 'Email is required' });
  const [phoneError, setPhoneError] = useState({ error: false, message: 'Phone number is required' });
  const [permissionError, setPermissionError] = useState({
    error: false,
    message: 'Atleast one permission is required',
  });

  const onSubmit = () => {
    const formValues = {
      name,
      email,
      phone,
      permissions: permissionList.map((el) => el.label),
    };

    dispatch(addStaffMember(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Staff Member</DialogTitle>
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
                  required
                  error={nameError.error}
                  helperText={nameError.error ? nameError.message : ''}
                  name="staffName"
                  label="Staff Name"
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setNameError((prev) => {
                        prev.error = true;
                        return prev;
                      });
                    } else {
                      setNameError((prev) => {
                        prev.error = false;
                        return prev;
                      });
                    }

                    setName(e.target.value);
                  }}
                />
                <TextField
                  required
                  error={emailError.error}
                  helperText={emailError.error ? emailError.message : ''}
                  name="email"
                  label="Staff Email"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setEmailError((prev) => {
                        prev.error = true;
                        return prev;
                      });
                    } else {
                      setEmailError((prev) => {
                        prev.error = false;
                        return prev;
                      });
                    }

                    setEmail(e.target.value);
                  }}
                />
                <PhoneInput
                  required
                  error={phoneError.error}
                  helperText={phoneError.error ? phoneError.message : ''}
                  name="phoneNumber"
                  placeholder="Staff phone number"
                  value={phone}
                  onChange={(value) => {
                    if (!value) {
                      setPhoneError((prev) => {
                        prev.error = true;
                        return prev;
                      });
                    } else {
                      setPhoneError((prev) => {
                        prev.error = false;
                        return prev;
                      });
                    }
                    setPhone(value);
                  }}
                  inputComponent={CustomPhoneNumber}
                  defaultCountry="IN"
                />
                <Autocomplete
                  multiple
                  required
                  value={permissionList}
                  onChange={(e, value) => {
                    if (value.length === 0) {
                      setPermissionError((prev) => {
                        prev.error = true;
                        return prev;
                      });
                    } else {
                      setPermissionError((prev) => {
                        prev.error = false;
                        return prev;
                      });
                    }
                    setPermissionList(value);
                  }}
                  id=""
                  fullWidth
                  options={permissions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      required
                      error={permissionError.error}
                      helperText={permissionError.error ? permissionError.message : ''}
                      {...params}
                      label="Permissions"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                <LoadingButton
                  onClick={() => {
                    onSubmit();
                  }}
                  type="submit"
                  variant="contained"
                  loading={isCreatingStaff}
                >
                  Add Member
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

export default AddStaffMember;

const permissions = [
  { label: 'Order' },
  { label: 'Catalouge' },
  { label: 'Delivery' },
  { label: 'Customer' },
  { label: 'Dining' },
  { label: 'Marketing' },
  { label: 'Payment' },
  { label: 'Discount' },
  { label: 'Manage' },
  { label: 'Design' },
  { label: 'Integration' },
];
