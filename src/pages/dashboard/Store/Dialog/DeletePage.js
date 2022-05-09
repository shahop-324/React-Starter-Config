/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStorePage } from '../../../../actions';

const DeletePage = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { pages, isDeleting } = useSelector((state) => state.page);

  const page = pages.find((el) => el._id === id);

  const onSubmit = () => {
    dispatch(deleteStorePage(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Page</DialogTitle>

        <Typography className="px-4 mt-2">Are you sure you want to delete {page?.name}?</Typography>

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

export default DeletePage;