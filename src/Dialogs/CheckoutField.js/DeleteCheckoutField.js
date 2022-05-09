/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../actions';

const DeleteCheckoutField = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { store, isDeletingCheckoutField } = useSelector((state) => state.store);

  const formField = store.formFields.find((el) => el._id === id);

  const onSubmit = () => {
    dispatch(deleteProduct(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete Form Field</DialogTitle>

        <Typography className='px-4 mt-2'>Are you sure you want to delete {formField.fieldName}?</Typography>

        <DialogActions>
          <LoadingButton
            color={'error'}
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            variant="contained"
            loading={isDeletingCheckoutField}
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

export default DeleteCheckoutField;