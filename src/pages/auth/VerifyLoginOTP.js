/* eslint-disable react-hooks/exhaustive-deps */
import { useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// layouts
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { showSnackbar, resendMobileOTPForLogin, resetVerifyEmailViaOTP } from '../../actions';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyLoginCodeForm } from '../../sections/auth/verify-code';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetVerifyEmailViaOTP());
  }, []);

  const { isReSendingOTP } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const mobile = searchParams.get('mob');
  const ref = searchParams.get('ref');

  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            <Button
              size="small"
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
              sx={{ mb: 3 }}
              onClick={() => {
                window.location.href = ref;
              }}
            >
              Back
            </Button>

            <Typography variant="h3" paragraph>
              Please check your mobile!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              We have sent you a 6-digit confirmation code to {mobile}, please enter the code in below box to verify your
              mobile.
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyLoginCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              {!isReSendingOTP ? (
                <Link
                  className="hoverable"
                  variant="subtitle2"
                  underline="none"
                  onClick={() => {
                    if (!mobile) {
                      dispatch(showSnackbar('error', 'Bad request'));
                      return;
                    }
                    dispatch(resendMobileOTPForLogin(mobile));
                  }}
                >
                  <a href="#" style={{ textDecoration: 'none' }}>
                    Resend code
                  </a>
                </Link>
              ) : (
                <div className="spinner-border text-success" role="status">
                  {/*  */}
                </div>
              )}
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
