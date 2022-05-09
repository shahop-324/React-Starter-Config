import React, { useState } from 'react';
import { Card, Grid, TextField, Dialog, DialogTitle, Button, Stack, Autocomplete, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { updateEmailCampaign } from '../../actions';

const EditEmailCampaign = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const { isUpdating, campaigns } = useSelector((state) => state.marketing);

  const emailCampaign = campaigns.find((el) => el._id === id);

  const [campaignName, setCampaignName] = useState(emailCampaign?.name);
  const [customerCategory, setCustomerCategory] = useState(emailCampaign?.customerCategory);

  const onSubmit = () => {
    const formValues = { name: campaignName, customer: customerCategory };

    dispatch(updateEmailCampaign(formValues, handleClose));
  };

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle>Update Email campaign</DialogTitle>

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
            loading={isUpdating}
            onClick={() => {
              onSubmit();
            }}
            variant="contained"
          >
            Update campaign
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

export default EditEmailCampaign;

const customerOptions = [
  { label: 'All customers' },
  { label: 'New customers' },
  { label: 'Returning Customers' },
  { label: 'Abondened customers' },
  { label: 'No sales customers' },
  { label: 'Imported customers' },
  { label: 'Custom customers' },
];
