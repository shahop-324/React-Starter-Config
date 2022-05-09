/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// @mui
import { useFormik } from 'formik';
import { Stack, TextField, IconButton, InputAdornment, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneInput from 'react-phone-number-input';
import Iconify from '../../../components/Iconify';
import { login, resetLoginFormLoading, loginViaMobile } from '../../../actions';
import GoogleAuth from '../../../pages/auth/GoogleAuth';
import CustomPhoneNumber from '../../../forms/PhoneNumber';
import 'react-phone-number-input/style.css';

// ----------------------------------------------------------------------
// import CustomPhoneNumber from '../../../forms/PhoneNumber';

export default function LoginForm() {
  const [loginVia, setLoginVia] = useState('mobile');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      if (loginVia === 'mobile') {
        alert('Reached here');
        //
        dispatch(loginViaMobile(phone));
      } else {
        dispatch(login(values.email, values.password));
      }
    },
  });

  const [phone, setPhone] = useState('');

  useEffect(() => {
    dispatch(resetLoginFormLoading());
  }, []);

  const dispatch = useDispatch();

  const { isSubmittingLogin } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        {loginVia === 'mobile' ? (
          <Box sx={{ mb: 3 }}>
            <PhoneInput
              name="phoneNumber"
              placeholder="Phone Number"
              value={phone}
              onChange={setPhone}
              inputComponent={CustomPhoneNumber}
              defaultCountry="IN"
            />
          </Box>
        ) : (
          <>
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
              className="mb-4"
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
          </>
        )}
      </Stack>

      <LoadingButton
        disabled={loginVia === 'mobile' ? !phone : !(formik.isValid)}
        onClick={() => {
          if (loginVia === 'mobile') {
           
            dispatch(loginViaMobile(phone));
          }
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmittingLogin}
      >
        Login
      </LoadingButton>

      <Box sx={{ my: 2 }}>
        <GoogleAuth />
      </Box>
      {loginVia === 'mobile' ? (
        <Button
          onClick={() => {
            setLoginVia('email');
          }}
          fullWidth
          startIcon={<EmailOutlinedIcon />}
          variant="outlined"
        >
          Login with email
        </Button>
      ) : (
        <Button
          onClick={() => {
            setLoginVia('mobile');
          }}
          fullWidth
          startIcon={<LocalPhoneIcon />}
          variant="outlined"
        >
          Login with mobile
        </Button>
      )}
    </form>
  );
}
