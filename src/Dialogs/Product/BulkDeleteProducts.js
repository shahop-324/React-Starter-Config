/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import { Typography, Button, Dialog, DialogActions, DialogTitle, Avatar, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMultipleProducts } from '../../actions';

const BulkDeleteProducts = ({ open, handleClose, selected, setSelected }) => {
  const dispatch = useDispatch();

  const { products, isDeleting } = useSelector((state) => state.product);

  const selectedProducts = products.filter((el) => selected.includes(el._id));

  const onSubmit = () => {
    dispatch(deleteMultipleProducts(selected, handleClose));
    setSelected([]);
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Delete products</DialogTitle>

        <Typography className="px-4 my-2">Are you sure you want to delete these products?</Typography>

        {selectedProducts.map((el, index) => (
          <Stack sx={{ px: 4, my: 2 }} key={el._id} direction="row" alignItems={'center'} spacing={2}>
            <Typography variant="subtitle2">{index + 1}</Typography>
            <Avatar src={`https://qwikshop.s3.ap-south-1.amazonaws.com/${el.images[0]}`} alt={''} />
            <Typography variant="subtitle1">{el.productName}</Typography>
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

export default BulkDeleteProducts;
