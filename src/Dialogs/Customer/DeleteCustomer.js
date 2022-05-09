/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer } from '../../actions';

const DeleteCustomer = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { isDeleting, customers } = useSelector((state) => state.customer);

  const customer = customers.find((el) => el._id === id);

  const onSubmit = () => {
    dispatch(deleteCustomer(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Customer</DialogTitle>

        <Typography className="px-4 my-3">Are you sure you want to delete this Customer?</Typography>
        <Stack sx={{ px: 3 }}>
          <Typography variant="subtitle2">{`${customer?.name} ${customer?.phone}`}</Typography>
        </Stack>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isDeleting}
          >
            Delete
          </LoadingButton>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteCustomer;
