import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Grid, Dialog, DialogTitle, TextField, Button, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { LoadingButton } from '@mui/lab';
// @mui
// Phone Input
import 'react-phone-number-input/style.css';

import { addCoinsToCustomer } from '../../actions';

// eslint-disable-next-line react/prop-types
const AddCoins = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();
  const { isAddingCoins, customers } = useSelector((state) => state.customer);

  const customer = customers.find((el) => el._id === id);

  const [coins, setCoins] = useState();

  const onSubmit = () => {
    dispatch(addCoinsToCustomer({ coins, id }, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Add Coins</DialogTitle>

        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Typography sx={{ mb: 3 }} variant="subtitle2">
                {customer.name} ({customer.phone})
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                  name="numberOfCoins"
                  label="Number of coins"
                  helperText="Please enter the number of coins you want to add."
                  fullWidth
                  value={coins}
                  onChange={(e) => {
                    setCoins(e.target.value);
                  }}
                />
              </Box>
              <div className="d-flex flex-row align-items-center justify-content-end mt-4">
                <LoadingButton
                  startIcon={<CurrencyRupeeIcon />}
                  onClick={() => {
                    onSubmit();
                  }}
                  type="submit"
                  variant="contained"
                  loading={isAddingCoins}
                >
                  Add coins
                </LoadingButton>
                <Button
                  className="ms-3"
                  size="small"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default AddCoins;
