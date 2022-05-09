/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '../../actions';

const DeleteCategory = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { categories, isDeleting } = useSelector((state) => state.category);

  const category = categories.find((el) => el._id === id);

  let name;
  

  if(category) {
    name = category.name;
    
  }
   
  const onSubmit = () => {
    dispatch(deleteCategory(id, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete category</DialogTitle>

        <Typography className='px-4 mt-2'>Are you sure you want to delete {name}?</Typography>

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

export default DeleteCategory;