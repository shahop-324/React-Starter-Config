/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Avatar, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleSubCategories } from '../../actions';

const BulkDeleteSubCategory = ({ open, handleClose, selected, setSelected }) => {
  const dispatch = useDispatch();

  const { subCategories, isDeleting } = useSelector((state) => state.category);

  const selectedSubCategories = subCategories?.filter((el) => selected.includes(el._id));

  const onSubmit = () => {
    dispatch(deleteMultipleSubCategories(selected, handleClose));
    setSelected([]);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete category</DialogTitle>

        <Typography className="px-4 my-2">Are you sure you want to delete these sub categories?</Typography>
        <Typography className="px-4 mt-2 mb-3" variant="caption">Note: All of the products in these sub categories will also be deleted.</Typography>

        {selectedSubCategories?.map((el, index) => (
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

export default BulkDeleteSubCategory;
