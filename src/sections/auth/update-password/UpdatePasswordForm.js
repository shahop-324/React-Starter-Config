/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import * as Yup from 'yup';
// @mui
import { useFormik } from 'formik';
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { resetPassword, resetIsSubmittingResetPassword } from '../../../actions';

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const { isSubmittingResetPassword } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      new_pass: '',
      pass_confirm: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      new_pass: Yup.string()
        .required('Please Enter New password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
        ),
      pass_confirm: Yup.string().required('Please Confirm your new password').oneOf([Yup.ref('new_pass'), null], 'Passwords must match new password'),
    }),
    onSubmit: (values) => {
      dispatch(resetPassword(values, searchParams.get('token')));
    },
  });

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetIsSubmittingResetPassword());
  }, []);

  console.log(searchParams.get('token'));

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="New Password"
          variant="outlined"
          name="new_pass"
          value={formik.values.new_pass}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={!!formik.touched.new_pass && !!formik.errors.new_pass}
          helperText={formik.touched.new_pass && formik.errors.new_pass}
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          variant="outlined"
          name="pass_confirm"
          value={formik.values.pass_confirm}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={!!formik.touched.pass_confirm && !!formik.errors.pass_confirm}
          helperText={formik.touched.pass_confirm && formik.errors.pass_confirm}
        />

        <LoadingButton
          disabled={!(formik.isValid)}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmittingResetPassword}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </form>
  );
}
