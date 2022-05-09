/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Card,
  Stack,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import WalletPNG from '../../assets/wallet.png';
import RechargeWallet from './RechargeWallet';
import { WalletDetails } from '../../sections/@dashboard/general/booking';
import { fetchWalletTransactions } from '../../actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const QwikWallet = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);

  const [openRecharge, setOpenRecharge] = useState(false);

  const handleCloseRecharge = () => {
    setOpenRecharge(false);
  };

  useEffect(() => {
    dispatch(fetchWalletTransactions());
  }, []);

  return (
    <>
      <Dialog
        maxWidth="lg"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'QwikWallet'}</DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3, width: { xs: '400px', md: '600px', lg: '900px' } }}>
            <Card sx={{ p: 4 }}>
              <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                <img src={WalletPNG} alt="QwikWallet" style={{ width: '150px', height: '150px' }} />
                <Stack direction="column" alignItems={'center'}>
                  <Stack sx={{ mb: 2 }} direction="column" alignItems={'center'} spacing={2}>
                    <Typography variant="h6">Balance</Typography>
                    <Typography variant="h3">Rs. {store.walletAmount.toFixed(1)}</Typography>
                  </Stack>

                  <Button
                    onClick={() => {
                      setOpenRecharge(true);
                    }}
                    variant="contained"
                    size="large"
                  >
                    Recharge
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Box>
          <WalletDetails />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {openRecharge && <RechargeWallet open={openRecharge} handleClose={handleCloseRecharge} />}
    </>
  );
};

export default QwikWallet;
