import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button, Typography } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { LoadingButton } from '@mui/lab';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

import { sendSMSToCustomer } from '../../actions';

// eslint-disable-next-line react/prop-types
const SMSCustomer = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const { isSendingSMS, customers } = useSelector((state) => state.customer);

  const customer = customers.find((el) => el._id === id);

  const [message, setMessage] = useState();

  const onSubmit = () => {
    dispatch(sendSMSToCustomer({ message, id }, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>SMS your customer</DialogTitle>

        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography sx={{ mb: 3 }} variant="subtitle2">
                {customer.name} ({customer.phone})
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  name="message"
                  label="Message"
                  helperText="You can include links in your message."
                  fullWidth
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end mt-4">
                <LoadingButton
                  startIcon={<SendRoundedIcon />}
                  onClick={() => {
                    onSubmit();
                  }}
                  type="submit"
                  variant="contained"
                  loading={isSendingSMS}
                >
                  Send SMS
                </LoadingButton>
                <Button
                  className="ms-3"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default SMSCustomer;
