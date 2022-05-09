/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, Grid, TextField, Dialog, DialogTitle, Button, Stack, Autocomplete, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { creatEmailCampaign, showSnackbar } from '../actions';

const CreateEmailCampaign = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customer);

  const { isCreating } = useSelector((state) => state.marketing);

  const [campaignName, setCampaignName] = useState('');
  const [customerCategory, setCustomerCategory] = useState();

  const onSubmit = () => {
    const formValues = { name: campaignName };

    const customList = [];

    switch (customerCategory.label) {
      case 'All customers':
        // All customer
        customers.forEach((e) => {
          customList.push(e._id);
        });
        break;
      case 'New customers':
        // customer created under last 1 month
        customers.forEach((e) => {
          if (new Date(e.createdAt) > Date.now() - 31 * 24 * 60 * 60 * 1000) {
            customList.push(e._id);
          }
        });
        break;
      case 'Returning Customers':
        // Customers with more than 1 orders

        customers.forEach((e) => {
          if (e.orders.length > 1) {
            customList.push(e._id);
          }
        });
        break;

      default:
        break;
    }

    if (customList.length > 0) {
      dispatch(creatEmailCampaign(formValues, customList, handleClose));
    } else {
      dispatch(showSnackbar('info', `There are no customers matching ${customerCategory.label}`));
    }
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Create Email campaign</DialogTitle>

        <Grid className="px-4 py-3" container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)' },
                }}
              >
                <TextField
                helperText="This will be used as Subject of your Email Campaign"
                  name="campaignName"
                  label="Campaign Name"
                  fullWidth
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                />
                <Autocomplete
                  value={customerCategory}
                  onChange={(e, value) => {
                    setCustomerCategory(value);
                  }}
                  id=""
                  fullWidth
                  options={customerOptions}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose customers"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: '', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
          <LoadingButton
            loading={isCreating}
            onClick={() => {
              onSubmit();
            }}
            variant="contained"
          >
            Create campaign
          </LoadingButton>

          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default CreateEmailCampaign;

const customerOptions = [{ label: 'All customers' }, { label: 'New customers' }, { label: 'Returning Customers' }];
