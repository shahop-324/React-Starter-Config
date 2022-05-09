/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rejectOrder } from '../../actions';

const RejectOrder = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState('');
  const { orders } = useSelector((state) => state.order);

  const order = orders.find((el) => el._id === id);

  const onSubmit = () => {
    dispatch(rejectOrder(id, reason, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Reject Order</DialogTitle>

        <Typography className="px-4 mt-2" variant="body2">Are you sure you want to reject this order {order?.ref}?</Typography>

        <Box sx={{ px: 3, my: 2 }}>
        <TextField
          helperText="You can tell your customer why their order has been rejected so they can correct it."
          name="reason"
          label="Reason for rejection"
          fullWidth
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
          }}
        />
        </Box>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
          >
            Yes, I am sure
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RejectOrder;
