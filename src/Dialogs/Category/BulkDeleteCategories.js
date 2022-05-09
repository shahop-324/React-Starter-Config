/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Avatar, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleCategories } from '../../actions';

const BulkDeleteCategory = ({ open, handleClose, selected, setSelected }) => {
  const dispatch = useDispatch();

  const { categories, isDeleting } = useSelector((state) => state.category);

  const selectedCategories = categories.filter((el) => selected.includes(el._id));

  const onSubmit = () => {
    dispatch(deleteMultipleCategories(selected, handleClose));
    setSelected([]);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete category</DialogTitle>

        <Typography className="px-4 my-2">Are you sure you want to delete these categories?</Typography>
        <Typography className="px-4 mt-2 mb-3" variant="caption">Note: All of the products in these categories will also be deleted.</Typography>

        {selectedCategories.map((el, index) => (
          <Stack sx={{px: 4, my: 2,}} key={el._id} direction="row" alignItems={'center'} spacing={2}>
            <Typography variant="subtitle2">{index + 1}</Typography>
            <Avatar src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el.image}`} alt={''} />
            <Typography variant="subtitle1">{el.name}</Typography>
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

export default BulkDeleteCategory;