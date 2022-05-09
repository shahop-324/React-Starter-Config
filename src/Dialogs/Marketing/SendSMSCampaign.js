/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Slide,
  Card,
  Box,
  Typography,
  Stack,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendSMSCampaign } from '../../actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SendSMSCampaign = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { campaigns } = useSelector((state) => state.marketing);

  const { store } = useSelector((state) => state.store);

  const campaign = campaigns.find((el) => el._id === id);

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
        <DialogTitle>{'Send SMS Campaign'}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '600px' }}>
            <Card sx={{ p: 4, mt: 3 }}>
              {/* Campaign Name */}
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Campaign Name</Typography>
                <Typography variant="body2">{campaign.name}</Typography>
              </Stack>
              <Divider variant="dashed" sx={{ my: 2 }} />
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Number of customer</Typography>
                <Typography variant="body2">{campaign.customers.length}</Typography>
              </Stack>
              {/* No. of customers */}
              <Divider variant="dashed" sx={{ my: 2 }} />
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Total Amount</Typography>
                <Typography variant="body2">{`${campaign.customers.length} * 1.50 =  Rs.${(
                  campaign.customers.length * 1.5
                ).toFixed(2)}`}</Typography>
              </Stack>
              <Divider variant="dashed" sx={{ my: 2 }} />
              {/* Total Payable amount */}
              {/* Total available amount in wallet */}
            </Card>
            <Card sx={{ p: 4, mt: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle2">Total Wallet Balance</Typography>
                <Typography variant="body2">Rs.{(store.walletAmount * 1).toFixed(2)}</Typography>
              </Stack>
            </Card>
            {(campaign.customers.length * 1.5).toFixed(2) >= (store.walletAmount * 1).toFixed(2) && (
              <Card sx={{ p: 4, mt: 3, color: '#A11717', fontWeight: '600' }}>
                Please add Rs.
                {((campaign.customers.length * 1.5).toFixed(2) - (store.walletAmount * 1).toFixed(2)).toFixed(2)} to
                send this campaign.
              </Card>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            disabled={(campaign.customers.length * 1.5).toFixed(2) >= (store.walletAmount * 1).toFixed(2)}
            variant="contained"
            onClick={() => {
              dispatch(sendSMSCampaign(id, handleClose));
            }}
          >
            Launch Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SendSMSCampaign;
