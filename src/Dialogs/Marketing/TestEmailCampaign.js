import React, { useState } from 'react';
import { Card, Grid, TextField, Dialog, DialogTitle, Button, Stack, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { testEmailCampaign } from '../../actions';

const TestEmailCampaign = ({ open, handleClose, id }) => {
  const { isTesting } = useSelector((state) => state.marketing);

  const [email, setEmail] = useState();

  const onSubmit = () => {};

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
                  name="testEmail"
                  label="Test Email"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Stack direction="row" spacing={3} justifyContent={'end'} alignItems={'center'} className="px-4 py-4">
          <LoadingButton
            loading={isTesting}
            onClick={() => {
              onSubmit();
            }}
            variant="contained"
          >
            Send Test Email
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

export default TestEmailCampaign;
