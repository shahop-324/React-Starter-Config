/* eslint-disable react/prop-types */
import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
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
  
  Divider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ReferralDetails } from '../../sections/@dashboard/general/booking';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const UserReferral = ({ open, handleClose }) => {
 
  const {user} = useSelector((state) => state.user);

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
        <DialogTitle sx={{ mb: 2 }}>{'My Referrals'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3, width: { xs: '400px', md: '600px', lg: '900px' } }}>
            <Card sx={{ p: 3 }}>
              <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="subtitle2">Total Accounts Created</Typography>
                <Typography variant="subtitle2">{user?.referredUsers?.length}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" alignItems={'center'} justifyContent="space-between">
                <Typography variant="subtitle2">Total Accounts Upgraded</Typography>
                <Typography variant="subtitle2">{user?.upgradedByRefUsers?.length}</Typography>
              </Stack>
            </Card>

            <Box sx={{ my: 3, gridAutoFlow: {sx: 'row', md: 'column'}, gridColumn: '1fr 1fr', gridGap: 5, width: '100%', display: 'grid', alignItems: 'center' }} spacing={2}>
              <Button
                disabled
                startIcon={<LockIcon style={{ fontSize: '20px' }} />}
                size={'large'}
                variant="contained"
                fullWidth
              >
                Claim 0.5% Trans. Charge
              </Button>
              <Button
                disabled
                startIcon={<LockIcon style={{ fontSize: '20px' }} />}
                size={'large'}
                variant="contained"
                fullWidth
              >
                Unlock Premium Themes
              </Button>
            </Box>
            <ReferralDetails />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserReferral;
