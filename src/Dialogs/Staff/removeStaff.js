/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeStaffMember } from '../../actions';

const RemoveStaff = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { store, isDeletingStaff } = useSelector((state) => state.store);

  const member = store.team.find((el) => el.email === id);

  const onSubmit = () => {
    dispatch(removeStaffMember(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Remove Staff Member</DialogTitle>

        <Typography className="px-4 mt-2">Are you sure you want to remove {member?.name} from your staff?</Typography>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isDeletingStaff}
          >
            Remove
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

export default RemoveStaff;
