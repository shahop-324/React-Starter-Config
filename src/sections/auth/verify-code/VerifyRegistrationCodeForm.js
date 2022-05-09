// @mui
import { Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { verifyRegistrationOTP } from '../../../actions';

// ----------------------------------------------------------------------

export default function VerifyCodeForm() {
  const dispatch = useDispatch();

  const [isValid, setIsValid] = useState(false);

  const { isSubmittingVerify } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const [otp, setOtp] = useState();

  const mobile = searchParams.get('mob');

  const onSubmit = async () => {
    dispatch(verifyRegistrationOTP(mobile, otp));
  };

  const handleOTPChange = (otp) => {
    setOtp(otp);
    if (otp.length === 6) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        <OtpInput
          value={otp}
          onChange={handleOTPChange}
          numInputs={6}
          separator={<span>-</span>}
          inputStyle={{
            width: '2.8rem',
            height: '3rem',
            margin: '1rem 1rem',
            fontSize: '2rem',
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
          }}
        />
      </Stack>

      <LoadingButton
        onClick={() => {
          onSubmit();
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmittingVerify}
        disabled={!isValid}
        sx={{ mt: 3 }}
      >
        Verify
      </LoadingButton>
    </Box>
  );
}
