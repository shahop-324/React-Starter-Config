/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Chip, Stack, Dialog, DialogContent, DialogTitle, Slide, Button, TextField, Card, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackbar } from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const RechargeWallet = ({ open, handleClose }) => {
  const [amount, setAmount] = useState();

  const { token } = useSelector((state) => state.auth);
  const { store } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.user);

  const BaseURL = 'https://api.app.qwikshop.online/v1/';
  // const BaseURL = 'http://localhost:8000/v1/'

  const dispatch = useDispatch();

  const displayRazorpay = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      let order = await fetch(`${BaseURL}razorpay/createWalletOrder`, {
        method: 'POST',

        // Send body here
        body: JSON.stringify({
          amount,
          type: 'wallet-recharge',
        }),

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!order.ok) {
        if (!order.message) {
          throw new Error('Something went wrong');
        } else {
          throw new Error(order.message);
        }
      }

      order = await order.json();
      console.log(order);

      const options = {
        key: 'rzp_live_5hAz4ZdZOwNSkW',
        amount: order.data.amount,
        currency: 'INR',
        name: store.storeName,
        description: `Wallet Recharge`,
        image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${store.logo}`,
        order_id: order.data.id,
        handler() {
          dispatch(showSnackbar('success', 'Your wallet recharge has been successfully processed!'));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          contact: user.phone,
          email: user.email,
        },
        notes: {
          // We can add some notes here
          type: 'wallet-recharge',
          storeId: store._id,
          userId: user._id,
          amount,
        },
        theme: {
          color: '#538BF7',
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
      paymentObject.on('payment.failed', () => {
        console.log('Payment failed');
        dispatch(
          showSnackbar(
            'error',
            'Failed to process recharge, If money is deducted, it will be refunded back to you soon.'
          )
        );
      });
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar('error', 'Failed to process recharge, If money is deducted, it will be refunded back to you soon.')
      );
    }
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });

  return (
    <>
      <Dialog
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ mb: 2 }}>{'Recharge Wallet'}</DialogTitle>

        <DialogContent>
          <Box sx={{ width: '500px' }}>
            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Chip
                onClick={() => {
                  setAmount(100);
                }}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.100'}
                variant="outlined"
                color="primary"
              />
              <Chip
                onClick={() => {
                  setAmount(300);
                }}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.300'}
                variant="outlined"
                color="primary"
              />
              <Chip
                onClick={() => {
                  setAmount(500);
                }}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.500'}
                variant="outlined"
                color="primary"
              />
              <Chip
                onClick={() => {
                  setAmount(1000);
                }}
                icon={<AddIcon style={{ fontSize: '20px' }} />}
                label={'Rs.1000'}
                variant="outlined"
                color="primary"
              />
            </Stack>

            <Card sx={{ p: 3, my: 2 }}>
              <TextField
                type="number"
                name="rechargeAmount"
                label="Recharge Amount"
                fullWidth
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </Card>

            <Button
              disabled={!(amount * 1 > 1)}
              onClick={() => {
                displayRazorpay();
              }}
              fullWidth
              startIcon={<CurrencyRupeeIcon />}
              variant="outlined"
              size="large"
              color="primary"
            >
              Add Money
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RechargeWallet;
