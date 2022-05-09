/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultiplePickupPoint } from '../../actions';

const BulkDeletePickupPoint = ({ open, handleClose, selected, setSelected }) => {
  const dispatch = useDispatch();

  const { pickupPoints, isDeletingPickupPoint } = useSelector((state) => state.delivery);

  const selectedPickupPoints = pickupPoints.filter((el) => selected.includes(el._id));

  const onSubmit = () => {
    dispatch(deleteMultiplePickupPoint(selected, handleClose));
    setSelected([]);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Pickup Points</DialogTitle>

        <Typography className="px-4 my-2">Are you sure you want to delete these pickup points?</Typography>
        <Typography className="px-4 mt-2 mb-3" variant="caption">Note: All of the shipments assigned to them cannot be changed (if any).</Typography>

        {selectedPickupPoints.map((el, index) => (
          <Stack sx={{px: 4, my: 2,}} key={el._id} direction="row" alignItems={'center'} spacing={2}>
            <Typography variant="subtitle2">{index + 1}</Typography>
           
            <Typography variant="subtitle1">{el.pickupPointName}</Typography>
          </Stack>
        ))}

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

export default BulkDeletePickupPoint;
