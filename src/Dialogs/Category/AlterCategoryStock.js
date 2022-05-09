/* eslint-disable react/prop-types */
/* eslint-disable prefer-destructuring */
import '../../index.css';
import { Typography, Button, Dialog, DialogActions, DialogTitle, Card, Stack, Box } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import { updateCategoryStock } from '../../actions';

const AlterCategoryStock = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Please select your action</DialogTitle>
        <Box sx={{ px: 4, py: 3 }}>
          <Card
            onClick={() => {
              dispatch(updateCategoryStock(id, { outOfStock: true, hidden: true }, handleClose));
            }}
            className="clickable"
            sx={{ mb: 3, p: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={3}>
              <VisibilityOffRoundedIcon style={{ fontSize: '30px' }} />
              <Stack direction={'column'} spacing={1}>
                <Typography variant="subtitle1">Hide</Typography>
                <Typography variant="caption">This will hide this category from store.</Typography>
              </Stack>
            </Stack>
          </Card>
          <Card
            onClick={() => {
              dispatch(updateCategoryStock(id, { outOfStock: true }, handleClose));
            }}
            className="clickable"
            sx={{ p: 2 }}
          >
            <Stack direction="row" alignItems="center" spacing={3}>
              <BlockRoundedIcon style={{ fontSize: '30px' }} />
              <Stack direction={'column'} spacing={1}>
                <Typography variant="subtitle1">Mark as out of stock</Typography>
                <Typography variant="caption">This category will still be shown but marked as out of stock.</Typography>
              </Stack>
            </Stack>
          </Card>
        </Box>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AlterCategoryStock;
