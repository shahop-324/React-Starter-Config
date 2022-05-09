/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleReferrers } from '../../actions';

const BulkDeleteReferrers = ({ open, handleClose, selected, setSelected }) => {
  const dispatch = useDispatch();

  const { referrals, isDeleting } = useSelector((state) => state.referral);

  const selectedReferrers = referrals.filter((el) => selected.includes(el._id));

  const onSubmit = () => {
    dispatch(deleteMultipleReferrers(selected, handleClose));
    setSelected([]);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Referrers</DialogTitle>

        <Typography className="px-4 my-2">Are you sure you want to delete these Referrers?</Typography>

        {selectedReferrers.map((el, index) => (
          <Stack sx={{ px: 4, my: 2 }} key={el._id} direction="row" alignItems={'center'} spacing={2}>
            <Typography variant="subtitle2">{index + 1}</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              <Typography variant="subtitle1">{el.name}</Typography>
              <Typography variant="subtitle2">({el.phone})</Typography>
            </Stack>
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

export default BulkDeleteReferrers;
