/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePickupPoint } from '../../actions';

const DeletePickupPoint = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { pickupPoints, isDeletingPickupPoint } = useSelector((state) => state.delivery);

  const pickupPoint = pickupPoints.find((el) => el._id === id);

  let name;
 

  if(pickupPoint) {
    name = pickupPoint.pickupPointName;
  }
   
  const onSubmit = () => {
    dispatch(deletePickupPoint(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete pickup point</DialogTitle>

        <Typography className='px-4 mt-2'>Are you sure you want to delete {name}?</Typography>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isDeletingPickupPoint}
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

export default DeletePickupPoint;
