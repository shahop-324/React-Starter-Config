/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import * as Yup from 'yup';
// @mui
// @mui
import { useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams } from 'react-router-dom';
import { forgotPassword, resetIsSubmittingForgotPassword } from '../../../actions';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
};

export default function ResetPasswordForm({ onSent }) {
  const { isSubmittingForgotPassword } = useSelector((state) => state.auth);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIsSubmittingForgotPassword());
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    }),
    onSubmit: (values) => {
       console.log(values)
      setSearchParams(`email=${values.email}`);
      dispatch(forgotPassword(values, onSent));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={!!formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />

        <LoadingButton  disabled={!(formik.isValid)} fullWidth size="large" type="submit" variant="contained" loading={isSubmittingForgotPassword}>
          Reset Password
        </LoadingButton>
      </Stack>
    </form>
  );
}
