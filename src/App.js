/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
// routes
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { snackbarActions } from './reducers/snackbarSlice';
import Router from './routes';
// theme
import ThemeProvider from './theme';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

import 'react-toastify/dist/ReactToastify.css';

const vertical = 'top';
const horizontal = 'center';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { severity, message, open } = useSelector((state) => state.snackbar);
  const { toggle } = useSelector((state) => state.notification);

  useEffect(() => {
    // toast(toastMessage);
  }, [toggle]);

  return (
    <>
      <ThemeProvider>
        <ThemeColorPresets>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <MotionLazyContainer>
                  <ProgressBarStyle />
                  <ChartStyle />
                  {/* <Settings /> */}
                  <ScrollToTop />
                  <Router />
                </MotionLazyContainer>
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemeColorPresets>
      </ThemeProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            
            dispatch(snackbarActions.closeSnackBar());
          }}
        >
          <Alert
            onClose={() => {
              
              dispatch(snackbarActions.closeSnackBar());
            }}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  );
}
