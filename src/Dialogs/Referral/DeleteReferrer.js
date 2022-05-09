/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReferrer } from '../../actions';

const DeleteReferrer = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { referrals, isDeleting } = useSelector((state) => state.referral);

  const referral = referrals.find((el) => el._id === id);

  let name;

  if (referral) {
    name = referral.name;
  }

  const onSubmit = () => {
    dispatch(deleteReferrer(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Referrer</DialogTitle>
        <Typography className="px-4 mt-2">Are you sure you want to delete {name}?</Typography>
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

export default DeleteReferrer;