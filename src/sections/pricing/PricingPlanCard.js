/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Button, Typography, Box, Stack } from '@mui/material';
// components
import { useDispatch, useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { createSubscription, showSnackbar } from '../../actions';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
  [theme.breakpoints.up(414)]: {
    padding: theme.spacing(5),
  },
}));

// ----------------------------------------------------------------------

PricingPlanCard.propTypes = {
  index: PropTypes.number,
  card: PropTypes.object,
};

export default function PricingPlanCard({ card, index }) {
  const { cycle, subscription, img, icon, price, caption, lists, labelAction, plan_id } = card;
  const dispatch = useDispatch();

  const { store } = useSelector((state) => state.store);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const onSubmit = (plan_id) => {
    dispatch(createSubscription(plan_id, displayRazorpay));
  };

  const BaseURL = 'https://api.app.qwikshop.online/v1/';
  // const BaseURL = 'http://localhost:8000/v1/';

  const displayRazorpay = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      let order = await fetch(`${BaseURL}razorpay/createQwikShopPremiumOrder`, {
        method: 'POST',

        // Send body here
        body: JSON.stringify({
          plan_id,
          type: 'qwikshop-plan',
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
        description: `QwikShop Premium`,
        image: `https://qwikshop.s3.ap-south-1.amazonaws.com/${store.logo}`,
        order_id: order.data.id,
        handler(response) {
          dispatch(showSnackbar('success', 'QwikShop Plan Purchase is successfully processed!'));
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
          type: 'qwikshop-plan',
          storeId: store._id,
          userId: user._id,
          plan_id,
        },
        theme: {
          color: '#538BF7',
        },
      };
      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
      paymentObject.on('payment.failed', (response) => {
        console.log('Payment failed');
        dispatch(
          showSnackbar(
            'error',
            'Failed to process QwikShop Premium, If money is deducted, it will be refunded back to you soon.'
          )
        );
      });
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar(
          'error',
          'Failed to process QwikShop Premium, If money is deducted, it will be refunded back to you soon.'
        )
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
    <RootStyle>
      {index === 1 && (
        <Label
          color="info"
          sx={{
            top: 16,
            right: 16,
            position: 'absolute',
          }}
        >
          POPULAR
        </Label>
      )}

      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        {subscription}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
        {index !== 0 && (
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Rs.
          </Typography>
        )}

        <Typography variant="h2" sx={{ mx: 1 }}>
          {price === 0 ? 'Free' : price}
        </Typography>

        <Typography
          gutterBottom
          component="span"
          variant="subtitle2"
          sx={{
            alignSelf: 'flex-end',
            color: 'text.secondary',
          }}
        >
          /{cycle}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{
          color: 'primary.main',
          textTransform: 'capitalize',
        }}
      >
        {caption}
      </Typography>

      <Box sx={{ width: 80, height: 80, mt: 3 }}>
        <img alt="Plan" src={img} />
      </Box>

      <Stack component="ul" spacing={2} sx={{ my: 5, width: 1 }}>
        {lists.map((item) => (
          <Stack
            key={item.text}
            component="li"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ typography: 'body2', color: item.isAvailable ? 'text.primary' : 'text.disabled' }}
          >
            <Iconify icon={'eva:checkmark-fill'} sx={{ width: 20, height: 20 }} />
            <Typography variant="body2">{item.text}</Typography>
          </Stack>
        ))}
      </Stack>

      {/* {console.log(Date.now(), new Date(store.currentPlanExpiresAt).getTime())} */}
      <LoadingButton
        disabled={
          store.currentPlan.toString() === subscription.toString() ||
          (subscription === 'Free' && Date.now() < new Date(store.currentPlanExpiresAt).getTime())
        }
        loading={store.isCreatingSubscription}
        onClick={() => {
          displayRazorpay();
        }}
        fullWidth
        size="large"
        variant="contained"
      >
        {console.log(subscription, store.currentPlan)}
        {store.currentPlan.toString() === subscription.toString() ? 'Current Plan' : labelAction}
      </LoadingButton>
    </RootStyle>
  );
}
