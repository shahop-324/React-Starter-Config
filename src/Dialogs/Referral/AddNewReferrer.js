import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// @mui
// Phone Input
import { addNewReferrer } from '../../actions';

// eslint-disable-next-line react/prop-types
const AddNewReferrer = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { isCreating } = useSelector((state) => state.referral);

  const indianPhoneNumber = /^((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/;

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      commission: 10,
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      phone: Yup.string().matches(indianPhoneNumber, 'Phone number is not valid').required('Phone Number is required'),
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
      commission: Yup.number().min(1, 'Minimum Commission can be 1%').required('Commision is required'),
    }),
    onSubmit: (values) => {
      dispatch(addNewReferrer(values, handleClose));
    },
  });

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Referrer</DialogTitle>
        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    error={!!formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    value={formik.values.commission}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Commission"
                    variant="outlined"
                    name="commission"
                    error={!!formik.touched.commission && !!formik.errors.commission}
                    helperText={formik.touched.commission && formik.errors.commission}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <PercentRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Email"
                    variant="outlined"
                    name="email"
                    error={!!formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    label="Phone"
                    variant="outlined"
                    name="phone"
                    error={!!formik.touched.phone && !!formik.errors.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Box>
                <div className="d-flex flex-row align-items-center justify-content-end  mt-4">
                  <LoadingButton disabled={!formik.isValid} type="submit" variant="contained" loading={isCreating}>
                    Create Referrer
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
            </form>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddNewReferrer;
