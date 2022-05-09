/* eslint-disable react/prop-types */
import LocalShippingRounded from '@mui/icons-material/LocalShippingRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Typography, Card, Button, Stack, Dialog, Slide, Box, Portal } from '@mui/material';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignShiprocket } from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ConfirmCarrier = ({ open, handleClose, id, pickupPoint }) => {
  const dispatch = useDispatch();

  console.log(pickupPoint);

  const { shipments } = useSelector((state) => state.shipment);

  const { store } = useSelector((state) => state.store);

  const shipment = shipments.find((el) => el._id === id);

  const onConfirm = () => {
    dispatch(assignShiprocket(pickupPoint, id, handleClose)); // We will send pickup point id and shipment Id to the api for booking
  };

  return (
    <>
      <Portal>
        <Dialog
          width="600px"
          maxWidth={'lg'}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <Box sx={{ p: 4, width: '600px' }}>
            <Typography variant="subtitle2">NOTE:</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Please make sure you have selected right courier service, it cannot be changed once confirmed.
            </Typography>
            <Card sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2">
                Rs. {shipment.order.deliveryCharge} /- Will be charged and deducted from your QwikShop Wallet towards
                this shippment
              </Typography>
            </Card>

            {shipment.order.deliveryCharge > store.walletAmount && (
              <Card sx={{ p: 3, color: '#0F947E', mb: 2, fontWeight: '500' }}>
                Your current Wallet Balance is{' '}
                <span style={{ fontWeight: '900' }}>Rs. {store.walletAmount.toFixed(1)}</span>
              </Card>
            )}

            {shipment.order.deliveryCharge > store.walletAmount && (
              <Card sx={{ p: 3, color: '#CF1919', mb: 2, fontWeight: '500' }}>
                Please Recharge your wallet with{' '}
                <span style={{ fontWeight: '900' }}>
                  Rs. {Math.ceil(shipment.order.deliveryCharge - store.walletAmount).toFixed(1)}
                </span>{' '}
                /- to book this shipment.
              </Card>
            )}
            <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
              <Button
                onClick={() => {
                  onConfirm();
                }}
                disabled={shipment.order.deliveryCharge > store.walletAmount}
                variant="contained"
                color="primary"
                startIcon={<LocalShippingRounded />}
              >
                Ship Via Shiprocket
              </Button>
              <Button onClick={handleClose} variant="outlined" startIcon={<CloseRoundedIcon />}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Dialog>
      </Portal>
    </>
  );
};

export default ConfirmCarrier;
