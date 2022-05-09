/* eslint-disable react/prop-types */
import { useState } from 'react';
import * as Yup from 'yup';

// @mui
import { useFormik } from 'formik';
import { Stack, TextField, IconButton, Button, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import PhoneInput from 'react-phone-number-input';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// form
import { useDispatch, useSelector } from 'react-redux';

// Phone Input
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import Iconify from '../../../components/Iconify';
// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

import { register, registerViaMobile } from '../../../actions';

import CustomPhoneNumber from '../../../forms/PhoneNumber';
import 'react-phone-number-input/style.css';
import RegisterViaGoogle from '../../../pages/auth/RegisterViaGoogle';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      shopName: '',
      email: '',
      password: '',
      referralCode: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('First name is required'),
      shopName: Yup.string().required('Shop name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      referralCode: Yup.string(),
    }),
    onSubmit: (values) => {
      const currentLocation = window.location.href;
      console.log(values);
      dispatch(register(values, values.email, currentLocation));
    },
  });


  const dispatch = useDispatch();
  const { isSubmittingRegister } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [registerVia, setRegisterVia] = useState('mobile');

  const [phone, setPhone] = useState();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            label="First name"
            variant="outlined"
            name="firstName"
            error={!!formik.touched.firstName && !!formik.errors.firstName}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            label="Last Name"
            variant="outlined"
            name="lastName"
            error={!!formik.touched.lastName && !!formik.errors.lastName}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Stack>

        <TextField
          value={formik.values.shopName}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Shop Name"
          variant="outlined"
          name="shopName"
          error={!!formik.touched.shopName && !!formik.errors.shopName}
          helperText={formik.touched.shopName && formik.errors.shopName}
        />

{registerVia === 'mobile' ? ( <Box sx={{ mb: 3 }}>
            <PhoneInput
              name="phoneNumber"
              placeholder="Phone Number"
              value={phone}
              onChange={setPhone}
              inputComponent={CustomPhoneNumber}
              defaultCountry="IN"
            />
          </Box> ) : ( <>
          
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
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Password"
          variant="outlined"
          name="password"
          error={!!formik.touched.password && !!formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
          
          </>  ) }

        

        <TextField
          value={formik.values.referralCode}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          label="Referral Code (Optional)"
          variant="outlined"
          name="referralCode"
          error={!!formik.touched.referralCode && !!formik.errors.referralCode}
          helperText={formik.touched.referralCode && formik.errors.referralCode}
        />

        <LoadingButton
         disabled={registerVia === 'mobile' ? !phone : !(formik.isValid)}
         onClick={() => {
           if(registerVia === 'mobile') {
             dispatch(registerViaMobile({firstName: formik.values.firstName, lastName: formik.values.lastName, shopName: formik.values.shopName,}, phone));
           }
         }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmittingRegister}
        >
          Register
        </LoadingButton>
        <Box sx={{ my: 2 }}>
        <RegisterViaGoogle />
      </Box>
        {registerVia === 'mobile' ? (
        <Button
          onClick={() => {
            setRegisterVia('email');
          }}
          fullWidth
          startIcon={<EmailOutlinedIcon />}
          variant="outlined"
        >
          Register with email
        </Button>
      ) : (
        <Button
          onClick={() => {
            setRegisterVia('mobile');
          }}
          fullWidth
          startIcon={<LocalPhoneIcon />}
          variant="outlined"
        >
          Register with mobile
        </Button>
      )}
      </Stack>
    </form>
  );
};

export default RegisterForm;
